<script setup lang="ts">
import { computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

export interface SideSectionProps {
  title: string
  subtitle: string
  content: string
  to?: RouteLocationRaw
  cta?: string
  image: string
  darkImage?: string
  imageWidth?: string
  imageHeight?: string
  legend?: string
  bordered?: boolean
  inverted?: boolean
  blob?: boolean
  reverse?: boolean
}

const props = withDefaults(defineProps<SideSectionProps>(), {
  cta: undefined,
  to: undefined,
  darkImage: undefined,
  imageWidth: '800',
  imageHeight: '500',
  legend: undefined,
  bordered: false,
  inverted: false,
  blob: false,
  reverse: false,
})

const sideSectionClasses = computed(() => [
  props.bordered && `is-bordered`,
  props.inverted && `is-inverted`,
  props.reverse && `is-reverse`,
])

const textClasses = computed(() => [props.inverted && `is-inverted`])
</script>

<template>
  <div class="side-section mobile:py-0 small:py-1 z-1"  >
    <div class="columns is-vcentered">
      <div class="column is-12">
        <Subtitle :size="6" weight="bold" class="pb-4" leading>
          <span class="text-gradient">{{ subtitle }}</span>
        </Subtitle>
        <Title :size="5" weight="bold" :inverted="props.inverted">
          {{ title }}
        </Title>
        <p class="paragraph  rem-115 mb-4" > {{ props.content }} </p>
        <Button v-if="cta" :href="props.to" target="_blank" class="button-white cursor-pointer" >
          <span class="action-link">{{ props.cta }}</span>
          <i class="iconify" data-icon="feather:arrow-right"></i>
        </Button>
        <slot name="content"></slot>
      </div>
      
    </div>
  </div>
</template>


<style lang="scss" scoped>
.side-section {
  .morphing-blob-wrapper {
    position: absolute;
    transform: scale(1.8);
    opacity: 0.15;
  }

  .button-white {
    background: transparent;
    border: none;
  }

  .action-link {
    color: #fff;
    font-weight: 500;
    margin-right: 0.75rem;
    font-size: 16spx;

    &:hover {
      color: #fff;

      + .iconify {
        color: #fff;
        transform: translateX(5px) !important;
      }
    }
  }

  .iconify {
    transition: transform 0.3s;
    vertical-align: middle;
    color: #fff;
  }

  &.is-bordered {
    border-bottom: 1px solid var(--border);
  }

  &.is-reverse {
    .columns {
      flex-direction: row-reverse;

      .column {
        &.is-offset-1 {
          margin-left: 0;
          margin-right: 8.3333%;
        }
      }
    }
  }

  &.is-inverted {
    &.is-bordered {
      border-bottom-color: var(--dark-border);
    }
  }
}

@media only screen and (max-width: 767px) {
  .side-section {
    :deep(.title) {
      &.is-2 {
        font-size: 2rem;
      }
    }

    .field {
      &.is-grouped {
        flex-direction: column;
      }
    }

    .morphing-blob-wrapper {
      transform: scale(1.3);
      top: -17px;
      right: -18px;
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
  .side-section {
    text-align: center;

    .morphing-blob-wrapper {
      transform: scale(1.6);
      top: 40px;
      right: 146px;
    }

    .column {
      &.is-5 {
        max-width: 660px;
        margin: 0 auto 2rem;
      }
    }

    img {
      max-width: 490px !important;
    }

    .spinner-container {
      max-width: 490px;
      margin: 0 auto;
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  .side-section {
    :deep(.title) {
      &.is-2 {
        font-size: 2rem;
      }
    }
  }
}
</style>
