<script setup lang="ts">
import type { Form } from '@/@fake-db/types'
import { useFormStore } from '@/views/apps/form/useFormStore'
import { avatarText } from '@core/utils/formatters'

// 👉 Store
const formListStore = useFormStore()

const searchQuery = ref('')
const selectedStatus = ref()
const rowPerPage = ref(10)
const currentPage = ref(1)
const totalPage = ref(1)
const totalForms = ref(0)
const forms = ref<Form[]>([])
const selectedRows = ref<string[]>([])

// 👉 Fetch Forms
watchEffect(() => {
  formListStore.fetchForms(
    {
      q: searchQuery.value,
      status: selectedStatus.value,
      perPage: rowPerPage.value,
      currentPage: currentPage.value,
    },
  ).then(response => {
    forms.value = response.data.forms
    totalPage.value = response.data.totalPage
    totalForms.value = response.data.totalForms
  }).catch(error => {
    console.log(error)
  })
})

// 👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = forms.value.length ? ((currentPage.value - 1) * rowPerPage.value) + 1 : 0
  const lastIndex = forms.value.length + ((currentPage.value - 1) * rowPerPage.value)

  return `Showing ${firstIndex} to ${lastIndex} of ${totalForms.value} entries`
})

// 👉 Form balance variant resolver
const resolveFormBalanceVariant = (balance: string | number, total: number) => {
  if (balance === total)
    return { status: 'Unpaid', chip: { color: 'error' } }

  if (balance === 0)
    return { status: 'Paid', chip: { color: 'success' } }

  return { status: balance, chip: { variant: 'text' } }
}

// 👉 Form status variant resolver
const resolveFormStatusVariantAndIcon = (status: string) => {
  if (status === 'Partial Payment')
    return { variant: 'warning', icon: 'tabler-circle-half-2' }
  if (status === 'Paid')
    return { variant: 'success', icon: 'tabler-circle-check' }
  if (status === 'Downloaded')
    return { variant: 'info', icon: 'tabler-download' }
  if (status === 'Draft')
    return { variant: 'secondary', icon: 'tabler-device-floppy' }
  if (status === 'Sent')
    return { variant: 'primary', icon: 'tabler-mail' }
  if (status === 'Past Due')
    return { variant: 'error', icon: 'tabler-alert-circle' }

  return { variant: 'secondary', icon: 'tabler-x' }
}
</script>

<template>
  <VCard
    v-if="forms"
    id="form-list"
  >
    <VCardText class="d-flex align-center flex-wrap gap-3">
      <!-- 👉 Rows per page -->
      <div
        class="me-2"
        style="width: 5rem;"
      >
        <VSelect
          v-model="rowPerPage"
          variant="outlined"
          :items="[10, 20, 30, 50]"
        />
      </div>

      <!-- 👉 Create form -->
      <VBtn
        prepend-icon="tabler-plus"
        :to="{ name: 'apps-form-add' }"
        class="me-3"
      >
        Create form
      </VBtn>

      <VSpacer />

      <div class="d-flex align-center flex-wrap gap-3">
        <!-- 👉 Search  -->
        <div class="form-list-search">
          <VTextField
            v-model="searchQuery"
            placeholder="Search Form"
            density="compact"
            class="me-3"
          />
        </div>
        <div class="form-list-status">
          <VSelect
            v-model="selectedStatus"
            label="Select Status"
            clearable
            clear-icon="tabler-x"
            density="compact"
            :items="['Downloaded', 'Draft', 'Paid', 'Partial Payment', 'Past Due']"
          />
        </div>
      </div>
    </VCardText>

    <VDivider />
    <!-- SECTION Table -->
    <VTable class="text-no-wrap form-list-table">
      <!-- 👉 Table head -->
      <thead>
        <tr>
          <th scope="col">
            #ID
          </th>
          <th scope="col">
            <VIcon icon="tabler-trending-up" />
          </th>
          <th scope="col">
            CLIENT
          </th>
          <th scope="col">
            TOTAL
          </th>
          <th scope="col">
            ISSUED DATE
          </th>
          <th scope="col">
            BALANCE
          </th>
          <th scope="col">
            <span class="ms-2">ACTIONS</span>
          </th>
        </tr>
      </thead>

      <!-- 👉 Table Body -->
      <tbody>
        <tr
          v-for="form in forms"
          :key="form.id"
        >
          <!-- 👉 Id -->
          <td>
            <RouterLink :to="{ name: 'apps-form-preview-id', params: { id: form.id } }">
              #{{ form.id }}
            </RouterLink>
          </td>

          <!-- 👉 Trending -->
          <td>
            <VTooltip>
              <template #activator="{ props }">
                <VAvatar
                  :size="30"
                  v-bind="props"
                  :color="resolveFormStatusVariantAndIcon(form.formStatus).variant"
                  variant="tonal"
                >
                  <VIcon
                    :size="20"
                    :icon="resolveFormStatusVariantAndIcon(form.formStatus).icon"
                  />
                </VAvatar>
              </template>
              <p class="mb-0">
                {{ form.formStatus }}
              </p>
              <p class="mb-0">
                Balance: {{ form.balance }}
              </p>
              <p class="mb-0">
                Due date: {{ form.dueDate }}
              </p>
            </VTooltip>
          </td>
  
          <!-- 👉 Client Avatar and Email -->
          <td>
            <div class="d-flex align-center">
              <VAvatar
                size="33"
                variant="tonal"
                :color="resolveFormStatusVariantAndIcon(form.formStatus).variant"
                class="me-3"
              >
                <VImg
                  v-if="form.avatar"  
                  :src="form.avatar"
                />
                <span v-else>{{ avatarText(form.client?.name) }}</span>
              </VAvatar>
              <div class="d-flex flex-column">
                <h6 class="text-sm font-weight-medium mb-0">
                  {{ form.client?.name }}
                </h6>
                <span class="text-sm">{{ form.client?.companyEmail }}</span>
              </div>
            </div>
          </td>

          <!-- 👉 total -->
          <td>${{ form.total }}</td>

          <!-- 👉 Date -->
          <td>{{ form.issuedDate }}</td>

          <!-- 👉 Balance -->
          <td>
            <VChip v-bind="resolveFormBalanceVariant(form.balance, form.total).chip">
              {{ resolveFormBalanceVariant(form.balance, form.total).status }}
            </VChip>
          </td>

          <!-- 👉 Actions -->
          <td style="width: 7.5rem;">
            <VBtn
              icon
              variant="text"
              color="default"
              size="x-small"
            >
              <VIcon
                size="22"
                icon="tabler-mail"
              />
            </VBtn>

            <VBtn
              icon
              variant="text"
              color="default"
              size="x-small"
              :to="{ name: 'apps-form-preview-id', params: { id: form.id } }"
            >
              <VIcon
                size="22"
                icon="tabler-eye"
              />
            </VBtn>

            <VBtn
              icon
              variant="text"
              color="default"
              size="x-small"
            >
              <VIcon
                size="22"
                icon="tabler-dots-vertical"
              />
              <VMenu activator="parent">
                <VList density="compact">
                  <VListItem value="#">
                    <template #prepend>
                      <VIcon
                        size="24"
                        class="me-3"
                        icon="tabler-download"
                      />
                    </template>

                    <VListItemTitle>Descargar</VListItemTitle>
                  </VListItem>

                  <VListItem :to="{ name: 'apps-form-edit-id', params: { id: form.id } }">
                    <template #prepend>
                      <VIcon
                        size="24"
                        class="me-3"
                        icon="tabler-pencil"
                      />
                    </template>

                    <VListItemTitle>Edit</VListItemTitle>
                  </VListItem>
                  <VListItem value="#">
                    <template #prepend>
                      <VIcon
                        size="24"
                        class="me-3"
                        icon="tabler-stack"
                      />
                    </template>

                    <VListItemTitle>Duplicar</VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
            </VBtn>
          </td>
        </tr>
      </tbody>

      <!-- 👉 table footer  -->
      <tfoot v-show="!forms.length">
        <tr>
          <td
            colspan="8"
            class="text-center text-body-1"
          >
            No hay datos disponibles
          </td>
        </tr>
      </tfoot>
    </VTable>
    <!-- !SECTION -->

    <VDivider />

    <!-- SECTION Pagination -->
    <VCardText class="d-flex align-center flex-wrap justify-space-between gap-4 py-4">
      <!-- 👉  Pagination meta -->
      <span class="text-sm text-disabled">{{ paginationData }}</span>

      <!-- 👉 Pagination -->
      <VPagination
        v-model="currentPage"
        size="small"
        :total-visible="5"
        :length="totalPage"
        @next="selectedRows = []"
        @prev="selectedRows = []"
      />
    </VCardText>
  <!-- !SECTION -->
  </VCard>
</template>

<style lang="scss">
#form-list {
  .form-list-status {
    inline-size: 15rem;
  }

  .form-list-search {
    inline-size: 12rem;
  }
}
</style>
