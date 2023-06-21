import type { AxiosResponse } from 'axios'
import axiosIns from '@axios';
import { defineStore } from 'pinia';

export const initialStateAd = {
  company: '',
  web: '',
  path: '',
  phone: '',
  email: '',
  tools: [],
  name: {
    name: '',
    firstSurname: '',
    secondSurname: ''
  },
  address: {
    country: 'España',
    province: '',
    city: '',
    latitude: '',
    longitude: '',
    line: '',
    zip: ''
  },
  entity: [],
  social: 0,
  budget: 0,
  note: '',
  rating: 5,
  status: 400,
  emails_sent: [],
  avatar: null,
  abilities: {},
  otorgate: '',
  cif: '',
  google: '',
  cnae: null,
  description: '',
  auditor: '',
  propietary: '',
}


export const useAdListStore = defineStore('AdListStore', {
  state: () => ({
    ad: {...initialStateAd}
  }),
  actions: {
    // 👉 Fetch leads
    async fetchLeadsZips(adId, params = {}) {
      // console.log('--------a-----------')
      const res = await axiosIns.get('/ad/' + adId + '/leads/zips', { params });
      // console.log('dd', res.data)
      return res.data.zips;
    },
    
    
    // 👉 fetch single ad
    async fetchAd(id: string) {
      let rs= await axiosIns.get(`/ad/${id}`);
      if (rs.status==200) return rs.data
    },
    
    // 👉 Fetch ads data
    async fetchAds(params) { 
      var data = await axiosIns.get('/ad/list', { params });
      // Users from api. For managers
      return data
    },

    // 👉 Update ad
    async updateAd(adData) {
      console.log('Passed by store')
      return await axiosIns.put('/ad', adData).then( res => {
        console.log('update', res)
      }).catch( err =>{
        console.log('update err', err) 
      })
    },
    
    
    // 👉 Add ad
    async addAd(adData){
      return new Promise((resolve, reject) => {
        axiosIns.post('/ad/add', {
          user: adData,
        }).then((response:any) => resolve(response))
          .catch((error:any) => reject(error))
      })
    },
    
    // 👉 Remove ad
    async removeAd(adData) {
      return new Promise((resolve, reject) => {
        axiosIns.post('/ad/remove', {
          user: adData,
        }).then((response:any) => resolve(response))
          .catch((error:any) => reject(error))
      })
    }
  },
})
