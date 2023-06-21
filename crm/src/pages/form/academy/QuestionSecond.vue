<script setup lang="ts">
import {storeToRefs } from 'pinia';
import ButtonStep from "@/shared/components/DumbComponents/ButtonStep.vue";
import ListEvents from "./webinar.json";
import { defineEmits, defineProps } from "vue";
import listQuestion from "./QuestionSecond.json";
import { useAcademyStore } from "./useAcademyStore";

const store = useAcademyStore()
const {Questions, events} =storeToRefs(store)

const quantityQuestions = listQuestion.length;

interface Props {
  dataForm: any;
  updateLastStep: (step: number) => void;
  show: (step: number) => void;
  updatePanel: (step: number) => void;
}

const { updateLastStep, show } = defineProps<Props>();

onMounted(() => {
  updateLastStep(2);
  store.updatePanel(1)
});

const showQuestion = ref([true,false,false,false,false,false,false,false,false,]);

const isValid = ref(false);

const prevStep = 1;
const prevQuestion = () => {
  let index = showQuestion.value.indexOf(true);
  if (index === 0) {
    show(prevStep);
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
  
  const questionLastIndex = quantityQuestions - 2;
  if (indexIncrement > questionLastIndex) {
    isValid.value = true;
  }
};

const showAlert = ref(false);

let timer;
function showAlertTimeOut() {
  clearTimeout(timer)
  showAlert.value = true;
  timer = setTimeout(() => {
    showAlert.value = false;
  }, 6000);
}

const completedAnswers = computed(() => {
  const answers = Object.values(Questions.value.secondEvent).filter(item => item)
  return answers.length
})

const doTest=ref(false)

const indexQ=ref(0)

const hasAnswer = computed(()=>{
  let index =  'answer'+  (indexQ.value+1)
  
  return !!Questions.value.secondEvent[index]
})

watch(showQuestion.value,val=>{
  indexQ.value = val.indexOf(true)
})

const onSave= async ()=>{
 await store.updateAccount(Questions.value)
 events.value.reseller.status=3;
}

const onClick = ()=>{
  if(!isValid.value)
     nextQuestion()
   else if(completedAnswers.value==quantityQuestions) {
     events.value.reseller.status=2
     Questions.value.webinars.reseller.completed=true
  } else {
    showAlertTimeOut()
  }
}

</script>

<template>
  <div>
    <div v-if="events.reseller.enabled && events.reseller.status==0">
      <h1 class="text-h4 my-4">Aprovecha las oportunidades con el <b>Programa Reseller</b> de aythen</h1>
 
      <video width="576" src="/src/assets/video/webinar/reseller.mp4" controls ></video>
      
      <div class="mt-2">
        He completado el webinar continuare realizando el cuestionario, 
        <VBtn class="mt-5" @click="events.reseller.status=1"  >Realizar cuestionario!</VBtn>
      </div>
      
      <div>
       <p style="text-align:justify" class="mt-5">¡Hola de nuevo! Bienvenido/a al segundo webinar de aythen, donde te vamos a presentar nuestro programa Reseller.</p>
       <p style="text-align:justify" class="mt-5">El programa Reseller de aythen está diseñado para aquellas personas o empresas que desean ofrecer nuestras ayudas de la Unión Europea a sus clientes. Al convertirte en un Reseller de aythen, podrás ofrecer nuestros servicios a tus clientes y recibir una comisión por cada venta que realices.</p>
      </div>
    </div>
    
    <div v-if="!events.reseller.enabled">
      <h1 class="text-h4 mt-5">¡Únete a Aythen Academy!</h1>
      <h5 class="text-subtitle-2 mb-8">Descubre el camino hacia el éxito profesional</h5>
      <div class="mt-8">
        <VAlert color="error"  icon="$info" title="Aythen Academy"
              text="El webinar no esta disponible, estara disponible en la fecha establecida."></VAlert>
      </div>
      <p class="mt-8 text-justify" >¡Únete a nosotros en Aythen Academy! Estamos emocionados de ayudarte a descubrir el mejor camino para tu éxito profesional. Nuestro webinar se está preparando para la fecha establecida, así que ¡resérvala ya! Esperamos contar contigo para compartir conocimientos y experiencias especiales. ¡Te esperamos! </p>
    </div>
    
    <div v-if="events.reseller.status==1" >
      <p class="align-center d-flex justify-between mb-0 text-end">
        <strong class="text-grey">{{ ListEvents[1].title }}</strong>
        <strong class="text-caption">Respondidas {{ completedAnswers }} de {{ quantityQuestions }}</strong>
      </p>
      <VDivider class="my-4 d-block" />
      <VAlert
        v-if="showAlert"
        class="mb-4 text-white"
        style="background-color: var(--primary-blue)"
      >
        <span class="text-lg" style="line-height: 1">&times;</span>
        Todas las preguntas deben ser contestadas. Contestelas
      </VAlert>
      <div v-for="(data, indexQuestion) in listQuestion" :key="indexQuestion"
        @dblclick="onClick">
        <div v-if="showQuestion[indexQuestion]">
          <p class="mb-8 text-slate-800 font-bold">
            <span style="font-size: 20px">
              {{ data.text }}
            </span>
          </p>
          <div class="space-y-3 sm:space-y-2 mb-4">
            <label
              v-for="(q, index) in data.step"
              class="relative block cursor-pointer"
              :key="index"
            >
              <input
                v-model="Questions.secondEvent[`answer${indexQuestion+1}`]"
                type="radio"
                name="radio-buttons"
                :value="q.title"
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
                  <div style="font-size: 17px" class="ml-1 font-medium text-slate-800">
                    {{ q.title }}
                  </div>
                </div>
                <div class="text-sm"> {{ q.text }} </div>
              </div>
              <div class="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 rounded pointer-events-none"
                aria-hidden="true"
              ></div>
            </label>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <ButtonStep outline type-arrow="left" @click="prevQuestion()" />
        <ButtonStep :isDisabled="!hasAnswer" type-arrow="right" @click="onClick" />
      </div>
    </div>
    
    <div v-if="events.reseller.status==2" >
      <h1 class="text-h4 mt-5">¡Muchas gracias por haber participado en este segundo webinar de aythen!</h1>
      
      <div class="mt-5">
        <VBtn @click="onSave" color="primary" size="large" >Enviar respuestas</VBtn>
      </div>
      <p class="mt-8" >Esperamos que hayas encontrado útil la información que te hemos brindado sobre nuestro programa Reseller y que te animes a formar parte de él para aprovechar todas las oportunidades que ofrece.</p>
      <p class="mt-5">En aythen estamos comprometidos en ayudar a personas y empresas a acceder a financiamientos de la Unión Europea y a conseguir sus objetivos. Y nuestro programa Reseller es una excelente opción para aquellos que deseen ofrecer estos servicios a sus propios clientes y ganar una comisión por ello.</p>
      <p class="mt-5">Si tienes alguna pregunta adicional sobre el programa Reseller o sobre nuestros servicios en general, no dudes en contactarnos. ¡Estamos a tu disposición para ayudarte!</p>
    </div>
    
    <div v-if="events.reseller.status==3">
      <p class="mt-5 text-justify text-h5">
        ¡Gracias por haber participado en nuestro segundo webinar <b> Programa Reseller </b>  de aythen! 
      </p>
      <div class="mt-5">
        <VBtn @click="show(3)" color="primary" size="large" >Siguiente Webinar!</VBtn>
      </div>
      <p class="mt-5 text-justify">Queremos agradecerte por haber participado en nuestro webinar sobre el Programa Reseller. Esperamos que hayas encontrado la presentación informativa e interesante, y que hayas aprendido más sobre cómo convertirte en un Reseller de aythen y ofrecer nuestros servicios a tus clientes.</p>
      <p class="mt-5 text-justify">Te agradecemos por tomarte el tiempo de completar nuestro cuestionario y compartir tus comentarios y sugerencias con nosotros. Nos aseguraremos de tomar en cuenta tus respuestas para hacer nuestros webinars aún más útiles y efectivos para ti y otros asistentes en el futuro.</p>
    </div>
  </div>
</template>
