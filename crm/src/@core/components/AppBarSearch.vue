<script setup lang="ts">
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { VList, VListItem, VListSubheader } from 'vuetify/components'

import { avatarText } from '@core/utils/formatters'


import { useUser } from '@/views/apps/user/useUser'
const {resolveUserStatusVariant } = useUser()
  
  
interface Emit {
  (e: 'update:isDialogVisible', value: boolean): void
  (e: 'update:searchQuery', value: string): void
  (e: 'itemSelected', value: any): void
}

interface Suggestion {
  icon: string
  title: string
  url: object
}

interface Suggestions {
  title: string
  content: Suggestion[]
}

interface Props {
  isDialogVisible: boolean
  searchQuery: string
  searchResults: any[]
  paginationData: any
  currentPage: any
  totalPage: any
  suggestions?: Suggestions[]
  noDataSuggestion?: Suggestion[]
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

// 👉 Hotkey
const { ctrl_k, meta_k } = useMagicKeys()

const refSearchList = ref<VList>()
const searchQuery = ref(structuredClone(toRaw(props.searchQuery)))
const refSearchInput = ref<HTMLInputElement>()
const isLocalDialogVisible = ref(structuredClone(toRaw(props.isDialogVisible)))
const searchResults = ref(structuredClone(toRaw(props.searchResults)))


const paginationData = ref(props.paginationData)
const currentPage = ref(props.currentPage)
const totalPage = ref(props.totalPage)
// 👉 Watching props change
// console.log('props', props)
watch(props, () => {
  isLocalDialogVisible.value = structuredClone(toRaw(props.isDialogVisible))
  searchResults.value = structuredClone(toRaw(props.searchResults))
  searchQuery.value = structuredClone(toRaw(props.searchQuery))
})

// 👉 watching control + / to open dialog
watch([ctrl_k, meta_k], () => {
  isLocalDialogVisible.value = true
  emit('update:isDialogVisible', true)
})

// 👉 clear search result and close the dialog
const clearSearchAndCloseDialog = () => {
  emit('update:isDialogVisible', false)
  emit('update:searchQuery', '')
}

watchEffect(() => {
  if (!searchQuery.value.length)
    searchResults.value = []
})

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
  emit('update:searchQuery', '')
}

// 👉 resolve categories name
const resolveCategories = (val: string) => {
  if (val === 'dashboards')
    return 'Dashboards'

  if (val === 'appsPages')
    return 'Apps & Pages'

  if (val === 'userInterface')
    return 'User Interface'

  if (val === 'formsTables')
    return 'Forms Tables'

  if (val === 'chartsMisc')
    return 'Charts Misc'

  return 'Misc'
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
          v-show="searchQuery.length && !!searchResults.length"
          ref="refSearchList"
          density="compact"
          class="app-bar-search-list"
        >
          <!-- 👉 list Item /List Sub header -->
          <VTable class="text-no-wrap">
            <!-- 👉 table head -->
            <thead>
              <tr>
                <th scope="col"> USUARIO </th>
                <th scope="col"> DIRECCION </th>
                <th scope="col"> CONTACTO </th>
                <th scope="col"> TOOLS </th>
                <th scope="col">  </th>
              </tr>
            </thead>
            <!-- 👉 table body -->
            <tbody>
              <tr v-for="user in searchResults" :key="user.id"  style="height: 3.75rem;">

                <!-- 👉 User -->
                <td >
                  <div class="d-flex align-center cursor-pointer ">
                    <VAvatar variant="tonal" class="me-3" size="38" :color="resolveUserStatusVariant(user.status)">
                      <VImg v-if="user.avatar" :src="user.avatar" />
                      <span v-else-if="user.name">
                        {{ avatarText(user.name.name) || '?'}}
                      </span>
                    </VAvatar>
                    <div class="d-flex flex-column elipsis">
                      <h6 class="text-base">
                        <span v-if="user.name?.name" class="elipsis">
                          {{ user.name?.name + ' ' + user.name?.firstSurname + ' ' + user.name?.secondSurname }}
                        </span>
                        <span v-else class="elipsis">
                          {{ user.company }}
                        </span>
                      </h6>
                      <span  class="text-sm text-disabled">
                        {{ user.address?.line }}
                      </span>
                    </div>
                  </div>
                </td>

                <!-- 👉 Address -->
                <td>
                  <h6>
                    <span class="text-capitalize text-base font-weight-semibold">
                      {{ user.address?.country }},{{ user.address?.province }}
                    </span>
                  </h6>
                  <VChip label size="small" :color="resolveUserStatusVariant(user.status)">
                    {{user.address?.zip}} - {{user.address?.city}}
                  </VChip>
                </td>

                <!-- 👉 Contact -->
                <td>
                  <div v-if="user.phone" class="d-flex gap-2 text-base">
                    <VBtn @click="openTwilio(user)" variant="text" :color="resolveUserStatusVariant(user.status)" size="xx-small" icon>
                      <VIcon icon="tabler-phone"></VIcon>
                    </VBtn>
                    <span class="text-base">{{ user.phone }}</span>
                  </div>
                  <div v-if="user.email" class="d-flex gap-2 text-base">
                    <VBtn :href="`/apps/email?to=${user.email}`" variant="text" :color="resolveUserStatusVariant(user.status)" size="xx-small" icon>
                      <VIcon icon="tabler-mail"></VIcon>
                    </VBtn>
                    <span class="text-base elipsis">{{ user.email }}</span>
                  </div>
                </td>
                <!-- 👉 BUDGET -->
                <td>
                  <VChip label size="small" :color="resolveUserStatusVariant(user.status)">
                    {{}}
                  </VChip>
                </td>
                <!-- 👉 CONTACT -->
                <td>
                  <VChip label size="small" :color="resolveUserStatusVariant(user.status)">
                    {{user.contact}}
                  </VChip>
                </td>
              </tr>
            </tbody>
            <!-- 👉 table footer  -->
            <tfoot v-show="users && !users.length">
              <tr>
                <td colspan="7" class="text-center">
                  No data available
                </td>
              </tr>
            </tfoot>
          </VTable>
          <VCardText class="d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5">
            <span class="text-sm text-disabled">
              {{ paginationData }}
            </span>
            <VPagination v-model="currentPage" size="small" :total-visible="5" :length="totalPage" />
          </VCardText>
          
        </VList>

        <!-- 👉 Suggestions -->
        <div
          v-show="!!searchResults && !searchQuery"
          class="h-100"
        >
          <slot name="suggestions">
            <VCardText class="app-bar-search-suggestions h-100 pa-10">
              <VRow
                v-if="props.suggestions"
                class="gap-y-4"
              >
                <VCol
                  v-for="suggestion in props.suggestions"
                  :key="suggestion.title"
                  cols="12"
                  sm="6"
                  class="ps-6"
                >
                  <p class="text-xs text-disabled text-uppercase">
                    {{ suggestion.title }}
                  </p>

                  <VList class="card-list">
                    <VListItem
                      v-for="item in suggestion.content"
                      :key="item.title"
                      link
                      :title="item.title"
                      class="app-bar-search-suggestion"
                      @click="$emit('itemSelected', item)"
                    >
                      <template #prepend>
                        <VIcon
                          :icon="item.icon"
                          size="20"
                          class="me-2"
                        />
                      </template>
                    </VListItem>
                  </VList>
                </VCol>
              </VRow>
            </VCardText>
          </slot>
        </div>

        <!-- 👉 No Data found -->
        <div
          v-show="!searchResults.length && searchQuery.length"
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
                <div
                  v-if="props.noDataSuggestion"
                  class="mt-8"
                >
                  <span class="d-flex justify-center text-disabled">Try searching for</span>
                  <h6
                    v-for="suggestion in props.noDataSuggestion"
                    :key="suggestion.title"
                    class="app-bar-search-suggestion text-sm font-weight-regular cursor-pointer mt-3"
                    @click="$emit('itemSelected', suggestion)"
                  >
                    <VIcon
                      size="20"
                      :icon="suggestion.icon"
                      class="me-3"
                    />
                    <span class="text-sm">{{ suggestion.title }}</span>
                  </h6>
                </div>
              </div>
            </VCardText>
          </slot>
        </div>
      </PerfectScrollbar>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.app-bar-search-list{
    height: 100% !important;
}

.v-table{
    height: calc(100% - 60px) !important;
    position: relative;
    overflow-y: scroll;
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
</style>
