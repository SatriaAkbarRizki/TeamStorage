import { defineStore } from 'pinia'

// --- Types matching the API response ---
export interface ApiFolder {
    id: number
    nameFolder: string
    isMoveGoTrash: boolean
    createdAt: string
    userName: string
    email: string
    imageAvatar: string | null
}

export interface ApiFile {
    id: number
    nameFile: string
    fileSize: number
    fileType: string
    filePath: string
    createdAt: string
    userName: string
    imageAvatar: string | null
    isMoveGoTrash?: boolean
}

export interface SharedFileEntry {
    id: number
    fileId: number
    token: string
    uploadBy: number
    createdAt: string
}

// Internal helpers for breadcrumb building
export interface BreadcrumbItem {
    id: number | null
    name: string
}

function formatSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

export const useDriveStore = defineStore('drive', {
    state: () => ({
        folders: [] as ApiFolder[],
        files: [] as ApiFile[],
        currentFolderId: null as number | null,
        // Stack for breadcrumb: each entry = { id, name } of the folder entered
        folderStack: [] as BreadcrumbItem[],
        searchQuery: '',
        searchResults: { folders: [] as ApiFolder[], files: [] as ApiFile[] },
        isSearching: false,
        viewMode: 'list' as 'grid' | 'list',
        activeModal: null as 'createFolder' | 'upload' | null,
        currentFilter: null as 'trash' | null,
        loading: false,
        error: null as string | null,
        // Share File
        sharedFiles: [] as SharedFileEntry[],
        // Disk Usage
        diskUsageBytes: 0,
    }),

    getters: {
        currentFiles: (state) => {
            if (state.isSearching) return state.searchResults.files
            let list = state.files
            if (state.currentFilter === 'trash') {
                list = list.filter(f => f.isMoveGoTrash)
            } else {
                list = list.filter(f => !f.isMoveGoTrash)
            }
            return list
        },
        currentFolders: (state) => {
            if (state.isSearching) return state.searchResults.folders
            if (state.currentFilter === 'trash') return []
            let list = state.folders.filter(f => !f.isMoveGoTrash)
            return list
        },
        breadcrumbs: (state): BreadcrumbItem[] => {
            if (state.currentFilter === 'trash') return [{ id: null, name: 'Trash' }]
            if (state.isSearching) return [{ id: null, name: 'Hasil Pencarian' }]
            return [{ id: null, name: 'My Drive' }, ...state.folderStack]
        },
        diskUsageMB: (state) => (state.diskUsageBytes / (1024 * 1024)).toFixed(2),
        diskUsagePercent: (state) => Math.min((state.diskUsageBytes / 10_737_418_240) * 100, 100),
    },

    actions: {
        async fetchData(folderId: number | null = null) {
            const config = useRuntimeConfig()
            const id = folderId ?? 0
            this.loading = true
            this.error = null
            try {
                const res = await $fetch<{ success: boolean; message: string; data: { folders: ApiFolder[]; files: ApiFile[] } }>(`${config.public.apiBase}/general/getdata?id=${id}`, {
                    credentials: 'include',
                })
                this.folders = res.data?.folders ?? []
                this.files = res.data?.files ?? []
            } catch (err: any) {
                this.error = err?.data?.message || 'Gagal memuat data.'
            } finally {
                this.loading = false
            }
        },

        async setCurrentFolder(folder: { id: number; name: string } | null) {
            this.currentFilter = null
            this.searchQuery = ''
            this.isSearching = false
            this.searchResults = { folders: [], files: [] }
            if (folder === null) {
                this.currentFolderId = null
                this.folderStack = []
            } else {
                this.currentFolderId = folder.id
                const idx = this.folderStack.findIndex(f => f.id === folder.id)
                if (idx >= 0) {
                    this.folderStack = this.folderStack.slice(0, idx + 1)
                } else {
                    this.folderStack.push({ id: folder.id, name: folder.name })
                }
            }
            await this.fetchData(this.currentFolderId)
        },

        async setFilter(filter: 'trash' | null) {
            this.currentFilter = filter
            this.currentFolderId = null
            this.folderStack = []
            this.searchQuery = ''
            this.isSearching = false
            this.searchResults = { folders: [], files: [] }
            await this.fetchData(0)
        },

        // ----- Search -----
        async searchFiles(query: string) {
            if (!query.trim()) {
                this.isSearching = false
                this.searchResults = { folders: [], files: [] }
                return
            }
            const config = useRuntimeConfig()
            this.isSearching = true
            this.loading = true
            try {
                const res = await $fetch<{ success: boolean; data: { folders: ApiFolder[]; files: ApiFile[] } }>(
                    `${config.public.apiBase}/general/search?name=${encodeURIComponent(query)}`,
                    { credentials: 'include' }
                )
                this.searchResults = {
                    folders: res.data?.folders ?? [],
                    files: res.data?.files ?? [],
                }
            } catch (err: any) {
                this.searchResults = { folders: [], files: [] }
            } finally {
                this.loading = false
            }
        },

        clearSearch() {
            this.searchQuery = ''
            this.isSearching = false
            this.searchResults = { folders: [], files: [] }
        },

        // ----- Disk Usage -----
        async fetchDiskUsage() {
            const config = useRuntimeConfig()
            try {
                const res = await $fetch<{ success: boolean; data: number }>(
                    `${config.public.apiBase}/general/totalusage`,
                    { credentials: 'include' }
                )
                this.diskUsageBytes = res.data ?? 0
            } catch {
                this.diskUsageBytes = 0
            }
        },

        // ----- Folder operations -----
        async createFolder(name: string) {
            if (!name.trim()) return
            const config = useRuntimeConfig()
            const { success: toastSuccess, error: toastError } = useToast()
            try {
                await $fetch(`${config.public.apiBase}/folder/create`, {
                    method: 'POST',
                    body: { nameFolder: name, parentId: this.currentFolderId ?? null },
                    credentials: 'include',
                })
                toastSuccess(`Folder "${name}" berhasil dibuat`)
                await this.fetchData(this.currentFolderId)
            } catch (err: any) {
                const msg = err?.data?.message || 'Gagal membuat folder.'
                toastError(msg)
                alert('Gagal membuat folder: ' + msg)
            }
        },

        async renameFolder(id: number, name: string) {
            const config = useRuntimeConfig()
            const { success: toastSuccess } = useToast()
            try {
                await $fetch(`${config.public.apiBase}/folder/rename`, {
                    method: 'PUT',
                    body: { id, nameFolder: name },
                    credentials: 'include',
                })
                toastSuccess('Folder berhasil diubah namanya')
                await this.fetchData(this.currentFolderId)
            } catch (err: any) {
                const msg = err?.data?.message || 'Gagal mengubah nama folder.'
                alert('Gagal mengubah nama folder: ' + msg)
            }
        },

        async moveFolder(id: number, parentId: number | null) {
            const config = useRuntimeConfig()
            const { success: toastSuccess } = useToast()
            try {
                await $fetch(`${config.public.apiBase}/folder/move`, {
                    method: 'PUT',
                    body: { id, parentId },
                    credentials: 'include',
                })
                toastSuccess('Folder berhasil dipindahkan')
                await this.fetchData(this.currentFolderId)
            } catch (err: any) {
                const msg = err?.data?.message || 'Gagal memindahkan folder.'
                alert('Gagal memindahkan folder: ' + msg)
            }
        },

        async deleteFolder(id: number) {
            const config = useRuntimeConfig()
            const { success: toastSuccess } = useToast()
            try {
                await $fetch(`${config.public.apiBase}/folder/delete?idDelete=${id}`, {
                    method: 'DELETE',
                    credentials: 'include',
                })
                toastSuccess('Folder berhasil dihapus')
                await this.fetchData(this.currentFolderId)
            } catch (err: any) {
                const msg = err?.data?.message || 'Gagal menghapus folder.'
                alert('Gagal menghapus folder: ' + msg)
            }
        },

        // ----- File operations -----
        async uploadFiles(files: File[]) {
            const config = useRuntimeConfig()
            const { success: toastSuccess } = useToast()
            const form = new FormData()
            for (const f of files) form.append('files', f)
            if (this.currentFolderId !== null) form.append('folderId', String(this.currentFolderId))
            try {
                await $fetch(`${config.public.apiBase}/files/upload`, {
                    method: 'POST',
                    body: form,
                    credentials: 'include',
                })
                toastSuccess(`${files.length} file berhasil diunggah`)
                await this.fetchData(this.currentFolderId)
                await this.fetchDiskUsage()
            } catch (err: any) {
                const msg = err?.data?.message || 'Gagal mengunggah file.'
                alert('Gagal mengunggah file: ' + msg)
            }
        },

        async renameFile(id: number, name: string) {
            const config = useRuntimeConfig()
            const { success: toastSuccess } = useToast()
            try {
                await $fetch(`${config.public.apiBase}/files/rename`, {
                    method: 'PUT',
                    body: { id, nameFile: name },
                    credentials: 'include',
                })
                toastSuccess('File berhasil diubah namanya')
                await this.fetchData(this.currentFolderId)
            } catch (err: any) {
                const msg = err?.data?.message || 'Gagal mengubah nama file.'
                alert('Gagal mengubah nama file: ' + msg)
            }
        },

        async moveFile(id: number, folderId: number | null) {
            const config = useRuntimeConfig()
            const { success: toastSuccess } = useToast()
            try {
                await $fetch(`${config.public.apiBase}/files/move`, {
                    method: 'PUT',
                    body: { id, folderId },
                    credentials: 'include',
                })
                toastSuccess('File berhasil dipindahkan')
                await this.fetchData(this.currentFolderId)
            } catch (err: any) {
                const msg = err?.data?.message || 'Gagal memindahkan file.'
                alert('Gagal memindahkan file: ' + msg)
            }
        },

        async trashFile(id: number) {
            const config = useRuntimeConfig()
            const { success: toastSuccess } = useToast()
            try {
                await $fetch(`${config.public.apiBase}/files/trash?idFile=${id}`, {
                    method: 'PUT',
                    credentials: 'include',
                })
                toastSuccess('File dipindahkan ke Trash')
                await this.fetchData(this.currentFolderId)
            } catch (err: any) {
                const msg = err?.data?.message || 'Gagal memindahkan file ke trash.'
                alert('Gagal: ' + msg)
            }
        },

        async restoreFile(id: number) {
            const config = useRuntimeConfig()
            const { success: toastSuccess } = useToast()
            try {
                await $fetch(`${config.public.apiBase}/files/restore?idFile=${id}`, {
                    method: 'PUT',
                    credentials: 'include',
                })
                toastSuccess('File berhasil dipulihkan')
                await this.fetchData(this.currentFolderId)
            } catch (err: any) {
                const msg = err?.data?.message || 'Gagal memulihkan file.'
                alert('Gagal: ' + msg)
            }
        },

        async deleteFilePermanent(id: number) {
            const config = useRuntimeConfig()
            const { success: toastSuccess } = useToast()
            try {
                await $fetch(`${config.public.apiBase}/files/delete?idFile=${id}`, {
                    method: 'DELETE',
                    credentials: 'include',
                })
                toastSuccess('File berhasil dihapus permanen')
                await this.fetchData(this.currentFolderId)
                await this.fetchDiskUsage()
            } catch (err: any) {
                const msg = err?.data?.message || 'Gagal menghapus file.'
                alert('Gagal menghapus file: ' + msg)
            }
        },

        async downloadFile(id: number, name: string) {
            const config = useRuntimeConfig()
            try {
                const blob = await $fetch<Blob>(`${config.public.apiBase}/files/download?id=${id}`, {
                    responseType: 'blob',
                    credentials: 'include',
                })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = name
                a.click()
                URL.revokeObjectURL(url)
            } catch (err: any) {
                alert('Gagal mengunduh file.')
            }
        },

        // ----- Share File operations -----
        async generateShareLink(fileId: number, uploadBy: number): Promise<string | null> {
            const config = useRuntimeConfig()
            try {
                const res = await $fetch<{ success: boolean; data: SharedFileEntry }>(
                    `${config.public.apiBase}/files/sharefile`,
                    {
                        method: 'POST',
                        body: { fileId, uploadBy },
                        credentials: 'include',
                    }
                )
                if (res.success && res.data?.token) {
                    return res.data.token
                }
                return null
            } catch (err: any) {
                const msg = err?.data?.message || 'Gagal membuat share link.'
                alert('Gagal: ' + msg)
                return null
            }
        },

        async fetchSharedFiles() {
            const config = useRuntimeConfig()
            this.loading = true
            try {
                const res = await $fetch<{ success: boolean; data: SharedFileEntry[] }>(
                    `${config.public.apiBase}/files/getdatasharefile`,
                    { credentials: 'include' }
                )
                this.sharedFiles = res.data ?? []
            } catch {
                this.sharedFiles = []
            } finally {
                this.loading = false
            }
        },

        async deleteShareFile(id: number) {
            const config = useRuntimeConfig()
            const { success: toastSuccess } = useToast()
            try {
                await $fetch(`${config.public.apiBase}/files/sharefile?id=${id}`, {
                    method: 'DELETE',
                    credentials: 'include',
                })
                toastSuccess('Share link berhasil dihapus')
                await this.fetchSharedFiles()
            } catch (err: any) {
                const msg = err?.data?.message || 'Gagal menghapus share link.'
                alert('Gagal: ' + msg)
            }
        },

        // ----- UI helpers -----
        openModal(modal: 'createFolder' | 'upload') {
            this.activeModal = modal
        },
        closeModal() {
            this.activeModal = null
        },
        toggleViewMode() {
            this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid'
        },

        // Utility exposed for templates
        formatSize,
    }
})
