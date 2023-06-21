
<script setup lang="ts">
import '@fullcalendar/core/vdom' // solves problem with Vite


import {  textForm05 } from './text.js'
//import { BCalendar } from 'bootstrap-vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import timeGridPlugin from '@fullcalendar/timegrid'

import FullCalendar from '@fullcalendar/vue3'
import type { CalendarApi, CalendarOptions, EventApi, EventSourceFunc } from '@fullcalendar/vue3'



//
interface Props {
  dataForm: any
  show: any,
  submit: any
}

const props = defineProps<Props>()


const account = ref(props.dataForm)




const text = textForm05

const selectedDate = () => {
  return 'ee'
}

const dateDisabled = (ymd, date) => {
  const weekday = date.getDay()
  const day = date.getDate()
  return weekday === 0 || weekday === 6 || day === 13
}

const dateClass = (ymd, date) => {
  const day = date.getDate()
  
  const now = new Date()
  
  var offset = 15
  now.setDate(now.getDate() + offset);
  
  return day >= 10 && day <= 20 ? 'table-primary' : ''
}
    
const weekday = 'monday'




//
const isValid = ref(false)


const valider = () => {
  var data = account.value
  
  isValid.value = false
  
  if(data.company && data.nif && data.phone && data.email ){
    isValid.value = true
  }
}

valider()




//
const isDialogVisible = ref(false)


const calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    //initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'title',
      end: 'prev,next',
    },
    weekends: false,
    navLinks: true,
    firstDay: 1,
    dateClick({ event: clickedEvent }) {
      console.log('ee')
      isDialogVisible.value = true
    }
  } as CalendarOptions
</script>



<template>
  <div>
    <h1 class="text-3xl text-slate-800 font-bold mb-2">
      {{ text.title }}
    </h1>
    <p class="mb-10">
      {{ text.text }}
    </p>
    <!-- Form -->
    <form @change="valider">
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
        <AppDateTimePicker
          :model-value="new Date().toJSON().slice(0, 10)"
          label="Inline"
          :config="{ inline: true }"
          class="calendar-date-picker"
          @input="jumpToDate($event.target.value)"
        />
            
        <FullCalendar
              ref="refCalendar"
              :options="calendarOptions"
            />
      </div>

    </form>
    
    
    <VDialog
      v-model="isDialogVisible"
      width="500"
    >
      <!-- Dialog close btn -->
      <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />
  
      <!-- Dialog Content -->
      <VCard title="Privacy Policy">
        <VCardText>
          Tu has seleccionado este día {poesia} te llamara el equipo técnico para informarte del siguiente paso.
          Estas de acuerdo pues acepta y dale a sig
        </VCardText>
  
        <VCardText class="d-flex justify-end">
          <VBtn @click="isDialogVisible = false">
            {{ text.button[1] }} -&gt;
          </VBtn>
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template>

<style lang="scss" scoped>
:deep(.fc){
  .fc-button-primary{
    background-color: blue !important;
    border-color: white !important;
  }
  
  .fc-icon{
    font-size: 15px;
    line-height: 7px;
  }
  
  .fc-toolbar-title {
    font-size: 16px;
  }
}
</style>