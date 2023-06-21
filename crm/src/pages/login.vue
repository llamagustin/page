<script setup lang="ts">
import type { LoginResponse } from "@/@fake-db/types";
import authV2LoginIllustrationBorderedDark from "@/assets/images/pages/auth-v2-login-illustration-bordered-dark.png";
import authV2LoginIllustrationBorderedLight from "@/assets/images/pages/auth-v2-login-illustration-bordered-light.png";
import authV2LoginIllustrationDark from "@/assets/images/pages/auth-v2-login-illustration-dark.png";
import authV2LoginIllustrationLight from "@/assets/images/pages/auth-v2-login-illustration-light.png";
import authV2MaskDark from "@/assets/images/pages/misc-mask-dark.png";
import authV2MaskLight from "@/assets/images/pages/misc-mask-light.png";
import { useAppAbility } from "@/plugins/casl/useAppAbility";
//import AuthProvider from "@/views/pages/authentication/AuthProvider.vue";
import axiosIns from "@axios";



import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant";
import { themeConfig } from "@themeConfig";
import { emailValidator, requiredValidator } from "@validators";
import { VForm } from "vuetify/components";

const authThemeImg = useGenerateImageVariant(
  authV2LoginIllustrationLight,
  authV2LoginIllustrationDark,
  authV2LoginIllustrationBorderedLight,
  authV2LoginIllustrationBorderedDark,
  true
);

const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark);

const isPasswordVisible = ref(false);

const router = useRouter();

const ability = useAppAbility();

const errors = ref<Record<string, string | undefined>>({
  email: undefined,
  password: undefined,
});

const refVForm = ref<VForm>();
const email = ref("");
const password = ref("");
const rememberMe = ref(false);

const isSnackbarVisible = ref(false);

const isSnackbar = ref({
  text: `I am a multi-line snackbar. I can have more than one line. 
  This is another line that is quite long.`,
});

const login = () => {
  axiosIns
    .post<LoginResponse>("/account/login", {
      email: email.value,
      password: password.value,
    })
    .then((r) => {
      const { accessToken, userData, userAbilities } = r.data;

      if (r.data.error) {
        isSnackbarVisible.value = true;
        //return false

        isSnackbar.value.text = r.data.error[0];
        return false;
      }
      
  
      localStorage.setItem("userAbilities", JSON.stringify(userAbilities));
      ability.update(userAbilities);

      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("accessToken", JSON.stringify(accessToken));


      
      location.href = '/dashboard/leads'
    })
    .catch((e) => {
      console.error(e);
      /*
      const { errors: formErrors } = e.response.data

      errors.value = formErrors
      console.error(e.response.data)
      */
    });
};

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) login();
  });
};
</script>

<template>
  <VRow no-gutters class="auth-wrapper">
    <VCol lg="8" class="d-none d-lg-flex">
      <div class="position-relative auth-bg rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg
            max-width="505"
            :src="authThemeImg"
            class="auth-illustration mt-16 mb-2"
          />
        </div>

        <VImg :src="authThemeMask" class="auth-footer-mask" />
      </div>
    </VCol>

    <VCol cols="12" lg="4" class="d-flex align-center justify-center">
      <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-4">
        <VCardText>
          <img
            src="https://api.aythen.com/static/src/assets/logo.svg"
            width="50"
            class="mb-6"
          />

          <h5 class="text-h5 font-weight-semibold mb-1">
            Bienvenido a {{ themeConfig.app.title }}! 👋🏻
          </h5>
          <p class="mb-0">
            Accede a tu cuenta y empieza a construir tus proyectos
          </p>
        </VCardText>
        <VCardText v-if="false">
          <VAlert color="primary" variant="tonal">
            <p class="text-caption mb-2">
              Admin Email: <strong>admin@demo.com</strong> / Pass:
              <strong>admin</strong>
            </p>
            <p class="text-caption mb-0">
              Client Email: <strong>client@demo.com</strong> / Pass:
              <strong>client</strong>
            </p>
          </VAlert>
        </VCardText>
        <VCardText>
          <VForm ref="refVForm" @submit.prevent="onSubmit">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <VTextField
                  v-model="email"
                  label="Email"
                  type="email"
                  :rules="[requiredValidator, emailValidator]"
                  :error-messages="errors.email"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <VTextField
                  v-model="password"
                  label="Password"
                  :rules="[requiredValidator]"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :error-messages="errors.password"
                  :append-inner-icon="
                    isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <div
                  class="d-flex align-center flex-wrap justify-space-between mt-2 mb-4"
                >
                  <VCheckbox v-model="rememberMe" label="Remember me" />
                  <RouterLink
                    class="text-primary ms-2 mb-1"
                    :to="{ name: 'forgot-password' }"
                  >
                    Olvidaste de la contraseña?
                  </RouterLink>
                </div>

                <VBtn block type="submit"> Login </VBtn>
              </VCol>

              <!-- create account -->
              <!--
              <VCol
                v-if="false"
                cols="12"
                class="text-center"
              >
                <span>Eres nuevo en nuestra plataforma?</span>
                <RouterLink
                  class="text-primary ms-2"
                  :to="{ name: 'register' }"
                >
                  Crear cuenta
                </RouterLink>
              </VCol>
              

              <VCol cols="12" class="d-flex align-center">
                <VDivider />
                <span class="mx-4">or</span>
                <VDivider />
              </VCol>
              -->

              <!-- auth providers 
              <VCol cols="12" class="text-center">
                <AuthProvider />
              </VCol>
              -->
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VSnackbar v-model="isSnackbarVisible" multi-line>
      {{ isSnackbar.text }}

      <template #actions>
        <VBtn color="error" @click="isSnackbarVisible = false"> Close </VBtn>
      </template>
    </VSnackbar>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  redirectIfLoggedIn: true
</route>
