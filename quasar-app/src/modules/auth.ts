/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */


import { ref, computed } from 'vue';
import { api } from 'boot/axios';
import { AxiosError } from 'axios';
import { Notify } from 'quasar'
import { useRouter } from 'vue-router';
import useProfile from './profile';


type TokenResponse = {
  access: string;
}

const email = ref('');
const password = ref('');

// ignore unsafe return of any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isAxiosError<T>(error: AxiosError | any): error is AxiosError<T> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return error && error.isAxiosError
}


const { getProfile, clearProfile } = useProfile();

const accessToken = ref('');

export default function useAuth() {

  const router = useRouter();

  const logout = async (): Promise<void> => {
    await api.post('/api/auth/jwt/token/logout/');
    accessToken.value = '';
    clearProfile();
    await router.push('/');
  }

  const isAuthenticated = computed(() => {
    const authenticated = accessToken.value;
    return !!authenticated;
  });


  const refreshToken = async (initial: boolean): Promise<void> => {

    try {
      const resp = await api.post<TokenResponse>('/api/auth/jwt/token/refresh/');
      accessToken.value = resp.data.access;

      // only load the profile and set interval when initial is true
      // this is used in App.vue
      if (initial) {

        await getProfile();

        setInterval(function () {
          void refreshToken(false);
        }, 1000 * 10);
      }
    } catch (err) {
      return
    }

  };

  // TODO: remove eslint-disable rules around error handling
  const login = async (): Promise<void> => {
    try {
      const resp = await api.post<TokenResponse>('/api/auth/jwt/token/', {
        email: email.value, password: password.value,
      }, { withCredentials: true });

      accessToken.value = resp.data.access;

      await getProfile();

      setInterval(function () {
        void refreshToken(false);
      }, 1000 * 10);

      // clear the login
      email.value = '';
      password.value = '';

      await router.push('/');

      Notify.create({
        type: 'positive',
        message: 'Welcome to μblog!',
      });

    } catch (exception) {
      if (isAxiosError(exception) && exception.response) {

        const e = exception as AxiosError;

        if (e.response?.status === 401) {
          Notify.create({
            type: 'warning',
            message: e.response.data.detail,
          });
        }
      }
    }
  }
  return { login, refreshToken, email, password, accessToken, isAuthenticated, logout }
};
