<script setup lang="ts">
import ButtonStep from "@/shared/components/DumbComponents/ButtonStep.vue";
import { defineEmits, defineProps } from "vue";
import { IOptsSelectedPlan, IPlan } from "./lead.inferfaces";
// import { services } from "./services";
import LangJson from "./lang.json";
const text = reactive(LangJson.calculator);


const services = JSON.parse(window.localStorage.getItem('dataTools') || '[]')

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

onMounted(() => {
  emit("setActivePanel", 2);
});

const isUpgradePlanDialogVisible = ref(false);

const optionsSelected: IOptsSelectedPlan = reactive({
  planTag: null,
  costKey: null,
  newPlanTag: null,
  isAnnualPlan: false,
});

const openService = (planTag: string) => {
  const currentPlan = dataForm.plans.find((item: any) => item.tag == planTag);
  if (currentPlan) {
    optionsSelected.planTag = currentPlan.tag;
    optionsSelected.costKey = currentPlan.costKey;
    optionsSelected.isAnnualPlan = currentPlan.isAnnualPlan;
  } else {
    optionsSelected.planTag = null;
    optionsSelected.costKey = null;
    optionsSelected.isAnnualPlan = false;
  }
  optionsSelected.newPlanTag = planTag;
  isUpgradePlanDialogVisible.value = true;
};

const handleSelectedPlan = (planSelected: IPlan) => {
  // console.log('plan', { planSelected })
  const index = dataForm.plans.findIndex(
    (item: any) => item.tag == planSelected.tag
  );
  if (index === -1) {
    dataForm.plans.push(planSelected);
  } else {
    dataForm.plans.splice(index, 1, planSelected);
  }
};

const handleCancelPlan = (planTag: string) => {
  const index = dataForm.plans.findIndex((item: any) => item.tag == planTag);
  if (index === -1) return;
  dataForm.plans.splice(index, 1);
};

const isValid = computed(() => {
  errors.value = [];
  return dataForm.plans.length > 0;
});

onMounted(() => {
  updateLastStep(3);
});

const errors = ref([]);
function showErrors() {
  errors.value = [];
  if(!dataForm.plans.length) {
    errors.value.push('Seleccione por lo menos 1 plan')
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <ButtonStep outline @click="show(3)" />
      <ButtonStep
        typeArrow="right"
        :is-disabled="!isValid"
        @click="isValid ? show(6) : showErrors()"
      />
    </div>
    <VDivider class="mt-8 mb-4 d-block" />
    <h1 class="text-3xl text-slate-800 font-bold mb-2">
      {{ text.title }}
    </h1>
    <p class="mb-10">
      {{ text.text }}
    </p>
    
    <VCol cols="12" xs="12" sm="12" v-if="errors.length">
      <ul class="text-error text-sm-caption">
        <li v-for="error in errors" class="text-error">{{ error }}</li>
      </ul>
    </VCol>
    <div class="mb-8">
      <div class="plans">
        <div
          v-for="(plan, index) in services"
          :key="index"
          class="plan"
          @click="openService(plan.tag)"
        >
          <div
            class="description"
            :class="
              dataForm.plans.find((item) => item.tag == plan.tag)
                ? 'active'
                : ''
            "
          >
            <div class="flex items-center">
              <div>
                <img width="34" :src="plan.image" />
              </div>
              <div class="ml-2">
                <h2 class="tool-title">
                  {{ plan.title }}
                </h2>
                <h3 class="is-dark-grey subtitle">
                  {{ plan.subtitle }}
                </h3>
              </div>
            </div>
            <div>
              <p class="mt-2">
                {{ plan.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <AccountUpgradePlan
      v-model:isDialogVisible="isUpgradePlanDialogVisible"
      @upgradePlan="handleSelectedPlan"
      @cancelPlan="handleCancelPlan"
      :opts-selected="optionsSelected"
      text-only
    />
  </div>
</template>

<style lang="scss" scoped>
.plans {
  position: sticky;
  width: 100%;
  max-width: 100%;
  margin-right: 60px;
  border-radius: 6px;
  flex-direction: column;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 10px;

  $layout-breakpoint-small: 768px;

  @media (max-width: $layout-breakpoint-small) {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  h3 {
    font-weight: 600;
    color: var(--plan-heading-color);
  }
  
  .tool-title{
    text-transform: uppercase;
    font-weight: bold;
    color: #000000;
  }

  .subtitle {
    margin-top: -6px;
    text-transform: uppercase;
    font-size: 12px;
    color: #6d6d77;
  }

  p {
    font-size: 0.95rem;
    font-family: var(--font);
    color: var(--light-text);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .plan {
    padding: 10px;
    border: 2px solid;
    border-color: #fff;
    border-radius: 10px;
    cursor: pointer;

    &:has(.description.active) {
      border-color: hsl(236 100% 50%);
    }
    &:hover {
      border-color: hsl(236 100% 50%);
    }
  }
}
</style>
