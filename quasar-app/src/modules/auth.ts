import { ref, computed } from 'vue';
import { api } from 'boot/axios';
import { useRouter } from 'vue-router';
import useProfile from './profile';

type TokenResponse = {
  access: string;
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

    const resp = await api.post<TokenResponse>('/api/auth/jwt/token/', {
      email: email.value, password: password.value,
    }, { withCredentials: true });

    accessToken.value = resp.data.access;

    await getProfile();

    setInterval(function () {
      void refreshToken(false);
    }, 1000 * 10);

    await router.push('/');

  };

  return { login, refreshToken, email, password, accessToken, isAuthenticated, logout }
}
