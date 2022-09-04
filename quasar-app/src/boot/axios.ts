import { boot } from 'quasar/wrappers';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import useAuth from '../modules/auth';

const BASE_URL = process.env.BASE_URL || '/';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// https://stackoverflow.com/questions/62915124/eslint-error-unsafe-member-access-content-type-on-an-any-value
interface RequestHeaders {
  [key: string]: string,
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create(
  {
    baseURL: BASE_URL
  }
);

api.interceptors.request.use(
  (config) => {
    const c: AxiosRequestConfig = config;
    const { accessToken } = useAuth();
    const token = accessToken.value;

    if (token) {
      const headers = c.headers as RequestHeaders;
      headers.Authorization = `Bearer ${token}`;
    }

    return c
  }, (error: AxiosError) => {
    void Promise.reject(error);
  }
);
export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
