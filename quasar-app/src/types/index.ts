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
