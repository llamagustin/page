<route >
{
  "meta": {
    "layout": "blank",
    "auth": true,
    "redirectIfBlockIn": true
  }
}
</route>

<script setup lang="ts">

import {watch} from 'vue'
// import axiosIns from "@axios"
import { useAcademyStore } from "./useAcademyStore";
import { defineAsyncComponent } from "vue";
import { initialStateAcademy } from './academy.data';
import ListEvents from "./webinar.json";
import "./academy.css";

const PanelInfo = defineAsyncComponent(() => import("./PanelInfo.vue"));
const QuestionFirst = defineAsyncComponent(() => import("./QuestionFirst.vue"));
const QuestionSecond = defineAsyncComponent(() => import("./QuestionSecond.vue"));
const QuestionThird = defineAsyncComponent(() => import("./QuestionThird.vue"));
// const QuestionFourth = defineAsyncComponent(() => import("./QuestionFourth.vue"));
// const QuestionEnd = defineAsyncComponent(() => import("./QuestionEnd.vue"));


const accountData= JSON.parse(localStorage.userData || "{}")
const initialState = JSON.parse(JSON.stringify(initialStateAcademy));


const store  = useAcademyStore();

const {lastStep}= storeToRefs(store);



const data = ref({ 
  form: [ true, false, false, false ],
  num: [ 
    "bg-indigo-500 text-white",
    "bg-slate-100 text-slate-500",
    "bg-slate-100 text-slate-500",
    "bg-slate-100 text-slate-500"
  ],
});

const dataForm = reactive({
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
});

const isAvailable = ref(false);

const show = (num: any) => {
  store.updatePanel(num)
  data.value.form.map((_: any, index: number) => {
    data.value.form.splice(index, 1, false);
  });
  data.value.form.splice(num - 1, 1, true);
  data.value.num.map((_: any, index: number) => {
    if (index < num) {
      data.value.num.splice(
        index, 1, "bg-indigo-500 text-white cursor-pointer"
      );
    } else {
      data.value.num.splice(
        index, 1, "bg-slate-100 text-slate-500 cursor-default"
      );
    }
  });
};



function handleClickGoToStep(step: number) {
  if (step > lastStep.value) return;
  if (step < 5) {
    show(step);
  }
}

function updateLastStep(step: number) {
  if (lastStep.value > step) return;
  lastStep.value = step;
}

store.getByEmail(accountData.email).then(rs=>{
  console.log('ready!')
})

</script>
<template>
    <div class="relative flex">
    <div class="w-full md:w-1/2">
      <div class="min-h-screen h-full flex flex-col px-2">
        <div>
          <div
            class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8" >
            <div class="block" @click="show(1)">
              <img src="/src/assets/images/www/logo.svg" width="40" />
            </div>
            <div class="block">
              <img src="/src/assets/images/www/eu-logo.png" width="180" />
            </div>
          </div>
        </div>
        
        <div class="p-4">
          <template v-if="lastStep < 5">
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
                      @click="handleClickGoToStep(1)"
                    >
                      <span class="cursor-default pointer-events-none">1</span>
                    </div>
                  </li>
                  <li>
                    <div
                      :class="`${data.num[1]}`"
                      class="flex items-center justify-center w-10 h-10 rounded-full text-xs font-semibold"
                      @click="handleClickGoToStep(2)"
                    >
                      <span class="cursor-default pointer-events-none">2</span>
                    </div>
                  </li>
                  <li>
                    <div
                      :class="`${data.num[2]}`"
                      class="flex items-center justify-center w-10 h-10 rounded-full text-xs font-semibold"
                      @click="handleClickGoToStep(3)"
                    >
                      <span class="cursor-default pointer-events-none">3</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </template>
        </div>
        <div class="px-4 py-4">

          <div class="max-w-md mx-auto">
            <QuestionFirst 
              v-if="data.form[0] "
              :data-form="dataForm"
              :show="show"
              :updateLastStep="updateLastStep"
              :update-panel="updatePanel"
            />
            <QuestionSecond
              v-if="data.form[1]"
              :data-form="dataForm"
              :show="show"
              :updateLastStep="updateLastStep"
              :update-panel="updatePanel"
            />
            <QuestionThird
              v-if="data.form[2]"
              :data-form="dataForm"
              :show="show"
              :updateLastStep="updateLastStep"
              :update-panel="updatePanel"
            />
            <!--Save information in this component last page-->
            <!--<QuestionFourth-->
            <!--  v-if="data.form[3]"-->
            <!--  :data-form="dataForm"-->
            <!--  :show="show"-->
            <!--  :updateLastStep="updateLastStep"-->
            <!--  :update-panel="updatePanel"-->
            <!--/>-->
            
            <!--<QuestionEnd -->
            <!--  v-if="data.form[4]"-->
            <!--  :updateLastStep="updateLastStep"-->
            <!--/>-->
          </div>
        </div>
      
      </div>
    </div>

    <!-- Image -->
    <div
      class="right hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2 px-4 py-6"
      aria-hidden="true"
    >
      <img
        class="absolute top-1/4 left-0 -translate-x-1/2 ml-8 hidden lg:block user-select-none"
        src="./auth-decoration.png"
        width="150"
        
        alt="Authentication decoration"
      />
      
      <PanelInfo  />
      
      <div>
    </div>
    </div>
    
  </div>
</template>


<style lang="scss" scoped>
:global(.btn) {
  background: #000fff !important;
  padding: 12px 20px !important;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.right {
  background: #000fff;
}
</style>
