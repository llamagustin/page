<script setup lang="ts">
import { textHeroD } from '/@src/texts/home'

import { customerLogos } from '/@src/data/pages/logos'
import {onMounted} from 'vue'


const showVideo = () => {
  var button = document.querySelector('#button-video-aythen')
  var wrapper = document.querySelector('.centered-app-wrapper')
  let videoshow = document.querySelector('.centered-app')
  
  if (button.classList.contains('active')) {
    button.classList.remove('active')
    wrapper.classList.remove('active')
    videoshow.classList.remove('active')
    
    document.querySelector('#video-aythen').pause()
    document.querySelector('html').style.overflowY = 'scroll'
  } else {
    button.classList.add('active')
    wrapper.classList.add('active')
    videoshow.classList.add('active')
    document.querySelector('html').style.overflowY = 'hidden'
    document.querySelector('#video-aythen').play()
  }
}

const handlevideo = ()=>{
  var button = document.querySelector('#button-video-aythen')
  var wrapper = document.querySelector('.centered-app-wrapper')
  let videoshow = document.querySelector('.centered-app')
  
  button.classList.remove('active')
  wrapper.classList.remove('active')
  videoshow.classList.remove('active')
}

onMounted(() => {
  document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    showVideo()
  }
});
  
})
</script>
  <template>
    <div class="centered-app-wrapper mx-auto mt-6">
      <video id="video-aythen" class="centered-app mx-auto" @ended="handlevideo" >
        <source src="/assets/video/Resellers.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div class="centered-app-overlay"></div>
        <button id="button-video-aythen" class="centered-app-button" @click="showVideo" >
            <i class="iconify play" data-icon="feather:play"></i>
            <i class="iconify pause" data-icon="feather:pause"></i>
          </button>
        </div>
</template>


<style lang="scss" scoped>
.video-container{
  background-color: var(--section-bg-color-grey);
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
    max-width: 100%;
    /*max-height: 100%;*/
    width: 58px;
    height: 58px;
    border-radius: 50%;
    z-index: 100;
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

.centered-app.active{
  border-radius: 0;
  border: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99;
}
.centered-app-wrapper.active{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  border: none;
  border-radius: 0;
  z-index: 99;
   
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
