<script setup lang="ts">
import type {
  HelpCenterArticlesOverviewType,
  HelpCenterCategoriesType,
} from '@/@fake-db/types'

import HelpCenterLandingArticlesOverview from '@/views/pages/help-center/HelpCenterLandingArticlesOverview.vue'
// import HelpCenterLandingFooter from '@/views/pages/help-center/HelpCenterLandingFooter.vue'
import HelpCenterLandingKnowledgeBase from '@/views/pages/help-center/HelpCenterLandingKnowledgeBase.vue'
// import axios from '@axios'

import { data_help, popularArticles, keepLearning} from '@/@fake-db/pages/data'

// interface ApiDataType {
//   categories: HelpCenterCategoriesType[]
//   keepLearning: HelpCenterArticlesOverviewType[]
//   popularArticles: HelpCenterArticlesOverviewType[]
// }

const apiData = ref()

// // fetching data from the @fake-db
// const fetchHelpCenterData = () => {
//   return axios.get('/pages/help-center/landing').then(res => {
//     apiData.value = res.data
//   })
// }

// fetchHelpCenterData()
// 

const search_data_help = ref(data_help)

const onSearch = (val) => {
  search_data_help.value = data_help.filter(obj => {
    const dataText = obj.text.toLowerCase();
    const articlesText = obj.articles.map(article => (article.title + ' ' + article.text).toLowerCase()).join(' ');
    return dataText.includes(val.toLowerCase()) || articlesText.includes(val.toLowerCase());
  });
  
}
</script>

<template>
  <VCard >
    <AppSearchHeader
      title="Hola, como podemos ayudarte?"
      subtitle="Problemas más buscados: eCommerce, Blogs de pago"
      custom-class="rounded-0"
      @search="onSearch"
    />


    <!-- 👉 Knowledge Base -->
    <div >
      <VCardText class="bg-var-theme-background py-12">
        <!--<h5 class="text-h5 text-center my-6">-->
        <!--  Base de Conocimientos-->
        <!--</h5>-->

        <HelpCenterLandingKnowledgeBase :help="search_data_help" />
      </VCardText>
    </div>

    <!-- 👉 Popular Articles -->
    <VCardText class="">
      <h5 class="text-h5 text-center my-6">
        Artículos Populares
      </h5>

      <HelpCenterLandingArticlesOverview :articles="popularArticles" />
    </VCardText>
    
    
    <!-- 👉 Keep Learning -->
    <VCardText class="py-12">
      <h5 class="text-h5 text-center my-6">
        Sigue Aprendiendo
      </h5>

      <HelpCenterLandingArticlesOverview :articles="keepLearning" />
    </VCardText>


  </VCard>
</template>
