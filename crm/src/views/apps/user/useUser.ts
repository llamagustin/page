
import type { Ref } from 'vue';
import type { User, NewUser } from './types'
import { useUserListStore } from '@/views/apps/user/useUserListStore'
//import { services  } from '@/@fake-db/services'

export const blankUser = {

}


const userData = JSON.parse(localStorage.getItem('userData'))



export const useUser = (user: Ref<User | NewUser>, isLeftSidebarOpen: Ref<boolean>) => {
  // 👉 Store
  const store = useUserListStore()
  
  const rowPerPage = ref(10)
  const currentPage = ref(1)
  const totalPage = ref(1)
  const isClient = ref(false)
  const searchQuery = ref('')
  const selectedPlan = ref()
  const selectedStatus = ref()
  const selectedSource = ref()
  const totalUsers = ref(0)
  const leadId = ref('')
  const users = ref<UserProperties[]>([])
  // const metaUser = ref([]);
  
  const selectedUser = ref();
  
  const tools = ref(JSON.parse(localStorage.dataTools || "[]" ) )
  

  const planUser = tools.value.map(s=>{
    return {value:s.tag, title:s.subtitle}
  })
  
  const statusLead  = [
    { title: 'Pendientes', value: '3' },
    { title: 'Aceptados', value: '2' },
    { title: 'Cancelados', value: '4' },
  ]

  const sourceUser=[
    {title: 'FUNNEL', value:'funnel-lead'},
    {title:'GOOGLE', value:'google-scrap'}
  ]
  const statusUser = [
    { title: '200 - Aceptado', value: '200' },
    { title: '201 - Pagado', value: '201' },
    { title: '202 - Firmado', value: '202' },
    { title: '301 - Pagando', value: '301' },
    { title: '302 - Firmando', value: '302' },
  ]
  
  const resolveUserStatusVariant = (status: number) => {
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
  
  const isUserHandlerSidebarActive = ref(false)

  
  // 👉 User colors
  const userColor = {
    Business: 'primary',
    Holiday: 'success',
    Personal: 'error',
    Family: 'warning',
    ETC: 'info',
  }


  // 👉 Fetchs User
  const fetchUsers = async (_user) => {
    let { q = searchQuery.value} = (_user || {});
    
    // await store.fetchUsers({
    await store.fetchLeads(userData.id, {
      q: q,
      status: selectedStatus.value,
      source:selectedSource.value,
      plan: selectedPlan.value,
      perPage: rowPerPage.value,
      currentPage: currentPage.value,
      isClient: isClient.value,
      leadId: leadId.value,
    }).then(response => {
      let data= response.data
      users.value = data.users
      totalPage.value = data.totalPage
      totalUsers.value = data.totalUsers
      // metaUser.value = data.metaUser
      refetchData(response.data.stats)
    }).catch(error => {
      console.error(error)
    })
  }
  
  
  // 👉 Fetch User
  const fetchUser = (_user: User) => {
    store.addUser(_user).then(() => {
      userListStore.addUser(userData)

      // refetch User
      fetchUsers()
    })
  }

  // 👉 Add user
  const addUser = (_user: User) => {
    store.addUser(_user).then(() => {
      
    })
  }

  // 👉 Update user
  const updateUser = (_event: User) => {
    var index = users.value.findIndex( x => x.id == _event.id)
   
    users.value[index] = _event
    
    store.updateUser(_event)
      .then(r => {
          console.log('user', r)
      })
  }

  // 👉 Remove user
  const removeUser = (userId: string) => {
    store.removeUser(userId).then(() => {
      
    })
  }
  
  
  
  
  // 👉 List
const userListMeta = ref([])

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
    
  userListMeta.value = [{
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
  watchEffect(fetchUsers)

  
  watchEffect(() => {
    if (currentPage.value > totalPage.value) {
      currentPage.value = totalPage.value
    }
  })

  

return {
    currentPage,
    totalPage,
    searchQuery,
    selectedPlan,
    selectedSource,
    totalUsers,
    isClient,
    users,
    planUser,
    userListMeta,
    statusUser,
    statusLead,
    selectedStatus,
    selectedUser,
    resolveUserStatusVariant,
    isUserHandlerSidebarActive,
    userColor,
    fetchUsers,
    fetchUser,
    addUser,
    sourceUser,
    updateUser,
    removeUser,
    leadId
  }
}
