/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { ref, computed } from 'vue';
import { api } from 'boot/axios';
import { useRouter } from 'vue-router';
import useProfile from './profile';

const email = ref('');
const password = ref('');


const { getProfile, clearProfile } = useProfile();

const accessToken = ref('');

export default function useAuth() {

  const router = useRouter();

  const logout = () => {
    accessToken.value = '';
    clearProfile();
    router.push('/');
  }

  const isAuthenticated = computed(() => {
    const authenticated = accessToken.value;
    return !!authenticated;
  });

  const refreshToken = async (): Promise<any> => {
    await api.post('/auth/jwt/token/refresh/');
  };

  const login = async (): Promise<any> => {

    const resp = await api.post('/auth/jwt/token/', {
      email: email.value, password: password.value,
    }, { withCredentials: true });

    accessToken.value = resp.data?.access;

    getProfile();

    setInterval(function () {
      refreshToken();
    }, 1000 * 10);

    router.push('/');

  };

  return { login, refreshToken, email, password, accessToken, isAuthenticated, logout }
}