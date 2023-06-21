
import type { Ref } from 'vue';
import { useCallStore } from '@/views/apps/chat/useCallStore'
//import { services  } from '@/@fake-db/services'

const userData = JSON.parse(localStorage.getItem('userData'))


export const useCall = (call, isLeftSidebarOpen: Ref<boolean>) => {
  // 👉 Store
  const store = useCallStore()
  
  const rowPerPage = ref(10)
  const currentPage = ref(1)
  const totalPage = ref(1)
  const searchQuery = ref('')
  const selectedStatus = ref()
  const totalCalls = ref(0)
  const calls = ref([])
  // const metaUser = ref([]);
  
  const selectedCall = ref();
  
  const statusCall = [
    { title: '200 - Aceptado', value: '200' },
    { title: '201 - Pagado', value: '201' },
    { title: '202 - Firmado', value: '202' },
    { title: '301 - Pagando', value: '301' },
    { title: '302 - Firmando', value: '302' },
  ]
  
  const resolveCallStatusVariant = (status: number) => {
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
  
  const isCallHandlerSidebarActive = ref(false)

  // 👉 Fetchs Call
  const fetchCalls = async (params) => {
    let { q = searchQuery.value} = (params || {});
    

    await store.fetchCalls({
      id: userData.id,
      q: q,
      status: selectedStatus.value,
      perPage: rowPerPage.value,
      currentPage: currentPage.value
    }).then(response => {
        console.log('response', response)
      let data= response.data;
      calls.value = data.calls
      console.log(calls.value)
      totalPage.value = data.totalPage
      totalCalls.value = data.totalCalls
      refetchData(response.data.stats)
    }).catch(error => {
      console.error(error)
    })
  }
  
  
  // 👉 Fetch Call
  const fetchCall = (_call) => {
    store.fetchCall(_call).then(() => {
    })
  }

  // 👉 Add call
  const addCall = (_call) => {
    store.addCall(_call).then(() => {
      
    })
  }

  // 👉 Update call
  const updateCall = (_event) => {
    var index = calls.value.findIndex( x => x.id == _event.id)
   
    calls.value[index] = _event
    
    store.updateCall(_event)
      .then(r => {
          console.log('call', r)
      })
  }

  // 👉 Remove user
  const removeCall = (callId: string) => {
    store.removeCall(callId).then(() => {
      
    })
  }
  
  
  
  
  // 👉 List
const callListMeta = ref([])

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
    
  callListMeta.value = [{
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
  watchEffect(fetchCalls)

  
  watchEffect(() => {
    if (currentPage.value > totalPage.value) {
      currentPage.value = totalPage.value
    }
  })
  
  
  // 👉 Computing pagination data
  const paginationData = computed(() => {
    const firstIndex = calls.value.length ? ((currentPage.value - 1) * rowPerPage.value) + 1 : 0
    const lastIndex = calls.value.length + ((currentPage.value - 1) * rowPerPage.value)

    return `Mostrando ${firstIndex} de ${lastIndex} de ${totalCalls.value} valores`
  })

  
  
  // 
  // 👉 Computing pagination data
  // 
  // 👉 Computing pagination data
  // 
  
  const called = ref('')
  const calling = ref(false)
  const loadingCall = ref(false)
  
  
  // if(user.value.phone){
  //   called.value = user.value.phone
  // }
  
  const onCall = (call) => {
    loadingCall.value = true
    // selectedMenu.value = 'º'
    // calling.value = true
    calling.value = true
    called.value = '+34' + user.value.phone
    // console.log('called', called.value)
  }
  
  
  
  
  
  
  const loadCall = (status) => {
    console.log('connect call: ', status)
    if(status){
      loadingCall.value = false
      selectedMenu.value = 'caller'
      setTimeout(function(){
        console.log('connected')
      }, 1000)
    }else{
      selectedMenu.value = 'user'
      called.value = ''
      calling.value = false
      // loadCall.value = false
      
      window.call.disconnect();
    }
  }
  
  const onHangout = () => {
    loadCall(false)
  }


return {
    currentPage,
    totalPage,
    paginationData,
    searchQuery,
    selectedStatus,
    totalCalls,
    calls,
    callListMeta,
    statusCall,
    selectedStatus,
    selectedCall,
    resolveCallStatusVariant,
    isCallHandlerSidebarActive,
    fetchCalls,
    fetchCall,
    addCall,
    updateCall,
    removeCall
  }
}



