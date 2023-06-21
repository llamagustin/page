
import type { Ref } from 'vue'
import { useAccountListStore } from '@/views/apps/account/useAccountListStore'

export const blankAccount = {

}


const userData = JSON.parse(localStorage.getItem('userData'))



export const useAccount = () => {

// 👉 Store
  const store = useAccountListStore()
  
  const rowPerPage = ref(10)
  const currentPage = ref(1)
  const totalPage = ref(1)
  const searchQuery = ref('')
  const selectedPlan = ref()
  const selectedStatus = ref()
  const selectedSource = ref()
  const totalAccounts = ref(0)
  const accounts = ref([])
  // const metaUser = ref([]);
  
  
  const searchQueryNotification = ref('')
  const notifications = ref([])
  const selectedStatusNotification = ref()
  const selectedSourceNotification = ref()
  const totalPageNotification = ref([])
  const totalNotification = ref([])
  const metaNotification = ref([])
  
  
  
  //
  const selectedAccount = ref();
  
 
  
  // 👉 search filters
    const roles = [

      { title: 'Admin', value: 'admin' },
      { title: 'Reseller', value: 'seller' },
      //{ title: 'Freelancer', value: 'freelancer' },
    ]
  
  const statusAccount  = [
    { title: 'Activo', value: 200 },
      { title: 'Pendiente', value: 300 },
      { title: 'Inactivo', value: 400 },
  ]

    
    
  const sourceAccount=[
    {title: 'FUNNEL', value:'funnel-lead'},
    {title:'GOOGLE', value:'google-scrap'}
  ]

  const resolveAccountStatusVariant = (status: number) => {
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
  
  const resolveAccountRoleVariant = (role: string) => {
      if (role === 'seller')
        return { color: 'warning', icon: 'tabler-user' }
      if (role === 'freelancer')
        return { color: 'info', icon: 'tabler-pencil' }
      if (role === 'admin')
        return { color: 'secondary', icon: 'tabler-device-laptop' }
    
      return { color: 'primary', icon: 'tabler-user' }
    }
  
  const isAccountHandlerSidebarActive = ref(false)

  
  // 👉 Account colors
  const accountColor = {
    Business: 'primary',
    Holiday: 'success',
    Personal: 'error',
    Family: 'warning',
    ETC: 'info',
  }

  
  // 👉 Fetchs Account
  const fetchNotifications = async (_notification) => {
    let { q = searchQuery.value} = (_notification || {});
    
    // await store.fetchUsers({
    await store.fetchNotification(userData.id, {
      q: q,
      status: selectedStatus.value,
      plan: selectedPlan.value,
      perPage: rowPerPage.value,
      currentPage: currentPage.value,
    }).then(response => {
      console.log('eee', response)
      // let data= response.data;
      notifications.value = response.notifications
      totalPageNotification.value = response.totalPage
      totalNotification.value = response.totalNotification
      metaNotification.value = response.stats
    }).catch(error => {
      console.error(error)
    })
  }

  // 👉 Fetchs Account
  const fetchAccounts = async (_account) => {
    let { q = searchQuery.value} = (_account || {});
    
    // await store.fetchUsers({
    await store.fetchAccounts({
      id: userData.id,
      q: q,
      status: selectedStatus.value,
      source:selectedSource.value,
      perPage: rowPerPage.value,
      currentPage: currentPage.value,
    }).then(response => {
      console.log('fetch accounts', response)
      let data= response.data;
      accounts.value = data.accounts
      totalPage.value = data.totalPage
      totalAccounts.value = data.totalAccounts
      // metaUser.value = data.metaUser
      // refetchData(response.data.stats)
    }).catch(error => {
      console.error(error)
    })
  }
  
  
  // 👉 Fetch Account
  const fetchAccount = (_account) => {
    console.log('fetch account')
    // store.addAccount(_account).then(() => {
    //   accountListStore.addUser(accountData)

    //   // refetch User
    //   fetchUsers()
    // })
  }

  // 👉 Add account
  const addAccount = (_account) => {
    store.addAccount(_account).then(() => {
      
    })
  }

  // 👉 Update account
  const updateAccount = (_event) => {
    var index = accounts.value.findIndex( x => x.id == _event.id)
   
    accounts.value[index] = _event
    
    store.updateAccount(_event)
      .then(r => {
          console.log('account', r)
      })
  }

  // 👉 Remove account
  const removeAccount = (userId: string) => {
    store.deleteAccount({id: userId}).then(() => {
      
    })
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
  
  
  // 👉 watching current page
  watchEffect(fetchAccounts)

  
  watchEffect(() => {
    if (currentPage.value > totalPage.value) {
      currentPage.value = totalPage.value
    }
  })

  

return {
    searchQueryNotification,
    notifications,
    selectedStatusNotification,
    selectedSourceNotification,
    totalPageNotification,
    totalNotification,
    metaNotification,
    fetchNotifications,

    currentPage,
    totalPage,
    searchQuery,
    selectedPlan,
    selectedStatus,
    statusAccount,
    selectedSource,
    totalAccounts,
    roles,
    accounts,
    accountListMeta,
    selectedStatus,
    selectedAccount,
    resolveAccountRoleVariant,
    resolveAccountStatusVariant,
    isAccountHandlerSidebarActive,
    fetchAccounts,
    fetchAccount,
    addAccount,
    sourceAccount,
    updateAccount,
    removeAccount
  }
  
}
