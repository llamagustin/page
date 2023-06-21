<script setup lang="ts">
import { Carousel, Slide, Navigation} from 'vue3-carousel'
import type { Nft } from '/@src/types'
import  ProfileCard   from '/@src/components/web/freelancer/ProfileCard.vue'
import {ref, watch, onUpdated} from 'vue'

export interface NftCarouselProps {
  slides: Nft[]
  pulled?: boolean
  profiles:[]
}

const props = withDefaults(defineProps<NftCarouselProps>(), {
  slides: () => [],
  inverted: false,
  profiles:[],
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

/*
let loadSpinnerSearch = ref('')
let loadSpinner = ref(false)

onUpdated(()=>{
  if(window != undefined){
     loadSpinnerSearch.value = window.location.search
  }
})

watch(loadSpinnerSearch, ()=>{
    loadSpinner.value = true
    if(props.profiles.length != 0){
     loadSpinner.value = false  
  }
})*/


</script>

<template>
  <div class="py-6">
    
    <div v-if="false" class="nft-carousel">
      <slot name="title"></slot>

      <div class="carousel-wrapper">
        
        
        <!-- 
         <carousel :items-to-show="1" :breakpoints="breakpoints">
          
          <slide v-for="(profile, index) in props.profiles" :key="index">
            <div class="slide-container">
             <ProfileCard :profile="profile" flat /> 
            </div>
          </slide>

          <template #addons>
            <navigation />
          </template>
        </carousel>
        
        
        <carousel :items-to-show="1" :breakpoints="breakpoints">
          


          <template #addons>
            <navigation />
          </template>
        </carousel>
        -->
      </div>
    
    </div>

      <!--pre>
        {{props.profiles.length}}
      </pre-->      
<div v-if="props.profiles.length == 0" class="is-flex loader-container">
  <div>
    <div class="skeleton-width skeleton"></div>
    <div class="skeleton-content skeleton"></div>
    <div class="skeleton-content skeleton"></div>
    <div class="skeleton-content skeleton"></div>
    <div class="skeleton-stars skeleton"></div>
    <div class="skeleton-quantity skeleton"></div>
  </div>
    <div>
    <div class="skeleton-width skeleton"></div>
    <div class="skeleton-content skeleton"></div>
    <div class="skeleton-content skeleton"></div>
    <div class="skeleton-content skeleton"></div>
    <div class="skeleton-stars skeleton"></div>
    <div class="skeleton-quantity skeleton"></div>
  </div>
    <div>
    <div class="skeleton-width skeleton"></div>
    <div class="skeleton-content skeleton"></div>
    <div class="skeleton-content skeleton"></div>
    <div class="skeleton-content skeleton"></div>
    <div class="skeleton-stars skeleton"></div>
    <div class="skeleton-quantity skeleton"></div>
  </div>
    <div>
    <div class="skeleton-width skeleton"></div>
    <div class="skeleton-content skeleton"></div>
    <div class="skeleton-content skeleton"></div>
    <div class="skeleton-content skeleton"></div>
    <div class="skeleton-stars skeleton"></div>
    <div class="skeleton-quantity skeleton"></div>
  </div>
</div>  
    

    <div class="columns is-multiline" >
      <div v-for="(profile, index) in props.profiles" :key="index" class="column is-3">
         <ProfileCard :profile="profile" flat /> 
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nft-carousel {
  position: relative;

  :deep(.collection-title) {
    margin-bottom: 1.5rem;
  }

  .carousel-wrapper {
    position: relative;

    .slide-container {
      padding: 0 0.5rem;
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


.skeleton-width{
  width: 230px;
  height: 230px;
  border-radius: 20px;
}
.skeleton-content{
  margin-top: 20px;
  margin-left: 15px;
  width: 200px;
  height: 20px;
  margin-bottom: 8px;
}
.skeleton-stars{
  margin-top: 20px;
  margin-left: 15px;
  width: 150px;
  height: 20px;
}
.skeleton-quantity{
  margin-top: 20px;
  margin-left: 15px;
  width: 150px;
  height: 20px;
}
.loader-container{
  gap: 60px;
  flex: 1;
  flex-wrap: wrap;
}
.skeleton{
    animation: skeleton-loading 1s linear infinite alternate;  
}

@keyframes skeleton-loading {
  0%{
    background-color: hsl(200, 20%, 70%);
  }
  100%{
    background-color: hsl(200, 20%, 95%);
  }
}

</style>
