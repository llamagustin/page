
import type { Ref } from 'vue';
import type { User, NewUser } from './types'
import { useAdListStore } from '@/views/apps/ad/useAdListStore'
//import { services  } from '@/@fake-db/services'



export const useAd = (ad, isLeftSidebarOpen: Ref<boolean>) => {
  // 👉 Store
  const store = useAdListStore()
  
  const selectedProvince = ref(null)
  const selectedCity = ref(null);

  const rowPerPage = ref(10)
  const currentPage = ref(1)
  const totalPage = ref(1)
  const isClient = ref(false)
  const searchQuery = ref('')
  const selectedStatus = ref()
  const totalAds = ref(0)
  const ads = ref([])
  // const metaUser = ref([]);
  
  const selectedAd = ref();
  
  const tools = ref(JSON.parse(localStorage.dataTools || "[]" ) )
  


  const statusAd  = [
    { title: 'Pendientes', value: '3' },
    { title: 'Aceptados', value: '2' },
    { title: 'Cancelados', value: '4' },
  ]

  
  const resolveAdStatusVariant = (status: number) => {
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
  
  const isAdHandlerSidebarActive = ref(false)

  


  // 👉 Fetchs User
  const fetchAds = async() => {
    // let { q = searchQuery.value} = (ad || {});
    
    // await store.fetchUsers({
    await store.fetchAds({
      q: searchQuery.value,
      byProvince: selectedProvince.value ?? '',
      byCity: selectedCity.value ?? '',
      status: selectedStatus.value,
      perPage: rowPerPage.value,
      currentPage: currentPage.value
    }).then(response => {
      // console.log('adds', response)
      let data= response.data;
      ads.value = data.ads
      totalPage.value = data.totalPage
      totalAds.value = data.totalAds
      refetchData(response.data.stats)
    }).catch(error => {
      console.error(error)
    })
  }
  
  
  // 👉 Fetch Ad
  const fetchAd = (ad) => {
    store.fetchAd(ad).then(() => {
      // userListStore.addAdr(userData)

      // // refetch User
      // fetchUsers()
    })
  }

  // 👉 Add ad
  const addAd = (ad) => {
    store.addAd(ad).then(() => {
      
    })
  }

  // 👉 Update ad
  const updateAd = (_event: User) => {
    var index = ads.value.findIndex( x => x.id == _event.id)
   
    ads.value[index] = _event
    
    store.updateAds(_event)
      .then(r => {
          console.log('ad', r)
      })
  }

  // 👉 Remove user
  const removeAd = (userId: string) => {
    store.removeAd(userId).then(() => {
      
    })
  }
  
  
  
  
  // 👉 List
const adListMeta = ref([])

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
    
  adListMeta.value = [{
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
  
  
  // 👉 watching current page
  watchEffect(fetchAds)

  
  watchEffect(() => {
    if (currentPage.value > totalPage.value) {
      currentPage.value = totalPage.value
    }
  })

  

return {
    selectedProvince,
    selectedCity,

    currentPage,
    totalPage,
    rowPerPage,
    searchQuery,
    selectedStatus,
    totalAds,
    ads,
    adListMeta,
    statusAd,
    selectedAd,
    resolveAdStatusVariant,
    isAdHandlerSidebarActive,
    fetchAds,
    fetchAd,
    addAd,
    updateAd,
    removeAd
  }
}
