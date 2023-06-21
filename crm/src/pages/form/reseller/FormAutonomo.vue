<script setup lang="ts">
import ButtonStep from "@/shared/components/DumbComponents/ButtonStep.vue";
import { defineProps } from "vue";
import { textForm03 } from "./text.js";
import { useResellerStore } from "./useResellerStore";

interface Props {
  show: (step: number) => void;
}
const { show } = defineProps<Props>();

const text = textForm03;
const steps = reactive(textForm03.step);

const store = useResellerStore();

function handleGoToStep(nextStep: number) {
  let fieldToEvaludate = store.guest.typeSelfEmployed;
  if (!fieldToEvaludate) {
    showErrors()
    return
  };
  store.lastStep = nextStep;
  show(nextStep);
}

// SHOW ERRORS FORM FIELD
const errors = ref({});
function showErrors() {
  if(!store.guest.typeSelfEmployed) {
    errors.value.typeSelfEmployed = 'Seleccione 1 opción'
  }
}
watch(() => store.guest, () => {
  errors.value = {}
}, { deep: true })
</script>

<template>
  <div>
    <VRow justify="end">
      <VCol cols="12" class="text-right" sm="12">
        <ButtonStep
          type-arrow="right"
          :is-disabled="Boolean(!store.guest.typeSelfEmployed)"
          @click="handleGoToStep(2)"
        />
      </VCol>
    </VRow>
    <VDivider class="mt-8 mb-4 d-block" />
    <h1 class="text-3xl text-slate-800 font-bold mb-6">
      {{ text.title }}
    </h1>
    
    <div class="list__options">
      <em v-if="errors.typeSelfEmployed" class="d-block text-error text-sm-caption mb-2">
        {{ errors.typeSelfEmployed }}
      </em>
      <div class="option" v-for="(step, index) in steps" :key="index">
        <label class="flex-1 relative block cursor-pointer">
          <input
            v-model="store.guest.typeSelfEmployed"
            type="radio"
            name="self-employed"
            :value="step.value"
            class="peer sr-only"
          />
          <div
            class="h-full bg-white px-3 py-4 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out"
          >
            <div class="d-flex items-center mb-1">
              <div class="option__icon">
                <component
                  :is="step.icon"
                  :size="18"
                  color="var(--primary-blue)"
                ></component>
              </div>
              <div class="font-bold text-slate-800 ml-2 user-select-none">
                {{ step.title }}
              </div>
            </div>
            <div class="text-sm user-select-none">{{ step.text }}</div>
          </div>
          <div
            class="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 rounded pointer-events-none"
            aria-hidden="true"
          ></div>
        </label>
      </div>
    </div>
    <div class="flex items-center justify-between space-x-6 mb-8">
      <div>
        <div class="font-medium text-slate-800 text-sm mb-1">
          {{ text.label.title }}
        </div>
        <div class="text-xs">{{ text.label.text }}</div>
      </div>
    </div>
    <!--<div class="flex items-center justify-end">-->
    <!--</div>-->
  </div>
</template>

<style lang="scss">
.list__options {
  & > .option {
    margin-block-end: 12px;
    &:last-child {
      margin-block-end: 32px;
    }
    .option__icon {
      padding: 4px;
      background: var(--primary-blue-transparent);
      border-radius: 50%;
    }
  }
}
// .color-blue {
//   color: blue;
// }
// .maybe-icon-bg {
//   color: rgb(255 165 0 / 15%);
// }
// .maybe-icon-person {
//   color: rgb(255 165 0 / 50%);
// }
// .maybe-icon-serson {
//   color: rgb(255 165 0 / 75%);
// }
// .maybe-icon-fperson {
//   color: rgb(255 165 0);
// }

// .no-icon {
//   color: rgb(245 25 25 / 15%);
// }
// .no-icon-person {
//   color: rgb(245 25 25 / 50%);
// }

// .no-icon-sperson {
//   color: rgb(245 25 25/75%);
// }
// .no-icon-fperson {
//   color: rgb(245 25 25);
// }
</style>
