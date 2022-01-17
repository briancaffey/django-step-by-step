import { api } from 'boot/axios';

/**
 * class for making backend API calls
 *
 * TODO: move all API calls to this class
 */
export default class ApiService {

  /**
   * Activate a user account
   *
   * @param uidb64
   * @param token
   * @returns
   */
  static activate(uidb64: string, token: string): Promise<unknown> {
    return api.post(`/api/activate/${uidb64}/${token}/`);
  }

  /**
   * Logout
   */
  static logout(): Promise<unknown> {
    return api.post('/api/auth/jwt/token/logout/')
  }

}
