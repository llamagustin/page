<script setup lang="ts">
import {ref,defineEmits} from 'vue'
import { CooworkingMegamenu } from '/@src/texts/dashboard'

const emit = defineEmits(['close'])

const description=ref(CooworkingMegamenu.subtitle)
const setDescription= val=>{
  description.value=val 
}
</script>

<template>
  <div class="megamenu-inner">
    
    <Container>
      <div class="columns is-mobile">
        <div class="column is-3 ">
          <div class="megamenu-block ml-2">
            <h4>{{$t('web-soft')}} </h4>
            <ul
              v-for="(link, to) in CooworkingMegamenu.data[0].data.slice(0, 4)"
              :key="link.title"
            >
              <li>
                <RouterLink @mouseover="setDescription($t(link.title+'_resume'))" v-preload-link :to="link.to" class="list-link">
                  {{$t(link.title)}} 
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="column is-3">
          <div class="megamenu-block is-left-bordered">
            <h4>{{$t('design-media') }}</h4>
            <ul
              v-for="(link, to) in CooworkingMegamenu.data[1].data.slice(0, 4)"
              :key="link.title"
            >
              <li>
                <RouterLink @mouseover="setDescription($t(link.title+'_resume'))" v-preload-link :to="link.to" class="list-link">
                  {{$t(link.title)}}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="column is-3">
          <div class="megamenu-block is-left-bordered">
            <h4>{{$t('data-entry')}}</h4>
            <ul
              v-for="(link, to) in CooworkingMegamenu.data[3].data.slice(0, 4)"
              :key="link.title"
            >
              <li>
                <RouterLink @mouseover="setDescription($t(link.title+'_resume'))" v-preload-link :to="link.to" class="list-link">
                  {{$t(link.title)}}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="column is-3 ml-auto">
          <div class="megamenu-block is-left-bordered">
            <div class="media">
          
              <div class="media-content">
                <div class="media-left is-company flex mr-2">
                <span class="iconify" data-icon="heroicons-solid:briefcase" data-inline="false" ></span>
                <h3 class="ml-2">{{ CooworkingMegamenu.title }}</h3>
              </div>
                <p>
                  {{description}}
                </p>
                <Button
                  v-preload-link
                  :to="CooworkingMegamenu.button[0].link"
                  target="_blank"
                  class="link-href"
                >
                  <span>{{ CooworkingMegamenu.button[0].label }}</span>
                  <i
                    class="ml-2 iconify"
                    data-icon="feather:arrow-right"
                    data-inline="false"
                  ></i>
                </Button>
                <Button
                  v-preload-link
                  :to="CooworkingMegamenu.button[1].link"
                  target="_blank"
                  class="link-href ml-4"
                >
                  <span>{{ CooworkingMegamenu.button[1].label }}</span>
                  <i
                    class="ml-2 iconify"
                    data-icon="feather:arrow-right"
                    data-inline="false"
                  ></i>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
    <button class="close-button" @click="emit('close')">
      <i class="iconify" data-icon="feather:arrow-left"></i>
    </button>
  </div>
</template>


<style>
.link-href {
  border: none;
  padding: 0px;
  background: transparent !important;
  color: #0000ff !important;
}
</style>