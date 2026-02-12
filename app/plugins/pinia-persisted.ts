import { defineNuxtPlugin } from '#app'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin((nuxtApp) => {
    // Only run on client-side to avoid SSR issues with window/localStorage
    if (import.meta.client) {
        (nuxtApp.$pinia as any).use(piniaPluginPersistedstate)
    }
})
