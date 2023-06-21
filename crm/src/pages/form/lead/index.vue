<script setup lang="ts">
import { Router } from '@angular/router';

import { v4 as uuidv4 } from 'uuid';

import { loadScript } from "@/shared/utils/dom";
import { localStore } from "@/shared/utils/sessionStore"
import "./output.css";
import { useRouter } from 'vue-router'
import { useUbigeo } from "@/shared/composables/useUbigeo"
import { watch, defineAsyncComponent } from 'vue'

const FormAbout = defineAsyncComponent(() => import("@/pages/form/lead/FormAbout.vue"))
const FormFA2 = defineAsyncComponent(() => import("@/pages/form/lead/FormFA2.vue"))
const FormNotary = defineAsyncComponent(() => import("@/pages/form/lead/FormNotary.vue"))
const FormQuestion = defineAsyncComponent(() => import("@/pages/form/lead/FormQuestion.vue"))
const PanelInfo = defineAsyncComponent(() => import("@/pages/form/lead/PanelInfo.vue"))
const FormLocation = defineAsyncComponent(() => import("@/pages/form/lead/FormLocation.vue"))
const FormSign = defineAsyncComponent(() => import("@/pages/form/lead/FormSign.vue"))
const FormUnataca = defineAsyncComponent(() => import("@/pages/form/lead/FormUnataca.vue"))
const FormEnd = defineAsyncComponent(() => import("@/pages/form/lead/FormEnd.vue"))



import axios from "axios";

const axiosIns = axios.create({
  baseURL: "https://api-prod.aythen.com",
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
});


//axiosIns.defaults.baseURL = "https://test-api.aythen.com"
const isMobile = ref(false)
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  console.log('El usuario está accediendo desde un dispositivo móvil');
  isMobile.value = true
}




const INITIAL_STEP = 6

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
  if(position.value == 6) return
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


function randomNumber() {
  const min = 1000; // El número mínimo que puede generarse es 100000
  const max = 9999; // El número máximo que puede generarse es 999999
  const numero = Math.floor(Math.random() * (max - min + 1) + min); // Generar número al azar entre min y max
  return numero;
}


const dataForm = reactive({
  id: uuidv4(),
  sign_id: "",
  valid_sign: false,
  
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
  
  grantor: "",
  
  notaryName: "",
  notaryFirstSurname: "",
  notarySecondSurname: "",
  notaryNumber: "",
  notaryDate: "",
  
  valid_phone: false,
  token_phone: randomNumber(),
  dial: "+34",
  phone: "",
  dial_phone: "",
  
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
  budget: 0,
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
  // signature: {},
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

const panelActive = ref(6);
function setActivePanel(indexPanel: number) {
  panelActive.value = indexPanel;
  
}

const onSubmit = async () => {
  const plans = dataForm.plans.reduce((acc,item) => ({
    ...acc,
    [item.tag]: {...item}
  }),{})
  

  const formData = ref({
    id: dataForm.id,
    sign_id: dataForm.sign_id,
    // fullName: dataForm.fullName,
    name: {
      name: dataForm.name,
      firstSurname: dataForm.firstSurname,
      secondSurname: dataForm.secondSurname,
    },
    question: dataForm.question,
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
    grantor: dataForm.grantor,
    nif: dataForm.nif,
    phone: dataForm.phone,
    email: dataForm.email,
    google_id:dataForm.email,
    web: dataForm.web,
    // grantor: dataForm.grantor,
    iae: dataForm.category,
    employeers: 0,
    contact: [],
    oauth: [],
    username: dataForm.username,
    plan: plans,
    budget: 0,
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
  
  
  // isAvailable.value = true;
  // console.log(qr);
  var data_user = await new Promise((resolve, reject) => {
    axiosIns.post("/user/add", formData.value)
    .then(res => {
        resolve(res.data.id)
    }).catch((err) => {
        resolve(err)
    })
  })
  
  console.log('data_user', formData.value, data_user)

 dataForm.id = data_user
  

  var data = {
    to: 'info@aythen.com',
    subject: dataForm.name + ' ' + dataForm.firstSurname + ' - Nueva solicitud de subvención',
    message: `<div>
      Se ha solicitado una nueva firma:<br>
       ${new Date()}<br>
      Firmado: https://one-shot.uanataca.com/api/v1/retrieve/${dataForm.sign_id} <br>
      Audit: https://one-shot.uanataca.com/api/v1/retrieve/${dataForm.sign_id}/evidences <br>
      ==============================================================<br>
      https://api.aythen.com/static/pdf/modelo-aythen/aythen-${dataForm.id}.pdf<br>
      ==============================================================<br>
      ${dataForm.email}<br>
      ${dataForm.name} ${dataForm.firstSurname} ${dataForm.secondSurname}
    </div>`
  }
  
  
  var data_email = await new Promise((resolve, reject) => {
    axiosIns.post('/email/send', data).then( res => {
        resolve(res.data.id)
    }).catch((err) => {
        resolve(err)
    })
  })
      
      
  // var dataSig = ref({
  //   // name: data.name,
  //   id: dataForm.id,
  //   nif: dataForm.nif,
    
  //   otNif: dataForm.nif,
  //   otEmail: dataForm.email,
  //   otPhone: dataForm.phone,
  //   otName: dataForm.name,
  //   otFirstSurname: dataForm.firstSurname,
  //   otSecondSurname: dataForm.secondSurname,
  // })
  
  // var nifRegex = /^[a-zA-Z]\d{8}$/;
  // if(nifRegex.test(data.nif)) {
  //   dataSig.value.fullName = dataForm.company
  //   dataSig.value.notaryName = dataForm.notaryName
  //   dataSig.value.notaryFirstSurname = dataForm.notaryFirstSurname
  //   dataSig.value.notarySecondSurname = dataForm.notarySecondSurname
  //   dataSig.value.notaryNumber = dataForm.notaryNumber
  //   dataSig.value.notaryDate = dataForm.notaryDate
  // }else{
  //   dataSig.value.fullName = dataForm.name + ' ' + dataForm.firstSurname + ' ' + dataForm.secondSurname
  // }

  // if(dataSig.value.otName && dataSig.value.otFirstSurname && dataSig.value.otSecondSurname && dataSig.value.otEmail) {
  //   axiosIns.post('/signaturit/create', dataSig.value)
  //     .then(response => {
  //       console.log('diwendij', response)
  //       // SIGN_URL.value = response.data // URL RETURN
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }
};


function handleClickGoToStep(step: number) {
  // console.log('e', lastStep.value)
  if (step > lastStep.value) return;
  
  show(step)
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
                    :class="data.num[3]"
                    class="flex items-center justify-center w-10 h-10 rounded-full text-xs font-semibold"
                    @click="goTo(4)"
                  >
                    <span class="cursor-default pointer-events-none">3</span>
                  </div>
                </li>
                <li>
                  <div
                    :class="data.num[4]"
                    class="flex items-center justify-center w-10 h-10 rounded-full text-xs font-semibold"
                    @click="goTo(5)"
                  >
                    <span class="cursor-default pointer-events-none">4</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="px-4 py-4">
          <div class="max-w-md mx-auto">
            <template v-if="data.form[0]">
              <FormAbout
                :data-form="dataForm"
                :show="show"
                @setActivePanel="setActivePanel"
              />
            </template>
            
            <template v-if="data.form[1]">
               <FormFA2
                :data-form="dataForm"
                :show="show"
              />
            </template>
            
            <!--<template v-if="data.form[2]">-->
            <!--  <FormNotary-->
            <!--    :show="show"-->
            <!--    :data-form="dataForm"-->
            <!--    @setActivePanel="setActivePanel"-->
            <!--    :updateLastStep="updateLastStep"-->
            <!--  />-->
            <!--</template>-->
            
            <template v-if="data.form[2]">
                <FormLocation
                  :data-form="dataForm"
                  :show="show"
                  @setActivePanel="setActivePanel"
                  :ubigeo="ubigeo"
                  :get-cities="getCities"
                  :get-codes="getCodes"
                />
            </template>
            
            <template v-if="data.form[3]">
                <FormQuestion
                  :data-form="dataForm"
                  :show="show"
                  @setActivePanel="setActivePanel"
                  :clear-credit-card="clearCreditCard"
                  :questions-answered="questionsAnswered"
                />
            </template>
            

            <template v-if="data.form[4]">
                <div v-if="isMobile && !dataForm.valid_sign">
                  <FormUnataca
                    :data-form="dataForm"
                    :show="show"
                  />
                </div>
                <div v-else>
                  <FormSign
                    :data-form="dataForm"
                  />
                </div>
            </template>
            
            
            <template v-if="data.form[5]">
                  <FormEnd
                    :data-form="dataForm"
                    :submit="onSubmit"
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

     <!--<div v-if="false">-->
     <div v-if="!(position == 5 && !dataForm.valid_sign)">
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
          <div v-if="false">
            <FormMaintance />
          </div>
          <div v-else>
            <FormUnataca
                  :data-form="dataForm"
                  :show="show"
                  @setActivePanel="setActivePanel"
                />
          </div>
      </div>
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
    action: read
    subject: Auth
    auth: false
</route>