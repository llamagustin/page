<script setup lang="ts">
import { customerLogos } from '/@src/data/pages/logos'
import { textTerms, termsOfService } from '/@src/texts/terms'

export interface TermsHeaderProps {
  title: string
  subtitle: string
  updated: string
  image: string
  darkImage?: string
  imageWidth: string
  imageHeight: string
}

const props = defineProps<TermsHeaderProps>()
</script>

<template>
  <Hero alignment="center" size="fullheight" color="grey">
    <template #body>
      <div class="columns is-vcentered mt-12">
        <div class="column is-relative">
          <div class="mx-auto max-w-6 mb-4">
            <Title tag="h1" :size="1" weight="bold">
              <span  >{{ props.title }} </span>
            </Title>
            <Subtitle
              tag="p"
              :size="5"
              weight="thin"
              class="mx-auto max-w-6 b-centered-tablet-p pt-2"
            >
              {{ props.subtitle }}
            </Subtitle>
            <p class="paragraph"> {{ props.updated }}</p>
            
            <container class="mt-5">
               <Button
                 :href="textTerms.data[0].to"
                 color="primary"
                 class="button-kit-digital mr-5 px-5"
                 raised
                 bold>{{ $t('btn_terms') }}</Button>
               <Button
                 :href="textTerms.data[1].to"
                 color="primary"
                 class="button-kit-digital px-5"
                 raised
                 bold>{{ $t('btn_legal') }}</Button>
            </container>
          </div>

          <div class="centered-illustration-wrapper">
            <DarkImage
              class="centered-illustration"
              :src="props.image"
              :src-dark="props.darkImage"
              :width="props.imageWidth"
              :height="props.imageHeight"
              alt="Hero illustration"
            />
          </div>
        </div>
      </div>
    </template>
    <template #footer v-if="false">
      <div class="mx-auto max-w-8">
        <p class="paragraph rem-100 text-light has-text-centered">
          Helping people work faster at
        </p>
        <div class="tabs is-centered pb-6">
          <HeroClients :logos="customerLogos" />
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

.centered-illustration-wrapper {
  position: relative;

  .centered-illustration {
    position: relative;
    display: block;
    z-index: 1;
  }
}
</style>
