<script setup lang="ts">
import { textHeroE } from '/@src/texts/tool/crm'

import { viaPlaceholderErrorHandler } from '/@src/utils/viaPlaceholderErrorHandler'
</script>

<template>
  <Hero class="product-hero" orientation="right">
    <template #body>
      <div class="columns is-vcentered">
        <div class="column is-5">
          <Title tag="h1" :size="1" weight="bold">
            {{ textHeroE.title }}
          </Title>
          <Subtitle tag="p" :size="3" classes="b-centered-tablet-p text-medium">
            {{ textHeroE.subtitle }}
          </Subtitle>
          <!--Buttons-->
          <div class="buttons is-relative z-1">
            <Button
              color="primary"
              :style="{background: '#ffa726', borderColor: '#ffa726'}"
              :href="textHeroE.button[0].link"
              targer="_blank"
              :long="2"
              raised
              bold
            >
              {{ textHeroE.button[0].label }}
            </Button>
            <Button
              elevated
              bold
              :href="textHeroE.button[1].link"
              targer="_blank"
              :long="2"
            >
              {{ textHeroE.button[1].label }}
            </Button>
          </div>
        </div>
        <div class="column is-7 is-offset-1">
          <div class="hero-image-container">
            <DarkImage
              class="mx-auto max-w-5"
              src="/assets/illustrations/features/banking-cards-feature.png"
              src-dark="/assets/illustrations/features/banking-cards-feature-dark.png"
              width="500"
              height="500"
              @error.once="
                (event) => viaPlaceholderErrorHandler(event, `500x500`)
              "
            />
            <div class="hero-bg-circle"></div>
          </div>
        </div>
      </div>
    </template>
  </Hero>
</template>

<style lang="scss" scoped>
.hero-image-container {
  position: relative;

  img {
    position: relative;
    z-index: 1;
  }

  .hero-bg-circle {
    position: absolute;
    top: 10%;
    right: -20%;
    height: 550px;
    width: 550px;
    border-radius: 50%;
    background: rgb(var(--primary-rgb));
    background: linear-gradient(
      98deg,
      rgb(255 167 38 / 100%) 0%,
      rgb(255 167 38 / 28.9%) 35%,
      rgb(255 167 38 / 0%) 100%
    );
    z-index: 0;
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

    .hero-image-container {
      .hero-bg-circle {
        top: 3%;
      }
    }
  }
}
</style>
