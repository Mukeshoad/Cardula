import { create } from "zustand"
import { authService, type User } from "../frontend/lib/auth"

interface AuthState {
  user: User | null
  isLoading: boolean
}

interface AuthStore extends AuthState {
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => void
  initialize: () => void
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isLoading: false,

  signIn: async (email: string, password: string) => {
    set({ isLoading: true })
    try {
      const response = await authService.login({ email, password })
      set({ user: response.user, isLoading: false })
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },

  signUp: async (email: string, password: string, name: string) => {
    set({ isLoading: true })
    try {
      const response = await authService.signup({ email, password, name })
      set({ user: response.user, isLoading: false })
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },

  signOut: () => {
    authService.logout()
    set({ user: null })
  },

  initialize: () => {
    if (authService.isAuthenticated()) {
      authService
        .getProfile()
        .then((user) => set({ user }))
        .catch(() => {
          authService.logout()
          set({ user: null })
        })
    }
  },
}))
