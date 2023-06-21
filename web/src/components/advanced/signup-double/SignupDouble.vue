<script setup lang="ts">
  import { ServicesMegamenu } from '/@src/texts/dashboard';
  import { ref } from "vue"
  const TABS = ref([
    { label: 'Ingresar', value: 'login', default: true },
    { label: 'Regístrese', value: 'signup' }
  ]);
</script>

<template>
  <div class="auth-wrapper columns is-gapless">
    <!-- Image section (hidden on mobile) -->
    <div class="column signup-column is-6 is-hidden-mobile h-hidden-tablet-p hero-banner">
      <div class="hero login-hero is-fullheight is-app-grey background-content">
        <div class="hero-body">
          <h1 class="hero-title">{{ $t('signIn') }}</h1>
          <div class="iconinfo-container">
            <ul v-for="(link, index) in ServicesMegamenu.data" :key="index">
              <div>
                <IconService :color="link.iconColor" size="large">
                  <i class="iconify icon-service" :data-icon="link.icon"></i>
                </IconService>
              </div>
              <div>
                <b>{{ $t('icontitle' + index)  }} </b>
              </div>
            </ul>
          </div>
          <div class="textsinfo-container">
            <p>{{$t('learn')}}</p>
            <br />
            <h2>{{$t('chatBot_title')}}</h2>
            <p>{{$t('chatBot_text')}}</p>
            <a href="">{{$t('chatBot_btn')}}</a>
          </div>
        </div>
      </div>
    </div>

    <div class="form-column column is-6 paragraph is-relative">
      <ThemeToggle class="switch-theme" />
      <div class="hero is-fullheight">
        <div class="hero-body">
          <div class="columns w-full">
            <div class="column is-12">
              <Tabs :tabs="TABS" alignment="centered">
                <template #tab="{ selected }">
                  <div v-if="selected === 'login'" class="paragraph">
                    <div class="column is-12">
                      <div class="auth-form-wrapper">
                        <div class="forgot-link has-text-centered">
                          <div class="Btns-Container">
                            <Button class="Btn-Facebook">
                              <i class="iconify" data-icon="mdi:google"></i>
                              Google
                            </Button>
                            <Button class="Btn-Google">
                              <i class="iconify" data-icon="ri:facebook-fill"></i>
                              Facebook
                            </Button>
                          </div>
                        </div>
                        <div class="auth-diviver has-text-centered">
                          <hr class="my-0" />
                          <span>O</span>
                        </div>
                        <LoginForm />
                      </div>
                    </div>
                  </div>
                  <div v-else-if="selected === 'signup'" class="paragraph">
                    <SignupFreelancer  />
                  </div>
                </template>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .switch-theme {
    position: absolute !important;
    top: 2em !important;
    right: 2em !important;
    z-index: 2 !important;
  }

  .auth-diviver {
    position: relative;
    height: 20px;
    padding-block: 2em 1.5em;

    >span {
      display: inline-block;
      padding-inline: .5em;
      font-size: 20px;
      width: 40px;
      height: 40px;
      background-color: var(--html-bg-color);
      position: absolute;
      inset: 0;
      margin: auto;
      line-height: 40px;
      border-radius: 50%;
      user-select: none;
    }
  }

  .hero-title {
    text-align: start;
    display: block;
    width: 100%;
  }

  .Btns-Container {
    display: flex;
    width: 100%;
    align-items: center;
    /*flex-direction: column;*/
    gap: 5px;
  }

  .Btn-Facebook,
  .Btn-Google {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 75%;
    gap: 7px;
    font-size: 16px;
    border: 1px solid #000;
    border-radius: 5px;
  }

  .Btn-Facebook .iconify,
  .Btn-Google .iconify {
    font-size: 1.5rem;
  }

  .iconinfo-container {
    display: grid;
    grid-template-columns: repeat(3, 110px);
    justify-content: center;
    /*gap: 25px;*/
    gap: 15px 30px;
    align-self: flex-start;
  }

  .textsinfo-container h2 {
    font-weight: bold;
  }

  .hero-body {
    max-width: 607px;
    width: 100%;
    margin: auto;
  }

  .hero.is-fullheight .hero-body {
    flex-direction: column;
    row-gap: 20px;
  }

  .hero .hero-body h1 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .background-content {
    background-color: #f6f6f7;
  }

  .is-dark .background-content {
    background-color: rgba(0, 0, 0, .2);
    /*color a cambiar*/
    color: var(--white-smoke);
  }

  .auth-nav {
    position: absolute;
    top: 0;
    left: 0;
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem;

    .left,
    .right {
      display: flex;
      align-items: center;
      width: 20%;
    }

    .right {
      justify-content: flex-end;

      .dark-mode {
        /*transform: scale(0.7);*/
      }
    }

    .center {
      flex-grow: 2;

      a {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          display: block;
          width: 100%;
          max-width: 40px;
        }
      }
    }
  }

  .auth-wrapper {
    overflow: hidden !important;
    width: 100%;
    padding: 0;
    margin: 0;

    &.is-gapless:not(:last-child) {
      margin-bottom: 0 !important;
    }

    &.is-single {
      /*background: var(--wrap-muted-color);*/
      min-height: 100vh;
    }

    .hero-banner {
      /*background: var(--wrap-muted-color);*/
    }

    .dark-mode {
      margin: 0;
      position: absolute;
      top: 0;
      right: -1em;
    }

    .hero-heading {
      position: relative;
      max-width: 360px;
      width: 100%;
      margin: 0 auto;
      padding: 1.5rem 0 0;

      .dark-mode {
        /*position: absolute;*/
        /*top: 38px;*/
        /*right: 20px;*/
        /*z-index: 2;*/
      }

      .auth-logo {
        display: flex;
        justify-content: center;


        .top-logo {
          height: 42px;
        }
      }
    }

    .hero {
      background-size: cover;
      background-repeat: no-repeat;

      .hero-body {
        .login {
          padding: 10px 0;
        }
      }
    }

    .auth-content {
      max-width: 320px;
      width: 100%;
      margin: 0 auto;
      /*margin-top: -40px;*/
      /*margin-bottom: .9em;*/

      p {
        font-size: 1rem;
        margin-bottom: 8px;
      }

      a {
        font-size: 0.8rem;

        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: 400;
        line-height: 32px;
        color: #000;
      }
    }

    .auth-form-wrapper {
      max-width: 320px;
      width: 100%;
      margin: 0 auto;
    }

    .forgot-link {

      /*margin-top: 10px;*/
      a {
        font-family: 'Source Sans Pro';
        font-size: 0.9rem;
        /*color: var(--light-text);*/
        transition: color 0.3s;

        &:hover {
          /*color: var(--primary);*/
        }
      }
    }

    .setting-item {
      display: flex;
      align-items: center;
      padding: 10px 0;
    }

    .single-form-wrap {
      min-height: 690px;
      padding: 0 16px;
      display: flex;
      align-items: center;
      justify-content: center;

      .inner-wrap {
        width: 100%;
        max-width: 400px;
        margin: 2.75rem auto 0;

        .auth-head {
          max-width: 320px;
          width: 100%;
          margin: 0 auto;
          margin-bottom: 1.5rem;
          text-align: center;

          p {
            font-size: 1rem;
            margin-bottom: 8px;
            /*color: var(--medium-text);*/
          }

          a {
            font-size: 0.8rem;
            font-family: 'Source Sans Pro';
            font-weight: 500;
            /*color: var(--primary);*/
          }
        }

        .form-card {
          /*background: var(--card-bg-color);
        border: 1px solid var(--card-border-color);*/
          border-radius: 0.9rem;
          padding: 3.25rem;
          margin-bottom: 1rem;
        }
      }
    }

    .auth-image-wrap {
      width: 100%;

      img {
        display: block;
        max-height: 610px;
        object-fit: contain;
        margin: 0 auto;
      }
    }
  }

  /* stylelint-disable */

  /*IPad Air*/
  @media only screen and (min-device-width: 820px) and (max-device-height: 1180px) and (-webkit-min-device-pixel-ratio: 1.5) and (orientation: portrait) {
    .signup-column {
      display: none;
    }

    .form-column {
      width: 100% !important;
    }
  }

  /*IPad pro*/
  @media only screen and (min-device-width: 1024px) and (max-device-height: 1366px) and (-webkit-min-device-pixel-ratio: 1.5) and (orientation: portrait) {
    .signup-column {
      display: none;
    }

    .form-column {
      width: 100% !important;
    }
  }

  /* stylelint-enable */
</style>
