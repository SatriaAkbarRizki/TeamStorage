<template>
  <div 
    class="bg-white border border-surface-200 rounded-xl overflow-hidden hover:shadow-md hover:border-primary-200 cursor-pointer transition-all group flex flex-col h-48 relative"
    @dblclick="$emit('download')"
    @contextmenu.prevent="$emit('options', $event)"
  >
    <!-- Thumbnail Area -->
    <div class="h-28 bg-surface-50 flex items-center justify-center border-b border-surface-100 overflow-hidden relative">
      <div class="text-surface-300">
        <svg v-if="file.fileType === 'application/pdf'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-12 h-12 fill-current text-red-400"><path d="M224,152a8,8,0,0,1-8,8H192v16h16a8,8,0,0,1,0,16H192v16a8,8,0,0,1-16,0V144a8,8,0,0,1,8-8h32A8,8,0,0,1,224,152ZM128,136H88a8,8,0,0,0-8,8v64a8,8,0,0,0,8,8h40a8,8,0,0,0,8-8V144A8,8,0,0,0,128,136Zm-8,64H96V152h24Zm-72,8H64V184H80a8,8,0,0,0,0-16H64V152H80a8,8,0,0,0,0-16H48a8,8,0,0,0-8,8v64A8,8,0,0,0,48,208Zm160-52V40a8,8,0,0,0-8-8H96L48,80v16a8,8,0,0,1-16,0V80A24,24,0,0,1,56,56h32V24a8,8,0,0,1,16,0V56h96v96a8,8,0,0,1,0,16Z"/></svg>
        <svg v-else-if="file.fileType.startsWith('image/')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-12 h-12 fill-current text-purple-400"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm-4.69,168H44.69l46.2-61.6,23.37,31.16a8,8,0,0,0,12.74.08L166,125.66l45.31,82.34ZM216,195.42,166,104.58a8,8,0,0,0-14-.08l-38.94,51.92-23.4-31.2a8,8,0,0,0-12.71-.09L40,174.58V56H216V195.42ZM96,108a12,12,0,1,1,12-12A12,12,0,0,1,96,108Z"/></svg>
        <svg v-else-if="file.fileType.startsWith('video/')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-12 h-12 fill-current text-blue-400"><path d="M164.44,105.34l-48-32A8,8,0,0,0,104,80v64a8,8,0,0,0,12.44,6.66l48-32a8,8,0,0,0,0-13.32ZM120,129.05V95l29.56,17ZM216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200Z"/></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-12 h-12 fill-current text-blue-400"><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"/></svg>
      </div>

      <button class="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-lg text-surface-500 hover:text-primary-600 shadow-sm border border-surface-100 transition-all active:scale-95" @click.stop="$emit('options', $event)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 fill-current"><path d="M112,64a16,16,0,1,1,16,16A16,16,0,0,1,112,64Zm16,48a16,16,0,1,0,16,16A16,16,0,0,0,128,112Zm0,64a16,16,0,1,0,16,16A16,16,0,0,0,128,176Z"/></svg>
      </button>
    </div>
    
    <div class="p-3 flex-1 flex flex-col justify-between">
      <div>
        <h3 class="font-medium text-surface-900 truncate text-sm" :title="file.nameFile">{{ file.nameFile }}</h3>
        <p class="text-xs text-surface-500 mt-1">{{ driveStore.formatSize(file.fileSize) }} • {{ new Date(file.createdAt).toLocaleDateString('id-ID') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDriveStore } from '~/stores/drive'
import type { ApiFile } from '~/stores/drive'

defineProps<{ file: ApiFile }>()
defineEmits(['options', 'download'])

const driveStore = useDriveStore()
</script>
