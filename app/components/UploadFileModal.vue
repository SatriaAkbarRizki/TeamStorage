<template>
  <BaseModal 
    :show="driveStore.activeModal === 'upload'" 
    title="Upload File" 
    @close="driveStore.closeModal()"
  >
    <div class="space-y-4">
      <div 
        class="border-2 border-dashed border-surface-300 rounded-lg p-8 text-center hover:border-primary-500 hover:bg-surface-50 transition-colors cursor-pointer"
        @click="triggerFileInput"
        @dragover.prevent
        @drop.prevent="handleDrop"
      >
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 text-primary-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-6 h-6 fill-current"><path d="M216,152v56a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V152a8,8,0,0,1,16,0v48H200V152a8,8,0,0,1,16,0ZM165.66,90.34a8,8,0,0,0-11.32,0L136,108.69V32a8,8,0,0,0-16,0v76.69L101.66,90.34A8,8,0,0,0,90.34,101.66l40,40a8,8,0,0,0,11.32,0l40-40A8,8,0,0,0,165.66,90.34Z"></path></svg>
        </div>
        <p class="text-sm text-surface-600">
            <span class="font-medium text-primary-600">Click to upload</span> or drag and drop
        </p>
        <p class="text-xs text-surface-500 mt-1">SVG, PNG, JPG or GIF (max. 10MB)</p>
      </div>
      <input 
        ref="fileInput"
        type="file" 
        class="hidden"
        @change="handleFileChange"
      />
    </div>

    <template #footer>
      <button 
        type="button" 
        class="w-full inline-flex justify-center rounded-md border border-surface-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-surface-700 hover:bg-surface-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        @click="driveStore.closeModal()"
      >
        Cancel
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { useDriveStore } from '~/stores/drive'

const driveStore = useDriveStore()
const fileInput = ref<HTMLInputElement | null>(null)

const triggerFileInput = () => {
    fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files[0]) {
        processFile(target.files[0])
    }
}

const handleDrop = (event: DragEvent) => {
    if (event.dataTransfer?.files[0]) {
        processFile(event.dataTransfer.files[0])
    }
}

const processFile = (file: File) => {
    // Simulate upload delay
    setTimeout(() => {
        driveStore.uploadFile(file)
        driveStore.closeModal()
    }, 500)
}
</script>
