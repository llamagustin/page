<script setup lang="ts">
import {onMounted,ref} from 'vue'
import { textServiceCarousel } from '/@src/texts/home'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { useDarkmode } from '/@src/stores/darkmode'

const darkmode = useDarkmode()

export interface BoxCarouselSlide {
  icon: string
  title: string
  link: string
}

export interface BoxCarouselProps {
  slides: BoxCarouselSlide[]
}

const slideSize = ref(4)

const props = withDefaults(defineProps<BoxCarouselProps>(), {
  slides: () => [],
})

const detectDevice = ()=>{
  const width:number = window.innerWidth;
  if(width<375) slideSize.value=3
  else slideSize.value=4
  
}

onMounted(()=>{
  detectDevice()
    window.addEventListener('resize', ()=>{ detectDevice() });
})

</script>

<template>
  <div class="">
    <div class="">
      <div class="mb-6">
        <Subtitle tag="h3" :size="6" weight="bold" class="pb-2">
          <span class="text-gradient">{{ $t('textServiceCarrousel_label') }}</span>
        </Subtitle>
        
        <Title  tag="h1" :size="slideSize === 4 ? 1 : 2" weight="bold" color="white">
          <span :style="{color: 'white'}" >
            {{ $t('textServiceCarrousel_title1')}} <br/> {{$t('textServiceCarrousel_title2') }}
           </span>
        </Title>

        <carousel :style="{ 'max-width': slideSize === 4 ? '460px' : '320px' }" :items-to-show="slideSize">
          <slide v-for="(slide, index) in props.slides" :key="index">
            <RouterLink :to="slide.to" class="box-carousel-box">
              <div class="box-inner">
            
                <IconService
                  :color="slide.iconColor"
                  size="large"
                >
                  <i
                    class="iconify"
                    :data-icon="slide.icon"
                  ></i>
                </IconService>
              </div>
              <div class="title-inner">
                <span class="text-white">{{ slide.title }}</span>
              </div>
            </RouterLink>
          </slide>
  
          <template #addons>
            <navigation />
          </template>
        </carousel>
        <p style="max-width:450px" class="mt-4 paragraph rem-115 has-text-light">
          {{ $t('textServiceCarrousel_text') }} 
        </p>
        <!--Buttons-->
        <div class="buttons is-relative z-1 mt-4">
          <!--old to textServiceCarousel.button[0].link-->
          <Button :href="textServiceCarousel.button[1].link" color="primary" :long="2" raised bold>
              {{ $t('textServiceCarrousel_btn2') }}
          </Button>
          <Button :to="textServiceCarousel.button[0].link" elevated bold :long="2">
            {{ $t('textServiceCarrousel_btn1') }}
          </Button>
        </div>
      </div>
      
    </div>
  </div>
</template>




<style scoped lang="scss">







.box-carousel {
  position: relative;
  z-index: 1;

  .box-carousel-box {
    
    margin: 0 0.5rem;

    .box-inner {
      background: var(--card-bg-color);
      border: 1px solid var(--card-border-color);
      border-radius: 0.85rem;
      display: flex;
      justify-content: center;
      align-items: center;
      -height: 100px;
      -max-width: 100px;
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

  .carousel-action {
    :deep(.button) {
      min-width: 180px;
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


@media only screen and (max-width: 767px) {
  .buttons{
    justify-content: center;
  }
}
</style>
