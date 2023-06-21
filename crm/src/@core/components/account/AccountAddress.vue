<script setup lang="ts">
import { cities, codes, provinces } from "@/@fake-db/data/address.ts";


interface BillingAddress {
  companyName: string
  line: string
  country: string
  provincia: string
  city: string
  zipCode: string
}
interface Props {
  billingAddress: BillingAddress
  isDialogVisible: boolean
}

const props = defineProps<Props>()
var isUser=ref(false);

interface Emit {
  (e: 'update:isDialogVisible', value: boolean): void
  (e: 'submit', value: BillingAddress): void
}

const emit = defineEmits<Emit>()

const billingAddress = ref<BillingAddress>(structuredClone(toRaw(props.billingAddress)))

const resetForm = () => {
  emit('update:isDialogVisible', false)
  billingAddress.value = structuredClone(toRaw(props.billingAddress))
}

const onFormSubmit = () => {
  emit('update:isDialogVisible', false)
  emit('submit', billingAddress.value)
}

const dialogModelValueUpdate = (val: boolean) => {
  emit('update:isDialogVisible', val)
}

const computedCities = computed(()=>{
    const provincia = billingAddress.value.province
    
    if(isUser.value===true){
     billingAddress.value.city = ''
     billingAddress.value.zipCode = null
    }
    
    if(provincia === '') return []
    
    return cities.filter((item)=> String(item.value).startsWith(provincia))
})
const computedCode = computed(()=>{
     const city = billingAddress.value.city
     
     if(isUser.value===true) billingAddress.value.zipCode = ''
    
     if(city === '') return []
     
     return codes.filter((item)=> String(item.municipio_id) == city).map(item=> {
       return {
         value: item.codigo_postal,
         title: item.codigo_postal
       }
     })
})


watch(isUser,val=>{
  console.log(val)
})


</script>

<template>
  <VDialog :width="$vuetify.display.smAndDown ? 'auto' : 700" :model-value="props.isDialogVisible"
    @update:model-value="dialogModelValueUpdate"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="dialogModelValueUpdate(false)" />

    <VCard v-if="props.billingAddress"  class=" pa-5" >
      <!-- 👉 Title -->
      <VCardItem>
        <VCardTitle class="text-h5 text-center mb-2">
          Dirección de facturación
        </VCardTitle>
        <!-- 👉 Subtitle -->
        <p class="text-center">
          Edit Address for future billing
        </p>
      </VCardItem>

      <VCardText>
        <!-- 👉 Form -->
        <VForm @submit.prevent="onFormSubmit">
          <VRow>
            <!-- 👉 Company Name -->
            <VCol cols="12" >
              <VTextField v-model="billingAddress.companyName" label="Empresa" />
            </VCol>

            <!-- 👉 Country -->
            <VCol cols="12" md="6" >
              <VSelect    v-model="billingAddress.country" label="País" :items="['España']" />
            </VCol>

            <!-- 👉 State -->
            <VCol cols="12" md="6" >
              <VSelect @focus="isUser=true" @blur="isUser=false" @change="test" v-model="billingAddress.province" :items="provinces" label="Provincia" />
            </VCol>
            
            <!-- 👉 city-->
            <VCol  cols="12"  md="6">
              <VSelect @change="test" v-model="billingAddress.city" label="Ciudad" :items="computedCities" />
            </VCol>
              
            <!-- 👉 Zip Code -->
            <VCol cols="12" md="6" >
              <VSelect multiple v-model="billingAddress.zipCode" label="Zip Code" :items="computedCode" />
            </VCol>

            <!-- 👉 Billing Address -->
            <VCol cols="12">
              <VTextarea v-model="billingAddress.line"  rows="2" label="Dirección facturación" />
            </VCol>


            <!-- 👉 Submit and Cancel button -->
            <VCol cols="12" class="text-center" >
              <VBtn @click="onFormSubmit" class="me-3" > Guardar </VBtn>

              <VBtn variant="tonal" color="secondary"  @click="resetForm" >
                Cancel
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
