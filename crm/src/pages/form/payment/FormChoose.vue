<script setup lang="ts">
import ButtonStep from "@/shared/components/DumbComponents/ButtonStep.vue";
import { defineEmits, defineProps } from "vue";
import LangJson from "./lang.json";

const translation = reactive(LangJson.subvencion);
const listOptions = reactive(translation.step);

interface Props {
  dataForm: any;
  updateLastStep: (step: number) => void;
  show: (step: number) => void;
}

const { dataForm, updateLastStep } = defineProps<Props>();

interface Emits {
  (e: "setActivePanel", indexPanel: number): void;
}
const emit = defineEmits<Emits>();
// onMounted(() => {
//   emit("setActivePanel", 3);
// });

const isValid = computed(() => {
  errors.value = [];
  return dataForm.subvencion.length != 0;
});

const nextStep = computed(() => {
  return dataForm.subvencion == "without" ? 7 : 6;
});

onMounted(() => {
  updateLastStep(5);
});

const errors = ref([]);
function showErrors() {
  errors.value = [];
  if(!dataForm.subvencion.length) {
    errors.value.push('Seleccione una opción')
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <ButtonStep outline @click="show(4)" />
      <ButtonStep
        type-arrow="right"
        :is-disabled="!isValid"
        @click="isValid ? show(nextStep) : showErrors()"
      />
    </div>
    
    
    <VDivider class="mt-8 mb-4 d-block" />
    <h1 class="text-3xl text-slate-800 font-bold mb-2">
      {{ translation.title }}
    </h1>
    <p class="mb-10">{{ translation.text }}</p>
    <VCol cols="12" xs="12" sm="12" v-if="errors.length">
      <ul class="text-error text-sm-caption">
        <li v-for="error in errors" class="text-error">{{ error }}</li>
      </ul>
    </VCol>
    <div class="space-y-3 sm:space-y-2 mb-4">
      <label
        class="relative block cursor-pointer"
        v-for="(option, index) in listOptions"
        :key="index"
      >
        <input
          v-model="dataForm.subvencion"
          type="radio"
          name="radio-buttons"
          :value="option.value"
          class="peer sr-only"
        />
        <div
          class="h-full bg-white px-3 py-4 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out"
        >
          <div class="flex items-center mb-1">
            <svg
              class="inline-flex w-6 h-6 shrink-0 fill-current"
              viewBox="0 0 40 40"
            >
              <circle class="text-indigo-100" cx="20" cy="20" r="20" />
              <path
                class="text-indigo-500"
                d="m26.371 23.749-3.742-1.5a1 1 0 0 1-.629-.926v-.878A3.982 3.982 0 0 0 24 17v-1.828A4.087 4.087 0 0 0 20 11a4.087 4.087 0 0 0-4 4.172V17a3.982 3.982 0 0 0 2 3.445v.878a1 1 0 0 1-.629.928l-3.742 1.5a1 1 0 0 0-.629.926V27a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.323a1 1 0 0 0-.629-.928Z"
              />
              <circle class="text-indigo-100" cx="20" cy="20" r="20" />
              <path
                class="text-indigo-300"
                d="m30.377 22.749-3.709-1.5a1 1 0 0 1-.623-.926v-.878A3.989 3.989 0 0 0 28.027 16v-1.828c.047-2.257-1.728-4.124-3.964-4.172-2.236.048-4.011 1.915-3.964 4.172V16a3.989 3.989 0 0 0 1.982 3.445v.878a1 1 0 0 1-.623.928c-.906.266-1.626.557-2.159.872-.533.315-1.3 1.272-2.299 2.872 1.131.453 6.075-.546 6.072.682V28a2.99 2.99 0 0 1-.182 1h7.119A.996.996 0 0 0 31 28v-4.323a1 1 0 0 0-.623-.928Z"
              />
              <path
                class="text-indigo-500"
                d="m22.371 24.749-3.742-1.5a1 1 0 0 1-.629-.926v-.878A3.982 3.982 0 0 0 20 18v-1.828A4.087 4.087 0 0 0 16 12a4.087 4.087 0 0 0-4 4.172V18a3.982 3.982 0 0 0 2 3.445v.878a1 1 0 0 1-.629.928l-3.742 1.5a1 1 0 0 0-.629.926V28a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.323a1 1 0 0 0-.629-.928Z"
              />
            </svg>
            <div
              class="ml-1 font-medium text-slate-800 text-uppercase font-bold user-select-none"
            >
              {{ option.title }}
            </div>
          </div>
          <div class="text-sm user-select-none">
            {{ option.text }}
          </div>
        </div>
        <div
          class="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 rounded pointer-events-none"
          aria-hidden="true"
        ></div>
      </label>
    </div>
    <div class="flex items-center justify-between space-x-6 mb-8">
      <div>
        <div class="font-medium text-slate-800 text-sm mb-1">
          {{ translation.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.peer:checked ~ .peer-checked\:border-indigo-400 {
  border-color: rgb(15, 15, 255) !important;
}
</style>
