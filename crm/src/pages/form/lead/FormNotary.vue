<script setup lang="ts">
import iae from "@/@fake-db/data/iae.json"
import { loadScript } from "@/shared/utils/dom";
import ButtonStep from "@/shared/components/DumbComponents/ButtonStep.vue"
import { defineEmits, defineProps } from "vue"
import VSelect from "vue-select"
import "vue-select/dist/vue-select.css"
// import { textFormNotary } from "./text.js"
import LangJson from "./lang.json";
const text = reactive(LangJson.notary);

import axios from "axios"
const axiosIns = axios.create({
  baseURL: "https://api-prod.aythen.com",
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
});


interface Props {
  dataForm: any;
  show: (step: number) => void;
}
interface Emits {
  (e: "setActivePanel", indexPanel: number): void;
}

const props = defineProps<Props>();
const account = ref(props.dataForm);
const emit = defineEmits<Emits>();

onMounted(() => {
  emit("setActivePanel", 0);
});



// const text = textFormNotary;
const isEmpty = (str: string) => str.length === 0;
const isEmailRegistered = ref(false);
const isValid = computed(() => {
  let data = account.value;
  // let validations = [
  //   isEmpty(data.notaryName),
  //   isEmpty(data.notaryFirstSurname),
  //   isEmpty(data.notarySecondSurname),
  //   isEmpty(data.notaryNumber),
  //   isEmpty(data.notaryDate),
  // ];
  let validations = [false];
  errors.value = {};
  return !validations.includes(true);
});



// SHOW ERRORS FORM FIELD
const errors = ref({});
function showErrors() {
  errors.value = {};
  let data = account.value;
  if(isEmpty(data.notaryName)) {
    errors.value.name = 'Este campo es requerido.'
  }
  if(isEmpty(data.notaryFirstSurname)){
    errors.value.firstSurname = 'Este campo es requerido.'
  }
  if(isEmpty(data.notarySecondSurname)) {
    errors.value.secondSurname = 'Este campo es requerido.'
  }
  if(isEmpty(data.notaryNumber)) {
    errors.value.number = 'Este campo es requerido.'
  }
  if(isEmpty(data.notaryDate)) {
    errors.value.date = 'Este campo es requerido.'
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <ButtonStep outline type-arrow="left" @click="show(1)" />
      <ButtonStep
        type-arrow="right"
        :is-disabled="!isValid"
        @click="isValid ? show(3) : showErrors()"
      />
    </div>
    <VDivider class="mt-8 mb-4 d-block" />
    
    <h1 class="text-3xl text-slate-800 font-bold mb-2">{{ text.title }}</h1>
    <p class="mb-10">{{ text.text }}</p>
    
    <VRow>
      <VCol cols="12" xs="12" sm="12">
        <label class="block text-sm font-medium" for="name">
          {{ text.label.name }} 
        </label>
        <input
          v-model="account.notaryName"
          class="form-input w-full"
          type="text"
          autocomplete="off"
          id="name"
          spellcheck="false"
        />
        <em v-if="errors.name" class="text-error text-sm-caption"> {{ errors.name }}</em>
      </VCol>
      <VCol cols="12" xs="12" sm="12">
        <label class="block text-sm font-medium" for="firstSurname">
          {{ text.label.firstSurname }}
        </label>
        <input
          v-model="account.notaryFirstSurname"
          class="form-input w-full"
          type="text"
          autocomplete="off"
          id="firstSurname"
          spellcheck="false"
        />
        <em v-if="errors.firstSurname" class="text-error text-sm-caption"> {{ errors.firstSurname }}</em>
      </VCol>
      <VCol cols="12" xs="12" sm="12">
        <label class="block text-sm font-medium" for="secondSurname">
          {{ text.label.secondSurname }} 
        </label>
        <input
          v-model="account.notarySecondSurname"
          class="form-input w-full"
          type="text"
          autocomplete="off"
          id="secondSurname"
          spellcheck="false"
        />
        <em v-if="errors.secondSurname" class="text-error text-sm-caption"> {{ errors.secondSurname }}</em>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="4" >
        <label class="block text-sm font-medium" for="number">
          {{ text.label.number }}
        </label>
        <input
          v-model="account.notaryNumber"
          class="form-input w-full"
          type="text"
          autocomplete="off"
          id="number"
          spellcheck="false"
        />
        <em v-if="errors.number" class="text-error text-sm-caption"> {{ errors.number }}</em>
      </VCol>
      <VCol cols="8" >
        <label class="block text-sm font-medium" for="date">
          {{ text.label.date }} 
        </label>
        <input
          v-model="account.notaryDate"
          class="form-input w-full"
          type="text"
          autocomplete="off"
          id="date"
          spellcheck="false"
        />
        <em v-if="errors.date" class="text-error text-sm-caption"> {{ errors.date }}</em>
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
