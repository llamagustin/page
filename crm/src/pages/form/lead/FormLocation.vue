<script lang="ts" setup>

import ButtonStep from "@/shared/components/DumbComponents/ButtonStep.vue";
import { defineEmits, defineProps } from "vue";
import VSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import "vue3-treeselect/dist/vue3-treeselect.css";
// import LangJson from "./lang.json";

import axios from "axios";
// axiosIns.defaults.baseURL = "https://api.aythen.com"
const axiosIns = axios.create({
  baseURL: "https://api-prod.aythen.com",
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
});

// import { textFormLocation } from "./text.js"

// const translation = reactive(LangJson.location);
import LangJson from "./lang.json";
const text = reactive(LangJson.location);



interface Props {
  dataForm: any
  show: (step: number) => void
  ubigeo: any,
  getCities: (value: any) => void
  getCodes: (value: any) => void
}

interface Emits {
  (e: "setActivePanel", indexPanel: number): void;
}
const emit = defineEmits<Emits>();
const props = defineProps<Props>();

const {
  dataForm,
  ubigeo,
  getCities,
  getCodes
} = toRefs(props);


onMounted(() => {
  emit("setActivePanel", 1);
});


//

const isMobile = ref(false)
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  console.log('El usuario está accediendo desde un dispositivo móvil');
  isMobile.value = true
}




// const text = textFormLocation;

const province = ref(dataForm.value.address_province);
const city = ref(dataForm.value.address_city);
const zip = ref(dataForm.value.address_zip);

async function selectProvince(reset=true) {
  let provinceId = dataForm.value.address_province;
  getCities.value(provinceId)
  
  const _province = ubigeo.value.provinces.find((item) => item.value == provinceId);
  props.dataForm.nameProvince = "";
  
  if (_province.value) props.dataForm.nameProvince = _province.title;
  
  province.value = provinceId;
  city.value = "";

  // if(reset){
  //   dataForm.value.address_city = null;
  //   dataForm.value.address_zip = null;
  // }

} 
async function unselectProvince() {
  dataForm.value.address_city = null;
  dataForm.value.address_zip = null;
}
async function unselectCity() {
  dataForm.value.address_zip = null;
}
async function selectCity() {
  const val = dataForm.value.address_city;
  getCodes.value(val)
  
  if(ubigeo.value.codes[0]) {
    dataForm.value.address_zip = ubigeo.value.codes[0].codigo_postal
  }
  const currentCity = ubigeo.value.cities.find((city) => city.value === val);
  props.dataForm.nameCity = "";
  
  if (currentCity) props.dataForm.nameCity = currentCity.title
};


// const isFirmPdf = async () => {
//   var res = axiosIns.post('/unataca/')
// }



const isEmpty = (str: string): boolean => !Boolean(str.length);
const isValid = ref(false);
const valider = () => {
  isValid.value = false;
  let data = dataForm.value;
  
  // console.log('signature', props.dataForm.signature, Object.keys(props.dataForm.signature).length == 0)
  
  // // console.log('repe', Object.keys(dataForm.signature).length !== 0)
  
  // if(Object.keys(props.dataForm.signature).length == 0){
  //   isFirmPdf()
  //   return
  // }
  
  let validations = [
    isEmpty(data.address_country),
    !Boolean(data.address_province),
    !Boolean(data.address_city),
    !Boolean(data.address_zip),
    isEmpty(data.address_line),
  ];
  errors.value = {};
  if (validations.includes(true)) return;
  isValid.value = true;
};

watch(dataForm.value, () => {
  valider();
});

onMounted(() => {
  valider();
});

// watch(
//   () => dataForm.value.address_province,
//   (newValue) => {
//     dataForm.value.address_city = null;
//     dataForm.value.address_zip = null;
//   }
// );
const errors = ref({});
function showErrors() {
  errors.value = [];
  let data = dataForm.value;
  if(isEmpty(data.address_country)) {
    errors.value.address_country = 'Este campo es requerido.'
  }
  if(!Boolean(data.address_province)) {
    errors.value.address_province = 'Este campo es requerido.'
  }
  if(!Boolean(data.address_city)) {
    errors.value.address_city = 'Este campo es requerido.'
  }
  if(!Boolean(data.address_zip)) {
    errors.value.address_zip = 'Este campo es requerido.'
  }
  if(isEmpty(data.address_line)) {
    errors.value.address_line = 'Este campo es requerido.'
  }
}

const editByUser=ref(false)
//selectProvince(false)
// selectCity(false)


if(province.value) selectProvince(province.value)
if(city.value) selectCity(city.value)
if(zip.value) selectCity(city.value)

</script>

<template>
  <div>
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <ButtonStep type-arrow="left" outline @click="show(1)" />
        <ButtonStep
          type-arrow="right"
          :is-disabled="!isValid"
          @click="
          isValid ? 
            show(4) 
            : showErrors()
          "
        />
      </div>
    </div>
    <VDivider class="mt-8 mb-4 d-block" />
    <h1 class="text-3xl text-slate-800 font-bold mb-2">
      {{ text.title }}
    </h1>
    <p class="mb-10">{{ text.text }}</p>
    <VRow class="mb-8">
      
      <VCol cols="12" sm="6" md="6">
        <label class="block text-sm font-medium" for="city">
          {{ text.label.country }}
        </label>
        <input
          v-model="dataForm.address_country"
          class="form-input w-full user-select-none field-active"
          autocomplete="off"
          type="text"
          spellcheck="false"
          readonly
        />
        <em v-if="errors.address_country" class="text-error text-sm-caption"> {{ errors.address_country }}</em>
      </VCol>
      <VCol cols="12" sm="6" md="6">
        <label class="block text-sm font-medium" for="country">
          {{ text.label.province }} <span class="text-rose-500">*</span>
        </label>
        <VSelect
          :options="ubigeo.provinces"
          class="vs__select_scoped"
          :getOptionLabel="(item) => item.title"
          :reduce="(item) => item.value"
          v-model="dataForm.address_province"
          maxHeight="200px"
          id="country"
          @option:selected="selectProvince"
          @option:deselected="unselectProvince"
        >
          <template #no-options="{ search, searching }">
            <template v-if="searching">
              <p class="text-sm-caption">
                No se han encontrado resultados para "<b>{{ search }}</b
                >".
              </p>
            </template>
            <p v-else class="text-sm-caption">No hay opciones</p>
          </template>
        </VSelect>
        <em v-if="errors.address_province" class="text-error text-sm-caption"> {{ errors.address_province }}</em>
      </VCol>
      <VCol cols="12" sm="7" md="7" v-if="dataForm.address_province">
        <label class="block text-sm font-medium" for="city">
          {{ text.label.city }} <span class="text-rose-500">*</span>
        </label>
        <VSelect
          @focus="editByUser=true"
          @blur="editByUser=false"
          :options="ubigeo.cities"
          class="vs__select_scoped"
          :getOptionLabel="(item) => item.title"
          :reduce="(item) => item.value"
          v-model="dataForm.address_city"
          maxHeight="200px"
          id="city"
          @option:selected="selectCity"
          @option:deselected="unselectCity"
        >
          <template #no-options="{ search, searching }">
            <template v-if="searching">
              <p class="text-sm-caption">
                No se han encontrado resultados para "<b>{{ search }}</b
                >".
              </p>
            </template>
            <p v-else class="text-sm-caption">No hay opciones</p>
          </template>
        </VSelect>
        <em v-if="errors.address_city" class="text-error text-sm-caption"> {{ errors.address_city }}</em>
      </VCol>
      <VCol
        cols="12"
        sm="5"
        md="5"
        v-if="dataForm.address_province && dataForm.address_city"
      >
        <label class="block text-sm font-medium" for="postal-code">
          {{ text.label.postalCode }}
          <span class="text-rose-500">*</span>
        </label>
          <!--:options="cityCode"-->
        <VSelect
          :options="ubigeo.codes"
          class="vs__select_scoped"
          :getOptionLabel="(item) => item.codigo_postal"
          :reduce="(item) => item.codigo_postal"
          v-model="dataForm.address_zip"
          maxHeight="200px"
          id="postal-code"
        >
          <template #no-options="{ search, searching }">
            <template v-if="searching">
              <p class="text-sm-caption">
                No se han encontrado resultados para "<b>{{ search }}</b
                >".
              </p>
            </template>
            <p v-else class="text-sm-caption">No hay opciones</p>
          </template>
        </VSelect>
        <em v-if="errors.address_zip" class="text-error text-sm-caption"> {{ errors.address_zip }}</em>
      </VCol>
      <VCol
        cols="12"
        sm="12"
        v-if="
          dataForm.address_province &&
          dataForm.address_city &&
          dataForm.address_zip
        "
      >
        <label class="block text-sm font-medium" for="street">
          {{ text.label.streetAddress }}
          <span class="text-rose-500">*</span>
        </label>
        <input
          v-model="dataForm.address_line"
          autocomplete="off"
          id="street"
          class="form-input w-full"
          type="text"
          spellcheck="false"
        />
        <em v-if="errors.address_line" class="text-error text-sm-caption"> {{ errors.address_line }}</em>
      </VCol>
    </VRow>
    <VRow v-if="isMobile" class="mt-4" justify="end">
      <VCol cols="12" class="flex items-center justify-between" sm="12">
        <ButtonStep type-arrow="left" outline @click="show(1)" />
        <ButtonStep
          type-arrow="right"
          :is-disabled="!isValid"
          @click="
          isValid ? 
            show(4) 
            : showErrors()
          "
        />
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss" scoped>
.vs__select_scoped {
  & > .vs__dropdown-toggle {
    padding-block: 7px !important;
    border-radius: 6px !important;
  }
}
</style>
