<route lang="yaml">
meta:
  layout: demo
  transition: fade-slow
</route>


<script setup lang="ts">
import {
  vulkBenefits,
  textDemo,
  componentFeatures,
  testimonialsA,
  vulkFeatures
} from '/@src/texts/tool/web'

import axios from 'axios'
import { ref, onMounted, watch } from 'vue'
import webTemplateCarousel from './webTemplateCarousel.vue'
import { newTemplateGroups } from '/@src/texts/services/templates/index'

const instance = axios.create({
  baseURL: "https://api.aythen.com",
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
});

const templates = ref([])

onMounted(async ()=>{
  let templateList = await instance.get('/templates').then( res => { return JSON.stringify(res.data) })
  templates.value = JSON.parse(templateList)
})

let showSlide = ref()

watch(templates, ()=>{
    showSlide.value = templates.value 
})

const getCategory = (category) =>{
   const filteredcategories = showSlide.value?.filter(item=>item.category == category)
   return filteredcategories
}
</script>


<template>
  <div>
    <component :is="'style'">
      .color-kit-digital{ fill: #0000ff !important; }
      .button-kit-digital, .custom-toggle input:checked + span span.track .track-knob{
        background: #0000ff !important;
        border-color: #0000ff !important;
      }
    </component>

    <ToolPanel type="web" color="blue"/>
    
    <Section>
      <Container>
        <SectionTitle 
          :title="$t('vulkFeatures_title')"
          :subtitle="$t('vulkFeatures_subtitle')"
        />

        <WebBoxedFeatures :features="vulkFeatures.data" />
        <WebTestimonialsCarouselSingle :testimonials="testimonialsA" />
        <WebBlockH :features="componentFeatures" limit="3" />
      </Container>
      
      <Container class="mt-6">
        <WebBenefits :features="vulkBenefits.data" />
      </Container>
    </Section>
    
    <Section  id="template-components" color="grey">
      <Container class="mt-10">
      <!--WebDemoList /-->
      <container>
           <webTemplateCarousel v-if="false" :slides="showSlide">
                    <template #title>
                      <CollectionTitle :title="'All Templates'" subtitle="Templates" />
                    </template>

           </webTemplateCarousel>
         
         <template v-for="cat in newTemplateGroups">
                    
            <webTemplateCarousel :slides="getCategory(cat)">
                  <template #title>
                        <CollectionTitle :title="getCategory(cat) ? getCategory(cat)[0]?.category : 'all templates'" subtitle="Templates" />
                  </template>
            </webTemplateCarousel>
                    <!--pre>
                      {{getCategory(cat)}}
                    </pre-->
         </template>
      </container>
      </Container>
    </Section>
    <FooterD color="default" />
  </div>
</template>


