<script setup lang="ts">
import { textHeroD } from '/@src/texts/home'

import { customerLogos } from '/@src/data/pages/logos'
import {onMounted} from 'vue'

import dataApis from './api.json'

const blocksroute = [
  {blocks: '/blocks'}
  ]

const showVideo = () => {
  var button = document.querySelector('#button-video-aythen')
  var wrapper = document.querySelector('.centered-app-wrapper')

  if (button.classList.contains('active')) {
    button.classList.remove('active')
    wrapper.classList.remove('active')
    
    document.querySelector('#video-aythen').pause()
  } else {
    button.classList.add('active')
    wrapper.classList.add('active')
    
    document.querySelector('#video-aythen').play()
  }
}
</script>
<template>
  <div class="ui-mockup is-chart">
    <div class="centered-app-wrapper mx-auto max-w-8"  >
      <video id="video-aythen" class="centered-app is-relative mx-auto max-w-8" poster="/assets/images/homevideo.png" >
        <source src="/assets/video/HomeVideo.mp4" type="video/mp4" />
        <!--/assets/video/kit+digital.mp4 -->
        Your browser does not support the video tag.
      </video>
      <div  class="centered-app-overlay"></div>
      <button
        id="button-video-aythen"
        class="centered-app-button"
        @click="showVideo"
      >
        <i class="iconify play" data-icon="feather:play"></i>
        <i class="iconify pause" data-icon="feather:pause"></i>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.active:nth-child(1) {
  position: fixed!important;
  width: 100vw!important;
  transform: translateY(-50%)!important;
  transform: translateX(-50%)!important;
  top: 10%!important;
  left: 0;
  margin-top: -50%;
}

.active video{
  width: 100%!important;
  z-index: 100;
}
:deep(.hero) {
  overflow: hidden !important;
}

:deep(.hero-body) {
  padding-top: 0px;
  padding-bottom: 2rem !important;
}

:deep(.hero-foot){
    margin-top: -250px;
    z-index: 0;
}

.ui-mockup {
  background: none!important;
  border: none!important;
  box-shadow: none!important;
}

.centered-app-wrapper {
  position: relative;

  .centered-app {
    position: relative;
    display: block;
    border-radius: 2rem;
    border: 1px solid var(--border);
    
    z-index: 1;
  }
  .centered-app-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 2rem;
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


.centered-app-wrapper.active {
  &:hover {
    .centered-app-overlay {
      opacity: 0 !important;
    }
  }
}

.is-dark {
  .centered-app-wrapper {
    .centered-app {
      border: none;
    }
  }
}

@media only screen and (max-width: 767px) {
  .centered-app-wrapper {
    .centered-app {
      border-radius: 0.75rem;
    }
  }
}
</style>