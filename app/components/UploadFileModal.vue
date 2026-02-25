<template>
  <BaseModal 
    :show="driveStore.activeModal === 'upload'" 
    title="Unggah File" 
    @close="driveStore.closeModal()"
  >
    <div class="space-y-4">
      <!-- Drop Zone -->
      <div 
        class="border-2 border-dashed border-surface-300 rounded-lg p-8 text-center hover:border-primary-500 hover:bg-surface-50 transition-colors cursor-pointer"
        :class="{ 'border-primary-500 bg-primary-50': isDragging }"
        @click="triggerFileInput"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop"
      >
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 text-primary-600 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-6 h-6 fill-current"><path d="M216,152v56a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V152a8,8,0,0,1,16,0v48H200V152a8,8,0,0,1,16,0ZM165.66,90.34a8,8,0,0,0-11.32,0L136,108.69V32a8,8,0,0,0-16,0v76.69L101.66,90.34A8,8,0,0,0,90.34,101.66l40,40a8,8,0,0,0,11.32,0l40-40A8,8,0,0,0,165.66,90.34Z"/></svg>
        </div>
        <p class="text-sm text-surface-600">
          <span class="font-medium text-primary-600">Klik untuk memilih</span> atau seret file ke sini
        </p>
        <p class="text-xs text-surface-500 mt-1">Mendukung semua jenis file, bisa pilih banyak sekaligus</p>
      </div>

      <input 
        ref="fileInput"
        type="file" 
        multiple
        class="hidden"
        @change="handleFileChange"
      />

      <!-- Selected files preview -->
      <div v-if="selectedFiles.length > 0" class="space-y-2 max-h-40 overflow-y-auto">
        <div 
          v-for="(f, i) in selectedFiles" 
          :key="i"
          class="flex items-center gap-3 px-3 py-2 bg-surface-50 rounded-lg text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-4 h-4 fill-current text-primary-500 flex-shrink-0"><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"/></svg>
          <span class="truncate flex-1 text-surface-700">{{ f.name }}</span>
          <span class="text-surface-400 flex-shrink-0">{{ driveStore.formatSize(f.size) }}</span>
          <button @click.stop="removeFile(i)" class="text-surface-400 hover:text-red-500 flex-shrink-0">✕</button>
        </div>
      </div>
    </div>

    <template #footer>
      <button 
        type="button"
        :disabled="selectedFiles.length === 0 || uploading"
        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        @click="handleUpload"
      >
        <span v-if="uploading" class="animate-spin mr-2">⟳</span>
        {{ uploading ? 'Mengunggah...' : `Unggah ${selectedFiles.length > 0 ? selectedFiles.length + ' File' : ''}` }}
      </button>
      <button 
        type="button" 
        class="mt-3 w-full inline-flex justify-center rounded-md border border-surface-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-surface-700 hover:bg-surface-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        @click="driveStore.closeModal()"
      >
        Batal
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { useDriveStore } from '~/stores/drive'

const driveStore = useDriveStore()
const fileInput = ref<HTMLInputElement | null>(null)
const selectedFiles = ref<File[]>([])
const isDragging = ref(false)
const uploading = ref(false)

// Reset when modal closes
watch(() => driveStore.activeModal, (val) => {
  if (val !== 'upload') {
    selectedFiles.value = []
  }
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    addFiles(Array.from(target.files))
    target.value = '' // reset so same file can be re-added
  }
}

const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  if (event.dataTransfer?.files) {
    addFiles(Array.from(event.dataTransfer.files))
  }
}

const addFiles = (files: File[]) => {
  // Avoid duplicates by name
  const existing = new Set(selectedFiles.value.map(f => f.name))
  selectedFiles.value.push(...files.filter(f => !existing.has(f.name)))
}

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1)
}

const handleUpload = async () => {
  if (selectedFiles.value.length === 0) return
  uploading.value = true
  await driveStore.uploadFiles(selectedFiles.value)
  uploading.value = false
  selectedFiles.value = []
  driveStore.closeModal()
}
</script>
