import { useProfileStore } from '@/stores/profileStore'
// import { useNuxtApp } from '#app'

interface UserProfile {
  first_name: string
  last_name: string
  profile_setup_complete?: boolean
}

export function useProfile() {
  const profileStore = useProfileStore()
  // const { $fetch } = useNuxtApp()

  const fetchProfile = async () => {
    try {
      const data = await $fetch<UserProfile>('/api/profile/', {credentials: 'include'})
      profileStore.firstName = data.first_name || ''
      profileStore.lastName = data.last_name || ''
      profileStore.setProfileComplete(data.profile_setup_complete || false)
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const updateProfile = async (firstName: string, lastName: string) => {
    try {
      const response = await $fetch<{first_name: string, last_name: string}>('http://localhost/api/update-user/', {
        method: 'PATCH', credentials: 'include',
        body: {
          first_name: firstName,
          last_name: lastName
        }
      });
      profileStore.firstName = response.first_name
      profileStore.lastName = response.last_name
      // profile
      profileStore.setProfileComplete(true)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  return {
    profileStore,
    fetchProfile,
    updateProfile
  }
}
