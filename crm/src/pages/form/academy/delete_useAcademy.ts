import { defineStore } from 'pinia';
import moment from "moment"
//import axios from "@axios"
import { initialStateAcademy } from './academy.data';
import { AcademyQuestions, Abilities } from './academy.interfaces';
import ListEvents from "./webinar.json";
import {useAcademyStore} from './useAcademyStore'


export const useAcademy =  () => {
  
  const initialState = JSON.parse(JSON.stringify(initialStateAcademy));
  const {webinar}= JSON.parse(localStorage.userAbilities || "[{}]")[0]
  const accountData= JSON.parse(localStorage.userData || "{}")

  const store = useAcademyStore();
  

  const academyQuestions= ref(initialState)
  
  const lastStep = ref<number>(1);
  const showQuestions = ref<boolean>(true);
  const panel = ref(0);
  const abilities = ref<Abilities>({})
  const events = ref({})
  const currentDate = new Date();

  abilities.value = {
    crm: currentDate > new Date(webinar.crm) ,
    aythen: currentDate > new Date(webinar.aythen),
    reseller: new Date(webinar.reseller) < currentDate,
    services: new Date(webinar.services) < currentDate,
  };
  
  events.value.aythen={...ListEvents[0], enabled:abilities.value.aythen}
  events.value.services={...ListEvents[1], enabled:abilities.value.services}
  events.value.reseller={...ListEvents[2], enabled:abilities.value.reseller}
  events.value.crm={...ListEvents[3], enabled:abilities.value.crm}
  
   store.getByEmail(accountData.email).then(qr=>{
     academyQuestions.value= Object.assign(initialState, qr.academyQuestions )   

    if (academyQuestions.value.webinars.aythen.completed)  events.value.aythen.status = 3;
    if (academyQuestions.value.webinars.services.completed)  events.value.services.status = 3;
    if (academyQuestions.value.webinars.reseller.completed)  events.value.reseller.status = 3;
    if (academyQuestions.value.webinars.crm.completed)  events.value.crm.status = 3;
    
   })

  function updatePanel(step:any) {
    panel.value = step
  }
  
  function updateQuestions(data:any){
    academyQuestions.value=data
  }
  
  return {
    events,
    abilities,
    academyQuestions,
    lastStep,
    showQuestions,
    panel,
    updatePanel,
    store,
    updateQuestions
  }
};