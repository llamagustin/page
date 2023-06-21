<script setup lang="ts">
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { PhUserCircle } from "phosphor-vue";
import { ref } from "vue"
import authV2ForgotPasswordIllustrationDark from '@/assets/images/pages/auth-v2-forgot-password-illustration-dark.png'
import authV2ForgotPasswordIllustrationLight from '@/assets/images/pages/auth-v2-forgot-password-illustration-light.png'
import authV2MaskDark from '@/assets/images/pages/misc-mask-dark.png'
import authV2MaskLight from '@/assets/images/pages/misc-mask-light.png'

import axios from '@axios'
axios.defaults.baseURL = "https://test0-api.aythen.com";
// const instance = axios.create({
//   baseURL: "https://api.aythen.com",
//   withCredentials: false,
//   headers: { 'Content-Type': 'application/json' }
// });

const email = ref('')
const authThemeImg = useGenerateImageVariant(authV2ForgotPasswordIllustrationLight, authV2ForgotPasswordIllustrationDark)
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)
const isSend = ref(false);
const hasError = ref(false);

const submit = () => {
  const regex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
  if(!email.value.match(regex)) return
  isSend.value = true;
  axios.post('/account/password/send', { email: email.value })
    .then(r => {
      isSend.value = false;
    })
    .catch((error) => {
      isSend.value = false;
      hasError.value = true;
    })
}
</script>

<template>
  <VRow
    class="auth-wrapper"
    no-gutters
  >
    <VCol
      lg="8"
      class="d-none d-lg-flex"
    >
      <div class="position-relative auth-bg rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg
            max-width="330"
            :src="authThemeImg"
            class="auth-illustration mt-8 mb-2"
          />
        </div>

        <VImg class="auth-footer-mask" :src="authThemeMask" />
      </div>
    </VCol>

    <VCol cols="12" lg="4" class="d-flex align-center justify-center" >
      <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-4" >
        <VCardText>
          <VNodeRenderer style="width:50px"  :nodes="themeConfig.app.logo" class="mb-6" />
          <h5 class="text-h5 font-weight-semibold mb-1">
            Constraseña Olvidada? 🔒
          </h5>
          <p class="mb-0">
            Entra tu correo y te enviaremos las instrucciones para reiniciar tu contraseña
          </p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="submit">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <VTextField
                  v-model="email"
                  label="Email"
                  type="email"
                  @input="hasError = false"
                />
                <em v-if="hasError" class="text-error text-sm">El email no pertenece a nuestros registros.</em>
              </VCol>

              <!-- Reset link -->
              <VCol cols="12">
                <VBtn
                  block
                  type="submit"
                >
                  <template v-if="isSend">
                    <span class="d-inline-block me-2">Enviando email</span>
                    <VProgressCircular
                      size="18"
                      :width="3"
                      color="light"
                      indeterminate
                    />
                  </template>
                  <template v-else>
                    Enviar Link de Reinicio
                  </template>
                </VBtn>
              </VCol>

              <!-- back to login -->
              <VCol cols="12">
                <RouterLink
                  class="d-flex gap-2 align-center justify-center"
                  :to="{ name: 'login' }"
                >
                  <PhUserCircle size="24"/>
                  <span>Regresar a Login</span>
                </RouterLink>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>
