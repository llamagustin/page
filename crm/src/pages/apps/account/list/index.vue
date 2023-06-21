<script setup lang="ts">
  import Papa from 'papaparse';
  import flag from '@/assets/flagSpain.svg'

  import { AccountProperties } from '@/@fake-db/types.d'
  import AddNewAccountDrawer from '@/views/apps/account/list/AddNewAccountDrawer.vue'
  import { useAccount } from '@/views/apps/account/useAccount'
  import { useAccountListStore, initialStateAccount } from '@/views/apps/account/useAccountListStore'
  import { avatarText } from '@core/utils/formatters'
  import { provinces, cities, codes } from '@/@fake-db/data/address'
  import router from '@/router/index.ts'
  import { useRouter } from 'vue-router'
  import { sessionStore } from '@/shared/utils/sessionStore.ts'
  import { timeAgo } from '@/shared/utils/date.ts'
  // import { timeAgo } from '@/shared/utils/date.ts"

  // 👉 Store
  const { dataSession, addSession, setSession, local } = sessionStore()

  const _router = useRouter()

  const loadBulk = ref(false)
  const accountListStore = useAccountListStore()
  const searchQuery = ref(local('q'))
  const selectedProvince = ref(local('byProvince', null))
  const selectedCity = ref(local('byCity', null));

  const selectedStatus = ref()
  const rowPerPage = ref(local('perPage', 10))
  const currentPage = ref(local('currentPage', 1))
  const scrollPage = ref(local('scrollPage', 0))
  const edit =  ref(false)


  setTimeout(function() {
    window.scrollBy(0, parseInt(scrollPage.value));
  }, 1000)


  window.addEventListener("scroll", function() {
    //scrollPage.value = parseInt(window.scrollY)
    setSession([{
      key: 'scrollPage',
      value: parseInt(window.scrollY)
    }])
  });



  const totalPage = ref(1)
  const totalAccounts = ref(0)
  const accounts = ref < AccountProperties[] > ([])

  const isFormValid = ref(false)


  const {
    status,
    resolveAccountRoleVariant,
    resolveAccountStatusVariant
  } = useAccount()
  
  
  
  //
  const selectedSource = ref()
  
  const sourceAccount = [
    {title: 'FUNNEL', value:'funnel-reseller'},
    {title:'INDEED', value:'indeed-reseller'}
  ]



  const accountData = ref(accountListStore.account)

  let isRunning = false;

  // 👉 Fetching users
  const fetchAccounts = (starting = true) => {
    let filters = {
      q: searchQuery.value,
      byProvince: selectedProvince.value ?? '',
      byCity: selectedCity.value ?? '',
      status: selectedStatus.value,
      source: selectedSource.value,
      perPage: rowPerPage.value,
      currentPage: currentPage.value
    }
    

    addSession(filters)
    // sessionStorage.setItem("filters",JSON.stringify(filters))

    if (!isRunning) {
      isRunning = true;

      accountListStore.fetchAccounts(filters).then(response => {
        accounts.value = response.data.accounts
        totalPage.value = response.data.totalPage
        totalAccounts.value = response.data.totalAccounts

        refetchData(response.data.stats)
        isRunning = false;

        //parseInt(sessionStorage.getItem('position')) || 0

      }).catch(error => {
        console.error(error)
      })

    }

  }


  watchEffect(fetchAccounts)


  // 👉 watching current page
  watchEffect(() => {
    if (currentPage.value > totalPage.value) {
      currentPage.value = totalPage.value
      console.log('wfr')
    }
  })

  const isAddNewAccountDrawerVisible = ref(false)

  // 👉 Computing pagination data
  const paginationData = computed(() => {
    const firstIndex = accounts.value.length ? ((currentPage.value - 1) * rowPerPage.value) + 1 : 0
    const lastIndex = accounts.value.length + ((currentPage.value - 1) * rowPerPage.value)

    return `Mostrando ${firstIndex} de ${lastIndex} de ${totalAccounts.value} valores`
  })

  // 👉 Add new user
  const addNewAccount = async (account: AccountProperties) => {
    if (account?.id) {
      var index  = accounts.value.findIndex(x => x.id == account.id)
      accounts.value[index].address = account.address
      
      console.log('account', account)

      await accountListStore.updateAccount(account);
    }
    else {
      delete account['id']
      await accountListStore.addAccount(account);
    }
    fetchAccounts(false)
  }
  
  
  
  const deleteAccount = async(id) => {
    console.log('id', id)
    var index  = accounts.value.findIndex(x => x.id == id)
    if(index > -1){
      // delete accounts.value[index]
      
      accounts.value.splice(index, 1);
      
      console.log('eeeee')
      // accounts.value = Boolean(accounts.value)
      
      accountListStore.deleteAccount({id: id}).then( res => {
        console.log('delete', res)
      })
    }
  }

  const newAccount = () => {
    isFormValid.value = false;
    accountData.value = JSON.parse(JSON.stringify(initialStateAccount));
    isAddNewAccountDrawerVisible.value = true
    edit.value = false
  }

  const editAccount = (account: AccountProperties) => {
    accountData.value = JSON.parse(JSON.stringify(account))
    // accountData.value = account
    isAddNewAccountDrawerVisible.value = true
    edit.value = true
  }



  // 👉 List
  const accountListMeta = ref([])

  function getPercentage({ total, count }) {
    let percentage;
    percentage = (count / total) * 100
    return percentage.toFixed(2);
  }

  const refetchData = (arr) => {
    let total = 0;
    if (arr[0]) {
      total = arr[0][0]
    }
    
    accountListMeta.value = [{
        icon: 'tabler-user',
        color: 'primary',
        stats: total,
        // stats: totalAccounts.value,
        percentage: +100,
        subtitle: 'Total',
      },
      {
        icon: 'tabler-user-check',
        color: 'success',
        stats: arr[1][0],
        percentage: getPercentage({ total, count: arr[1][0] }),
        subtitle: 'Aceptados',
      },
      {
        icon: 'tabler-user-exclamation',
        color: 'warning',
        stats: arr[2][0],
        percentage: getPercentage({ total, count: arr[2][0] }),
        subtitle: 'Pendientes',
      },
      {
        icon: 'tabler-user-plus',
        color: 'error',
        stats: arr[3][0],
        percentage: getPercentage({ total, count: arr[3][0] }),
        subtitle: 'Cancelados',
      },
    ]
  }

  watch(selectedProvince, (newValue) => { fetchAccounts(false) })
  watch(selectedCity, val => { fetchAccounts(false) })
  // watch(selectedCity, val => { fetchAccounts(false) })

  const importFile = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', '.csv');
    input.addEventListener('change', async () => {
      loadBulk.value = true
      let files = input.files;
      var items = await new Promise((resolve, reject) => {
        Papa.parse(files[0], {
          header: true,
          download: true,
          skipEmptyLines: true,
          complete: function(results) {
            resolve(results.data);
          }
        });
      })

      // var total_zone = []
      var data = []
      items.map(item => {
        var status = 'pending'

        switch (item['estado']) {
          case 'Revisado':
            status = 400;
            break;
          case 'Valoración pendiente':
            status = 400;
            break;
          case 'Rechazado':
            status = 400;
            break;
        }

      // console.log('it', item)
        var zone = []
        var _address = item['ubicación del candidato(a)'].replace(/provincia/, '').split(',')

        var address = {
          country: 'spain',
          province: null,
          city: null,
          zip: null,
          line: null,
        }

        if (_address.length == 1) {
          if (_address[0] !== 'España') address.zip = _address[0]
        }
        else {
          var province = _address[_address.length - 1].trim()
          var regex = new RegExp(province)

          var city = _address.join(' ').replace(regex, '').trim()

          address.province = province
          address.city = city


          var resultado = codes.filter(function(code) {
            return code['municipio_nombre'].match(new RegExp(city, "i"))
          })

          resultado.map((code, n) => {
            var codigo_postal = String(code.codigo_postal)
            if (n == 0) address.zip = [code.codigo_postal]
            zone.push(codigo_postal)

            // if (status == 200 && total_zone.indexOf(codigo_postal) == -1) {
            //   total_zone.push(codigo_postal)
            // }

          })
        }


        data.push({
          fullName: item['nombre'],
          phone: '+' + item['teléfono'].replace(/\D/g, ''),
          // username: item['email'].split('@')[0],
          email: item['email'],

          status: status,
          role: 'reseller',
          plan: [{
            label: 'program reseller',
            count: 0,
            createdAt: new Date(),
            current: 'month',
            available: true
          }], //not |plan
          abilities: [{
            action: 'block'
          }],

          zone: zone,
          address: address,
          info: {
            charge: item['puesto actual'],
            eduacation: item['educación'],
            source: item['Fuente'],
            interest: item['Nivel de interés'],
            faqs: [{
              q: item['Cualificación 2'],
              a: item['Cualificación 2 respuesta']
            }],
          },
          source: 'indeed-reseller',
          createdAt: new Date(item['fecha'])
        })
      })


      console.log('data', data)
      var res = await accountListStore.importData(data)
      .then(async result => {
        console.log('res', result)
      }).catch(err => {
        console.log('err', err)
      })
      
      console.log('rr', res)

      loadBulk.value = false
    });
    input.click();
  }

  const colorTitle = { '200': 'success', '300': 'warning', '400': 'error' }

  const computedCities = computed(() => {
    selectedCity.value = null;
    let codeProvince = provinces.filter(p => p.title == selectedProvince.value)
    if (codeProvince.length < 1) return []

    const province = codeProvince[0].value
    const qr = cities.filter((item: any) => String(item.value).startsWith(province));

    return qr
  })

  const country = ref("España")

  const openView = (id) => {
    sessionStorage.setItem('position', document.documentElement.scrollTop || document.body.scrollTop)
    _router.push({
      path: `/apps/account/view/${id}`
    })
    // window.location.assign()
  }
  

</script>

<template>
  <section>
    <VRow>
      <VCol v-for="(meta, index) in accountListMeta" :key="index" cols="12" sm="3" lg="3">
        <VCard>
          <VCardText class="d-flex justify-space-between">
            <div>
              <div class="d-flex align-center gap-2 my-1">
                <h6 class="text-h6">
                  {{ meta.stats }}
                </h6>
                <span :class="'text-' + meta.color">({{ meta.percentage }}%)</span>
              </div>
              <span>{{ meta.subtitle }}</span>
            </div>
            <VAvatar rounded variant="tonal" :color="meta.color" :icon="meta.icon" />
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12">
        <VCard>
          <VProgressLinear
            v-if="loadBulk"
            color="primary"
            indeterminate
            reverse
          />
          <VCardText>
            <div :style="{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}">
              <p class="d-flex items-center">
                <img :src="flag" :style="{width: '20px', height: '20px'}" />
                <strong class="ms-2">España</strong>
              </p>
              <div class="d-flex gap-2" :style="{marginTop: '-20px'}">
                <VBtn v-if="!loadBulk" variant="tonal" color="secondary" 
                icon="tabler-screen-share" @click="importFile">
                </VBtn>
                <!-- 👉 Add user button -->
                <VBtn icon="tabler-plus" @click="newAccount"></VBtn>
              </div>
            </div>
            <VRow >
              <VCol cols="3">
               <VSelect v-model="selectedStatus" label="Estado" :items="status" clearable clear-icon="tabler-x">
                  <template #selection="{ item }">
                    <span>
                      <VBadge dot inline :color="colorTitle[item.value]" /> 
                      <!--{{item.title}}-->
                    </span>
                  </template>
                </VSelect>
              </VCol>
              <VCol cols="3">
               <VSelect 
                class="mr-4" 
                label="Source" 
                :items="sourceAccount"
                v-model="selectedSource" 
                clearable 
                clear-icon="tabler-x" />
              </VCol>
              <VCol cols="3">
                <VAutocomplete v-model="selectedProvince" 
                  label="Provincia" :items="provinces" item-value="title" 
                  clearable clear-icon="tabler-x" autocomplete="none" />
              </VCol>
              <VCol cols="4" v-if="!!selectedProvince" >
                <VAutocomplete 
                v-model="selectedCity" label="Ciudad" :items="computedCities" 
                item-value="title" clearable clear-icon="tabler-x" autocomplete="none" />
              </VCol>
              <VCol cols="3">
                <VTextField v-model="searchQuery" placeholder="Buscar" density="compact" />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12">
        <VCard>
          <VTable class="text-no-wrap">
            <!-- 👉 table head -->
            <thead>
              <tr>
                <th scope="col">
                </th>
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
            <tbody>
              <tr v-for="account in accounts" :key="account.id" style="height: 3.75rem;">
                <!-- 👉 Actions -->
                <td class="text-center" style="width: 5rem;">
                  <VBtn icon size="x-small" color="default" variant="text">
                    <VIcon @click="editAccount(account)" size="22" icon="tabler-search" />

                    <!--<VMenu activator="parent">-->
                    <!--  <VList>-->
                    <!--    <VListItem title="View" :to="{ name: 'apps-account-view-id', params: { id: account.id } }" />-->
                    <!--    <VListItem title="Edit" @click="editAccount(account)" type="button" />-->
                    <!--  </VList>-->
                    <!--</VMenu>-->
                  </VBtn>
                </td>
                <!-- 👉 User -->
                <td>
                  <div class="d-flex align-center gap-2">
                    <VAvatar variant="tonal" :color="resolveAccountStatusVariant(account.status)" class="me-3" size="38">
                      <VImg v-if="account.avatar" :src="account.avatar" />
                      <span v-else>{{ avatarText(account.fullName) }}</span>
                    </VAvatar>

                    <div class="d-flex flex-column">
                      <h6 class="text-base">
                        <!-- 
                        <RouterLink :to="{ name: 'apps-account-view-id', params: { id: account.id } }"
                          class="font-weight-medium user-list-name" >
                          {{ account.fullName }}
                        </RouterLink>
                        -->
                        <span class="link" @click="openView(account.id)">{{ account.fullName }}</span>
                      </h6>
                      <div class="d-flex gap-2">
                        <VChip label :color="resolveAccountStatusVariant(account.status)" size="small" class="text-capitalize">
                          {{account.role}}
                        </VChip>
                        <span class="text-sm text-disabled">
                          {{ timeAgo(account.createdAt) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>

                <!-- 👉 Address -->
                <td>
                  <div class="d-flex align-center">
                    <div class="d-flex flex-column">
                      <h6 class="text-base">
                        <RouterLink :to="{ name: 'apps-account-view-id', params: { id: account.id } }" class="font-weight-medium user-list-name">
                           {{ account.address.province }}, {{ account.address.city }} 
                        </RouterLink>
                        <br />
                        <VChip v-for="zip in account.address.zip" 
                          label size="small" class="text-capitalize text-xs"
                          :color="resolveAccountStatusVariant(account.status)">
                          {{ zip }}
                        </VChip>
                        <!--<span class="text-sm text-disabled">-->
                        <!--   {{ account.address.zip }}-->
                        <!--  </span>-->
                      </h6>

                    </div>
                  </div>
                </td>

                <!-- 👉 Contacto -->
                <td>
                  <div v-if="account.phone" class="d-flex gap-2 text-base">
                    <!--<VBtn :href="`/apps/chat?id=${account.id}`" variant="text" size="xx-small" icon-->
                    <!--    :color="resolveAccountStatusVariant(account.status)">-->
                    <!--  <VIcon icon="tabler-message-circle"></VIcon>-->
                    <!--</VBtn>-->
                    <span class="text-base">
                      {{ account.phone }}
                    </span>
                  </div>
                  <div v-if="account.email" class="d-flex gap-2 text-base">
                    <!--<VBtn :href="`/apps/email?to=${account.email}`" variant="text" size="xx-small" icon-->
                    <!--  :color="resolveAccountStatusVariant(account.status)">-->
                    <!--  <VIcon icon="tabler-mail"></VIcon>-->
                    <!--</VBtn>-->
                    <span class="text-base">{{ account.email }}</span>
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
        </VCard>
      </VCol>
    </VRow>

    <!-- 👉 Add New User -->
    <AddNewAccountDrawer 
    v-model:isDrawerOpen="isAddNewAccountDrawerVisible" 
    v-model:account="accountData" 
    v-model:is-edit="edit"
    @deleteAccount="deleteAccount"
    @accountData="addNewAccount" />
  </section>
</template>

<style lang="scss">
  .app-user-search-filter {
    inline-size: 31.6rem;
  }

  .text-capitalize {
    text-transform: capitalize;
  }

  .user-list-name:not(:hover) {
    color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
  }

  .link {
    transition: color 300ms;
    cursor: pointer;

    &:hover {
      color: #7367F0;
    }
  }
</style>
