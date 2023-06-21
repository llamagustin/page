<script setup lang="ts">
export interface HeroSubProps {
  title: string
  subtitle: string
  button_0: string
  button_1: string
}

const props = defineProps<HeroSubProps>()
</script>

<template>
  <Hero alignment="center" color="grey">
    <template #body>
      <div class="columns is-vcentered py-20">
        <!--Hero Content-->
        <div class="column is-relative">
          <Title tag="h1" :size="1" weight="bold">
            <span class="text-gradient">{{ props.title }}</span>
          </Title>
          <Subtitle
            tag="p"
            :size="5"
            weight="thin"
            class="mx-auto max-w-6 b-centered-tablet-p pt-2"
          >
            {{ props.subtitle }}
          </Subtitle>

          <!--Buttons-->
          <Buttons alignment="centered">
            <Button :to="{ name: 'blocks' }" color="primary" raised bold>
              {{ props.button_0 }}
            </Button>
            <Button href="/" bold>
              {{ props.button_1 }}
            </Button>
          </Buttons>
        </div>
      </div>
    </template>
  </Hero>
</template>

<style lang="scss" scoped>
.hero {
  position: static !important;
}
</style>
