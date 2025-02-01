// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  server: {
    host: '0.0.0.0',
    port: 3019,
  },

  vue: {
    config: {
      productionTip: false,
      devtools: true,
    },
  },

  ssr: false,

  app: {
    head: {
      title: 'DF Platform',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }],
      script: [
        {
          type: 'text/javascript',
          children:
            "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NRXLVD2J');",
        },
      ],
    },
    pageTransition: { name: 'layout', mode: 'out-in' },
  },

  css: ['~/assets/scss/main.scss'],

  plugins: [
    '~/plugins/api',
    '~/plugins/auth-required.directive',
    '~/plugins/click-block.directive',
    '~/plugins/bodyLocker',
    '~/plugins/date',
    '~/plugins/num-formatter',
    '~/plugins/modal',
    { src: '~/plugins/vee-validate', mode: 'client' },
    '~/plugins/vue-clipboard',
    '~/plugins/v-tooltip',
    '~/plugins/v-scroll-lock',
    '~/plugins/web3',
    '~/plugins/walletconnect',
  ],

  components: false,

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
    'cookie-universal-nuxt',
    '@pinia/nuxt',
  ],

  axios: {
    proxy: true,
  },

  proxy: {
    '/api/': {
      target: 'https://api.definder.global',
      pathRewrite: { '^/api/': '' },
    },
  },

  build: {
    transpile: ['vee-validate'],
  },

  routeRules: {
    '/**': { ssr: false },
  },

  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
      TINYMCE_API_KEY: process.env.TINYMCE_API_KEY,
    },
  },

  i18n: {
    lazy: true,
    strategy: 'prefix_except_default',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en-US.js',
        name: 'English',
      },
      {
        code: 'ru',
        iso: 'ru-RU',
        file: 'ru-RU.js',
        name: 'Русский',
      },
      {
        code: 'zh-hans',
        iso: 'zh-CN',
        file: 'zh-CN.js',
        name: '中国人',
      },
    ],
    defaultLocale: 'en',
    langDir: 'locales/',
  },

  auth: {
    watchLoggedIn: false,
    redirect: {
      login: '/?login=true',
      logout: false,
      callback: '/?login=true',
      home: '/',
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          required: true,
          type: 'Bearer',
        },
        user: {
          property: 'user',
          autoFetch: true,
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/user', method: 'get' },
        },
      },
    },
  },

  toast: {
    position: 'bottom-right',
    keepOnHover: true,
    duration: 5000,
    closeOnClick: true,
    closeOnSwipe: true,
  },
});
