<script setup lang="ts">
// import type { Form } from '@/@fake-db/types'
import { useFormStore } from '@/views/apps/form/useFormStore'
import { avatarText } from '@core/utils/formatters'

import { timeAgo } from '@/shared/utils/date'


// 👉 Store
import { sessionStore } from '@/shared/utils/sessionStore.ts'
// const { local } = sessionStore('form')
import { useEmailStore } from '@/views/apps/email/useEmailStore'


const storeEmail = useEmailStore()


// 👉 Store
const formListStore = useFormStore()

const searchQuery = ref('')
const selectedStatus = ref('')
const rowPerPage = ref(10)
const currentPage = ref(1)
const totalPage = ref(1)
const totalForms = ref(0)
const forms = ref([])
const selectedRows = ref([])


const userData = JSON.parse(localStorage.getItem('userData'))

const fetchsForms = () => {
  formListStore.fetchForms(userData.id, {
      q: searchQuery.value,
      status: selectedStatus.value,
      perPage: rowPerPage.value,
      currentPage: currentPage.value,
    },
  ).then(response => {
    console.log('res forms', response)
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
  
// 👉 Fetch Forms
// watchEffect(() => {
  
// })

// 👉 watching current page
// watchEffect(() => {
//   if (currentPage.value > totalPage.value)
//     currentPage.value = totalPage.value
// })

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
    
    
    // formListStore.fetchForms({
    //     q: searchQuery.value,
    //     status: selectedStatus.value,
    //     perPage: rowPerPage.value,
    //     currentPage: currentPage.value,
    //   },
    // ).then(response => {
    //   delete arrCheck.value[index]
    //   arrCheck.value = arrCheck.value.filter(Boolean)
    // }).catch(error => {
    //   console.log(error)
    // })
  })
}

// 👉 AuctionInvoice
import AuctionInvoice from '@/views/apps/auction/AuctionInvoice.vue'
const isAuctionInvoiceVisible = ref(false)

const auctionData = ref()

const openAuction = (auction) => {
  isAuctionInvoiceVisible.value = true
  auctionData.value = auction
}


//
const loadSend = ref(false)

const sendAuctionInvoice = async () => {
  var currentMessage = 'message invoice'
  
  if(loadSend.value) return
  loadSend.value = true
  
  const data = {
    sender: 'info@aythen.com',
    recipient: 'info@aythen.com',
    subject: 'Factura Recibida',
    body_html: currentMessage,
    email: {
      user_id: 'ec6865dc-e2ca-4e53-b044-6123b224ed49',
      to: 'info@aythen.com',
      from: {
        email: 'info@aythen.com',
        name: 'Aythen no-reply',
        // avatar: props.userData.avatar
      },
      subject: 'Factura Recibida',
      cc: [],
      bcc: [],
      message: currentMessage,
      attachments: [],
      isStarred: false,
      labels: [],
      time: Date.now(),
      replies: [],
      folder: 'sent',
      isRead: true,
      isDeleted: false,
      isOpen: 400,
      status: 1
    }
  }

  // var abilities = JSON.parse(localStorage.getItem('userAbilities'))
  // var manage = abilities?.action == 'manage' ? true : false
  // if(manage) data.email.status = 1
  
  var result = await storeEmail.saveEmail(data.email)
  await storeEmail.sendEmail(result.data)
  
  isAuctionInvoiceVisible.value = true
  loadSend.value = false
  // resetValues()
}

</script>

<template>
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
            CLIENTE
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
      <tbody v-if="forms">
        <tr
          v-for="form in forms"
          :key="form.id"
          style="height: 3.75rem;"
        >
          <td>
            <VCheckbox 
              @change="oneCheck(form)" 
              v-model="form.check" 
              label=""/>
          </td>
          
          <!-- 👉 Client Avatar and Email -->
          <td>
              <div class="d-flex align-center" @click="openAuction(form)">
                <VAvatar
                  size="34"
                  :color="resolveFormStatusVariant(form.status)"
                  variant="tonal"
                  class="me-3"
                >
                  <VImg
                    v-if="form.avatar"
                    :src="form.avatar"
                  />
                  <span v-else> fullname </span>
                </VAvatar>
  
                <div class="d-flex flex-column">
                  <h6 class="text-base font-weight-medium mb-0">
                    name
                  </h6>
                  <span class="text-disabled text-sm">
                    email
                  </span>
                </div>
              </div>
          </td>
          
          <!-- 👉 total -->
          <td class="text-center">
            total
          </td>


          <!-- 👉 Paynment -->
          <td class="text-center">
            <VChip label size="small" :color="error">
              paydate
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
                  <VListItem>
                    <VListItemTitle>Ver </VListItemTitle>
                  </VListItem>
                  
                  <VListItem >
                    <VListItemTitle>Edit</VListItemTitle>
                  </VListItem>

                  <VListItem value="earse" >
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
    
  
     <!--👉 Auction -->
    <VDialog
      v-model="isAuctionInvoiceVisible"
      width="800"
    >
        <VCard>
          <VProgressLinear
            v-if="loadSend"
            color="primary"
            indeterminate
            reverse
          />
          <VCardText class="d-flex justify-end gap-2">
            <VBtn 
              color="error"
              @click="isAuctionInvoiceVisible = false">
              Cancel
            </VBtn>
            <VBtn @click="sendAuctionInvoice">
              Enviar
            </VBtn>
          </VCardText>
          
          <AuctionInvoice />
        </VCard>
    </VDialog>
    
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
