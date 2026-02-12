<template>
  <BaseModal 
    :show="show" 
    title="Share File" 
    @close="$emit('close')"
  >
    <div class="space-y-4">
      <p class="text-sm text-surface-600">Anyone with the link can view this file. The link will expire in 1 week.</p>
      
      <div class="flex gap-2">
        <input 
          :value="shareLink"
          readonly
          type="text" 
          class="flex-1 px-4 py-2 border border-surface-300 rounded-lg bg-surface-50 text-surface-500 focus:outline-none"
        />
        <button 
          @click="copyLink"
          class="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg font-medium hover:bg-primary-100 transition-colors"
        >
          {{ copied ? 'Copied!' : 'Copy' }}
        </button>
      </div>
    </div>

    <template #footer>
      <button 
        type="button" 
        class="w-full inline-flex justify-center rounded-md border border-surface-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-surface-700 hover:bg-surface-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:w-auto sm:text-sm"
        @click="$emit('close')"
      >
        Done
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const props = defineProps<{
  show: boolean
  fileId: string | null
}>()

const emit = defineEmits(['close'])

const shareLink = computed(() => {
    return `https://teamstorage.app/share/${props.fileId || 'temp-id'}?exp=${Date.now() + 604800000}`
})

const { copy, copied } = useClipboard({ source: shareLink })
const { success } = useToast()

const copyLink = () => {
    copy()
    success('Link copied to clipboard')
}
</script>
