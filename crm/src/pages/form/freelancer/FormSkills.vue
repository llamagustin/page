<script setup lang="ts">
import {ref} from 'vue'
import {  textForm04 } from './text.js'

const categories=["Desarrollo web", "Diseño gráfico", "Marketing digital", "Redacción de contenido", "Traducción", "Desarrollo móvil", "Desarrollo de software", "Gestión de proyectos", "Bases de datos", "SEO y SEM", "Análisis de datos", "Administración de sistemas", "Soporte técnico", "Escritura creativa", "Edición de vídeo", "Fotografía", "Diseño de producto", "Arquitectura", "Diseño de interiores"]


interface Props {
  dataForm: any
  show: any
}

const newData=ref({
  category:'',
  skill:''
})

const dialog=ref(false)
const props = defineProps<Props>()
const text = textForm04

const saveData=()=>{
  let skill= props.dataForm.skills[newData.value.category] || []
  
  skill.push(newData.value.skill)
  
  props.dataForm.skills[newData.value.category]=skill
  dialog.value=false
  newData.value.category=''
  newData.value.skill=''
  
}

if(!Object.keys(props.dataForm.skills).length){
  dialog.value=true;
}

const isValid=computed(()=>{
  let aplica = Object.keys(props.dataForm.skills).length>0
  
  return aplica
})

const canSave=ref(false)

const accepted = computed(()=>{
  let {skill,category} = newData.value;
  
  skill=!isEmpty(skill,2)
  category = !isEmpty(category)
  
  canSave.value= skill && category
  
  return {skill,category}
})

const isEmpty = (str: string, minLength: number = 1) => {
  return ((str || '').trim().length || 0) < minLength;
};

</script>

<template>
  <div>
    
    <v-dialog v-model="dialog" width="600px" transition="dialog-top-transition" >
      <v-card>
      <v-card-title>
        <div class="flex space-x-4">
          <span class="flex-1"> Habilidades</span>
          
          <v-btn class="flex-2"  variant="text"  @click="dialog = false">Cerrar</v-btn>
          <v-btn :disabled="!canSave" class="flex-2" variant="text"   @click="saveData">Agregar</v-btn>
        </div>
      </v-card-title>
      <v-card-text>
        <div class="grid grid-cols-8 mb-5">
          <div class="col-span-8">
            <label class="block text-sm font-medium mb-1">Categoria
              <span v-if="!accepted.category" class="text-rose-500">*</span>
            </label>
            <v-select v-model="newData.category" :items="categories" class="w-full"></v-select>
          </div>  
  
          <div class="col-span-6 sm:col-span-3">
            <label class="block text-sm font-medium mb-1" > Habilidad 
            <span v-if="!accepted.skill" class="text-rose-500">*</span>
            </label>
            <input  v-model="newData.skill" class="form-input w-full" type="text" >
          </div>
          
        </div>
        
	    </v-card-text>

      </v-card>
    </v-dialog>
    
    
    <h1 class="text-3xl text-slate-800 font-bold mb-6">
      {{ text.title }}
    </h1>
    <!-- Form -->
    
    <div class="flex items-center justify-between mb-5 ">
        <div><v-btn size="small"  variant="text" @click="show(4)">&lt; {{ text.button[0] }}</v-btn></div>
        <div class="ml-auto">
          <v-btn size="small"  variant="text" @click="dialog = true"> + Agregar</v-btn>
        </div>
        <div class=" ml-auto" >
          <v-btn size="small" :disabled="!isValid" variant="text" @click="show(6)">{{ text.button[1] }} &gt;</v-btn>
        </div>
      </div>
    <form>
      <div style="min-height:200px">
      <div v-for="(items, category) in props.dataForm.skills" :key="category">
       <h3>{{ category }}</h3>
        <ul>
          <li v-for="item in items" :key="item">
            <div class="block-icon">
              <i class="iconify" aria-hidden="true" data-icon="fa-solid:check"></i>
            </div>
            <span>✔ {{ item }}</span>
          </li>
        </ul>
      </div>
      
      <div v-if="!isValid">
        <p>Aquí puedes resaltar las habilidades y conocimientos que posees y que te hacen destacar entre los demás profesionales. Asegúrate de incluir habilidades relevantes para el trabajo que buscas y proporcionar ejemplos de cómo las has utilizado en proyectos anteriores. Si tienes habilidades que son más específicas o únicas, asegúrate de destacarlas para atraer la atención de clientes potenciales</p>
      </div>
      
      </div>

    </form>
  </div>
</template>

