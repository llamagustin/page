<script setup lang="ts">
import type { Form } from '@/@fake-db/types'
import { useFormStore } from '@/views/apps/form/useFormStore'

// 👉 Store
const formListStore = useFormStore()

const searchQuery = ref('')
const selectedStatus = ref('')
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

// 👉 Form status variant resolver
const resolveFormStatusVariantAndIcon = (status: string) => {
  if (status === 'Partial Payment')
    return { variant: 'success', icon: 'tabler-circle-half-2' }
  if (status === 'Paid')
    return { variant: 'warning', icon: 'tabler-chart-pie' }
  if (status === 'Downloaded')
    return { variant: 'info', icon: 'tabler-arrow-down-circle' }
  if (status === 'Draft')
    return { variant: 'primary', icon: 'tabler-device-floppy' }
  if (status === 'Sent')
    return { variant: 'secondary', icon: 'tabler-circle-check' }
  if (status === 'Past Due')
    return { variant: 'error', icon: 'tabler-info-circle' }

  return { variant: 'secondary', icon: 'tabler-x' }
}
</script>

<template>
  <VCard
    v-if="forms"
    id="form-list"
  >
    <template #prepend>
      <!-- 👉 Rows per page -->
      <div
        class="d-flex align-center"
        style="width: 131px;"
      >
        <span class="text-no-wrap me-3">Show:</span>

        <VSelect
          v-model="rowPerPage"
          variant="outlined"
          :items="[10, 20, 30, 50]"
        />
      </div>
    </template>

    <template #append>
      <VBtn
        color="default"
        variant="tonal"
        prepend-icon="tabler-screen-share"
        append-icon="tabler-chevron-down"
      >
        Export
        <VMenu activator="parent">
          <VList density="compact">
            <VListItem
              v-for="(item, index) in ['PDF', 'XLSX', 'CSV']"
              :key="index"
              :value="index"
            >
              <VListItemTitle>{{ item }}</VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>
      </VBtn>
    </template>

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
          <th
            scope="col"
            class="text-center"
          >
            TOTAL
          </th>
          <th
            scope="col"
            class="text-center"
          >
            ISSUED DATE
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

          <!-- 👉 total -->
          <td class="text-center">
            ${{ form.total }}
          </td>

          <!-- 👉 Date -->
          <td class="text-center">
            {{ form.issuedDate }}
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
                icon="tabler-mail"
                :size="22"
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
                :size="22"
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
                :size="22"
                icon="tabler-dots-vertical"
              />
              <VMenu activator="parent">
                <VList density="compact">
                  <VListItem value="Download">
                    <template #prepend>
                      <VIcon
                        size="22"
                        class="me-3"
                        icon="tabler-download"
                      />
                    </template>

                    <VListItemTitle>Download</VListItemTitle>
                  </VListItem>

                  <VListItem :to="{ name: 'apps-form-edit-id', params: { id: form.id } }">
                    <template #prepend>
                      <VIcon
                        size="22"
                        class="me-3"
                        icon="tabler-pencil"
                      />
                    </template>

                    <VListItemTitle>Edit</VListItemTitle>
                  </VListItem>
                  <VListItem value="Duplicate">
                    <template #prepend>
                      <VIcon
                        size="22"
                        class="me-3"
                        icon="tabler-stack"
                      />
                    </template>

                    <VListItemTitle>Duplicate</VListItemTitle>
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
            No data available
          </td>
        </tr>
      </tfoot>
    </VTable>
    <!-- !SECTION -->

    <VDivider />

    <!-- SECTION Pagination -->
    <VCardText class="d-flex align-center flex-wrap justify-space-between gap-4 py-3">
      <!-- 👉 Pagination meta -->
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
