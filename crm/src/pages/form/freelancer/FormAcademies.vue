
<script setup lang="ts">
import { ref,computed, watch } from 'vue'
import {  textForm02 } from './text.js'
import titulacion from './titulacion.json'

interface Props {
  dataForm: any
  show: any
}

const props = defineProps<Props>()

const newData = ref({
      degree: '',
      institution: '',
      startDate: '',
      endDate: ''
    });

const dialog = ref(false)

const text = textForm02

const titles=titulacion.records.map(r=> r[1]);

const saveData=()=>{
  props.dataForm.academies.push({...newData.value})
  dialog.value=false
}

if(!props.dataForm.academies.length){
  dialog.value=true;
}

watch(dialog,val=>{
  
  newData.value.degree='';
  newData.value.institution='';
  newData.value.startDate='';
  newData.value.endDate='';
  
  
})

const rules = {
  required : (v) => { return !!v || 'Required *' },
  mayorQue : v => {
    let aplica=!!v || 'Fecha';
    
    return aplica
  }
}

const isValid=ref(false)

const acepted = computed(()=>{
  let {institution = '',degree = '', startDate,endDate} = newData.value

 institution= !isEmpty(institution,3)
 degree = !isEmpty(degree)
 startDate=isDate(startDate)
 endDate=isDate(endDate)

 isValid.value=institution && degree && startDate && endDate;
 
 return {institution,degree,startDate,endDate}

})

const isEmpty = (str: string, minLength: number = 1) => {
  return ((str || '').trim().length || 0) < minLength;
};

function isDate(val) {
  const date = new Date(val);
  if (isNaN(date.getTime())) { // si la fecha es inválida, getTime() devolverá NaN
    return false;
  } else {
    return date.getFullYear() >= 1950;
  }
}



</script>


<template>
  <div>
    
  <div class="text-center">
    <v-dialog v-model="dialog" width="600px" transition="dialog-top-transition" >
      <v-card>
        <v-card-title>
          <div class="flex space-x-4">
            <span class="flex-1">Ingrese los datos del estudio</span>
            <v-btn class="flex-2" small variant="text"  @click="dialog = false">Cerrar</v-btn>
            <v-btn :disabled="!isValid" class="flex-2" variant="text"  @click="saveData">Agregar</v-btn>
          </div>
        </v-card-title>
        <v-card-text class="mb-5">
          <div class="grid grid-cols-8 ">
            <div class="col-span-6 sm:col-span-3">
              <label class="block text-sm font-medium mb-1" > Institución 
              <span v-if="!acepted.institution" class="text-rose-500">*</span>
              </label>
              <v-text-field :rules="[rules.required]" v-model="newData.institution" class="input w-full" type="text"  />
            </div>
            <div class="col-span-8">
              <label class="block text-sm font-medium mb-1" > Grado Academico 
                <span v-if="!acepted.degree" class="text-rose-500">*</span>
              </label>
              <v-autocomplete v-model="newData.degree" :items="titles" />
            </div>

            <div class="flex space-x-4">
              <div class="flex-1 col-span-6 sm:col-span-3">
                <label class="block text-sm font-medium mb-1" > Fecha de inicio 
                <span v-if="!acepted.startDate" class="text-rose-500">*</span>
                </label>
                <v-text-field  :rules="[rules.required]"  v-model="newData.startDate" class="input w-full" type="date" />
              </div>
              <div class="flex-1 col-span-6 sm:col-span-3">
                <label class="block text-sm font-medium mb-1" > Fecha de finalización 
                  <span v-if="!acepted.endDate" class="text-rose-500">*</span>
                </label>
                <v-text-field  :rules="[rules.mayorQue]" v-model="newData.endDate" class="input w-full" type="date" />
              </div>
            </div>
          </div>

        </v-card-text>
      </v-card>
    </v-dialog>
  </div>

  <h1 class="text-3xl text-slate-800 font-bold mb-6"> {{ text.title }} </h1>
    
    <!-- Form -->
    
    <form>
      <div class="flex items-center justify-between mb-5">
        <div>
          
          <v-btn size="small"  variant="text" @click="show(2)">&lt; {{ text.button[0] }}</v-btn>
        </div>
        
        <div class="ml-auto">
          <v-btn size="small"  variant="text" @click="dialog = true"> + Agregar</v-btn>
        
        </div>
        <div class=" ml-auto" >
          <v-btn size="small" :disabled="!dataForm.academies.length" variant="text" @click="show(4)">{{ text.button[1] }} &gt;</v-btn>
        </div>
      </div>
    </form>
    
    <div  style="min-height:200px" >
      <table v-for="academy in props.dataForm.academies" class="w-full mt-5">
        <tr style="border-bottom:1px solid #ddd">
          <td style="width:130px"><b>Institución</b></td>
          <td>{{academy.institution}}</td>
        </tr>
        <tr style="border-bottom:1px solid #ddd">
          <td><b>Titulo Obtenido</b></td>
          <td>{{academy.degree}}</td>
        </tr> 
        <tr>
          <td></td>
          <td>Del {{academy.startDate}}  Hasta {{academy.endDate}}</td>
        </tr>
      </table>
      <div v-if="!dataForm.academies.length">
        <p>Si eres un freelancer, es importante completar toda la información en tu perfil, especialmente la sección de "Estudios Realizados". Al proporcionar detalles sobre tus estudios, puedes demostrar a los clientes que tienes las habilidades necesarias para el trabajo y atraer trabajos mejor remunerados.</p>
      </div>
    </div>
    
    
    
  </div>
</template>
