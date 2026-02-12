<template>
  <BaseModal 
    :show="show" 
    title="Rename Item" 
    @close="$emit('close')"
  >
    <div class="space-y-4">
      <input 
        v-model="newName"
        type="text" 
        class="w-full px-4 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
        @keyup.enter="handleRename"
        ref="inputRef"
      />
    </div>

    <template #footer>
      <button 
        type="button" 
        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
        @click="handleRename"
      >
        Rename
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

const props = defineProps<{
  show: boolean
  itemId: string | null
  itemType: 'file' | 'folder' | null
  currentName?: string
}>()

const emit = defineEmits(['close'])
const driveStore = useDriveStore()
const newName = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

watch(() => props.show, (val) => {
    if (val && props.currentName) {
        newName.value = props.currentName
        setTimeout(() => {
            inputRef.value?.focus()
            inputRef.value?.select()
        }, 100)
    }
})

const handleRename = () => {
    if (newName.value.trim() && props.itemId && props.itemType) {
        driveStore.renameItem(props.itemId, props.itemType, newName.value)
        emit('close')
    }
}
</script>
