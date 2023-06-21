<script setup lang="ts">
import { textPlanCarousel } from '/@src/texts/home'
import { onMounted } from 'vue'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

export interface BoxCarouselSlide {
  icon: string
  title: string
  link: string
}

export interface BoxCarouselProps {
  slides: BoxCarouselSlide[]
}

const props = withDefaults(defineProps<BoxCarouselProps>(), {
  slides: () => [],
})



let html = null

onMounted(() => {
  html = document.querySelector('html')
  
  var wrapper = document.querySelector('.centered-app-wrapper-kit')
  
  document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    showVideoKit()
  }
});
  
})

//
const showVideoKit = () => {
  var button = document.querySelector('#button-video-aythen-kit')
  var wrapper = document.querySelector('.centered-app-wrapper-kit')
  
  if (button.classList.contains('active')) {
    html.style.overflow = "auto";
    wrapper.classList.remove('active-video')
    
    button.classList.remove('active')
    wrapper.classList.remove('active')
    
    document.querySelector('#video-aythen-kit').pause()
  } else {
    html.style.overflow = "hidden";
    wrapper.classList.add('active-video')
    button.classList.add('active')
    wrapper.classList.add('active')
    
    document.querySelector('#video-aythen-kit').play()
  }
}

</script>

<template>
  <div class="">
    <div class="box-carousel pb-2">
      <div class="box-carousel-title max-w-7 mb-4">
        <Subtitle tag="h3" :size="6" weight="bold" class="pb-2">
          <span class="text-gradient">{{ $t('textPlanCarrousel_label') }} </span>
        </Subtitle>
        <Title  tag="h2" :size="1" weight="bold">
          <span style="color:var(--title-color)" >{{ $t('textPlanCarrousel_title') }}</span>
        </Title>
        <img src="/assets/images/eu-logo.png" :style="{width: '199px'}" />
        <p class="paragraph rem-115 mt-2">
          {{ $t('textPlanCarrousel_text') }}
        </p>
      </div>
      
      <!--Hero App Mockup-->
      <div class="centered-app-wrapper-kit mx-auto mt-2"  >
        <video poster="/assets/images/firstvideo_capture.jpg" id="video-aythen-kit" class="centered-app is-relative mx-auto"  >
          <source src="/assets/video/HomePlanCarouselVideo2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div class="centered-app-overlay" ></div>
        <button
          id="button-video-aythen-kit"
          class="centered-app-button"
          @click="showVideoKit"
        >
          <i class="iconify play" data-icon="feather:play"></i>
          <i class="iconify pause" data-icon="feather:pause"></i>
        </button>
      </div>
          
      <div class="paragraph is-size-7 mt-2">
        {{ $t('textPlanCarrousel_price') }} 
        <a href="/kit+digital">
          {{ $t('textPlanCarrousel_info') }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.active-video video{
  width: 75% !important;
  height: 50% !important;
}
:deep(.hero) {
  overflow: hidden !important;
}

:deep(.hero-body) {
  padding-top: 0px;
  padding-bottom: 2rem !important;
}

.centered-app-wrapper-kit {
  position: relative;
  
  &:where(.active-video.active) {
    height: 100%;
    width: 100vw;
    margin-top: 0 !important;
    z-index: 110 !important;
    position: fixed !important;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
  
  .centered-app {
    position: relative;
    display: block;
    border-radius: 14px;
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
    border-radius: 1em;
    background: var(--card-bg-color);
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 2;
    
  }

  .centered-app-button.active {
    opacity: 0.2;
    background: #000;
    
    .play{
      display: none !important;
    }
    
    .pause{
      margin-right: 4px;
      display: block !important;
    }
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
    
    .pause{
      display: none;
    }

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


.centered-app-wrapper-kit.active {
  &:hover {
    .centered-app-overlay {
      opacity: 0 !important;
    }
  }
}

.is-dark {
  .centered-app-wrapper-kit {
    .centered-app {
      border: none;
    }
  }
}

@media only screen and (max-width: 767px) {
  .centered-app-wrapper-kit {
    .centered-app {
      border-radius: 0.75rem;
    }
  }
}



















.label-footer{
  margin-top: 0px;
  font-size: 12px;
  bottom: -10px;
  position: relative;
}


.box-carousel {
  position: relative;

  .box-carousel-box {
    width: calc(100% - 1rem);
    margin: 0 0.5rem;

    .box-inner {
      border: 1px solid var(--card-border-color);
      border-radius: 0.85rem;
      justify-content: center;
      align-items: center;
      height: 100px;
      max-width: 100px;
      margin: 0 auto;
      padding: 0rem;
      transition: box-shadow 0.3s;
      padding-top: 5px;
      
      .title-inner {
        text-align: center;
      max-width: 100px;
      margin: 4px 6px;
      font-size: 10px;
      text-transform: uppercase;
      font-family: var(--font-main);
      font-weight: 800;
      color: hsl(216deg 67% 51%);
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      position: absolute;
      top: 0px;
      }

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
</style>
