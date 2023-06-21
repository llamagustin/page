<script setup lang="ts">
import ButtonStep from "@/shared/components/DumbComponents/ButtonStep.vue";
import MiniMoment from "@/shared/utils/MiniMoment";
import moment from "moment"
import { defineEmits, defineProps } from "vue";
// import { textForm06 } from "./text.js";
import { useRouter } from "vue-router";
// import axios from "@axios"
import axiosIns from "@axios";
axiosIns.defaults.baseURL = "https://api.aythen.com"

// const text = textForm06;

import LangJson from "./lang.json";
const text = reactive(LangJson.appointment);

interface Emits {
  (e: "setActivePanel", indexPanel: number): void;
}


interface Props {
  dataForm: any;
  submit: any;
  formSubmitted: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const router = useRouter();



</script>

<template>
  <VCard class="mx-10" :style="{ marginTop: '3%' }">
    <div class="text-center px-8 py-8">
      <!--<template v-if="formSubmitted">-->
        <svg
          class="inline-flex w-16 h-16 fill-current "
          viewBox="0 0 64 64"
        >
          <circle class="text-red-100" cx="32" cy="32" r="32" />
          <path class="text-red-500" d="m28.5 41-8-8 3-3 5 5 12-12 3 3z" />
        </svg>
        <h1 class="text-3xl text-slate-800 font-bold my-2">
          Error de conexión
          
          <!--{{ text.title }}-->
        </h1>
        <p class="mb-5" >
          No te preocupes, te enviaremos la firma digital a través de email 
          entre 24-48 horas a tu correo <b>{{dataForm.email}}</b>.
        </p>
      <!--</template>-->
    </div>
  </VCard>
</template>

<style lang="scss" scoped>
.text-red-100{
  color: #ffb5b5;  
}

.text-red-500{
  color: #ff0000  
}



.container_iframe {
  align-items: center;
  @media (max-width: 768px) {
    align-items: flex-start !important;
  }
}

.present_title {
  @media (max-width: 768px) {
    padding-block-start: 3em;
  }
}
.styled_iframe {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 600px;
  width: 400px;
  right: 0;
  margin: auto;
  bottom: 0;
  border-radius: 0.3em;
  @media (max-width: 768px) {
    height: 500px;
    width: 350px;
  }
}

.btn {
  width: 50%;
  margin: auto;
}

.parent-iframe-delete {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  inline-size: 100%;
  block-size: 100%;
  top: 0;
  left: 0;
  background: #ffffff;
  z-index: 1000;
  pointer-events: all;
}

.iframe-signaturit {
  @media (max-width: 768px) {
    width: 100% !important;
  }
  
  @media (min-width: 769px) {
    font-size: 30px;
  }
}
</style>
