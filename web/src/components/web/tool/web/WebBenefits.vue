<script setup lang="ts">
import { UseElementVisibility } from '@vueuse/components'
import { CompleteFeature } from '/@src/types'

export interface DemoFeaturesProps {
  features: CompleteFeature[]
}

const props = withDefaults(defineProps<DemoFeaturesProps>(), {
  features: () => [],
})
</script>

<template>
  <div class="demo-features pb-6">
    <div class="grid grid-cols-2">
      <div
        v-for="(feature, index) in props.features"
        :key="index"
        class="demo-feature-wrapper"
      >
        <UseElementVisibility v-slot="{ isVisible }">
          <div class="demo-feature" :class="isVisible && 'is-active'">
            <div class="svg-icon">
              <i class="iconify" :data-icon="feature.icon"></i>
            </div>
            <div class="feature-meta">
              <h4 class="top-title">{{ $t('vulkbenefits_subtitle'+index) }}</h4>
              <Title tag="h3" :size="4" weight="bold" leading>
                <span>{{ $t('vulkbenefits_title'+index) }}</span>
              </Title>
              <p>{{ $t('vulkbenefits_text'+index) }}</p>
            </div>
          </div>
        </UseElementVisibility>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.demo-features {
  .long-screenshot {
    display: block;
    border: 1px solid var(--card-border-color);
    border-radius: 0.75rem;
    box-shadow: var(--light-box-shadow);
  }

  .demo-feature-wrapper {
    &:not(:last-child) {
      margin-bottom: 4rem;
    }
  }

  .demo-feature {
    padding-right: 2rem;
    display: flex;
    opacity: 0;
    transform: translateY(0.75rem);
    transition: opacity 0.3s, transform 0.3s;
    transition-delay: 0.25s;

    &.is-active {
      opacity: 1;
      transform: translateY(0);
    }

    .svg-icon {
      margin-right: 1rem;
      font-size: 2rem;
      color: var(--primary);

      .iconify {
        vertical-align: top;
      }
    }

    .feature-meta {
      .top-title {
        font-family: var(--font);
        font-weight: 500;
        font-size: 0.7rem;
        color: var(--primary);
        text-transform: uppercase;
      }

      p {
        font-family: var(--font);
        font-size: 0.9rem;
        color: var(--medium-text);

        a {
          color: var(--primary);
          font-weight: 500;
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .demo-features {
    position: relative;
    overflow: hidden;

    .long-screenshot {
      position: absolute;
      top: 0;
      right: -130px;
      z-index: 0;
    }

    .demo-feature {
      position: relative;
      flex-direction: column;
      padding: 1.5rem;
      background: var(--card-bg-color);
      border: 1px solid var(--card-border-color);
      border-radius: 0.65rem;
      box-shadow: var(--light-box-shadow);
      margin-bottom: 2rem;
      z-index: 1;
    }

    .py-8 {
      display: none;
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
  .demo-features {
    .long-screenshot {
      position: sticky;
      top: 110px;
    }

    .py-8 {
      padding-top: 2rem !important;
      padding-bottom: 2rem !important;
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  .demo-features {
    .long-screenshot {
      position: sticky;
      top: 110px;
    }
  }
}
</style>
