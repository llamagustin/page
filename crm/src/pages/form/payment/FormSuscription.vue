<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import {watch} from 'vue'
import ButtonStep from "@/shared/components/DumbComponents/ButtonStep.vue";
import ModalContract from "./ModalContract.vue";
import { defineEmits, defineProps } from "vue";
import { loadScript } from "@/shared/utils/dom";
import ErrorMessages from "@/@fake-db/messages.redsys.json";
import axios from "axios";


import LangJson from "./lang.json";
const translation = reactive(LangJson.subscription);


const axiosIns = axios.create({
  // baseURL: "https://api.aythen.com",
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});

interface Props {
  dataForm: any;
  updateLastStep: (step: number) => void;
  clearQuestions: () => void;
  show: (step: number) => void;
}
interface Emits {
  (e: "setActivePanel", indexPanel: number): void;
}
const { dataForm, updateLastStep, show, clearQuestions } = defineProps<Props>();
const emit = defineEmits<Emits>();


//
// dataForm.card_token = true



const isDialogVisible = ref(false)
const isValidCard = ref(true)

const isEmpty = (str: string) => str.length === 0;
const isValid = computed(() => {
  let validations = [
    dataForm.acceptTermsAndConditions,
    dataForm.card_token
  ];
  errors.value = {};
  return !validations.includes(false);
});

onMounted(() => {
  updateLastStep(5);
  emit("setActivePanel", 4);
  clearQuestions();
});

function validateCvc(str: string) {
  const regex = /[\d]{3}/;
  return !regex.test(str);
}

const error = reactive({
  present: false,
  message: null,
});

const refToken = ref(null);
const refErrorCode = ref(null);

let timer;

const REDSYS = {
  Ds_Merchant_MerchantCode: "358375301", // 358375301 | 999008881
  Ds_Merchant_Terminal: "1", // 999 | 1
  DS_MERCHANT_EXCEP_SCA: "MIT",
  Ds_Merchant_DirectPayment: true
}

function merchantValidation(el){
  console.log('data', el)
	//Insertar validaciones…
	return true;
}

let ORDER_CODE = null;
function pedido() {
  const order = ORDER_CODE
  return order
}

function receiveMessage(event) {
	storeIdOper(event,"token", "errorCode", merchantValidation)
	console.log('ee', event)
	if(event?.data?.source != 'vue-devtools-proxy') {
	  // dataForm.card.token = "";
  	if(event?.data?.error) {
  	  clearTimeout(timer);
  	  error.present = true;
  	  error.message = ErrorMessages[event?.data?.error]
  	  timer = setTimeout(() => {
  	    error.present = false;
  	    error.message = null;
  	  }, 5000)
  	} else if(event?.data?.idOper) {
  	  if(event.data.idOper !== '-1') {
    	/*  dataForm.card.token = event?.data?.idOper;
    	  dataForm.card.verified = true;
    	*/ 
    	

    	dataForm.card_token = event?.data?.idOper
    	
    // 	var data = {
    //     "DS_MERCHANT_AMOUNT": "0",
    //     "DS_MERCHANT_CURRENCY": "978",
    //     "DS_MERCHANT_COF_INI": "S",
    //     "DS_MERCHANT_COF_TYPE": "R",
    //     "DS_MERCHANT_IDENTIFIER": "REQUIRED",
    //     "DS_MERCHANT_MERCHANTCODE":  REDSYS.Ds_Merchant_MerchantCode,
    //     "DS_MERCHANT_ORDER": ORDER_CODE,
    //     "DS_MERCHANT_IDOPER": dataForm.card_token,
    //     "DS_MERCHANT_TERMINAL": REDSYS.Ds_Merchant_Terminal,
    //     "DS_MERCHANT_TRANSACTIONTYPE": "0",
    //     // "DS_MERCHANT_MERCHANTSIGNATURE": "sq7HjrUOBfKmC576ILgskD5srU870gJ7"
    //   }
      
    
    // 	axios.post('https://sis-t.redsys.es:25443/sis/rest/trataPeticionREST', data).then( res => {
    // 	  console.log('res:', res)
    // 	})
    
    
    var data = {
  	  "DS_MERCHANT_AMOUNT": "0",
  	  "DS_MERCHANT_CURRENCY": "978",
  	  "DS_MERCHANT_EMV3DS": {
    		"threeDSInfo": "AuthenticationData",
    		"protocolVersion": "1.0.2",
    		"browserAcceptHeader": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8,application/json",
    		"browserUserAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"
  	  },
  	  "DS_MERCHANT_IDOPER": dataForm.card_token,
  	  "DS_MERCHANT_MERCHANTCODE":  REDSYS.Ds_Merchant_MerchantCode,
  	  "DS_MERCHANT_ORDER": ORDER_CODE,
  	  "DS_MERCHANT_TERMINAL": REDSYS.Ds_Merchant_Terminal,
  	  "DS_MERCHANT_TRANSACTIONTYPE": "0"
  	}
  	
  	console.log('data', data)
  	
  	axiosIns.post('https://sis-t.redsys.es:25443/sis/rest/iniciaPeticionREST', data).then( res => {
      console.log('res:', res)
    }).catch( err => {
      console.log('err:', err)
    })
    
    
    
    	
    	dataForm.carddetails = [{
    	   id: ORDER_CODE,
    	   type: 'redsys',
    	   token: event.data.idOper,
    	   createdAt: new Date()
    	 }]
    	 
  	  } else {
  	    error.present=true
  	    error.message = "Los datos de la tarjeta son incorrectos!"
  	    
  	    setTimeout(() => {
  	    error.present = false;
  	    error.message = null;
  	  }, 5000)
  	    
  	    
  	   // console.log('finis integration')
  	   // showIframe()
  	    
  	  }
  	}
	}
}

const showIframe =async () => {
  //const { data } = await axios.get('numerations/orders')
  /*
  const uuid = ;
  ORDER_CODE = 'AYTHEN-00001'// +  uuid//data.code
  console.log(ORDER_CODE)
  */
  
  ORDER_CODE= 'AYTHEN' + uuidv4().slice(-6)
  
  document.getElementById('card-form').innerHTML = ""
  
  const styleButton = "display: inline-block;width: auto;min-width: 130px;background-color: blue;font-size: 1.1em;text-transform: uppercase;letter-spacing: 1px;font-family: monospace;"
  const styleForm = "box-shadow: none; padding: 0.3em"
  
  function orden() { return "aythen" + Math.floor((Math.random() * 1000) + 1)}
  
  orden=orden();
  
  console.log(orden)
  
  getInSiteForm(
    "card-form",
    styleButton,
    "",
    styleForm,
    "",
    "Verify",
    // REDSYS.Ds_MerchantParameters,
    REDSYS.Ds_Merchant_MerchantCode,
    REDSYS.Ds_Merchant_Terminal,
    ORDER_CODE,  //cambiar por pedido()
    "ES",
    false
  );
  
}

onMounted(async () => {
  window.addEventListener("message", receiveMessage);

  // await loadScript("https://sis.redsys.es/sis/NC/redsysV2.js") // PROD

  await loadScript("https://sis-t.redsys.es:25443/sis/NC/sandbox/redsysV2.js")
  showIframe()
})

function closeModal() {
  isDialogVisible.value = false;
}

function acceptTerms() {
  dataForm.acceptTermsAndConditions = true;
  closeModal();
}

const errors = ref({});
const detailCard=ref({})

function showErrors() {
  errors.value = {};
  if(!dataForm.acceptTermsAndConditions) {
    errors.value.acceptTermsAndConditions = 'Este campo es requerido.'
  }
  if(!dataForm.card_token) {
    errors.value.verified = 'Es necesario que su N° de Tarjeta sea validado.'
  }
}

watch(detailCard,val=>{
  console.log('hola',val)
})

</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <ButtonStep outline type-arrow="left" @click="show(5)" />
      <ButtonStep
        type-arrow="right"
        :is-disabled="!isValid"
        @click="isValid ? show(8) : showErrors()"
      />
    </div>
    <VDivider class="mt-8 mb-4 d-block" />
    <h1 class="text-3xl text-slate-800 font-bold mb-2">
      {{ translation.title }}
    </h1>
    <p class="mb-5">
      {{ translation.text }}
    </p>
    <VRow v-if="error.present" class="mb-8">
      <VCol cols="12">
        <VAlert  type="error" class="mb-4">
          {{ error.message }}
        </VAlert>
      </VCol>
      <em v-if="errors.verified" class="d-block text-error text-sm-caption">
        {{ errors.verified }}
      </em>
    </VRow>
    <VRow class="mb-8" >
    
      
      <VCol v-if="false" cols="12">
        <VRow>
            <VCol md="8">
              <label>Titular de la tarjeta</label>
              <input v-model="dataForm.card_name" class="form-input w-full">
            </VCol>
            <VCol md="4">
              <label>Expiración</label>
              <input v-model="dataForm.card_date" type="text" placeholder="mm/yy" class="form-input w-full">
            </VCol>
        </VRow>
        <VRow>
            <VCol md="8">
              <label>Número de tarjeta</label>
              <input v-model="dataForm.card_number" class="form-input w-full">
            </VCol>
            <VCol md="4">
              <label>CVV</label>
              <input v-model="dataForm.card_cvv" type="text" placeholder="cvv" class="form-input w-full">
            </VCol>
        </VRow>
      </VCol>
      <!--{{dataForm.card_token}}-->
      <VCol v-if="!dataForm.card_token || !dataForm.acceptTermsAndConditions" cols="12">
        <div id="card-form"/>
        <form name="datos" class="d-none">
          <input type="hidden" ref="refToken" id="token" />
          <input type="hidden" ref="refErrorCode" id="errorCode" />
        </form>
        <div class="d-flex align-center">
          <VCheckbox v-model="dataForm.acceptTermsAndConditions" color="#0000ff" />
          
          <span class="d-inline-block">
            <div>
              I accept
              <VDialog
                v-model="isDialogVisible"
                class="v-dialog-sm"
                persistent
              > 
                <template #activator="{ props }">
                  <span
                    class="text-primary-blue hover-link"
                    v-bind="props"
                  >
                    terms and conditions
                  </span>
                </template>
                <DialogCloseBtn @click="closeModal()" />
                <VCard title="Condiciones de la ayuda digital">
                  <VCardText>
                    <VDivider class="mb-4" />
                    <ModalContract />
                  </VCardText>
                  <VCardText class="d-flex justify-end flex-wrap gap-3">
                    <VBtn
                      variant="outlined"
                      color="error"
                      @click="closeModal()"
                    >
                      Close
                    </VBtn>
                    <VBtn @click="acceptTerms()" color="#0000ff" class="text-white">
                      Accept
                    </VBtn>
                  </VCardText>
                </VCard>
              </VDialog>
            </div>
          </span>
        </div>
        <em v-if="errors.acceptTermsAndConditions" class="d-block text-error text-sm-caption">
          {{ errors.acceptTermsAndConditions }}
        </em>
      </VCol>
      <VCol v-else>
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
              <h1 class="text-3xl text-slate-800 font-bold mb-2">
                Método insertado con éxito
                <!--{{ text.title }}-->
              </h1>
              <p class="mb-5" >Has agregado un método de pago ahora puedes acceder a Aythen</p>
          </div>
        </div>
      </VCol>
      
      <!--<VCol cols="12" md="6">-->
      <!--  <label class="block text-sm font-medium" for="card_number">-->
      <!--    {{ translation.label.pan }} <span class="text-rose-500">*</span>-->
      <!--  </label>-->
      <!--  <input-->
      <!--    v-model="dataForm.card_number"-->
      <!--    spellcheck="false"-->
      <!--    id="card_number"-->
      <!--    class="form-input w-full"-->
      <!--    type="text"-->
      <!--    autocomplete="off"-->
      <!--  />-->
      <!--</VCol>-->
      <!--<VCol cols="12" md="6">-->
      <!--  <label class="block text-sm font-medium" for="card_name">-->
      <!--    {{ translation.label.name }} <span class="text-rose-500">*</span>-->
      <!--  </label>-->
      <!--  <input-->
      <!--    v-model="dataForm.card_name"-->
      <!--    spellcheck="false"-->
      <!--    id="card_name"-->
      <!--    class="form-input w-full"-->
      <!--    type="text"-->
      <!--    autocomplete="off"-->
      <!--  />-->
      <!--</VCol>-->
      <!--<VCol cols="12" md="6">-->
      <!--  <label class="block text-sm font-medium" for="card_expiration">-->
      <!--    {{ translation.label.expired }} <span class="text-rose-500">*</span>-->
      <!--  </label>-->
      <!--  <input-->
      <!--    v-model="dataForm.card_expiration"-->
      <!--    spellcheck="false"-->
      <!--    id="card_expiration"-->
      <!--    class="form-input w-full"-->
      <!--    type="date"-->
      <!--    autocomplete="off"-->
      <!--  />-->
      <!--</VCol>-->
      <!--<VCol cols="12" md="6">-->
      <!--  <label class="block text-sm font-medium" for="card_cvc">-->
      <!--    {{ translation.label.cvc }} <span class="text-rose-500">*</span>-->
      <!--  </label>-->
      <!--  <input-->
      <!--    v-model="dataForm.card_cvc"-->
      <!--    spellcheck="false"-->
      <!--    id="card_cvc"-->
      <!--    class="form-input w-full"-->
      <!--    type="text"-->
      <!--    maxlength="3"-->
      <!--    autocomplete="off"-->
      <!--    pattern="[\d]{3}"-->
      <!--  />-->
      <!--</VCol>-->
    </VRow>
  </div>
</template>

<style lang="scss">

#card-form {
  height: 400px;
}

@media (min-width: 900px) {
  #card-form {
    height: 200px;
  }
}
#divImgAceptar {
  background-color: #000fff !important;
  width: auto !important;
}
</style>
