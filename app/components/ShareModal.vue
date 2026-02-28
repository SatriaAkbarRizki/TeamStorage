<template>
  <BaseModal 
    :show="show" 
    title="Share File" 
    @close="handleClose"
  >
    <div class="space-y-4">
      <!-- Generating state -->
      <div v-if="generating" class="flex items-center justify-center py-4 gap-3 text-surface-400">
        <svg class="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        <span class="text-sm">Membuat link berbagi...</span>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
        {{ error }}
      </div>

      <!-- Success state -->
      <div v-else-if="shareLink">
        <p class="text-sm text-surface-600 mb-3">
          Siapapun yang memiliki link ini dapat melihat dan mengunduh file. Bagikan link berikut:
        </p>
        <div class="flex gap-2">
          <input 
            :value="shareLink"
            readonly
            type="text" 
            class="flex-1 px-4 py-2 border border-surface-300 rounded-lg bg-surface-50 text-surface-600 text-sm focus:outline-none font-mono"
          />
          <button 
            @click="copyLink"
            class="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg font-medium hover:bg-primary-100 transition-colors whitespace-nowrap text-sm"
          >
            {{ copied ? '✓ Disalin!' : 'Salin' }}
          </button>
        </div>
      </div>
    </div>

    <template #footer>
      <button 
        type="button" 
        class="w-full inline-flex justify-center rounded-md border border-surface-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-surface-700 hover:bg-surface-50 focus:outline-none sm:w-auto sm:text-sm"
        @click="handleClose"
      >
        Tutup
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { useDriveStore } from '~/stores/drive'
import { useAuthStore } from '~/stores/auth'

const props = defineProps<{
  show: boolean
  fileId: number | null
}>()

const emit = defineEmits(['close'])

const driveStore = useDriveStore()
const authStore = useAuthStore()
const config = useRuntimeConfig()

const generating = ref(false)
const error = ref<string | null>(null)
const token = ref<string | null>(null)

const shareLink = computed(() => {
  if (!token.value || typeof window === 'undefined') return null
  return `${window.location.origin}/files/s/${token.value}`
})

const { copy, copied } = useClipboard({ source: shareLink as any })
const { success } = useToast()

const copyLink = () => {
  if (shareLink.value) {
    copy(shareLink.value)
    success('Link berhasil disalin!')
  }
}

const handleClose = () => {
  token.value = null
  error.value = null
  emit('close')
}

// Generate link when modal opens
watch(() => props.show, async (isOpen) => {
  if (isOpen && props.fileId && authStore.user) {
    generating.value = true
    error.value = null
    token.value = null
    const result = await driveStore.generateShareLink(props.fileId, authStore.user.id)
    if (result) {
      token.value = result
    } else {
      error.value = 'Gagal membuat link berbagi. Coba lagi.'
    }
    generating.value = false
  }
})
</script>
