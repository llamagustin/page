<route lang="yaml">
meta:
  layout: default
</route>

<script setup lang="ts">
import {
  creatorFeatures,
  successFeatures,
  featuredCreators,
  textA,
  textB,
  textC,
  textD,
  textE,
  textF,
  textG,
  textH,
  textSocialA,
} from '/@src/texts/reseller'

import { testimonials } from '/@src/texts/assets/testimonials'
import { customerLogos } from '/@src/texts/assets/logos'
import {ref, onBeforeMount, onMounted, computed, onUnmounted} from 'vue'

import { useDarkmode } from '/@src/stores/darkmode'
import ResellerSecondVideo from '/@src/components/web/reseller/ResellerSecondVideo.vue'

const darkmode = useDarkmode()

darkmode.isDark = true

const showVideo = ref(false)
let x = ''

onUnmounted(()=>{
  showVideo.value = false
  document.querySelector('html').style.overflowY = 'scroll'
})

onBeforeMount(()=>{
if(document){
  x = document.cookie.split(";").map(item=>item.trim())
  
  if(x.includes("ended=true")){
    showVideo.value = false
    document.querySelector('html').style.overflowY = 'scroll'
  }
}
})
  let video 
onMounted(() => {

   //video = document.querySelector("#mi-video")
  setTimeout(()=>{
    showVideo.value = true
    //video.play()
  }, 5000)
  
   if(showVideo.value){
     document.querySelector('html').style.overflowY = 'hidden'
   }
});

const endedVideo = ()=>{
  document.cookie = "ended=true"
  showVideo.value = false
  document.querySelector('html').style.overflowY = 'hidden'
}


const showVideoScreen = () => {
  let button = document.querySelector('#button-video-aythenfirst')
  let buttonpause = document.querySelector('#button-video-aythenpause')
  
    document.querySelector('#mi-video').play()
    button.classList.remove('buttonplay')
    buttonpause.classList.add('buttonpause')
    
}

const pauseVideoScreen = () => {
  let button = document.querySelector('#button-video-aythenfirst')
  let buttonpause = document.querySelector('#button-video-aythenpause')
  
    document.querySelector('#mi-video').pause()
    buttonpause.classList.remove('buttonpause')
    button.classList.add('buttonplay')    
}

const newClassVideo = computed(()=>{
    return showVideo.value ? 'buttonpause' : ''
})
</script>

<template>
    <div id="content-container">
      <!--div>
        
            <video id="mi-video" class="first-video" v-show="showVideo" @ended="endedVideo" src="/assets/video/Resellers.mp4" controls autoplay="autoplay" ></video>
            <button
               id="button-video-aythenpause"
               @click="pauseVideoScreen"
               :class="newClassVideo"
              >
             <i class="iconify pause" data-icon="feather:pause"></i>
            </button>
            <button
              id="button-video-aythenfirst"
              :class="showVideo ? buttonpause : ''"
              @click="showVideoScreen"
            >
              <i class="iconify play" data-icon="feather:play"></i>
            </button>
      </div-->
    <!--ResellerHome /-->

    <Section  class="mt-16">
      <Container>
        <SectionTitle :title="$t('textB_title')" :subtitle="$t('textB_subtitle')" />

        <ResellerInfo
          :features="creatorFeatures"
          :columns="3"
          :limit="8"
          size="small"
        />
      </Container>
    </Section>

    <Section  wave="wave-2">
      <Container >
        <ResellerStart 
          :title="$t('textC_title')"
          :cta-text="$t('textC_cta')"
          :cta-link="textC.link"
        />
      </Container>
    </Section>

    <Section class="is-grey">
            
      <!--container with pdfs-->
      <Container>
       <container>
            <!--video class="second-video" src="/assets/video/Resellers.mp4" preload="none" muted autoplay="autoplay"></video-->
        <container class="player-container column is-9 is-relative is-centered-portrait mt-5">
          <!--Player
            source="/assets/video/Resellers.mp4"
            poster="/assets/video/Resellers.mp4"
            title="video"
          /-->
          <ResellerSecondVideo />
        </container>
        </container>
          <Container>
           <ResellerContentBlockB
          
             :title="$t('featuredContent_title')"
             :subtitle="$t('featuredContent_subtitle')"
             :text="featuredCreators.text"
             :images="featuredCreators.images"
              link="index"
          />
         </Container>

        <SectionTitle :title="$t('textD_title')" :subtitle="$t('textD_subtitle')" />
        <!--ResellerFeatures /-->
      </Container>
      
      
      <Container>
        <SideSection
          :subtitle="$t('textE_subtitle')"
          :title="$t('textE_title')"
          :content="$t('textE_content')"
          :cta="textE.cta"
          :to="textE.to"
          image="/assets/illustrations/features/creator-feature-1.png"
          dark-image="/assets/illustrations/features/creator-feature-1-dark.png"
          image-width="800"
          image-height="714"
          blob
        />
      </Container>
      
      <Container>
        <ResellerSection
          :subtitle="$t('textF_subtitle')"
          :title="$t('textF_title')"
          :content="$t('textE_content')"
          :cta="textF.cta"
          :to="textF.to"
          image="/assets/illustrations/features/creator-feature-2.png"
          dark-image="/assets/illustrations/features/creator-feature-2-dark.png"
          image-width="800"
          image-height="714"
          reverse
          blob
        />
      </Container>
    </Section>

    <Section v-if="false" wave="wave-1">
      <Container>
        <ResellerSection
          :subtitle="$t('textG_subtitle')"
          :title="$t('textG_title')"
          :content="textG.content"
          :cta="textG.cta"
          :to="textG.to"
          image="/assets/illustrations/features/creator-feature-3.svg"
          dark-image="/assets/illustrations/features/creator-feature-3-dark.svg"
          image-width="800"
          image-height="714"
        />
      </Container>
    </Section>

    <Section color="grey">
      <Container>
        <SectionTitle :title="$t('textH_title')" :subtitle="$t('textH_subtitle')" />
      </Container>
    </Section>

    <ResellerTestimonials
      :testimonials="testimonials"
      color="grey"
      compact
    />
    
    <Section tongue="tongue-1" >
      <Container>
        <ResellerVideo 
          :title="$t('textA_title')"
          source="/assets/video/Resellers.mp4"
          poster="data:image/gif;base64,replace_with_your_image"
          :features="successFeatures"
          links
        />
      </Container>
    </Section>
  
    <Section v-if="false" color="grey" wave="wave-2" shape-color="footer-dark">
      <Container>
        <ResellerCompanyGrid
          class="-mt-6"
          :title="textSocialA.title"
          :logos="customerLogos"
          :limit="20"
        />
      </Container>
    </Section>
    
   
    <FooterD  />
    
    </div>
</template>



<style lang="scss" scoped>

.first-video {
    position: fixed;
    top: 0px;
    left: 0;
    /*
    min-width: 100%;
    max-width: 100%;*/
    width: 100%;
    height: 100vh;
    z-index: 30;
    object-fit: cover;
    border-radius: 0;
}
.first-video::-webkit-scrollbar {
    width: 0px;
    background-color: transparent;
}

.second-video {
  margin-top: 20px;
}
.buttonplay{
  width: 50px;
  height: 50px;
  margin: auto;
  z-index: 150;
  position: fixed;
  left: 50%;
  bottom: 50%;
  border-radius: 50%;
  background-color: var(--primary);
  color: var(--white-smoke);
  font-weight: bold;
  font-size: 1.2rem;
}

.buttonpause{
  width: 50px;
  height: 50px;
  position: fixed;
  font-size: 1.2rem;
  left: 50%;
  bottom: 50%;
  z-index: 150;
  border-radius: 50%;
}
</style>