<script setup lang="ts">
  import Papa from 'papaparse'
  import flag from '@/assets/flagSpain.svg'

  import { timeAgo } from '@/shared/utils/date'
  

  import type { UserProperties } from '@/@fake-db/types'
  import UserEventHandler from '@/views/apps/user/list/UserEventHandler.vue'
  import { useUser } from '@/views/apps/user/useUser'
  import { useUserListStore } from '@/views/apps/user/useUserListStore'
  import { avatarText } from '@core/utils/formatters'
  import { useCalendarStore } from '@/views/apps/calendar/useCalendarStore'

  // import { useLeadGenerator } from '@/shared/utils/lead-generator'

  import { useAddress } from '@/shared/utils/date'


  import axios from "axios";
  const axiosIns = axios.create({
    baseURL: "https://api.aythen.com",
    withCredentials: false,
    headers: { 'Content-Type': 'application/json' }
  });
  
  
  
  const storeCalendar = useCalendarStore();


  // const { getProvince, getCity, getCode } = useAddress()
  const { getAddressFromCode } = useAddress()


// getAddressFromCode('00043')

  // const { importFile } = useLeadGenerator()
  
  
  const loadBulk = ref(false)
  
  const isValid = (item) => {
    if(typeof item['name'] && typeof item['business'] && typeof item['address'] && typeof item['google'] &&
        typeof item['web'] && typeof item['phone'] && typeof item['email'] && typeof item['category'] &&
        typeof item['day'] && typeof item['hour'] && typeof item['interest'] && typeof item['note'] ){
      return true
    } else{
      console.error('Error al importar leads')
      return false
    }
  }

  const uploadLeadsBulk = () => {
    
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', '.csv');

    input.addEventListener('change', async () => {
        loadBulk.value = true
        
        let files = input.files;
        const items = await new Promise((resolve, reject) => {
          Papa.parse(files[0], {
            header: true,
            download: true,
            skipEmptyLines: true,
            complete: function(results) {
              resolve(results.data);
            }
          });
        });

      // phone	name	email	(day	hour |interest|note)contact[] 	category	company	web	address	code	google
        
        var data = []
        for(var i = 0; i<items.length; i++){
            var item = items[i]
            // var zip = item['code'] || ''

            if(isValid(item)){
                var address = await getAddressFromCode(item['code'])
                console.log('address', item['code'], address)
                if(address == 404) continue;
                
                var line = item['address'].replace(/,\s*\d+\s*[^\n,]+,[^\n]+$/g, '');
                
                var _item = {
                    source: 'google-scrap',
                    google_id: item['google'].split('=')[1],
                    category: item['category'] || '',
                    name: {
                      name: item['name'] || ''
                    },
                    company: item['business'] || '',
                    web: item['web'] || '',
                    phone: item['phone'] || '',
                    email: item['email'] || '',
                    status: 300,
                    zone: address.code,
                    address: {
                        zip: address.code,
                        city: address.city,
                        province: address.province,
                        line: line
                    },
                }
                
                
                //
                if(item['day'] && item['hour']){
                  var [dd, mm, yyyy] = item['day'].split("/").map(Number)
                  var date = new Date(yyyy, mm - 1, dd, ...item['hour'].split(":")).toISOString()
  
                  _item.contact = [{
                    date: date,
                    interest: item['interest'],
                    note: item['note']
                  }]
                }
                
        
                // if(!_item.email) delete _item.email
                
                data.push(_item)
            }
        }
        
      const result = await userListStore.addUsersBulk(data);

      loadBulk.value = false
    });
    input.click();
  }



  // 👉 Store
  const showImport = ref(false)
  // const showProvince = ref(true)


  const userListStore = useUserListStore()

  const searchQuery = ref('')
  const selectedProvince = ref('')
  const selectedCity = ref('')
  const selectedCode = ref('')
  const rowPerPage = ref(10)

  
  //
  const currentPageProvince = ref(1)
  const totalPageProvince = ref(1)
  const totalUsersProvince = ref(0);
    
  const currentPageCity = ref(1)
  const totalPageCity = ref(1)
  const totalUsersCity = ref(0);
  
  const currentPageCode = ref(1)
  const totalPageCode = ref(1)
  const totalUsersCode = ref(0);

  const currentPageUser = ref(1)
  const totalPageUser = ref(1)
  const totalUsers = ref(0);



  const showReseller = ref(false)

  const resellers = ref([])
  const users = ref([])

  const provinces = ref([])
  const cities = ref([])
  const codes = ref([])

  const provinceUser = ref([])
  const cityUser = ref([])
  const codeUser = ref([])

  const isFormValid = ref(false)

  const {
    status,
    resolveUserStatusVariant
  } = useUser()




  const userData = ref(userListStore.user)

  // 👉 Fetching province users
  const fetchProvinceUsers = () => {
    userListStore.fetchUserProvinceGenerator({
      q: searchQuery.value,
      perPage: rowPerPage.value,
      currentPage: currentPageProvince.value,
    }).then(response => {
      provinceUser.value = response.data.users
      totalPageProvince.value = response.data.totalPage
      totalUsersProvince.value = response.data.totalUsers

      //
      userListMeta.value[0].stats = response.data.stats.total
      userListMeta.value[1].stats = response.data.stats.accepted
      userListMeta.value[2].stats = response.data.stats.pendent
      userListMeta.value[3].stats = response.data.stats.rejected

      //
      provinceUser.value.map(user => {
        provinces.value.push({
          title: user.province
        })
      });
    }).catch(error => {
      console.error(error)
    })
  }

  const colorStatus = { 1: 'warning', 2: 'success', 3: 'error' };

//Show Table
const showTable = ref(true);



  fetchProvinceUsers()


  //filterProvince
  const selectProvince = (province) => {
    selectedProvince.value = province

    userListStore.fetchUserCityGenerator({
      q: searchQuery.value,
      province: province,
      perPage: rowPerPage.value,
      currentPage: currentPageCity.value
    }).then(response => {
      cityUser.value = response.data.users
      totalPageCity.value = response.data.totalPage
      totalUsersCity.value = response.data.totalUsers

      //
      userListMeta.value[0].stats = response.data.stats.total
      userListMeta.value[1].stats = response.data.stats.accepted
      userListMeta.value[2].stats = response.data.stats.pendent
      userListMeta.value[3].stats = response.data.stats.rejected

      //
      cities.value = []
      cityUser.value.map(user => {
        cities.value.push({
          title: user.city
        })
      })
    }).catch(error => {
      console.error(error)
    })
  }

  // Filter City
  const selectCity = (city) => {
    selectedCity.value = city
    
    userListStore.fetchUserCodeGenerator({
      q: searchQuery.value,
      city: city,
      perPage: rowPerPage.value,
      currentPage: currentPageCode.value
    }).then(response => {
      codeUser.value = response.data.users
      totalPageCode.value = response.data.totalPage
      totalUsersCode.value = response.data.totalUsers
      //
      userListMeta.value[0].stats = response.data.stats.total
      userListMeta.value[1].stats = response.data.stats.accepted
      userListMeta.value[2].stats = response.data.stats.pendent
      userListMeta.value[3].stats = response.data.stats.rejected
      
      //
      codes.value = []
      codeUser.value.map(user => {
        codes.value.push({
          title: user.zip
        })
      })
      //refetchData(response.data.stats)
    }).catch(error => {
      console.error(error)
    })
  }

  // Filter Code
  const selectCode = (code) => {
    selectedCode.value = code
    showTable.value = false;

    userListStore.fetchUsers({
      q: searchQuery.value,
      byCode: code,
      perPage: rowPerPage.value,
      currentPage: currentPageCode.value,
    }).then(response => {
      users.value = response.data.users
      
      users.value.map( user => user.check = false )

      totalPageCode.value = response.data.totalPage
      totalUsersCode.value = response.data.totalUsers
      // userListMeta.value[0].stats = response.data.stats.total
      // userListMeta.value[1].stats = response.data.stats.accepted
      // userListMeta.value[2].stats = response.data.stats.pendent
      // userListMeta.value[3].stats = response.data.stats.rejected

      //refetchData(response.data.stats)
    }).catch(error => {
      console.error(error)
    })
  }


  
  // 👉 Search Query
  var timeSearchQuery
  const fnSearchQuery = () => {
    clearTimeout(timeSearchQuery)
    timeSearchQuery = setTimeout(function(){
      userListStore.fetchUsers({
        q: searchQuery.value,
        perPage: rowPerPage.value,
        currentPage: currentPageCode.value,
      }).then(response => {
        users.value = response.data.users
        
        users.value.map( user => user.check = false )
  
        totalPageCode.value = response.data.totalPage
        totalUsersCode.value = response.data.totalUsers
      }).catch(error => {
        console.error(error)
      })
    }, 2000)
  }


  // 👉 List
  const userListMeta = ref([{
      icon: 'tabler-user',
      color: 'primary',
      stats: '0',
      percentage: 0,
      subtitle: 'Total',
    },
    {
      icon: 'tabler-user-check',
      color: 'success',
      stats: '0',
      percentage: 0,
      subtitle: 'Aceptados',
    },
    {
      icon: 'tabler-user-exclamation',
      color: 'warning',
      stats: '0',
      percentage: 0,
      subtitle: 'Pendientes',
    },
    {
      icon: 'tabler-user-plus',
      color: 'error',
      stats: '0',
      percentage: 0,
      subtitle: 'Cancelados',
    },
  ])







  // 👉 watching current page
  watch(currentPageProvince, (val) => {
    fetchProvinceUsers()
    
    if (currentPageProvince.value > totalPageProvince.value)
      currentPageProvince.value = totalPageProvince.value
  })


  watch(currentPageCity, (val) => {
    selectProvince(selectedProvince.value)
    
    if (currentPageCity.value > totalPageCity.value)
      currentPageCity.value = totalPageCity.value
  })


  watch(currentPageCode, (val) => {
    selectCity(selectedCity.value)
    
    if (currentPageCode.value > totalPageCode.value)
      currentPageCode.value = totalPageCode.value
  })





///
  watch(selectedProvince, province => {
    if (!province) {
      selectedProvince.value = ''
      selectedCity.value = ''
      selectedCode.value = ''
      cityUser.value = []
      codeUser.value = []
      // provinceUser.value = []
    }
    else {
      selectProvince(province)
    }
  })

  watch(selectedCity, city => {
    if (!city) {
      selectedCity.value = ''
      selectedCode.value = ''
      cityUser.value = []
      codeUser.value = []
    }
    else {
      selectCity(city)
    }
  })


  watch(selectedCode, code => {
    if (!code) {
      users.value = []
      codeUser.value = []
    }
    else {
      selectCode(code)
    }
  })



//
// const isUserHandlerSidebarActive = ref(false)

// const editUser = (user: UserProperties) => {
//   userData.value = user

//   isUserHandlerSidebarActive.value = true
// }



  
  

const zipCode = () => {
  console.log('zipCode')
}
  
  
  
  
  
// 👉 Computing pagination data
const paginationDataProvince = computed(() => {
  const firstIndex = provinceUser.value.length ? ((currentPageProvince.value - 1) * rowPerPage.value) + 1 : 0
  const lastIndex = provinceUser.value.length + ((currentPageProvince.value - 1) * rowPerPage.value)

  return `Mostrando ${firstIndex} de ${lastIndex} de ${totalUsersProvince.value} valores`
})

const paginationDataCity = computed(() => {
  const firstIndex = cityUser.value.length ? ((currentPageCity.value - 1) * rowPerPage.value) + 1 : 0
  const lastIndex = cityUser.value.length + ((currentPageCity.value - 1) * rowPerPage.value)

  return `Mostrando ${firstIndex} de ${lastIndex} de ${totalUsersCity.value} valores`
})

const paginationDataCode = computed(() => {
  const firstIndex = codeUser.value.length ? ((currentPageCode.value - 1) * rowPerPage.value) + 1 : 0
  const lastIndex = codeUser.value.length + ((currentPageCode.value - 1) * rowPerPage.value)

  return `Mostrando ${firstIndex} de ${lastIndex} de ${totalUsersCode.value} valores`
})




//checks
const arrCheck = ref([])
const _allCheck = ref(false)


const allCheck = () => {
  if(_allCheck.value){
    arrCheck.value = users.value
    users.value.map( user => user.check = true )
  }else{
    arrCheck.value = []
    users.value.map( user => user.check = false )
  }
}

const oneCheck = (user) => {
  _allCheck.value = false
  
  var index = arrCheck.value.findIndex(x => x.id == user.id)
  if(index>=0){
    delete arrCheck.value[index]
    arrCheck.value = arrCheck.value.filter(Boolean)
  }else{
    arrCheck.value.push(user)
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


//
const isAppSearchBarVisible = ref(false)

const followUser = (user) => {
  isAppSearchBarVisible.value = !isAppSearchBarVisible.value
}


const unfollowUser = async() => {
  var arr = []
  
  arrCheck.value.map( (lead, n) => {
    lead.reseller = []
    
    arr[n] = {
      id: lead.id,
      reseller: []
    }
  })
    
    
  var res = await axiosIns.post('/account/assign/leads', {data: arr})
}



//
const updateReseller = async (data) => {
  var arr = []

  arrCheck.value.map( (lead, n) => {
    lead.reseller = [{
      id: data.id,
      name: data.fullName,
      date: new Date()
    }]
    
    arr[n] = {
      id: lead.id,
      reseller: lead.reseller
    }
  })
  
  var res = await axiosIns.post('/account/assign/leads', {data: arr})
} 



//
const LazyAppBarSearch = defineAsyncComponent(() => import('@core/components/AppBarSearchReseller.vue'))



//
const selectedUser=ref();
const isUserHandlerSidebarActive = ref(false)

const editUser = (user) => {
  
  const leadId = user.id;
  
  storeCalendar.leadId = leadId;
  selectedUser.value = user;
  isUserHandlerSidebarActive.value = true;
}

const clearCitySelection=()=>{
  showTable.value=true
}

</script>

<template>
  <section>
    <VRow>
      <!--
          <VCol
            v-for="(meta, index) in userListMeta"
            :key="index"
            cols="12"
            sm="6"
            lg="3"
          >
            <VCard>
              <VCardText class="d-flex justify-space-between">
                <div>
                  <div class="d-flex align-center gap-2 my-1">
                    <h6 class="text-h6">
                      {{ meta.stats }}
                    </h6>
                    <span :class="meta.percentage > 0 ? 'text-success' : 'text-error'">({{ meta.percentage }}%)</span>
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
          -->

      <VCol cols="12">
        <VCard>
          <VProgressLinear
            v-if="loadBulk"
            color="primary"
            indeterminate
            reverse
          />
    
          <VCardText class="d-flex flex-wrap py-4 gap-4">
            <div class="d-flex items-center">
              <img :src="flag" :style="{width: '20px', height: '20px'}" />
              <strong class="ms-2">España</strong>
            </div>
            <div v-if="arrCheck.length == 0" class="d-flex ml-auto gap-4">
                <VBtn 
                  v-if="!loadBulk"
                  @click="uploadLeadsBulk" 
                  variant="tonal" size="small" color="secondary"  icon="tabler-upload"  />
                <VBtn 
                  @click="newUser" 
                  variant="tonal" size="small" icon="tabler-plus" />
            </div>
            <div v-else class="d-flex ml-auto gap-4">
              <VBtn  
                @click="followUser" color="primary"
                variant="tonal" size="small" icon="tabler-user" />
              <VBtn  
                @click="unfollowUser" color="error"
                variant="tonal" size="small" icon="tabler-x" />
            </div>
            <!--<div v-if="users.length > 0" class="d-flex flex-wrap ml-auto gap-4">-->
            <!--</div>-->
          </VCardText>

          <VCardText class="flex-wrap py-4 gap-4">
            <VRow>
              <VCol cols="3">
                <VAutocomplete 
                  v-model="selectedProvince" 
                  label="Provincia" 
                  :items="provinces" 
                  item-value="value" 
                  clearable 
                  clear-icon="tabler-x" 
                  autocomplete="none" />
              </VCol>
              <VCol cols="3" v-if="selectedProvince" >
                  <VAutocomplete 
                    v-model="selectedCity" 
                    label="City" 
                    :items="cities" 
                    item-value="value" 
                    clearable clear-icon="tabler-x" 
                    autocomplete="none" />
              </VCol>
              <VCol cols="2" v-if="selectedCity" >
                <VAutocomplete 
                  v-model="selectedCode" 
                  label="ZIP" 
                  :items="codes" 
                  item-value="value" 
                  clearable clear-icon="tabler-x"
                  @click:clear='clearCitySelection'
                  autocomplete="none" 
                   />
              </VCol>
             
              <VCol>
                  <VTextField 
                    v-model="searchQuery" 
                    @input="fnSearchQuery"
                    placeholder="Buscar Lead" 
                    density="compact" />
              </VCol>
            </VRow>

          </VCardText>

          <VDivider />
          
          <VTable v-if="provinceUser.length > 0 && !(cityUser.length > 0) && !searchQuery" class="text-no-wrap">
            <!-- 👉 table head -->
            <thead>
              <tr>
                <th scope="col">
                  PROVINCIA
                </th>
                <th scope="col">

                </th>
                <th scope="col">

                </th>
              </tr>
            </thead>
            <!-- 👉 table body -->
            <tbody>
              <tr v-for="(user, key) in provinceUser" :key="key" style="height: 3.75rem;" @click="selectedProvince = user.province">
                <!-- 👉 Title -->
                <td>
                  <div class="d-flex align-center">
                    <h6 class="cursor-pointer text-base font-weight-medium user-list-name">
                      {{ user.province }}
                    </h6>
                  </div>
                </td>

                <!-- 👉 Resellers -->
                <td>
                  hay un total de
                  <VChip label :color="resolveUserStatusVariant(user.status)" size="small" class="text-capitalize">
                    {{ user.count_leads }}
                  </VChip>
                  /
                  <VChip label :color="resolveUserStatusVariant(300)" size="small" class="text-capitalize">
                    {{ user.leads_pendent }}
                  </VChip>
                  leads para
                  <VChip label :color="resolveUserStatusVariant(200)" size="small" class="text-capitalize">
                    {{ user.resellers_accepted }}
                  </VChip>
                  resellers
                </td>
                <!-- 👉 Leads -->
                <td>
                  hay
                  <VChip label :color="resolveUserStatusVariant(200)" size="small" class="text-capitalize ml-2">
                    {{ user.resellers_accepted }}
                  </VChip>
                  resellers disponibles y
                  <VChip label :color="resolveUserStatusVariant(300)" size="small" class="text-capitalize ml-2">
                    {{ user.resellers_pendent }}
                  </VChip>
                  pendientes
                </td>

              </tr>
            </tbody>

            <!-- 👉 table footer  -->
            <tfoot v-show="!provinceUser.length">
              <tr>
                <td colspan="7" class="text-center">
                  No data available
                </td>
              </tr>
            </tfoot>
            
            <VDivider />
              
              <VCardText class="d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5">
                <span class="text-sm text-disabled">
                  {{ paginationDataProvince }}
                </span>
                <VPagination v-model="currentPageProvince" size="small" :total-visible="5" :length="totalPageProvince" />
              </VCardText>
          </VTable>

          <VTable v-if="cityUser.length > 0 && !(codeUser.length > 0) && !searchQuery" class="text-no-wrap">
            <!-- 👉 table head -->
            <thead>
              <tr>
                <th scope="col">
                  CIUDAD
                </th>
                <th scope="col">

                </th>
                <th scope="col">

                </th>
              </tr>
            </thead>
            <!-- 👉 table body -->
            <tbody>
              <tr v-for="(user, key) in cityUser" :key="key" style="height: 3.75rem;" @click="selectedCity = user.city">
                <!-- 👉 Title -->
      
                <td>
                  <div class="d-flex align-center">
                    <h6 class="cursor-pointer text-base font-weight-medium user-list-name">
                      {{ user.city }}
                    </h6>
                  </div>
                </td>

                <!-- 👉 Resellers -->
                <td>
                  hay un total de
                  <VChip label :color="resolveUserStatusVariant()" size="small" class="text-capitalize">
                    {{ user.count_leads }}
                  </VChip>
                  /
                  <VChip label :color="resolveUserStatusVariant(300)" size="small" class="text-capitalize">
                    {{ user.leads_pendent }}
                  </VChip>
                  leads para
                  <VChip label :color="resolveUserStatusVariant(200)" size="small" class="text-capitalize">
                    {{ user.resellers_accepted }}
                  </VChip>
                  resellers
                </td>
                <!-- 👉 Leads -->
                <td>
                  hay
                  <VChip label :color="resolveUserStatusVariant(200)" size="small" class="text-capitalize ml-2">
                    {{ user.resellers_accepted }}
                  </VChip>
                  resellers disponibles y
                  <VChip label :color="resolveUserStatusVariant(300)" size="small" class="text-capitalize ml-2">
                    {{ user.resellers_pendent }}
                  </VChip>
                  pendientes
                </td>

              </tr>
            </tbody>

            <!-- 👉 table footer  -->
            <tfoot v-show="!cityUser.length">
              <tr>
                <td colspan="7" class="text-center">
                  No data available
                </td>
              </tr>
            </tfoot>
            
            <VDivider />
              
              <VCardText class="d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5">
                <span class="text-sm text-disabled">
                  {{ paginationDataCity }}
                </span>
                <VPagination v-model="currentPageCity" size="small" :total-visible="5" :length="totalPageCity" />
              </VCardText>
              
          </VTable>

          <VTable v-if="codeUser.length > 0 && !searchQuery && showTable" class="d-block text-no-wrap">
            <!-- 👉 table head -->
            <thead>
              <tr>
                <th scope="col">
                  ZIP
                </th>
                <th scope="col">

                </th>
                <th scope="col">

                </th>
              </tr>
            </thead>
            <!-- 👉 table body -->
            <tbody>
              <tr v-for="(user, key) in codeUser" @click="selectedCode = user.zip" :key="key" style="height: 3.75rem;" >
                <!-- 👉 Title -->
                <td>
                  <div class="d-flex align-center">
                    <h6 class="cursor-pointer text-base font-weight-medium user-list-name">
                      {{ user.zip }}
                    </h6>
                  </div>
                </td>

                <!-- 👉 Resellers -->
                <td>
                  hay un total de
                  <VChip label :color="resolveUserStatusVariant()" size="small" class="text-capitalize">
                    {{ user.count_leads }}
                  </VChip>
                  /
                  <VChip label :color="resolveUserStatusVariant(300)" size="small" class="text-capitalize">
                    {{ user.leads_pendent }}
                  </VChip>
                  leads para
                  <VChip label :color="resolveUserStatusVariant(200)" size="small" class="text-capitalize">
                    {{ user.resellers_accepted }}
                  </VChip>
                  resellers
                </td>
                <!-- 👉 Leads -->
                <td>
                  hay
                  <VChip label :color="resolveUserStatusVariant(200)" size="small" class="text-capitalize ml-2">
                    {{ user.resellers_accepted }}
                  </VChip>
                  resellers disponibles y
                  <VChip label :color="resolveUserStatusVariant(300)" size="small" class="text-capitalize ml-2">
                    {{ user.resellers_pendent }}
                  </VChip>
                  pendientes
                </td>

              </tr>
            </tbody>

            <!-- 👉 table footer  -->
            <tfoot v-show="!provinceUser.length">
              <tr>
                <td colspan="7" class="text-center">
                  No data available
                </td>
              </tr>
            </tfoot>
            
            <VDivider />
              
              <VCardText class=" d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5">
                <span class="text-sm text-disabled">
                  {{ paginationDataCode }}
                </span>
                <VPagination v-model="currentPageCode" size="small" :total-visible="5" :length="totalPageCode" />
              </VCardText>
          </VTable>
          
          <!-- Users  -->
          <VCol cols="12" v-if="selectedCode || searchQuery">
            <VCard>
              <!-- 👉 Filters -->
              <VTable class="text-no-wrap">
                <!-- 👉 table head -->
                <thead>
                  <tr>
                    <th scope="col">
                      <VCheckbox 
                      v-model="_allCheck"
                      @change="allCheck" 
                      label="" />
                    </th>
                    <th scope="col"> RESELLER </th>
                    <th scope="col"> USUARIO </th>
                    <th scope="col"> CONTACTO </th>
                    <th scope="col"> DIRECCION </th>
                    
                  </tr>
                </thead>
                <!-- 👉 table body -->
                <tbody>
                  <tr v-for="user in users" :key="user.id" 
                    :class="user.reseller.length == 0 ? 'not-reseller' : ''" style="height: 3.75rem;" >
                    <!-- 👉 User -->
                    <td>
                      <VCheckbox 
                      v-model="user.check"
                      @change="oneCheck(user)" 
                      label="" />
                    </td>
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
                    
                    <!--User - lead-->
                    <td>
                      <div class="d-flex align-center">
                        <VAvatar variant="tonal" :color="resolveUserStatusVariant(user.status)" class="me-3" size="38">
                          <VImg v-if="user.avatar" :src="user.avatar" />
                          <span v-else>
                              <div v-if="user.name?.name" class="cursor-pointer font-weight-medium user-list-name">
                                {{ avatarText(user.name?.name) }}
                              </div>
                              <div v-else class="cursor-pointer font-weight-medium user-list-name">
                                {{ user.company.substring(0, 1) }}
                              </div>
                          </span>
                        </VAvatar>

                        <div class="d-flex flex-column">
                          <h6 class="text-base " @click="editUser(user)">
                            <div v-if="user.name?.name" class="cursor-pointer font-weight-medium user-list-name elipsis">
                              {{ user.name?.name }} {{ user.name?.firstSurname }} {{ user.name?.secondSurname }}
                            </div>
                            <div v-else class="cursor-pointer font-weight-medium user-list-name elipsis">
                              {{ user.company}}
                            </div>
                          </h6>
                          <span style="cursor:pointer;font-size: 10px">
                            {{timeAgo(user.updatedAt)}}
                          </span>
                        </div>
                      </div>
                    </td>


                    <!-- 👉 Contact -->
                    <td>
                      <div class="d-flex flex-column">
                        <div v-if="user.phone" class="text-base d-flex align-center">
                          <VBtn 
                            :style="{height: '20px'}" class="mb-0"
                            icon="tabler-brand-whatsapp" :color="resolveUserStatusVariant(user.status)"
                            size="small" variant="remove"  ></VBtn>
                          {{ user.phone }}
                        </div>
                        <label v-if="user.email" class="text-base d-flex align-center">
                          <VBtn 
                            :style="{height: '20px'}" class="mb-0 elipsis"
                            icon="tabler-mail" :color="resolveUserStatusVariant(user.status)" 
                            size="small" variant="remove"></VBtn>
                            <span class="elipsis">
                              {{ user.email }}
                            </span>
                        </label>
                      </div>
                    </td>
                    
                    <!-- 👉 Address -->
                    <td>
                      <h6>
                        <span class="text-capitalize text-base font-weight-semibold">
                          {{ user.address?.province }}
                        </span>
                      </h6>
                      <span>
                        <VChip :color="resolveUserStatusVariant(user.status)" label size="small">
                          {{user.address?.zip}} - {{user.address?.city}} 
                        </VChip>
                      </span>
                    </td>

                  </tr>
                </tbody>

                <!-- 👉 table footer  -->
                <tfoot v-show="!users">
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
                  {{ paginationDataUser }}
                </span>
                <VPagination v-model="currentPageUser" size="small" :total-visible="5" :length="totalPageUser" />
              </VCardText>
            </VCard>
          </VCol>
          <!--aca-->
        </VCard>
      </VCol>
    </VRow>

    <!-- 👉 Add Reseller -->
    <LazyAppBarSearch
      v-model:isDialogVisible="isAppSearchBarVisible"
      @updateReseller="updateReseller"
    />
    
    
    <!-- 👉 Add New User -->
    <UserEventHandler 
      v-model:isDrawerOpen="isUserHandlerSidebarActive" 
      :event="event" 
      v-model:user="selectedUser" 
      @add-user="addUser" 
      @updateUser="updateUser" 
      @remove-user="removeUser" 
      @addEvent="addEvent" />

  
  </section>
</template>

<style lang="scss">
  /*.v-table > .v-table__wrapper > table{*/
  /*  display: block;  */
  /*}*/
  
  /*.w-full{*/
  /*  width: 100%;*/
  /*}*/
  
  
  
  /*.not-reseller{*/
  /*  background: #fceaea;*/
  /*}*/
  
  /*.text-base{*/
  /*  font-size: 12px;*/
  /*  display: flex;*/
  /*  align-items: center;*/
  /*}*/
  
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
