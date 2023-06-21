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

interface Emits {
  (e: "setActivePanel", indexPanel: number): void;
}


interface Props {
  dataForm: any;
  submit: any;
  // formSubmitted: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const router = useRouter();

/*
onMounted(() => {
  emit("setActivePanel", 4);
});
*/

const account = ref(props.dataForm);

const isValid = computed(() => {
  errros.value = {};
  return Boolean(props.dataForm.dateCite);
});

const minDate = ref(MiniMoment.nowDateForHTML)

const errros = ref({})
// async function goToAcademy() {
//   errros.value = {};
//   const now = moment().add(1,'days').format('Y-MM-DD')
//   let dateCite = props.dataForm.dateCite
//   let signature = props.dataForm.signature
//   let selected =  moment(dateCite)
  
//   if(!selected.isValid()) {
//     errros.value.date  = 'La fecha no es válida';
//   } else if(selected.isBefore(now)) {
//     errros.value.date = `La fecha debe ser mayor a ${now}`
//   }
  
//   if(!Object.keys(signature).length) {
//     errros.value.signature = 'Error debe realizar el paso de firmar'
//   }
//   if(Object.keys(errros.value).length) return;
  
//   console.log('xwineiw')
//   // await props.submit()
// }

// GET URL IFRAME FOR SIGNATURIT
const SIGN_URL = ref(null);


onMounted(() => {
  var data = account.value;
  
  var dataSig = {
    // name: data.name,
    nif: data.nif,
    
    firstSurname: data.firstSurname, 
    secondSurname: data.secondSurname,
    otNif: data.nif,
    otEmail: data.email,
    otPhone: data.phone,
    otName: data.name,
    otFirstSurname: data.firstSurname,
    otSecondSurname: data.secondSurname,
  }
  
  var nifRegex = /^[a-zA-Z]\d{8}$/;
  if(nifRegex.test(data.nif)) {
    dataSig.fullName = data.company
    dataSig.notaryName = data.notaryName
    dataSig.notaryFirstSurname = data.notaryFirstSurname
    dataSig.notarySecondSurname = data.notarySecondSurname
    dataSig.notaryNumber = data.notaryNumber
    dataSig.notaryDate = data.notaryDate
  }else{
    dataSig.fullName = data.name + ' ' + data.firstSurname + ' ' + data.secondSurname
  }
  // props.dataForm.fullName = '1231'
  // props.dataForm.email = 'eng.carlos.valle@gmail.com'
  
  if(dataSig.otName && dataSig.otFirstSurname && dataSig.otSecondSurname && dataSig.otEmail) {
    axiosIns.post('/signaturit/create', dataSig)
      .then(response => {
        SIGN_URL.value = response.data // URL RETURN
      })
      .catch(error => {
        console.log(error)
      })
  }
})

// GET MESSAGE FROM SIGNATURIT
onMounted(() => {
  window.addEventListener('message', async function (e) {
    // e.data.event       = EVENT_TYPE
    // e.data.documentId  = DOCUMENT_ID
    // e.data.signatureId = SIGNATURE_ID
    if (e.data.event === 'completed') {
      console.log('ememe')
      props.dataForm.signature = {
        documentId: e.data.documentId,
        signatureId: e.data.signatureId
      }
      SIGN_URL.value = null;
      
      
      var data = {
        id: props.dataForm.id,
        status: 202,
        signature: props.dataForm.signature
      }
      
      var res = await axiosIns.put('/user', {user: data})
    }
  })
})

</script>

<template>
  <div :style="{ marginTop: '20%' }">
    <div class="text-center">
      <!--</template>-->
      <VRow justify="center" class="mb-8">

        
        <VCol cols="12" md="12">
          <!--Firma electrónica-->
          <!--<strong v-if="Object.keys(dataForm.signature).length" class="d-block text-primary-blue">Confirmado</strong>-->
          <template v-if="!Object.keys(dataForm.signature).length">
            <div class="parent-iframe">
              <div class="h-100 w-50 iframe-signaturit">
                  <iframe :src="SIGN_URL" class="styled_iframe"/>
              </div>
            </div>
          </template>
          <em v-if="errros.signature" class="text-error text-sm-caption"> {{ errros.signature }}</em>
        </VCol>
      </VRow>
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
  height: 90%;
  width: 90%;
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
