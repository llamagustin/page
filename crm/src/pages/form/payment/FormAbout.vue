<script setup lang="ts">
import iae from "@/@fake-db/data/iae.json"
import { loadScript } from "@/shared/utils/dom";
import ButtonStep from "@/shared/components/DumbComponents/ButtonStep.vue"
import axiosIns from "@axios";
import { defineEmits, defineProps } from "vue"
import VSelect from "vue-select"
import "vue-select/dist/vue-select.css"
// import { textFormAbout } from "./text.js"
import LangJson from "./lang.json";
const text = reactive(LangJson.about);

interface Props {
  dataForm: any;
  updateLastStep: (step: number) => void;
  show: (step: number) => void;
}
interface Emits {
  (e: "setActivePanel", indexPanel: number): void;
}

const props = defineProps<Props>();
const account = ref(props.dataForm);
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

// const text = textFormAbout;
const isEmpty = (str: string) => str.length === 0;
const isEmailRegistered = ref(false);
const isValid = computed(() => {
  let data = account.value;
  let validations = [
    isEmpty(data.name),
    !Boolean(data.category),
    // isEmpty(data.company),
    validateNIFCompany(data.nif),
   // isEmpty(data.phone),
    validateEmail(data.email),
    isEmailRegistered.value
  ];
  
  errors.value = {};
  return !validations.includes(true);
});

function validateNIFCompany(nif: string) {
  let regex = /^(?:[A-Za-z]\d{8}|\d{8}[A-Za-z])$/;
  return !regex.test(nif);
}
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
  isEmailRegistered.value = true;
  clearTimeout(timer);
  timer = setTimeout(async () => {
    if(!validateEmail(account.value.email)) {
      try {
        const { data } = await axiosIns.get(`user/get-by-email/${account.value.email}`);
        
        if(account.value.email==data.email){
          isSnackbarVisibility.value = true
          isEmailRegistered.value = true}
        else{
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

const isNif = (id) => {
  var nifRegex = /^[a-zA-Z]\d{8}$/;
    
  if(nifRegex.test(id)) {
    return true
  }else{
    return false
  }
}

// SHOW ERRORS FORM FIELD
const errors = ref({});
function showErrors() {
  errors.value = {};
  let data = account.value;
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
  if(isEmpty(data.company)){
    errors.value.company = 'Este campo es requerido.'
  }
  if(isEmpty(data.nif)) {
    errors.value.nif = 'Este campo es requerido.'
  // } else if(validateNIFCompany(data.nif)) {
  } else {
    if(isNif(data.nif)) {
      if(isEmpty(data.company)){
       errors.value.company = 'Este campo es requerido, has introducido un nif.'
      }
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
  }else if(isValid){
    var nifRegex = /^[a-zA-Z]\d{8}$/;
    
    if(nifRegex.test(account.value.nif)) {
      if(isEmpty(account.value.company)){
         showErrors()
      }else{
        props.show(2)
      }
    }else{
      props.show(3)
    }
  
    
  }else{
    showErrors()
  }
}


//view nif or dni
watch(account.value, (acc) => {
  if(isNif(acc.nif)) {
    isCompany.value = true
  }else{
    isCompany.value = false
  }
})

if(isNif(account.value.nif)) isCompany.value = true


  
//  
if(props.dataForm.email){
  search(props.dataForm.email)
}


watch(props.dataForm, () => {
  isSnackbarVisibility.value = false
})
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
    <p class="mb-10">{{ text.text }}</p>
    
    <VRow>
      <VCol cols="12" xs="12" sm="12">
        <label class="block text-sm font-medium" for="name">
          {{ text.label.name }} <span class="text-rose-500">*</span>
        </label>
        <input
          v-model="account.name"
          class="form-input w-full"
          type="text"
          autocomplete="off"
          id="name"
          spellcheck="false"
        />
        <em v-if="errors.name" class="text-error text-sm-caption"> {{ errors.fullName }}</em>
      </VCol>
      <VCol cols="6" xs="6" sm="6">
        <label class="block text-sm font-medium" for="firstSurname">
          {{ text.label.firstSurname }} <span class="text-rose-500">*</span>
        </label>
        <input
          v-model="account.firstSurname"
          class="form-input w-full"
          type="text"
          autocomplete="off"
          id="firstSurname"
          spellcheck="false"
        />
        <em v-if="errors.firstSurname" class="text-error text-sm-caption"> {{ errors.fullName }}</em>
      </VCol>
      <VCol cols="6" xs="6" sm="6">
        <label class="block text-sm font-medium" for="secondSurname">
          {{ text.label.secondSurname }} <span class="text-rose-500">*</span>
        </label>
        <input
          v-model="account.secondSurname"
          class="form-input w-full"
          type="text"
          autocomplete="off"
          id="firstSurname"
          spellcheck="false"
        />
        <em v-if="errors.secondSurname" class="text-error text-sm-caption"> {{ errors.fullName }}</em>
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
          v-model="account.category"
          maxHeight="200px"
          id="category"
          spellcheck="false"
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
      <VCol cols="12" sm="12" md="4">
        <label class="block text-sm font-medium" for="nif">
          {{ text.label.nif }} / DNI <span class="text-rose-500">*</span>
        </label>
        <input
          v-model="account.nif"
          id="nif"
          class="form-input"
          type="text"
          pattern="^(?:[A-Za-z]\d{8}|\d{8}[A-Za-z])$"
          spellcheck="false"
        />
        <em v-if="errors.nif" class="text-error text-sm-caption"> {{ errors.nif }}</em>
      </VCol>
      <VCol cols="12" sm="12" md="8">
        <label class="block text-sm font-medium" for="company-name">
          {{ text.label.company }} <span v-if="isCompany" class="text-rose-500">*</span>
        </label>
        <input
          v-model="account.company"
          id="company-name"
          class="form-input w-full"
          type="text"
          autocomplete="off"
          spellcheck="false"
        />
        <em v-if="errors.company" class="text-error text-sm-caption"> {{ errors.company }}</em>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12" sm="12" md="8">
        <label class="block text-sm font-medium" for="email">
          {{ text.label.email }} <span class="text-rose-500">*</span>
        </label>
        <input
          v-model="account.email"
          id="email"
          class="form-input w-full"
          type="text"
          autocomplete="off"
          pattern="^[A-Za-z\d_\-\.]+@[a-zA-Z\d\-]+(\.[a-zA-Z]{2,4}){1,2}$"
          spellcheck="false"
          @input="search(account.email)"
        />
        <em v-if="errors.email" class="text-error text-sm-caption"> {{ errors.email }}</em>
      </VCol>
      <VCol cols="12" sm="12" md="4" class="mb-10">
        <label class="block text-sm font-medium" for="telephone">
          {{ text.label.telephone }}
          <span v-if="false" class="text-rose-500">*</span>
        </label>
        <input
          v-model="account.phone"
          id="telephone"
          class="form-input w-full"
          type="tel"
          autocomplete="off"
          spellcheck="false"
        />
        <em v-if="false " class="text-error text-sm-caption"> {{ errors.phone }}</em>
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
</style>
