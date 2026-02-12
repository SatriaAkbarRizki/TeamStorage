<template>
  <div>
    <!-- Breadcrumbs & Actions -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2 text-sm text-surface-600">
        <template v-for="(crumb, index) in driveStore.breadcrumbs" :key="crumb.id || 'root'">
          <button 
            @click="driveStore.setCurrentFolder(crumb.id)" 
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
           class="p-2 text-surface-500 hover:text-surface-900 bg-white border border-surface-200 rounded-lg shadow-sm hover:bg-surface-50 active:bg-surface-100 transition-colors"
           :title="driveStore.viewMode === 'grid' ? 'Switch to List view' : 'Switch to Grid view'"
         >
            <!-- Show List icon if in Grid mode (to switch to list) -->
            <svg v-if="driveStore.viewMode === 'grid'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 fill-current"><path d="M104,168V104H40a8,8,0,0,0,0,16h48v48H40a8,8,0,0,0,0,16h64A8,8,0,0,0,104,168Zm112-64H152a8,8,0,0,0,0,16h48v48H152a8,8,0,0,0,0,16h64a8,8,0,0,0,8-8V112A8,8,0,0,0,216,104Z"></path></svg>
            <!-- Show Grid icon if in List mode (to switch to grid) -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 fill-current"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
         </button>
       </div>
    </div>

    <!-- Empty State -->
    <div v-if="driveStore.folders.length === 0 && driveStore.files.length === 0" class="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-surface-200 rounded-2xl bg-surface-50">
      <div class="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mb-4 text-surface-400">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-8 h-8 fill-current"><path d="M216,72H130.67L102.93,35a16.12,16.12,0,0,0-9.6-6.45L35.85,26.17A16.09,16.09,0,0,0,16.29,40.1L16,40.33V208a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72ZM32,41.93l.35-.26,57.51,2.07L114.77,72H32ZM216,208H32V88H216v120Z"></path></svg>
      </div>
      <h3 class="text-lg font-medium text-surface-900">This folder is empty</h3>
      <p class="text-surface-500 mt-1 mb-6">Upload files or create folders to get started</p>
      <button class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-primary-500/20">
        Upload Files
      </button>
    </div>

    <!-- Content -->
    <div v-else class="space-y-8">
      
       <!-- List View -->
       <ListView 
          v-if="driveStore.viewMode === 'list'"
          :folders="driveStore.currentFolders"
          :files="driveStore.currentFiles"
          @open-folder="driveStore.setCurrentFolder"
          @open-file="(file) => { /* mock open */ }"
          @options="(e, id, type, name) => openContextMenu(e, id, type, name)"
       />

       <!-- Grid View -->
       <template v-else>
          <!-- Folders Section -->
          <section v-if="driveStore.currentFolders.length > 0">
            <h2 class="text-sm font-semibold text-surface-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                Folders
                <span class="bg-surface-200 text-surface-600 py-0.5 px-2 rounded-full text-xs">{{ driveStore.currentFolders.length }}</span>
            </h2>
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              <FolderCard 
                v-for="folder in driveStore.currentFolders" 
                :key="folder.id" 
                :folder="folder" 
                @open="driveStore.setCurrentFolder(folder.id)"
                @options="(e) => openContextMenu(e, folder.id, 'folder', folder.name)"
              />
            </div>
          </section>

          <!-- Files Section -->
          <section v-if="driveStore.currentFiles.length > 0">
            <h2 class="text-sm font-semibold text-surface-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                Files
                <span class="bg-surface-200 text-surface-600 py-0.5 px-2 rounded-full text-xs">{{ driveStore.currentFiles.length }}</span>
            </h2>
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                <FileCard
                    v-for="file in driveStore.currentFiles"
                    :key="file.id"
                    :file="file"
                    @options="(e) => openContextMenu(e, file.id, 'file', file.name)"
                />
            </div>
          </section>
      </template>

    </div>
    
    <!-- Context Menu -->
    <ContextMenu 
        :show="contextMenu.show" 
        :x="contextMenu.x" 
        :y="contextMenu.y" 
        :isTrash="driveStore.currentFilter === 'trash'"
        @close="closeContextMenu"
        @action="handleContextAction"
    />

    <!-- Action Modals -->
    <ShareModal 
        :show="activeAction === 'share'" 
        :fileId="selectedItemId"
        @close="activeAction = null" 
    />
    
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

  </div>
</template>

<script setup lang="ts">
import { useDriveStore } from '~/stores/drive'

definePageMeta({
  layout: 'dashboard',
  middleware: [
    'auth'
  ]
})

const authStore = useAuthStore()
if (!authStore.isAuthenticated) {
    navigateTo('/login')
}

const driveStore = useDriveStore()

// Context Menu State
const contextMenu = reactive({
    show: false,
    x: 0,
    y: 0
})

const selectedItemId = ref<string | null>(null)
const selectedItemType = ref<'file' | 'folder' | null>(null)
const selectedItemName = ref<string>('')
const activeAction = ref<'share' | 'move' | 'rename' | null>(null)

const openContextMenu = (e: MouseEvent, id: string, type: 'file' | 'folder', name: string) => {
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

const handleContextAction = (action: string) => {
    closeContextMenu()
    
    switch (action) {
        case 'open':
            if (selectedItemType.value === 'folder' && selectedItemId.value) {
                driveStore.setCurrentFolder(selectedItemId.value)
            } else {
                // Open file preview (not implemented yet)
                alert('File preview not implemented yet')
            }
            break
        case 'rename':
            activeAction.value = 'rename'
            break
        case 'share':
            activeAction.value = 'share'
            break
        case 'download':
            // Mock download
            const { success } = useToast()
            success('Download started...')
            break
        case 'move':
            activeAction.value = 'move'
            break
        case 'restore':
            if (selectedItemId.value && selectedItemType.value) {
                driveStore.restoreItem(selectedItemId.value, selectedItemType.value)
            }
            break
        case 'delete':
            if (selectedItemId.value && selectedItemType.value) {
                const isInTrash = driveStore.currentFilter === 'trash'
                const message = isInTrash 
                    ? 'Are you sure you want to permanently delete this item? This action cannot be undone.'
                    : 'Are you sure you want to move this item to trash?'
                
                if (confirm(message)) {
                    driveStore.deleteItem(selectedItemId.value, selectedItemType.value)
                }
            }
            break
    }
}
</script>
