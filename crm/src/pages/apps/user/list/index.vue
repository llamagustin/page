<script setup lang="ts">
import '@fullcalendar/core/vdom' // solves problem with Vite
// import { cities, codes, provinces } from "@/@fake-db/data/address.ts";
import type { UserProperties } from '@/@fake-db/types'
import AddNewUserDrawer from '@/views/apps/user/list/AddNewUserDrawer.vue'
import { avatarText} from '@core/utils/formatters'
import { blankEvent, } from '@/views/apps/calendar/useCalendar'
import { useCalendarStore } from '@/views/apps/calendar/useCalendarStore'
import { useFormStore } from '@/views/apps/form/useFormStore'
import UserEventHandler from '@/views/apps/user/list/UserEventHandler.vue'
import { useUser } from '@/views/apps/user/useUser'
import { useUserListStore } from '@/views/apps/user/useUserListStore'
import { useRouter } from 'vue-router'


// GET UBIGEO
// import { useUbigeo } from "@/shared/composables/useUbigeo"
// const { getCities, getCodes } = useUbigeo()


const router = useRouter()

const {
    currentPage,
    totalPage,
    searchQuery,
    selectedPlan,
    selectedStatus,
    selectedSource,
    totalUsers,
    users,
    planUser,
    statusUser,
    leadUser,
    isClient,
    resolveUserStatusVariant,
    isUserHandlerSidebarActive,
    userColor,
    fetchUsers,
    fetchUser,
    addUser,
    updateUser,
    sourceUser,
    removeUser,
    userListMeta
} = useUser()

const storeCalendar = useCalendarStore();

const storeForm = useFormStore();
const storeUser = useUserListStore();


let userData = JSON.parse(localStorage.userData);
const searchString = ref('')
// const colorStatus={ 1:'warning', 2:'success', 3:'error' }


const rowPerPage = ref(10)
const selectedUser=ref();

const editUser = (user) => {
  const leadId = user.id;
  storeCalendar.leadId = leadId;
  selectedUser.value = user;
  isUserHandlerSidebarActive.value = true;
}

const event = ref(structuredClone(blankEvent))

const addEvent= async (data)=>{
  await storeCalendar.addEvent(data);
}

// const provincias = provinces.reduce((obj, item) => {
//   obj[item.value] = item.title;
//   return obj;
// }, {})

// const ciudades = cities.reduce((obj, item) => {
//   obj[item.value] = item.title;
//   return obj;
// }, {})

watch(selectedUser, (val) => {
  console.log('val', val)
})

watch(searchString,(val)=>{
  fetchUsers({q:val});
})

// watch(metaUser,(val)=>{
//   if(val){
//     let total= val.Total
//     for (var i = 0; i < userListMeta.value.length; i++) {
//       let item=userListMeta.value[i];
//       item.stats=val[item.subtitle] || 0;
//       item.percentage = ((item.stats / total)*100).toFixed(2);
      
//       if(isNaN(item.percentage)) item.percentage=0;
      
//     }
//   }
// })

watch(selectedStatus,val=>{ fetchUsers() })
watch(selectedPlan,val=>{ fetchUsers() })
watch(selectedSource,val=>{fetchUsers()})


isClient.value=true;

fetchUsers()



const goUser = (userId) => {
    var abilities = JSON.parse(localStorage.getItem('userAbilities') || '{}')
    // var manage = abilities.find(x => x.action === 'manage') || false
    var manage = abilities?.action == 'manage' ? true : false
    
    if(manage){
      router.push({ name: 'apps-user-view-id', params: { id: userId } })
    }else{
      editUser(user)
    }
}


//
const createPayment = (user) => {
  var data = {
    // id
    ref: 'ref123',
    client_id: user.id,
    user_id: user.id,
    service: 'subencionate',
    total: 0,
    note: 'Create automatic for subvencionate service',
    tools: [{
      "tag": "ecommerce", 
      "cost": "100", 
      "hours": 1, 
      "title": "App Design", 
      "description": "Designed UI kit & app pages."
    }],
    info: {
      "city": "", 
      "line": "", 
      "fullName": ""
    },
    dueDate: new Date(),
    issuedDate: new Date(),
    payDate: new Date(),
    status: 200,
    paymentMethod: {}
  }
  

  storeForm.updateForm(data).then(res => {
    console.log('res', res)
    
    router.push('/apps/form/preview/' + res.data.id)
  }).catch(err => {
    console.log('e', err)
  })
}


const createMethod = () => {
  //send email create token
  var data = {
    email: 'info@aythen.com',
    subject: 'Inserta tus metodos de pago para continuar',
    data: {
      id: '2',
      fullName: 'Juan Carlos',
      date: '12/12/12'
    }
  }
  
  storeUser.sendMethodPayment(data)
  .then(res => {
    console.log('res', res)
  })
}

  const paginationData = computed(() => {
    const firstIndex = users.value.length ? ((currentPage.value - 1) * rowPerPage.value) + 1 : 0
    const lastIndex = users.value.length + ((currentPage.value - 1) * rowPerPage.value)
    return `Mostrando ${firstIndex} de ${lastIndex} de ${totalPage.value} valores`
  })
// const paginationData = ref("Mostrando 1 de 1 de 1 valores");
// const currentPage = ref(1);
// const totalPage = ref(1);
</script>

<template>
  <div>
    <!-- 👉 Estadisticas -->
    <VRow>
  
      <VCol v-for="(meta, index) in userListMeta" :key="index" cols="12" sm="3" >
        <VCard>
          <VCardText class="d-flex justify-space-between">
            <div>
              <div class="d-flex align-center gap-2 my-1">
                <h6 class="text-h6">
                  {{ meta.stats }}
                </h6>
                <span v-show="meta.subtitle != 'Total'" :class="'text-' + meta.color">({{ meta.percentage || 0 }}%)</span>
              </div>
              <span>{{ meta.subtitle }}</span>
            </div>

            <VAvatar
              rounded
              variant="tonal"
              :color="meta.color"
              :icon="meta.icon"
            />
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12">
        <VCard >
          <!-- 👉 Filters -->
          
           <VCardText class="d-flex flex-wrap py-4 gap-4">
             <VRow justify="end">
               <VCol cols="9">
                 <h3>Filtro de búsqueda</h3>
               </VCol>
               <VCol cols="3">
                 <VSelect class="mr-4" v-model="selectedSource" label="Source" :items="sourceUser" clearable clear-icon="tabler-x" />
                </VCol>
             </VRow>
          </VCardText>
          
          <VCardText class="d-flex flex-wrap py-4 gap-4">
            <VRow>
              <VCol col="4">
                <div class="app-user-search-filter">
                  <VTextField v-model="searchString" placeholder="Buscar" density="compact"  />
                </div>
              </VCol>
              <VCol col="4">
                <VSelect v-model="selectedPlan" label="Plan" :items="planUser" clearable clear-icon="tabler-x" />
              </VCol>
              <VCol col="4">
                <VSelect v-model="selectedStatus" label="Status" :items="statusUser" clearable clear-icon="tabler-x" />
              </VCol>
            </VRow>
          </VCardText>

          <VDivider />

          <VTable class="text-no-wrap">
            <!-- 👉 table head -->
            <thead>
              <tr>
                <th scope="col"> RESELLER </th>
                <th scope="col"> USUARIO </th>
                <th scope="col"> CONTACTO </th>
                <th scope="col"> DIRECCION </th>
              </tr>
            </thead>
            <!-- 👉 table body -->
            <tbody>
              <tr v-for="user in users" :key="user.id" style="height: 3.75rem;" >
                <!-- 👉 Reseller -->
                <td>
                  <div v-if="user.reseller.length">
                    <h6>
                      <span class="text-capitalize text-base font-weight-semibold cursor-pointer">
                        {{ user.reseller[0].name }}
                      </span>
                    </h6>
                    <VChip :color="resolveUserStatusVariant(user.status)" label size="small">
                      0
                      eventos
                    </VChip>
                  </div>
                  <div v-else>
                    <VChip color="error" label size="small">
                      -
                    </VChip>
                  </div>
                </td>
                
                <!-- 👉 User -->
                <td>
                  <div class="d-flex align-center">
                    <VAvatar variant="tonal" class="me-3" size="38" :color="resolveUserStatusVariant(user.status)">
                      <VImg v-if="user.avatar" :src="user.avatar" />
                      <span v-else-if="typeof user.name.name == 'string'">{{ avatarText(user.name.name) }}</span>
                      <!--<span v-else>{{ avatarText(user.name.name) }}</span>-->
                    </VAvatar>

                    <div class="d-flex flex-column">
                      <h6 class="text-base cursor-pointer elipsis">
                        <div v-if="user.name?.name" @click="goUser(user.id)" class="elipsis">
                          {{ user.name?.name }} {{ user.name?.firstSurname }} {{ user.name?.secondSurname }}
                        </div>
                        <div v-else class="elipsis">
                          {{ user.company }}
                        </div>
                      </h6>
                      <div class="d-flex flex-wrap">
                        <div v-if="user.carddetails?.length">
                          <VBtn @click="createPayment(user)" size="x-small" variant="tonal" :color="resolveUserStatusVariant(user.status)">
                            Facturar
                          </VBtn>
                        </div>
                        <div v-else>
                          <div class="d-flex flex-column">
                            <VBtn @click="createMethod(user)" size="x-small" variant="tonal" :color="resolveUserStatusVariant(user.status)">
                              Método de pago
                            </VBtn>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>

                <!-- 👉 Address -->
                <td>
                  <h6>
                    <span class="text-capitalize text-base font-weight-semibold">{{ user.address.province }}</span>
                  </h6>
                  <VChip label size="small" class="text-capitalize" :color="resolveUserStatusVariant(user.status)">
                    {{ user.address?.zip }} - {{user.address?.city}}
                  </VChip>
                </td>
                
                <!-- 👉 Contact -->
                <td>
                  <div v-if="user.phone" class="d-flex gap-2 text-base">
                    <VBtn :href="`/apps/chat?id=${user.id}`" variant="text" :color="resolveUserStatusVariant(user.status)" size="xx-small" icon>
                      <VIcon icon="tabler-phone"></VIcon>
                    </VBtn>
                    <span class="text-base">{{ user.phone }}</span>
                  </div>
                  <div v-if="user.email" class="d-flex gap-2 text-base elipsis">
                    <VBtn :href="`/apps/email?to=${user.email}`" variant="text" :color="resolveUserStatusVariant(user.status)" size="xx-small" icon>
                      <VIcon icon="tabler-mail"></VIcon>
                    </VBtn>
                    <span class="text-base elipsis">{{ user.email }}</span>
                  </div>
                </td>
              
              </tr>
            </tbody>

            <!-- 👉 table footer  -->
            <tfoot v-show="users && !users.length">
              <tr>
                <td
                  colspan="7"
                  class="text-center"
                >
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
        </VCard>
      </VCol>
    </VRow>

    <!-- 👉 Add New User -->
    <UserEventHandler
      v-model:isDrawerOpen="isUserHandlerSidebarActive"
      :event="event"
      v-model:user="selectedUser"
      @add-user="addUser"
      @updateUser="updateUser"
      @remove-user="removeUser"
      @addEvent="addEvent"
    />
    
    </div>
</template>

<style lang="scss">
/*.app-user-search-filter {*/
/*  inline-size: 31.6rem;*/
/*}*/

/*.text-capitalize {*/
/*  text-transform: capitalize;*/
/*}*/

/*.user-list-name:not(:hover) {*/
/*  color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));*/
/*}*/
  .elipsis {
    display: block;
    max-width: 240px;
    white-space: nowrap; /* Evita que el texto se divida en varias líneas */
    overflow: hidden; /* Oculta el texto que desborda el contenedor */
    text-overflow: ellipsis; /* Añade elipsis al final del texto que desborda */
  }
</style>
