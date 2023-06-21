import type { UserProperties } from '@/@fake-db/types';
import type { UserParams } from '@/views/apps/user/types';
import type { AxiosResponse } from 'axios'
import axios from 'axios';
import { defineStore } from 'pinia';


const axiosIns = axios.create({
  baseURL: "https://api.aythen.com",
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
});





export const initialStateUser = {
  name: {
    name: '',
    firstSurname: '',
    secondSurname: ''
  },
  avatar: null,
  email: '',
  phone: '',
  status: '',
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
  contact: ''
}


export const useUserListStore = defineStore('UserListStore', {
  state: () => ({
    user: {...initialStateUser}
  }),
  actions: {
    //fetch leads
    async fetchLeads(userId, params = {}) {
      const data = await axiosIns.get('/account/' + userId + '/leads', { params });
     
      return data;
    },
    // 👉 Fetch account data by provinces
    async fetchUserProvinceGenerator(params: AccountParams) {
      const data = await axiosIns.get('/user/generator/province', { params });
     
      return data;
    },
    // 👉 Fetch account data by provinces
    async fetchUserCityGenerator(params: AccountParams) {
      const data = await axiosIns.get('/user/generator/city', { params });
      return data;
    },
    // 👉 Fetch account data by provinces
    async fetchUserCodeGenerator(params: AccountParams) {
      const data = await axiosIns.get('/user/generator/code', { params });
      return data;
    },
    
    
    // 👉 fetch single user
     async fetchUser(id: string) {
       let rs= await axiosIns.get(`/user/${id}`);
        if (rs.status==200) return rs.data
    },
    
    // 👉 Fetch users data
    async fetchUsers(params: UserParams) { 
      var data = await axiosIns.get('/user/list', { params });
      // Users from api. For managers
      return data
    },

    // 👉 Update User
    async updateUser(userData: UserProperties) {
      return await axiosIns.put('/user', { user: userData }).then( res => {
        console.log('update', res)
      }).catch( err =>{
        console.log('update err', err)
        
      })
    },
    
    
    // 👉 Add User
    async addUser(userData: UserProperties) {
      return new Promise((resolve, reject) => {
        axiosIns.post('/user/add', {
          user: userData,
        }).then((response:any) => resolve(response))
          .catch((error:any) => reject(error))
      })
    },
    
    // 👉 Remove User
    async removeUser(userData: UserProperties) {
      return new Promise((resolve, reject) => {
        axiosIns.post('/user/add', {
          user: userData,
        }).then((response:any) => resolve(response))
          .catch((error:any) => reject(error))
      })
    },
    // 👉 Remove Analytics 
    async analytics(idReseller:string){
      return new Promise((resolve, reject) => {
        axiosIns
          .get(`/user/analytics/${idReseller}`)
          .then((response:any) => resolve(response))
          .catch((error:any) => reject(error))
      })
    },
    async updatePassword(data){
      
       return new Promise<AxiosResponse>((resolve, reject) => {
     
        axiosIns.put(`/account/password/update`, data)
        .then(res => resolve(res) ).catch(error => reject(error) )
      })
    },
    async addUsersBulk(data) {
      return new Promise<AxiosResponse>((resolve, reject) => {
        axiosIns.post(`/user/bulk`, data)
        .then(res => {console.log('rr', res); resolve(res) })
        .catch(error => reject(error) )
      })
    },
    async sendMethodPayment(id){
        var res = await axiosIns.post(`/user/send/method-payment`, id)
    }
  },
})
