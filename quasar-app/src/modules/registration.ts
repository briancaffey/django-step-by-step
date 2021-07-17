/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { ref } from 'vue';
import { api } from 'boot/axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');


export default function useRegistration() {

  const router = useRouter();


  const register = async (): Promise<any> => {

    await api.post('/api/register/', {
      email: email.value, password: password.value,
    });

    // accessToken.value = resp.data?.access;
    // refreshToken.value = resp.data?.refresh;

    // // Save tokens to localStorage
    // localStorage.setItem('accessToken', resp.data?.access);
    // localStorage.setItem('refreshToken', resp.data?.refresh);

    // getProfile();

    router.push('/');

  }

  return { register, email, password }
}