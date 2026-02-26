<template>
  <div 
    class="bg-white border border-surface-200 rounded-xl p-4 hover:shadow-md hover:border-primary-200 cursor-pointer transition-all group flex flex-col justify-between h-32 relative"
    @dblclick="$emit('open')"
    @contextmenu.prevent="$emit('options', $event)"
  >
    <div class="flex items-start justify-between">
      <div class="p-2 bg-primary-50 rounded-lg text-primary-600 group-hover:bg-primary-100 group-hover:text-primary-700 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-6 h-6 fill-current"><path d="M216,72H130.67L102.93,35a16.12,16.12,0,0,0-9.6-6.45L35.85,26.17A16.09,16.09,0,0,0,16.29,40.1L16,40.33V208a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72Z"/></svg>
      </div>
      <button class="p-2 text-surface-400 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-all active:scale-95" @click.stop="$emit('options', $event)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 fill-current"><path d="M112,64a16,16,0,1,1,16,16A16,16,0,0,1,112,64Zm16,48a16,16,0,1,0,16,16A16,16,0,0,0,128,112Zm0,64a16,16,0,1,0,16,16A16,16,0,0,0,128,176Z"/></svg>
      </button>
    </div>
    
    <div>
      <h3 class="font-medium text-surface-900 truncate" :title="folder.nameFolder">{{ folder.nameFolder }}</h3>
      <p class="text-xs text-surface-500 mt-1">{{ folder.userName }} • {{ new Date(folder.createdAt).toLocaleDateString('id-ID') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ApiFolder } from '~/stores/drive'

defineProps<{ folder: ApiFolder }>()
defineEmits(['open', 'options'])
</script>
