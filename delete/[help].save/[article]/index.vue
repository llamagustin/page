<script setup lang="ts">
import { useRoute } from 'vue-router'
import axios from '@axios'

// import type { HelpCenterCategoriesType } from '@/@fake-db/types'

const route = useRoute()

const help = ref()
const article = ref()
const subarticle = ref()
const resume = ref()

const activeTab = ref('')

import { data_help } from '@/@fake-db/pages/data'


const fetchHelpCenterCategoriesData = () => {
  // console.log('dd', data_help)
  // return axios.get('/pages/help-center/subcategory', {
  //   params: {
  //     category: route.params.category,
  //     subcategory: route.params.subcategory,
  //   },
  // }).then(res => {
  //   apiData.value = res.data.data
  //   activeTab.value = res.data.activeTab
  // })
  
  
  help.value = data_help.find(x => x.link == route.params.help)

  if(help.value){
      article.value = help.value.articles.find(x => x.link == route.params.article)
      if(article.value){
        subarticle.value = article.value.subarticles.find(x => x.link == route.params.subarticle)
          
      }
  }
  
  
}

watch(activeTab, fetchHelpCenterCategoriesData, { immediate: true })
</script>

<template>
  
  <VRow >
    <VCol
      v-if="true"
      cols="12"
      md="4"
    >
      <VBtn
        variant="tonal"
        :to="{ name: 'help-center' }"
      >
        <VIcon
          icon="tabler-chevron-left"
          class="flip-in-rtl"
        />
        <span>Back to help</span>
      </VBtn>
      
      <h6 class="text-base my-3">
        {{ article.title }}
      </h6>

      <VTabs
        v-model="activeTab"
        direction="vertical"
        class="v-tabs-pill"
      >
        <VTab
          v-for="subarticle in article.subarticles"
          :key="subarticle.link"
          :value="subarticle.id"
          :to="{
            name: 'help-center-help-article',
            params: { help: help.link, article: article.link },
          }"
        >
          {{ subarticle.title }}
        </VTab>
      </VTabs>
    </VCol>

    <VCol
      
      cols="12"
      md="8"
    >
      <VWindow
        v-model="activeTab"
        class="disable-tab-transition"
      >
        <VWindowItem
          v-for="subarticle in article.subarticles"
          :key="subarticle.id"
          :value="subarticle.id"
        >
          <VCard :title="subarticle.title">
            <!--<template #prepend>-->
            <!--  <VAvatar-->
            <!--    color="primary"-->
            <!--    variant="tonal"-->
            <!--    rounded-->
            <!--    size="42"-->
            <!--  >-->
            <!--    <VIcon-->
            <!--      :icon="subarticle.icon"-->
            <!--      size="26"-->
            <!--    />-->
            <!--  </VAvatar>-->
            <!--</template>-->
            <VCardText >
              <VList class="card-list mb-6">
                <VListItem
                  v-for="resume in subarticle.resume"
                  :key="resume.id"
                  :to="{
                    name: 'help-center-help-article-subarticle',
                    params: {
                      help: help.link,
                      article: article.link,
                      subarticle: subarticle.id,
                    }
                  }"
                >
                  <template #prepend>
                    <VIcon
                      icon="tabler-chevron-right"
                      size="18"
                      class="me-2"
                    />
                  </template>
                  <VListItemTitle class="text-primary">
                    {{ resume.title }}
                  </VListItemTitle>
                </VListItem>
              </VList>

              
            </VCardText>
          </VCard>
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
</template>

<route lang="yaml">
meta:
  navActiveLink: help-center
</route>
