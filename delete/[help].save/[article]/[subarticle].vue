<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { HelpCenterSubcategoriesType, HelpCenterSubcategoryArticlesType } from '@/@fake-db/types'
import axios from '@axios'

import { data_help } from '@/@fake-db/pages/data'



const route = useRoute()

const help = ref()
const article = ref()
const subarticle = ref()
const resume = ref()

const activeTab = ref(route.params.article)
const activeArticle = ref<HelpCenterSubcategoryArticlesType>()

const fetchHelpCenterArticlesData = () => {
  console.log('change', activeTab)
  // return axios.get('/pages/help-center/article', {
  //   params: {
  //     article: activeTab.value,
  //     category: route.params.category,
  //     subcategory: route.params.subcategory,
  //   },
  // }).then(res => {
  //   apiData.value = res.data.activeSubcategory
  //   activeArticle.value = res.data.activeArticle
  // })
  
  help.value = data_help.find(x => x.link == route.params.help)

  if(help.value){
      article.value = help.value.articles.find(x => x.link == route.params.article)

      if(article.value){
        subarticle.value = article.value.subarticles.find(x => x.id == activeTab.value)
        console.log('_subarticle', route.params.subarticle, subarticle.value)
      }
  }
}

watch(activeTab, fetchHelpCenterArticlesData, { immediate: true })
</script>

<template>
  <VRow v-if="article">
    <VCol
      cols="12"
      md="4"
    >
      <VBtn
        variant="tonal"
        :to="{
          name: 'help-center-help-article',
          params: { help: route.params.help, article: route.params.article },
        }"
      >
        <VIcon
          icon="tabler-chevron-left"
          class="flip-in-rtl"
        />
        <span>Volver al help</span>
      </VBtn>
      <h6 class="text-base my-3">
        {{ article.title }}
      </h6>
      <p>
        {{ article.text }}
      </p>

      <VTabs
        v-model="activeTab"
        direction="vertical"
        class="v-tabs-pill"
      >
        <VTab
          v-for="subarticle in article.subarticles"
          :key="subarticle.id"
          :value="subarticle.id"
          :to="{
            name: 'help-center-help-article-subarticle',
            params: {
              help: route.params.help,
              article: route.params.article,
              subarticle: subarticle.id,
            },
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
      <VWindow>
        <VWindowItem>
          <VCard>
            <VCardText class="pb-0">
              
            </VCardText>

            <VCardItem>
              <template #prepend>
                <VAvatar
                  color="primary"
                  variant="tonal"
                  rounded
                >
                  <VIcon icon="tabler-currency-dollar" />
                </VAvatar>
              </template>
              <VCardTitle>{{ subarticle.title }}</VCardTitle>
            </VCardItem>

            <!-- eslint-disable-next-line vue/no-v-html vue/no-v-text-v-html-on-component -->
            <VCardText v-html="subarticle.text" />
            
            <VCardText
              v-for="resume in subarticle.resume"
              :ref="resume.id"
              class="ml-4"
            >
              <b>
                {{resume.title}}: 
              </b>
              <label>
                {{resume.text}}
              </label>
            </VCardText>

            <VDivider />

            <VCardText>
              <div class="d-flex justify-space-between flex-wrap mb-2">
                <h6 class="text-h6">
                  Sigues necesitando ayuda?
                  <!--<a href="javascript:void(0);">Ponte en contacto con nosotros</a>-->
                  <RouterLink
                    class="d-flex gap-2 align-center justify-center"
                    :to="{ name: 'faq' }"
                  >
                    <span>Ponte en contacto con nosotros</span>
                  </RouterLink>
                </h6>
              </div>

              <div class="article-votes d-flex align-center gap-3">
                <VAvatar
                  color="primary"
                  variant="tonal"
                  rounded
                  size="30"
                >
                  <VIcon icon="tabler-thumb-up" />
                </VAvatar>
                <VAvatar
                  color="primary"
                  variant="tonal"
                  rounded
                  size="30"
                >
                  <VIcon icon="tabler-thumb-down" />
                </VAvatar>
              </div>
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


<style lang="scss">
a{
  &.v-btn{
    padding: 2px 6px;
    font-size: 12px;
  }
}  
</style>
