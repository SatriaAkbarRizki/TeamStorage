<template>
  <div class="min-h-screen bg-surface-50 flex font-sans text-surface-900 overflow-hidden">
    <!-- Sidebar -->
    <aside 
      class="bg-white border-r border-surface-200 flex-shrink-0 flex flex-col fixed inset-y-0 left-0 z-30 transition-transform duration-300 w-64 lg:static lg:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Logo -->
      <div class="h-16 flex items-center px-6 border-b border-surface-100">
        <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white mr-3 shadow-md shadow-primary-500/20 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 fill-current"><path d="M216,72H130.67L102.93,35a16.12,16.12,0,0,0-9.6-6.45L35.85,26.17A16.09,16.09,0,0,0,16.29,40.1L16,40.33V208a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72ZM32,41.93l.35-.26,57.51,2.07L114.77,72H32ZM216,208H32V88H216v120Z"></path></svg>
        </div>
        <div class="flex flex-col leading-tight">
          <span class="font-bold text-lg tracking-tight">LKPN</span>
          <span class="text-[9px] text-surface-400 leading-tight">Laporan Kegiatan Pencegahan Narkoba Langsa</span>
        </div>
      </div>

      <!-- New Button -->
      <div class="p-4 relative">
        <button 
            @click="newDropdownOpen = !newDropdownOpen" 
            class="w-full bg-white border border-surface-200 hover:bg-surface-50 text-surface-700 shadow-sm rounded-xl py-3 px-4 flex items-center justify-center gap-2 transition-all hover:shadow-md active:scale-[0.98] group"
        >
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 fill-current text-primary-600 group-hover:scale-110 transition-transform"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path></svg>
           <span class="font-medium text-surface-700 group-hover:text-surface-900">New Item</span>
        </button>

        <!-- Dropdown Menu -->
        <div v-if="newDropdownOpen" class="absolute top-20 left-4 w-56 bg-white rounded-xl shadow-xl border border-surface-100 z-[60] overflow-hidden ring-1 ring-black ring-opacity-5 origin-top-left transition-all">
            <div class="py-1">
                <button @click="openModal('createFolder')" class="w-full text-left px-4 py-3 text-sm text-surface-700 hover:bg-surface-50 hover:text-primary-600 flex items-center gap-3 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 fill-current"><path d="M216,72H130.67L102.93,35a16.12,16.12,0,0,0-9.6-6.45L35.85,26.17A16.09,16.09,0,0,0,16.29,40.1L16,40.33V208a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72ZM32,41.93l.35-.26,57.51,2.07L114.77,72H32ZM216,208H32V88H216v120Z"></path></svg>
                    New Folder
                </button>
                <div class="h-px bg-surface-100 mx-3"></div>
                <button @click="openModal('upload')" class="w-full text-left px-4 py-3 text-sm text-surface-700 hover:bg-surface-50 hover:text-primary-600 flex items-center gap-3 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 fill-current"><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"></path></svg>
                    File Upload
                </button>
            </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        <nav class="space-y-1">
           <a href="#" @click.prevent="goToMyDrive" class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors" :class="isMyDriveActive ? 'bg-primary-50 text-primary-700' : 'text-surface-700 hover:bg-surface-50 hover:text-surface-900'">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 fill-current"><path d="M216,72H130.67L102.93,35a16.12,16.12,0,0,0-9.6-6.45L35.85,26.17A16.09,16.09,0,0,0,16.29,40.1L16,40.33V208a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72ZM32,41.93l.35-.26,57.51,2.07L114.77,72H32ZM216,208H32V88H216v120Z"></path></svg>
             My Drive
           </a>

           <NuxtLink to="/shared" class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors" :class="route.path === '/shared' ? 'bg-primary-50 text-primary-700' : 'text-surface-700 hover:bg-surface-50 hover:text-surface-900'">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 fill-current"><path d="M192,160a31.84,31.84,0,0,0-21.84,8.59l-52.3-31.38a32,32,0,0,0,0-18.42l52.3-31.38A32,32,0,1,0,160,64a31.88,31.88,0,0,0,2.16,11.58l-52.3,31.38a32,32,0,1,0,0,42.08l52.3,31.38A31.88,31.88,0,0,0,160,192a32,32,0,1,0,32-32Z"></path></svg>
             Shared Files
           </NuxtLink>

           <a href="#" @click.prevent="driveStore.setFilter('trash')" class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors" :class="driveStore.currentFilter === 'trash' ? 'bg-primary-50 text-primary-700' : 'text-surface-700 hover:bg-surface-50 hover:text-surface-900'">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 fill-current"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
             Trash
           </a>
        </nav>
      </nav>

      <!-- Storage Usage -->
      <div class="p-6 border-t border-surface-100">
        <div class="mb-2 flex justify-between text-xs font-medium">
          <span class="text-surface-600">Storage</span>
          <span class="text-primary-700">{{ diskPercentDisplay }}% Used</span>
        </div>
        <div class="h-2 bg-surface-100 rounded-full overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-500"
            :style="{ width: driveStore.diskUsagePercent + '%' }"
          ></div>
        </div>
        <p class="mt-2 text-xs text-surface-500">{{ driveStore.diskUsageMB }} MB of 10 GB used</p>
      </div>
    </aside>

    <!-- Main Content wrapper -->
    <div class="flex-1 flex flex-col min-w-0 h-screen transition-all duration-300">
       <!-- Header -->
       <header class="h-16 bg-white border-b border-surface-200 flex items-center justify-between px-4 lg:px-8 z-20 flex-shrink-0">
        
        <!-- Mobile Menu Button -->
        <button @click="sidebarOpen = !sidebarOpen" class="lg:hidden p-2 text-surface-500 hover:text-surface-900 focus:outline-none rounded-lg hover:bg-surface-50">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-6 h-6 fill-current"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
        </button>

        <!-- Search Bar -->
        <div class="flex-1 max-w-xl mx-auto px-2 md:px-4">
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg v-if="!searchLoading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 text-surface-400 group-focus-within:text-primary-500 transition-colors fill-current"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
              <svg v-else class="animate-spin w-5 h-5 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
            </div>
            <input 
              v-model="searchInput"
              type="text"
              class="block w-full pl-10 pr-8 py-2 border border-surface-200 rounded-xl leading-5 bg-surface-50 text-surface-900 placeholder-surface-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all sm:text-sm"
              placeholder="Cari file atau folder..."
            >
            <!-- Clear button -->
            <button 
              v-if="searchInput"
              @click="clearSearch"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-surface-400 hover:text-surface-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-4 h-4 fill-current"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
            </button>
          </div>
        </div>

        <!-- Right Hand Side -->
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-3 relative cursor-pointer" @click="profileDropdownOpen = !profileDropdownOpen">
              <div class="text-right hidden sm:block">
                  <p class="text-sm font-medium text-surface-900">{{ authStore.user?.name || 'User' }}</p>
                  <p class="text-xs text-surface-500">{{ authStore.user?.email || 'user@example.com' }}</p>
              </div>
              <img 
                 :src="authStore.avatarUrl" 
                 alt="Profile" 
                 class="h-9 w-9 rounded-full border border-surface-200 object-cover"
              >
              
              <!-- Profile Dropdown -->
              <div v-if="profileDropdownOpen" class="absolute top-12 right-0 w-48 bg-white rounded-xl shadow-xl border border-surface-100 z-50 overflow-hidden ring-1 ring-black ring-opacity-5 origin-top-right transition-all">
                <div class="py-1">
                    <div class="h-px bg-surface-100 my-1"></div>
                    <button @click="authStore.logout()" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                        Sign out
                    </button>
                </div>
              </div>
          </div>
        </div>
      </header>
      
      <!-- Content Area with scroll -->
      <main class="flex-1 overflow-auto p-4 lg:p-8 bg-surface-50 relative" @click="closeDropdowns">
        <slot />
      </main>
    </div>
    
    <!-- Mobile Sidebar Overlay -->
    <div v-if="sidebarOpen" @click="sidebarOpen = false" class="fixed inset-0 z-20 bg-surface-900/50 lg:hidden backdrop-blur-sm transition-opacity"></div>
    
    <!-- Modals -->
    <CreateFolderModal />
    <UploadFileModal />
  </div>
</template>

<script setup lang="ts">
import { useDriveStore } from '~/stores/drive'

const sidebarOpen = ref(false)
const newDropdownOpen = ref(false)
const profileDropdownOpen = ref(false)
const authStore = useAuthStore()
const driveStore = useDriveStore()
const router = useRouter()
const route = useRoute()

// Search with 1.5s debounce
const searchInput = ref('')
const searchLoading = ref(false)
let searchTimer: ReturnType<typeof setTimeout> | null = null

watch(searchInput, (val) => {
  driveStore.searchQuery = val
  if (searchTimer) clearTimeout(searchTimer)
  if (!val.trim()) {
    driveStore.clearSearch()
    searchLoading.value = false
    return
  }
  searchLoading.value = true
  searchTimer = setTimeout(async () => {
    await driveStore.searchFiles(val)
    searchLoading.value = false
  }, 1500)
})

const clearSearch = () => {
  searchInput.value = ''
  driveStore.clearSearch()
  searchLoading.value = false
}

// Disk usage computed display
const diskPercentDisplay = computed(() => driveStore.diskUsagePercent.toFixed(1))

// Is My Drive active (not trash, not shared page, not searching)
const isMyDriveActive = computed(() =>
  !driveStore.currentFilter && route.path !== '/shared'
)

const goToMyDrive = () => {
  driveStore.setCurrentFolder(null)
  if (route.path !== '/dashboard') router.push('/dashboard')
}

// Close sidebar on route change on mobile
router.afterEach(() => {
  sidebarOpen.value = false
  newDropdownOpen.value = false
  profileDropdownOpen.value = false
})

const openModal = (type: 'createFolder' | 'upload') => {
    driveStore.openModal(type)
    newDropdownOpen.value = false
}

const closeDropdowns = () => {
    newDropdownOpen.value = false
    profileDropdownOpen.value = false
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e5e7eb;
  border-radius: 20px;
}
</style>
