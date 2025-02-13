import { useProfileStore } from '@/stores/profileStore'

interface UserProfile {
  email: string
  first_name: string
  last_name: string
  profile_setup_complete?: boolean
}

export function useProfile() {
  // const { pinia } = usePinia();
  const profileStore = useProfileStore()
  // const profileStore = useProfileStore(pinia)
  const apiBase = useNuxtApp().$apiBase;
  const fetchProfile = async () => {
    try {
      const data = await $fetch<UserProfile>(`${apiBase}/api/profile/`, {credentials: 'include'})
      profileStore.firstName = data.first_name || ''
      profileStore.lastName = data.last_name || ''
      profileStore.email = data.email;
      profileStore.setProfileComplete(data.profile_setup_complete || false)
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const updateProfile = async (firstName: string, lastName: string) => {
    try {
      const response = await $fetch<{first_name: string, last_name: string}>(`${apiBase}/api/update-user/`, {
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
