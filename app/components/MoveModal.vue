<template>
  <BaseModal 
    :show="show" 
    title="Pindahkan ke..." 
    @close="$emit('close')"
  >
    <div class="h-64 overflow-y-auto border border-surface-200 rounded-lg">
      <!-- Go back -->
      <div 
        v-if="currentPathId !== null" 
        class="p-3 border-b border-surface-100 hover:bg-surface-50 cursor-pointer flex items-center gap-2 text-surface-600 font-medium sticky top-0 bg-white"
        @click="navigateUp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-4 h-4 fill-current"><path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"/></svg>
        Kembali
      </div>

      <div v-if="loading" class="p-8 text-center text-surface-400">Memuat...</div>
      
      <div v-else-if="visibleFolders.length === 0" class="p-8 text-center text-surface-400">
        Tidak ada folder di sini
      </div>

      <div v-else>
        <div 
          v-for="folder in visibleFolders" 
          :key="folder.id"
          class="p-3 border-b border-surface-100 hover:bg-surface-50 cursor-pointer flex items-center gap-3"
          :class="{ 'bg-primary-50': selectedFolderId === folder.id }"
          @click="enterFolder(folder)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 fill-current text-primary-400"><path d="M216,72H130.67L102.93,35a16.12,16.12,0,0,0-9.6-6.45L35.85,26.17A16.09,16.09,0,0,0,16.29,40.1L16,40.33V208a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72Z"/></svg>
          <span class="text-surface-700 flex-1">{{ folder.nameFolder }}</span>
          <button 
            v-if="selectedFolderId !== folder.id"
            class="text-xs bg-white border border-surface-200 px-2 py-1 rounded text-surface-500 hover:text-primary-600 hover:border-primary-200"
            @click.stop="selectedFolderId = folder.id"
          >
            Pilih
          </button>
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 fill-current text-primary-600"><path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34Z"/></svg>
        </div>
      </div>
    </div>
    
    <div class="mt-2 text-xs text-surface-500 pl-1">
      Lokasi saat ini: {{ currentPathId === null ? 'My Drive' : currentPathName }}
    </div>

    <template #footer>
      <button 
        type="button" 
        :disabled="moving"
        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
        @click="handleMove"
      >
        <span v-if="moving" class="animate-spin mr-2">⟳</span>
        {{ moving ? 'Memindahkan...' : 'Pindahkan ke Sini' }}
      </button>
      <button 
        type="button" 
        class="mt-3 w-full inline-flex justify-center rounded-md border border-surface-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-surface-700 hover:bg-surface-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        @click="$emit('close')"
      >
        Batal
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { useDriveStore } from '~/stores/drive'
import type { ApiFolder } from '~/stores/drive'

const props = defineProps<{
  show: boolean
  itemId: number | null
  itemType: 'file' | 'folder' | null
}>()

const emit = defineEmits(['close'])
const driveStore = useDriveStore()
const config = useRuntimeConfig()

const currentPathId = ref<number | null>(null)
const selectedFolderId = ref<number | null>(null)
const loading = ref(false)
const moving = ref(false)
const fetchedFolders = ref<ApiFolder[]>([])
const currentPathName = ref('')

// Load folder list when modal opens or user navigates inside
const loadFolders = async (parentId: number | null) => {
  loading.value = true
  try {
    const id = parentId ?? 0
    const res = await $fetch<{ success: boolean; data: { folders: ApiFolder[] } }>(`${config.public.apiBase}/folder/getdata?id=${id}`, {
      credentials: 'include',
    })
    fetchedFolders.value = res.data?.folders ?? []
  } catch {
    fetchedFolders.value = []
  } finally {
    loading.value = false
  }
}

watch(() => props.show, async (val) => {
  if (val) {
    currentPathId.value = null
    selectedFolderId.value = null
    currentPathName.value = ''
    await loadFolders(null)
  }
})

// Filter out the item being moved (if it's a folder, don't show it as a target)
const visibleFolders = computed(() =>
  fetchedFolders.value.filter(f => !f.isMoveGoTrash && f.id !== props.itemId)
)

const enterFolder = async (folder: ApiFolder) => {
  currentPathId.value = folder.id
  currentPathName.value = folder.nameFolder
  selectedFolderId.value = null
  await loadFolders(folder.id)
}

const navigateUp = async () => {
  // We just go back to root (simplification; for deep nesting a stack would be needed)
  currentPathId.value = null
  currentPathName.value = ''
  selectedFolderId.value = null
  await loadFolders(null)
}

const handleMove = async () => {
  if (!props.itemId || !props.itemType) return
  // Target: selected folder if clicked, otherwise current viewed path
  const targetId = selectedFolderId.value ?? currentPathId.value

  moving.value = true
  if (props.itemType === 'file') {
    await driveStore.moveFile(props.itemId, targetId)
  } else {
    await driveStore.moveFolder(props.itemId, targetId)
  }
  moving.value = false
  emit('close')
}
</script>
