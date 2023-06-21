<script setup lang="ts">
import { untilDate } from "@/shared/utils/date";
import ButtonStep from "@/shared/components/DumbComponents/ButtonStep.vue";
import "@fullcalendar/core/vdom"; // solves problem with Vite
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { CalendarOptions } from "@fullcalendar/vue3";
import FullCalendar from "@fullcalendar/vue3";
import { defineProps } from "vue";
import { initialStateFCEvent } from "./reseller.data";
import { FullCalendarEvent } from "./reseller.interfaces";
import { useResellerStore } from "./useResellerStore";
import { textForm06 } from "./text.js";

const { show, submit } = defineProps<{ show: any, submit: any }>();
const text = textForm06;
const listEvents = reactive([]);
const isDialogVisible = ref(false);
const QUANTITY_DAYS = ref(4);

function setHour(date: string) {
  let newDate = new Date(date);
  newDate.setHours(0, 0, 0);
  return newDate;
}


const store = useResellerStore();

const abilities={
  1:"aythen",
  2:"services",
  3:"reseller",
  4:"crm"
}

const events = [
  {
    id: 1,
    type:"aythen",
    title: "Webinar Aythen + Kit Digital",
    content: `
      <p class="mb-4">
        En este webinar se plantea la explicación del universo Aythen, su plataforma y sus servicios más populares. Además, se presentan las visicitudes de la subvención del Kit Digital para entender y tener un correcto asesoramiento hacia el cliente final. 
      </p>
      <p>
        Acepta para continuar. 
      </p>
    `
  },
  {
    id: 2,
    type:"reseller",
    title: "Webinar Reseller",
    content: `
      <p class="mb-4">
        Entendemos que ya conoces nuestro producto y su financiación. 
        Ahora es el momento de entender de forma clara tus condiciones, 
        objetivos y comisiones para el trabajo de campo. 
        
        Acepta para empezar el webinar y terminar con la firma del contrato para, 
        así, acceder a nuestra Base de Datos.
 
      </p>
      <p>Acepta para continuar.</p>
    `
  },
  {
    id: 3,
    type:"crm",
    title: "Webinar CRM",
    content: `
      <p>
        ¡Felicidades! Ya formas parte del programa Reseller.
        
        Ahora te presentaremos las distintas funciones del CRM comercial, 
        sus herramientas y las buenas prácticas.
        
        De esta forma, tendrás siempre una guía para saber manejar la gestión 
        de tu Base de Datos y sus seguimientos. 
        
        Una vez que termines pasarás un pequeño test general 
        para verificar que todos los pasos han sido entendidos.
      </p>
      <p>
        Acepta para continuar.
      </p>
    `
  },
]

function getDataEvent(eventId: number) {
  const currEvent = events.find(({ id }) => id === eventId);
  return currEvent;
}

onMounted(() => {
  const TODAY = new Date();
  let n = 0;
  for (let i = 0; n < QUANTITY_DAYS.value; i++) {
    TODAY.setDate(TODAY.getDate() + 1);
    if (TODAY.getDay() !== 0 && TODAY.getDay() !== 6) {
      n++;
      let item= getDataEvent(n) || {};
      listEvents.push({
        id: n,
        type:item.type,
        title: item.title,
        start: setHour(TODAY.toISOString()),
        backgroundColor: "gray",
        borderColor: "white",
        allDay: true,
      });
    }
  }
});

const currentEvent = reactive<FullCalendarEvent>({ ...initialStateFCEvent });

function handleClickEvent({ event }: any) {
  const { id: eventId } = event;
  const dataEvent = getEventById(eventId);
  currentEvent.id = dataEvent.id;
  currentEvent.title = dataEvent.title;
  currentEvent.start = dataEvent.start;
  currentEvent.type = dataEvent.type;
  currentEvent.borderColor = dataEvent.borderColor;
  isDialogVisible.value = true;
  
  
}

async function aceptedModal() {
  currentEvent.borderColor = "blue";
  updateEvent(currentEvent.id);
  closeModal();
}

async function updateEvent(eventId: string) {
  const index = getIndexEventById(eventId);
  
  if(eventId){
      listEvents.splice(index, 1, { ...currentEvent, type:abilities[eventId] });
  }

  const qr = listEvents
  .filter(event => event.backgroundColor!=='gray')
  .reduce((obj, item) => { obj[item.type] = item.start;  return obj;  }, {});

  //qr.action="block";

  store.guest.abilities = { action:"block", webinar: qr }

}

function getEventById(eventId: string): FullCalendarEvent {
  return listEvents.find((ev) => ev.id == eventId);
}

function getIndexEventById(eventId: string): number {
  return listEvents.findIndex((ev) => ev.id == eventId);
}

function closeModal() {
  currentEvent.id = initialStateFCEvent.id;
  currentEvent.title = initialStateFCEvent.title;
  currentEvent.start = initialStateFCEvent.start;
  currentEvent.borderColor = initialStateFCEvent.borderColor;
  isDialogVisible.value = false;
}

const calendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin],
  headerToolbar: {
    start: "title",
    end: "prev,next",
  },
  locale: "es",
  weekends: false,
  events: listEvents,
  eventColor: "#000fff",
  forceEventDuration: false,
  // eventResizableFromStart: true,
  dayMaxEvents: 2,
  navLinks: false,
  firstDay: 1,
  eventClick: handleClickEvent,
} as CalendarOptions;

async function handleGoToStep(nextStep: number) {
  const fieldToEvaludate = completedForm.value;
  if (!fieldToEvaludate) return
  await submit();
  show(nextStep);
}

const completedForm = computed<boolean>(() => {
  const allAccepted = listEvents.filter(
    (ev: FullCalendarEvent) => ev.borderColor === "blue"
  );
  return allAccepted.length === QUANTITY_DAYS.value;
});


function openNextEvent() {
  aceptedModal();
 
  const uncompletedEvents = listEvents
    .filter((event: FullCalendarEvent) => event.borderColor !== "blue")
    .map((event) => event.id); 
  if (!uncompletedEvents.length) {
    isDialogVisible.value = false;
    return;
  }
  let nextEvent = {
    event: {
      id: uncompletedEvents[0],
    },
  };
  // addAnimation.value = true;
  setTimeout(() => {
    // addAnimation.value = false;
    handleClickEvent(nextEvent);
  }, 500);
}

</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <ButtonStep outline type-arrow="left" @click="show(4)" />
      <ButtonStep
        type-arrow="right"
        :is-disabled="!completedForm"
        @click="!completedForm ? openNextEvent() : handleGoToStep(6)"
      />
      <!--openNextEvent() -->
        <!---->
    </div>
    <h1 class="text-3xl text-slate-800 font-bold mb-6">
      {{ text.title }}
    </h1>
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
    <div class="mb-8">
      <FullCalendar ref="refCalendar" :options="calendarOptions" />
    </div>

    <VDialog v-model="isDialogVisible" width="500" persistent>
      <!-- Dialog close btn -->
      <DialogCloseBtn @click="closeModal" />
      <!-- Dialog Content -->
      <!-- - Política de privacidad-->
      <VCard :title="`${currentEvent?.title}`">
        <VCardText>
          <p class="text-body-2 text-right">
            Fecha de evento:
            <b class="text-primary-blue">
              {{ untilDate(currentEvent.start) }}
            </b>
          </p>
          <VDivider class="mb-4" />
          <div v-html="getDataEvent(currentEvent.id)?.content"></div>
        </VCardText>
        <VCardText class="d-flex justify-end">
          <VBtn color="#c7c7c7" @click="closeModal" class="mr-4"> Cerrar </VBtn>
          <VBtn @click="openNextEvent" style="background: blue !important">
            Acepto
          </VBtn>
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template>

<style lang="scss" scoped>
:deep(.fc) {
  .fc-button-primary {
    background-color: blue !important;
    border-color: white !important;
  }

  .fc-icon {
    font-size: 15px;
    line-height: 7px;
  }

  .fc-toolbar-title {
    font-size: 16px;
  }
}
</style>
<style lang="scss">
.fc .fc-col-header-cell-cushion,
.fc .fc-toolbar-title {
  text-transform: capitalize;
}

.fc .fc-daygrid-event-harness {
  cursor: pointer;
}

.fc .fc-event-title-container {
  padding-inline-start: 8px;
}
.fc .fc-scroller.fc-scroller-liquid-absolute::-webkit-scrollbar {
  display: none;
  /*overflow: hidden !important;*/
}

.add-animation {
  animation: opacity 2s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
}

@keyframes opacity {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
