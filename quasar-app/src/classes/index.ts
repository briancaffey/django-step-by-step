/**
 * This file defines all backend REST API endpoint calls with axios
 */

import { api } from 'boot/axios';

import { TokenResponse, LoginData, LoginResponse, LogoutResponse, LogoutData, RefreshResponse } from '../types'

/**
 * class for making backend API calls
 *
 * TODO: move all API calls to this class
 */
export default class ApiService {

  // /**
  //  * Activate a user account
  //  *
  //  * @param uidb64
  //  * @param token
  //  * @returns
  //  */
  // static activate(uidb64: string, token: string): Promise<unknown> {
  //   return api.post(`/api/activate/${uidb64}/${token}/`);
  // }

  /**
   * Login a user
   * @param {String} username
   * @param {String} password
   * @returns {String} Access token
   */
  async login(loginData: LoginData): Promise<LoginResponse> {
    try {
      const { data } = await api.post<TokenResponse>('/api/auth/jwt/token/', loginData, { withCredentials: true });
      return [null, data];
    } catch (error) {
      console.error(error);
      return [error]
    }
  }

  /**
   * Logout
   */
  async logout(): Promise<LogoutResponse> {
    try {
      const { data } = await api.post<LogoutData>('/api/auth/jwt/token/logout/')
      return [null, data]
    } catch (error) {
      console.error(error);
      return [error]
    }
  }

  /**
   * Refresh token
   */
  async refreshToken(): Promise<RefreshResponse> {
    try {
      const { data } = await api.post<TokenResponse>('/api/auth/jwt/token/refresh/')
      return [null, data]
    } catch (error) {
      console.error(error);
      return [error]
    }
  }

}
