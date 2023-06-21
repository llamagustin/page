<script setup lang="ts">
import { usePageInformation } from "/@src/components/web/ai/pages/usePageInformation"
import { services } from '/@src/texts/ai/flow'
import { ref, defineEmits, watch } from 'vue'
import componentGPT from '/@src/components/web/ai/componentGPT.vue'
import trendGPT from '/@src/components/web/ai/trendGPT.vue'

import { dataComponentGPT } from '../dataComponentGpt.ts'
import { dataTrendGPT } from '../dataTrendGpt.ts'

interface Emits {
  (e: 'changePage', value): void;
}

const emit = defineEmits<Emits>()

const { promptsFiltered, filters } = usePageInformation();

const changePage = (index) => {
  emit('changePage', index)
}

function setFilter(nameService) {
  nameService = nameService.toLowerCase()
  if(filters.value.service == nameService)
    filters.value.service = ''
  else
    filters.value.service = nameService
}

</script>

<template>
  <div>
    <div class="carousel">
      <div v-for="(category, index) in dataTrendGPT">
        <trendGPT  @click="emit('changePage', 4)"/>
      </div>
    </div>
    
    <infoGPT
      title="Ready To Go?" 
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis est tam dissimile?" 
      cta-primary="Nuevo prompt" 
      cta-secondary="Ajustes" 
      :logos="customerLogos2"
      class="mt-4"
      @change-page="changePage"
      boxed shapes animated
    />
    
    <div class="tags-tool">
      <div style="gap: 8px;" class="p-1" v-for="(service, index) in services">
        <Tag
          :style="{ 
            color: service.iconColor,
            borderColor: service.iconColor,
          }"
          class="px-2 tag-select"
          :class="{ 'box-shadow': service.title.toLowerCase() == filters.service }"
          color="primary"
          outlined
          @click="setFilter(service.title)"
        >
          <div class="tag-service">
            <IconService
              :color="service.iconColor"
              size="small"
            >
              <i
                class="iconify"
                :data-icon="service.icon"
              ></i>
            </IconService>
            {{service.title}}
          </div>
        </Tag>
      </div>
    </div>
    <div class="mt-4 gpt">
      <div v-for="(item, index) in promptsFiltered">
        <componentGPT :prompt="item" @click="emit('changePage', 4)" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .box-shadow {
    box-shadow: inset 0 0 0.4em !important;
  }
  .tag-select {
    cursor: pointer;
    transition: scale 300ms ease;
    &:hover {
      scale: 1.1;
    }
  }
  .carousel{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
  }
  
  .tags-tool{
    overflow-x: scroll;
    display: flex;
    gap: 20px;
    margin: 8px 0px;
    
    small{
      line-height: 24px;
      font-size: 16px;
      padding: 4px 20px;
    }
  }
  
  .tags-tool::-webkit-scrollbar {
    display: none;
  }
  
  .left{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .gpt{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

  }
  
  .icon-prompts{
    width: 24px;
    min-width: 24px;
    height: 24px;
  }


.flow-business{
  .logo{
    width: 70px;
    height: 70px;
    border-radius: 6px;
  }
}


.tag-service{
  display: flex;
  gap: 8px;
  text-transform: uppercase;
  
  .icon-box{
    width: 20px;
    height: 20px;
    min-width: 20px;
    justify-content: center;
  }
}




@media only screen and (max-width: 900px) {
  .carousel{
    grid-template-columns: 1fr;
    
    >:nth-child(3){
      display: none;
    }
  }
  
  .gpt{
    display: grid;
    grid-template-columns: 1fr;
  }
}


@media only screen and (max-width: 1150px) {
  .carousel{
    grid-template-columns: 1fr 1fr;
    
    >:nth-child(3){
      display: none;
    }
  }
}
</style>