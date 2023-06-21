<script setup lang="ts">
  import type { Form } from '@/@fake-db/types'
import { useFormStore } from '@/views/apps/form/useFormStore'
import { avatarText } from '@core/utils/formatters'

import { timeAgo } from '@/shared/utils/date'
import { useTools } from "@/shared/composables/useTools"
import { sessionStore } from '@/shared/utils/sessionStore.ts'


// 👉 Store
const { local } = sessionStore('form')
const { tools } = useTools();


const formListStore = useFormStore()

const searchQuery = ref(local('searchQuery'))
const selectedStatus = ref(local('selectedStatus'))
const rowPerPage = ref(local('rowPerPage', 10))
const currentPage = ref(local('currentPage', 1))
const totalPage = ref(local('totalPage', 1))
const totalForms = ref(local('totalForms', 0))
const forms = ref<Form[]>(local('forms', []))
const selectedRows = ref<string[]>(local('selectedRows', []))

const userData = JSON.parse(localStorage.getItem('userData'))


  
  
const fetchsForms = () => {
  formListStore.fetchForms(userData.id, {
      q: searchQuery.value,
      status: selectedStatus.value,
      perPage: rowPerPage.value,
      currentPage: currentPage.value,
    },
  ).then(response => {
    forms.value = response.data.forms
    totalPage.value = response.data.totalPage
    totalForms.value = response.data.totalForms
    
    //check
    forms.value.map( form => form.check = false )
    
    console.log('response:' , forms.value);
  }).catch(error => {
    console.log(error)
  })
}
  
fetchsForms()
// 👉 Computing pagination data
const paginationData = computed(() => {
  
  console.log('len', forms.value)
  
  const firstIndex = forms.value.length > 0 ? ((currentPage.value - 1) * rowPerPage.value) + 1 : 0
  const lastIndex = forms.value.length + ((currentPage.value - 1) * rowPerPage.value)

  return `Showing ${firstIndex} to ${lastIndex} of ${totalForms.value} entries`
})

// 👉 Form status variant resolver
const resolveFormStatusVariant = (status: number) => {
  
  if (status >= 200 && status < 300) {
    return 'success'; 
  } else if (status >= 300 && status < 400) {
    return 'warning'; 
  } else if (status >= 400 && status < 500) {
    return 'error';
  } else {
    return 'primary'; 
  }
}
const totalTool = (tools) => {
  var total = 0
  
  for(var i = 0; i<tools.length; i++){
    total += parseFloat(tools[i].cost)
  }
  
  return total
}



const arrCheck = ref([])
const _allCheck = ref(false)


const allCheck = () => {
  if(_allCheck.value){
    arrCheck.value = forms.value
    forms.value.map( form => form.check = true )
  }else{
    arrCheck.value = []
    forms.value.map( form => form.check = false )
  }
}
const oneCheck = (form) => {
  _allCheck.value = false
  
  var index = arrCheck.value.findIndex(x => x.id == form.id)
  if(index>=0){
    delete arrCheck.value[index]
    arrCheck.value = arrCheck.value.filter(Boolean)
  }else{
    arrCheck.value.push(form)
  }
}


const deleteCheck = () => {
  _allCheck.value = false
  
  arrCheck.value.map( (form, num) => {
    //forms
    var index = forms.value.findIndex(x => x.id == form.id)
    if(index>=0){
      delete forms.value[index]
      forms.value = forms.value.filter(Boolean)
    }
    //check
    delete arrCheck.value[num]
    arrCheck.value = arrCheck.value.filter(Boolean)
    
  })
}
</script>
<template>
  <h4><span>Teams</span></h4>
  <VCard
    v-if="forms"
    id="invoice-list"
  >
    <VCardText class="d-flex align-center flex-wrap gap-4">
      <!-- 👉 Rows per page -->
      <div
        class="d-flex align-center"
        style="width: 135px;"
      >
        <span class="text-no-wrap me-3">Ver:</span>
        <VSelect
          v-model="rowPerPage"
          density="compact"
          :items="[10, 20, 30, 50]"
        />
      </div>

      <div class="me-3">
        <!-- 👉 Create form -->
        <VBtn
          prepend-icon="tabler-plus"
          :to="{ name: 'apps-form-add' }"
        >
        </VBtn>
      </div>
      
      <div v-if="arrCheck.length > 0">
        <VBtn @click="deleteCheck" color="error">
          Eliminar
        </VBtn>
      </div>

      <VSpacer />

      <div class="d-flex align-center flex-wrap gap-4">
        <!-- 👉 Search  -->
        <div class="invoice-list-filter">
          <VTextField
            v-model="searchQuery"
            placeholder="Buscar Formulario"
            density="compact"
          />
        </div>

        <!-- 👉 Select status -->
        <div class="invoice-list-filter">
          <VSelect
            v-model="selectedStatus"
            label="Seleccionar estado"
            clearable
            clear-icon="tabler-x"
            single-line
            :items="['Descargado', 'Borrador', 'Enviado', 'Pagado', 'Pago parcial', 'Vencido']"
          />
        </div>
      </div>
    </VCardText>

    <VDivider />

    <!-- SECTION Table -->
    <VTable class="text-no-wrap invoice-list-table">
      <!-- 👉 Table head -->
      <thead class="text-uppercase">

        <tr>
          <th scope="col">
            <VCheckbox @change="allCheck" v-model="_allCheck" label=""></VCheckbox>
          </th>
          
          <th scope="col">
            TEAMS
          </th>
          
          <th scope="col">
            #ID
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
            PAY
          </th>

          <th scope="col">
            ACTIONS
          </th>
        </tr>
      </thead>

      <!-- 👉 Table Body -->
      <tbody>
        <tr
          v-for="form in forms"
          :key="form.id"
          style="height: 3.75rem;"
        >
          <td>
            <VCheckbox @change="oneCheck(form)" v-model="form.check" label=""></VCheckbox>
          </td>
          
          <!-- 👉 Client Avatar and Email -->
          <td>
            <RouterLink :to="{ name: 'apps-form-preview-id', params: { id: form.id } }">
                <div class="d-flex align-center">
                  <VAvatar
                    size="34"
                    :color="resolveFormStatusVariant(form.status)"
                    variant="tonal"
                    color="black"
                    class="me-3"
                  >
                    <VImg
                      v-if="form.avatar"
                      :src="form.avatar"
                    />
                    <span v-else>{{ avatarText(form.info?.fullName) }}</span>
                  </VAvatar>
    
                  <div class="d-flex flex-column">
                    <h6 class="text-base font-weight-medium mb-0">
                      {{ form.info?.fullName }}
                    </h6>
                    <span class="text-disabled text-sm">
                      {{ form.info?.email }}
                    </span>
                  </div>
                </div>
              </RouterLink>
          </td>
          
          
          <!-- 👉 Date -->
          <td class="cursor-pointer" >
            <RouterLink :style="{color: 'black' }"
              :to="{ name: 'apps-form-preview-id', params: { id: form.id } }">
              <span >#{{ form.id }}</span>
              <div class="d-flex gap-2">
                <VChip label size="small" :color="resolveFormStatusVariant(form.status)">
                  {{ form.tools.length }} TOOL
                </VChip>
                <VChip label size="small" :color="resolveFormStatusVariant(form.status)">
                  {{ timeAgo(form.issuedDate) }}
                </VChip>
              </div>
            </RouterLink>
          </td>
          
          <!-- 👉 total -->
          <td class="text-center">
            ${{ totalTool(form.tools) }}
          </td>


          <!-- 👉 Paynment -->
          <td class="text-center">
            <VChip label size="small" :color="resolveFormStatusVariant(form.status)">
              {{timeAgo(form.payDate)}}
            </VChip>
          </td>

          <!-- 👉 Actions -->
          <td style="width: 8rem;">

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
                <VList>
                  <VListItem :to="{ name: 'apps-form-preview-id', params: { id: form.id } }">
                    <VListItemTitle>Ver </VListItemTitle>
                  </VListItem>
                  
                  <VListItem :to="{ name: 'apps-form-edit-id', params: { id: form.id } }">
                    <VListItemTitle>Edit</VListItemTitle>
                  </VListItem>

                  <VListItem value="earse" @click="deleteForm(form.id)">
                    <VListItemTitle>Borrar</VListItemTitle>
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
            Datos no disponibles
          </td>
        </tr>
      </tfoot>
    </VTable>
    <!-- !SECTION -->

    <VDivider />

    <!-- SECTION Pagination -->
    <VCardText class="d-flex align-center flex-wrap gap-4 py-3">
      <!-- 👉 Pagination meta -->
      <span class="text-sm text-disabled">
        {{ paginationData }}
      </span>

      <VSpacer />

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
#invoice-list {
  .invoice-list-actions {
    inline-size: 8rem;
  }

  .invoice-list-filter {
    inline-size: 12rem;
  }
}
</style>