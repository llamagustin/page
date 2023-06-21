<script setup lang="ts">
import ButtonStep from "@/shared/components/DumbComponents/ButtonStep.vue";
import MiniMoment from "@/shared/utils/MiniMoment";
import moment from "moment"
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
const text = reactive(LangJson.appointment);

interface Emits {
  (e: "setActivePanel", indexPanel: number): void;
}


interface Props {
  dataForm: any;
  submit: any;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const router = useRouter();


/*
onMounted(() => {
  emit("setActivePanel", 4);
});
*/

const isValid = computed(() => {
  errros.value = {};
  return Boolean(props.dataForm.dateCite);
});

const minDate = ref(MiniMoment.nowDateForHTML)

const errros = ref({})



async function saveCite() {
  errros.value = {};
  const now = moment().add(1,'days').format('Y-MM-DD')
  let dateCite = props.dataForm.dateCite || false
  // let signature = props.dataForm.signature || {}
  if(dateCite){
    let selected =  moment(dateCite)
    if(!selected.isValid()) {
      errros.value.date  = 'La fecha no es válida';
    } else if(selected.isBefore(now)) {
      errros.value.date = `La fecha debe ser mayor a ${now}`
    }
  }
  
  
  // if(!Object.keys(signature).length) {
  //   errros.value.signature = 'Error debe realizar el paso de firmar'
  // }
  if(Object.keys(errros.value).length) return;
  
  var data = {
    id: props.dataForm.id,
    reservation_date: dateCite
  }

  
  var res = await axiosIns.put('/user', {user: data})
}


// saveLead()


const isSnackbarVisibility = ref(true)
localStorage.removeItem('form-lead-token');

props.submit()


setTimeout(function(){
  isSnackbarVisibility.value = false
}, 12000)


</script>

<template>
  <div :style="{ marginTop: '3%' }">
    <div class="text-center">
      <!--<template v-if="formSubmitted">-->
        <svg
          class="inline-flex w-16 h-16 fill-current mb-6"
          viewBox="0 0 64 64"
        >
          <circle class="text-indigo-100" cx="32" cy="32" r="32" />
          <path class="text-indigo-500" d="m28.5 41-8-8 3-3 5 5 12-12 3 3z" />
        </svg>
        <h1 class="text-3xl text-slate-800 font-bold mb-8">
          Hemos acabado con la solicitud
          
          <!--{{ text.title }}-->
        </h1>
        <p class="mb-5" >
          En breves uno de nuestros agentes mensajes de aquise pondrá en contacto contigo para ayudarle 
          en su proceso hacía la digitalización. Vamos a trabajar en el Kit Digital ideal para tí. Si tienes 
          preguntas que resolver no dude en solicitar su cita prevía.</p>
      <!--</template>-->
      <VRow justify="center" class="mb-8">
      <!--<VRow v-else justify="center" class="mb-8">-->
        <VCol cols="12" md="6">
          <div class="cite_date text-start">
            <label for="dateCite">
              {{ !dataForm.dateCite ? "Seleccione una" : "" }}
              Fecha
            </label>
            <input
              :min="minDate"
              class="bg-grey-200 px-2 py-4 w-full"
              v-model="dataForm.dateCite"
              type="date"
              id="dateCite"
              @change="saveCite"
            />
            <em v-if="errros.date" class="text-error text-sm-caption"> {{ errros.date }}</em>
          </div>
        </VCol>
        
        <!--<VCol v-if="dataForm.acceptTermsAndConditions"  cols="12" >-->
        <!--    <VBtn @click="saveLead"  >Guardar</VBtn>-->
        <!--</VCol>-->
    
      </VRow>
    </div>
  </div>
  
  <VSnackbar v-model="isSnackbarVisibility"
      location="bottom start"
      multi-line
      :timeout="10000">
      Se ha registrado con éxito "{{dataForm.email}}" <br>
      Haz Click para
      <a href="https://aythen.com/login"
        class="text-indigo-300 font-weight-bold">
        Iniciar Sessión
      </a>
      <template #actions>
        <VBtn
          color="error"
          @click="isSnackbarVisibility = false"
        >
          Close
        </VBtn>
      </template>
    </VSnackbar>
    
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
