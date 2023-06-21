<script setup lang="ts">
import ButtonStep from "@/shared/components/DumbComponents/ButtonStep.vue";

import { defineEmits, defineProps } from "vue";
// import { textForm06 } from "./text.js";
import { useRouter } from "vue-router";
// import axios from "@axios"
import axios from "axios";
// axiosIns.defaults.baseURL = "https://api.aythen.com"
const axiosIns = axios.create({
  baseURL: "https://api-prod.aythen.com",
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
});



// const text = textForm06;

import LangJson from "./lang.json";
const text = reactive(LangJson.sign);

interface Emits {
  // (e: "setActivePanel", indexPanel: number): void;
}


interface Props {
  dataForm: any;
}


const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const router = useRouter();

const {
  dataForm
} = toRefs(props);

</script>

<template>
  <div :style="{ marginTop: '3%' }">
    <div class="text-center px-10">
      <!--<template v-if="formSubmitted">-->
        <svg
          class="inline-flex w-16 h-16 fill-current mb-6"
          viewBox="0 0 64 64"
        >
          <circle class="text-indigo-100" cx="32" cy="32" r="32" />
          <path class="text-indigo-500" d="m28.5 41-8-8 3-3 5 5 12-12 3 3z" />
        </svg>
        <h1 class="text-3xl text-indigo-500 font-bold mb-2">
          Firma la solicitud 
        </h1>
        <p class="mb-5" >
        Estás apunto de tramitar tu subvención. <br>
         Firma este documento para empezar con la tramitación,
          nosotros te guiaremos en todo el proceso de forma gratuito. <br><br>
          Cuando se verifique la solicitud se le entregara el bono del Kit Digital para tu negocio.
        </p>
        <!--<VBtn @click="confirmFirm" class="bg-indigo-500">-->
        <!--    Confirmar Firma-->
        <!--</VBtn>-->
    </div>
  </div>
  
 
</template>

<style lang="scss" scoped>
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
