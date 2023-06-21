<script setup lang="ts">
import ButtonStep from "@/shared/components/DumbComponents/ButtonStep.vue";
import { PhUser } from "phosphor-vue";
import { defineProps } from "vue";
import { textForm02 } from "./text.js";
import { useResellerStore } from "./useResellerStore";

interface Props {
  show: any;
}
const store = useResellerStore();
const props = defineProps<Props>();
const text = textForm02;

const listOptions = reactive(text.step);

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
  const formData = store.guest.knowDigitalKit;
  errors.value = {}
  return Boolean(formData);
});

const errors = ref({});
function showErrors() {
  const formData = store.guest
  if(!store.guest.knowDigitalKit) {
    errors.value.knowDigitalKit = true;
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
        @click="handleGoToStep(5)"
      />
    </div>
    <VDivider class="mt-8 mb-4 d-block" />
    <h1 class="text-3xl text-slate-800 font-bold mb-6">
      {{ text.title }}
    </h1>
    <!-- Form -->
    <div class="space-y-3 sm:space-y-2 mb-4">
      <em v-if="errors.knowDigitalKit" class="d-block text-error text-sm-caption mb-2">
        Seleccione 1 opción
      </em>
      <label
        class="relative block cursor-pointer"
        v-for="(step, index) in listOptions"
        :key="index"
      >
        <input
          v-model="store.guest.knowDigitalKit"
          type="radio"
          name="radio-buttons"
          :value="step.value"
          class="peer sr-only"
        />
        <div
          class="h-full bg-white px-4 py-6 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out"
        >
          <div class="d-flex items-center mb-1">
            <div class="option__icon">
              <PhUser :size="16" color="var(--primary-blue)" weight="fill" />
            </div>
            <div
              style="font-size: 16px"
              class="font-bold text-slate-800 ml-2 user-select-none"
            >
              {{ step.title }}
            </div>
          </div>
          <div class="text-sm user-select-none">
            {{ step.text }}
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
          {{ text.label.title }}
        </div>
        <div class="text-xs">
          {{ text.label.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.option__icon {
  padding: 4px;
  background: var(--primary-blue-transparent);
  border-radius: 50%;
}
</style>
