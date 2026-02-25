import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as { id: number; name: string; email: string; image_path: string | null } | null,
        isAuthenticated: false,
    }),

    getters: {
        avatarUrl: (state) => {
            if (!state.user) return 'https://ui-avatars.com/api/?name=User'
            if (state.user.image_path) {
                const config = useRuntimeConfig()
                return `${config.public.apiBase}${state.user.image_path}`
            }
            return `https://ui-avatars.com/api/?name=${encodeURIComponent(state.user.name)}&background=0ea5e9&color=fff`
        }
    },

    actions: {
        async login(email: string, password: string): Promise<boolean> {
            const config = useRuntimeConfig()
            try {
                const res = await $fetch<{ success: boolean; message: string; data: any }>(`${config.public.apiBase}/auth/login`, {
                    method: 'POST',
                    body: { email, password },
                    credentials: 'include',
                })
                if (res.success && res.data) {
                    this.user = res.data
                    this.isAuthenticated = true
                    return true
                } else {
                    alert('Login gagal: ' + res.message)
                    return false
                }
            } catch (err: any) {
                const msg = err?.data?.message || 'Terjadi kesalahan saat login. Periksa email dan password Anda.'
                alert(msg)
                return false
            }
        },

        async register(name: string, email: string, password: string, fileImage?: File): Promise<boolean> {
            const config = useRuntimeConfig()
            try {
                const form = new FormData()
                form.append('name', name)
                form.append('email', email)
                form.append('password', password)
                if (fileImage) form.append('fileImage', fileImage)

                const res = await $fetch<{ success: boolean; message: string; data: any }>(`${config.public.apiBase}/auth/register`, {
                    method: 'POST',
                    body: form,
                    credentials: 'include',
                })
                if (res.success) {
                    return true
                } else {
                    alert('Pendaftaran gagal: ' + res.message)
                    return false
                }
            } catch (err: any) {
                const msg = err?.data?.message || 'Terjadi kesalahan saat mendaftar.'
                alert(msg)
                return false
            }
        },

        logout() {
            this.user = null
            this.isAuthenticated = false
            return navigateTo('/login')
        }
    },

    // Persist auth state to localStorage so page refreshes don't log the user out
    persist: true,
})
