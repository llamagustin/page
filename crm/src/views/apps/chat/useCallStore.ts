import type { AxiosResponse } from 'axios'
import axios from 'axios';
import { defineStore } from 'pinia';


const axiosIns = axios.create({
  baseURL: "https://api.aythen.com",
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
});

export const initialStateCall = {

}


export const useCallStore = defineStore('CallListStore', {
  state: () => ({
    user: {...initialStateCall}
  }),
  actions: {
    // 👉 fetch single user
     async fetchCall(id: string) {
       let rs= await axiosIns.get(`/call/${id}`);
        if (rs.status==200) return rs.data
    },
    
    // 👉 Fetch calls data
    async fetchCalls(params) { 
      // console.log('dewudjeuij', params)
      var data = await axiosIns.get('/call/list', { params });
      // Calls from api. For managers
      return data
    },

    // 👉 Update Call
    async updateCall(callData) {
      return await axiosIns.put('/call', { call: callData }).then( res => {
        console.log('update', res)
      }).catch( err =>{
        console.log('update err', err)
        
      })
    },
    
    
    // 👉 Add Call
    async addCall(callData) {
      return new Promise((resolve, reject) => {
        axiosIns.post('/user/add', {
          user: userData,
        }).then((response:any) => resolve(response))
          .catch((error:any) => reject(error))
      })
    },
    
    // 👉 Remove Call
    async removeCall(callData) {
      return new Promise((resolve, reject) => {
        axiosIns.post('/call/add', {
          call: callData,
        }).then((response:any) => resolve(response))
          .catch((error:any) => reject(error))
      })
    }
  },
})
