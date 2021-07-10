/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */


import { ref } from 'vue';
import { api } from 'boot/axios';

const email = ref(localStorage.getItem('userEmail') || '');
const userId = ref(localStorage.getItem('userId') || '');

export default function useProfile() {

  const clearProfile = () => {
    email.value = '';
    userId.value = '';

    // remove profile from localStorage
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
  };

  const getProfile = async (): Promise<any> => {
    const resp = await api.get('/api/profile/');

    email.value = resp.data?.email;
    userId.value = resp.data?.id;

    // set the user's profile to local storage
    localStorage.setItem('userEmail', resp.data?.email);
    localStorage.setItem('userId', resp.data?.id);

  };

  return { getProfile, email, userId, clearProfile };
}