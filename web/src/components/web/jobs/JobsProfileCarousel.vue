
<script setup lang='ts'>
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { useFreelancerListStore } from '/@src/components/web/freelancer/useFreelancerListStore.ts'
import {onMounted,ref} from 'vue'
const Store=useFreelancerListStore();

const profiles = ref([])

onMounted(async ()=>{
    let qr=await Store.fetchFreelancers('').then(res=> res.data);
      qr = qr.map((profile)=>{
       return {
           avatar:profile.avatar,
           fullname:profile.fullname,
           subcategory:profile.subcategory,
       }
   })
   
   profiles.value=qr;
})

const  settings = { itemsToShow: 1, snapAlign: 'center', }

const breakpoints = {
      700: { itemsToShow: 3.5, snapAlign: 'center' },
      1024: { itemsToShow: 5, snapAlign: 'start' },
    }


</script>

<template>
    <div>
      <Carousel :autoplay="200" :transition="3000" :wrap-around="true" v-bind="settings" :breakpoints="breakpoints">
        <Slide v-for="slide in profiles" :key="slide">
              <!--<div class="carousel__item">-->
              <!--  <div>-->
              <!--    <div>-->
              <!--        <img  :src="slide.avatar" />-->
              <!--    </div>-->
              <!--    <div class="profile">-->
              <!--      <div> {{ slide.fullname }}</div>-->
              <!--      <div>{{slide.subcategory}}</div>-->
              <!--    </div>-->
              <!--  </div>-->
              <!--</div>-->
          
          <div class="card">
            <div class="card-image">
              <img
                :src="slide.avatar"
                alt="Team member image"
                @error.once="
                  (event) => viaPlaceholderErrorHandler(event, '500x333')
                "
              />
            </div>
            <div class="card-content">
              <div class="media is-align-items-center">
                <div class="media-content">
                  <Title tag="h3" :size="7" weight="semi" narrow>
                    <span>{{ slide.fullname }}</span>
                  </Title>
                  <p class="paragraph rem-85">{{ slide.subcategory }}</p>
                </div>
                <div class="media-right">
                  links social
                    <RouterLink
                      v-for="(link, i) in item.socialLinks"
                      :key="i"
                      :to="link.url"
                      target="_blank"
                      class="px-1"
                    >
                      <i class="iconify" :data-icon="link.icon"></i>
                      <span class="is-sr-only">{{ link.name }}</span>
                    </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </Slide>
    
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
      
    </div>
</template>

<style type="text/css">
.carousel__item {
  min-height: 280px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  -justify-content: center;
  -align-items: center;
  
}
.carousel__slide {
  padding: 10px;
  height:400px;
}

.profile{
    width: 85%;
    max-width: 95%;
    background-color: #f8f4f0;
    color:blue;
    font-size: 14px;
    border-radius: 5px;
    padding: 10px 5px;
    position: absolute;
    bottom: 75px;
    margin-left: 3.5%
}
</style>