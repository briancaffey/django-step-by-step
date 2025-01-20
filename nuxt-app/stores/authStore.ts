// stores/authStore.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    email: '',
    password: '',
    isAuthenticated: false,
  }),
  getters: {
    getIsAuthenticated(): boolean {
      return this.isAuthenticated
    }
  },
  actions: {
    updateEmail(newEmail: string) {
      this.email = newEmail
    },
    updatePassword(newPassword: string) {
      this.password = newPassword
    },
    setAuthenticated(isAuthenticatedValue: boolean) {
      this.isAuthenticated = isAuthenticatedValue
    }
  }
})
