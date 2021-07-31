/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */


import { ref } from 'vue';
import { api } from 'boot/axios';

const email = ref('');
const userId = ref('');

export default function useProfile() {

  const clearProfile = () => {
    email.value = '';
    userId.value = '';
  };

  const getProfile = async (): Promise<any> => {
    const resp = await api.get('/api/profile/');

    email.value = resp.data?.email;
    userId.value = resp.data?.id;
  };

  return { getProfile, email, userId, clearProfile };
}
