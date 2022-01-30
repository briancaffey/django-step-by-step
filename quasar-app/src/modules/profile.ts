import { ref } from 'vue';
import { apiService } from '../classes'


const email = ref('');
const userId = ref(0);

export default function useProfile() {

  const clearProfile = () => {
    email.value = '';
    userId.value = 0;
  };

  const getProfile = async (): Promise<void> => {
    const [error, data] = await apiService.profile();

    if (error) {
      console.error(error);
      return
    }
    if (data) {
      email.value = data.email;
      userId.value = data.id;
    }
  };

  return { getProfile, email, userId, clearProfile };
}
