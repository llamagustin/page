<script setup lang="ts">
import {ref} from 'vue'
import { EditorMegamenu } from '/@src/texts/dashboard'

const emit = defineEmits(['close'])

const description=ref(EditorMegamenu.subtitle)
const setDescription= val=>{
  description.value=val 
}
</script>

<template>
  <div class="megamenu-inner">
    <Container class="pt-2">
      <div class="columns is-mobile">
        <div class="column">
          <div class="megamenu-block">
            <div class="media">
              <div class="media-content">
                <h3>{{ EditorMegamenu.title_1 }}</h3>
                <p>
                  {{ $t('api_description') }} 
                </p>
                <a href="/ai" class="link-href">
                  <span>{{ EditorMegamenu.link_1 }}</span>
                  <i
                    class="iconify"
                    data-icon="feather:arrow-right"
                    data-inline="false"
                  ></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="megamenu-block is-left-bordered ml-6">
            <h4>{{ $t('components') }}</h4>
            <ul
              v-for="(link, to) in EditorMegamenu.data1.slice(0, 5)"
              :key="link.title"
            >
              <li>
                <RouterLink @mouseover="setDescription($t(link.title.toLowerCase()+'-resume'))" v-preload-link :to="link.to" class="list-link">
                  {{$t(link.title) }}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="column">
          <div class="megamenu-block">
            <h4>{{$t('Ai module')}}</h4>
            <ul v-for="(link, to) in EditorMegamenu.data1.slice(5, 9)">
              <li>
                <RouterLink @mouseover="setDescription($t(link.title.toLowerCase()+'_resume'))" v-preload-link :to="link.to" class="list-link">
                  {{$t(link.title)}} 
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="column is-4">
          <div class="megamenu-block is-left-bordered">
            <div class="media">
              <div class="media-content">
                <div class="media-left is-bolt flex mr-2">
                <span class="iconify" data-icon="heroicons-solid:lightning-bolt" data-inline="false" ></span>
                <h3 class="ml-2">{{ EditorMegamenu.title }}</h3>
              </div>
                
                <p>
                
                  {{description}}
                </p>
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