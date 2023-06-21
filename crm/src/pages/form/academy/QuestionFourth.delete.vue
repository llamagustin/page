<script setup lang="ts">
import {storeToRefs } from 'pinia';
import ButtonStep from "@/shared/components/DumbComponents/ButtonStep.vue";
import ListEvents from "./webinar.json";
import { defineEmits, defineProps } from "vue";
import listQuestion from "./QuestionFourth.json";
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

const { updateLastStep, show, updatePanel } = defineProps<Props>();

onMounted(() => {
  updateLastStep(4);
  store.updatePanel(3)
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
]);

const isValid = ref(false);

const prevStep = 3;
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
  const answers = Object.values(Questions.value.fourthEvent).filter(item => item)
  return answers.length
})


const doTest=ref(false)

const indexQ=ref(0)

const hasAnswer = computed(()=>{
  let index =  'answer'+  (indexQ.value+1)
  
  return !!Questions.value.thirdEvent[index]
})

watch(showQuestion.value,val=>{
  indexQ.value = val.indexOf(true)
})


const onClick = ()=>{
  if(!isValid.value)
     nextQuestion()
   else if(completedAnswers.value==quantityQuestions) {
     events.value.crm.status=2
     Questions.value.webinars.crm.completed=true

  } else {
    showAlertTimeOut()
  }
  
}

const onSave= async ()=>{
 await store.updateAccount(Questions.value)
 events.value.crm.status=3;
}

</script>

<template>
  <div>
    
    <div v-if="events.crm.enabled && events.crm.status==0">

    <h1 class="text-h4 my-4">Aprende a maximizar tus <b>Ventas</b> con el CRM de Aythen</h1>

      <!--<video width="576" src="https://reseller.aythen.com/public/videos/Webinar%20A%20+%20KD.mp4" controls ></video>-->
      <div class="mt-4">
        He completado el webinar continuare realizando el cuestionario, 
        <VBtn class="mt-5" @click="events.crm.status=1"  >Realizar cuestionario!</VBtn>
      </div>
      
      <div>
        <p style="text-align:justify" class="mt-5">En nuestro último webinar, nos enfocamos en explicar en detalle nuestro sistema de CRM y cómo funciona nuestra herramienta para convertir mejor los leads y aumentar las ventas.</p>
        <p style="text-align:justify" class="mt-5">Durante el webinar, presentamos cómo nuestro sistema de CRM puede ayudarte a gestionar eficazmente las relaciones con tus clientes y potenciales clientes, para que puedas identificar oportunidades de ventas y cerrar más negocios. También discutimos cómo nuestra herramienta de conversión de leads puede ayudarte a aumentar la tasa de conversión de tus leads en clientes, a través de técnicas efectivas de marketing y automatización.</p>
      </div>
      
    </div>
    
    <div v-if="!events.crm.enabled">
      <h1 class="text-h4 mt-5">¡Únete a Aythen Academy!</h1>
      <h5 class="text-subtitle-2 mb-8">Descubre el camino hacia el éxito profesional</h5>

      <div class="mt-8">
        <VAlert color="error"  icon="$info" title="Aythen Academy"
              text="El webinar no esta disponible, estara disponible en la fecha establecida."></VAlert>
      </div>
      
      <p class="mt-8 text-justify" >¡Únete a nosotros en Aythen Academy! Estamos emocionados de ayudarte a descubrir el mejor camino para tu éxito profesional. Nuestro webinar se está preparando para la fecha establecida, así que ¡resérvala ya! Esperamos contar contigo para compartir conocimientos y experiencias especiales. ¡Te esperamos! </p>
    </div>    
    
    <div v-if="events.crm.status==1">
      <p class="align-center d-flex justify-between mb-0 text-end">
        <strong class="text-grey">{{ ListEvents[2].title }}</strong>
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
      <div v-for="(data, indexQuestion) in listQuestion" :key="indexQuestion" @dblclick="onClick">
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
                v-model="Questions.fourthEvent[`answer${indexQuestion+1}`]"
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
        <ButtonStep
          :isDisabled="!hasAnswer"
          type-arrow="right"
          @click="onClick"
        />
      </div>
    </div>
    <div v-if="events.crm.status==2" >
      <h1 class="text-h5 mt-5">¡Felicitaciones por haber finalizado con éxito nuestro webinar sobre <b>Aprende a maximizar tus Ventas con el CRM</b> de Aythen!"</h1>
      
      <div class="mt-5">
        <VBtn @click="onSave" color="primary" size="large" >Enviar respuestas</VBtn>
      </div>
      
      <p class="mt-8" >Esperamos que hayas disfrutado y aprendido mucho durante nuestra sesión. Nos complace que hayas participado activamente en el cuestionario, lo que demuestra tu compromiso y dedicación para mejorar tus habilidades y conocimientos en el área de ventas.</p>
      <p class="mt-5">Este webinar fue una gran oportunidad para que puedas comprender mejor cómo nuestro sistema de CRM puede ayudarte a maximizar tus ventas y mejorar la gestión de tus relaciones con los clientes. Estamos seguros de que podrás aplicar lo aprendido en este evento para aumentar la efectividad de tus estrategias de marketing y ventas.</p>
    </div>
    
    <div v-if="events.crm.status==3">
      <p class="mt-5 text-justify text-h5">¡Gracias por participar en nuestros webinars!</p>

      <p class="mt-8 text-justify" >¡Gracias por haber asistido a nuestros webinars de Aythen! Durante estos eventos, te presentamos nuestras herramientas y servicios y cómo pueden ayudarte a llevar tu negocio al siguiente nivel. Con nuestras soluciones digitales, nuestro programa reseller, nuestros precios y servicios personalizados, y nuestra herramienta CRM para maximizar tus ventas, tendrás todo lo que necesitas para convertir tus ideas en acciones concretas y hacer crecer tu negocio.</p>
      <p class="mt-5 text-justify ">Sabemos que tu tiempo es valioso, por eso agradecemos que hayas dedicado tiempo a aprender sobre nuestras herramientas y servicios. Queremos que sepas que estamos aquí para apoyarte en cada paso del camino. Si necesitas ayuda para implementar nuestras soluciones, nuestro equipo está a tu disposición para brindarte todo el soporte que necesites.</p>
      <p class="mt-5 text-justify "> ¡Gracias de nuevo por tu participación y esperamos trabajar juntos para hacer crecer tu negocio!</p>

    </div>
    
  </div>
</template>
