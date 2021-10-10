import { api } from 'boot/axios';

export default function useDebug() {
  const triggerException = async () => {
    void await api.post('/api/exception/');
  }

  const emailAdmins = async () => {
    void await api.post('/api/email-admins/');
  }

  return {
    triggerException,
    emailAdmins
  }
}
