import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
//import type { AccountProperties } from '@/@fake-db/types'
//import type { AccountParams } from '@/views/apps/account/types'
import axiosIns from '@axios'




export const useEditorListStore = defineStore('EditorListStore', {
  state: () => ({
    docs: {
      
    }
  }),
  actions: {

    // 👉 Fetch doc
    async fetchDoc(params ) {

      let qr=await axiosIns.get('/docs/' + params.id, { params });
     
      return qr;
    },
    
    // 👉 fetch docs
    fetchDocs() {
      return new Promise<AxiosResponse>((resolve, reject) => {
        axiosIns.get(`/docs/list`).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Add Docs | Update Docs
    updateDoc(data) {
      return new Promise((resolve, reject) => {
        data.id = '418d53f3-1362-42fc-b817-2fbc49f11737'
        data.version = 1
        
        
        axiosIns.post('/docs', data).then(response => resolve(response))
          .catch(error => reject(error))
        
      })
    },

    

        
    codexCreator(data ) {
      return new Promise<AxiosResponse>((resolve, reject) => {
        axiosIns.post(`/docs/codex/creater`, data).then(response => resolve(response)).catch(error => reject(error))
      })
    },
    
    codexModifier(data ) {
      return new Promise<AxiosResponse>((resolve, reject) => {
        axiosIns.post(`/docs/codex/modifier`, data).then(response => resolve(response)).catch(error => reject(error))
      })
    },
    
    codexEditer(data ) {
      return new Promise<AxiosResponse>((resolve, reject) => {
        axiosIns.post(`/docs/codex/editer`, data).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  },
})
