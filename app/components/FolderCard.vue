<template>
  <div 
    class="bg-white border border-surface-200 rounded-xl p-4 hover:shadow-md hover:border-primary-200 cursor-pointer transition-all group flex flex-col justify-between h-32 relative"
    @dblclick="$emit('open')"
    @contextmenu.prevent="$emit('options', $event)"
  >
    <div class="flex items-start justify-between">
      <div class="p-2 bg-primary-50 rounded-lg text-primary-600 group-hover:bg-primary-100 group-hover:text-primary-700 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-6 h-6 fill-current"><path d="M216,72H130.67L102.93,35a16.12,16.12,0,0,0-9.6-6.45L35.85,26.17A16.09,16.09,0,0,0,16.29,40.1L16,40.33V208a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72Z"></path></svg>
      </div>
      <button class="p-1 text-surface-400 hover:text-surface-600 rounded-full hover:bg-surface-100 transition-opacity" @click.stop="$emit('options', $event)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 fill-current"><path d="M128,96a32,32,0,1,0,32,32A32,32,0,0,0,128,96Zm0,48a16,16,0,1,1,16-16A16,16,0,0,1,128,144Z"></path></svg>
      </button>
    </div>
    
    <div>
      <h3 class="font-medium text-surface-900 truncate" :title="folder.name">{{ folder.name }}</h3>
      <p class="text-xs text-surface-500 mt-1">{{ new Date(folder.createdAt).toLocaleDateString() }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FolderItem } from '~/stores/drive'

defineProps<{
  folder: FolderItem
}>()

defineEmits(['open', 'options'])
</script>
