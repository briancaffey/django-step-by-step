// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classPrefix: '',
    classSuffix: '-mode',
  },
  devServer: {
    port: 8081,
    host: '0.0.0.0'
  },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxtjs/color-mode'],
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost',
      appVersion: 'v1.9.8.8' // this value is changed at runtime with NUXT_PUBLIC_APP_VERSION
    }
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui',
  }
})
