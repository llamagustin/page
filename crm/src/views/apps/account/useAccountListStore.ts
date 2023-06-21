import type { AccountProperties } from '@/@fake-db/types'
import type { AccountParams } from '@/views/apps/account/types'
import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import axiosIns from '@axios';



export const initialStateAccount = {
  fullName: '',
  avatar: null,
  email: '',
  phone: '',
  status: 400,
  source: 'funnel-reseller',
  plan: '',
  role: 'reseller',
  // role: 'seller',
  address: {
    country: 'España',
    province: '',
    city: '',
    latitude: '',
    longitude: '',
    line: '',
    zip: []
  },
  abilities: [],
  zone: [],
  category: [],
  notification: [{"a": true, "b": true, "e": true, "t": 0}, {"a": true, "b": true, "e": true, "t": 1}, {"a": true, "b": true, "e": true, "t": 2}, {"a": true, "b": true, "e": true, "t": 3}],
  contact: '',
  
  rating: 0,
  steps: [],
  note: '',
  infoAt: null
}

export const useAccountListStore = defineStore('AccountListStore', {
  state: () => ({
    account: {...initialStateAccount}
  }),
  actions: {
    // 👉 Fetch Notification
    async fetchNotification(userId, params = {}) {
      const res = await axiosIns.get('/devices/' + userId, { params });
      console.log('alert', res.data)
      return res.data;
    },
    // 👉 Fetch leads
    async fetchLeadsZips(userId, params = {}) {
      const res = await axiosIns.get('/account/' + userId + '/leads/zips', { params });
      console.log('dd', res.data)
      return res.data.zips;
    },
    
    // 👉 Fetch leads
    async fetchLeads(userId, params = {}) {
      const res = await axiosIns.get('/account/' + userId + '/leads', { params });
      return res.data.users;
    },
    
    // 👉 Fetch account data
    async fetchAccounts(params: AccountParams) {
      const data = await axiosIns.get('/account/list', { params });
      return data;
    },
    
    // 👉 Add Account
    addAccount(accountData: AccountProperties) {
      return new Promise((resolve, reject) => {
        axiosIns.post('/account/add', {
          account: accountData,
        }).then(response => resolve(response))
          .catch(error => reject(error))
        
      })
    },
    // 👉 Fetch leads
    async fetchByEmail(email:string) {
      return new Promise<AxiosResponse>((resolve, reject) => {
        axiosIns.get(`/account/get-by-email/${email}`).then(response => resolve(response)).catch(error => resolve(error))
      })
    },
    // 👉 fetch single account
    fetchAccount(id) {
      return new Promise<AxiosResponse>((resolve, reject) => {
        axiosIns.get(`/account/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
    // 👉 delete single account
    deleteAccount(data) {
      return new Promise<AxiosResponse>((resolve, reject) => {
        axiosIns.post(`/account/delete`, data).then(response => resolve(response)).catch(error => reject(error))
      })
    },
    // 👉 fetch leads assigned
    getLeadAssined (id: string) {
      return new Promise<AxiosResponse>((resolve, reject) => {
        axiosIns.get(`/account/${id}/leads`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
    // 👉 update single account
    updateAccount(accountData:any ) {
      const {id} = accountData;
      return new Promise<AxiosResponse>((resolve, reject) => {
        axiosIns.put(`/account`,accountData).then(rs => resolve(rs)).catch(err => reject(err))
      })
    },
    updateLeadPassword(data){
      
       return new Promise<AxiosResponse>((resolve, reject) => {
     
        axiosIns.put(`/account/password/update`, data)
        .then(res => resolve(res) ).catch(error => reject(error) )
      })
    },
    savePassword(data ) {
      return new Promise<AxiosResponse>((resolve, reject) => {
     
        axiosIns.post(`/account/password/save`, data).then(response => resolve(response)).catch(error => reject(error))
      })
    },
    importData(data){
      return new Promise<AxiosResponse>((resolve, reject) => {
     
        axiosIns.post(`/account/import`, { data: data }).then(response => resolve(response)).catch(error => reject(error))
      })
    },
    
    
    //
    // twistSync(data){
    //   return new Promise<AxiosResponse>((resolve, reject) => {
    //     axiosIns.post(`/user/twist`, { zones: data }).then(response => resolve(response)).catch(error => reject(error))
    //   })
    // },
    // syncUser(data){
    //   return new Promise<AxiosResponse>((resolve, reject) => {
    //     axiosIns.post(`/user/sync`, { users: data }).then(response => resolve(response)).catch(error => reject(error))
    //   })
    // }
  },
})
