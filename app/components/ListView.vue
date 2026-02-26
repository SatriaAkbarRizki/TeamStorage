<template>
  <div class="bg-white border border-surface-200 rounded-xl overflow-x-auto shadow-sm custom-scrollbar">
    <table class="min-w-full divide-y divide-surface-200">
      <thead class="bg-surface-50">
        <tr>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">Nama</th>
          <th scope="col" class="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">Pemilik</th>
          <th scope="col" class="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">Tanggal</th>
          <th scope="col" class="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">Ukuran</th>
          <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-surface-500 uppercase tracking-wider">Aksi</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-surface-200">
        <!-- Folders -->
        <tr 
          v-for="folder in folders" 
          :key="folder.id" 
          class="hover:bg-surface-50 cursor-pointer group transition-colors"
          @dblclick="$emit('open-folder', { id: folder.id, name: folder.nameFolder })"
          @contextmenu.prevent="$emit('options', $event, folder.id, 'folder', folder.nameFolder)"
        >
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <div class="flex-shrink-0 h-8 w-8 text-primary-600 bg-primary-50 rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 fill-current"><path d="M216,72H130.67L102.93,35a16.12,16.12,0,0,0-9.6-6.45L35.85,26.17A16.09,16.09,0,0,0,16.29,40.1L16,40.33V208a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72Z"/></svg>
              </div>
              <div class="text-sm font-medium text-surface-900">{{ folder.nameFolder }}</div>
            </div>
          </td>
          <td class="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-surface-500">{{ folder.userName }}</td>
          <td class="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-surface-500">{{ new Date(folder.createdAt).toLocaleDateString('id-ID') }}</td>
          <td class="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-surface-500">-</td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button 
              class="text-surface-400 hover:text-primary-600 p-2 rounded-lg hover:bg-primary-50 transition-all active:scale-95" 
              @click.stop="$emit('options', $event, folder.id, 'folder', folder.nameFolder)"
              title="Opsi"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 fill-current"><path d="M112,64a16,16,0,1,1,16,16A16,16,0,0,1,112,64Zm16,48a16,16,0,1,0,16,16A16,16,0,0,0,128,112Zm0,64a16,16,0,1,0,16,16A16,16,0,0,0,128,176Z"/></svg>
            </button>
          </td>
        </tr>

        <!-- Files -->
        <tr 
          v-for="file in files" 
          :key="file.id" 
          class="hover:bg-surface-50 cursor-pointer group transition-colors"
          @dblclick="$emit('open-file', file)"
          @contextmenu.prevent="$emit('options', $event, file.id, 'file', file.nameFile)"
        >
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <div class="flex-shrink-0 h-8 w-8 flex items-center justify-center mr-3 bg-surface-100 rounded-lg text-surface-500">
                <svg v-if="file.fileType === 'application/pdf'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 fill-current text-red-500"><path d="M224,152a8,8,0,0,1-8,8H192v16h16a8,8,0,0,1,0,16H192v16a8,8,0,0,1-16,0V144a8,8,0,0,1,8-8h32A8,8,0,0,1,224,152ZM128,136H88a8,8,0,0,0-8,8v64a8,8,0,0,0,8,8h40a8,8,0,0,0,8-8V144A8,8,0,0,0,128,136Zm-8,64H96V152h24Zm-72,8H64V184H80a8,8,0,0,0,0-16H64V152H80a8,8,0,0,0,0-16H48a8,8,0,0,0-8,8v64A8,8,0,0,0,48,208Zm160-52V40a8,8,0,0,0-8-8H96L48,80v16a8,8,0,0,1-16,0V80A24,24,0,0,1,56,56h32V24a8,8,0,0,1,16,0V56h96v96a8,8,0,0,1,0,16Z"/></svg>
                <svg v-else-if="file.fileType.startsWith('image/')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 fill-current text-purple-500"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm-4.69,168H44.69l46.2-61.6,23.37,31.16a8,8,0,0,0,12.74.08L166,125.66l45.31,82.34ZM216,195.42,166,104.58a8,8,0,0,0-14-.08l-38.94,51.92-23.4-31.2a8,8,0,0,0-12.71-.09L40,174.58V56H216V195.42ZM96,108a12,12,0,1,1,12-12A12,12,0,0,1,96,108Z"/></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 fill-current"><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"/></svg>
              </div>
              <div class="text-sm font-medium text-surface-900">{{ file.nameFile }}</div>
            </div>
          </td>
          <td class="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-surface-500">{{ file.userName }}</td>
          <td class="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-surface-500">{{ new Date(file.createdAt).toLocaleDateString('id-ID') }}</td>
          <td class="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-surface-500">{{ driveStore.formatSize(file.fileSize) }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button 
              class="text-surface-400 hover:text-primary-600 p-2 rounded-lg hover:bg-primary-50 transition-all active:scale-95" 
              @click.stop="$emit('options', $event, file.id, 'file', file.nameFile)"
              title="Opsi"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 fill-current"><path d="M112,64a16,16,0,1,1,16,16A16,16,0,0,1,112,64Zm16,48a16,16,0,1,0,16,16A16,16,0,0,0,128,112Zm0,64a16,16,0,1,0,16,16A16,16,0,0,0,128,176Z"/></svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useDriveStore } from '~/stores/drive'
import type { ApiFolder, ApiFile } from '~/stores/drive'

defineProps<{
  folders: ApiFolder[]
  files: ApiFile[]
}>()

defineEmits(['open-folder', 'open-file', 'options'])

const driveStore = useDriveStore()
</script>
