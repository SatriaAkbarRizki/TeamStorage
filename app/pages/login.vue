<template>
  <div class="auth-page">
    <h2 class="text-2xl font-bold mb-6 text-center text-surface-800">Sign in to your account</h2>
    
    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-surface-700 mb-1">Email address</label>
        <input 
          v-model="email"
          type="email" 
          id="email" 
          required
          class="w-full px-4 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder:text-surface-400"
          placeholder="you@example.com"
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

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
          <label for="remember-me" class="ml-2 block text-sm text-surface-900">
            Remember me
          </label>
        </div>
      </div>

      <button 
        type="submit" 
        :disabled="loading"
        class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="loading" class="animate-spin mr-2">⟳</span>
        {{ loading ? 'Signing in...' : 'Sign in' }}
      </button>
    </form>

    <div class="mt-6 text-center text-sm">
      <p class="text-surface-600">
        Don't have an account? 
        <NuxtLink to="/register" class="font-medium text-primary-600 hover:text-primary-500 transition-colors">Sign up</NuxtLink>
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
  await new Promise(resolve => setTimeout(resolve, 800)) // Fake delay
  
  const success = await authStore.login(email.value, password.value)
  if (success) {
    navigateTo('/dashboard')
  } else {
    alert('Login failed') // Replace with toast later
  }
  loading.value = false
}
</script>
