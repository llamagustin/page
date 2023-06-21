<script setup lang="ts">
import {defineProps, onMounted, watch, computed} from 'vue'

export interface EjemploProps {
  token?: string
  
}

const props = withDefaults(defineProps<EjemploProps>(), {
  token: 'default'
})

onMounted(()=>{
  console.log('init', props)
})

watch(props,(val)=>{
  console.log('watch',props)
})

const cambio = computed(()=>{
  return props.token + ' agrego esto'
})
  
  
const numeros:string[]=['uno','dos','tres']

const handleEventClick= (dato)=>{
  console.log('click',dato)
  emit('clickEjemplo',dato)
}

interface Emits {
  (e: 'clickEjemplo', value): void;
}

const emit = defineEmits<Emits>()

</script>


<template>
  <div> 
  
  <div v-for="n in numeros">
   <Button @click="handleEventClick(n)" type="button">{{n}}</Button>  
  </div>
  
  
  </div>
  
</template>

