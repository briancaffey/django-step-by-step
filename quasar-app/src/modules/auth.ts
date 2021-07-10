/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { ref, computed } from 'vue';
import { api } from 'boot/axios';
import { useRouter } from 'vue-router';
import useProfile from './profile';

// interface authResponse {
//   access: string;
//   refresh: string;
// }

const email = ref('');
const password = ref('');


const { getProfile, clearProfile } = useProfile();

const accessToken = ref(localStorage.getItem('accessToken') || '');
const refreshToken = ref(localStorage.getItem('refreshToken') || '');

export default function useAuth() {

  const router = useRouter();

  const logout = () => {
    accessToken.value = '';
    refreshToken.value = '';

    // Clear tokens from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    clearProfile();

    router.push('/');
  }

  const isAuthenticated = computed(() => {
    const authenticated = accessToken.value;
    return !!authenticated;
  });

  const login = async (): Promise<any> => {

    const resp = await api.post('/api/token/', {
      email: email.value, password: password.value,
    });

    accessToken.value = resp.data?.access;
    refreshToken.value = resp.data?.refresh;

    // Save tokens to localStorage
    localStorage.setItem('accessToken', resp.data?.access);
    localStorage.setItem('refreshToken', resp.data?.refresh);

    getProfile();

    router.push('/');

  }



  return { login, email, password, accessToken, refreshToken, isAuthenticated, logout }
}