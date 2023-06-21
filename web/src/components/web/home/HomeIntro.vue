
<script setup lang="ts">
  import {  mentorServiceCarousel, mentorPlanCarousel } from '/@src/texts/home'

</script>

<template>
  <Hero
    v-background="{src: '/assets/images/portada.jpg',}"
    overlay
    class="product-hero"
    size="fullheight"
    mask="circle"
    >
    <template #body>
      <div class="pt-10 columns is-multiline is-mobile is-desktop"> 
        <div class="column is-6-desktop is-10-mobile">
          <div style="max-width:500px">
            <HomeServiceCarousel  :slides="mentorServiceCarousel" />
          </div>
        </div>
        <div class="column is-11-mobile is-6-desktop ">
          
          <div class="hero-form-container">
            <div class="hero-form px-5-mobile ">
              <HomePlanCarousel :slides="mentorPlanCarousel" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </Hero>
</template>

<style lang="scss" scoped>

.product-hero{
  background-size: cover;
  object-fit: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.centered-app-wrapper {
  position: relative;

  .centered-app {
    position: relative;
    display: block;
    border-radius: 2rem;
    border: 1px solid var(--border);
    box-shadow: var(--light-box-shadow);
    z-index: 1;
  }

  .centered-app-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 2rem;
    background: var(--card-bg-color);
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 2;
  }

  .centered-app-button.active {
    opacity: 0.1;
  }

  .centered-app-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.35rem;
    width: 58px;
    height: 58px;
    border-radius: 50%;
    z-index: 3;
    cursor: pointer;
    border: none;
    background: var(--primary);
    box-shadow: var(--primary-box-shadow);
    transition: transform 0.3s;

    .iconify {
      position: relative;
      right: -0.15rem;
      vertical-align: middle;
      color: var(--white);

      :deep(path) {
        fill: var(--white);
      }
    }
  }

  &:hover {
    .centered-app-overlay {
      opacity: 0.7;
    }

    .centered-app-button {
      transform: translate(-50%, -50%) scale(1);
    }
  }
}

.is-dark {
  .centered-app-wrapper {
    .centered-app {
      border: none;
    }
  }
}

.box-carousel-box {
    
    margin: 0 0.3rem;

    .box-inner {
      background: var(--card-bg-color);
      border: 1px solid var(--card-border-color);
      border-radius: 0.85rem;
      display: flex;
      justify-content: center;
      align-items: center;
      -height: 100px;
      max-width: 80px;
      margin: 0 auto;
      padding: 4px;
      transition: box-shadow 0.3s;

      .iconify {
        font-size: 2rem;
      }
    }

    .title-inner {
      text-align: center;
      max-width: 100px;
      margin: 0.75rem auto 0;
      line-height: 1.2;
      font-family: var(--font-main);
      font-weight: 600;
      color: var(--title-color);
      user-select: none;
    }

    &:hover {
      .box-inner {
        box-shadow: var(--light-box-shadow-md);
      }
    }
  }


@media only screen and (max-width: 767px) {
  .centered-app-wrapper {
    .centered-app {
      border-radius: 0.75rem;
    }
  }
}


.hero-form-container {
  position: relative;

  .hero-form {
    background: var(--card-bg-color);
    border: 1px solid var(--card-border-color);
    border-radius: 1rem;
    padding: 2.5rem;
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
  }
}

@media only screen and (max-width: 767px) {
  .product-hero {
    text-align: center;
    
    :deep(.title) {
      margin-top: 3rem;

      &.is-2 {
        font-size: 2rem;
      }
    }

    .buttons {
      justify-content: center;
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
  .product-hero {
    text-align: center;
    
    :deep(.title) {
      margin-top: 3rem;
      font-size: 2.25rem;
      margin-left: auto;
      margin-right: auto;
      max-width: 580px;
    }

    :deep(.subtitle) {
      margin-left: auto;
      margin-right: auto;
      max-width: 580px;
    }

    .buttons {
      justify-content: center;
    }
  }
}
</style>


