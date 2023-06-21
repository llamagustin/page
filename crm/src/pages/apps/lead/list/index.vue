<script setup lang="ts">
  import '@fullcalendar/core/vdom' // solves problem with Vite
  // import { cities, codes, provinces } from "@/@fake-db/data/address.ts";
  import type { UserProperties } from '@/@fake-db/types'
  import AddNewUserDrawer from '@/views/apps/user/list/AddNewUserDrawer.vue'
  import { avatarText } from '@core/utils/formatters'
  import { blankEvent, } from '@/views/apps/calendar/useCalendar'
  import { useCalendarStore } from '@/views/apps/calendar/useCalendarStore'
  import { useCalendar } from '@/views/apps/calendar/useCalendar'
  import { useUser } from '@/views/apps/user/useUser'
  import UserEventHandler from '@/views/apps/user/list/UserEventHandler.vue'

  import { useRouter } from 'vue-router'
  const router = useRouter()
  
  
  // import { useUbigeo } from "@/shared/composables/useUbigeo"
  // const { getCities, getCodes } = useUbigeo()

  const {
    currentPage,
    totalPage,
    searchQuery,
    selectedPlan,
    selectedStatus,
    totalUsers,
    users,
    planUser,
    statusUser,
    statusLead,
    isClient,
    resolveUserStatusVariant,
    isUserHandlerSidebarActive,
    userColor,
    fetchUsers,
    fetchUser,
    addUser,
    updateUser,
    removeUser,
    metaUser,
    selectedUser,
    userListMeta
  } = useUser()
  
  
  // const selectedUser = ref();
  const storeCalendar = useCalendarStore();
  
  
  const { 
    addEvent,
  } = useUser()
  
  
  


  let userData = JSON.parse(localStorage.userData);
  const searchString = ref('')

  // 👉 List
  // const userListMeta = ref([{
  //     icon: 'tabler-user',
  //     color: 'primary',
  //     stats: '0',
  //     percentage: 0,
  //     subtitle: 'Total',
  //   },
  //   {
  //     icon: 'tabler-user-check',
  //     color: 'success',
  //     stats: '0',
  //     percentage: 0,
  //     subtitle: 'Aceptados',
  //   },
  //   {
  //     icon: 'tabler-user-exclamation',
  //     color: 'warning',
  //     stats: '0',
  //     percentage: 0,
  //     subtitle: 'Pendientes',
  //   },
  //   {
  //     icon: 'tabler-user-plus',
  //     color: 'error',
  //     stats: '0',
  //     percentage: 0,
  //     subtitle: 'Cancelados',
  //   },
  // ])



  const editUser = (user) => {
    const leadId = user.id;
    storeCalendar.leadId = leadId;
    selectedUser.value = user;
    isUserHandlerSidebarActive.value = true;
  }


  const event = ref(structuredClone(blankEvent))

 

  // const provincias = provinces.reduce((obj, item) => {
  //   obj[item.value] = item.title;
  //   return obj;
  // }, {})

  // const ciudades = cities.reduce((obj, item) => {
  //   obj[item.value] = item.title;
  //   return obj;
  // }, {})

  // watch(searchString, (val) => {
  //   fetchUsers({ q: val });
  // })


  // watch(selectedStatus, val => { fetchUsers() })
  // watch(selectedPlan, val => { fetchUsers() })

  isClient.value = false;

  fetchUsers()



  const goUser = (userId) => {
    // var abilities = JSON.parse(localStorage.getItem('userAbilities'))
    // var manage = abilities.find(x => x.action === 'manage') || false
    var abilities = JSON.parse(localStorage.getItem('userAbilities'))
    var manage = abilities.action == 'manage' ? 'manage' : 'reseller'
    
    
  
    if(manage == 'manage') {
      router.push({ name: 'apps-user-view-id', params: { id: userId } })
    }else {
      editUser(user)
    }
  }
  
  
  
  
  
const totalTool = (tools) => {
  var total = 0
  
  for(var i = 0; i<tools.length; i++){
    total += parseFloat(tools[i].cost)
  }
  
  return total
}


  
const contactAgo = (contact) => {
  console.log('cc', contact)
  var date = new Date()
  
  for(var i = 0; i<contact.length; i++){
    
  }
  

  return timeAgo(date)
}

//
const calling = ref(false)

const openTwilio = (user) => {
  // const leadId = user.id;
  // storeCalendar.leadId = leadId;
  // selectedUser.value = user;
  // isUserHandlerSidebarActive.value = true;
    
  const leadId = user.id;
  storeCalendar.leadId = leadId;
  selectedUser.value = user;
    
  isUserHandlerSidebarActive.value = true;
  calling.value = true
}
</script>


<template>
  <div>
    <!-- 👉 Estadisticas -->
    calling
    {{calling}}
    <VRow>
      <VCol v-for="(meta, index) in userListMeta" :key="index" cols="12" sm="3" lg="3">
        <VCard>
          <VCardText class="d-flex justify-space-between">
            <div>
              <div class="d-flex align-center gap-2 my-1">
                <h6 class="text-h6">
                  {{ meta.stats }}
                </h6>
                <span  :class="'text-' + meta.color">({{ meta.percentage || 0 }}%)</span>
              </div>
              <span>{{ meta.subtitle }}</span>
            </div>

            <VAvatar rounded variant="tonal" :color="meta.color" :icon="meta.icon" />
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12">
        <VCard title="Filtro de búsqueda">
          <!-- 👉 Filters -->
          <VCardText class="d-flex flex-wrap py-4 gap-4">
            <VRow>
              <VCol cols="4">
                <div class="app-user-search-filter">
                  <VTextField v-model="searchQuery" placeholder="Buscar" density="compact" />
                </div>
              </VCol>
              <VCol cols="4">
                <VSelect v-model="selectedPlan" label="Plan" :items="planUser" clearable clear-icon="tabler-x" />
              </VCol>
              <VCol cols="4">
                <VSelect v-model="selectedStatus" label="Status" :items="statusLead" clearable clear-icon="tabler-x" />
              </VCol>
            </VRow>
          </VCardText>

          <VDivider />

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
              <tr v-for="user in users" :key="user.id" style="height: 3.75rem;">

                <!-- 👉 User -->
                <td >
                  <div @click="editUser(user)" class="d-flex align-center cursor-pointer ">
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
    <!--:event="event" -->
    <UserEventHandler 
      v-model:isDrawerOpen="isUserHandlerSidebarActive" 
      v-model:user="selectedUser" 
      v-model:calling="calling"
      availableCall="'true'"
      @add-user="addUser" 
      @updateUser="updateUser" 
      @remove-user="removeUser" 
      @addEvent="addEvent" />

  </div>
</template>

<style lang="scss">
.app-user-search-filter {
    inline-size: 100%;
    
    input{
      margin: 0px !important;  
    }
}


.elipsis {
    display: block;
    max-width: 240px;
    white-space: nowrap; /* Evita que el texto se divida en varias líneas */
    overflow: hidden; /* Oculta el texto que desborda el contenedor */
    text-overflow: ellipsis; /* Añade elipsis al final del texto que desborda */
}

  /*.app-user-search-filter {*/
  /*  inline-size: 31.6rem;*/
  /*}*/

  /*.text-capitalize {*/
  /*  text-transform: capitalize;*/
  /*}*/

  /*.user-list-name:not(:hover) {*/
  /*  color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));*/
  /*}*/
</style>
