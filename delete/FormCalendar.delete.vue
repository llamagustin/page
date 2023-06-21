
<script setup lang="ts">
import '@fullcalendar/core/vdom' // solves problem with Vite


import {  textForm05 } from './text.js'
//import { BCalendar } from 'bootstrap-vue'


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



//
const isDialogVisible = ref(false)

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