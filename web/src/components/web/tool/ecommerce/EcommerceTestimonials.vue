<script setup lang="ts">
import { Carousel, Slide, Navigation } from 'vue3-carousel'

export interface Testifier {
  picture: string
  name: string
  role: string
}

export interface TestimonialsCarouselSlide {
  icon: string
  text: string
  testifier: Testifier
}

export interface TestimonialsCarouselProps {
  title: string
  subtitle: string
  content: string
  slides: TestimonialsCarouselSlide[]
  inverted?: boolean
}

const props = withDefaults(defineProps<TestimonialsCarouselProps>(), {
  title: '',
  subtitle: '',
  content: '',
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
</script>

<template>
  <div class="py-6">
    <div class="testimonials-carousel">
      <div class="testimonials-carousel-title max-w-7 mb-6">
        <Subtitle
          tag="h3"
          :size="6"
          weight="bold"
          class="pb-2"
          :inverted="props.inverted"
        >
          <span :class="!props.inverted && 'text-gradient'">
            {{ props.title }}
          </span>
        </Subtitle>
        <Title tag="h2" :size="3" weight="bold" :inverted="props.inverted">
          <span>{{ props.subtitle }}</span>
        </Title>
        <p
          class="paragraph rem-115"
          :class="props.inverted && 'is-inverted-light'"
        >
          {{ props.content }}
        </p>
      </div>
      <carousel :items-to-show="1" :autoplay="3000" :breakpoints="breakpoints">
        <slide v-for="(slide, index) in props.slides" :key="index">
          <div class="testimonials-carousel-card">
            <div class="card-inner">
              <i class="iconify mb-5" :data-icon="slide.icon"></i>
              <p class="paragraph rem-90 mb-5">"{{ $t('shopTestimonials_content'+index) }}"</p>
              <div class="testimonial-author">
                <AvatarSimple :picture="slide.avatar" />
                <div class="meta">
                  <Title tag="h3" :size="7" weight="semi" narrow>
                    {{ $t('shopTestimonials_name'+index) }}
                  </Title>
                  <p class="paragraph rem-85">@{{$t('shopTestimonials_position'+index) }}</p>
                </div>
              </div>
            </div>
          </div>
        </slide>

        <template #addons>
          <navigation />
        </template>
      </carousel>
    </div>
  </div>
</template>

<style scoped lang="scss">
.testimonials-carousel {
  position: relative;

  .testimonials-carousel-card {
    //width: calc(100% - 1rem);
    height: 100%;
    //margin: 0 0.5rem;
    padding: 0 0.5rem;
    text-align: left;

    .card-inner {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--card-bg-color);
      border: 1px solid var(--card-border-color);
      border-radius: 0.85rem;
      padding: 10px 20px 20px;
      transition: box-shadow 0.3s;

      .iconify {
        font-size: 2rem;
        color: var(--primary);
      }

      .testimonial-author {
        display: flex;
        align-items: center;
        margin-top: auto;

        .meta {
          margin-left: 0.5rem;
        }
      }
    }

    &:hover {
      .card-inner {
        box-shadow: var(--light-box-shadow-md);
      }
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
