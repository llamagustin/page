<script setup lang="ts">
import axios from '@axios';
const instance = axios.create({
  baseURL: "https://api.aythen.com",
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
});



import AppKitDigital from '@/views/apps/kitdigital/AppKitDigital.vue'

import laptopGirl from '@/assets/images/illustrations/laptop-girl.png'
//import {tools} from '../.././@fake-db/tools.ts';



const selectedTool = ref()
const tools = ref(JSON.parse(localStorage.dataTools) || [])
const boe = ref([]); //...tools[5].boe


const tabHelp = ref('a')
const tabArticle = ref('basis')



const changeTool = (val) => {
  selectedTool.value = tools.value.find(item => item.tag === val)
  boe.value = selectedTool.value.boe
  
  tabHelp.value = selectedTool.value.tag

}
</script>

<template>
  <VCard class="pt-6">
    <VCardText class="pt-12 mb-16 pb-16">
      <!-- 👉 App Pricing components -->
      <VRow>
        <VCol
          cols="12"
          class="mx-auto"
        >
          <AppKitDigital md="3"
            @selected="changeTool"
            :selected="selectedTool"
            :tools="tools"
          />
        </VCol>
      </VRow>
    </VCardText>

    <!-- 👉 Free trial Banner -->
    <VRow class="page-pricing-free-trial-banner-bg">
      <VCol
        cols="12"
        md="10"
        class="d-flex align-center flex-md-row flex-column position-relative mx-auto"
      >
        <div class="text-center text-md-start py-10 px-10 px-sm-0">
          <!--text-primary-->
          <h2 class="text-h6 font-weight-bold mb-2">
            ¿Todavía no está convencido?
          </h2>
          <h1> ¡Obtén más informción!</h1>
          <p class="text-sm">
            Descubre todo lo que necesitas saber sobre nuestro Kit Digital
          </p>
          <VBtn 
            :to="{
              name: 'help-center-help-article',
              params: { help: tabHelp, article: tabArticle },
            }"
            class="mt-4">
            Nuestra guia
          </VBtn>
        </div>

        <div class="ml-2 free-trial-illustrator">
          <VImg
            :src="laptopGirl"
            :width="230"
          />
        </div>
      </VCol>
    </VRow>

    <!-- 👉 Plans -->

    <!-- 👉 Features & Tables -->

    <!-- 👉 BOE -->
    <div>
      <VCardText class="bg-var-theme-background py-16">
        

        <VExpansionPanels class="py-6 px-6">
          <VExpansionPanel
            v-for="item in boe"
            :key="item.title"
            :title="item.title"
            :text="item.content"
          />
        </VExpansionPanels>
      </VCardText>
    </div>
  </VCard>
</template>

<style lang="scss">
.page-pricing-free-trial-banner-bg {
  /* stylelint-disable-next-line color-function-notation */
  background-color: rgba(var(--v-theme-primary), var(--v-selected-opacity));
}

@media screen and (min-width: 960px) {
  .free-trial-illustrator {
    position: absolute;
    inset-block-end: 0;
    inset-inline-end: 10%;
  }
}

@media screen and (max-width: 959px) {
  .free-trial-illustrator {
    position: relative;
    inset-block-end: -11px;
  }
}
</style>
