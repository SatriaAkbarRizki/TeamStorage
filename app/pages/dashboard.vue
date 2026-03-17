<template>
  <div>
    <!-- Loading Overlay -->
    <div v-if="driveStore.loading" class="flex items-center justify-center py-20">
      <div class="flex flex-col items-center gap-3 text-surface-400">
        <svg class="animate-spin w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        <span class="text-sm">Memuat data...</span>
      </div>
    </div>

    <template v-else>
      <!-- Breadcrumbs & Actions -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-2 text-sm text-surface-600">
          <template v-for="(crumb, index) in driveStore.breadcrumbs" :key="crumb.id ?? 'root'">
            <button 
              @click="navigateToCrumb(crumb)" 
              class="hover:text-primary-600 hover:underline transition-colors font-medium truncate max-w-[150px]"
              :class="{ 'text-surface-900 font-bold': index === driveStore.breadcrumbs.length - 1 }"
            >
              {{ crumb.name }}
            </button>
            <span v-if="index < driveStore.breadcrumbs.length - 1" class="text-surface-400">/</span>
          </template>
        </div>
        
        <div class="flex items-center gap-2">
          <button 
            @click="driveStore.toggleViewMode()" 
            class="p-2 text-surface-500 hover:text-surface-900 bg-white border border-surface-200 rounded-lg shadow-sm hover:bg-surface-50 transition-colors"
            :title="driveStore.viewMode === 'grid' ? 'Tampilan List' : 'Tampilan Grid'"
          >
            <svg v-if="driveStore.viewMode === 'grid'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 fill-current"><path d="M104,168V104H40a8,8,0,0,0,0,16h48v48H40a8,8,0,0,0,0,16h64A8,8,0,0,0,104,168Zm112-64H152a8,8,0,0,0,0,16h48v48H152a8,8,0,0,0,0,16h64a8,8,0,0,0,8-8V112A8,8,0,0,0,216,104Z"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 fill-current"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"/></svg>
          </button>
        </div>
      </div>

      <!-- Search Results Banner -->
      <div v-if="driveStore.isSearching" class="mb-4 flex items-center gap-2 text-sm text-surface-500">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-4 h-4 fill-current"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"/></svg>
        <span>Menampilkan hasil pencarian untuk "<strong class="text-surface-900">{{ driveStore.searchQuery }}</strong>"</span>
        <span class="bg-surface-100 text-surface-600 rounded-full px-2 py-0.5 text-xs">
          {{ driveStore.currentFolders.length + driveStore.currentFiles.length }} hasil
        </span>
      </div>

      <!-- Empty State -->
      <div v-if="driveStore.currentFolders.length === 0 && driveStore.currentFiles.length === 0" class="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-surface-200 rounded-2xl bg-surface-50">
        <div class="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mb-4 text-surface-400">
          <svg v-if="driveStore.isSearching || driveStore.currentFilter === 'trash'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-8 h-8 fill-current"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"/></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-8 h-8 fill-current"><path d="M216,72H130.67L102.93,35a16.12,16.12,0,0,0-9.6-6.45L35.85,26.17A16.09,16.09,0,0,0,16.29,40.1L16,40.33V208a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72ZM32,41.93l.35-.26,57.51,2.07L114.77,72H32ZM216,208H32V88H216v120Z"/></svg>
        </div>
        <h3 class="text-lg font-medium text-surface-900">{{ driveStore.isSearching ? 'Tidak ada hasil' : (driveStore.currentFilter === 'trash' ? 'Tidak Ada FIle yang Terhapus' : 'Folder ini kosong') }}</h3>
        <p class="text-surface-500 mt-1 mb-6">{{ driveStore.isSearching ? 'Coba kata kunci lain' : (driveStore.currentFilter === 'trash' ? 'File yang dihapus akan muncul di sini' : 'Unggah file atau buat folder untuk memulai') }}</p>
        <button v-if="!driveStore.isSearching && driveStore.currentFilter !== 'trash'" @click="driveStore.openModal('upload')" class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-primary-500/20">
          Unggah File
        </button>
      </div>

      <!-- Content -->
      <div v-else class="space-y-8">
        <!-- List View -->
        <ListView 
          v-if="driveStore.viewMode === 'list'"
          :folders="driveStore.currentFolders"
          :files="driveStore.currentFiles"
          @open-folder="(folder) => driveStore.setCurrentFolder(folder)"
          @open-file="(file) => openPreview(file)"
          @options="(e, id, type, name) => openContextMenu(e, id, type, name)"
        />

        <!-- Grid View -->
        <template v-else>
          <section v-if="driveStore.currentFolders.length > 0">
            <h2 class="text-sm font-semibold text-surface-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              Folder
              <span class="bg-surface-200 text-surface-600 py-0.5 px-2 rounded-full text-xs">{{ driveStore.currentFolders.length }}</span>
            </h2>
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              <FolderCard 
                v-for="folder in driveStore.currentFolders" 
                :key="folder.id" 
                :folder="folder"
                @open="driveStore.setCurrentFolder({ id: folder.id, name: folder.nameFolder })"
                @options="(e) => openContextMenu(e, folder.id, 'folder', folder.nameFolder)"
              />
            </div>
          </section>

          <section v-if="driveStore.currentFiles.length > 0">
            <h2 class="text-sm font-semibold text-surface-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              File
              <span class="bg-surface-200 text-surface-600 py-0.5 px-2 rounded-full text-xs">{{ driveStore.currentFiles.length }}</span>
            </h2>
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              <FileCard
                v-for="file in driveStore.currentFiles"
                :key="file.id"
                :file="file"
                @options="(e) => openContextMenu(e, file.id, 'file', file.nameFile)"
                @preview="(file) => openPreview(file)"
              />
            </div>
          </section>
        </template>
      </div>
    </template>

    <!-- Context Menu -->
    <ContextMenu 
      :show="contextMenu.show" 
      :x="contextMenu.x" 
      :y="contextMenu.y" 
      :isTrash="driveStore.currentFilter === 'trash'"
      :itemType="selectedItemType"
      @close="closeContextMenu"
      @action="handleContextAction"
    />

    <!-- Action Modals -->
    <MoveModal 
      :show="activeAction === 'move'" 
      :itemId="selectedItemId"
      :itemType="selectedItemType"
      @close="activeAction = null" 
    />

    <RenameModal 
      :show="activeAction === 'rename'" 
      :itemId="selectedItemId"
      :itemType="selectedItemType"
      :currentName="selectedItemName"
      @close="activeAction = null" 
    />

    <ShareModal
      :show="activeAction === 'share'"
      :fileId="selectedItemId"
      @close="activeAction = null"
    />

    <FilePreviewModal
      :show="showPreview"
      :file="selectedFileForPreview"
      @close="showPreview = false"
    />
  </div>
</template>

<script setup lang="ts">
import { useDriveStore } from '~/stores/drive'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})

const driveStore = useDriveStore()

// Load root data on mount
onMounted(async () => {
  await driveStore.fetchData(null)
  await driveStore.fetchDiskUsage()
})

// Context Menu State
const contextMenu = reactive({ show: false, x: 0, y: 0 })
const selectedItemId = ref<number | null>(null)
const selectedItemType = ref<'file' | 'folder' | null>(null)
const selectedItemName = ref<string>('')
const activeAction = ref<'move' | 'rename' | 'share' | null>(null)

// Preview State
const showPreview = ref(false)
const selectedFileForPreview = ref<any>(null)

const openPreview = (file: any) => {
  selectedFileForPreview.value = file
  showPreview.value = true
}

const openContextMenu = (e: MouseEvent, id: number, type: 'file' | 'folder', name: string) => {
  e.preventDefault()
  selectedItemId.value = id
  selectedItemType.value = type
  selectedItemName.value = name
  contextMenu.x = e.clientX
  contextMenu.y = e.clientY
  contextMenu.show = true
}

const closeContextMenu = () => {
  contextMenu.show = false
}

// Breadcrumb navigation
const navigateToCrumb = (crumb: { id: number | null; name: string }) => {
  if (crumb.id === null) {
    driveStore.setCurrentFolder(null)
  } else {
    driveStore.setCurrentFolder({ id: crumb.id, name: crumb.name })
  }
}

const handleContextAction = async (action: string) => {
  closeContextMenu()
  if (!selectedItemId.value || !selectedItemType.value) return

  switch (action) {
    case 'open':
      if (selectedItemType.value === 'folder') {
        driveStore.setCurrentFolder({ id: selectedItemId.value, name: selectedItemName.value })
      } else {
        const file = driveStore.files.find(f => f.id === selectedItemId.value) || 
                     driveStore.searchResults.files.find(f => f.id === selectedItemId.value)
        if (file) openPreview(file)
      }
      break
    case 'rename':
      activeAction.value = 'rename'
      break
    case 'share':
      activeAction.value = 'share'
      break
    case 'download':
      if (selectedItemType.value === 'file') {
        driveStore.downloadFile(selectedItemId.value, selectedItemName.value)
      }
      break
    case 'move':
      activeAction.value = 'move'
      break
    case 'restore':
      if (selectedItemType.value === 'file') {
        await driveStore.restoreFile(selectedItemId.value)
      }
      break
    case 'delete':
      if (driveStore.currentFilter === 'trash') {
        if (confirm('Apakah Anda yakin ingin menghapus item ini secara permanen? Tindakan ini tidak dapat dibatalkan.')) {
          if (selectedItemType.value === 'file') {
            await driveStore.deleteFilePermanent(selectedItemId.value)
          } else {
            await driveStore.deleteFolder(selectedItemId.value)
          }
        }
      } else {
        if (confirm('Apakah Anda yakin ingin memindahkan item ini ke Trash?')) {
          if (selectedItemType.value === 'file') {
            await driveStore.trashFile(selectedItemId.value)
          } else {
            await driveStore.deleteFolder(selectedItemId.value)
          }
        }
      }
      break
  }
}
</script>
