<script setup lang="ts">
import type { SearchHeader, SearchItem } from '@/@fake-db/types'
// import axios from '@axios'
import { useThemeConfig } from '@core/composable/useThemeConfig'


import { useUserListStore } from '@/views/apps/user/useUserListStore'
import { useUser } from '@/views/apps/user/useUser'

const {
    searchQuery,
    totalUsers,
    users: searchResult,
    fetchUsers,
    paginationData,
    currentPage,
    totalPage
}= useUser();

const userData = JSON.parse(localStorage.getItem('userData')) || '{}'

// import { data_bar } from '@/@fake-db/app-bar-search'

// console.log('bar', data_a)
interface Suggestion {
  icon: string
  title: string
  url: object
}
const { appContentLayoutNav } = useThemeConfig()

interface SuggestionGroup {
  title: string
  content: Suggestion[]
}

defineOptions({
  inheritAttrs: false,
})

// 👉 Is App Search Bar Visible
const isAppSearchBarVisible = ref(false)


// var user = JSON.parse(localStorage.getItem('userData') || '{}')
var abilities = JSON.parse(localStorage.getItem('userAbilities') || '{}')
const manage = abilities.action == 'manage' ? true : false
    

        
// 👉 Default suggestions
var suggestionGroups: SuggestionGroup[] = [
  {
    title: 'Workspace',
    content: [
      { icon: 'tabler-smart-home', title: 'Dashboard', url: { name: 'dashboard-leads' } },
      { icon: 'tabler-calendar', title: 'Sandbox', url: { name: 'apps-calendar' } },
      { icon: 'tabler-user', title: 'Leads', url: { name: 'apps-lead-list' } },
    ],
  },
  {
    title: 'Apps',
    content: [
      { icon: 'tabler-smart-home', title: 'Dashboard', url: { name: 'dashboard-leads' } },
      { icon: 'tabler-file', title: 'Ayuda', url: { name: 'help-center' } },
      { icon: 'tabler-file', title: 'Faqs', url: { name: 'faq' } },
      // { icon: 'tabler-message', title: 'Messenger', url: { name: 'apps-chat' } }
    ],
  },
]

if(manage){
  suggestionGroups.push({
      title: 'Resellers',
      content: [
        { icon: 'tabler-smart-home', title: 'Dashboard', url: { name: 'dashboard-accounts' } },
        { icon: 'tabler-user', title: 'Reseller', url: { name: 'apps-account-list' } },
        { icon: 'tabler-affiliate', title: 'Agentes', url: { name: 'apps-ad-list' } }
      ]
    },{
      title: 'Clientes',
      content: [
        { icon: 'tabler-user', title: 'Clientes', url: { name: 'apps-user-list' } },
        { icon: 'tabler-a-b', title: 'Formularios', url: { name: 'apps-auction -list' } },
        { icon: 'tabler-file', title: 'Formularios', url: { name: 'apps-form-list' } },
      ]
  })
}
// 👉 No Data suggestion
const noDataSuggestions: Suggestion[] = [
  {
    title: 'Lead Generator',
    icon: 'tabler-user',
    url: { name: 'apps-lead-list' },
  },
]

// const searchQuery = ref('')
// const searchResult = ref<(SearchItem | SearchHeader)[]>([])
// const searchResult = ref([])
const router = useRouter()

// 👉 fetch search result API
// watch(searchQuery, (val) => {
//   console.log('sss')
  
//   // axios.get('https://reseller.aythen.com/app-bar/search', {
//   //   params: {
//   //     q: searchQuery.value,
//   //   },
//   // }).then(response => {
//   //   searchResult.value = response.data
//   // })
//   // var data = {
//   //   q: searchQuery.value
//   // }
  
//   // fetchUsers(data).then( res => {
//   //   console.log('ddd', res)
//   //   searchResult.value = res.data.users
//   // })
// })





// 👉 redirect the selected page
const redirectToSuggestedOrSearchedPage = (selected: Suggestion) => {
  router.push(selected.url)

  isAppSearchBarVisible.value = false
  searchQuery.value = ''
}

const LazyAppBarSearch = defineAsyncComponent(() => import('@core/components/AppBarSearch.vue'))
</script>

<template>
  <div
    class="d-flex align-center cursor-pointer"
    v-bind="$attrs"
    @click="isAppSearchBarVisible = !isAppSearchBarVisible"
  >
    <!-- 👉 Search Trigger button -->
    <VBtn
      icon
      variant="text"
      color="default"
      size="small"
    >
      <VIcon
        icon="tabler-search"
        size="24"
      />
    </VBtn>

    <span
      v-if="appContentLayoutNav === 'vertical'"
      class="d-none d-md-flex align-center text-disabled"
    >
      <span class="me-3">Buscar</span>
      <span class="meta-key">&#8984;K</span>
    </span>
  </div>

  <!-- 👉 App Bar Search -->
  <LazyAppBarSearch
    v-model:isDialogVisible="isAppSearchBarVisible"
    v-model:search-query="searchQuery"
    :search-results="searchResult"
    :pagination-data="paginationData"
    :current-page="currentPage"
    :total-page="totalPage"
    :suggestions="suggestionGroups"
    :no-data-suggestion="noDataSuggestions"
    @item-selected="redirectToSuggestedOrSearchedPage"
  >
  </LazyAppBarSearch>
</template>

<style lang="scss" scoped>
/*@use "@styles/variables/_vuetify.scss";*/

.meta-key {
  /*border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));*/
  /*border-radius: vuetify.$card-border-radius;*/
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}
</style>
