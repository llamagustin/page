import axios from '@axios';
import { defineStore } from 'pinia';
import type { FormData, FormParams } from './types';


const axiosIns = axios.create({
  baseURL: "https://api.aythen.com",
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
  }
});



export const initialFormData = {
  // user_id: '',
  // client: {},
  // service: '',
  ref: '',
  total: 0,
  status: 300,
  note: '',
  items: [],
  paymentMethod: {
    iban: "",
    country: "",
    bankName: "",
    totalDue: "",
    swiftCode: ""
  },
  issuedDate: '',
  dueDate: '',
  payDate: '',
  info: {
    city: '',
    line: ''
  }
}


export const useFormStore = defineStore('FormStore', {
  state: () => ({
    formData: {...initialFormData},
    forms: []
  }),
  actions: {
    // 👉 Fetch leads
    async fetchLeads(userId) {
      const data = await axiosIns.get('/account/' + userId + '/leads');
      return data;
    },
    
    // 👉 Fetch all Forms
    async fetchForms(userId, params: FormParams) {
      var response = await axiosIns.get('/form/' + userId + '/all', { params })
      
      // console.log('forms', response)
      this.forms = response.data.forms
      
      return response
    },

    // 👉 Fetch single invoice
    fetchForm(id) {
      return axiosIns.get(`/form/${id}`)
    },
    updateForm(form:FormData){
      return axiosIns.put('/form',form)
    },
    postForm(form:FormData){
      return axiosIns.post(`/form`, {form: form });
    },

    // 👉 Fetch Clients
    fetchClients() {
      return axiosIns.get('/form/clients')
    },
  },
})
