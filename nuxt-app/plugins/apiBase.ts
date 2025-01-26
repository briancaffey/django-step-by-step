export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  // Provide the apiBase globally using provide/inject
  nuxtApp.provide('apiBase', config.public.apiBase);
});
