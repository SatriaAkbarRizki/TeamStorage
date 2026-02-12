export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()

    // Hydrate from localStorage on client-side before checking auth
    if (import.meta.client) {
        authStore.hydrate()
    }

    if (!authStore.isAuthenticated) {
        return navigateTo('/login')
    }
})
