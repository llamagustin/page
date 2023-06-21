<script setup lang="ts">
import { isID } from "@/shared/utils/id";

import ButtonStep from "@/shared/components/DumbComponents/ButtonStep.vue";
import MiniMoment from "@/shared/utils/MiniMoment";
import moment from "moment"
import { defineEmits, defineProps } from "vue";
// import { textForm06 } from "./text.js";
import { useRouter } from "vue-router";
// import axios from "@axios"
// axiosIns.defaults.baseURL = "https://api.aythen.com"
import axios from "axios";

const axiosIns = axios.create({
  baseURL: "https://api-prod.aythen.com",
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
});


import { io } from "socket.io-client";
// const socket = io("https://wss-dev.aythen.com")
const socket = io("https://api-prod.aythen.com", {
 withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});








// import { io } from "socket.io-client";
// const socket = io("https://api.aythen.com:4002")
// // const text = textForm06;


// socket.on('sign-pdf', (data) => {
//   // console.log('d1', data
//   console.log('socket', data)
// })

interface Emits {
  (e: "setActivePanel", indexPanel: number): void;
}


interface Props {
  dataForm: any;
  show: (value: any) => void;
  // submit: any;
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


// const account = ref(props.dataForm);

const {
  dataForm,
  show
} = toRefs(props);




// const isValid = computed(() => {
//   errros.value = {};
//   // return Boolean(dataForm.validateCite);
// });

// const minDate = ref(MiniMoment.nowDateForHTML)

// const errros = ref({})


// GET URL IFRAME FOR SIGNATURIT
const SIGN_URL = ref(null);


onMounted(() => {
  var data = dataForm.value;
  
  var dataSig = {
    id: data.id,
    // name: data.name,
    // nif: data.nif,
    
    // firstSurname: data.firstSurname, 
    // secondSurname: data.secondSurname,
    otGrantor: data.grantor,
    otPhone: data.phone,
    otDialPhone: data.dial_phone,
    otNif: data.nif.toUpperCase(),
    otEmail: data.email.toUpperCase(),
    otName: data.name.toUpperCase(),
    otFirstSurname: data.firstSurname.toUpperCase(),
    otSecondSurname: data.secondSurname.toUpperCase(),
  }
  
  // console.log('id', data.nif)
  
  // var nifRegex = /^[a-zA-Z]\d{8}$/;
  if(isID(data.nif) == 'cif') {
    dataSig.notaryNumber = data.notaryNumber
    dataSig.notaryDate = data.notaryDate
    dataSig.fullName = data.company.toUpperCase()
    dataSig.notaryName = data.notaryName.toUpperCase()
    dataSig.notaryFirstSurname = data.notaryFirstSurname.toUpperCase()
    dataSig.notarySecondSurname = data.notarySecondSurname.toUpperCase()
  }else{
    var fullName = data.name + ' ' + data.firstSurname + ' ' + data.secondSurname
    dataSig.fullName = fullName.toUpperCase()
  }

  if(dataSig.otName && dataSig.otFirstSurname && dataSig.otSecondSurname && dataSig.otEmail) {
    axiosIns.post('/unataca/create', dataSig)
      .then(response => {
        dataForm.value.sign_id = response.data.details.id
        SIGN_URL.value = response.data.details.urls[0] // URL RETURN
      })
      .catch(error => {
        console.log(error)
      })
  }
})

// GET MESSAGE FROM SIGNATURIT
// onMounted(() => {
//   window.addEventListener('message', async function (e) {
//     console.log('eeee', e.data.event)
//     // e.data.event       = EVENT_TYPE
//     // e.data.documentId  = DOCUMENT_ID
//     // e.data.signatureId = SIGNATURE_ID
//     if (e.data.event === 'completed') {
//       // console.log('ememe')
//       // props.dataForm.signature = {
//       //   documentId: e.data.documentId,
//       //   signatureId: e.data.signatureId
//       // }
//       // SIGN_URL.value = null;
      
      
//       // var data = {
//       //   id: props.dataForm.id,
//       //   status: 202,
//       //   signature: props.dataForm.signature
//       // }
      
//       // var res = await axiosIns.put('/user', {user: data})
//     }
//   })
// })



//




socket.on('received-pdf', async (data) => {
  if(data) {
    if(data.id == dataForm.value.sign_id){
      // var res = await axiosIns.get('/unataca/pdfs/' + dataForm.value.sign_id)
      
      props.show(6)
      // dataForm.value.sign_document = res.data
      // if(res.data.details.status == 'done'){
      //   props.show(6)
      // }
    }
  }
})





</script>

<template>
  <div class="xs-mt-20">
    <div class="text-center">
      <!--</template>-->
      <VRow justify="center" class="mb-8">

        
        <VCol cols="12" md="12">
          <!--Firma electrónica-->
          <!--<strong v-if="Object.keys(dataForm.signature).length" class="d-block text-primary-blue">Confirmado</strong>-->
          <template v-if="SIGN_URL">
            <div class="parent-iframe">
              <div class="h-100 w-50 iframe-signaturit">
                  <iframe :src="SIGN_URL" class="styled_iframe"/>
              </div>
            </div>
          </template>
          <!--<em v-if="errros.signature" class="text-error text-sm-caption"> {{ errros.signature }}</em>-->
        </VCol>
      </VRow>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.xs-mt-20{
  margin-top: 20%;
  @media (max-width: 768px) {
    margin-top: 0px;  
  }
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
  height: 90%;
  width: 90%;
  right: 0;
  margin: auto;
  bottom: 0;
  border-radius: 0.3em;
  @media (max-width: 768px) {
    height: 500px;
    width: 350px;
    position: relative;
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
