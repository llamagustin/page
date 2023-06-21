<script setup lang="ts">
  import flag from '@/assets/flagSpain.svg'
  import { timeAgo } from '@/shared/utils/date'
  import { watch, ref, computed, watchEffect } from 'vue';
  
  // import '@fullcalendar/core/vdom' // solves problem with Vite
  // import { cities, codes, provinces } from "@/@fake-db/data/address.ts";
  // import type { UserProperties } from '@/@fake-db/types'
  // import AddNewUserDrawer from '@/views/apps/user/list/AddNewUserDrawer.vue'
  import { avatarText } from '@core/utils/formatters'
  // import { blankEvent, } from '@/views/apps/calendar/useCalendar'
  // import { useAdStore } from '@/views/apps/calendar/useCalendarStore'

  import { useAd } from '@/views/apps/ad/useAd'
  import { useAdListStore } from '@/views/apps/ad/useAdListStore'
  import { useRouter } from 'vue-router'
  import { cloneDeep } from 'lodash'
  import { useAccountListStore } from '@/views/apps/account/useAccountListStore'
    
  // GET UBIGEO
  import { useUbigeo } from "@/shared/composables/useUbigeo"
  const { ubigeo, getCities, getCodes } = useUbigeo()


  // 👉 AdDrawer
  import AdDrawer from '@/views/apps/ad/list/AdDrawer.vue'
  const isAdDrawerVisible = ref(false)

  const accountListStore = useAccountListStore()
  const router = useRouter()

  const {
    selectedProvince,
    selectedCity,

    currentPage,
    totalPage,
    rowPerPage,
    searchQuery,
    selectedBudget,
    selectedStatus,
    totalAds,
    ads,
    statusAd,
    resolveAdStatusVariant,
    isAdHandlerSidebarActive,
    fetchAds,
    fetchAd,
    addAd,
    updateAd,
    removeAd,
    adListMeta,
    
  } = useAd()
  
  const adListForm = useAdListStore();
  const adData = ref(adListForm.ad)
  
  const paginationData = computed(() => {
    const firstIndex = ads.value.length ? ((currentPage.value - 1) * rowPerPage.value) + 1 : 0
    const lastIndex = ads.value.length + ((currentPage.value - 1) * rowPerPage.value)
    return `Mostrando ${firstIndex} de ${lastIndex} de ${totalPage.value} valores`
  })
  
  //check
  const check=ref()
  
  function formatCurrency(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M€';
    }
    else if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'K€';
    }
    else {
      return num.toString();
    }
  }



  // let userData = JSON.parse(localStorage.userData);

  // const colorStatus={ 1:'warning', 2:'success', 3:'error' }



  // const selectedUser=ref();

  // const editUser = (user) => {
  //   const leadId = user.id;
  //   storeCalendar.leadId = leadId;
  //   selectedUser.value = user;
  //   isUserHandlerSidebarActive.value = true;
  // }

  // const event = ref(structuredClone(blankEvent))

  // const addEvent= async (data)=>{
  //   await storeCalendar.addEvent(data);
  // }

  // const provincias = provinces.reduce((obj, item) => {
  //   obj[item.value] = item.title;
  //   return obj;
  // }, {})

  // const ciudades = cities.reduce((obj, item) => {
  //   obj[item.value] = item.title;
  //   return obj;
  // }, {})

  // watch(selectedUser, (val) => {
  //   console.log('val', val)
  // })


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


  //


  // watch(selectedProvince, val => { fetchAds() })
  
  watch(selectedCity, val => { fetchAds() })

  watch(selectedProvince, val => {
    getCities(val)
    fetchAds()
  })


  //
  watch(searchQuery, val => fetchAds())
  watch(selectedStatus, val => { fetchAds() })

  //
  const editAd = (ad) => {
    isAdDrawerVisible.value = true
    adData.value = cloneDeep(ad)
  }

  // fetchAds()
  //
  function extractDomain(url) {
    url = url.replace(/^(http:\/\/|https:\/\/)/, '');
    url = url.replace(/\/(.*)/, '');
    url = decodeURIComponent(url);

    var domainParts = url.split('.');
    var domain = domainParts[domainParts.length - 2] + '.' + domainParts[domainParts.length - 1];
    var subdomain = '';

    if (domainParts.length > 2) {
      for (var i = 0; i < domainParts.length - 2; i++) {
        subdomain += domainParts[i];
        if (i < domainParts.length - 3) {
          subdomain += '.';
        }
      }
      subdomain += '.';
    }
    return 'https://' + subdomain + domain;
  }
  
  const edit = ref(false);
  
  async function handleSubmit(payload) {
    try {
      await adListForm.updateAd(payload);
      fetchAds()
    } catch (e) {console.error(e)}
    console.log('Add');
  }
  
  function deleteAd() {
    console.log('Add')
  }
  
  const modalForm = ref(false);
  const dialogm1 = ref([]);
  const desserts = [{
      name: 'Frozen Yogurt',
      calories: 159,
    },
    {
      name: 'Ice cream sandwich',
      calories: 237,
    },
    {
      name: 'Eclair',
      calories: 262,
    },
    {
      name: 'Cupcake',
      calories: 305,
    },
    {
      name: 'Gingerbread',
      calories: 356,
    },
    {
      name: 'Jelly bean',
      calories: 375,
    },
    {
      name: 'Lollipop',
      calories: 392,
    },
    {
      name: 'Honeycomb',
      calories: 408,
    },
    {
      name: 'Donut',
      calories: 452,
    },
    {
      name: 'KitKat',
      calories: 518,
    },
  ];
  
  const filterQuery = ref("");
  const accountPerPage = ref(10);
  const accountCurrentPage = ref(1);
  const totalPageAccounts = ref(0);
  const totalAccounts = ref(0);
  const accounts = ref([]);
  
  const fetchAccounts = () => {
    let filters = {
      q: filterQuery.value,
      perPage: accountPerPage.value,
      currentPage: accountCurrentPage.value
    }
    accountListStore.fetchAccounts(filters).then(response => {
      accounts.value = response.data.accounts
      totalPageAccounts.value = response.data.totalPage
      totalAccounts.value = response.data.totalAccounts
    }).catch(error => {
      console.error(error)
    })
  }
  
  watchEffect(fetchAccounts)
  
  const resellersIds = ref([]);
  
  function assignResellersHandleClick(payload) {
    modalForm.value = true;
    console.log(payload)
  }
  
  function assignHandleClick() {
    let payload = resellersIds.value.map((id) => ({ id }))
    console.log(payload)
    // alert(payload)
  }
</script>

<template>
  <div>
    <!-- 👉 Estadisticas -->
    <VRow>
      <VCol v-for="(meta, index) in adListMeta" :key="index" cols="12" sm="3">
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
            <VAvatar rounded variant="tonal" :color="meta.color" :icon="meta.icon" />
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12">
        <VCard>
          <!-- 👉 Filters -->
          <VCardText class="d-flex flex-wrap py-4 gap-4">
            <div class="d-flex items-center">
              <img :src="flag" :style="{width: '20px', height: '20px'}" />
              <strong class="ms-2">España</strong>
            </div>
            <div class="ml-auto">
              <h3>Filtro de búsqueda</h3>
            </div>
          </VCardText>

          <VCardText class="d-flex flex-wrap py-4 gap-4">
            <VRow>
              <VCol cols="3">
                <VAutocomplete label="Provincia" v-model="selectedProvince" :items="ubigeo.provinces" item-value="value" clear-icon="tabler-x" autocomplete="none" clearable />
              </VCol>
              <VCol cols="4" v-if="!!selectedProvince">
                <VAutocomplete label="Ciudad" v-model="selectedCity" :items="ubigeo.cities" item-value="title" clearable clear-icon="tabler-x" autocomplete="none" />
              </VCol>
              <VCol col="4">
                <div class="app-user-search-filter">
                  <VTextField v-model="searchQuery" placeholder="Buscar" density="compact" />
                </div>
              </VCol>
              <VCol col="4">
                <VSelect v-model="selectedStatus" label="Status" :items="statusAd" clearable clear-icon="tabler-x" />
              </VCol>
            </VRow>
          </VCardText>

          <VDivider />

          <VTable class="text-no-wrap" hover>
            <!-- 👉 table head -->
            <thead>
              <tr>
                <th scope="col" width="60"></th>
                <th scope="col" width="40"></th>
                <th scope="col">USUARIO</th>
                <th scope="col" width="60"></th>
              </tr>
            </thead>
            <!-- 👉 table body -->
            <tbody>
              <tr v-for="ad in ads" @dblclick="editAd(ad)" :key="ad.id" style="height: 3.75rem;" class="cursor-pointer">
                <td class="text-center">
                  <VBtn icon size="x-small" color="primary" variant="tonal" title="Editar" @click="editAd(ad)">
                    <VIcon size="22" icon="tabler-edit" />
                  </VBtn>
                </td>
                <!--CHECK-->
                <td scope="col">
                  <VCheckbox 
                    v-model="_check"
                    @change="check" 
                    label="" />
                </td>
                <!-- 👉 User -->
                <td>
                  <div class="d-flex align-center">
                    <VAvatar variant="tonal" class="me-3" size="38" :color="resolveAdStatusVariant(ad.status)">
                      <VImg v-if="ad.avatar" :src="ad.avatar" />
                      <span v-else-if="ad.company">{{ avatarText(ad.company) }}</span>
                      <!--<span v-else>{{ avatarText(user.name.name) }}</span>-->
                    </VAvatar>

                    <div class="d-flex flex-column">
                      <h6 class="d-flex gap-2 text-base cursor-pointer">
                        <div v-if="ad.name?.name">
                          {{ ad.name?.name }} {{ ad.name?.firstSurname }} {{ ad.name?.secondSurname }}
                        </div>
                        <div v-else>
                          {{ ad.company }}
                        </div>
                        <div v-if="ad.social || ad.budget" class="text-base" :style="{fontSize: '12px'}">
                          (
                          <span v-if="ad.social">{{ formatCurrency(ad.social) }}</span>
                          <span v-if="ad.social && ad.budget"> - </span>
                          <span v-if="ad.budget"> {{ formatCurrency(ad.budget) }}</span>
                          )
                        </div>
                      </h6>
                      <div class="d-flex gap-2">
                        <VChip label size="small" class="d-flex gap-2" :color="resolveAdStatusVariant(ad.status)">
                          <VIcon size="16" icon="tabler-affiliate" />
                          <VTooltip open-delay="500" location="top" activator="parent">
                            <span>{{ad.path}}</span>
                          </VTooltip>
                        </VChip>
                        <VChip v-if="ad.google" label size="small" class="d-flex gap-2" :color="resolveAdStatusVariant(ad.status)">
                          <VIcon size="16" icon="tabler-address-book" />
                          <VTooltip open-delay="500" location="top" activator="parent">
                            <span>{{ad.google}}</span>
                          </VTooltip>
                        </VChip>
                        <VChip v-if="ad.cif" label size="small" class="d-flex gap-2" :color="resolveAdStatusVariant(ad.status)">
                          {{ ad.cif }}
                        </VChip>
                        <VChip label size="small" class="text-capitalize gap-2" :color="resolveAdStatusVariant(ad.status)">
                          <span>
                            {{ad.entity.length}}
                          </span>
                          <VIcon icon="tabler-user" size="16"></VIcon>
                          <VTooltip open-delay="500" location="top" activator="parent">
                            <span v-for="entity in ad.entity">
                              {{entity.name}} <br>
                              <div>
                                <VIcon size="16" icon="tabler-apps" />
                                {{entity.charge.active}} &nbsp;&nbsp;
                                <VIcon size="16" icon="tabler-apps" />
                                {{entity.charge.inactive}} &nbsp;&nbsp;
                                <VIcon size="16" icon="tabler-apps" />
                                {{entity.charge.business}}
                              </div>

                            </span>
                          </VTooltip>
                        </VChip>
                        <VChip label size="small" class="d-flex gap-2" :color="resolveAdStatusVariant(ad.status)">
                          {{ad.tools.length}}
                          <VIcon size="16" icon="tabler-apps" />
                          <VTooltip open-delay="500" location="top" activator="parent">
                            <span v-for="tool in ad.tools">
                              {{tool}} <br>
                            </span>
                          </VTooltip>
                        </VChip>
                        <VChip v-if="ad.address?.province" label size="small" class="text-capitalize" :color="resolveAdStatusVariant(ad.status)">
                          {{ ad.address?.province }}
                        </VChip>
                        <VChip v-if="ad.constitutionAt" label size="small" :color="resolveAdStatusVariant(ad.status)">
                          {{ timeAgo(ad.constitutionAt) }}
                        </VChip>
                        <VChip v-if="ad.phone" label size="small" class="text-capitalize gap-2" :color="resolveAdStatusVariant(ad.status)">
                          <VIcon icon="tabler-phone" size="16"></VIcon>
                          <span>
                            {{ad.phone}}
                          </span>
                        </VChip>
                        <VChip v-if="ad.web" label size="small" class="gap-2" :color="resolveAdStatusVariant(ad.status)">
                          <VIcon icon="tabler-activity" size="16"></VIcon>
                          <span>
                            {{ extractDomain(ad.web) }}
                          </span>
                        </VChip>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <VBtn icon variant="text" color="default" size="x-small">
                    <VIcon :size="22" icon="tabler-dots-vertical" />
                    <VMenu activator="parent">
                      <VList>
                        <VListItem> <!--:to="{ name: 'apps-form-edit-id', params: { id: form.id } }-->
                          <VListItemTitle class="cursor-pointer" @click="assignResellersHandleClick(ad)">
                            <v-icon size="18" icon="tabler-arrows-left-right" class="mr-1"></v-icon>
                            Resellers
                          </VListItemTitle>
                        </VListItem>
                      </VList>
                    </VMenu>
                  </VBtn>
                </td>
              </tr>
            </tbody>

            <!-- 👉 table footer  -->
            <tfoot v-show="ads && !ads.length">
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
    
    <VDialog v-model="modalForm" class="modal-form">
      <VCard>
        <VCardTitle class="text-caption font-weight-bold text-success">ASIGNAR RESELLER(S)</VCardTitle>
        <VDivider />
        <VCardText class="text-caption">
          <v-text-field v-model="filterQuery" label="Buscador" class="mb-4" />
          <v-table density="compact" hover class="mb-4">
            <thead>
              <tr>
                <th width="20">
                  <v-icon icon="tabler-checkbox" size="24" class="text-primary"/>
                </th>
                <th class="text-left"> Nombres </th>
                <th class="text-left"> Contacto </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(account, index) in accounts" :key="account.id" class="cursor-pointer active">
                <td>
                  <v-checkbox v-model="resellersIds" :value="account.id" class="p-1 px-1"/>
                </td>
                <td class="text-caption">
                  <div style="line-height: 1;">
                    <!--<p>{{ account.id }}</p>-->
                    <p class="mb-0">{{ account.fullName }}</p>
                    <p class="mb-0 text-grey-400">{{ account.email }}</p>
                  </div>
                </td>
                <td class="text-caption">{{ account.phone }}</td>
              </tr>
            </tbody>
          </v-table>
          <!--v-model="pagination.page"-->
          <div>
            <VPagination
              class="__pagination"
              v-model="accountCurrentPage"
              size="small"
              :total-visible="6"
              :length="totalPageAccounts"
            />
          </div>
        </VCardText>
        <VCardText class="text-right">
          <VBtn color="error" class="text-caption mr-2" size="small" @click="modalForm = false"> Cancelar </VBtn>
          <VBtn color="primary" class="text-caption" size="small" @click="assignHandleClick">
            <VIcon icon="tabler-users" class="mr-1"></VIcon> 
            Asignar
          </VBtn>
        </VCardText>
      </VCard>
    </VDialog>
  
    <!-- 👉 Add -->
    <AdDrawer 
      v-model:isDrawerOpen="isAdDrawerVisible"
      v-model:ad="adData"
      v-model:is-edit="edit"
      @deleteAd="deleteAd"
      @handleSubmit="handleSubmit"
    />
  </div>
</template>

<style lang="scss">
  $layout-breakpoint-small: 960px;
  .modal-form {
    width: 46rem;
    @media (max-width: $layout-breakpoint-small) {
      width: 100%;
    }
  }
  
  .__pagination .v-pagination__list {
    justify-content: flex-start !important;
  }
  
  .v-table {
    overflow-y: auto !important;
  }
</style>
