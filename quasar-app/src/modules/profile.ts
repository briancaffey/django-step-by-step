import { ref } from 'vue';
import { api } from 'boot/axios';

interface Profile {
  email: string;
  id: number;
}

const email = ref('');
const userId = ref(0);

export default function useProfile() {

  const clearProfile = () => {
    email.value = '';
    userId.value = 0;
  };

  const getProfile = async (): Promise<void> => {
    const resp = await api.get<Profile>('/api/profile/');

    email.value = resp.data.email;
    userId.value = resp.data.id;
  };

  return { getProfile, email, userId, clearProfile };
}
