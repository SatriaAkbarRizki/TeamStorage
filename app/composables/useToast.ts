export interface Toast {
    id: string
    message: string
    type: 'success' | 'error' | 'info'
    duration: number
}

export const useToast = () => {
    const toasts = useState<Toast[]>('toasts', () => [])

    const add = (message: string, type: 'success' | 'error' | 'info' = 'success', duration = 3000) => {
        const id = Math.random().toString(36).substr(2, 9)
        toasts.value.push({ id, message, type, duration })

        if (duration > 0) {
            setTimeout(() => {
                remove(id)
            }, duration)
        }
    }

    const remove = (id: string) => {
        toasts.value = toasts.value.filter(t => t.id !== id)
    }

    return {
        toasts,
        add,
        remove,
        success: (msg: string) => add(msg, 'success'),
        error: (msg: string) => add(msg, 'error'),
        info: (msg: string) => add(msg, 'info')
    }
}
