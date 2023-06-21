<script setup lang="ts">
import { Router } from '@angular/router';


import { loadScript } from "@/shared/utils/dom";
import { localStore } from "@/shared/utils/sessionStore"
import "./output.css";
import { useRouter } from 'vue-router'
import { useUbigeo } from "@/shared/composables/useUbigeo"
import { watch, defineAsyncComponent } from 'vue'

const FormAbout = defineAsyncComponent(() => import("@/pages/form/payment/FormAbout.vue"))
const FormNotary = defineAsyncComponent(() => import("@/pages/form/payment/FormNotary.vue"))
const FormCalculator = defineAsyncComponent(() => import("@/pages/form/payment/FormCalculator.vue"))
const FormChoose = defineAsyncComponent(() => import("@/pages/form/payment/FormChoose.vue"))
const FormQuestion = defineAsyncComponent(() => import("@/pages/form/payment/FormQuestion.vue"))
const FormSuscription = defineAsyncComponent(() => import("@/pages/form/payment/FormSuscription.vue"))
const PanelInfo = defineAsyncComponent(() => import("@/pages/form/payment/PanelInfo.vue"))
const FormEnd = defineAsyncComponent(() => import("@/pages/form/payment/FormEnd.vue"))
const FormSignaturit = defineAsyncComponent(() => import("@/pages/form/payment/FormSignaturit.vue"))
const FormLocation = defineAsyncComponent(() => import("@/pages/form/payment/FormLocation.vue"))
const FormMaintance = defineAsyncComponent(() => import("@/pages/form/payment/FormMaintance.vue"))



import axios from "@axios";

const axiosIns = axios.create({
  baseURL: "https://api.aythen.com",
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
});

//axiosIns.defaults.baseURL = "https://test-api.aythen.com"
const isMobile = ref(false)
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  console.log('El usuario está accediendo desde un dispositivo móvil');
  isMobile.value = true
}




const INITIAL_STEP = 1

const router = useRouter()
const isAvailable = ref(false)
const data = ref({
  form: [
    true,  
    false, 
    false, 
    false, 
    false, 
    false, 
    false, 
    false, 
  ],
  num: [
    "bg-indigo-500 text-white",
    "bg-slate-100 text-slate-500",
    "bg-slate-100 text-slate-500",
    "bg-slate-100 text-slate-500",
    "bg-slate-100 text-slate-500",
    "bg-slate-100 text-slate-500",
    "bg-slate-100 text-slate-500",
  ],
})

const show = (num: any) => {
  if(position.value == 8) return
  console.log('position', position.value)
  if(num>position.value) position.value=num
  
  data.value.form.map((_: any, index: number) => {
    data.value.form.splice(index, 1, false);
  });
  data.value.form.splice(num - 1, 1, true);
  data.value.num.map((_: any, index: number) => {
    if (index < num) {
      data.value.num.splice(
        index,
        1,
        "bg-indigo-500 text-white cursor-pointer"
      );
    } else {
      data.value.num.splice(
        index,
        1,
        "bg-slate-100 text-slate-500 cursor-default"
      );
    }
  });
};

const acquiredServices = computed(() => {
  return dataForm.plans.reduce(
    (acc: any, item: any) => ({
      ...acc,
      [item.tag]: item,
    }),
    {}
  );
});

const dataForm = reactive({
  id: "",
  fullName: "",
  name: "",
  firstSurname: "",
  secondSurname: "",
  
  address_country: "España",
  address_province: "",
  address_city: "",
  address_zip: "",
  address_line: "",
  address_latitude: "",
  address_longitude: "",
  company: "",
  nif: "",
  
  notaryName: "",
  notaryFirstSurname: "",
  notarySecondSurname: "",
  notaryNumber: "",
  notaryDate: "",
  
  phone: "",
  email: "",
  web: "",
  category: "",
  employeers: 0,
  //kit digital
  contact: [],
  oauth: [],
  username: "",
  plan: "",
  status: "",
  budget: "",
  plans: [],

  subvencion: "",

  question: {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
    11: null,
    12: null,
    13: null,
  },

  /**************************
  Card Information
  **************************/
  card_token: "",
  card_number: "",
  card_name: "",
  card_expiration: "",
  card_cvc: "",

  nameProvince: "",
  nameCity: "",

  // dateCite: "",
  // card: {
  //   token: "",
  //   bank: 'bbva',
  //   type: 'tpv',
  //   verified: true
  // },
  acceptTermsAndConditions: false,
  signature: {},
});


//event upload and save localstorage
if(localStorage.getItem('form-lead-token')){
  const _dataForm = JSON.parse(window.atob(localStorage.getItem('form-lead-token')))
  Object.assign(dataForm, _dataForm);
}




watch(dataForm, (newVal, oldVal)  => {
  const _dataForm = window.btoa(JSON.stringify(newVal))

  localStore('form-lead', newVal)
  localStorage.setItem('form-lead-token', _dataForm)
})


function clearCreditCard() {
  dataForm.card_number = "";
  dataForm.card_name = "";
  dataForm.card_expiration = "";
  dataForm.card_cvc = "";
}

function clearQuestions() {
  dataForm.question = {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
    11: null,
    12: null,
    13: null,
  };
}

const panelActive = ref(0);
function setActivePanel(indexPanel: number) {
  panelActive.value = indexPanel;
  
}

const onSubmit = async () => {
  const plans = dataForm.plans.reduce((acc,item) => ({
    ...acc,
    [item.tag]: {...item}
  }),{})
  

  const formData = ref({
    fullName: dataForm.fullName,
    name: {
      name: dataForm.name,
      firstSurname: dataForm.firstSurname,
      secondSurname: dataForm.secondSurname,
    },
    address: {
      country: "España",
      province: dataForm.nameProvince,
      city: dataForm.nameCity,
      zip: dataForm.address_zip,
      line: dataForm.address_line,
      latitude: dataForm.address_latitude,
      longitude: dataForm.address_longitude,
    },
    notary: {
      name: dataForm.notaryName,
      firstSurname: dataForm.notaryFirstSurname,
      secondSurname: dataForm.notarySecondSurname,
      number: dataForm.notaryNumber,
      date: dataForm.notaryDate
    },
    // signature: dataForm.signature,
    company: dataForm.company,
    nif: dataForm.nif,
    phone: dataForm.phone,
    email: dataForm.email,
    google_id:dataForm.email,
    web: dataForm.web,
    iae: dataForm.category,
    employeers: 0,
    contact: [],
    oauth: [],
    username: dataForm.username,
    plan: plans,
    budget: "",
    // carddetails: dataForm.card,
    // carddetails: [{
    //   token: dataForm.card_token,
    //   number: dataForm.card_number,
    //   name: dataForm.card_name,
    //   exp: dataForm.card_expiration,
    //   cvc: dataForm.card_cvc,
    // }],
    acceptTermsAndConditions: false,
    password:'1234',
    source:'funnel-lead'
  });
  

  // formData.value.reservation_date = dataForm.dateCite
  

  if(dataForm.card_token == ""){
    formData.value.status = 302
    
    formData.value.carddetails = [{
      token: dataForm.card_token,
      number: dataForm.card_number,
      name: dataForm.card_name,
      exp: dataForm.card_expiration,
      cvc: dataForm.card_cvc,
    }]
    
  }else{
    formData.value.status = 201
  }
  
  console.log('form', formData.value)
  
  
  axiosIns.post("/user/add", formData.value)
    .then(res => {
      console.log('res', res)
      // router.push('/login')
      
      // console.log('ewodiwjeifj', res)
      dataForm.id = res.data.id
      
      
      
    })
    .catch((err) => {
      console.log('err', err)
    })
  // isAvailable.value = true;
  // console.log(qr);
};

function handleClickGoToStep(step: number) {
  if (step > lastStep.value) return;
  
  if (step < 6) {
    show(step);
  } else if (step == 5) {
    if (dataForm.subvencion == "without") return;
    show(5);
  } else if (step == 6) {
    if (dataForm.subvencion == "with") return;
    show(step);
  }
}

const questionsAnswered = computed(() => {
  const questions = Object.entries(dataForm.question)
    .map((item) => item[1])
    .filter((item) => item)
  return questions.length;
});

const lastStep = ref(INITIAL_STEP);
function updateLastStep(step: number) {
  if (lastStep.value > step) return;
  lastStep.value = step;
}

const position=ref(1)

const goTo = val=>{
  if(val <= position.value)  handleClickGoToStep(val)
}

// GET UBIGEO
const { ubigeo, getCities, getCodes } = useUbigeo()


//GET SIGNATURIT

</script>

<template>
  <div class="relative flex">
    <!-- Content -->
    <div class="w-full md:w-1/2">
      
      <div class="min-h-screen h-full flex flex-col px-2">
        <div>
          <!-- Header -->
          <div
            class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8"
          >
            <!-- Logo -->
            <div class="block" @click="show(1)">
              <img src="/src/assets/images/www/logo.svg" width="40" />
            </div>
            <div class="block">
              <img src="/src/assets/images/www/eu-logo.png" width="180" />
            </div>
          </div>
        </div>
        
        <!-- Progress bar -->
        <div class="p-4">
          <div class="max-w-md mx-auto w-full">
            <div class="relative">
              <div
                class="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-slate-200"
                aria-hidden="true"
              ></div>
              <ul class="relative flex justify-between w-full">
                <li>
                  <div
                    :class="`${data.num[0]}`"
                    class="flex items-center justify-center w-10 h-10 rounded-full text-xs font-semibold"
                    @click="goTo(1)"
                  >
                    <span class="cursor-default pointer-events-none">1</span>
                  </div>
                </li>
                <li>
                  <div
                    :class="`${data.num[2]}`"
                    class="flex items-center justify-center w-10 h-10 rounded-full text-xs font-semibold"
                    @click="goTo(3)"
                  >
                    <span class="cursor-default pointer-events-none">2</span>
                  </div>
                </li>
                <li>
                  <div
                    :class="`${data.num[3]}`"
                    class="flex items-center justify-center w-10 h-10 rounded-full text-xs font-semibold"
                    @click="goTo(4)"
                  >
                    <span class="cursor-default pointer-events-none">3</span>
                  </div>
                </li>
                <li v-if="false">
                  <div
                    :class="`${data.num[4]}`"
                    class="flex items-center justify-center w-10 h-10 rounded-full text-xs font-semibold"
                    @click="goTo(5)"
                  >
                    <span class="cursor-default pointer-events-none">4</span>
                  </div>
                </li>
                <li>
                  <div
                    :class="data.num[5]"
                    class="flex items-center justify-center w-10 h-10 rounded-full text-xs font-semibold"
                    @click="goTo(6)"
                  >
                    <span class="cursor-default pointer-events-none">5</span>
                  </div>
                </li>
                <li>
                  <div
                    :class="data.num[6]"
                    class="flex items-center justify-center w-10 h-10 rounded-full text-xs font-semibold"
                    @click="goTo(7)"
                  >
                    <span class="cursor-default pointer-events-none">6</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="px-4 py-4">
          <div class="max-w-md mx-auto">
            
              <!--<FormSuscription-->
              <!--  :data-form="dataForm"-->
              <!--  :show="show"-->
              <!--  @setActivePanel="setActivePanel"-->
              <!--  :updateLastStep="updateLastStep"-->
              <!--  :clear-questions="clearQuestions"-->
              <!--/>-->
              
              
            <template v-if="data.form[0]">
              <FormAbout
                :data-form="dataForm"
                :show="show"
                @setActivePanel="setActivePanel"
                :updateLastStep="updateLastStep"
              />
            </template>
            
            <template v-if="data.form[1]">
              <FormNotary
                :data-form="dataForm"
                :show="show"
                @setActivePanel="setActivePanel"
                :updateLastStep="updateLastStep"
              />
            </template>
            
            <template v-if="data.form[2]">
              <FormLocation
                :data-form="dataForm"
                :show="show"
                @setActivePanel="setActivePanel"
                :updateLastStep="updateLastStep"
                :ubigeo="ubigeo"
                :get-cities="getCities"
                :get-codes="getCodes"
              />
            </template>
            
            <template v-if="data.form[3]">
              <FormCalculator
                :data-form="dataForm"
                :show="show"
                @setActivePanel="setActivePanel"
                :updateLastStep="updateLastStep"
              />
            </template>
            
            <template v-if="data.form[4]">
              <FormChoose
                :data-form="dataForm"
                :show="show"
                @setActivePanel="setActivePanel"
                :updateLastStep="updateLastStep"
              />
            </template>
            <template v-if="data.form[5]">
              <div v-if="isMobile && !Object.keys(dataForm.signature).length">
                <FormSignaturit
                  :data-form="dataForm"
                  :submit="onSubmit"
                  @setActivePanel="setActivePanel"
                />
              </div>
              <div v-else>
                <FormQuestion
                  :data-form="dataForm"
                  :show="show"
                  @setActivePanel="setActivePanel"
                  :updateLastStep="updateLastStep"
                  :clear-credit-card="clearCreditCard"
                  :questions-answered="questionsAnswered"
                />
              </div>
            </template>
            <template v-if="data.form[6] && dataForm.subvencion=='without'">
              <FormSuscription
                :data-form="dataForm"
                :show="show"
                @setActivePanel="setActivePanel"
                :updateLastStep="updateLastStep"
                :clear-questions="clearQuestions"
              />
            </template>
            <template v-if="data.form[7]">
              <FormEnd
                :data-form="dataForm"
                :submit="onSubmit"
                :form-submitted="isAvailable"
                @setActivePanel="setActivePanel"
              />
            </template>
          </div>
        </div>
      </div>
      
    </div>

    <!-- Image -->
    <div
      v-if="!isMobile"
      class="right hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2 px-4 py-6"
      aria-hidden="true"
    >
     <div v-if="!(position == 6 && !Object.keys(dataForm.signature).length)">
      <!--<div v-if="false">-->
          <img
            class="absolute top-1/4 left-0 -translate-x-1/2 ml-8 hidden lg:block user-select-none"
            src="./auth-decoration.png"
            width="175"
            
            alt="Authentication decoration"
          />
          <PanelInfo
            :applicant="dataForm"
            :panel-active="panelActive"
            :acquired-services="acquiredServices"
            :questions-answered="questionsAnswered"
            :subvencion="dataForm.subvencion"
            :set-active-panel="setActivePanel"
          />
      </div>
      <div v-else>
          <div v-if="true">
            <FormMaintance />
          </div>
          <div v-else>
            <FormSignaturit
              :data-form="dataForm"
              :submit="onSubmit"
              @setActivePanel="setActivePanel"
            />
          </div>
      </div>
      <!--
      <p class="text-end mt-4" style="opacity: .5;">
        <a href="https://www.freepik.com/free-photo/european-flag-ruffled-beautifully-waving-macro-close-up-shot_1156335.htm#&position=40&from_view=author">Image by natanaelginting</a> on Freepik
      </p>
      -->
      
    </div>
    
    
  </div>
</template>



<style lang="scss" scoped>

:global(.layout-page-content){
  padding: 0px !important;  
}



:global(.btn) {
  background: #000fff !important;
  padding: 12px 20px !important;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}


.right {
  background-image: linear-gradient(rgba(0, 0, 255, .6),rgba(0, 0, 255, .6)),
   url('@/assets/european-flag-vertical.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
}
</style>

<route lang="yaml">
  meta:
    layout: blank
    auth: false
</route>