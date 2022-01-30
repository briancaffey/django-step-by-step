import { apiService } from '../classes';
import { Notify } from 'quasar';

export default function useDebug() {
  const triggerException = async (): Promise<void> => {

    const [error, data] = await apiService.triggerException();

    if (error) {
      Notify.create({
        type: 'warning',
        message: error?.response?.data.detail,
      });
    }

    if (data) {
      console.log('this code will never be reached');
    }
  }

  const emailAdmins = async (): Promise<void> => {

    const [error, data] = await apiService.emailAdmins();

    if (error) {
      Notify.create({
        type: 'warning',
        message: 'Could not email admins',
      });
    }

    if (data) {
      Notify.create({
        type: 'success',
        message: 'An email will be sent to the admins shortly',
      });
    }
  }

  return {
    triggerException,
    emailAdmins
  }
}
