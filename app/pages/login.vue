<template>
  <div class="auth-page">
    <h2 class="text-2xl font-bold mb-6 text-center text-surface-800">Masuk ke Akun Anda</h2>
    
    <form @submit.prevent="handleLogin" class="space-y-4">
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
        class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="loading" class="animate-spin mr-2">⟳</span>
        {{ loading ? 'Sedang masuk...' : 'Masuk' }}
      </button>
    </form>

    <div class="mt-6 text-center text-sm">
      <p class="text-surface-600">
        Belum punya akun? 
        <NuxtLink to="/register" class="font-medium text-primary-600 hover:text-primary-500 transition-colors">Daftar</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  const ok = await authStore.login(email.value, password.value)
  if (ok) {
    navigateTo('/dashboard')
  }
  loading.value = false
}
</script>
