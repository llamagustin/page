<script setup lang="ts">
import {onMounted} from 'vue'
import {  textForm05 } from './text.js'

const text = textForm05
const { dataForm, submit } = defineProps<{dataForm:any, show: any, submit: any }>();

onMounted(()=>{
  submit()
})

</script>


<template>
  <div class="bg-white">
    <div class="text-center">
      <svg class="inline-flex w-16 h-16 fill-current mb-2" viewBox="0 0 64 64">
        <circle class="text-indigo-100" cx="32" cy="32" r="32" />
        <path class="text-indigo-500" d="m28.5 41-8-8 3-3 5 5 12-12 3 3z" />
      </svg>
      <div >
         <p>¡Gracias por unirte a nuestra plataforma! Sabemos que tienes muchas opciones para trabajar como freelancer, y apreciamos que hayas elegido registrarte con nosotros. Nos comprometemos a proporcionarte una plataforma segura y confiable para encontrar trabajos y conectarte con clientes potenciales en todo el mundo. Si tienes alguna pregunta o inquietud, no dudes en ponerte en contacto con nuestro equipo de soporte. ¡Bienvenido y buena suerte en tus proyectos!</p>
      </div>
      <h1 class=" text-3xl text-slate-800 font-bold mb-8">
        {{ text.title }}
      </h1>
      <div>
        <v-btn v-if="false" class="btn-blue" @click="submit"> {{ text.button[0] }}</v-btn>
      </div>
    </div>
  </div>
</template>

