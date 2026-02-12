import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as { name: string; email: string; avatar?: string } | null,
        isAuthenticated: false,
        _hydrated: false,
    }),
    actions: {
        // Hydrate state from localStorage
        hydrate() {
            if (import.meta.client && !this._hydrated) {
                const stored = localStorage.getItem('auth')
                if (stored) {
                    try {
                        const data = JSON.parse(stored)
                        this.user = data.user
                        this.isAuthenticated = data.isAuthenticated
                    } catch (e) {
                        console.error('Failed to parse auth data:', e)
                    }
                }
                this._hydrated = true
            }
        },

        // Save state to localStorage
        persist() {
            if (import.meta.client) {
                localStorage.setItem('auth', JSON.stringify({
                    user: this.user,
                    isAuthenticated: this.isAuthenticated
                }))
            }
        },

        async login(email: string, password: string): Promise<boolean> {
            // Mock login logic
            if (email && password) {
                this.user = {
                    name: 'Demo User',
                    email: email,
                    avatar: `https://ui-avatars.com/api/?name=Demo+User&background=0ea5e9&color=fff`
                }
                this.isAuthenticated = true
                this.persist()
                return true
            }
            return false
        },

        register(name: string, email: string, password: string) {
            // Mock register
            this.user = {
                name: name,
                email: email,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0ea5e9&color=fff`
            }
            this.isAuthenticated = true
            this.persist()
            return true
        },

        logout() {
            this.user = null
            this.isAuthenticated = false
            if (import.meta.client) {
                localStorage.removeItem('auth')
            }
            return navigateTo('/login')
        }
    },
})
