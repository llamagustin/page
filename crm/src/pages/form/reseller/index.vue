<script setup lang="ts">
import { getUsername } from "@/shared/utils/strings"
import { useRouter } from "vue-router"
import { defineAsyncComponent } from 'vue'
import { useResellerStore } from "./useResellerStore"
import { useUbigeo } from "@/shared/composables/useUbigeo"
import "./output.css";

import axios from "axios"

const axiosIns = axios.create({
  baseURL: "https://api.aythen.com",
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
});


const FormAbout = defineAsyncComponent(() => import("./FormAbout.vue"));
const FormAutonomo = defineAsyncComponent(() => import("./FormAutonomo.vue"));
const FormCalendar = defineAsyncComponent(() => import("./FormCalendar.vue"));
const FormEnd = defineAsyncComponent(() => import("./FormEnd.vue"));
const FormKitDigital = defineAsyncComponent(() => import("./FormKitDigital.vue"));
const FormOption = defineAsyncComponent(() => import("./FormOption.vue"));

const store = useResellerStore();
const router = useRouter();
const data = ref({
  form: [
    true, // name, appellido, country, address
    false, // pregutnas triple
    false, //preguntas doble
    false, // cif, mcc, company, trabajadores ¿no lo se?, condition
    false, //services
    false, //end
    false, //end
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
});

const onSubmit = async () => {
  const data = JSON.parse(JSON.stringify(store.guest))
  const { typeSelfEmployed, knowDigitalKit, ...blankAccount } = data
  const username = getUsername(data.fullName)
  
  blankAccount.username = username;
  blankAccount.address.province = getNameProvince()
  blankAccount.address.city = getNameCity()
  
  const response = await axiosIns.post("/account/add", {
    account: blankAccount
  })
  

  const { accessToken, userData, userAbilities } = response.data;

  localStorage.setItem("userAbilities", JSON.stringify(userAbilities));
  localStorage.setItem("userData", JSON.stringify(userData));
  localStorage.setItem("accessToken", JSON.stringify(accessToken));
};

const show = (num: number) => {
  
  if(num>position.value) position.value=num
  
  data.value.form.map((_, n) => {
    data.value.form.splice(n, 1, false);
  });
  data.value.form.splice(num - 1, 1, true);
  data.value.num.map((_, n) => {
    let className =
      n < num
        ? "bg-indigo-500 text-white cursor-pointer"
        : "bg-slate-100 text-slate-500 pointer-default";
    data.value.num.splice(n, 1, className);
  });
};

function handleClickGoToStep(step: number) {
  if (step > store.lastStep) return;
  show(step);
}

// GET UBIGEO
const { ubigeo, getCities, getCodes } = useUbigeo()

function getNameProvince() {
  const provinceId = store.guest.address.province
  const name = ubigeo.provinces.find(item => item.value == provinceId)
  return name?.title || '-';
}

function getNameCity() {
  const cityId = store.guest.address.city
  const name = ubigeo.cities.find(item => item.value == cityId)
  return name?.title || '-';
}

const position=ref(1)

const goTo = val=>{
  if(val <= position.value)  handleClickGoToStep(val)
  
}

</script>

<template>
  <main class="bg-white">
    <div class="relative flex">
      <!-- Content -->
      <div class="w-full md:w-1/2">
        <div class="min-h-screen h-full flex flex-col">
          <div class="">
            <div
              class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8"
            >
              <div class="block" @click="show(1)">
                <img
                  src="https://api.aythen.com/static/src/assets/images/www/logo.svg"
                  width="40"
                />
              </div>
              <div class="block">
                <img
                  src="https://api.aythen.com/static/src/assets/images/www/eu-logo.png"
                  width="180"
                />
              </div>
            </div>
          </div>
          <!-- Progress bar -->
          <div v-if="!data.form[5]" class="mt-4 px-4">
            <div class="max-w-md mx-auto w-full">
              <div class="relative">
                <div
                  class="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-slate-200"
                  aria-hidden="true"
                ></div>
                <ul class="relative flex justify-between w-full">
                  <li>
                    <div
                      :class="data.num[0]"
                      class="flex items-center justify-center w-10 h-10 rounded-full text-xs font-semibold"
                      @click="goTo(1)"
                    >
                      <span class="user-select-none">1</span>
                    </div>
                  </li>
                  <li>
                    <div
                      :class="data.num[1]"
                      class="flex items-center justify-center w-10 h-10 rounded-full text-xs font-semibold"
                      @click="goTo(2)"
                    >
                      <span class="user-select-none">2</span>
                    </div>
                  </li>
                  <li>
                    <div
                      :class="data.num[2]"
                      class="flex items-center justify-center w-10 h-10 rounded-full text-xs font-semibold"
                      @click="goTo(3)"
                    >
                      <span class="user-select-none">3</span>
                    </div>
                  </li>
                  <li>
                    <div
                      :class="data.num[3]"
                      class="flex items-center justify-center w-10 h-10 rounded-full text-xs font-semibold"
                      @click="goTo(4)"
                    >
                      <span class="user-select-none">4</span>
                    </div>
                  </li>
                  <li>
                    <div
                      :class="data.num[4]"
                      class="flex items-center justify-center w-10 h-10 rounded-full text-xs font-semibold"
                      @click="goTo(5)"
                    >
                      <span class="user-select-none">5</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="pt-12 px-6 pb-8">
            <div class="max-w-md mx-auto">
              <template v-if="data.form[0]">
                <FormAutonomo :show="show" />
              </template>
              <template v-if="data.form[1]">
                <FormAbout 
                  :show="show" 
                  :ubigeo="ubigeo" 
                  :get-cities="getCities" 
                  :get-codes="getCodes"
                />
              </template>
              <template v-if="data.form[2]">
                <FormOption :show="show" />
              </template>
              <template v-if="data.form[3]">
                <FormKitDigital :show="show" />
              </template>
              <template v-if="data.form[4]">
                <FormCalendar :show="show" :submit="onSubmit" />
              </template>
              <template v-if="data.form[5]">
                <FormEnd :show="show" />
              </template>
            </div>
          </div>
        </div>
      </div>

      <!--
      <div class="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
        <img class="object-cover object-center w-full h-full" src="./onboarding-image.jpg" width="760" height="1024" alt="Onboarding" />
        <img class="absolute top-1/4 left-0 -translate-x-1/2 ml-8 hidden lg:block" src="./auth-decoration.png" width="218" height="224" alt="Authentication decoration" />
      </div>
      -->
      <!-- Video -->
      <div
        class="video-container hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2"
        aria-hidden="true"
      >
        <div class="video">
          <video
            id="video-aythen"
            class="centered-app is-relative mx-auto max-w-8"
            autoplay
            loop
            muted
          >
            <source
              src="https://api.aythen.com/static/src/assets/video/form.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <img
          class="absolute top-1/4 left-0 -translate-x-1/2 ml-8 hidden lg:block"
          src="./auth-decoration.png"
          width="218"
          height="224"
          alt="Authentication decoration"
        />
      </div>
    </div>
  </main>
</template>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>




<style lang="scss" scoped>
.video-container {
  .video {
    width: 100%;
    height: 100%;
    overflow: hidden !important;

    video {
      height: 100%;
      max-width: unset;
      float: right;
      margin-right: -100% !important;
    }
  }
}

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
