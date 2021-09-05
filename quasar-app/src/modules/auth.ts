import { ref, computed } from 'vue';
import { api } from 'boot/axios';
import { AxiosError } from 'axios';
import { Notify } from 'quasar'
import { useRouter } from 'vue-router';
import useProfile from './profile';


type TokenResponse = {
  access: string;
}

type ErrorResponse = {
  detail: string;
}

const email = ref('');
const password = ref('');


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
        type: "positive",
        message: "Welcome to μblog!",
      });

    } catch (err: any) {
      // how do I type the error? AxiosError? any?
      // https://github.com/axios/axios/blob/master/test/typescript/axios.ts

      // this currently works but there is an unsafe access warning
      // console.log(err.response.data.detail);
      Notify.create({
        type: 'warning',
        message: err.response.data.detail,
      });
    }
  };

  return { login, refreshToken, email, password, accessToken, isAuthenticated, logout }
}
