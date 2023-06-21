<script setup lang="ts">
import { textHeroD } from '/@src/texts/home'

import { customerLogos } from '/@src/data/pages/logos'
import {onMounted} from 'vue'

import dataApis from './api.json'

const blocksroute = [
  {blocks: '/blocks'}
  ]
</script>

<template>
  <Hero alignment="center" size="fullheight" class="therest">
    <template #body>
      <div class="columns is-vcentered pt-8">
        <div class="column is-relative">
          <div class="mx-auto max-w-6 mb-4">
            <Title tag="h1" :size="1" weight="bold">
              <span style="color:var(--title-color)">
                
                {{ textHeroD.title[0] }} 
                <span class="text-primary">
                  
                  {{ textHeroD.title[1] }}
                </span>
              </span>
            </Title>
            <Subtitle
              tag="p"
              :size="5"
              weight="thin"
              class="mx-auto max-w-6 b-centered-tablet-p pt-2"
            >
              {{ textHeroD.subtitle }}
            </Subtitle>
          </div>
        </div>
      </div>
    </template>
    <!-- inicia aqui  -->
    <template #footer :style="{ marginTop: '-50px' }">
      <div class="max-4xl mx-auto mt-20 relative overflow-hidden" style="z-index: 1" >
        <div api-list :style="{ display: 'flex', flexDirection: 'column', gap: '4px' }" >
          <ul
            v-for="(apis, index) in dataApis"
            :key="index"
            :style="{ display: 'flex' }"
          >
            <li v-for="api in apis" :key="api.text" >
              <a :href="blocksroute[0].blocks" target="_blank">
                <tag class="tag-item m-1 " color="solid" shape="rounded" elevated >
                  <img class="img-api" :src="api.image" />
                  <span class="ml-5 whitespace-nowrap" >{{ api.text }}</span>
                </tag>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </template>
    <!-- acaba aqui  -->
  </Hero>
</template>


<style lang="scss" scoped>
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

<style>
.therest{
  margin-top: -150px!important;
  margin-bottom: 50px;
  z-index: -1;
}
.tag-item{
  height: 40px !important;
  padding-top: 8px;
}

[api-list] ul:nth-child(1) {
  margin-left: 100px;
  animation: api-animate 100s linear infinite;
}
[api-list] ul:nth-child(2) {
  margin-left: -100px;
  animation: api-animate 200s linear infinite;
}

[api-list] ul:nth-child(3) {
  margin-left: 20px;
  animation: api-animate 300s linear infinite;
}

[api-list] ul:nth-child(4) {
  margin-left: -200px;
  animation: api-animate 400s linear infinite;
}

[api-list] ul:nth-child(5) {
  margin-left: 0px;
  animation: api-animate 200s linear infinite;
}

[api-list] .api-item {
  border: 1px solid #cecece;
  border-radius: 26px;
  padding: 8px 8px;
  background: #fff;
  font-size: 14px;
  font-weight: 600;
  color: #5d5d5d;
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 2px 6px;
  cursor: pointer;
  flex: none;
}

[api-list] .api-item a{
    color: unset;
    display: flex;
    justify-content: center;
    gap: 5px;
}

[api-list] .img-api {
  position: absolute;
  height: 18px;
}

@keyframes api-animate {
  0% {
    margin-left: 0px;
  }
  100% {
    margin-left: -1000px;
  }
}
</style>