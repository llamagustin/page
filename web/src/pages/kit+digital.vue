<route lang="yaml">
meta:
  layout: demo
  transition: fade-slow
</route>

       <!--/www/web/src/components/web/kit+digital/KitCirclesComponent.vue-->
<script setup lang="ts">
import {ref} from 'vue'
import { 
  productStacks, 
  vulkFeatures, 
  textVideo,
  textFaq,
  faq
} from '/@src/texts/kit+digital'


const openInstagram = () => {
  var url = 'https://www.instagram.com/aythen.eu/'
  window.open(url)
}

const openWhatsapp = () => {
  var message = 'Hello Whatsapp'
  var number = '+34631831383'

  var url =
    'https://api.whatsapp.com/send?text=' +
    encodeURIComponent(message) +
    '&phone=' +
    encodeURIComponent(number)

  window.open(url)
}


var arr = [
  'carpentry',
  'ceramics',
  'clothing',
  'hairdressing',
  'pizza',
  'repair',
  'tatto',
]
const videoLoad =
  '/assets/video/kit+digital/' +
  arr[Math.floor(Math.random() * arr.length)] +
  '.mp4'
</script>


<template>
  <div>
    <section  class="kitsection kit-container section-container">
       <Container >
         
         <div class="kitPicture">
           <SectionTitle class="pt-5" :title="$t('steps_title')" />  
           <KitCirclesComponent  :images="productStacks.images" />
         </div>
         
         <Section  class="kitsection kit-container mt-5 mb-0 pb-0">
           <Container>
             <SectionTitle :title="$t('textFaqs_title')" :subtitle="$t('textFaqs_subtitle')" />
              <KitFaq  :left="faq.left" :right="faq.right" chevrons />
            </Container>
        </Section>
      </Container>
    </section>


    <Section wave="wave-1" shape-color="white" class="kitsection kit-container pt-0">
      <Container>
        <SectionTitle :title="$t('video_title')" :subtitle="$t('video_subtitle')" />
        
        <br />  
        <div class="video-player-container-wrapper pb-6">
        
          <video id="video-aythen" controls>
            <source :src="videoLoad" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
    
        </div>
        <ButtonSupport />
      </Container>
    </Section>
    
    <container>
        <KitHome
          :title="$t('productStacks_title')"
          :subtitle="$t('productStacks_subtitle')"
          :text="productStacks.text"
          :images="productStacks.images"
        />
    </container> 
    
    <Section > 
         <KitServicesSlider />
    </Section>
    

    <FooterD color="light" />
  </div>
</template>

<style type="text/css">
.kitPicture{ 
    -background-image: url('/assets/kit+digital/steps.png'); 
}
  .section-container{
   margin-top: 75px;
}
  .kitsection.kit-container{
    background-color: var(--section-bg-color-grey);
  }
  .is-dark.kitsection.kit-container{
    background-color: var(--night-light-1);
  } 
  .section-wave{
    margin-top: 120px;
  }
</style>


