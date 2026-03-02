<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          
          <div class="fixed inset-0 bg-surface-900 bg-opacity-75 transition-opacity backdrop-blur-sm" aria-hidden="true" @click="$emit('close')"></div>

          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div :class="['relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full', sizeClasses]">
            <div :class="[noPadding ? '' : 'bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4']">
              <div class="sm:flex sm:items-start">
                <div class="w-full" :class="[noPadding ? 'text-left' : 'mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left']">
                  <h3 v-if="title && !noPadding" class="text-lg leading-6 font-medium text-surface-900 mb-4" id="modal-title">{{ title }}</h3>
                  <div :class="[noPadding ? '' : 'mt-2']">
                    <slot />
                  </div>
                </div>
              </div>
            </div>
            <div v-if="$slots.footer" class="bg-surface-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  show: boolean
  title: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '5xl'
  noPadding?: boolean
}>(), {
  size: 'md',
  noPadding: false
})

defineEmits(['close'])

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'sm:max-w-sm'
    case 'md': return 'sm:max-w-md'
    case 'lg': return 'sm:max-w-lg'
    case 'xl': return 'sm:max-w-xl'
    case '2xl': return 'sm:max-w-2xl'
    case '5xl': return 'sm:max-w-5xl'
    default: return 'sm:max-w-lg'
  }
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
