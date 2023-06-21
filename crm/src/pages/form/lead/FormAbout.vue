<script setup lang="ts">
import parsePhoneNumber from 'libphonenumber-js'

import { dials } from "@/@fake-db/data/dial"
import iae from "@/@fake-db/data/iae.json"
import { loadScript } from "@/shared/utils/dom";
import { isID } from "@/shared/utils/id";

import ButtonStep from "@/shared/components/DumbComponents/ButtonStep.vue"
import axios from "axios";

const axiosIns = axios.create({
  baseURL: "https://api-prod.aythen.com",
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
});



import { defineEmits, defineProps } from "vue"
import VSelect from "vue-select"
import "vue-select/dist/vue-select.css"
// import { textFormAbout } from "./text.js"
import LangJson from "./lang.json";
const text = reactive(LangJson.about);

interface Props {
  dataForm: any
  show: (step: number) => void
}
interface Emits {
  (e: "setActivePanel", indexPanel: number): void;
}

const props = defineProps<Props>();



const {
  dataForm
} = toRefs(props);

// const dataForm = ref(props.dataForm)

const isMobile = ref(false)
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  console.log('El usuario está accediendo desde un dispositivo móvil');
  isMobile.value = true
}


// const account = ref(props.dataForm);


const emit = defineEmits<Emits>();


const isCompany = ref(false)

onMounted(() => {
  emit("setActivePanel", 0);
});



const listIae = computed(() => {
  const qr=[...new Map(iae.map((item) => [item.value, item])).values()];

  return qr.map(item => {
    return {...item,title: item.value + " - " + item.title};
  })
});


const listGrantor = [{
  title: 'Administrador mancomunado',
},{
  title: 'Administrador solidario',
},{
  title: 'Administrador único',
},{
  title: 'Apoderado',
},{
  title: 'Consejero delegado',
},{
  title: 'Consejero delegado mancomunado',
},{
  title: 'Persona en autoempleo',
},{
  title: 'Presidente',
},{
  title: 'Secretario',
},{
  title: 'Otros'
}]

// const text = textFormAbout;
const isEmpty = (str) => {
  return str.length === 0;
}
const isEmailRegistered = ref(false);
const isValid = computed(() => {
  let data = props.dataForm;
  
  let validations = [
    isEmpty(data.name),
    isEmpty(data.firstSurname),
    isEmpty(data.secondSurname),
    !Boolean(data.category),
    !Boolean(data.grantor),
    // isEmpty(data.company),
    !isID(data.nif),
    // isEmpty(data.dial),
    isEmpty(data.dial_phone),
    validateEmail(data.email),
    isEmailRegistered.value
  ];

  // errors.value = {};
  return !validations.includes(true);
});

// function validateNIFCompany(nif: string) {
//   let regex = /^(?:[A-Za-z]\d{8}|\d{8}[A-Za-z])$/;
//   console.log('regex', nif, !regex.test(nif))
//   return !regex.test(nif);
// }
function validateEmail(str: string) {
  const regex = /^[A-Za-z\d_\-\.]+@[a-zA-Z\d\-]+(\.[a-zA-Z]{2,4}){1,2}$/;
  return !regex.test(str);
}
function validatePhone(str) {
  const regex = /^(\\+34|0034|34)?[67]\\d{8}$/
  return !regex.test(str)
}
let timer;
const isSnackbarVisibility = ref(false)
const search = (searchString) => {
  // isEmailRegistered.value = true;
  clearTimeout(timer);
  
  timer = setTimeout(async () => {
    if(!validateEmail(dataForm.value.email)) {
      try {
        const { data } = await axiosIns.get(`user/get-by-email/${dataForm.value.email}`);

        if(dataForm.value.email==data.email){
          isSnackbarVisibility.value = true
          isEmailRegistered.value = true
        }else{
          isSnackbarVisibility.value = false
          isEmailRegistered.value = false
        }
      } catch (e) {
        isSnackbarVisibility.value = false
        isEmailRegistered.value = false
      }
    }
  }, 2000);
}

// const isNif = (id) => {
//   var nifRegex = /^[a-zA-Z]\d{8}$/;
    
//   if(nifRegex.test(id)) {
//     return true
//   }else{
//     return false
//   }
// }


//https://github.com/TORR3S/Check-NIF
// const isID = (id) => {
//     //dni
//     var dni_letters = "TRWAGMYFPDXBNJZSQVHLCKE";
//     var letter = dni_letters.charAt( parseInt( id, 10 ) % 23 );
    
//     return letter == id.charAt(8);
    
//     // nie
//     var nie_prefix = nie.charAt( 0 );

//     switch (nie_prefix) {
//       case 'X': nie_prefix = 0; break;
//       case 'Y': nie_prefix = 1; break;
//       case 'Z': nie_prefix = 2; break;
//     }

//     return validDNI( nie_prefix + nie.substr(1) );
    
    
//     //cif
//     var match = cif.match( CIF_REGEX );
//     var letter  = match[1],
//         number  = match[2],
//         control = match[3];

//     var even_sum = 0;
//     var odd_sum = 0;
//     var n;

//     for ( var i = 0; i < number.length; i++) {
//       n = parseInt( number[i], 10 );

//       // Odd positions (Even index equals to odd position. i=0 equals first position)
//       if ( i % 2 === 0 ) {
//         // Odd positions are multiplied first.
//         n *= 2;

//         // If the multiplication is bigger than 10 we need to adjust
//         odd_sum += n < 10 ? n : n - 9;

//       // Even positions
//       // Just sum them
//       } else {
//         even_sum += n;
//       }

//     }

//     var control_digit = (10 - (even_sum + odd_sum).toString().substr(-1) );
//     var control_letter = 'JABCDEFGHI'.substr( control_digit, 1 );

//     // Control must be a digit
//     if ( letter.match( /[ABEH]/ ) ) {
//       return control == control_digit;

//     // Control must be a letter
//     } else if ( letter.match( /[KPQS]/ ) ) {
//       return control == control_letter;

//     // Can be either
//     } else {
//       return control == control_digit || control == control_letter;
//     }
// }
  
  
  
  
  
  



// SHOW ERRORS FORM FIELD
const errors = ref({});
function showErrors() {
  errors.value = {};
  let data = dataForm.value;
  
  
  if(isEmpty(data.name)) {
    errors.value.name = 'Este campo es requerido.'
  }
  if(isEmpty(data.firstSurname)) {
    errors.value.firstSurname = 'Este campo es requerido.'
  }

  if(isEmpty(data.secondSurname)) {
    errors.value.secondSurname = 'Este campo es requerido.'
  }
  if(!Boolean(data.category)) {
    errors.value.category = 'Este campo es requerido.'
  }
  
  if(!Boolean(data.grantor)) {
    errors.value.grantor = 'Este campo es requerido.'
  }
  // if(isEmpty(data.company)){
  //   errors.value.company = 'Este campo es requerido.'
  // }
  if(isEmpty(data.nif)) {
    errors.value.nif = 'Este campo es requerido.'
  // } else if(validateNIFCompany(data.nif)) {
  } else {
    if(isID(data.nif) == 'cif') {
      if(isEmpty(data.company)){
       errors.value.company = 'Este campo es requerido, has introducido un cif.'
      }
    }else if(!isID(data.nif)){
      errors.value.nif = 'Error de docuemnto.'
    }
  }
  if(isEmpty(data.email)) {
    errors.value.email = 'Este campo es requerido'
  } else if(validateEmail(data.email)) {
    errors.value.email = 'Este campo es inválido.'
  }
  if(isEmpty(data.phone)) {
    errors.value.phone = 'Este campo es requerido.'
  } else if(validatePhone(data.phone)) {
    errors.value.phone = 'Este campo es inválido.'
  }
}

//go location or notary
const goRoute = () => {
  if(isEmailRegistered.value){
    isSnackbarVisibility.value = true
  }else if(isValid.value){
    if(isID(props.dataForm.nif) == 'cif') {
      if(isEmpty(props.dataForm.company)){
         showErrors()
         return
      }
    }else if(!isID(props.dataForm.nif)){
         showErrors()
         return
    }
    
    if(!props.dataForm.valid_phone){
       props.show(2)
    }else{
      props.show(3)
    }
  }else{
    console.log('aq123')
    showErrors()
  }
}


//view nif or dni
watch(props.dataForm, (acc) => {
  errors.value = {}
  
  if(isID(acc.nif) == 'cif') {
    isCompany.value = true
  }else{
    isCompany.value = false
  }
  
  isSnackbarVisibility.value = false
})



// watch(props.dataForm, () => {
//   isSnackbarVisibility.value = false
// })


if(isID(props.dataForm.nif)) isCompany.value = true


  
//  
if(props.dataForm.email){
  search(props.dataForm.email)
}





//Phone
const selectedDial = ref(props.dataForm.dial)
const selectedPhone = ref(props.dataForm.phone)

const onSelect = ({name, iso2, dialCode}) => {
  console.log(name, iso2, dialCode);
}

const validPhone = () => {
  props.dataForm.valid_phone = false
  
  var dial = selectedDial.value
  var number = selectedPhone.value
  var data = parsePhoneNumber(dial + number)
  // account.phone = parsePhoneNumber(data.number)
  if(data){
    selectedPhone.value = data.nationalNumber
    props.dataForm.dial = '+' + data.countryCallingCode
    props.dataForm.phone = data.nationalNumber
    props.dataForm.dial_phone = '+' + data.countryCallingCode + data.nationalNumber
  }
}
</script>

<template>
  <div>
    <!--<em v-if="errors." class="text-error text-sm-caption"> {{ errors. }}</em>-->
    <VRow justify="end">
      <VCol cols="12" class="text-right" sm="12">
        <ButtonStep
          type-arrow="right"
          :is-disabled="!isValid"
          @click="goRoute"
        />
      </VCol>
    </VRow>
    <VDivider class="mt-8 mb-4 d-block" />
    <VSnackbar v-model="isSnackbarVisibility"
      location="bottom start"
      multi-line
      :timeout="10000">
      El "{{dataForm.email}}" ya ha sido registrado. <br>
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
    
    <h1 class="text-3xl text-slate-800 font-bold mb-2">{{ text.title }}</h1>
    <p class="mb-4">{{ text.text }}</p>

    <VRow>
      <VCol cols="12" xs="12" sm="12">
        <label class="block text-sm font-medium" for="name">
          {{ text.label.name }} <span class="text-rose-500">*</span>
        </label>
        <input
          v-model="props.dataForm.name"
          class="form-input w-full"
          type="text"
          autocomplete="off"
          id="name"
          spellcheck="false"
        />
        <em v-if="errors.name" class="text-error text-sm-caption"> {{ errors.fullName }}</em>
      </VCol>
      <VCol cols="12" sm="6" >
        <label class="block text-sm font-medium" for="firstsurname">
          {{ text.label.firstSurname }} <span class="text-rose-500">*</span>
        </label>
        <input
          v-model="dataForm.firstSurname"
          class="form-input w-full"
          type="text"
          id="firstsurname"
          autocomplete="off"
          spellcheck="false"
        />
        <em v-if="errors.firstSurname" class="text-error text-sm-caption"> {{ errors.firstSurname }}</em>
      </VCol>
      <VCol cols="12" sm="6">
        <label class="block text-sm font-medium" for="secondsurname">
          {{ text.label.secondSurname }} <span class="text-rose-500">*</span>
        </label>
        <input
          v-model="dataForm.secondSurname"
          class="form-input w-full"
          type="text"
          autocomplete="off"
          id="secondsurname"
          spellcheck="false"
        />
        <em v-if="errors.secondSurname" class="text-error text-sm-caption"> {{ errors.secondSurname }}</em>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12" sm="12" md="5">
        <label class="block text-sm font-medium" for="email">
          {{ text.label.email }} <span class="text-rose-500">*</span>
        </label>
        <input
          v-model="dataForm.email"
          id="email"
          class="form-input w-full"
          type="text"
          autocomplete="off"
          pattern="^[A-Za-z\d_\-\.]+@[a-zA-Z\d\-]+(\.[a-zA-Z]{2,4}){1,2}$"
          spellcheck="false"
          @input="search(dataForm.email)"
        />
        <em v-if="errors.email" class="text-error text-sm-caption"> {{ errors.email }}</em>
      </VCol>
      <VCol cols="12" sm="12" md="7" >
        <label class="block text-sm font-medium" for="telephone">
          {{ text.label.telephone }}
          <span v-if="false" class="text-rose-500">*</span>
        </label>
        <div class="flex" :style="{gap: '4px'}">
             <VSelect
              :options="dials"
              :getOptionLabel="(item) => item.title"
              :reduce="(item) => item.title"
              v-model="selectedDial"
              maxHeight="40px"
              id="dial"
              spellcheck="false"
              :clearable="false"
              :style="{width: '170px', height: '20px'}"
            >
              <template #no-options="{ search, searching }">
                <template v-if="searching">
                  <p class="text-sm-caption">
                    No se han encontrado resultados para "<b>{{ search }}</b>".
                  </p>
                </template>
                <p v-else class="text-sm-caption">No hay opciones</p>
              </template>
            </VSelect>
            <input
              id="telephone"
              v-model="selectedPhone"
              @change="validPhone"
              class="form-input w-full"
              type="tel"
              autocomplete="off"
              spellcheck="false"
            />
        </div>
        <em v-if="false " class="text-error text-sm-caption"> {{ errors.phone }}</em>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12" xs="12" sm="12">
        <label class="block font-medium" for="grantor">
          {{ text.label.grantor }} <span class="text-rose-500">*</span>
        </label>
        <VSelect
          :options="listGrantor"
          class="vs__select_scoped"
          :getOptionLabel="(item) => item.title"
          :reduce="(item) => item.title"
          v-model="dataForm.grantor"
          maxHeight="200px"
          id="grantor"
          spellcheck="false"
          clearable="false"
        >
          <template #no-options="{ search, searching }">
            <template v-if="searching">
              <p class="text-sm-caption">
                No se han encontrado resultados para "<b>{{ search }}</b>".
              </p>
            </template>
            <p v-else class="text-sm-caption">No hay opciones</p>
          </template>
        </VSelect>
        <em v-if="errors.grantor" class="text-error text-sm-caption"> {{ errors.grantor }}</em>
      </VCol>
      <VCol cols="12" xs="12" sm="12">
        <label class="block font-medium" for="category">
          {{ text.label.category }} <span class="text-rose-500">*</span>
        </label>
        <VSelect
          :options="listIae"
          class="vs__select_scoped"
          :getOptionLabel="(item) => item.title"
          :reduce="(item) => item.value"
          v-model="dataForm.category"
          maxHeight="200px"
          id="category"
          spellcheck="false"
          clearable="false"
        >
          <template #no-options="{ search, searching }">
            <template v-if="searching">
              <p class="text-sm-caption">
                No se han encontrado resultados para "<b>{{ search }}</b>".
              </p>
            </template>
            <p v-else class="text-sm-caption">No hay opciones</p>
          </template>
        </VSelect>
        <em v-if="errors.category" class="text-error text-sm-caption"> {{ errors.category }}</em>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12" sm="4" md="4">
        <label class="block text-sm font-medium" for="nif">
          {{ text.label.nif }} / DNI <span class="text-rose-500">*</span>
        </label>
        <input
          v-model="dataForm.nif"
          id="nif"
          class="form-input"
          type="text"
          pattern="^(?:[A-Za-z]\d{8}|\d{8}[A-Za-z])$"
          spellcheck="false"
        />
        <em v-if="errors.nif" class="text-error text-sm-caption"> {{ errors.nif }}</em>
      </VCol>
      <VCol cols="12" sm="8" md="8">
        <label class="block text-sm font-medium" for="company-name">
          {{ text.label.company }} <span v-if="isCompany" class="text-rose-500">*</span>
        </label>
        <input
          v-model="dataForm.company"
          id="company-name"
          class="form-input w-full"
          type="text"
          autocomplete="off"
          spellcheck="false"
        />
        <em v-if="errors.company" class="text-error text-sm-caption"> {{ errors.company }}</em>
      </VCol>
    </VRow>
    <VRow v-if="isMobile" class="mt-4" justify="end">
      <VCol cols="12" class="text-right" sm="12">
        <ButtonStep
          type-arrow="right"
          :is-disabled="!isValid"
          @click="goRoute"
        />
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss">
/*--vs-actions-padding: 4px 6px 0 3px; */
.vs__select_scoped {
  & > .vs__dropdown-toggle {
    padding-block: 7px !important;
    border-radius: 6px !important;
  }
}

.vs__selected{
  height: 24px;
}

.vs__selected-options{
  height: 32px;
}
</style>
