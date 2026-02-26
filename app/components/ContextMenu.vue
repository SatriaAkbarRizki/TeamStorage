<template>
  <Teleport to="body">
    <div 
      v-if="show" 
      ref="menuRef"
      class="fixed z-50 bg-white rounded-lg shadow-xl border border-surface-100 py-1 w-48 overflow-hidden font-sans text-sm"
      :style="{ top: adjustedY + 'px', left: adjustedX + 'px' }"
      @click.stop
    >
      <!-- Trash View: Only Restore and Delete Permanently -->
      <template v-if="isTrash">
        <button @click="$emit('action', 'restore')" class="w-full text-left px-4 py-2 hover:bg-surface-50 text-surface-700 hover:text-primary-600 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-4 h-4 fill-current"><path d="M224,128a8,8,0,0,1-8,8H120v96a8,8,0,0,1-13.66,5.66l-96-96a8,8,0,0,1,0-11.32l96-96A8,8,0,0,1,120,40v96h96A8,8,0,0,1,224,128Z"></path></svg>
          Restore
        </button>
        <div class="h-px bg-surface-100 my-1"></div>
        <button @click="$emit('action', 'delete')" class="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-4 h-4 fill-current"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
          Delete Permanently
        </button>
      </template>
      
      <!-- Normal View: Full Menu -->
      <template v-else>
        <button @click="$emit('action', 'open')" class="w-full text-left px-4 py-2 hover:bg-surface-50 text-surface-700 hover:text-primary-600 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-4 h-4 fill-current"><path d="M216,72H130.67L102.93,35a16.12,16.12,0,0,0-9.6-6.45L35.85,26.17A16.09,16.09,0,0,0,16.29,40.1L16,40.33V208a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72ZM32,41.93l.35-.26,57.51,2.07L114.77,72H32ZM216,208H32V88H216v120Z"></path></svg>
          Open
        </button>
        <button @click="$emit('action', 'rename')" class="w-full text-left px-4 py-2 hover:bg-surface-50 text-surface-700 hover:text-primary-600 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-4 h-4 fill-current"><path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path></svg>
          Rename
        </button>
        <button v-if="itemType === 'file'" @click="$emit('action', 'share')" class="w-full text-left px-4 py-2 hover:bg-surface-50 text-surface-700 hover:text-primary-600 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-4 h-4 fill-current"><path d="M192,160a31.84,31.84,0,0,0-21.84,8.59l-52.3-31.38a32,32,0,0,0,0-18.42l52.3-31.38A32,32,0,1,0,160,64a31.88,31.88,0,0,0,2.16,11.58l-52.3,31.38a32,32,0,1,0,0,42.08l52.3,31.38A31.88,31.88,0,0,0,160,192a32,32,0,1,0,32-32Z"></path></svg>
          Share Link
        </button>
        <button v-if="itemType === 'file'" @click="$emit('action', 'download')" class="w-full text-left px-4 py-2 hover:bg-surface-50 text-surface-700 hover:text-primary-600 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-4 h-4 fill-current"><path d="M224,152v56a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V152a8,8,0,0,1,16,0v56H208V152a8,8,0,0,1,16,0ZM165.66,90.34a8,8,0,0,0-11.32,0L136,108.69V32a8,8,0,0,0-16,0v76.69L101.66,90.34A8,8,0,0,0,90.34,101.66l40,40a8,8,0,0,0,11.32,0l40-40A8,8,0,0,0,165.66,90.34Z"></path></svg>
          Download
        </button>
        <div class="h-px bg-surface-100 my-1"></div>
        <button @click="$emit('action', 'move')" class="w-full text-left px-4 py-2 hover:bg-surface-50 text-surface-700 hover:text-primary-600 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-4 h-4 fill-current"><path d="M222,154.14,166,210.14A8,8,0,0,1,160,216V176H40a8,8,0,0,1,0-16H160V120a8,8,0,0,1,13.66-5.66l56,56A8,8,0,0,1,222,154.14ZM96,120A56.06,56.06,0,0,0,40,64H160V80a8,8,0,0,1,16,0V48a8,8,0,0,1-8-8H40A72.08,72.08,0,0,1,112,112v8a8,8,0,0,1-16,0Z"></path></svg>
          Move to...
        </button>
        <button @click="$emit('action', 'delete')" class="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-4 h-4 fill-current"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
          Delete
        </button>
      </template>
    </div>
    
    <!-- Backdrop to close context menu -->
    <div v-if="show" class="fixed inset-0 z-40 bg-transparent" @click="$emit('close')" @contextmenu.prevent="$emit('close')"></div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

const props = defineProps<{
  show: boolean
  x: number
  y: number
  isTrash?: boolean
  itemType?: 'file' | 'folder' | null
}>()

const emit = defineEmits(['close', 'action'])

const menuRef = ref<HTMLElement | null>(null)
const adjustedX = ref(props.x)
const adjustedY = ref(props.y)

watch(() => props.show, async (newVal) => {
  if (newVal) {
    adjustedX.value = props.x
    adjustedY.value = props.y
    
    await nextTick()
    
    if (menuRef.value) {
      const menuWidth = menuRef.value.offsetWidth
      const menuHeight = menuRef.value.offsetHeight
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      
      // Horizontal adjustment
      if (props.x + menuWidth > windowWidth) {
        adjustedX.value = windowWidth - menuWidth - 16 // 16px padding
      }
      
      // Vertical adjustment
      if (props.y + menuHeight > windowHeight) {
        adjustedY.value = windowHeight - menuHeight - 16 // 16px padding
      }
    }
  }
})

// Also watch x/y in case they change while menu is open (though unlikely for context menu)
watch([() => props.x, () => props.y], () => {
  if (props.show) {
    adjustedX.value = props.x
    adjustedY.value = props.y
  }
})
</script>
