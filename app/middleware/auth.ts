export default defineNuxtRouteMiddleware((to, from) => {
    // Skip during SSR — localStorage is not available on the server.
    // pinia-plugin-persistedstate restores state on the client side,
    // so we only enforce the auth check there.
    if (import.meta.server) return

    const authStore = useAuthStore()

    if (!authStore.isAuthenticated) {
        return navigateTo('/login')
    }
})
