<script setup lang="ts">
//import { customerLogos } from '/@src/data/pages/logos'
import { textHero } from '/@src/texts/wait'

import { customerLogos } from '/@src/texts/assets/logos'
</script>

<template>
  <Hero class="bg-hero" color="grey" alignment="center" size="">
    <template #body>
      <div class="columns is-vcentered ">
        <div class="column is-relative">
          <div class="mx-auto max-w-6 mb-4">
            <Countdown  :label="textHero.label" :date="textHero.date" />
          </div>

          
        </div>
      </div>
    </template>
 
  </Hero>
</template>

<style lang="scss" scoped>
:deep(.hero) {
  overflow: hidden !important;
}

:deep(.hero-body) {
  padding-bottom: 2rem !important;
}

.bg-hero {
  position: relative;
  background-size: cover !important;
  background-repeat: no-repeat;
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

@media only screen and (max-width: 767px) {
  .centered-app-wrapper {
    .centered-app {
      border-radius: 0.75rem;
    }
  }
}
</style>
