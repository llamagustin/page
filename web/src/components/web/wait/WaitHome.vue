<script setup lang="ts">
  import { onMounted, ref } from "vue"
  import { useFreelancerListStore } from '/@src/components/web/freelancer/useFreelancerListStore.ts'
  import { viaPlaceholderErrorHandler } from '/@src/utils/viaPlaceholderErrorHandler'

  // store instance
  const flStore = useFreelancerListStore();
  const selFreelancer = ref();
  // get freelancers
  onMounted(async () => {
    try {
      const result = await flStore.fetchFreelancers({ category: "" });
      // generate random number from 0 to freelancers length - 1
      const index = Math.round(Math.random() * (result.data.length))
      selFreelancer.value = result.data[index];
    }
    catch (e: Error) {
      console.log(e);
    }
  })

  const gotoForm = val => {
    const boxHeader = document.querySelector('.ui-mockup');
    boxHeader.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  const servicios = [
    { id: 1, name: 'Business' },
    { id: 2, name: 'Marketing' },
    { id: 3, name: 'Consultoria' },
    { id: 4, name: 'CopyWriter' },
    { id: 5, name: 'Other' },
    // Agrega más objetos según tus necesidades
  ]
</script>

<template>
  <Hero color="grey" class="cards-hero" size="fullheight">
    <template #body>
      <div class="columns is-vcentered">
        <!--First column-->
        <div class="column is-6">
          <div class="hero-caption">
            <Title tag="h1" :size="2" weight="bold">
              Crea o registra tu negocio GPT fácil y gratis
            </Title>
            <p class="subtitle paragraph mt-1">
              Potencia tu negocio con Inteligencia Aritifical y los 6 sentidos
              más esenciales
            </p>
            <!--Buttons-->
            <div class="buttons is-relative z-1">
              <Button href="/home" color="primary" :long="2" raised bold>
                Nuestro Servicio
              </Button>
              <Button @click="gotoForm" elevated bold :long="2">
                Nuevo negocio
              </Button>
            </div>
          </div>
          <div class="box-container">
            <div class="home-box">
              <div class="fb-header">
                <div class="icon-container">
                  <IconBox color="success">
                    <i class="iconify" data-icon="uiw:safety"></i>
                  </IconBox>
                </div>
                <span class="header-text">
                  Serverless
                </span>
                <!--<div class="header-stat is-positive">-->
                <!--  <span>+12.4%</span>-->
                <!--</div>-->
              </div>
              <div class="fb-content">
                <p>
                  Potencia tu idea, crea tu proyecto con nuestro servicio de servidores.
                </p>
              </div>
            </div>
            <div class="home-box">
              <div class="fb-header">
                <div class="icon-container">
                  <IconBox color="success">
                    <i class="iconify" data-icon="uiw:safety"></i>
                  </IconBox>
                </div>
                <span class="header-text">
                  Dominios
                </span>
              </div>
              <div class="fb-content">
                <p>
                  Encuentra el dominio ideal al mejor precio.
                  Dominios por tan solo 1€
                </p>
              </div>
            </div>
          </div>
        </div>
        <!--Second column-->
        <div class="column is-5 is-offset-1">
          <div class="hero-composition">
            <div class="image-wrap">
              <img class="curly-image" src="/assets/illustrations/placeholder/background.jpg" alt="Hero image" @error.once="
                  (event) => viaPlaceholderErrorHandler(event, '800x1041')
                " />
              <!--Floating box-->
              <div class="floating-box fb-1">
                <div class="fb-header">
                  <div class="icon-container">
                    <IconBox color="success">
                      <i class="iconify" data-icon="uiw:safety"></i>
                    </IconBox>
                  </div>
                  <span class="header-text">Arma tu propio equipo!</span>
                </div>
                <div class="fb-content">
                  <RandomFreelancer :profile="selFreelancer" />
                </div>
              </div>
              <!--Floating box-->
              <div class="floating-box fb-2">
                <div class="fb-header">
                  <div class="icon-container">
                    <IconBox color="success">
                      <i class="iconify" data-icon="uiw:safety"></i>
                    </IconBox>
                  </div>
                  <span class="header-text">Servicios</span>
                  <!--<div class="header-stat is-positive">-->
                  <!--  <span>+12.4%</span>-->
                  <!--</div>-->
                </div>
                <div class="fb-content">
                  <p v-for="servicio in servicios" :key="servicio.id">{{ servicio.name }}</p>
                </div>
              </div>
              <!--Floating box-->
              <div class="floating-box fb-3">
                <div class="fb-header">
                  <div class="icon-container">
                    <IconBox color="success">
                      <i class="iconify" data-icon="uiw:safety"></i>
                    </IconBox>
                  </div>
                  <span class="header-text">Resumen</span>
                  <!--<div class="header-stat is-positive">-->
                  <!--  <span>+12.4%</span>-->
                  <!--</div>-->
                </div>
                <div class="fb-content">
                  <p>Prepara tu mínimo para desarrollarlo.</p>
                </div>
              </div>
              <!--Floating chat-gpt logos-->
              <div class="floating-logo fl-1">
                <img src="/assets/illustrations/placeholder/logo-open-ai.png" />
              </div>
              <div class="floating-logo fl-2">
                <img class="medium" src="/assets/illustrations/placeholder/logo-open-ai.png" />
              </div>
              <div class="floating-logo fl-3">
                <img class="small" src="/assets/illustrations/placeholder/logo-open-ai.png" />
              </div>
              <div class="floating-logo fl-4">
                <img class="medium" src="/assets/illustrations/placeholder/logo-open-ai.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Hero>
</template>

<!--Mobile First-->
<style lang="scss" scoped>
  :deep(.title) {
    &.is-2 {
      font-size: 2rem;
    }
  }

  .icon-box {
    width: 30px;
    height: 30px;
    min-width: 30px;
  }

  .box-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 40px;

    .home-box {
      background: var(--card-bg-color);
      padding: 0.85rem;
      border: 1px solid var(--card-border-color);
      border-radius: 1rem;
      box-shadow: var(--light-box-shadow);
      transition: background-color 0.3s, border-color 0.3s;
    }
  }

  .image-wrap {
    position: relative;
    margin: 0 auto;
    max-width: 420px;

    .curly-image {
      width: 100%;
      height: 480px;
      border-radius: 0 5rem;
    }
  }

  .floating-box {
    position: absolute;
    background: var(--card-bg-color);
    width: 100%;
    height: fit-content;
    padding: 0.85rem;
    border: 1px solid var(--card-border-color);
    border-radius: 1rem;
    box-shadow: var(--light-box-shadow);
    transition: background-color 0.3s, border-color 0.3s;
    transform: scale(0.8);

    &.fb-1 {
      top: 0rem;
      right: -2rem;
      max-width: 280px;
      min-width: 280px;
    }

    &.fb-2 {
      top: 12rem;
      right: -2rem;
      max-width: 280px;
      min-width: 280px;
    }

    &.fb-3 {
      bottom: 1.5rem;
      right: -2rem;
      max-width: 240px;
      min-width: 240px;
    }
  }

  .fb-header {
    width: 100%;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;

    .icon-container {
      max-width: 30px;
    }

    .header-text {
      display: block;
      font-weight: 700;
      font-size: 1rem;
      color: var(--title-color);
      margin-left: 1rem;
    }
  }

  .fb-content {
    color: var(--medium-text);
    font-size: 0.85rem;
    font-family: var(--font);
  }

  .hero-caption {
    margin-top: 2.5rem;
  }

  .hero-caption p {
    margin: 1.25rem 0;
  }

  .floating-logo {
    position: absolute;
    background: var(--card-bg-color);
    border: 1px solid var(--card-border-color);
    box-shadow: var(--light-box-shadow);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    transition: background-color 0.3s, border-color 0.3s;

    img {
      height: 66px;
      width: 66px;
      min-width: 66px;
      border-radius: 50%;
      object-fit: cover;

      &.medium {
        width: 50px;
        height: 50px;
        min-width: 50px;
      }

      &.small {
        width: 26px;
        height: 26px;
        min-width: 26px;
      }
    }

    &.fl-1 {
      top: 0;
      right: -80px;
      height: 76px;
      width: 76px;
    }

    &.fl-2 {
      top: 140px;
      right: -140px;
      height: 60px;
      width: 60px;
    }

    &.fl-3 {
      top: 90px;
      right: -20px;
      height: 36px;
      width: 36px;
    }

    &.fl-4 {
      bottom: 140px;
      left: -30px;
      height: 60px;
      width: 60px;
    }
  }

  @media only screen and (min-width: 768px) {
    .box-container {
      flex-direction: row;
    }

    .image-wrap .curly-image {
      height: 560px;
    }

    .floating-box {
      position: absolute;
      transform: none;

      &.fb-1 {
        top: 2rem;
        left: -6rem;
      }

      &.fb-2 {
        bottom: 14rem;
        right: -4rem;
      }

      &.fb-3 {
        bottom: 4rem;
        right: -4rem;
      }
    }
  }

  @media only screen and (min-width: 1024px) and (max-width: 1200px) {
    .floating-box {
      position: absolute;

      &.fb-1 {
        top: 2rem;
        right: -2rem;
        left: auto;
      }

      &.fb-2 {
        top: 16.7rem;
        bottom: auto;
        right: -2rem;
      }

      &.fb-3 {
        bottom: -0.5rem;
        right: -2rem;
      }
    }
  }
</style>
