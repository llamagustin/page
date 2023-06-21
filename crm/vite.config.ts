import { fileURLToPath } from 'url'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import vuetify from 'vite-plugin-vuetify'

//import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/


// PACKAGES FOR INSTALL
  // npm install vite-plugin-visualizer -D
  // npm install vite-plugin-analyzer -D

export default defineConfig({
  /*
  server: {
    port: 3000,
    hmr: {
      port: 3010,
      clientPort: 2100
    }
  },
  */
  plugins: [
    vue(),
    vueJsx(),

    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      styles: {
        configFile: 'src/styles/variables/_vuetify.scss',
      },
    }),
    Pages({
      // ℹ️ We need three routes using single routes so we will ignore generating route for this SFC file
      onRoutesGenerated: routes => [
        // Email filter
        {
          path: '/apps/email/:filter',
          name: 'apps-email-filter',
          component: '/src/pages/apps/email/index.vue',
          meta: {
            navActiveLink: 'apps-email',
            layoutWrapperClasses: 'layout-content-height-fixed',
          },
        },

        // Email label
        {
          path: '/apps/email/label/:label',
          name: 'apps-email-label',
          component: '/src/pages/apps/email/index.vue',
          meta: {
            // contentClass: 'email-application',
            navActiveLink: 'apps-email',
            layoutWrapperClasses: 'layout-content-height-fixed',
          },
        },
        ...routes,
      ],
    }),
    Layouts(),
    Components({
      dirs: ['src/@core/components', 'src/views/demos'],
      dts: true,
    }),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core', '@vueuse/math', 'vue-i18n', 'pinia'],
      vueTemplate: true,
    }),
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [
        fileURLToPath(new URL('./src/plugins/i18n/locales/**', import.meta.url)),
      ],
    }),
    DefineOptions(),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@themeConfig': fileURLToPath(new URL('./themeConfig.ts', import.meta.url)),
      '@core': fileURLToPath(new URL('./src/@core', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./src/@layouts', import.meta.url)),
      '@configured-variables': fileURLToPath(new URL('./src/styles/variables/_template.scss', import.meta.url)),
      '@axios': fileURLToPath(new URL('./src/plugins/axios', import.meta.url)),
      '@validators': fileURLToPath(new URL('./src/@core/utils/validators', import.meta.url)),
      'apexcharts': fileURLToPath(new URL('node_modules/apexcharts-clevision', import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 5000,
    minify: true //
  },
  optimizeDeps: {
    exclude: [
      'vuetify',
      /*
      'aws-sdk',
      'nodemailer',
      'openai',
      'pg',
      'phosphor-icons',
      'phosphor-vue',
      'pspdfkit',
      'signaturit-sdk',
      'web-push'
      */
    ],
    /*
    include: [
      '@casl/ability',
      '@casl/vue',
      '@floating-ui/dom',
      '@google-cloud/pubsub',
      '@iconify/types',
      '@kangc/v-md-editor',
      '@tabler/icons',
      '@twilio/voice-sdk',
      '@vueuse/core',
      '@vueuse/math',
      'apexcharts-clevision',
      'aws-sdk',
      'axios',
      'axios-mock-adapter',
      'chart.js',
      'cookie-parser',
      'csvtojson',
      'express',
      'file-saver',
      'fullcalendar',
      'googleapis',
      'ics',
      'jsonwebtoken',
      'jwt-decode',
      'md-editor-v3',
      'moment',
      'node-kmeans',
      'nodemailer',
      'openai',
      'papaparse',
      'pg',
      'phosphor-icons',
      'phosphor-vue',
      'pinia',
      'prismjs',
      'pspdfkit',
      'request',
      'sass',
      'sequelize',
      'signaturit-sdk',
      'socket.io',
      'socket.io-client',
      'tesseract.js',
      'twilio',
      'unplugin-vue-define-options',
      'uuidv4',
      'vue',
      'vue-chartjs',
      'vue-flatpickr-component',
      'vue-i18n',
      'vue-prism-component',
      'vue-router',
      'vue-select',
      'vue-uuid',
      'vue3-apexcharts',
      'vue3-perfect-scrollbar',
      'vue3-tree-vue',
      'vue3-treeselect',
      'vuetify',
      'vuetify-draggable-treeview',
      'web-push',
      'webfontloader',
      'xlsx'
    ],
    */
    entries: [
      './src/**/*.vue',
    ],
  },
})

/*
  export default defineConfig(({ command, mode, ssrBuild }) => {
    if (command === 'serve') {
      return {
        // dev specific config
      }
    } else {
      // command === 'build'
      return {
        // build specific config
      }
    }
  })
*/
