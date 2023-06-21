import { defineStore } from 'pinia';
import moment from "moment"
import { initialStateAcademy } from './academy.data';
import ListEvents from "./webinar.json";
import { AcademyQuestions, Abilities } from './academy.interfaces';

import axios from "axios"

const axiosIns = axios.create({
  baseURL: "https://api.aythen.com",
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
});


const accountData= JSON.parse(localStorage.userData || "{}")


export const useAcademyStore = defineStore('academy',()=> {
  const initialState = JSON.parse(JSON.stringify(initialStateAcademy));
  const {webinar}= JSON.parse(localStorage.userAbilities || "{}")
  
  const  Questions = ref(initialState)
  const lastStep = ref<number>(1);
  const panel = ref<number>(0);
  const events = ref({})
  const abilities = ref<Abilities>({})
  const currentDate = new Date();

  abilities.value = {
    crm: currentDate > new Date(webinar?.crm?.split('T')[0]) ,
    aythen: currentDate > new Date(webinar?.aythen?.split('T')[0]),
    reseller: currentDate > new Date(webinar?.reseller?.split('T')[0])
  };

  events.value.aythen={...ListEvents[0], enabled:abilities.value.aythen}
 events.value.reseller={...ListEvents[2], enabled:abilities.value.reseller}
  events.value.crm={...ListEvents[3], enabled:abilities.value.crm}
  
  
  function updatePanel(step:any) {
    panel.value = step
  }
  
  async function getByEmail(email:any){
    const {data} = await axiosIns.get('/account/get-by-email/' + email);
    Questions.value=Object.assign(initialState, data.academyQuestions);
    
    if (Questions.value.webinars.aythen.completed)  events.value.aythen.status = 3;
    if (Questions.value.webinars.reseller.completed)  events.value.reseller.status = 3;
    if (Questions.value.webinars.crm.completed)  events.value.crm.status = 3;  
      
      
      
    return data.academyQuestions
  }
  async function updateAccount(data:any){
    // var qr=await axiosIns.put('/account/'+ accountData.id, {
    var qr = await axiosIns.put('/account', {
      academyQuestions: data,
      academyCompletedAt: moment().format('Y-MM-DD'),
      id: accountData.id
    }).then((rs:any)=> rs.data)
    
  }
  
  return {Questions,lastStep,getByEmail,updateAccount,panel,events,updatePanel}
});