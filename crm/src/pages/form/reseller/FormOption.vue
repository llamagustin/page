<script setup lang="ts">
import ButtonStep from "@/shared/components/DumbComponents/ButtonStep.vue";
import { defineProps } from "vue";
import { textForm01 } from "./text.js";
import { useResellerStore } from "./useResellerStore";

const props = defineProps<{ show: any }>();

const store = useResellerStore();
const text = textForm01;

function handleGoToStep(nextStep: number) {
  const fieldToEvaludate = completedForm.value;
  if (!fieldToEvaludate) {
    showErrors()
    return
  }
  store.lastStep = nextStep;
  props.show(nextStep);
}

const completedForm = computed<boolean>(() => {
  errors.value = {}
  const formData = store.guest;
  return Boolean(formData.plan.length);
});

const errors = ref({});
function showErrors() {
  const formData = store.guest
  if(!formData.plan.length) {
    errors.value.plan = true;
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <ButtonStep outline type-arrow="left" @click="show(2)" />
      <ButtonStep
        type-arrow="right"
        :is-disabled="!completedForm"
        @click="handleGoToStep(4)"
      />
    </div>
    <VDivider class="mt-8 mb-4 d-block" />
    <h1 class="text-3xl text-slate-800 font-bold mb-1">
      {{ text.title }}
    </h1>
    <div class="text-xs mb-2">
      {{ text.text }}
    </div>
    <div class="mb-6">
      <em v-if="errors.plan" class="d-block text-error text-sm-caption mb-2">
        Seleccione 1 opción
      </em>
      <div
        class="space-y-3 mb-1"
        v-for="(question, index) in text.qq"
        :key="index"
      >
        <label class="relative block cursor-pointer">
          <input
            v-model="store.guest.plan"
            type="checkbox"
            :value="question.value"
            name="radio-buttons"
            class="peer sr-only"
          />
          <div
            class="flex items-center bg-white text-sm font-medium text-slate-800 p-4 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out"
          >
            <svg
              class="w-10 h-10 shrink-0 fill-current mr-2"
              viewBox="0 0 24 24"
            >
              <path
                class="text-indigo-500"
                d="m12 10.856 9-5-8.514-4.73a1 1 0 0 0-.972 0L3 5.856l9 5Z"
              />
              <path
                class="text-indigo-300"
                d="m11 12.588-9-5V18a1 1 0 0 0 .514.874L11 23.588v-11Z"
              />
              <path
                class="text-indigo-200"
                d="M13 12.588v11l8.486-4.714A1 1 0 0 0 22 18V7.589l-9 4.999Z"
              />
            </svg>
            <div class="ml-2 user-select-none">
              <span>{{ question.title }}</span>
              <p class="text-gray">{{ question.text }}</p>
            </div>
          </div>
          <div
            class="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 rounded pointer-events-none"
            aria-hidden="true"
          ></div>
        </label>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.text-gray {
  color: hsl(0 0% 49%);
}
</style>
