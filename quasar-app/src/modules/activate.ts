import { api } from 'boot/axios';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { useQuasar } from 'quasar'


export default function useActivate() {

  const accountActivated = ref(false);
  const accountActivationError = ref(false);

  const route = useRoute();
  const $q = useQuasar();

  const verify = async (): Promise<void> => {
    const { uidb64, token } = route.params;
    if (typeof uidb64 === 'string' && typeof token === 'string') {
      await api.post(`/api/activate/${uidb64}/${token}/`);
      accountActivated.value = true;
      $q.notify({
        message: 'Account activated!',
        color: 'primary',
      });
      // router.push('/');
    }
  };

  return { verify, accountActivated, accountActivationError };
}