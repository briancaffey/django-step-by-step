/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * This file defines all backend REST API endpoint calls with axios
 *
 * Reference article: https://dev.to/blindkai/managing-api-layers-in-vue-js-with-typescript-hno
 */
// @typescript-eslint/no-unsafe-assignment
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from 'boot/axios';

import {
  CreatePostResponse,
  EmailAdminResponse,
  EmailAdminType,
  ExceptionResponse,
  ExceptionType,
  GetPostResponse,
  GetPostsResponse,
  GetPostsOptionsType,
  LoginData,
  LogoutData,
  LoginResponse,
  LogoutResponse,
  PostsType,
  PostType,
  ProfileResponse,
  ProfileType,
  RefreshResponse,
  TogglePostLikeResponse,
  TokenResponse,
  // chat
  Message,
  Messages,
  Session,
  // ChatResponse,
  SendMessageResponse
} from '../types'

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
    } catch (error: any) {
      return [error]
    }
  }

  /**
   * Logout
   *
   * This API call removes the HttpOnly refresh token cookie to logout the current logged in user
   */
  async logout(): Promise<LogoutResponse> {
    try {
      const { data } = await api.post<LogoutData>('/api/auth/jwt/token/logout/')
      return [null, data]
    } catch (error: any) {
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
    } catch (error: any) {
      return [error]
    }
  }

  /**
   *
   * Get user profile
   *
   * @returns {ProfileResponse}
   */
  async profile(): Promise<ProfileResponse> {
    try {
      const { data } = await api.get<ProfileType>('/api/profile/')
      return [null, data]
    } catch(error: any) {
      return [error]
    }
  }

  async createPost(formData: FormData): Promise<CreatePostResponse> {
    try {
      const { data } = await api.post<PostType>('/api/drf/fbv/posts/new/', formData)
      return [null, data]
    } catch(error: any) {
      return [error]
    }
  }

  async getPosts(options: GetPostsOptionsType): Promise<GetPostsResponse> {
    try {
      const { data } = await api.get<PostsType>('/api/drf/fbv/posts/', options)
      return [null, data]
    } catch(error: any) {
      return [error]
    }
  }

  async togglePostLike(postId: number): Promise<TogglePostLikeResponse> {
    try {
      const { data } = await api.post<PostType>(`/api/drf/fbv/posts/${postId}/like/`)
      return [null, data]
    } catch(error: any) {
      return [error]
    }
  }

  async getPost(postId: number): Promise<GetPostResponse> {
    try {
      const { data } = await api.get<PostType>(`/api/drf/fbv/posts/${postId}/`)
      return [null, data]
    } catch(error: any) {
      return [error]
    }
  }

  async deletePost(postId: number): Promise<GetPostResponse> {
    try {
      // TODO use a different Type here since this does not return a PostType
      const { data } = await api.delete<PostType>(`/api/drf/fbv/posts/${postId}/`)
      return [null, data]
    } catch(error: any) {
      return [error]
    }
  }

  async triggerException(): Promise<ExceptionResponse> {
    try {
      const { data } = await api.post<ExceptionType>('/api/exception/')
      return [null, data]
    } catch(error: any) {
      return [error]
    }
  }

  async emailAdmins(): Promise<EmailAdminResponse> {
    try {
      const { data } = await api.post<EmailAdminType>('/api/email-admins/')
      return [null, data]
    } catch(error: any) {
      return [error]
    }
  }

  // chat
  async sendNewMessage(chatId: number, content: string): Promise<[Error | null, Message | null]> {
    console.log('Making API call...')
    try {
      const { data } = await api.post<SendMessageResponse>(`/api/chat/sessions/${chatId}/messages/send/`, {
        content,
      });
      console.log('Response data is ....');
      console.log(data);
      return [null, data];
    } catch (error: any) {
      console.error('Error sending message:', error);
      return [error, null];
    }
  };


  // API functions
  async fetchMessages(chatId: number): Promise<[Error | null, Messages | null]> {
    // TODO: make sure that the JWT is saved as an Http only cookie before making this request
    // This is failing when doing a hard refresh on the chat page
    await this.refreshToken();
    try {
      const { data } = await api.get<Messages>(`/api/chat/sessions/${chatId.toString()}/messages/`);
      return [null, data];
    } catch (error: any) {
      console.error('Error fetching messages:', error);
      return [error, null];
    }
  };

  // function for getting sessions
  async fetchSessions(): Promise<[Error | null, Session[] | null]> {
    await this.refreshToken();
    try {
      const { data } = await api.get<Session[]>('/api/chat/get-sessions/');
      return [null, data];
    } catch (error: any) {
      console.error('Error fetching sessions:', error);
      return [error, null];
    }
  };

  // function for creating a new session
  async createSession(): Promise<[Error | null, any | null]> {
    await this.refreshToken();
    try {
      const { data } = await api.post<any>('/api/chat/sessions/');
      return [null, data];
    } catch (error: any) {
      console.error('Error creating session:', error);
      return [error, null];
    }
  };
}



// import apiService into modules when making API calls
export const apiService = new ApiService();
