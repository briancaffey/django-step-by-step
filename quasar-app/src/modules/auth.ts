import { ref, computed } from 'vue';
import ApiService from '../classes';
import { Notify } from 'quasar'
import { useRouter } from 'vue-router';
import useProfile from './profile';

// instantiate ApiService
const api = new ApiService();

const email = ref('');
const password = ref('');

const { getProfile, clearProfile } = useProfile();

const accessToken = ref('');

export default function useAuth() {

  const router = useRouter();

  const logout = async (): Promise<void> => {
    const [error, data] = await api.logout();
    if (error) console.log('error logging in');
    else {
      console.log(data);
      accessToken.value = '';
      clearProfile();
      await router.push('/');
    }
  }

  const isAuthenticated = computed(() => {
    const authenticated = accessToken.value;
    return !!authenticated;
  });


  const refreshToken = async (initial: boolean): Promise<void> => {

    try {
      const [error, data] = await api.refreshToken();
      if (error) console.log('error refreshing token');

      if (data) accessToken.value = data.access;

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

      const [error, data] = await api.login({ email: email.value, password: password.value });
      if (error) {
        console.log('handle login error');
        return
      }
      if (data) accessToken.value = data.access;

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

    } catch (error) {
      console.log(error)
    }
  }
  return { login, refreshToken, email, password, accessToken, isAuthenticated, logout }
};
