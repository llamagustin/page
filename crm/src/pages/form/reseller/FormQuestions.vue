<script setup lang="ts">
import ButtonStep from "@/shared/components/DumbComponents/ButtonStep.vue";
import { defineEmits, defineProps } from "vue";
import { question } from "./question.js";
import { useResellerStore } from "./useResellerStore";
const store = useResellerStore();

interface Emits {
  (e: "setActivePanel", indexPanel: number): void;
  (e: "hideParagraph", statusParagraph: boolean): void;
}

interface Props {
  dataForm: any;
  questionsAnswered: number;
  updateLastStep: (step: number) => void;
  clearCreditCard: () => void;
  show: (step: number) => void;
}

const { updateLastStep, show, clearCreditCard, showTextParagraph } = defineProps<Props>();
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
  // false,
  // false,
  // false,
  // false,
  // false,
  // false,
]);

//
const isValid = ref(false);

const prevQuestion = () => {
  let index = showQuestion.value.indexOf(true);
  if (index === 0) {
    show(4);
    emit("hideParagraph", false);
    return;
  }
  showQuestion.value[index] = false;
  showQuestion.value[index - 1] = true;
  emit("hideParagraph", false);
};

const nextQuestion = () => {
  let index = showQuestion.value.indexOf(true);
  let indexIncrement = index + 1;

  showQuestion.value[index] = false;
  showQuestion.value[indexIncrement] = true;

  if (indexIncrement > 1) {
    isValid.value = true;
  }
};

const showAlert = ref(false);

function showAlertTimeOut() {
  showAlert.value = true;
  setTimeout(() => {
    showAlert.value = false;
  }, 7000);
}

 function finishTry() {
   store.showQuestions = true
   //show(7)
   
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
            : questionsAnswered == 3
              ? finishTry()
              : showAlertTimeOut()
        "
      />
    </div>
    <VDivider class="mt-8 mb-4 d-block" />
    <VAlert
      v-if="showAlert"
      class="mb-4"
      style="background-color: var(--primary-blue); color: white"
    >
      <span class="text-lg" style="line-height: 1">&times;</span> Todas las
      preguntas deben ser contestadas. Contestelas
    </VAlert>
    <div v-for="(data, indexQuestion) in question" :key="indexQuestion">
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
              <div class="text-sm">
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
    <!-- <div class="flex items-center justify-between space-x-6 mb-8">
      <div>
        <div class="font-medium text-slate-800 text-sm mb-1">
          {{ text.label }}
        </div>
      </div>
    </div> -->
  </div>
</template>
