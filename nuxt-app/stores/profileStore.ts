import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    email: '',
    firstName: '',
    lastName: '',
    profileComplete: false,
  }),
  getters: {
    isProfileComplete(): boolean {
      return this.profileComplete;
    }
  },
  actions: {
    setProfileComplete(status: boolean) {
      this.profileComplete = status
    }
  }
})
