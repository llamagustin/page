<script setup lang="ts">
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

import authV2ResetPasswordIllustrationDark from '@/assets/images/pages/auth-v2-reset-password-illustration-dark.png'
import authV2ResetPasswordIllustrationLight from '@/assets/images/pages/auth-v2-reset-password-illustration-light.png'
import authV2MaskDark from '@/assets/images/pages/misc-mask-dark.png'
import authV2MaskLight from '@/assets/images/pages/misc-mask-light.png'

import { useRoute } from 'vue-router';
const route = useRoute();
import router from "@/router";

import axios from "axios";

const axiosIns = axios.create({
  baseURL: "https://api.aythen.com",
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
});





const form = ref({
  newPassword: '',
  confirmPassword: '',
})

const authThemeImg = useGenerateImageVariant(authV2ResetPasswordIllustrationLight,
  authV2ResetPasswordIllustrationDark,
)

const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)

const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)


var query = JSON.parse(window.atob(route.query.email))



console.log('route.query.email', query)

// window.atob(route.query.email)

const email = ref(query.email)
const token = ref(query.data)

const onNewPassword = async () => {
  var pass =  form.value
  
  if(pass.newPassword !== pass.confirmPassword){
    return
  }
  
  if(pass.newPassword !== pass.confirmPassword){
    console.log("La contraseña debe ser igual");
    return
  }else if (/^.{0,5}$/.test(pass.newPassword)) {
    console.log("La contraseña debe tener al menos 6 caracteres");
    return
  }

  var data = {
    password: pass.newPassword,
    token: token.value  
  }
  
  var res = await axiosIns.post('/account/password/save', data)

  router.push({name: 'login'})
}
</script>

<template>
  <VRow
    no-gutters
    class="auth-wrapper"
  >
    <VCol
      md="8"
      class="d-none d-md-flex"
    >
      <div class="position-relative auth-bg rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg
            max-width="400"
            :src="authThemeImg"
            class="auth-illustration mt-16 mb-2"
          />
        </div>

        <VImg
          class="auth-footer-mask"
          :src="authThemeMask"
        />
      </div>
    </VCol>

    <VCol
      cols="12"
      md="4"
      class="auth-card-v2 d-flex align-center justify-center"
    >
      <VCard
        flat
        :max-width="500"
        class="mt-12 mt-sm-0 pa-4"
      >
        <VCardText>
          <!--<VNodeRenderer-->
            <!--:nodes="themeConfig.app.logo"-->
            <!--class="mb-6"-->
          <!--/>-->
          <VNodeRenderer style="width:50px"  :nodes="themeConfig.app.logo" class="mb-6" />

          <h5 class="text-h5 font-weight-semibold mb-1">
            Cambia la contraseña 🔒
          </h5>
          <p class="mb-0">
            email <span class="font-weight-bold">{{email}}</span>
          </p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="onNewPassword">
            <VRow>
              <!-- password -->
              <VCol cols="12">
                <VTextField
                  v-model="form.newPassword"
                  label="New Password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>

              <!-- Confirm Password -->
              <VCol cols="12">
                <VTextField
                  v-model="form.confirmPassword"
                  label="Confirm Password"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isConfirmPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                />
              </VCol>

              <!-- Set password -->
              <VCol cols="12">
                <VBtn
                  block
                  type="submit"
                >
                  Set New Password
                </VBtn>
              </VCol>

              <!-- back to login -->
              <VCol cols="12">
                <RouterLink
                  class="d-flex align-center justify-center"
                  :to="{ name: 'login' }"
                >
                  <VIcon
                    icon="tabler-chevron-left"
                    class="flip-in-rtl"
                  />
                  <span>Back to login</span>
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
</route>
