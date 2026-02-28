<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-xl font-bold text-surface-900">Shared Files</h1>
        <p class="text-sm text-surface-500 mt-0.5">File yang sudah kamu bagikan via link</p>
      </div>
      <button
        @click="driveStore.fetchSharedFiles()"
        class="p-2 text-surface-500 hover:text-surface-900 bg-white border border-surface-200 rounded-lg shadow-sm hover:bg-surface-50 transition-colors"
        title="Refresh"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 fill-current"><path d="M224,48V96a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h28.69L182.06,73.37a79.56,79.56,0,0,0-56.13-23.43C94.34,49.85,66.54,67,51.36,94.18a8,8,0,1,1-13.9-7.88C55.85,53.44,90.76,33.86,125.93,34A95.43,95.43,0,0,1,193.3,61.74L208,76.69V48a8,8,0,0,1,16,0Zm-16.46,105.82C191.85,177,164.05,194.15,132.46,194.15A95.43,95.43,0,0,1,63,166.26L48,151.31V176a8,8,0,0,1-16,0V128a8,8,0,0,1,8-8H88a8,8,0,0,1,0,16H59.31l14.63,14.63a79.56,79.56,0,0,0,58.52,27.52c31.59,0,59.39-17.16,74.57-44.45a8,8,0,1,1,13.9,7.88Z"/></svg>
      </button>
    </div>

    <!-- Loading -->
    <div v-if="driveStore.loading" class="flex items-center justify-center py-20">
      <div class="flex flex-col items-center gap-3 text-surface-400">
        <svg class="animate-spin w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        <span class="text-sm">Memuat data...</span>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="driveStore.sharedFiles.length === 0" class="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-surface-200 rounded-2xl bg-surface-50">
      <div class="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mb-4 text-surface-400">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-8 h-8 fill-current"><path d="M192,160a31.84,31.84,0,0,0-21.84,8.59l-52.3-31.38a32,32,0,0,0,0-18.42l52.3-31.38A32,32,0,1,0,160,64a31.88,31.88,0,0,0,2.16,11.58l-52.3,31.38a32,32,0,1,0,0,42.08l52.3,31.38A31.88,31.88,0,0,0,160,192a32,32,0,1,0,32-32Z"/></svg>
      </div>
      <h3 class="text-lg font-medium text-surface-900">Belum ada file yang dibagikan</h3>
      <p class="text-surface-500 mt-1">Klik kanan file di My Drive lalu pilih "Share Link"</p>
    </div>

    <!-- Shared Files Table -->
    <div v-else class="bg-white rounded-2xl border border-surface-200 shadow-sm overflow-hidden">
      <table class="min-w-full divide-y divide-surface-100">
        <thead class="bg-surface-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Token</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">File ID</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Dibuat</th>
            <th class="px-6 py-3 text-right text-xs font-semibold text-surface-500 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-surface-100">
          <tr v-for="item in driveStore.sharedFiles" :key="item.id" class="hover:bg-surface-50 transition-colors">
            <!-- Token -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-2">
                <span class="font-mono text-sm text-surface-700 bg-surface-100 px-2 py-1 rounded">{{ item.token }}</span>
              </div>
            </td>
            <!-- File ID -->
            <td class="px-6 py-4">
              <span class="text-sm text-surface-600">File #{{ item.fileId }}</span>
            </td>
            <!-- Created At -->
            <td class="px-6 py-4">
              <span class="text-sm text-surface-500">{{ formatDate(item.createdAt) }}</span>
            </td>
            <!-- Actions -->
            <td class="px-6 py-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <!-- Copy link -->
                <button
                  @click="copyShareLink(item.token)"
                  class="px-3 py-1.5 text-xs font-medium text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
                  :title="'Salin link share'"
                >
                  {{ copiedToken === item.token ? '✓ Disalin' : 'Salin Link' }}
                </button>
                <!-- View page -->
                <NuxtLink
                  :to="`/files/s/${item.token}`"
                  target="_blank"
                  class="px-3 py-1.5 text-xs font-medium text-surface-700 bg-surface-100 hover:bg-surface-200 rounded-lg transition-colors"
                >
                  Lihat
                </NuxtLink>
                <!-- Delete -->
                <button
                  @click="confirmDelete(item.id)"
                  class="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                >
                  Hapus
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDriveStore } from '~/stores/drive'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})

const driveStore = useDriveStore()
const config = useRuntimeConfig()
const { success } = useToast()

const copiedToken = ref<string | null>(null)

onMounted(() => {
  driveStore.fetchSharedFiles()
})

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const copyShareLink = (token: string) => {
  const link = `${window.location.origin}/files/s/${token}`
  navigator.clipboard.writeText(link)
  success('Link berhasil disalin!')
  copiedToken.value = token
  setTimeout(() => { copiedToken.value = null }, 2000)
}

const confirmDelete = async (id: number) => {
  if (confirm('Hapus share link ini? Orang yang memiliki link tidak dapat menggunakannya lagi.')) {
    await driveStore.deleteShareFile(id)
  }
}
</script>
