<template>
  <BaseModal 
    :show="driveStore.activeModal === 'createFolder'" 
    title="New Folder" 
    @close="driveStore.closeModal()"
  >
    <div class="space-y-4">
      <input 
        v-model="folderName"
        type="text" 
        placeholder="Untitled folder"
        class="w-full px-4 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
        @keyup.enter="handleCreate"
        ref="inputRef"
      />
    </div>

    <template #footer>
      <button 
        type="button" 
        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
        @click="handleCreate"
      >
        Create
      </button>
      <button 
        type="button" 
        class="mt-3 w-full inline-flex justify-center rounded-md border border-surface-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-surface-700 hover:bg-surface-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
const folderName = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

watch(() => driveStore.activeModal, (val) => {
  if (val === 'createFolder') {
    folderName.value = ''
    setTimeout(() => {
        inputRef.value?.focus()
    }, 100)
  }
})

const handleCreate = () => {
    if (folderName.value.trim()) {
        driveStore.createFolder(folderName.value)
        driveStore.closeModal()
    }
}
</script>
