<template>
  <div class="auth-page">
    <h2 class="text-2xl font-bold mb-6 text-center text-surface-800">Buat Akun Baru</h2>
    
    <form @submit.prevent="handleRegister" class="space-y-4">
      <!-- Profile Image Upload (Optional) -->
      <div class="flex flex-col items-center mb-6">
        <div class="relative w-24 h-24 mb-2 group cursor-pointer" @click="triggerFileInput">
          <div class="w-full h-full rounded-full overflow-hidden border-2 border-dashed border-surface-300 flex items-center justify-center bg-surface-50 group-hover:border-primary-500 transition-colors">
            <img v-if="avatarPreview" :src="avatarPreview" class="w-full h-full object-cover" />
            <span v-else class="text-surface-400 text-xs text-center px-2 group-hover:text-primary-500">Upload Foto</span>
          </div>
          <div class="absolute bottom-0 right-0 bg-primary-600 text-white p-1 rounded-full shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-4 h-4 fill-current"><path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66-8.34a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,110.69V32a8,8,0,0,0-16,0v78.69L93.66,84.34A8,8,0,0,0,82.34,95.66Z"></path></svg>
          </div>
        </div>
        <input 
          ref="fileInput"
          type="file" 
          accept="image/*" 
          class="hidden"
          @change="handleFileChange"
        />
        <span class="text-xs text-surface-500">Opsional</span>
      </div>

      <div>
        <label for="name" class="block text-sm font-medium text-surface-700 mb-1">Nama Lengkap</label>
        <input 
          v-model="name"
          type="text" 
          id="name" 
          required
          class="w-full px-4 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder:text-surface-400"
          placeholder="nama lengkap anda"
        />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-surface-700 mb-1">Alamat Email</label>
        <input 
          v-model="email"
          type="email" 
          id="email" 
          required
          class="w-full px-4 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder:text-surface-400"
          placeholder="anda@contoh.com"
        />
      </div>
      
      <div>
        <label for="password" class="block text-sm font-medium text-surface-700 mb-1">Password</label>
        <input 
          v-model="password"
          type="password" 
          id="password" 
          required
          class="w-full px-4 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder:text-surface-400"
          placeholder="••••••••"
        />
      </div>

      <button 
        type="submit" 
        :disabled="loading"
        class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
      >
        <span v-if="loading" class="animate-spin mr-2">⟳</span>
        {{ loading ? 'Mendaftar...' : 'Daftar' }}
      </button>
    </form>

    <div class="mt-6 text-center text-sm">
      <p class="text-surface-600">
        Sudah punya akun? 
        <NuxtLink to="/login" class="font-medium text-primary-600 hover:text-primary-500 transition-colors">Masuk</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const authStore = useAuthStore()
const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const avatarFile = ref<File | undefined>(undefined)
const avatarPreview = ref<string | null>(null)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    avatarFile.value = target.files[0]
    avatarPreview.value = URL.createObjectURL(avatarFile.value)
  }
}

const handleRegister = async () => {
  loading.value = true
  const ok = await authStore.register(name.value, email.value, password.value, avatarFile.value)
  if (ok) {
    navigateTo('/dashboard')
  }
  loading.value = false
}
</script>
