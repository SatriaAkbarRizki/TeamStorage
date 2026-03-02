<template>
  <BaseModal :show="show" @close="closeModal" title="Pratinjau File" size="5xl" noPadding>
    <div class="flex flex-col h-[65vh] md:h-[80vh] w-full">
      <!-- Header Info -->
      <div class="flex items-center justify-between p-4 border-b border-surface-100 bg-white">
        <div class="flex items-center gap-3">
          <div class="p-2.5 bg-surface-100 rounded-xl">
            <svg v-if="file?.fileType === 'application/pdf'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-6 h-6 fill-current text-red-500"><path d="M224,152a8,8,0,0,1-8,8H192v16h16a8,8,0,0,1,0,16H192v16a8,8,0,0,1-16,0V144a8,8,0,0,1,8-8h32A8,8,0,0,1,224,152ZM128,136H88a8,8,0,0,0-8,8v64a8,8,0,0,0,8,8h40a8,8,0,0,0,8-8V144A8,8,0,0,0,128,136Zm-8,64H96V152h24Zm-72,8H64V184H80a8,8,0,0,0,0-16H64V152H80a8,8,0,0,0,0-16H48a8,8,0,0,0-8,8v64A8,8,0,0,0,48,208Zm160-52V40a8,8,0,0,0-8-8H96L48,80v16a8,8,0,0,1-16,0V80A24,24,0,0,1,56,56h32V24a8,8,0,0,1,16,0V56h96v96a8,8,0,0,1,0,16Z"/></svg>
            <svg v-else-if="file?.fileType.startsWith('image/')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-6 h-6 fill-current text-purple-500"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm-4.69,168H44.69l46.2-61.6,23.37,31.16a8,8,0,0,0,12.74.08L166,125.66l45.31,82.34ZM216,195.42,166,104.58a8,8,0,0,0-14-.08l-38.94,51.92-23.4-31.2a8,8,0,0,0-12.71-.09L40,174.58V56H216V195.42ZM96,108a12,12,0,1,1,12-12A12,12,0,0,1,96,108Z"/></svg>
            <svg v-else-if="file?.fileType.startsWith('video/')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-6 h-6 fill-current text-blue-500"><path d="M164.44,105.34l-48-32A8,8,0,0,0,104,80v64a8,8,0,0,0,12.44,6.66l48-32a8,8,0,0,0,0-13.32ZM120,129.05V95l29.56,17ZM216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200Z"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-6 h-6 fill-current text-primary-500"><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"/></svg>
          </div>
          <div class="min-w-0">
            <h3 class="font-semibold text-surface-900 truncate max-w-[200px] md:max-w-md" :title="file?.nameFile">{{ file?.nameFile }}</h3>
            <p class="text-xs text-surface-500 font-medium">{{ driveStore.formatSize(file?.fileSize || 0) }}</p>
          </div>
        </div>
        
        <button 
          @click="download" 
          class="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all font-medium text-sm shadow-sm active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-4.5 h-4.5 fill-current"><path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66,37.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,156.69V40a8,8,0,0,0-16,0V156.69L93.66,130.34a8,8,0,0,0-11.32,11.32Z"/></svg>
          Unduh
        </button>
      </div>

      <!-- Preview Area -->
      <div class="flex-1 bg-surface-950 rounded-2xl overflow-hidden relative border border-surface-800 shadow-inner">
        <!-- PDF Preview -->
        <iframe 
          v-if="file?.fileType === 'application/pdf' && objectUrl" 
          :src="`${objectUrl}#toolbar=0&navpanes=0&scrollbar=0`" 
          class="w-full h-full border-none"
        ></iframe>

        <!-- Image Preview -->
        <div v-else-if="file?.fileType.startsWith('image/')" class="w-full h-full flex items-center justify-center p-4">
          <img 
            v-if="objectUrl" 
            :src="objectUrl" 
            :alt="file?.nameFile" 
            class="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
          />
        </div>

        <!-- Video Preview -->
        <video 
          v-else-if="file?.fileType.startsWith('video/')" 
          :src="fileUrl" 
          controls 
          autoplay
          class="w-full h-full object-contain"
        ></video>

        <!-- No Preview Available -->
        <div v-else-if="!loading" class="w-full h-full flex flex-col items-center justify-center text-surface-400 gap-5 px-6 text-center">
          <div class="w-20 h-20 bg-surface-800 rounded-full flex items-center justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-10 h-10 fill-current opacity-40"><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"/></svg>
          </div>
          <div>
            <p class="text-surface-200 font-medium text-lg">Pratinjau tidak tersedia</p>
            <p class="text-sm mt-1 mb-4 opacity-70">Format file ini belum didukung untuk dilihat langsung.</p>
          </div>
          <button @click="download" class="text-primary-400 hover:text-primary-300 font-semibold underline decoration-2 underline-offset-8 transition-colors">Unduh File</button>
        </div>

        <!-- Loading state -->
        <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-surface-950/80 backdrop-blur-sm z-10">
          <div class="flex flex-col items-center gap-4">
            <svg class="animate-spin w-12 h-12 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="text-surface-400 text-sm font-medium animate-pulse">Menyiapkan pratinjau...</p>
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { useDriveStore, type ApiFile } from '~/stores/drive'

const props = defineProps<{
  show: boolean
  file: ApiFile | null
}>()

const emit = defineEmits(['close'])

const driveStore = useDriveStore()
const config = useRuntimeConfig()
const loading = ref(false)
const objectUrl = ref<string | null>(null)

const fileUrl = computed(() => {
  if (!props.file) return ''
  return `${config.public.apiBase}/files/download?id=${props.file.id}`
})

const closeModal = () => {
  if (objectUrl.value) {
    URL.revokeObjectURL(objectUrl.value)
    objectUrl.value = null
  }
  emit('close')
}

watch(() => props.show, async (newVal) => {
  if (newVal && props.file) {
    loading.value = true
    
    // Revoke old URL if exists
    if (objectUrl.value) {
      URL.revokeObjectURL(objectUrl.value)
      objectUrl.value = null
    }

    // For PDFs and Images, fetch as blob to prevent redirection and handle authorization
    if (props.file.fileType === 'application/pdf' || props.file.fileType.startsWith('image/')) {
      try {
        const response = await $fetch<Blob>(`${config.public.apiBase}/files/download?id=${props.file.id}`, {
          responseType: 'blob',
          credentials: 'include'
        })
        objectUrl.value = URL.createObjectURL(response)
      } catch (err) {
        console.error('Failed to load file blob:', err)
      }
    }
    
    loading.value = false
  } else if (!newVal) {
    if (objectUrl.value) {
      URL.revokeObjectURL(objectUrl.value)
      objectUrl.value = null
    }
  }
})

const download = () => {
  if (props.file) {
    driveStore.downloadFile(props.file.id, props.file.nameFile)
  }
}
</script>
