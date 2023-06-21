<script setup lang="ts">
import ButtonStep from "@/shared/components/DumbComponents/ButtonStep.vue";
// import { isEmptyString } from "@/shared/utils/basic-validation";
import { defineProps } from "vue";
import VSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { textForm04 } from "./text.js";
import { useResellerStore } from "./useResellerStore";
import { useRouter } from "vue-router"
import axios from "@axios";

interface Props {
  show: any
  ubigeo: any
  getCities: (value: any) => void
  getCodes: (value: any) => void
}

const props = defineProps<Props>();
const {
  ubigeo,
  getCities,
  getCodes
} = toRefs(props);

const store = useResellerStore();
const router = useRouter();
const text = textForm04;

function handleGoToStep(nextStep: number) {
  const fieldToEvaludate = completedForm.value;
  
  if (!fieldToEvaludate || isEmailRegistered.value) {
    showErrors()
    return
  };
  
  store.lastStep = nextStep;
  props.show(nextStep);
}

function selectedProvince() {
  store.guest.address.city = "";
  selectedCity();
}
function selectedCity() {
  store.guest.address.zip = [];
}

function isEmptyString(str) {
  return str.length === 0
}
watch(
  () => store.guest.address.province,
  (newValue, oldvalue) => {
    if(newValue !== oldvalue && newValue) {
      getCities.value(newValue)
    }
    if (newValue) return;
    store.guest.address.city = "";
    selectedCity();
  }
);
watch(() => store.guest.address.city,
  async (newValue, oldvalue) => {
    if(newValue !== oldvalue && newValue) {
      await getCodes.value(newValue)
      let codes = []
      for (let i = 0; i < 3; i++) {
        const item = ubigeo.value.codes[i]
        if(item) {
          codes.push(item.codigo_postal)
        }
      }
      store.guest.address.zip = codes
    }
    if (newValue) return;
    store.guest.address.zip = [];
  }
);

const isEmailRegistered = ref(false);
const completedForm = computed<boolean>(() => {
  errors.value = {}
  const formData = store.guest;
  let validations = [
    isEmptyString(formData.fullName),
    isEmptyString(formData.phone),
    isEmptyString(formData.email),
    !Boolean(formData.address.country),
    !Boolean(formData.address.province),
    !Boolean(formData.address.city),
    !formData.address.zip.length,
    isEmailRegistered.value
  ];
  return !validations.includes(true);
});

function validateEmail(str: string) {
  const regex = /^[A-Za-z\d_\-\.]+@[a-zA-Z\d\-]+(\.[a-zA-Z]{2,4}){1,2}$/;
  return !regex.test(str);
}

let timer;
const isSnackbarVisibility = ref(false)
const search = (searchString) => {
  isEmailRegistered.value = true;
  clearTimeout(timer);
  timer = setTimeout(async () => {
    if(!validateEmail(searchString)) {
      try {
        const { data } = await axios.get(`account/get-by-email/${searchString}`);
        if(data == 404) {
          isSnackbarVisibility.value = false
          isEmailRegistered.value = false
        } else {
          isSnackbarVisibility.value = true
          isEmailRegistered.value = true
        
          const { abilities, academyCompletedAt } = data
          // console.log({ abilities, academyCompletedAt })
          // const hasManage = abilities.some(item => item.action == 'manage')
          const hasManage = abilities?.action == 'manage' ? true : false
    
          if(hasManage) {
            // return router.push('/login')
          }
          
          const hasBlock = abilities?.action == 'block' ? true : false // abilities.some(item => item.action == 'block')
          
          if(hasBlock && !academyCompletedAt) {
            // return router.push('/form/academy')
          }
          
          if(hasBlock && academyCompletedAt) {
            // console.log("Is block and completed academy")
            // return router.push('/login')
          }
          
        }
      } catch (e) {
        isSnackbarVisibility.value = false
        isEmailRegistered.value = false
      }
    }
  }, 2000);
}

// SHOW ERRORS FORM FIELD
const errors = ref({});
function showErrors() {
  const formData = store.guest;
  if(isEmptyString(formData.fullName)) {
    errors.value.fullName = true
  }
  if(isEmptyString(formData.phone)) {
    errors.value.phone = true
  }
  if(isEmptyString(formData.email)) {
    errors.value.email = true
  }
  if(!Boolean(formData.address.country)) {
    errors.value.country = true
  }
  if(!Boolean(formData.address.province)) {
    errors.value.province = true
  }
  if(!Boolean(formData.address.city)) {
    errors.value.city = true
  }
  if(!formData.address.zip.length) {
    errors.value.zip = true
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <ButtonStep outline type-arrow="left" @click="show(1)" />
      <ButtonStep
        type-arrow="right"
        :isDisabled="!completedForm"
        @click="handleGoToStep(3)"
      />
    </div>
    <VDivider class="mt-8 mb-4 d-block" />
    <VSnackbar v-model="isSnackbarVisibility"
      location="bottom start"
      multi-line
      :timeout="10000">
      El "Email" ya ha sido registrado. <br>
      Haz Click para
      <a href="/login"
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
    <h1 class="text-3xl text-slate-800 font-bold mb-6">
      {{ text.title_0 }}
    </h1>
    <VRow class="mb-8">
      <VCol cols="12" sm="12" md="8">
        <label class="block text-sm font-medium" for="fullName">
          {{ text.label.fullName }} <span class="text-rose-500">*</span>
        </label>
        <input
          v-model="store.guest.fullName"
          id="fullName"
          class="form-input"
          type="text"
          autocomplete="off"
          spellcheck="false"
        />
        <em v-if="errors.fullName" class="d-block text-error text-sm-caption mb-2">
          Este campo es requerido.
        </em>
      </VCol>
      <VCol cols="12" sm="12" md="4">
        <label class="block text-sm font-medium" for="phone">
          {{ text.label.phone }} <span class="text-rose-500">*</span>
        </label>
        <input
          v-model="store.guest.phone"
          id="phone"
          class="form-input"
          type="tel"
          autocomplete="off"
          spellcheck="false"
        />
        <em v-if="errors.phone" class="d-block text-error text-sm-caption mb-2">
          Este campo es requerido.
        </em>
      </VCol>
      <VCol cols="12" sm="12" md="8">
        <label class="block text-sm font-medium" for="email">
          {{ text.label.email }} <span class="text-rose-500">*</span>
        </label>
        <input
          v-model="store.guest.email"
          id="email"
          class="form-input"
          type="email"
          autocomplete="off"
          spellcheck="false"
          @input="search(store.guest.email)"
        />
        <em v-if="errors.email" class="d-block text-error text-sm-caption mb-2">
          Este campo es requerido y/o incorrecto.
        </em>
      </VCol>
      <VCol cols="12" sm="12" md="4">
        <label class="block text-sm font-medium" for="country">
          {{ text.label.country }}
        </label>
        <input
          v-model="store.guest.address.country"
          class="form-input w-full field-active"
          type="text"
          disabled
          required
          autocomplete="off"
        />
        <em v-if="errors.country" class="d-block text-error text-sm-caption mb-2">
          Este campo es requerido
        </em>
      </VCol>
      <VCol cols="12" sm="12" md="6">
        <label class="block text-sm font-medium" for="province">
          {{ text.label.province }}<span class="text-rose-500">*</span>
        </label>
        <VSelect
          :options="ubigeo.provinces"
          class="vs__select_scoped"
          :getOptionLabel="(item) => item.title"
          :reduce="(item) => item.value"
          v-model="store.guest.address.province"
          @option:selected="selectedProvince"
          maxHeight="200px"
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
        <em v-if="errors.province" class="d-block text-error text-sm-caption mb-2">
          Este campo es requerido
        </em>
      </VCol>
      <VCol cols="12" sm="12" md="6" v-if="store.guest.address.province">
        <label class="block text-sm font-medium" for="province">
          {{ text.label.city }}<span class="text-rose-500">*</span>
        </label>
        <VSelect
          :options="ubigeo.cities"
          class="vs__select_scoped"
          :getOptionLabel="(item) => item.title"
          :reduce="(item) => item.value"
          v-model="store.guest.address.city"
          @option:selected="selectedCity"
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
        <em v-if="errors.city" class="d-block text-error text-sm-caption mb-2">
          Este campo es requerido
        </em>
      </VCol>
      <VCol cols="4" sm="4" v-if="store.guest.address.city">
        <label class="block text-sm font-medium" for="province">
          {{ text.label.postalCode }}<span class="text-rose-500">*</span>
        </label>
        <VSelect
          :options="ubigeo.codes"
          class="vs__select_scoped"
          :getOptionLabel="(item) => item.codigo_postal"
          :reduce="(item) => item.codigo_postal"
          v-model="store.guest.address.zip"
          multiple
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
        <em v-if="errors.zip" class="d-block text-error text-sm-caption mb-2">
          Este campo es requerido
        </em>
      </VCol>
      <VCol cols="8" sm="8" v-if="store.guest.address.zip.length">
        <label class="block text-sm font-medium" for="street">
          {{ text.label.streetAddress }}
        </label>
        <input
          v-model="store.guest.address.line"
          id="street"
          class="form-input w-full"
          type="text"
          autocomplete="off"
        />
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss">
.vs__select_scoped {
  & > .vs__dropdown-toggle {
    padding-block: 7px !important;
    border-radius: 6px !important;
  }
}
</style>
