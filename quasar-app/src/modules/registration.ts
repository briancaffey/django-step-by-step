import { ref } from 'vue';
import { api } from 'boot/axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');


export default function useRegistration() {

  const router = useRouter();


  const register = async (): Promise<void> => {

    await api.post('/api/register/', {
      email: email.value, password: password.value,
    });

    void router.push('/');

  }

  return { register, email, password }
}
