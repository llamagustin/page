import { definePlugin } from '/@src/app'
import { createI18n } from 'vue-i18n'
/**
 * messages are generated using vite-plugin-i18n
 * each .json files located in the ./src/locales are registered in messages
 * @see https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
 */
import en from '/@src/locales/en.json'
import es from '/@src/locales/es.json'
import ca from '/@src/locales/ca.json'
import gl from '/@src/locales/ca.json'
import eu from '/@src/locales/eu.json'
import pt from '/@src/locales/pt.json'

export default definePlugin(({ app }) => {
  const i18n = createI18n({
    locale: 'es',
    messages: { en, es, ca, gl, eu, pt },
  })

  app.use(i18n)
})
