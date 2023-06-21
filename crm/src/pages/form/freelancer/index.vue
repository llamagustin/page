<route lang="yaml">
meta:
  layout: blank
</route>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import './output.css'

import FormUser from './FormUser.vue'
import PanelInfo from './PanelInfo.vue'
import FormAcademies from './FormAcademies.vue'
import FormExperiences from './FormExperiences.vue'
import FormSkills from './FormSkills.vue'
import Form05 from './Form05.vue'
import FormUbiGeo from './FormUbiGeo.vue'

const instance = axios.create({
  baseURL: "https://api.aythen.com",
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
});

const saved = ref(false)

const data = ref({
  form: [
    true, // datos
    false, // ubigeo
    false, // academies
    false, //estudies
    false, // skills
  ],
  num: [
    'bg-indigo-500 text-white',
    'bg-slate-100 text-slate-500',
    'bg-slate-100 text-slate-500',
    'bg-slate-100 text-slate-500',
    'bg-slate-100 text-slate-500',
    'bg-slate-100 text-slate-500'
  ]
})


const step=ref(1)

const show = (num:number) => {
  
  if(num>position.value) position.value=num
  
  step.value=num;
  
  data.value.form.map( (x, n) => {
      data.value.form.splice(n, 1, false )
  })
  
  data.value.form.splice(num - 1, 1, true )
  
  //
  data.value.num.map( (x, n) => {
    if(n<num){
      data.value.num.splice(n, 1, 'bg-indigo-500 text-white' )
    }else{
      data.value.num.splice(n, 1, 'bg-slate-100 text-slate-500' )
    }
  })
}




const dataForm = ref({
  name: {},
  profile: '',
  category: '',
  subcategory:'',
  about:'',
  dni:{
    front:'',
    back:''
  },
  address: {
    country:'',
    line:'',
    city:'',
    postalCode:''
  },
  academies:[],
  experiences:[],
  skills:{},
  language:'Español'
})
  


const submit = async () => { 
  const sendData = JSON.parse(JSON.stringify(dataForm.value))
  
  if(!saved.value){
  const response = await instance.post("/freelancer/crm/", { freelancer: sendData })
    if(response.status==200){ 
      saved.value=true;
    }
  }
}

const position=ref(1)

const goTo = val=>{
  if(val <= position.value) show(val)
}
    
</script>


<template>
  <main class="bg-white">

    <div class="relative flex">
      <!-- Content -->
      <div class="w-full md:w-1/2">
        <div class="min-h-screen h-full flex flex-col after:flex-1">
          <div class="flex-1">
             <div>
                <!-- Header -->
                <div class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8" >
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
            <div class="px-4 pt-6 pb-4">
              <div class="max-w-md mx-auto w-full">
                <div class="relative">
                  <div class="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-slate-200" aria-hidden="true"></div>
                  <ul class="relative flex justify-between w-full">
                    <li>
                      <div :class="data.num[0]" class="flex items-center justify-center w-10 h-10 rounded-full text-xs font-semibold cursor-pointer"  @click="goTo(1)">1</div>
                    </li>
                    <li>
                      <div :class="data.num[1]" class="flex items-center justify-center w-10 h-10 rounded-full text-xs font-semibold cursor-pointer"  @click="goTo(2)">2</div>
                    </li>                    
                    <li>
                      <div :class="data.num[2]" class="flex items-center justify-center w-10 h-10 rounded-full text-xs font-semibold cursor-pointer"  @click="goTo(3)">3</div>
                    </li>
                    <li>
                      <div :class="data.num[3]" class="flex items-center justify-center w-10 h-10 rounded-full text-xs font-semibold cursor-pointer" @click="goTo(4)">4</div>
                    </li>
                    <li>
                      <div :class="data.num[4]" class="flex items-center justify-center w-10 h-10 rounded-full text-xs font-semibold cursor-pointer" @click="goTo(5)">5</div>
                    </li>
                    <li>
                      <div :class="data.num[5]" class="flex items-center justify-center w-10 h-10 rounded-full text-xs font-semibold cursor-pointer" @click="goTo(6)">6</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="px-4 py-8">
            <div class="max-w-md mx-auto">
                <FormUser   v-if="data.form[0]" :data-form="dataForm" :show="show" />
                <FormUbiGeo v-if="data.form[1]" :data-form="dataForm" :show="show" />
                <FormAcademies    v-if="data.form[2]" :data-form="dataForm" :show="show" />
                <FormExperiences  v-if="data.form[3]" :data-form="dataForm" :show="show" />
                <FormSkills     v-if="data.form[4]" :data-form="dataForm" :show="show"/>
                <Form05     v-if="data.form[5]" :data-form="dataForm" :submit="submit" />
            </div>
          </div>

        </div>

      </div>

      <!-- Image -->
      <div class="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2 px-4 py-6" aria-hidden="true">
        <img class="absolute object-cover object-center w-full h-full" src="./onboarding-image.jpg" width="760" height="1024" alt="Onboarding" />
        <img class="absolute top-1/4 left-0 -translate-x-1/2  hidden lg:block" style="padding-left:10px" src="./auth-decoration.png"  width="180" alt="Authentication decoration" />
        <div class="fixedd">
        <PanelInfo 
        :panel-active="step-1" 
        :subvencion="{}"
        :aplicant="{}"
        :data="dataForm"
        :set-active-panel="val=> goTo(val+1)"
        />
        </div>
      
      </div>

    </div>

  </main>
</template>

<style >
  input.input {
    border: 1px solid #ccc;
    border-radius:5px;
    padding:7px;
  }
  textarea.input {
    border: 1px solid #ccc;
    border-radius:5px;
    padding:7px;
  }
</style>