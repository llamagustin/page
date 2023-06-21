<script setup lang="ts">
import type, { SimpleFeature } from '/@src/types'
import {ref, watch} from 'vue'

export interface VideoBlockAProps {
  title: string
  features: SimpleFeature[]
  source: string
  poster: string
  links?: boolean
}

const props = withDefaults(defineProps<VideoBlockAProps>(), {
  links: false,
})

const activeTab = ref(`tab1`)
const srcPdfList = ref([
    "/assets/docs/Resellers.pdf",
    "/assets/docs/KitDigital-Información.pdf",
    "/assets/docs/Resellers.pdf",
    "/assets/docs/KitDigital-Información.pdf",
  ])
  
watch(activeTab, ()=>{
  console.log(activeTab.value)
})

let indice = ref(0)

function handleClick(index){
  activeTab.value = `tab${index + 1}`
  indice.value = index
}
</script>

<template>
  <div class="py-6">
    <div class="columns is-vcentered b-center-tablet-p">
      
      <div class="column is-6">
        <Title tag="h2" :size="3" weight="bold">
          <span>{{ props.title }}</span>
        </Title>

        <div class="containerpdf-texts is-flex is-multiline b-columns-half-tablet-p">
          <Card animated
            v-for="(feature, index) in props.features.slice(0, 4)"
            :key="index"
            class="column is-6 m-2"
          >
            <div class="py-2 medium:py-4">
              <Title tag="h3" :size="6" weight="semi" leading>
                <span>{{ $t('succesFeatures_title'+index) }}</span>
              </Title>
              <p class="paragraph max-w-3 rem-95">{{ $t('succesFeatures_text'+index) }}</p>
             
             
              <!--ActionLink
                v-if="props.links"
                :link="feature.link"
                size="small"
              />
              <a
                 class="tab-item"
                 :class="activeTab === `tab${index + 1}` && 'is-active'"
                 :href="srcPdfList[index]"
                 target="_blank"
                 @keydown.space.prevent="() => (activeTab = `tab${index + 1}`)"
               >
                 {{$t('reseller_link')}}
               </a -->
              
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.centered-tabbed-section {
  position: relative;
  max-width: 780px;
  margin: 0 auto;

  .section-tabs {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 580px;
    margin: 0 auto 2rem;

    .tab-item {
      font-family: var(--font);
      border: 2px solid var(--button-base-border-color);
      background: var(--button-base-bg-color);
      color: var(--button-base-color);
      border-radius: 0.5rem;
      height: 54px;
      min-width: 210px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 1rem;
      width: calc(33.3% - 2rem);

      &.is-active {
        border-color: var(--primary);
        color: var(--primary);
      }
    }
  }

  .tab-outer {
    .tab-inner {
      img {
        display: block;
        width: 100%;
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .containerpdf-texts{
    flex-direction: column;
    align-items: center;
  } 
  .centered-tabbed-section {
    .section-tabs {
      flex-direction: column;

      .tab-item:not(:last-child) {
        margin-bottom: 0.75rem;
      }
    }
  }
}
</style>
