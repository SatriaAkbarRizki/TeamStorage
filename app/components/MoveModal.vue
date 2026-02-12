<template>
  <BaseModal 
    :show="show" 
    title="Move to..." 
    @close="$emit('close')"
  >
    <div class="h-64 overflow-y-auto border border-surface-200 rounded-lg">
      <div 
        v-if="currentPathId" 
        class="p-3 border-b border-surface-100 hover:bg-surface-50 cursor-pointer flex items-center gap-2 text-surface-600 font-medium sticky top-0 bg-white"
        @click="navigateUp"
      >
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-4 h-4 fill-current"><path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path></svg>
         Go Back
      </div>

      <div v-if="loading" class="p-8 text-center text-surface-400">Loading...</div>
      
      <div v-else-if="folders.length === 0" class="p-8 text-center text-surface-400">
        No folders here
      </div>

      <div v-else>
        <div 
            v-for="folder in folders" 
            :key="folder.id"
            class="p-3 border-b border-surface-100 hover:bg-surface-50 cursor-pointer flex items-center gap-3"
            @click="enterFolder(folder)"
            :class="{ 'bg-primary-50': selectedFolderId === folder.id }"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 fill-current text-primary-400"><path d="M216,72H130.67L102.93,35a16.12,16.12,0,0,0-9.6-6.45L35.85,26.17A16.09,16.09,0,0,0,16.29,40.1L16,40.33V208a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72Z"></path></svg>
            <span class="text-surface-700 flex-1">{{ folder.name }}</span>
            <button 
                v-if="selectedFolderId !== folder.id"
                class="text-xs bg-white border border-surface-200 px-2 py-1 rounded text-surface-500 hover:text-primary-600 hover:border-primary-200"
                @click.stop="selectFolder(folder.id)"
            >
                Select
            </button>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 fill-current text-primary-600"><path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34Z"></path></svg>
        </div>
      </div>
    </div>
    
    <div class="mt-2 text-xs text-surface-500 pl-1">
        Current location: {{ currentPathName }}
    </div>

    <template #footer>
      <button 
        type="button" 
        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        @click="handleMove"
        :disabled="!isValidMove"
      >
        Move Here
      </button>
      <button 
        type="button" 
        class="mt-3 w-full inline-flex justify-center rounded-md border border-surface-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-surface-700 hover:bg-surface-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        @click="$emit('close')"
      >
        Cancel
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { useDriveStore } from '~/stores/drive'
import type { FolderItem } from '~/stores/drive'

const props = defineProps<{
  show: boolean
  itemId: string | null
  itemType: 'file' | 'folder' | null
}>()

const emit = defineEmits(['close'])
const driveStore = useDriveStore()

const currentPathId = ref<string | null>(null)
const selectedFolderId = ref<string | null>(null)
const loading = ref(false)

// Init with root
watch(() => props.show, (val) => {
    if (val) {
        currentPathId.value = null
        selectedFolderId.value = null
    }
})

const folders = computed(() => {
    return driveStore.folders.filter(f => f.parentId === currentPathId.value && f.id !== props.itemId)
})

const currentPathName = computed(() => {
    if (!currentPathId.value) return 'My Drive'
    const folder = driveStore.folders.find(f => f.id === currentPathId.value)
    return folder ? folder.name : 'Unknown'
})

const isValidMove = computed(() => {
    // If moving a file, any folder is valid (including root/current if not same as source parent - simplified check)
    // If moving a folder, cannot move into self or children - strict check needed ideally
    if (!props.itemId) return false
    // Allow moving to current view (root or selected folder)
    return true
})

const enterFolder = (folder: FolderItem) => {
    currentPathId.value = folder.id
}

const selectFolder = (id: string) => {
    selectedFolderId.value = id
}

const navigateUp = () => {
    const folder = driveStore.folders.find(f => f.id === currentPathId.value)
    currentPathId.value = folder?.parentId || null
}

const handleMove = () => {
    if (!props.itemId || !props.itemType) return
    
    // Determine target: if specific folder selected, use that. Else use current viewed folder.
    const targetId = selectedFolderId.value || currentPathId.value
    
    // Actual move logic
    const item = props.itemType === 'file' 
        ? driveStore.files.find(f => f.id === props.itemId)
        : driveStore.folders.find(f => f.id === props.itemId)
        
    if (item) {
        item.parentId = targetId
        emit('close')
    }
}
</script>
