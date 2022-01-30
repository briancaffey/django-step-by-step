/**
 * Types for API responses and other data
 *
 * https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript
 */


/**
 * Interface for login data
 */
export interface LoginData {
  email: string;
  password: string;
}

export type TokenResponse = {
  access: string;
}

export type LoginResponse = [null, TokenResponse] | [Error];


export interface LogoutData {
  message: string;
};

export type LogoutResponse = [null, LogoutData] | [Error];

export type RefreshResponse = [null, TokenResponse] | [Error];

/**
 * Profile response and response data
 */
export interface ProfileType {
  email: string;
  id: number;
}

export type ProfileResponse = [null, ProfileType] | [Error];

export interface PostType {
  id: number;
  body: string;
  created_by: ProfileType,
  image: string;
  modified_on: string;
  like_count: number;
  liked: boolean;
}

export type CreatePostResponse = [null, PostType] | [Error];

export interface PostsType {
  results: PostType[];
  count: number;
}

export type GetPostsResponse = [null, PostsType] | [Error];

type Params = {
  offset?: number;
  limit?: number;
}
export type GetPostsOptionsType = {
  params: Params;
}
