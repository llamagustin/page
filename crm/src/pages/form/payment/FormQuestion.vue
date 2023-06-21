<script setup lang="ts">
import ButtonStep from "@/shared/components/DumbComponents/ButtonStep.vue";
import { defineEmits, defineProps } from "vue";
import { question } from "./question.js";

interface Emits {
  (e: "setActivePanel", indexPanel: number): void;
}

interface Props {
  dataForm: any;
  questionsAnswered: number;
  updateLastStep: (step: number) => void;
  clearCreditCard: () => void;
  show: (step: number) => void;
}

const { updateLastStep, show, clearCreditCard, dataForm } = defineProps<Props>();
const emit = defineEmits<Emits>();

onMounted(() => {
  updateLastStep(5);
  clearCreditCard();
  emit("setActivePanel", 3);
});


const showQuestion = ref([
  true,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false
]);

//
const isValid = ref(false);

const prevQuestion = () => {
  let index = showQuestion.value.indexOf(true);
  if (index === 0) {
    show(5);
    return;
  }
  showQuestion.value[index] = false;
  showQuestion.value[index - 1] = true;
};

const nextQuestion = () => {
  let index = showQuestion.value.indexOf(true);
  let indexIncrement = index + 1;

  showQuestion.value[index] = false;
  showQuestion.value[indexIncrement] = true;

  if (indexIncrement >= 13) {
    isValid.value = true;
  }
};

const showAlert = ref(false);

function showAlertTimeOut() {
  showAlert.value = true;
  
  //answer all questions
  var key = Object.keys(dataForm.question)
  
  for(var i = 0;i<key.length;i++){
    if(!dataForm.question[key[i]]){
      for(var j = 0;j<showQuestion.value.length;j++) showQuestion.value[j] = false
      
      showQuestion.value[i] = true
      break;
    }
  }
  
  setTimeout(() => {
    showAlert.value = false;
  }, 7000);
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <ButtonStep outline type-arrow="left" @click="prevQuestion()" />
      <ButtonStep
        type-arrow="right"
        @click="
          !isValid
            ? nextQuestion()
            : (questionsAnswered == 13 && Object.keys(dataForm.signature).length)
            ? show(8)
            : showAlertTimeOut()
        "
      />
    </div>
    <VDivider class="mt-8 mb-4 d-block" />
    <div class="text-caption">
      Respondidas {{ questionsAnswered }} de {{ question.length }}
    </div>
    <VAlert
      v-if="showAlert"
      class="mb-4"
      style="background-color: var(--primary-blue); color: white"
    >
      <span class="text-lg" style="line-height: 1">&times;</span> 
      Todas las preguntas deben ser contestadas. Contestelas
    </VAlert>
    <div v-if="!isValid" v-for="(data, indexQuestion) in question" :key="indexQuestion" >
      <div v-if="showQuestion[indexQuestion]">
        <p class="mb-10 text-slate-800 font-bold">
          <span style="font-size: 20px">
            {{ data.text }}
          </span>
        </p>
        <!-- <h1 class="text-3xl text-slate-800 font-bold mb-2">
          {{ data.title }}
        </h1> -->
        <div class="space-y-3 sm:space-y-2 mb-4">
          <label
            v-for="(q, index) in data.step"
            class="relative block cursor-pointer"
            :key="index"
            @dblclick="nextQuestion"
          >
            <input
              v-model="dataForm.question[indexQuestion + 1]"
              type="radio"
              name="radio-buttons"
              :value="q.value"
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
                  style="font-size: 17px"
                  class="ml-1 font-medium text-slate-800"
                >
                  {{ q.title }}
                </div>
              </div>
              <div v-if="indexQuestion==0" class="text-sm">
                {{ q.text }} 
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
    
    <div v-if="isValid">
      <div :style="{ marginTop: '3%' }">
        <div class="text-center">
          <!--<template v-if="formSubmitted">-->
            <svg
              class="inline-flex w-16 h-16 fill-current mb-6"
              viewBox="0 0 64 64"
            >
              <circle class="text-indigo-100" cx="32" cy="32" r="32" />
              <path class="text-indigo-500" d="m28.5 41-8-8 3-3 5 5 12-12 3 3z" />
            </svg>
            <h1 class="text-3xl text-slate-800 font-bold mb-8">
              Firme la solicitud
              
              <!--{{ text.title }}-->
            </h1>
            <p class="mb-5" >
              Para finalizar con el proceso termine de rellenar el documento.  
            </p>

        </div>
      </div>
    </div>
    
    <!-- <div class="flex items-center justify-between space-x-6 mb-8">
      <div>
        <div class="font-medium text-slate-800 text-sm mb-1">
          {{ text.label }}
        </div>
      </div>
    </div> -->
  </div>
</template>
