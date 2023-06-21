<script setup lang="ts">
import { watch } from 'vue'
import { textForm01 } from './text.js'

interface Props {
  dataForm: {
    name:string
  }
  show: any
}
const categories = [ "SITIO WEB Y SOFTWARE", "DISEÑO, MEDIOS" ,"ENTRADA DE DATOS" ]

const subCategories = {
    "SITIO WEB Y SOFTWARE": ["Arquitectura de software", "Desarrollo web", "Desarrollo de juegos", "Inteligencia artificial"],
    "DISEÑO, MEDIOS" : ["Diseño gráfico", "Diseño de sitios web", "Diseño de logotipos", "Illustrator"],
    "ENTRADA DE DATOS": ["Procesamiento de datos", "Soporte al cliente", "Microsoft Office", "Oficina general"]
}

const props = defineProps<Props>()
const text = textForm01
const countries = ['España']

const timezones = ["Pacific/Midway", "Pacific/Honolulu", "America/Anchorage", "America/Los_Angeles", "America/Phoenix", "America/Denver", "America/Mexico_City", "America/Chicago", "America/Regina", "America/Bogota", "America/New_York", "America/Caracas", "America/Halifax", "America/Santo_Domingo", "America/Puerto_Rico", "America/Argentina/Buenos_Aires", "America/Montevideo", "America/Santiago", "America/Godthab", "Europe/London", "Europe/Paris", "Africa/Cairo", "Europe/Moscow", "Asia/Dubai", "Asia/Kabul", "Asia/Tehran", "Asia/Yekaterinburg", "Asia/Kolkata", "Asia/Katmandu", "Asia/Dhaka", "Asia/Colombo", "Asia/Almaty", "Asia/Bangkok", "Asia/Shanghai", "Asia/Krasnoyarsk", "Asia/Irkutsk", "Asia/Yakutsk", "Asia/Tokyo", "Australia/Sydney", "Pacific/Guam", "Pacific/Auckland", "Pacific/Fiji", "America/Costa_Rica", "America/El_Salvador", "America/Guatemala", "America/Honduras", "America/Managua", "America/Panama"];

const languages=["Deutsch", "Български", "Čeština", "Hrvatski", "Dansk", "Slovenčina", "Slovenščina", "Español", "Eesti", "Suomi", "Français", "Ελληνικά", "Magyar", "English", "Gaeilge", "Italiano", "Latviešu", "Lietuvių", "Malti", "Nederlands", "Polski", "Português", "Română", "Svenska"]

const isValid = ref(false)
const errors=ref({})
const isEmpty = (str: string, minLength: number = 1) => {
  return ((str || '').trim().length || 0) < minLength;
};


const onValidate=()=>{
  let validations = [];
  let {name,about} = props.dataForm;
  
  errors.value['name']=isEmpty(name.name,2)
  errors.value['about']=isEmpty(about,10)
  
  validations.push(isEmpty(name.name,2))
  validations.push(isEmpty(about,10))
  
  
  isValid.value=!validations.includes(true)
}


onValidate();
watch(props,onValidate)

const validate= ()=>{
  if(isValid.value) show(2)
}

const rules = {
  required : (v) => { return !!v || 'Required *' }
}

</script>

<template>
  <div>
    <h3 class="text-3xl font-bold mb-5">
      {{ text.title }}
    </h3>
    
    <div class="flex items-center justify-between mb-5">
      <div  class="ml-auto"  >
        <v-btn size="small" :disabled="!isValid" variant="plain" @click="show(2)">{{ text.button[0] }} &gt;</v-btn>
      </div>
    </div>
    
    <!-- Form -->
    <form>
      <div class="space-y-4 mb-8">

        <div class="flex space-x-4">
          <!-- Company Name -->
          <div class="flex-1" >
            <label class="block text-sm font-medium mb-1" >
              Nombres <span v-if="errors.name" class="text-rose-500">*</span>
            </label>
            <v-text-field :rules="[rules.required]" v-model="dataForm.name.name" class="input w-full" type="text"  />
          </div>
          <div class="flex-1" >
            <label class="block text-sm font-medium mb-1" >
              Primer Apellido
            </label>
            <v-text-field :rules="[rules.required]"  v-model="dataForm.name.firstSurname" class="input w-full" type="text" ></v-text-field>
          </div>
          
        </div>
        <div class="flex space-x-4">
          <div class="flex-1" >
            <label class="block text-sm font-medium mb-1" >
              Segundo Apellido
            </label>
            <v-text-field v-model="dataForm.name.secondSurname" class="input w-full" type="text" />
          </div>
          <div class="flex-1" >
            <label class="block text-sm font-medium mb-1" >
              Portafolio
            </label>
            <v-text-field v-model="dataForm.profile" class="input w-full" type="text" />
          </div>
        </div>
        <div class="flex space-x-4">
          
        
          <div class="flex-1" >
            <label class="block text-sm font-medium mb-1" > Idioma </label>
            <v-select v-model="dataForm.language" :items="languages"  />
          </div>
          <div v-if="false" class="flex-1" >
            <label class="block text-sm font-medium mb-1" >Zona horaria </label>
            <v-select v-model="dataForm.timezone" :items="timezones"  />
          </div>

        </div>
        
        <div class="flex space-x-4">
          <div class="flex-1" >
            <label class="block text-sm font-medium mb-1" > Categoria </label>
            <v-select :rules="[rules.requiered]" v-model="dataForm.category" :items="categories"  />
          </div>
          <div class="flex-1" >
            <label class="block text-sm font-medium mb-1" >Sub Categoria</label>
            <v-select v-model="dataForm.subcategory" :items="subCategories[dataForm.category]"  />
          </div>
        </div>
        
        <div class="flex space-x-4">
          <div class="flex-1" >
            <label class="block text-sm font-medium mb-1" > 
              Sobre mí  <span v-if="errors.about" class="text-rose-500">*</span>
            </label>
            <v-textarea  v-model="dataForm.about" class="input w-full"></v-textarea>
          </div>
        </div>
        
        <div class="flex space-x-4">
          <div  class="flex-1">
            <label class="block text-sm font-medium mb-1" for="country" >
              Rango Salarial
            </label>
            <v-text-field id="postal-code" v-model="dataForm.salary" class="input w-full" type="text" />
          </div>
          
        </div>
        
       
      
      </div>

      

    </form>
  </div>
</template>

<style>

.v-field__outline__notch{
  border:none;
}
</style>