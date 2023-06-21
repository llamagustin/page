
<script setup lang="ts">
import {ref,computed} from 'vue'
import {  textForm03 } from './text.js'
import positions from './positions.js'

interface Props {
  dataForm: any
  show: any
}

const props = defineProps<Props>()

const newData = ref({
  company: "",
  startDate: "",
  endDate: "",
  position: "",
  description: ""
  })

const text = textForm03
const dialog=ref(false)

const saveData=()=>{
  props.dataForm.experiences.push(newData.value)
  dialog.value=false
}

if(!props.dataForm.experiences.length){
  dialog.value=true;
}

const isValid=computed(()=>{
  let aplica = props.dataForm.experiences.length>0
  
  return aplica
})

const canSave = ref(false)
const accepted = computed(()=>{
  let { company, position, startDate,endDate, description } = newData.value
  
  company = !isEmpty(company,2)
  position= !isEmpty(position)
  description = !isEmpty(description,3)
  startDate= isDate(startDate)
  endDate=isDate(endDate)
  
  canSave.value= company && position && description && startDate && endDate
  
  return {company,position,description,startDate,endDate}
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
    <v-dialog v-model="dialog" width="600px" transition="dialog-top-transition" >
      <v-card>
        <v-card-title>
        
          <div class="flex space-x-4">
            <span class="flex-1"> Experiencia Laboral</span>
            
            <v-btn class="flex-2"  variant="text"  @click="dialog = false">Cerrar</v-btn>
            <v-btn :disabled="!canSave" class="flex-2" variant="text"   @click="saveData">Agregar</v-btn>
          </div>
        
        </v-card-title>
        <v-card-text>
      <div class="grid grid-cols-8 ">
        <div class="col-span-8">
          <label class="block text-sm font-medium mb-1" > Empresa 
            <span v-if="!accepted.company" class="text-rose-500">*</span>
          </label>
          <input  v-model="newData.company" class="form-input w-full" type="text" >
        </div>
        <div class="col-span-6 sm:col-span-3">
          <label class="block text-sm font-medium mb-1" > Cargo 
            <span v-if="!accepted.position" class="text-rose-500">*</span>
          </label>
          <input v-if="false"  class="form-input w-full" type="text" >
          <v-autocomplete v-model="newData.position" :items="positions" />
        </div>

        <div class="col-span-8">
          <label class="block text-sm font-medium mb-1" > Descripción 
            <span v-if="!accepted.description" class="text-rose-500">*</span>
          </label>
          <textarea  v-model="newData.description" class="form-input w-full"></textarea>
        </div>

        <div class="flex space-x-4">
          <div class="flex-1 col-span-6 sm:col-span-3">
            <label class="block text-sm font-medium mb-1" > Fecha de inicio 
              <span v-if="!accepted.startDate" class="text-rose-500">*</span>
            </label>
            <input  v-model="newData.startDate" class="form-input w-full" type="date" >
          </div>
          <div class="flex-1 col-span-6 sm:col-span-3">
            <label class="block text-sm font-medium mb-1" > Fecha de finalización 
              <span v-if="!accepted.endDate" class="text-rose-500">*</span>
            </label>
            <input  v-model="newData.endDate" class="form-input w-full" type="date" >
          </div>
        </div>

        

      </div>
	  </v-card-text>
        
      </v-card>
    </v-dialog>

    <h1 class="text-3xl text-slate-800 font-bold mb-6">
      {{ text.title }}
    </h1>
    <!-- Form -->
    
     <div class="flex items-center justify-between mb-5">
        <div><v-btn size="small"  variant="text" @click="show(3)">&lt; {{ text.button[0] }}</v-btn></div>
        <div class="ml-auto">
          <v-btn size="small"  variant="text" @click="dialog = true"> + Agregar</v-btn>
        </div>
        <div class=" ml-auto" >
          <v-btn size="small" :disabled="!isValid" variant="text" @click="show(5)">{{ text.button[1] }} &gt;</v-btn>
        </div>
      </div>
    
    <form>
      <div  style="min-height:200px" >
        <table v-for="info in props.dataForm.experiences" class="w-full mt-5">
          <tr style="border-bottom:1px solid #ddd">
            <td style="width:130px"><b>Company</b></td>
            <td>{{info.company}}</td>
          </tr>
          <tr style="border-bottom:1px solid #ddd">
            <td><b>Position</b></td>
            <td>{{info.position}}</td>
          </tr> 
          <tr style="border-bottom:1px solid #ddd">
            <td><b>Description</b></td>
            <td>{{info.description}}</td>
          </tr> 
          <tr>
            <td></td>
            <td>Del {{info.startDate}}  Hasta {{info.endDate}}</td>
          </tr>
        </table>
        
        <div v-if="!isValid">
          <p>La sección es esencial en el perfil de un freelancer, ya que aquí puedes mostrar tus habilidades y experiencia previa. Debes proporcionar detalles sobre tus trabajos anteriores y destacar tus responsabilidades y logros. Si tienes experiencia relevante, asegúrate de enfatizarla para impresionar a los clientes potenciales. En resumen, es una oportunidad para destacar tus habilidades y experiencia.</p>
        </div>
        
      </div>


     
    </form>
  </div>
</template>
