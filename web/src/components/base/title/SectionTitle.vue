<script setup lang="ts">
import { computed } from 'vue'

export interface SectionTitleProps {
  title: string
  subtitle: string
  inverted?: boolean
  spaced?: boolean
  align?: string
  color?: string
}

const props = withDefaults(defineProps<SectionTitleProps>(), {
  title: undefined,
  subtitle: undefined,
  inverted: false,
  spaced: false,
  color: undefined
})



const blobClasses = computed(() => [props.color && `is-${props.color}`])

const titleClasses = computed(() => [props.inverted && `is-inverted`])

const blockClasses = computed(() => [props.spaced && 'mb-16'])

const subtitleClasses = computed(() => [
  props.inverted ? `text-white` : 'text-gradient',
])
</script>

<template>
  <div class="has-text-centered" :class="blockClasses">
    <Subtitle tag="h3" :size="5" weight="bold">
      <span class="title-color new-color" :class="blobClasses">
        <slot name="subtitle">{{ props.subtitle }}</slot>
      </span>
    </Subtitle>
    <Title tag="h2" :size="2" weight="bold" :class="titleClasses">
      <span class="new-color">
        <slot>{{ props.title }}</slot>
      </span>
    </Title>
  </div>
</template>


<style lang="scss" scoped>
.new-color{
  color: var(--title-color);
}
.title-color{
    &.is-blue{
      color: #0000ff !important;
    }
    
    &.is-green{
        color: #13d33b !important;
    }
    
    &.is-yellow{
        color: #fff343 !important;
    }
    
    &.is-red{
        color: #d21643 !important;
    }
    
    &.is-orange{
      color: #ffa726 !important;
    }
    
    &.is-violet{
      color: #d216ff !important;
    }
}
</style>