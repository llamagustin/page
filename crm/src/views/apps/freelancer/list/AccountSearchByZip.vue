<script setup lang="ts">
import flag from '@/assets/flagSpain.svg'

import type { VForm } from 'vuetify/components'
import VSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import axios from 'axios';
const axiosIns = axios.create({
  baseURL: "https://api.aythen.com",
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
});

interface Props {
  zip: string
}

interface Emit {
  (e: 'deleteZip', value: string): void
}


const props = defineProps<Props>()
const emit = defineEmits<Emit>()





// const emit = defineEmits<Emit>()

// 👉 address
// import { useUbigeo } from "@/shared/composables/useUbigeo"
// const { ubigeo, getCities, getCodes } = useUbigeo()

// const  ubi  = ref(ubigeo)

const zone = ref({
  country: 'spain',
  province: '',
  city: '',
  zip: '',
  line: ''
})



// const selectProvince = async (data) => {
//   //value
//   getCities(data.value)
//   // getCities(id)
//   zone.value.city = ''
//   zone.value.zip = ''
//   zone.value.line = ''
// } 


// const selectCity = async (data) => {
//   getCodes(data.value)
//   //
//   zone.value.zip = ''
//   zone.value.line = ''
// }

// const selectCode = async (data) => {
//   //
//   zone.value.line = ''
// }


// watch(zone.value, (data) => {
//   if(!data.province){
//     zone.value.city = ''
//     zone.value.zip = ''
//     zone.value.line = ''
//   }
  
// })



watch(() => props, (newValue) => {
    if(1){
      console.log('xip:', props.zip)
    }
});


// 👉 Store


const onSearch = async () => {
    var res = await axiosIns.get('/address/getter/code/' + props.zip.value)
    
    zone.value.province = res.data.province
    zone.value.city = res.data.city
    zone.value.zip = res.data.code
}

onSearch()
</script>

<template>
    <div class="pa-4">
        <VRow>
            <!-- 👉 Country -->
            <VCol cols="12">
              <div class="d-flex ">
                <p class="d-flex items-center mb-0">
                  <img :src="flag" :style="{width: '20px', height: '20px'}" />
                  <strong class="ms-2">España</strong>
                </p>
                <div class="ml-auto d-flex gap-2">
                  <VChip label size="small" color="primary" class="d-flex gap-2 text-capitalize text-xs">
                    {{props.zip.total}}
                    <VIcon icon="tabler-user" :size="14"></VIcon>
                  </VChip>
                  <VChip label size="small" class="text-capitalize text-xs">
                    {{zone.zip}} - {{zone.province}}
                  </VChip>
                </div>
              </div>
            </VCol>
          
            <VCol cols="12" >
              <div class="d-flex gap-2">
                 <div :style="{width: '100%'}">
                   <VTextField
                      :style="{width: '100%'}"
                      v-model="props.zip.value"
                      label="ZIP"
                    />
                    <label class="text-label">
                      {{zone.city}}
                    </label>
                 </div>
                 <VBtn @click="emit('deleteZip', zip.value)" color="error" >
                   <VIcon icon="tabler-trash" :size="22"></VIcon>
                 </VBtn>
              </div>
            </VCol>
        </VRow>
    </div>
</template>

<style lang="scss">
.text-label{
  font-size: 10px;
}
</style>