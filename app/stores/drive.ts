import { defineStore } from 'pinia'

// Types
export interface FileItem {
    id: string
    name: string
    type: 'image' | 'video' | 'pdf' | 'doc' | 'archive' | 'unknown'
    size: string
    parentId: string | null
    createdAt: string
    owner: string
    thumbnail?: string
    deleted?: boolean
}

export interface FolderItem {
    id: string
    name: string
    parentId: string | null
    createdAt: string
    owner: string
    deleted?: boolean
}

export const useDriveStore = defineStore('drive', {
    state: () => ({
        folders: [
            { id: '1', name: 'Design Assets', parentId: null, createdAt: new Date().toISOString(), owner: 'Me' },
            { id: '2', name: 'Documents', parentId: null, createdAt: new Date().toISOString(), owner: 'Me' },
            { id: '3', name: 'Project Alpha', parentId: '2', createdAt: new Date().toISOString(), owner: 'Me' },
        ] as FolderItem[],
        files: [
            { id: '101', name: 'Logo.png', type: 'image', size: '2.5 MB', parentId: null, createdAt: new Date().toISOString(), owner: 'Me', thumbnail: 'https://placehold.co/400x300/0ea5e9/ffffff?text=Logo' },
            { id: '102', name: 'Presntation.pdf', type: 'pdf', size: '4.8 MB', parentId: null, createdAt: new Date().toISOString(), owner: 'Me' },
            { id: '103', name: 'Budget.xlsx', type: 'doc', size: '1.2 MB', parentId: '2', createdAt: new Date().toISOString(), owner: 'Me' },
        ] as FileItem[],
        currentFolderId: null as string | null,
        searchQuery: '',
        viewMode: 'list' as 'grid' | 'list',
        activeModal: null as 'createFolder' | 'upload' | null,
        currentFilter: null as 'shared' | 'trash' | null
    }),

    getters: {
        // Get files in current folder
        currentFiles: (state) => {
            let filtered = state.files

            if (state.currentFilter === 'trash') {
                return state.files.filter(f => f.deleted)
            } else if (state.currentFilter === 'shared') {
                return state.files.filter(f => !f.deleted && Math.random() > 0.7) // Mock shared files
            } else {
                filtered = state.files.filter(f => !f.deleted && f.parentId === state.currentFolderId)
            }

            if (state.searchQuery) {
                const query = state.searchQuery.toLowerCase()
                filtered = state.files.filter(f => !f.deleted && f.name.toLowerCase().includes(query))
            }
            return filtered
        },
        // Get folders in current folder
        currentFolders: (state) => {
            if (state.currentFilter === 'trash') {
                return state.folders.filter(f => f.deleted)
            }
            if (state.currentFilter === 'shared') {
                return []
            }

            let filtered = state.folders.filter(f => !f.deleted && f.parentId === state.currentFolderId)

            if (state.searchQuery) {
                const query = state.searchQuery.toLowerCase()
                filtered = state.folders.filter(f => !f.deleted && f.name.toLowerCase().includes(query))
            }
            return filtered
        },
        // Get breadcrumbs
        breadcrumbs: (state) => {
            if (state.searchQuery) {
                return [{ id: null, name: 'Search Results' }]
            }
            if (state.currentFilter === 'shared') {
                return [{ id: null, name: 'Shared with me' }]
            }
            if (state.currentFilter === 'trash') {
                return [{ id: null, name: 'Trash' }]
            }

            const crumbs = []
            let currentId = state.currentFolderId

            while (currentId) {
                const folder = state.folders.find(f => f.id === currentId)
                if (folder) {
                    crumbs.unshift({ id: folder.id, name: folder.name })
                    currentId = folder.parentId
                } else {
                    break
                }
            }
            return [{ id: null, name: 'My Drive' }, ...crumbs]
        }
    },

    actions: {
        createFolder(name: string) {
            if (!name) return
            this.folders.push({
                id: Math.random().toString(36).substr(2, 9),
                name,
                parentId: this.currentFolderId,
                createdAt: new Date().toISOString(),
                owner: 'Me'
            })
            const { success } = useToast()
            success(`Folder "${name}" created`)
        },
        openModal(modal: 'createFolder' | 'upload') {
            this.activeModal = modal
        },
        closeModal() {
            this.activeModal = null
        },
        setCurrentFolder(folderId: string | null) {
            this.currentFolderId = folderId
            this.currentFilter = null
            this.searchQuery = '' // Clear search when navigating
        },
        setFilter(filter: 'shared' | 'trash' | null) {
            this.currentFilter = filter
            this.currentFolderId = null
            this.searchQuery = ''
        },
        toggleViewMode() {
            this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid'
        },
        uploadFile(file: File) {
            // Mock upload
            this.files.push({
                id: Math.random().toString(36).substr(2, 9),
                name: file.name,
                type: 'unknown', // Simplified type detection logic needed
                size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
                parentId: this.currentFolderId,
                createdAt: new Date().toISOString(),
                owner: 'Me',
                thumbnail: file.type.startsWith('image') ? URL.createObjectURL(file) : undefined
            })
            const { success } = useToast()
            success(`File "${file.name}" uploaded`)
        },
        deleteItem(id: string, type: 'file' | 'folder') {
            if (type === 'file') {
                const file = this.files.find(f => f.id === id)
                if (file) {
                    if (this.currentFilter === 'trash') {
                        // Permanent delete
                        this.files = this.files.filter(f => f.id !== id)
                    } else {
                        // Soft delete
                        file.deleted = true
                    }
                }
            } else {
                const folder = this.folders.find(f => f.id === id)
                if (folder) {
                    if (this.currentFilter === 'trash') {
                        this.folders = this.folders.filter(f => f.id !== id)
                    } else {
                        folder.deleted = true
                    }
                }
            }
            const { success } = useToast()
            success('Item moved to trash')
        },
        renameItem(id: string, type: 'file' | 'folder', newName: string) {
            if (type === 'file') {
                const file = this.files.find(f => f.id === id)
                if (file) file.name = newName
            } else {
                const folder = this.folders.find(f => f.id === id)
                if (folder) folder.name = newName
            }
            const { success } = useToast()
            success('Item renamed')
        },
        restoreItem(id: string, type: 'file' | 'folder') {
            if (type === 'file') {
                const file = this.files.find(f => f.id === id)
                if (file) {
                    file.deleted = false
                }
            } else {
                const folder = this.folders.find(f => f.id === id)
                if (folder) {
                    folder.deleted = false
                }
            }
            const { success } = useToast()
            success('Item restored')
        }
    }
})
