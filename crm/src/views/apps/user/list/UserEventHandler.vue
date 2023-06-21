<script setup lang="ts">
import laptopGirl from '@/assets/images/illustrations/laptop-girl.png'


import { useUbigeo } from "@/shared/composables/useUbigeo"

import ChatTwilio from "@/views/apps/chat/ChatTwilio.vue"

import iae from "@/@fake-db/data/iae.json"

import avatar1 from '@/assets/images/avatars/avatar-1.png'
import avatar2 from '@/assets/images/avatars/avatar-2.png'
import avatar3 from '@/assets/images/avatars/avatar-3.png'
import avatar4 from '@/assets/images/avatars/avatar-4.png'
import avatar5 from '@/assets/images/avatars/avatar-5.png'

import { formatDate } from "@core/utils/formatters"

import VSelectThree from "vue-select";
import "vue-select/dist/vue-select.css";
import axios from "axios";

const axiosIns = axios.create({
  baseURL: "https://api.aythen.com",
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
});

import type { Options } from 'flatpickr'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { VForm } from 'vuetify/components'
import type { Event, NewEvent } from '../types'
import { useCalendarStore, initialEvent } from '../../calendar/useCalendarStore'
import { requiredValidator, urlValidator } from '@validators'
import { defineEmits, defineProps } from 'vue'
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import MiniMoment from "@/shared/utils/MiniMoment"

import { templatesAvailables  } from "@/@fake-db/email/plantillas";

interface Props {
  isDrawerOpen: boolean;
  event: (Event | NewEvent);
  user?: object;
  typeForm?: string;
  leadId?: string;
  calling?: boolean
  availableCall?: boolean
}

interface Emits {
  (e: 'update:isDrawerOpen', val: boolean): void;
  (e: 'update:calling', val: boolean): void;
  (e: 'updateUser', val: user): void;
  (e: 'addEvent', val: NewEvent): void;
  (e: 'updateEvent', val: Event): void;
  (e: 'removeEvent', eventId: string): void;
}

const calendarStore = useCalendarStore();


const tools = ref(JSON.parse(localStorage.dataTools) || [])
const listTools = tools.value.map(value => value.title);



// 👉 store
const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// const store = useCalendarStore()
const refForm = ref<VForm>()



const TEMPLATE_MAIL = 'lead';


const isCalendar = ref(false)

// 👉 Event
const event = ref({})

if(!props.event) {
  event.value = {}
}else{
  isCalendar.value = true
  event.value = props.event
}


// 👉 User
const user = ref({})

// 👉 Calling
const called = ref('')
const calling = ref(false)
const loadingCall = ref(false)


if(!props.user){ //sandbox
 //fetchUser => lead_id
  user.value = {
    name: {
      name: 'juan carlos',
    },
    address:{}
  }
}else{ //leads
  user.value = props.user
}















//
const handleComingCall = ref(false)
const handle_incoming_call = ref(false)

onMounted(async () => {
  await getLead(leadId)
  //listen twilio
  setInterval(function(){
    console.log('inteval incoming: ',handle_incoming_call.value)
      if(handle_incoming_call.value){ //active alert?
          handleComingCall.value = true
          // ref_incoming_call.value = true //start handle
          emit('update:isDrawerOpen', true)
        
      }
  }, 1000)
    
    
  // console.log('edeeid')
  if(props.typeForm == 'event') {
    await calendarStore.getUsers();
    // if(store.leadId) {
    // }
  }
  // store.leadId = null;
})







const acceptCall = () => {
  // selectedMenu = 'caller'
  calling.value = true
  handleComingCall.value = false
  
  // //twilio
  // handle_incoming_call.value = false //not alert
  // acceptIncomingCall()
}


const onCall = () => {
  loadingCall.value = true
  // selectedMenu.value = 'º'
  // calling.value = true
  calling.value = true
  called.value = '+34' + user.value.phone
  // console.log('called', called.value)
}



watch(() => props.calling, (val) => {
  // calling.value = val
  
  if(props.calling){
     onCall()
  }
})



//   console.log(' user', user.value.phone)
// if(calling.value){
//   onCall()
// }


// console.log('calling ? ', calling.value)

const currentLead = ref({});

const loadCall = (status) => {
  console.log('connect call: ', status)
  if(status){
    loadingCall.value = false
    // selectedMenu.value = 'caller'
    setTimeout(function(){
      console.log('connected')
    }, 1000)
  }else{
    // selectedMenu.value = 'user'
    called.value = ''
    calling.value = false
    // loadCall.value = false
    
    //twilio
    // window.call.disconnect();
  }
}

const onHangout = () => {
  loadCall(false)
}



//watch(() => calendarStore.leadId, getLead);
watch(
  () => calendarStore.leadId,
  (newValue, oldValue) => {
    console.log('Watch executed!'); // Agregar console log para verificar
    getLead(newValue, oldValue);
  }
);


async function getLead(leadId) {
  console.log('leqadId',leadId)
  eventsObtained.value = false;
  calendarStore.todaysEvents = [];
  
  if(!leadId) {
    currentLead.value = {};
    return;
  };
  try {
    const { data } = await axiosIns.get(`user/${leadId}`);
    currentLead.value = data;
    console.log(currentLead.value.address.province)
    //console.log(currentLead.address && currentLead.address.country)
  } catch (e) {
    currentLead.value = {};
  }
}




const resetEvent = () => {
  if(props.isDrawerOpen) {
    console.log('=============> lead1234', props.user)
    
    showEmails.value = false;
    event.value = props.event;
    eventsObtained.value = false;
    user.value = props.user;
    calling.value = props.calling;
    called.value = '+34' +props.user.phone;
    //event.value = JSON.parse(JSON.stringify(props.event || ''))
    nextTick(() => {
      // refForm.value?.resetValidation();
    })
  }
  console.log(currentLead.value)
  
}

watch(() => props.isDrawerOpen, resetEvent)

const removeEventHandleClick = () => {
  emit('removeEvent', event.value.id)
  // Close drawer
  
}

// const handleSubmit = () => {
//   refForm.value?.validate()
//     .then(({ valid }) => {
//       if (valid) {
//         if ('id' in event.value)
//           emit('updateEvent', event.value)
//           // Else => add new event
//         else{
//           event.value.lead_id = user.value.id;
//           emit('addEvent', event.value)
//         }
//         // Close drawer
//         emit('update:isDrawerOpen', false)
//       }
//     })
// }

// 👉 Form
// const onCancel = () => {
//   emit('update:isDrawerOpen', false)
//   nextTick(() => {
//     refForm.value?.reset()
//     resetEvent()
//     refForm.value?.resetValidation()
//   })
// }

const startDateTimePickerConfig = computed(() => {
  const config: Options = {
    enableTime: true,
    dateFormat: 'Y-m-d H:i',
    locale: Spanish
  }
  
  if(event.value?.end){
    config.maxDate = event.value.end
  }
  
  return config
})

const endDateTimePickerConfig = computed(() => {
  const config: Options = {
    enableTime: true,
    dateFormat: 'Y-m-d H:i',
    locale: Spanish
  }

  if (event.value?.start){
    config.minDate = event.value.start
  }

  return config
})

const dialogModelValueUpdate = (val: boolean) => {
  emit('update:calling', false)
  emit('update:isDrawerOpen', val)
}

const selectedItem = ref([])



// const rating = ref(4.5)
// const openedPanels = ref<number[]>([])
// const items = ref(5)

// const all = () => {
//   // [...Array(5).keys()] => [0, 1, 2, 3, 4]
//   openedPanels.value = [...Array(items.value).keys()]
// }

// const none = () => {
//   openedPanels.value = []
// }


// const listEmails = [{
//   value: `notifications`,
//   title: `Notifications`,
//   description: `Notify me about updates to apps or games that I downloaded`
// },
// {
//   value: `otherValue`,
//   title: `Some`,
//   description: `description`
// }]

const handleUpdateLead = () => {
  const data = currentLead.value;
  const formData = {
    id: data.id,
    username: data.username,
    // fullName: data.fullName,
    name: {...data.name},
    company: data.company,
    status: data.status,
    nif: data.nif,
    email: data.email,
    web: data.web,
    phone: data.phone,
    address: {
      ...data.address,
      province: data.address.province,
      city: data.address.city,
      zip: data.address.zip,
      line: data.address.line,
    }
  }
  emit('updateUser', formData)
  emit('update:isDrawerOpen', false)
}

function handleClickEvent() {
  const currentEvent = event.value;
  if(!event.value.title) return;
  if(currentEvent?.id) {
    emit('updateEvent', event.value)
  } else {
    emit('addEvent', event.value)
  }
  emit('update:isDrawerOpen', false)
}

// function selectedProvince() {
//   currentLead.value.address.city = "";
//   selectedCity();
// }

// function selectedCity() {
//   currentLead.value.address.zip = [];
// }

// const listCities = computed(() => {
//   let provinceName = currentLead.value.address.province;
//   if (!provinceName) return [];
//   const currentCity = provinces.find(province => province.title == provinceName);
//   return cities.filter((city) => city.value.slice(0, 2) === currentCity.value);
// });

// const listZipCodes = computed(() => {
//   let cityName = currentLead.value.address.city;
//   if (!cityName) return [];
//   const currentCity = cities.find(city => city.title == cityName);
//   return codes
//     .filter((x) => x.municipio_id == currentCity.value)
//     .map((code) => ({
//       value: code.codigo_postal,
//       title: code.codigo_postal,
//     }));
// });

const showEmails = ref(false)

const templatesMail = templatesAvailables.plantilla[TEMPLATE_MAIL].map((template, index) => ({
  value: template.f,
  title: template.t,
  description: template.d
}));


const emailSelected = ref([]);

const sendEmail = async () => {
  //if exist
  emailSelected.value.map( email => {
     const index = emailSent.value.findIndex(x => x.title == email)
      var value = {
        title: email,
        date: new Date()  
      }
      
      if(index>-1){
        emailSent.value[index] = value
      }else{
        emailSent.value.push(value)
      }
  })

  //const result = array1.filter(item => !array2.includes(item));
  //if(!result.length) return;

  await axiosIns.put('/user', {
    user: {
      id: calendarStore.leadId,
      emails_sent: emailSent.value
    }
  })
  //emit('update:isDrawerOpen', false)
}

const eventOnline = ref({});
const eventSection = ref<HTMLElement>();
function handleSection(eventSelected) {
  const {
    lead_id, user_id, user, priority, ...resEvent
  } = eventSelected;
  if(eventSection.value) {
    this.eventOnline = {};
    refForm.value.scrollIntoView(true);
    event.value = resEvent;
    calendarStore.priority = priority;
    calendarStore.leadId = lead_id;
  } else {
    calendarStore.priority = priority;
    this.eventOnline = resEvent;
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return '#ED6B6C'
    case 'medium': return '#FFAC5C'
    default: return '#B4B5B9'
  }
}

// UPDATE EVENT ONLINE
const createEventOnline = ref({});
const isCreateOnlineEvent = ref(false);
async function updateEventOnline() {
  const currentEvent = eventOnline.value;
  if(!currentEvent.title) return;
  const index = calendarStore.todaysEvents.findIndex(item => item.id === currentEvent.id);
  const { data } = await calendarStore.updateEvent(currentEvent, 'formOnline', true);
  const updateEvent = {
    ...eventOnline.value,
    user: {
      id: currentLead.value.id,
      avatar: currentLead.value.avatar,
      name: currentLead.value.name
    }
  }
  
  calendarStore.todaysEvents.splice(index, 1, updateEvent);
  eventOnline.value = {};
}
function addOnlineEvent() {
  isCreateOnlineEvent.value = true;
  createEventOnline.value = initialEvent();
}
function closeCreateOnlineEvent() {
  isCreateOnlineEvent.value = false;
  createEventOnline.value = {};
}
async function addEventOnline() {
  const { data } = await calendarStore.addEvent(createEventOnline.value);
  const newEvent = {
    ...data,
    user: {
      id: currentLead.value.id,
      avatar: currentLead.value.avatar,
      name: currentLead.value.name
    }
  }
  calendarStore.todaysEvents.unshift(newEvent)
  closeCreateOnlineEvent();
}
async function destroyOnlineEvent() {
  const currentEvent = eventOnline.value;
  try {
    await calendarStore.removeEvent(currentEvent.id, true);
    
    const index = calendarStore.todaysEvents.findIndex(item => item.id === currentEvent.id);
    calendarStore.todaysEvents.splice(index, 1);
    
    closeOnlineEvent();
  } catch (e) {
    console.error(e)
  }
}
// function closeOnlineEvent() {
//   eventOnline.value = {};
// }

// LOAD EVENTS TODAY
let options = {
  root: document.querySelector('#card__content'),
  rootMargin: '0px',
  threshold: 1.0
}

let callback = async (entries, observer) => {
  entries.forEach(async (entry) => {
    if(entry.isIntersecting) {
      if(eventsObtained.value) return;
      const data = await calendarStore.getEventsToday();
      
      calendarStore.todaysEvents = data;
      eventsObtained.value = true;
    }
  });
};

const refSectionEvents = ref<HTMLElement>();
const eventsObtained = ref(false);
watch(() => refSectionEvents.value, (newValue) => {
  if(newValue) {
    let observer = new IntersectionObserver(callback, options);
    observer.observe(refSectionEvents.value);
  }
})

// SEND EMAILS
const emailSent = ref([]);
watch(currentLead, (newValue) => {
  if(newValue?.emails_sent) {
    emailSent.value = newValue.emails_sent;
    // emailSelected.value = [...newValue.emails_sent];
  }
})

const isSent = (email) => {
  var index = emailSent.value.findIndex(x => x.title == email)
  
  let attrs = {}
  if(index>-1) attrs.active = true
  return attrs;
  // const status = emailSent.value.includes(email);
  // let attrs = { disabled: status }
  // if(status) attrs.active = true;
  // return attrs;
  // return templatesSent.value.includes(template)
}

const showDate = (email) => {
   var index = emailSent.value.findIndex(x => x.title == email)
  
    if(index>-1){
      return emailSent.value[index].date
    }else{
      return '- - -'
    }
}



////

const listIae = computed(() => {
  const qr=[...new Map(iae.map((item) => [item.value, item])).values()];
 
  return qr.map(item => {
    return {...item,title: item.value + " - " + item.title};
  })
});

const fullName=(name:any)=>{
  console.log(name)
  return name.name
}



const selectedMenu = ref('user')
const itemsMenu = ref([])

watch(currentLead, (newValue) => {
  itemsMenu.value = [{ title: 'Usuario', value: 'user'  }]
  
  if(currentLead.value.email){
      itemsMenu.value.push({ 
        title: 'Contactar',  value: 'follow' 
      },{ 
        title: 'Agenda', value: 'diary'  
      })
  }

})

//cities

// 👉 address

const { ubigeo, getCities, getCodes } = useUbigeo()

const  ubi  = ref(ubigeo)

const address = ref({
  province: '',
  city: '',
  zip: '',
  line: ''
})



// 👉 call

// setTimeout(async function(){
//   await 
  
// }, 3000)







</script>

<template>
  
  <VNavigationDrawer 
    temporary 
    location="end" 
    :model-value="props.isDrawerOpen"
    width="420"
    class="scrollable-content"
    @update:model-value="dialogModelValueUpdate">
    
    calling
    {{props.calling}}
    <!-- 👉 Header -->
    <div v-if="false && !isCalendar" class="d-flex align-center pa-6 pb-1">
      <h6 class="text-h6">
        {{ user.id ? 'Modificar' : 'Añadir' }} Lead-
      </h6>
      <VSpacer />
      <VBtn variant="tonal" color="default" icon size="32" class="rounded" title="Close" @click="$emit('update:isDrawerOpen', false)">
        <VIcon size="18" icon="tabler-x" />
      </VBTn>
    </div>
    
    
    <div class="d-flex align-center pa-6 pb-1">
      <h6 class="text-h6">
        <span v-if="typeForm == 'event'">
          {{ event?.id ? 'Editar' : 'Nuevo' }}
        </span>
        <span v-else>
          <div v-if="user.id && availableCall" class="d-flex gap-2">
            <VBtn v-if="handleComingCall" @click="acceptCall"
              color="warning" :size="32" >
              <VIcon  :size="22" icon="tabler-phone"></VIcon>
            </VBtn>
            <VBtn v-else-if="!called || loadingCall"
              @click="onCall"  color="success" :size="32" :loading="loadingCall">
                <VIcon :size="22" icon="tabler-phone"></VIcon>
            </VBtn>
            <VBtn v-else
              @click="onHangout" color="error" :size="32">
                <VIcon :size="22" icon="tabler-phone"></VIcon>
            </VBtn>
            <div v-if="called && calling && availableCall">
                twilio {{called}}
                <ChatTwilio 
                  :v-if="calling"
                  :called="called"
                  :calling="calling"
                  :handleIncomingCall="handle_incoming_call"
                  @loadCall="loadCall"
                />
            </div>
          </div>
          <div v-else>
             Añadir
          </div>
        </span>
      </h6>
      <VSpacer />
      <VBtn 
        type="button" 
        @click="handleUpdateLead" 
        icon
        color="error"
        size="32"
        class="rounded me-3">
          <VIcon size="18" icon="tabler-trash" />
      </VBtn>
      <VBtn 
        type="button" 
        @click="handleUpdateLead" 
        icon
        size="32"
        class="rounded me-10">
          <VIcon size="18" icon="tabler-edit" />
      </VBtn>
   
      <VMenu  open-on-hover size="small">
        <template #activator="{ props }">
          <VBtn 
            variant="tonal" 
            color="" 
            size="32"
            v-bind="props"
            class="rounded me-3">
            <VIcon size="18" icon="tabler-menu" />
          </VBtn>
        </template>
        <VList class="cursor-pointer">
          <template v-for="(item, index) in itemsMenu">
            <VListItem  @click="selectedMenu = item.value">
              <VListItemTitle>{{ item.title }}</VListItemTitle>
            </VListItem>
          </template>
        </VList>
      </VMenu>
      <VBtn
        v-if="typeForm == 'event' && event?.id"
        v-show="user.id"
        icon
        variant="tonal"
        size="32"
        class="rounded me-3"
        color="default"
        title="Delete event"
        @click="removeEventHandleClick"
      >
        <VIcon size="18" icon="tabler-trash" />
      </VBtn>
      <VBtn
        variant="tonal"
        color="default"
        icon
        size="32"
        class="rounded"
        title="Close"
        @click="$emit('update:isDrawerOpen', false)"
      >
        <VIcon size="18" icon="tabler-x" />
      </VBTn>
    </div>
    


    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText id="card__content">
          <!-- SECTION Form -->
          <VForm ref="refForm">
            menu: 
            {{selectedMenu}}
            <template v-if="typeForm == 'event'">
              <!-- ====================================================
                FORM EVENT
              ===================================================== -->
              <VRow ref="eventSection">
                <VDivider/>
                <VCol cols="12">
                  <strong>
                    Evento
                  </strong>
                </VCol>
                <VCol cols="12">

                  <VSelect
                    v-model="calendarStore.priority"
                    label="Priority"
                    :items="calendarStore.availableCalendars"
                    :item-title="item => item.label"
                    :item-value="item => item.label"
                    class="text-capitalize"
                  >
                  <template #selection="{ item }">
                    <div v-if="calendarStore.priority" class="align-center" :class="calendarStore.priority ? 'd-flex' : ''" >
                      <VBadge :color="item.raw.color" inline dot class="pa-1" />
                      <span class="text-capitalize">{{ item.raw.label }}</span>
                    </div>
                  </template>
                    
                  </VSelect>
                  
                  
                </VCol>
                <VCol cols="12">
                    <VSelectThree
                      :options="calendarStore.users"
                      class="vs__select_scoped"
                      :getOptionLabel="(item) => item.name.name"
                      :reduce="(item) => item.id"
                      v-model="calendarStore.leadId"
                      maxHeight="200px"
                      no-data-text="No hay datos" 
                      spellcheck="false"
                    >
                      <template #no-options="{ search, searching }">
                        <template v-if="searching">
                          <p class="text-sm-caption">
                            No se han encontrado resultados para "<b>{{ search }}</b>".
                          </p>
                        </template>
                        <p v-else class="text-sm-caption">No hay opciones</p>
                      </template>
                    </VSelectThree>
                </VCol>
                <VCol cols="12">
                  <VTextField
                    v-model="event.title"
                    label="Titulo evento"
                  />
                </VCol>
                <!-- 👉 Start date -->
                <VCol cols="6">
                  <AppDateTimePicker
                    :key="JSON.stringify(startDateTimePickerConfig)"
                    v-model="event.start"
                    :value="event.start"
                    :rules="[requiredValidator]"
                    label="Start date"
                    :config="startDateTimePickerConfig"
                  />
                </VCol>
                <!-- 👉 End date -->
                <VCol cols="6">
                  <AppDateTimePicker
                    :key="JSON.stringify(endDateTimePickerConfig)"
                    v-model="event.end"
                    :value="event.end"
                    :rules="[requiredValidator]"
                    label="End date"
                    :config="endDateTimePickerConfig"
                  />
                </VCol>
                <!-- 👉 All day -->
                <VCol cols="12">
                  <VRow>
                      <VCol cols="4">
                        <VSwitch v-model="event.allDay" label="All day" />
                      </VCol>
                      <VCol cols="8" class="ml-auto" v-if="calendarStore.leadId">
                        <VRow justify="end">
                          <VCol cols="6">
                            <VBtn size="small" type="button" @click="handleClickEvent">
                              Guardar
                            </VBtn>
                          </VCol>
                        </VRow>
                      </VCol>
                  </VRow>
                </VCol>
              </VRow>
            </template>
            
            <template v-if="selectedMenu == 'user' && Object.keys(currentLead).length">
                <!-- ====================================================
                  FORM LEAD
                ===================================================== -->
              <VRow>
                <VDivider />
                <VCol cols="12">
                  <strong>Lead</strong>
                </VCol>
                <VCol cols="12">
                  <VCombobox
                    v-model="selectedItem"
                    :items="listTools"
                    label="Planes de interes"
                    multiple
                    chips
                  />
                </VCol>
                <VCol cols="12">
                  <VSelectThree
                    :options="listIae"
                    class="vs__select_scoped"
                    :getOptionLabel="(item) => item.title"
                    :reduce="(item) => item.value"
                    v-model="currentLead.category"
                    maxHeight="200px"
                    id="category"
                    spellcheck="false"
                  >
                    <template #no-options="{ search, searching }">
                      <template v-if="searching">
                        <p class="text-sm-caption">
                          No se han encontrado resultados para "<b>{{ search }}</b>".
                        </p>
                      </template>
                      <p v-else class="text-sm-caption">No hay opciones</p>
                    </template>
                  </VSelectThree>
                </VCol>
                <VDivider />
                <VCol cols="12">
                  <strong>About</strong>
                </VCol>
                <!-- 👉 Username -->
                <VCol cols="12">
                  <VTextField
                    v-model="currentLead.username"
                    label="Username"
                  />
                </VCol>
                <!-- 👉 Name -->
                <VCol cols="12">
                  <VTextField
                    v-model="currentLead.name.name"
                    label="Nombre"
                  />
                </VCol>
                <!-- 👉 First SurName -->
                <VCol cols="6">
                  <VTextField
                    v-model="currentLead.name.firstSurname"
                    label="Primer Apellido"
                  />
                </VCol>
                <!-- 👉 Second SurName -->
                <VCol cols="6">
                  <VTextField
                    v-model="currentLead.name.secondSurname"
                    label="Segundo Apellido"
                  />
                </VCol>
                <!-- 👉 Nif -->
                <VCol cols="6">
                  <VTextField
                    v-model="currentLead.nif"
                    label="NIF"
                  />
                </VCol>
                <!-- 👉 Company -->
                <VCol cols="6">
                  <VTextField
                    v-model="currentLead.company"
                    label="Company"
                  />
                </VCol>
                <VDivider />
                <VCol cols="12">
                  <strong>Contacto</strong>
                </VCol>
                <!-- 👉 Email -->
                <VCol cols="12">
                  <VTextField
                    v-model="currentLead.email"
                    label="Email"
                  />
                </VCol>
                <!-- 👉 Phone -->
                <VCol cols="12">
                  <VTextField
                    v-model="currentLead.phone"
                    label="Teléfono"
                  />
                </VCol>
                <!-- 👉 Web -->
                <VCol cols="12">
                  <VTextField
                    v-model="currentLead.web"
                    label="Web"
                  />
                </VCol>
                <VDivider />
                <VCol cols="12">
                  <strong>Dirección</strong>
                </VCol>
                <template v-if="currentLead.address">
                  <!-- 👉 Country -->
                  <VCol cols="12">
                    <VTextField
                      v-model="currentLead.address.country"
                      label="País"
                      readonly
                    />
                  </VCol>
                  <!-- 👉 Province -->
                  <VCol cols="12" sm="6" md="6">
                    <VSelect
                      label="Provincia"
                      :options="ubi.provinces"
                      class="vs__select_scoped"
                      :getOptionLabel="(item) => item.title"
                      :reduce="(item) => item.value"
                      v-model="currentLead.address.province"
                      maxHeight="200px"
                      @option:selected="selectProvince"
                    >
                      <template #no-options="{ search, searching }">
                        <template v-if="searching">
                          <p class="text-sm-caption">
                            No se han encontrado resultados para "<b>{{ search }}</b
                            >".
                          </p>
                        </template>
                        <p v-else class="text-sm-caption">No hay opciones</p>
                      </template>
                    </VSelect>
                  </VCol>
                  <!-- 👉 City -->
                  <VCol cols="12" sm="7" md="7" 
                    >
                    <VSelect
                      id="city"
                      label="Ciudad"
                      :options="ubi.cities"
                      class="vs__select_scoped"
                      :getOptionLabel="(item) => item.title"
                      :reduce="(item) => item.value"
                      v-model="currentLead.address.city"
                      maxHeight="200px"
                      @option:selected="selectCity"
                      
                    >
                      <template #no-options="{ search, searching }">
                        <template v-if="searching">
                          <p class="text-sm-caption">
                            No se han encontrado resultados para "<b>{{ search }}</b
                            >".
                          </p>
                        </template>
                        <p v-else class="text-sm-caption">No hay opciones</p>
                      </template>
                    </VSelect>
                  </VCol>
                  <!-- 👉 Code -->
                  <VCol
                    cols="12"
                    sm="5"
                    md="5"
                    v-if="currentLead.address.city"
                  >
                    <VSelect
                      id="postal-code"
                      label="Zip"
                      :options="ubi.codes"
                      class="vs__select_scoped"
                      :getOptionLabel="(item) => item.codigo_postal"
                      :reduce="(item) => item.value"
                      v-model="currentLead.address.zip"
                      maxHeight="200px"
                      @option:selected="selectCode"
                    >
                      <template #no-options="{ search, searching }">
                        <template v-if="searching">
                          <p class="text-sm-caption">
                            No se han encontrado resultados para "<b>{{ search }}</b
                            >".
                          </p>
                        </template>
                        <p v-else class="text-sm-caption">No hay opciones</p>
                      </template>
                    </VSelect>
                  </VCol>
                  
                  <!-- 👉 Line -->
                  <VCol cols="12" v-if="currentLead.address.zip">
                    <VTextField
                      v-model="currentLead.address.line"
                      label="Dirección completa"
                    />
                  </VCol>
                </template>
                
              </VRow>
                
                <div ref="refSectionEvents" class="w-100"></div>
                <!-- ====================================================
                  LIST EVENTS
                ===================================================== -->
                
            </template>
           
            <template v-if="selectedMenu == 'follow'">
              <div class="v-list v-theme--light bg-transparent w-100 v-list--density-compact v-list--three-line">
                <VCol cols="12">
                  <!--<VCard border class="d-flex align-center flex-md-row flex-column position-relative mx-auto">-->
                  <!--    <div class="px-2 pt-2 text-center text-md-start  ">-->
                  <!--      <p class="font-weight-bold mb-4"  :style="{lineHeight: '20px'}">-->
                  <!--        ¿Todavía no está convencido?-->
                  <!--      </p>-->
                  <!--      <h1 class="mb-4" :style="{lineHeight: '24px'}"> -->
                  <!--        ¡Obtén más informción!-->
                  <!--      </h1>-->
                  <!--      <p class="text-sm mb-2">-->
                  <!--        Descubre todo lo que necesitas saber sobre nuestro Kit Digital-->
                  <!--      </p>-->
                  <!--    </div>-->
                
                  <!--    <div class="ml-2 free-trial-illustrator">-->
                  <!--      <VImg :src="laptopGirl" :width="180" />-->
                  <!--    </div>-->
                  <!--</VCard>-->
          
                  <div class="px-2" >
                        <VRow>
                            <VCol cols="12">
                              <VRow>
                                <VCol cols="10">
                                  <AppDateTimePicker
                                    v-model="createEventOnline.start"
                                    label="Start date"
                                    :key="JSON.stringify(startDateTimePickerConfig)"
                                    :value="createEventOnline.start"
                                    :rules="[requiredValidator]"
                                    :config="startDateTimePickerConfig"
                                  />
                                </VCol>
                                <VCol cols="2" class="ml-auto d-flex gap-2">
                                  <VBtn 
                                    size="small"
                                    icon="tabler-plus"
                                    @click="addEventOnline">
                                  </VBtn>
                                </VCol>
                              </VRow>
                            </VCol>
                            <VDivider class="mb-2" />
                            <VCol cols="12">
                              <VSelect
                                label="Priority"
                                v-model="calendarStore.priority"
                                :items="calendarStore.availableCalendars"
                                :item-title="item => item.label"
                                :item-value="item => item.label"
                                class="text-capitalize"
                              >
                                <template #selection="{ item }">
                                  <div
                                    v-if="calendarStore.priority"
                                    class="align-center"
                                    :class="calendarStore.priority ? 'd-flex' : ''"
                                  >
                                    <VBadge
                                      :color="item.raw.color"
                                      inline
                                      dot
                                      class="pa-1"
                                    />
                                    <span class="text-capitalize">{{ item.raw.label }}</span>
                                  </div>
                                </template>
                              </VSelect>
                            </VCol>
                            <VCol cols="12">
                              <VTextarea
                                label="Evento"
                                v-model="createEventOnline.title"
                                counter
                              />
                            </VCol>
                        </VRow>
                  </div>
                  
                  <div class="w-100" 
                    v-for="item in calendarStore.todaysEvents"
                    :key="item.id">
                    <template v-if="item.id === eventOnline?.id">
                      <div class="px-2">
                        <!--<VRow>-->
                        <!--  <VCol>-->
                        <!--    <div class="align-center d-flex justify-space-between">-->
                        <!--      <div>Editar</div>-->
                        <!--      <div class="text-end">-->
                        <!--        <VBtn -->
                        <!--          icon="tabler-trash"-->
                        <!--          color="secondary"-->
                        <!--          size="small"-->
                        <!--          variant="text"-->
                        <!--          @click="destroyOnlineEvent">-->
                        <!--        </VBtn>-->
                        <!--        <VBtn -->
                        <!--          icon="tabler-x"-->
                        <!--          color="secondary"-->
                        <!--          size="small"-->
                        <!--          variant="text"-->
                        <!--          @click="closeOnlineEvent">-->
                        <!--        </VBtn>-->
                        <!--      </div>-->
                        <!--    </div>-->
                            
                        <!--  </VCol>-->
                        <!--</VRow>-->
                        <VRow>
                          <VCol cols="12">
                            <VRow>
                              <VCol cols="8">
                                 <AppDateTimePicker
                                    :key="JSON.stringify(startDateTimePickerConfig)"
                                    v-model="eventOnline.start"
                                    :value="eventOnline.start"
                                    :rules="[requiredValidator]"
                                    label="Start date"
                                    :config="startDateTimePickerConfig"
                                  />
                              </VCol>
                              <VCol v-if="calendarStore.leadId" cols="4" class="ml-auto" >
                                <VRow justify="end">
                                  <VCol cols="6">
                                    <VBtn 
                                      icon="tabler-x"
                                      color="error"
                                      size="small" 
                                    />
                                    <VBtn 
                                      size="small"
                                      type="button"
                                      @click="updateEventOnline">
                                      Guardar
                                    </VBtn>
                                    <VBtn 
                                      icon="tabler-trash"
                                      color="secondary"
                                      size="small"
                                      variant="text"
                                      @click="destroyOnlineEvent">
                                    </VBtn>
                                  </VCol>
                                </VRow>
                              </VCol>
                            </VRow>
                          </VCol>
                          <VDivider class="mb-4" />
                          <VCol cols="12">
                            <VSelect
                              v-model="calendarStore.priority"
                              label="Priority"
                              :items="calendarStore.availableCalendars"
                              :item-title="item => item.label"
                              :item-value="item => item.label"
                              class="text-capitalize"
                            >
                              <template #selection="{ item }">
                                <div
                                  v-if="calendarStore.priority"
                                  class="align-center"
                                  :class="calendarStore.priority ? 'd-flex' : ''"
                                >
                                  <VBadge
                                    :color="item.raw.color"
                                    inline
                                    dot
                                    class="pa-1"
                                  />
                                  <span class="text-capitalize">{{ item.raw.label }}</span>
                                </div>
                              </template>
                            </VSelect>
                          </VCol>
                          <VCol cols="12">
                            <VTextField
                              v-model="eventOnline.title"
                              label="Titulo evento"
                            />
                          </VCol>
                          <VCol cols="6">
                            
                          </VCol>
                          <VCol cols="6">
                            <AppDateTimePicker
                              :key="JSON.stringify(endDateTimePickerConfig)"
                              v-model="eventOnline.end"
                              :value="eventOnline.end"
                              :rules="[requiredValidator]"
                              label="End date"
                              :config="endDateTimePickerConfig"
                            />
                          </VCol>
                        </VRow>
                      </div>
                    </template>
                    <template v-else>
                      <div class="d-flex justify-space-between mb-1 px-4 py-2 rounded-lg" >
                        <div class="v-list-item__prepend align-self-center">
                          <div class="v-avatar v-avatar--density-compact v-avatar--size-default v-avatar--variant-flat"
                          :style="{'border': `3px solid ${getPriorityColor(item?.priority)}`}">
                            <div class="v-responsive v-img">
                              <div class="v-responsive__sizer" style="padding-bottom: 100%;"></div>
                              <img class="v-img__img v-img__img--contain" :src="item?.user?.avatar">
                            </div>
                          </div>
                        </div>
                        <div class="v-list-item__content w-100">
                          <div class="text-primary v-list-item-title">
                            {{ item?.user?.name?.name }}
                          </div>
                          <div class="v-list-item-subtitle">
                            <div>
                              <span class="d-block font-weight-bold mb-2">
                                {{ item?.title }}
                              </span>
                              <span>
                                {{ MiniMoment.formatDateWithHour(item?.start) }}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <VBtn icon="tabler-edit" size="small" variant="text"
                          @click="handleSection(item)"></VBtn>
                        </div>
                      </div>
                    </template>
                  </div>
                </VCol>
              </div>
              
              <!-- 
                <VCol cols="12">
                  <VList
                    id="three-line-list"
                    lines="three"
                    :items="itemsContact"
                    item-props
                    density="compact"
                  >
                    <template #subtitle="{ subtitle }">
                      <div v-html="subtitle" />
                    </template>
                  </VList>
                </VCol>
              -->
            </template>
            <template v-if="selectedMenu == 'diary'">
              <VCol cols="12">
                <VList 
                  lines="three"
                  density="compact"
                  select-strategy="classic"
                >
                  <VListSubheader>Plantilla(s)</VListSubheader>
                  <VListItem v-for="(email, index) in templatesMail" 
                    :value="email.value"
                    :key="index"
                    :="isSent(email.value)"
                  >
                    <!--:disabled="isSent(email.value)"-->
                    <!--:active=""-->
                    <template #prepend="{ isActive }">
                      <VListItemAction start>
                        <VCheckbox
                          :model-value="isActive"
                          v-model="emailSelected"
                          :value="email.value"
                          color="primary"
                          class="mt-2"
                        />
                        <!--:disabled="isSent(email.value)"-->
                      </VListItemAction>
                    </template>
                    <VListItemTitle>{{ email.title }}</VListItemTitle>
                    <VListItemSubtitle>
                        {{showDate(email.value)}}
                    </VListItemSubtitle>
                  </VListItem>
                </VList>
              </VCol>
              <VCol cols="12">
                <VBtn color="primary" size="small" @click="sendEmail">
                  Send Email
                </VBtn>
              </VCol>
            </template>
          </VForm>
          
        <!-- !SECTION -->
        </VCardText>
      </VCard>
      
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>

<style lang="scss">
  /*:root {*/
  /*  --primary-blue: #7367F0 !important;*/
  /*}*/
  /*body {*/
  /*  --vs-actions-padding: 4px 10px;*/
  /*}*/
  /*.vs__selected-options {*/
  /*  font-size: 15px !important;*/
  /*}*/
  
  .flatpickr-input{
    height: 50px;
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
</style>