<script setup lang="ts">
import ButtonStep from "@/shared/components/DumbComponents/ButtonStep.vue";
import { defineProps } from "vue";
import { textForm07 } from "./text.js";
import FormQuestions from "./FormQuestions.vue";
import { useRouter } from "vue-router";
//const { showQuestions } = useResellerStore();
import { useResellerStore } from "./useResellerStore";

const store = useResellerStore();
const router = useRouter();

interface Props {
  show: any;
}

const { show } = defineProps<Props>();
const text = textForm07;


//-----------------------------

const data = ref({
  form: [
    true, // name, appellido, country, address
    false, // form location
    false, // pregutnas triple
    false, // preguntas doble
    false, // cif, mcc, company, trabajadores ¿no lo se?, condition
    false, //services
    false, //end
  ],
  num: [
    "bg-indigo-500 text-white",
    "bg-slate-100 text-slate-500",
    "bg-slate-100 text-slate-500",
    "bg-slate-100 text-slate-500",
    "bg-slate-100 text-slate-500",
    "bg-slate-100 text-slate-500",
    "bg-slate-100 text-slate-500",
  ],
});

const dataForm = reactive({
  fullName: "",
  address_country: "España",
  address_province: "",
  address_city: "",
  address_zip: "",
  address_line: "",
  address_latitude: "",
  address_longitude: "",
  company: "",
  nif: "",
  phone: "",
  email: "",
  web: "",
  category: "",
  employeers: 0,
  //kit digital
  contact: [],
  oauth: [],
  username: "",
  plan: "",
  status: "",
  budget: "",
  plans: [],

  subvencion: "",

  question: {
    1: null,
    2: null,
    3: null,
  },

  /**************************
  Card Information
  **************************/
  card_number: "",
  card_name: "",
  card_expiration: "",
  card_cvc: "",

  nameProvince: "",
  nameCity: "",

  dateCite: "",
});

const panelActive = ref(0);
function setActivePanel(indexPanel: number) {
  panelActive.value = indexPanel;
}

const lastStep = ref(1);
function updateLastStep(step: number) {
  if (lastStep.value > step) return;
  lastStep.value = step;
}

function clearCreditCard() {
  dataForm.card_number = "";
  dataForm.card_name = "";
  dataForm.card_expiration = "";
  dataForm.card_cvc = "";
}

const questionsAnswered = computed(() => {
  const questions = Object.entries(dataForm.question)
    .map((item) => item[1])
    .filter((item) => item);
  return questions.length;
});

const goToAcademy = () => {
  // router.push({
  //   path: "/form/academy",
  // });
  location.href = '/form/academy'
}

//-------------------------------------------------------
</script>

<template>
  <div class="bg-white">
    <!-- MOUNT THE COMPONENT HERE! -->
      <!--v-if="data.form[4]"-->
    <!--<FormQuestions-->
    <!--  v-if="!store.showQuestions"-->
    <!--  :data-form="dataForm"-->
    <!--  :show="show"-->
    <!--  @setActivePanel="setActivePanel"-->
    <!--  :updateLastStep="updateLastStep"-->
    <!--  :clear-credit-card="clearCreditCard"-->
    <!--  :questions-answered="questionsAnswered"-->
    <!--  @hide-paragraph="hideParagraph"-->
    <!--/>-->
    
    <!--<div class="text-center" v-if="store.showQuestions">-->
    <div class="text-center">
      <svg class="inline-flex w-16 h-16 fill-current mb-6" viewBox="0 0 64 64">
        <circle class="text-indigo-100" cx="32" cy="32" r="32" />
        <path class="text-indigo-500" d="m28.5 41-8-8 3-3 5 5 12-12 3 3z" />
      </svg>
      <div class="text-lg mb-6">
        {{ text.text }}
      </div>
      <h1 class="text-3xl text-slate-800 font-bold mb-8">
        {{ text.title }}
      </h1>
      <!--@click="submit"-->
      <ButtonStep typeArrow="right" other-text hiddenArrow @click="goToAcademy">
        Comenzar Test
      </ButtonStep>
    </div>
    <!--</div>-->
    
  </div>
</template>

<style lang="scss" scoped>
.btn {
  width: 50%;
  margin: auto;
}
</style>
