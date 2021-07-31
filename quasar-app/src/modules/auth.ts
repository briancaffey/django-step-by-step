/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { ref, computed } from 'vue';
import { api } from 'boot/axios';
import { useRouter } from 'vue-router';
import useProfile from './profile';
import { access } from 'fs';

const email = ref('');
const password = ref('');


const { getProfile, clearProfile } = useProfile();

const accessToken = ref('');

export default function useAuth() {

  const router = useRouter();

  const logout = async (): Promise<void> => {
    const resp = await api.post('/api/auth/jwt/token/logout/');
    accessToken.value = '';
    clearProfile();
    router.push('/');
  }

  const isAuthenticated = computed(() => {
    const authenticated = accessToken.value;
    return !!authenticated;
  });


  const refreshToken = async (initial: boolean): Promise<any> => {

    try {
      const resp = await api.post('/api/auth/jwt/token/refresh/');
      accessToken.value = resp.data?.access;

      // only load the profile and set interval when initial is true
      // this is used in App.vue
      if (initial) {

        getProfile();

        setInterval(function () {
          refreshToken(false);
        }, 1000 * 10);
      }
    } catch (err) {
      return
    }

  };

  const login = async (): Promise<any> => {

    const resp = await api.post('/api/auth/jwt/token/', {
      email: email.value, password: password.value,
    }, { withCredentials: true });

    accessToken.value = resp.data?.access;

    getProfile();

    setInterval(function () {
      refreshToken(false);
    }, 1000 * 10);

    router.push('/');

  };

  return { login, refreshToken, email, password, accessToken, isAuthenticated, logout }
}
