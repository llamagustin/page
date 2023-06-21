<script setup lang="ts">
import { ref,computed, watch } from 'vue'
import {  textUbiGeo } from './text.js'

interface Props {
  dataForm: any
  show: any
}

const countries = ['España']
const timezones = ["Pacific/Midway", "Pacific/Honolulu", "America/Anchorage", "America/Los_Angeles", "America/Phoenix", "America/Denver", "America/Mexico_City", "America/Chicago", "America/Regina", "America/Bogota", "America/New_York", "America/Caracas", "America/Halifax", "America/Santo_Domingo", "America/Puerto_Rico", "America/Argentina/Buenos_Aires", "America/Montevideo", "America/Santiago", "America/Godthab", "Europe/London", "Europe/Paris", "Africa/Cairo", "Europe/Moscow", "Asia/Dubai", "Asia/Kabul", "Asia/Tehran", "Asia/Yekaterinburg", "Asia/Kolkata", "Asia/Katmandu", "Asia/Dhaka", "Asia/Colombo", "Asia/Almaty", "Asia/Bangkok", "Asia/Shanghai", "Asia/Krasnoyarsk", "Asia/Irkutsk", "Asia/Yakutsk", "Asia/Tokyo", "Australia/Sydney", "Pacific/Guam", "Pacific/Auckland", "Pacific/Fiji", "America/Costa_Rica", "America/El_Salvador", "America/Guatemala", "America/Honduras", "America/Managua", "America/Panama"];


const props = defineProps<Props>()

const text= textUbiGeo

const fileFront = ref([])
const fileBack = ref([])

function convertToBase64(file, callback) {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    const base64String = btoa(reader.result)
    const header = `data:${file.type};base64,/9j/`
    const fullBase64String = header + base64String
    callback(fullBase64String)
  }
}

watch(fileFront, (val) => {
  convertToBase64(val[0], (result) => {
    props.dataForm.dni.front = result
  })
})

watch(fileBack, (val) => {
  convertToBase64(val[0], (result) => {
    props.dataForm.dni.back = result
  })
})

  function showImage(event, id) {
    var file = event.target.files[0];
    var reader = new FileReader();
    
    reader.onload = function(event) {
      document.getElementById(id).src = event.target.result;
    };
    
    reader.readAsDataURL(file);
  }


</script>
<template>
    <div>
        <h2 class="text-3xl text-slate-800 font-bold mb-6">
          {{ text.title }}
        </h2>
        <div class="flex items-center justify-between mb-5">
          <div><v-btn size="small"  variant="text" @click="show(1)">&lt; {{ text.button[0] }}</v-btn></div>
          <div  class="ml-auto"  >
            <v-btn size="small"  variant="plain" @click="show(3)">{{ text.button[1] }} &gt;</v-btn>
          </div>
        </div>
        
        <form>
      <div class="space-y-4 mb-8">

        <div class="flex space-x-4">
          <div class="flex-1" >
            <label class="block text-sm font-medium mb-1" >DNI Front </label>
              <v-file-input
                v-if="fileFront"
                @change="showImage($event, 'preview1')"
                v-model="fileFront"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="pick front document"
                prepend-icon="mdi-camera"
                label="Documento "></v-file-input>
              <div class="pa-2">
                <img style="max-width:175px; max-height:100px" id="preview1" src="">
              </div>
          </div>
          <div class="flex-1" >
            <label class="block text-sm font-medium mb-1" >DNI Back </label>
              <v-file-input
                v-if="fileBack"
                @change="showImage($event, 'preview2')"
                v-model="fileBack"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="pick front document"
                prepend-icon="mdi-camera"
                label="Back "></v-file-input>
                <div class="pa-2">
                  <img style="max-width:175px; max-height:100px" id="preview2" src="">
                </div>
          </div>
        </div>
        
        <div class="flex space-x-4">

          <div class="flex-1" >
            <label class="block text-sm font-medium mb-1" >Zona horaria </label>
            <v-select v-model="dataForm.timezone" :items="timezones"  />
          </div>
          <div  class="flex-1">
            <label class="block text-sm font-medium mb-1" for="country" >
              {{ text.label.country }} 
            </label>
            <v-select v-model="dataForm.address.country" :items="countries"  />
          </div>
        </div>

        <div class="flex space-x-4">
          <div class="flex-1">
            <label class="block text-sm font-medium mb-1" for="city" >
              {{ text.label.city }} 
            </label>
            <v-text-field id="city" v-model="dataForm.address.city" class="input w-full" type="text"  />
          </div>
          <div class="flex-1">
            <label class="block text-sm font-medium mb-1" for="postal-code" >
              {{ text.label.postalCode }} 
            </label>
            <v-text-field id="postal-code" v-model="dataForm.address.postalCode" class="input w-full" type="text" />
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-1" for="street" >
            {{ text.label.streetAddress }} 
          </label>
          <v-text-field id="street" v-model="dataForm.address.line" class="input w-full" type="text" />
        </div>
        
      </div>

    </form>
    </div>
</template>