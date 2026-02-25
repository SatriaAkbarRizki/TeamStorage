<template>
  <div class="min-h-screen flex items-center justify-center bg-surface-50 p-4 relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
      <div class="absolute -top-24 -left-24 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-50"></div>
      <div class="absolute top-[20%] right-[10%] w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
      <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-40"></div>
    </div>

    <!-- Content Card -->
    <div class="relative z-10 w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-surface-900 tracking-tight flex items-center justify-center gap-2">
            <div class="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-6 h-6 fill-current"><path d="M216,72H130.67L102.93,35a16.12,16.12,0,0,0-9.6-6.45L35.85,26.17A16.09,16.09,0,0,0,16.29,40.1L16,40.33V208a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72ZM32,41.93l.35-.26,57.51,2.07L114.77,72H32ZM216,208H32V88H216v120Z"></path></svg>
            </div>
            LKPN
        </h1>
        <p class="text-surface-500 mt-2 text-sm">Laporan Kegiatan Pencegahan Narkoba Langsa</p>
      </div>
      
      <div class="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">
        <slot />
      </div>

      <div class="mt-8 text-center text-sm text-surface-400">
        &copy; {{ new Date().getFullYear() }} LKPN. All rights reserved.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Auth Layout
</script>
