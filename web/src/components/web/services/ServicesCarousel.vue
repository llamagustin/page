<script setup lang="ts">
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import type { Templates } from '/@src/types'
import ServicesSlide from './ServicesSlide.vue'

export interface templateCarouselProps {
  slides: Templates[]
  pulled?: boolean
}

const props = withDefaults(defineProps<templateCarouselProps>(), {
  slides: () => [],
  inverted: false,
})

const breakpoints = {
  // 700px and up
  700: {
    itemsToShow: 1,
    snapAlign: 'center',
  },
  768: {
    itemsToShow: 2,
    snapAlign: 'center',
  },
  800: {
    itemsToShow: 3,
    snapAlign: 'center',
  },
  // 1024 and up
  1100: {
    itemsToShow: 4,
    snapAlign: 'start',
  },
}
const emit = defineEmits(['handleTemplate'])

const handleTemplate = (slide)=> {
  const newSlide = JSON.parse(JSON.stringify(slide))
  emit('handleTemplate', [newSlide])
  console.log('is emitting handle template')
}
</script>

<template>
  <div>
    <div class="template-carousel">
      <slot name="title"></slot>

      <div class="carousel-wrapper">
        <carousel :items-to-show="1" :breakpoints="breakpoints">
          <slide v-for="(slide, index) in props.slides" :key="index">
            <div class="slide-container">
              <ServicesSlide @handleTemplate="handleTemplate(slide)" :slide="slide" />
            </div>
          </slide>

          <template #addons>
            <navigation />
          </template>
        </carousel>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.slide-container{
  cursor: pointer;
}
.template-carousel {
  position: relative;
  margin: 10px 0px 0px 10px;
  :deep(.collection-title) {
    margin-bottom: 1rem;
  }

  .carousel-wrapper {
    position: relative;

    .slide-container {
      padding: 0 0.5rem;
    }
  }
}

:deep(.carousel__next--in-active),
:deep(.carousel__prev--in-active) {
  opacity: 0.7;
}

:deep(.carousel__next) {
  right: 25px;

  svg {
    right: -1px;
  }
}

:deep(.carousel__prev) {
  right: 35px;

  svg {
    left: -1px;
  }
}

:deep(.carousel__next),
:deep(.carousel__prev) {
  position: absolute;
  top: -35px;
  left: initial;
  background: var(--card-bg-color);
  border: 1px solid var(--card-border-color);
  color: var(--light-text);
  box-shadow: var(--light-box-shadow);
  transition: border-color 0.3s, color 0.3s;

  svg {
    position: relative;
    width: 1em;
  }

  &:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
}
</style>
