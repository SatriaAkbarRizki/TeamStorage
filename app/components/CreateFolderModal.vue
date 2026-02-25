<template>
  <BaseModal 
    :show="driveStore.activeModal === 'createFolder'" 
    title="Folder Baru" 
    @close="driveStore.closeModal()"
  >
    <div class="space-y-4">
      <input 
        v-model="folderName"
        type="text" 
        placeholder="Nama folder"
        class="w-full px-4 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
        @keyup.enter="handleCreate"
        ref="inputRef"
      />
    </div>

    <template #footer>
      <button 
        type="button"
        :disabled="loading"
        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
        @click="handleCreate"
      >
        <span v-if="loading" class="animate-spin mr-2">⟳</span>
        {{ loading ? 'Membuat...' : 'Buat' }}
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
const folderName = ref('')
const loading = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

watch(() => driveStore.activeModal, (val) => {
  if (val === 'createFolder') {
    folderName.value = ''
    setTimeout(() => inputRef.value?.focus(), 100)
  }
})

const handleCreate = async () => {
  if (!folderName.value.trim()) return
  loading.value = true
  await driveStore.createFolder(folderName.value)
  loading.value = false
  driveStore.closeModal()
}
</script>
