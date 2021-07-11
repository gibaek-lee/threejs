import { resolve } from 'path'
import colors from 'vuetify/es5/util/colors'

export default {
  alias: {
    '@utils': resolve(__dirname, './utils'),
    '@composables': resolve(__dirname, './composables'),
    '@business': resolve(__dirname, './business')
  },
  router: {
    base: '/threejs/',
    extendRoutes (routes, resolve) {
      const playgroundList = [
        'haunted-house',
        'music-visualizer'
      ]
      playgroundList.forEach((name) => {
        routes.push({
          name,
          path: `/playground/${name}`,
          component: resolve(__dirname, 'pages/playground.vue')
        })
      })
    }
  },
  ssr: false, // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  target: 'static', // Target: https://go.nuxtjs.dev/config-target
  head: { // Global page headers: https://go.nuxtjs.dev/config-head
    titleTemplate: '%s - threejs',
    title: 'threejs',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/threejs/favicon.ico' }
    ]
  },
  css: [], // Global CSS: https://go.nuxtjs.dev/config-css
  plugins: [], // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  components: true, // Auto import components: https://go.nuxtjs.dev/config-components
  buildModules: [ // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    '@nuxt/typescript-build', // https://go.nuxtjs.dev/typescript
    '@nuxtjs/vuetify', // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/composition-api/module'
  ],
  modules: [ // Modules: https://go.nuxtjs.dev/config-modules
    '@nuxtjs/axios' // https://go.nuxtjs.dev/axios
  ],
  axios: {}, // Axios module configuration: https://go.nuxtjs.dev/config-axios
  vuetify: { // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    customVariables: [
      '~/assets/variables.scss'
    ],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  }
}
