<script setup lang="ts">
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { VList, VListItem, VListSubheader } from 'vuetify/components'

import { avatarText } from '@core/utils/formatters'

import { useAccountListStore } from '@/views/apps/account/useAccountListStore'
const useAccount = useAccountListStore()



interface Emit {
  (e: 'update:isDialogVisible', value: boolean): void
  // (e: 'update:updateReseller', value: any): void
}


interface Props {
  isDialogVisible: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

// 👉 Hotkey
const { ctrl_k, meta_k } = useMagicKeys()

const refSearchList = ref<VList>()
const searchQuery = ref('')
// const searchResults = ref([])

const refSearchInput = ref<HTMLInputElement>()
const isLocalDialogVisible = ref(structuredClone(toRaw(props.isDialogVisible)))

// 👉 Watching props change
watch(props, () => {
  // console.log('props', props)
  isLocalDialogVisible.value = structuredClone(toRaw(props.isDialogVisible))
  // searchResults.value = structuredClone(toRaw(props.searchResults))
  // searchQuery.value = structuredClone(toRaw(props.searchQuery))
})

// 👉 watching control + / to open dialog
watch([ctrl_k, meta_k], () => {
  isLocalDialogVisible.value = true
  emit('update:isDialogVisible', true)
})

// 👉 clear search result and close the dialog
const clearSearchAndCloseDialog = () => {
  emit('update:isDialogVisible', false)
}

// watch(searchQuery, (val) => {
//   // if (!searchQuery.value.length){
//   //   searchResults.value = []
//   // }
// })

// 👉 get fucus on search list
const getFocusOnSearchList = (e: KeyboardEvent) => {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    refSearchList.value?.focus('next')
  }
  else if (e.key === 'ArrowUp') {
    e.preventDefault()
    refSearchList.value?.focus('prev')
  }
}

const dialogModelValueUpdate = (val: boolean) => {
  emit('update:isDialogVisible', val)
}



// 👉
const resolveAccountStatusVariant = (stat: string) => {
  if (stat === 200)
    return 'success'
  if (stat === 300)
    return 'warning'
  if (stat === 400)
    return 'danger'
}



// 👉 resolve categories name
const accounts = ref([])
const currentPage = ref(0)
const totalAccounts = ref(0)
const totalPage = ref(0)
const rowPerPage = ref(10)

// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = accounts.value.length ? ((currentPage.value - 1) * rowPerPage.value) + 1 : 0
  const lastIndex = accounts.value.length + ((currentPage.value - 1) * rowPerPage.value)

  return `Mostrando ${firstIndex} de ${lastIndex} de ${totalAccounts.value} valores`
})



const fetchAccounts = (val = '') => {
  useAccount.fetchAccounts({q: val}).then( res => {
    console.log('se', res)
    
    accounts.value = res.data.accounts
    totalAccounts.value = res.data.totalAccounts
    totalPage.value = res.data.totalPage
    console.log(accounts.value)
   // setAccountSelected(accounts.value)
    
  })
}

const setAccountSelected=(accounts)=> {
  console.log('init',accounts)
  for(let i=0;i<accounts.lenght;i++){
    
  }
  // Verifica si hay al menos un account en la lista
  if (accounts.length > 0) {
    // Establece la propiedad "selected" en true para el primer account
    accounts[0].selected = true;
  }
}
watch(searchQuery, (val) => {
  // if (!searchQuery.value.length){
  //   searchResults.value = []
  // }
  // fetchsAccounts
  // fetchAccounts(val)
  console.log('val', val)
  
})


fetchAccounts()


// 👉 Select Reseller
const selectReseller = (data) => {
  
  emit('updateReseller', data);
  setTimeout(()=>{
    emit('update:isDialogVisible', false)
  },1000)
  
}

const changeCheck=(data)=>{
  if(data){
    console.log(data)
    selectReseller(data)
  }else{
    console.log('sin data')
  }
  
}


</script>

<template>
  <VDialog
    max-width="600"
    :model-value="isLocalDialogVisible"
    :height="$vuetify.display.smAndUp ? '550' : '100%'"
    :fullscreen="$vuetify.display.width < 600"
    class="app-bar-search-dialog"
    @update:model-value="dialogModelValueUpdate"
    @keyup.esc="clearSearchAndCloseDialog"
  >
    <VCard
      height="100%"
      width="100%"
      class="position-relative"
    >
      <VCardText
        class="pt-1"
        style="max-height: 65px;"
      >
        <!-- 👉 Search Input -->
        
        <VTextField
          ref="refSearchInput"
          v-model="searchQuery"
          autofocus
          variant="plain"
          density="comfortable"
          class="app-bar-autocomplete-box"
          @keyup.esc="clearSearchAndCloseDialog"
          @keydown="getFocusOnSearchList"
          @update:model-value="$emit('update:searchQuery', searchQuery)"
        >
          <!-- 👉 Prepend Inner -->
          <template #prepend-inner>
            <VBtn
              icon
              variant="text"
              color="default"
              size="x-small"
              class="text-high-emphasis ms-n1"
            >
              <VIcon
                size="22"
                icon="tabler-search"
              />
            </VBtn>
          </template>

          <!-- 👉 Append Inner -->
          <template #append-inner>
            <div class="d-flex align-center">
              <div
                class="text-base text-disabled cursor-pointer me-2"
                @click="clearSearchAndCloseDialog"
              >
                [esc]
              </div>

              <VBtn
                icon
                variant="text"
                color="default"
                size="x-small"
                @click="clearSearchAndCloseDialog"
              >
                <VIcon
                  size="22"
                  icon="tabler-x"
                />
              </VBtn>
            </div>
          </template>
        </VTextField>
      </VCardText>

      <!-- 👉 Divider -->
      <VDivider />

      <!-- 👉 Perfect Scrollbar -->
      <PerfectScrollbar
        :options="{ wheelPropagation: false, suppressScrollX: true }"
        class="h-100"
      >
        <!-- 👉 Search List -->
        <VList
          v-show="searchQuery.length || accounts.length"
          ref="refSearchList"
          density="compact"
          class="app-bar-search-list"
          :style="{height: '100%'}"
        >
              <VTable class="text-no-wrap" :style="{height: 'calc(100% - 72px)'}">
                <!-- 👉 table head -->
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">
                      USUARIO
                    </th>
                    <th scope="col">
                      DIRECCIÓN
                    </th>
                    <th scope="col">
                      CONTACTO
                    </th>
                  </tr>
                </thead>
                <!-- 👉 table body -->
                <tbody >
                 
                  <tr v-for="account in accounts" :key="account.id" 
                    
                    class="cursor-pointer color-hover" style="height: 3.75rem;"
                     :class="{'green-background': account.selected}">
                     <!--check-->
                  <td>
                    <VCheckbox
                      v-model="account.selected" 
                      @change="changeCheck(account)"
                    />
                  </td>
                    <!-- 👉 User -->
                    <td>
                      <div class="d-flex align-center">
                        <VAvatar variant="tonal" :color="resolveAccountStatusVariant(account.role)" class="me-3" size="38">
                          <VImg v-if="account.avatar" :src="account.avatar" />
                          <span v-else>{{ avatarText(account.fullName) }}</span>
                        </VAvatar>
    
                        <div class="d-flex flex-column">
                          <h6 class="text-base">
                            <span class="link">{{ account.fullName }}</span>
                          </h6>
                          <div>
                            <VChip label :color="resolveAccountStatusVariant(account.status)" size="small" class="text-capitalize">
                              {{ account.role }}
                            </VChip>
                          </div>
                        </div>
                      </div>
                    </td>
    
                    <!-- 👉 Address -->
                    <td>
                      <div class="d-flex align-center">
                        <div class="d-flex flex-column">
                          <h6 class="text-base">
                              {{ account.address.province }}, {{ account.address.city }} 
                          </h6>
                          <div>
                            <VChip v-for="zip in account.address.zip" 
                              label size="small" class="text-capitalize text-xs">
                              {{ zip }}
                            </VChip>
                          </div>
                        </div>
                      </div>
                    </td>
    
                    <!-- 👉 Contacto -->
                    <td>
                      <div v-if="account.phone" class="d-flex gap-2 text-base">
                        <VBtn :href="`/apps/chat?id=${account.id}`" variant="text" size="xx-small" icon>
                          <VIcon icon="tabler-message-circle"></VIcon>
                        </VBtn>
                        <span class="text-capitalize text-base">
                          {{ account.phone }}
                        </span>
                      </div>
                      <div v-if="account.email" class="d-flex gap-2">
                        <VBtn :href="`/apps/email?to=${account.email}`" variant="text" size="xx-small" icon>
                          <VIcon icon="tabler-mail" size="small"></VIcon>
                        </VBtn>
                        <span class="text-capitalize text-base">{{ account.email }}</span>
                      </div>
                    </td>
    
                  </tr>
                </tbody>
    
                <!-- 👉 table footer  -->
                <tfoot v-show="!accounts.length">
                  <tr>
                    <td colspan="7" class="text-center">
                      No data available
                    </td>
                  </tr>
                </tfoot>
              </VTable>
    
              <VDivider />
    
              <VCardText class="d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5">
                <span class="text-sm text-disabled">
                  {{ paginationData }}
                </span>
                <VPagination v-model="currentPage" size="small" :total-visible="5" :length="totalPage" />
              </VCardText>
        </VList>


        <!-- 👉 No Data found -->
        <div
          v-show="!accounts.length && searchQuery.length"
          class="h-100"
        >
          <slot name="noData">
            <VCardText class="h-100">
              <div class="app-bar-search-suggestions d-flex flex-column align-center justify-center text-high-emphasis h-100">
                <VIcon
                  size="75"
                  icon="tabler-file-x"
                />
                <h6 class="text-h6 my-3">
                  No Result For "{{ searchQuery }}"
                </h6>
              </div>
            </VCardText>
          </slot>
        </div>
      </PerfectScrollbar>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.v-table__wrapper{
  height: 100%;
}

.color-hover:hover{
  background: #f0f1ff;
}


.app-bar-search-suggestions {
  .app-bar-search-suggestion {
    &:hover {
      color: rgb(var(--v-theme-primary));
    }
  }
}

.app-bar-autocomplete-box {
  .v-field__input {
    padding-block-end: 0.425rem;
    padding-block-start: 0.9375rem;
  }
}

.app-bar-search-dialog {
  .v-list-item-title {
    font-size: 0.875rem !important;
  }

  .app-bar-search-list {
    .v-list-item,
    .v-list-subheader {
      font-size: 0.75rem;
      padding-inline: 1.5rem !important;
    }

    .v-list-item {
      .v-list-item__append {
        .enter-icon {
          visibility: hidden;
        }
      }

      &:hover,
      &:active,
      &:focus {
        .v-list-item__append {
          .enter-icon {
            visibility: visible;
          }
        }
      }
    }

    .v-list-subheader {
      line-height: 1;
      min-block-size: auto;
      padding-block: 0.6875rem 0.3125rem;
      text-transform: uppercase;
    }
  }
}
</style>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 16px;
}
.green-background {
  background-color: green;
}
</style>
