// composables/useAuth.ts
// import { useAuthStore } from '@/stores/authStore'
import { useAuthStore } from '@/stores/authStore'
import { createPinia } from 'pinia'

export const useAuth = async () => {
  console.log('Calling useAuth');

  // const pinia = createPinia();

  const authStore = useAuthStore()

  interface AuthResponse {
    access: string,
  }

  try {
    console.log('making request!!')
    // make a request to /api/auth/jwt/token/ to login using the email and password
    const response = await $fetch<AuthResponse>('http://localhost/api/auth/jwt/token/refresh/', {
      method: 'POST',
    });

    console.log(response);

    // check to see if the response is ok
    if (response.access) {
      console.log('the response is OK...')
      // set the authStore isAuthenticated to true
      authStore.setAuthenticated(true);
      console.log('isAuthenticated set to true...');
    } else {
      console.log('the response is not ok')
      // if the response is not ok, set the authStore isAuthenticated to false
      alert('Failed to login...')
      authStore.setAuthenticated(false);
    }

  } catch (error) {
    console.error('Error checking auth status:', error)
    authStore.setAuthenticated(false)
  }
}
