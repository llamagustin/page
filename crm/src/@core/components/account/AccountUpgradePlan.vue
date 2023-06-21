<script setup lang="ts">

import { IOptsSelectedPlan } from "@/pages/form/lead/lead.inferfaces";
import { PhCheckCircle, PhCurrencyEur } from "phosphor-vue";
import { defineEmits, defineProps } from "vue";
// €
interface Emit {
  (e: "update:isDialogVisible", val: boolean): void;
  (e: "upgradePlan", val: any): void;
  (e: "cancelPlan", planTag: string): void;
}

interface Prop {
  isReseller?: boolean;
  isDialogVisible?: boolean;
  optsSelected?: IOptsSelectedPlan;
  textOnly?: boolean;
}

const props = defineProps<Prop>();
const emit = defineEmits<Emit>();
const selectedPlan = ref(props.optsSelected.newPlanTag);
const selectedCategoria = ref("starter");
const selectPlan = ref();

interface ITextCard {
  buttonCancelText: string;
  buttonConfirmText: string;
  title: string;
}

const tools = ref(JSON.parse(localStorage.dataTools || '[]'))

const cardAction = computed(() => {
  let textCard: ITextCard = {
    buttonCancelText: "Cancel",
    buttonConfirmText: "Aceptar",
    title: "Upgrade",
  };
  if (props.optsSelected?.planTag) {
    textCard.title = "Upgrade";
    textCard.buttonConfirmText = "Aceptar";
    textCard.buttonCancelText = "Cancel";
  }
  return textCard;
});

let plansList = [];
if (props.isReseller) {
  plansList = tools.value
    .filter((s: any) => s.tag == "crm")
    .map((s: any) => ({
      text: s.subtitle,
      value: s.tag,
    }));
  selectPlan.value = "crm";
} else {
  plansList = tools.value.map((s: any) => ({
    text: s.subtitle,
    value: s.tag,
  }));
}


let numUser = {
  'starter': '1 - 4 usuarios',
  'profesional': '5 - 9 usuarios',
  'startup': '+10 usuarios',
}

let costs = computed(() => {
  let rs = [];
  let sel = selectedPlan.value;
  if(selectedPlan.value) {
    let servicio = tools.value.filter((s) => s.tag == sel)[0];
    selectPlan.value = servicio;
    selectedCategoria.value = "starter";
    for (const key of Object.keys(servicio.cost)) {
      let costo = servicio.cost[key];
      rs.push({ text: `${key.toUpperCase()} (${numUser[key]})`, value: key });
      // rs.push({ text: `${key.toUpperCase()}  -  ${costo}.00 €`, value: key });
    }
  }
  return rs;
});

watch(() => props.optsSelected?.planTag, (newValue) => {
  if (props?.optsSelected?.planTag) {
    selectedPlan.value = props?.optsSelected?.planTag;
    setTimeout(function () {  
      if (props?.optsSelected?.costKey) {
        selectedCategoria.value = props?.optsSelected?.costKey;
      }
    }, 100);
  } else {
    if (props?.optsSelected?.newPlanTag) {
      selectedPlan.value = props?.optsSelected?.newPlanTag;
    }
    selectedCategoria.value = "starter";
  }
});


watch(() => props.optsSelected?.newPlanTag, (newPlanTag) => {
  if (props?.optsSelected?.newPlanTag) {
    selectedPlan.value = props?.optsSelected?.newPlanTag;
  }
  selectedCategoria.value = "starter";
});


const upgradePlan = () => {
  
  let dato = {
    tag: selectedPlan.value,
    plan: selectedPlan.value,
    costoBase: selectPlan.value.cost[selectedCategoria.value],
    tipo: selectedCategoria.value,
    costo: setPricePlan(selectPlan.value.cost[selectedCategoria.value]),
    isAnnualPlan: props.optsSelected.isAnnualPlan,
    costKey: selectedCategoria.value,
    createdAt: new Date().toISOString(),
  };
  emit("upgradePlan", dato);
  emit("update:isDialogVisible", false);
};

const dialogModelValueUpdate = (isDeletePlan: boolean) => {
  emit("update:isDialogVisible", false);
  if (!isDeletePlan) return;
  emit("cancelPlan", selectPlan.value.tag);
};

const currentPrice = computed(() => {
  let price = 0;
  console.log('price', selectPlan.value.cost[selectedCategoria.value])
  price = setPricePlan(selectPlan.value.cost[selectedCategoria.value] || 0);
  return price;
});

function setPricePlan(price) {
  let currPrice = Number(price);
  
  if(!props.optsSelected.isAnnualPlan) {
    currPrice = currPrice / 12 * 1.1
  } else {
    currPrice = currPrice / 12
      // currPrice = currPrice - ( currPrice * 0.1)
      // currPrice = currPrice - ( currPrice * 0.1)
  }
      
  // return Math.ceil( currPrice * 1.21 )
  return Math.ceil( currPrice )
}	

const allFeatures = computed(() => {
  let lasts = []
  let firsts = []
  let list = selectPlan.value.allBenefits;
  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    if(element[selectedCategoria.value] == 'NO') {
      lasts.push(element)
    } else {
      firsts.push(element)
    }
  }
  
  return [...firsts, ...lasts]
})

</script>

<template>
  <!-- 👉 upgrade plan -->
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 560"
    :model-value="props.isDialogVisible"
    @update:model-value="dialogModelValueUpdate"
    persistent
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="dialogModelValueUpdate(false)" />

    <VCard class="py-5">
      <!--<VCardItem class="text-center">-->
        <!--<VCardTitle-->
        <!--  class="text-h6 text-lg-h4 text-grey-700"-->
        <!--  style="line-height: 1.3"-->
        <!-- > -->
        <!--</VCardTitle>-->
      <!--</VCardItem>-->
      <VCardText>
        <h5 class="font-weight-bold text-grey-600 text-lg mb-2">
          <figure class="d-inline-block" :style="{position: 'relative', top: '6px'}">
            <img :src="selectPlan?.image" class="mr-2" width="30" alt="Preview" /> 
          </figure>
          {{ selectPlan?.subtitle }}
        </h5>
        <p class="text-caption aythen-text-sm">
          {{ selectPlan?.resume }}
        </p>
        <p v-if="!textOnly">Choose the best plan for user.</p>
      </VCardText>
      <div>
        
      </div>
      <VCardText class="">
        <VRow>
          <VCol cols="12" sm="12" md="8">
            <VSelect
              v-if="!Boolean(textOnly)"
              :readonly="Boolean(textOnly)"
              v-model="selectedPlan"
              label="Choose Plan"
              :items="plansList"
              item-title="text"
              item-value="value"
              density="compact"
              class="ma-3"
            />
            <VSelect
              v-model="selectedCategoria"
              label="Categoria"
              :items="costs"
              item-title="text"
              item-value="value"
              density="compact"
              class=" -mb-10"
            />
          </VCol>
          <VCol cols="12" sm="12" md="4">
          <div class="switchPlan">
            <label 
              class="text-caption text-center"
              :class="{'text-success': !optsSelected.isAnnualPlan}"
            >
              Plan <br> mensual
            </label>
            <VSwitch
              color="success"
              v-model="optsSelected.isAnnualPlan"
            />
            <label 
              class="text-caption text-center"
              :class="{'text-success': optsSelected.isAnnualPlan}"
            >
              Plan <br> anual
            </label>
          </div>
        </VCol>
        </VRow>
      </VCardText>
      <VCardText v-if="selectPlan?.allBenefits && Object.keys(selectPlan)">
        <!-- OLD CARD -->
        <!--<VRow>-->
        <!--  <VCol v-for="(value, key) in selectPlan.benefits" :key="key">-->
        <!--    <div-->
        <!--      class="card__styled"-->
        <!--      :class="{ active: `${key}` == selectedCategoria }"-->
        <!--    >-->
        <!--      <p class="text-uppercase text-center font-bold">{{ key }}</p>-->
        <!--      <p-->
        <!--        v-if="`${key}` == 'startup'"-->
        <!--        class="text-sm-caption text-center text-primary-blue"-->
        <!--        style="line-height: 1"-->
        <!--      >-->
        <!--        Recomendado-->
        <!--      </p>-->
        <!--      <VDivider class="mt-1 mb-3" />-->
        <!--      <ul class="text-sm-caption">-->
        <!--        <li-->
        <!--          v-for="(item, keyList) in value"-->
        <!--          :key="keyList"-->
        <!--          class="d-flex mb-2 gap-1"-->
        <!--        >-->
        <!--          <PhCheckCircle color="var(--primary-blue)" />-->
        <!--          <span style="line-height: 1">{{ item.content }}</span>-->
        <!--        </li>-->
        <!--      </ul>-->
        <!--    </div>-->
        <!--  </VCol>-->
        <!--</VRow>-->
        
        <VRow>
          
          <VCol cols="12">
            <div class="aythen-grid">
              <div v-for="(value, key) in selectPlan.features" :key="key" class="text-sm-caption option-card">
                <PhCheckCircle color="var(--primary-blue)" weight="fill" size="17"/>
                <span>{{ value.content }}</span>
              </div>
              <div v-for="(value, key) in allFeatures" :key="key" class="text-sm-caption option-card">
                  <PhCheckCircle 
                    :color="
                      value[selectedCategoria] == 'NO'
                        ? 'grey'
                        : 'var(--primary-blue)'
                    "
                    size="17"
                    weight="fill"
                  />
                 <span v-if="value[selectedCategoria] == 'SI' || value[selectedCategoria] == 'NO'">{{ value.content }}</span>
                 <span v-else>{{ value[selectedCategoria] }}</span>
              </div>
            </div>
          </VCol>
          <!--selectedCategoria-->
          <!--<VCol cols="12" md="6"></VCol>-->
        </VRow>
      </VCardText>
      <VDivider class="my-3" />
      <VCardText>
        <!-- <p class="font-weight-medium mb-2">
          El plan actual del usuario es el plan "estándar"
        </p> -->
        <VRow class="align-baseline">
          <VCol>
            <div class="align-center d-flex gap-1">
              <span>
                <PhCurrencyEur color="var(--primary-blue)" />
                <!-- <sup class="text-primary">€</sup> -->
              </span>
              <h3 class="text-h3 font-weight-semibold text-primary-blue">
                {{ currentPrice }}
              </h3>
              <sub class="text-body-1">/ {{ optsSelected.isAnnualPlan ? 'Anual' : 'Mensual' }}</sub>
            </div>
          </VCol>
          <VCol class="text-right">
            <div class="align-center d-flex gap-1">
              <VBtn
                color="#ff0000"
                class="text-white text-button mb-2"
                @click="dialogModelValueUpdate(true)"
              >
                {{ cardAction.buttonCancelText }}
              </VBtn>
              <VBtn
                class="text-white ms-3 text-button mb-2"
                @click="upgradePlan"
                color="var(--primary-blue)"
              >
                {{ cardAction.buttonConfirmText }}
              </VBtn>
            </div>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style lang="scss" scoped>
.card__styled {
  position: relative;
  padding: 0.5em;
  border: 1px solid lightgray;
  border-radius: 0.6em;
  block-size: 100%;

  &.active {
    border-color: transparent;
    box-shadow: 0 0 4px blue;
  }
}

.text-recommended {
  position: absolute;
  display: block;
  border-radius: 50px;
  background: white;
  box-shadow: 0 0 4px;
  inset-block-start: -1em;
  inset-inline: 1em;
  line-height: 1;
  padding-block: 5px;
  padding-inline: 10px;
}

.option-card {
  display: flex !important;
  align-items: center !important;
  gap: 0.5em !important;
  font-size: 1em !important;
}

.switchPlan {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1em;
  font-size: .9em;
  & > label {
    line-height: 1;
  }
}

.aythen-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: row;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    font-size: 15px;
  }
}



</style>
