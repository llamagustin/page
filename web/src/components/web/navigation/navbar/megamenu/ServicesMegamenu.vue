<script setup lang="ts">
import {ref, defineEmits} from 'vue'
import { ServicesMegamenu } from '/@src/texts/dashboard'

const emit = defineEmits(['close'])

const description=ref(ServicesMegamenu.subtitle)
const setDescription= val=>{
  description.value=val 
}

</script>

<template>
  <div class="megamenu-inner">
    <Container >
      <div class="columns is-mobile">
        <div class="column ">
          <div class="megamenu-block is-4 ml-2">
            <ul v-for="(link, index) in ServicesMegamenu.data.slice(0, 3)" :key="index" >
              <li>
                <RouterLink @mouseover="setDescription($t(link.tag+'_resume'))" v-preload-link :to="link.to" class="list-link">
                  <div>
                    <IconService :color="link.iconColor" :size="small" >
                      <i class="iconify icon-service" :data-icon="link.icon" ></i>
                    </IconService>
                  </div>
                  <div>
                    <b> {{ link.title }}  </b>
                    <p> {{$t(link.tag) }}  </p>
                  </div>
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="column ">
          <div class="megamenu-block is-4 ml-2">
            <ul
              v-for="(link, index) in ServicesMegamenu.data.slice(3)"
              :key="index"
            >
              <li>
                <RouterLink @mouseover="setDescription($t(link.tag+'_resume'))" v-preload-link :to="link.to" class="list-link">
                    <div>
                      <IconService
                        :color="link.iconColor"
                      >
                        <i
                          class="iconify icon-service"
                          :data-icon="link.icon"
                        ></i>
                      </IconService>
                    </div>
                    <div>
                      <b>
                        {{ link.title }}
                      </b>
                      <p>
                        {{$t(link.tag)}} 
                      </p>
                    </div>
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="column is-4">
          <div class="megamenu-block is-left-bordered">
            <div class="media">
              <div class="media-content">
                <div class="media-left is-bolt flex ">
                <span class="iconify" data-icon="heroicons-solid:lightning-bolt" data-inline="false" ></span>
                <h3 class="ml-3">{{ ServicesMegamenu.title }}</h3>
              </div>
                
                <p>
                  {{description}}
                </p>
                <Button
                  v-preload-link
                  :href="ServicesMegamenu.button.link"
                  target="_blank"
                  class="link-href"
                >
                  <span>{{ ServicesMegamenu.button.label }}</span>
                  <i
                    class="iconify"
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


<style scoped lang="scss">
.close-button{
  z-index:0;
}
.close-button:hover{
  background-color: red;
}
.link-href {
  border: none;
  padding: 0px;
  background: transparent !important;
  color: #0000ff !important;
  
}

.list-link{
  display: flex !important;
  gap: 14px;
  align-items: center;
  margin-bottom: 14px !important;
  
  p{
    margin-top: -4px;
  }
  
  
  .icon-service{
    width: 30px !important;
    height: 30px !important;
    margin-right: 6px !important;
  }
}

@media only screen and (max-width: 767px) {
  .list-link{
    margin-bottom: 2px !important;
    gap:5px;
  }
  .megamenu-block{
    margin-left: 0px !important;
    display: grid;
    gap: 20px;
  }
  
  .columns{
    grid-template-columns: 1fr !important;
  }
}


</style>