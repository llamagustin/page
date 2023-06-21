<script setup lang="ts">
  import { ref, reactive, watch } from 'vue'
  import { useRouter } from 'vue-router'

  const options = ref([''])

  let credentials = reactive({
    username: '',
    password: ''
  })

  const router = useRouter()

  const handleSubmit = () => {
    if (hasErrors()) return
    const strCredentials = JSON.stringify(credentials)
    window.sessionStorage.setItem('credentials', strCredentials)
    router.push("/ai/home")
    // window.location.href = "/servicespack"
  }

  let errors = reactive({
    usernameInvalid: false,
    passwordInvalid: false
  })

  const hasErrors = () => {
    if (!credentials.username.trim().length) {
      errors.usernameInvalid = "Esta campo es requerido."
    }
    if (!credentials.password.trim().length) {
      errors.passwordInvalid = "Esta campo es requerido."
    }
    return Object.values(errors).some(item => item)
  }

  watch(credentials, () => {
    errors.usernameInvalid = false
    errors.passwordInvalid = false
  })
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="login-form">
      <Field>
        <FieldLabel :label="$t('login_username')" />
        <Control icon="feather:user">
          <VInput :placeholder="$t('username')" :class="{ 'is-danger': errors.usernameInvalid}" v-model="credentials.username" />
          <em v-if="errors.usernameInvalid" class="help is-danger">{{ $t('login_invalid_username') }}</em>
        </Control>
      </Field>
      <Field>
        <div class="field-container">
          <FieldLabel class="labelField" :label="$t('login_password')" />
          <a href="/login" class="label-password">{{$t('forgot_password')}}</a>
        </div>
        <Control icon="feather:lock">
          <VInput type="password" :class="{ 'is-danger': errors.passwordInvalid }" :placeholder="$t('password')" v-model="credentials.password" />
          <em v-if="errors.passwordInvalid" class="help is-danger">{{ $t('login_invalid_password') }}</em>
        </Control>
      </Field>

      <div class="setting-item">
        <Checkbox v-model="options" color="primary" name="checkbox-1" :label="$t('remeberMe')" value="Remember" />
      </div>
      <div class="mt-4">
        <Button type="submit" class="Btn-login" fullwidth bold raised>{{$t('login_title')}}</Button>
      </div>
      <div class="mt-4">
        <Button type="submit" class="Btn-login" fullwidth bold raised>{{$t('Regístrarse')}}</Button>
      </div>
    </div>
  </form>
</template>


<style lang="scss" scoped>
  .Btn-login {
    background-color: #00f;
    color: #fff;
  }

  .field-container {
    display: flex;
    justify-content: space-between;
  }

  .label-password {
    display: flex;
    justify-content: flex-end;
  }

  .labelField {
    display: flex;
    justify-content: flex-start;
  }

  a {
    font-size: .8rem;
  }
</style>
