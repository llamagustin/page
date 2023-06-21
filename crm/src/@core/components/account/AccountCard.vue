<script setup lang="ts">

function getCardType(cardNumber) {
  // Primeros dígitos del número de tarjeta para diferentes emisoras de tarjetas
  const visaPrefixes = ['4'];
  const mastercardPrefixes = ['51', '52', '53', '54', '55'];
  const amexPrefixes = ['34', '37'];
  const discoverPrefixes = ['6011', '622', '64', '65'];
  const jcbPrefixes = ['35'];

  // Verificar si el número de tarjeta comienza con un prefijo de Visa
  for (let prefix of visaPrefixes) {
    if (cardNumber.startsWith(prefix)) {
      return 'visa';
    }
  }

  // Verificar si el número de tarjeta comienza con un prefijo de Mastercard
  for (let prefix of mastercardPrefixes) {
    if (cardNumber.startsWith(prefix)) {
      return 'mastercard';
    }
  }

  // Verificar si el número de tarjeta comienza con un prefijo de American Express
  for (let prefix of amexPrefixes) {
    if (cardNumber.startsWith(prefix)) {
      return 'americanexpress';
    }
  }

  // Verificar si el número de tarjeta comienza con un prefijo de Discover
  for (let prefix of discoverPrefixes) {
    if (cardNumber.startsWith(prefix)) {
      return 'discover';
    }
  }

  // Verificar si el número de tarjeta comienza con un prefijo de JCB
  for (let prefix of jcbPrefixes) {
    if (cardNumber.startsWith(prefix)) {
      return 'jcb';
    }
  }

  // Si no se encontró ningún prefijo conocido, devolver "Desconocido"
  return 'visa';
}


interface Details {
  number: string
  name: string
  expiry: string
  cvv: string
  isPrimary: boolean
  type: string
}
interface Emit {
  (e: 'submit', value: Details): void
  (e: 'update', value: Details): void
  (e: 'update:isDialogVisible', value: boolean): void
}

interface Props {
  cardDetails?: Details
  isDialogVisible: boolean
  indice:number
}

const props = withDefaults(defineProps<Props>(), {
  cardDetails: () => ({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    isPrimary: false,
    type: '',
  }),
})

const emit = defineEmits<Emit>()

//const nueva=props.cardDetails.name=='';

const cardDetails = ref<Details>(structuredClone(toRaw(props.cardDetails)))

watch(props, () => {
  cardDetails.value = structuredClone(toRaw(props.cardDetails))
})

const formSubmit = () => {
  cardDetails.value.type=getCardType(cardDetails.value.number)
  
  emit('update:isDialogVisible', false)
  
  if(props.indice >= 0) 
    emit('update', cardDetails.value)
  else
    emit('submit', cardDetails.value )
}

const dialogModelValueUpdate = (val: boolean) => {
  emit('update:isDialogVisible', val)
}
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 600"
    :model-value="props.isDialogVisible"
    @update:model-value="dialogModelValueUpdate"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="dialogModelValueUpdate(false)" />

    <VCard class="pa-5 pa-sm-15">
      <!-- 👉 Title -->
      <VCardItem class="text-center">
        <VCardTitle class="text-h5 font-weight-medium mb-4">
          {{ props.cardDetails.name ? 'Editar Metodo de Pago' : 'Agregar Metodo de Pago' }}
        </VCardTitle>
        <p class="mb-0">
          {{ props.cardDetails.name ? 'Edit your saved card details' : 'Add your saved card details' }}
        </p>
      </VCardItem>

      <VCardText class="pt-6">
        <VForm @submit.prevent="() => {}">
          <VRow>
            
            <!-- 👉 Card Name -->
            <VCol  cols="12" >
              <VTextField v-model="cardDetails.name" label="Nombre" />
            </VCol>
            
            <!-- 👉 Card Number -->
            <VCol cols="12">
              <VTextField v-model="cardDetails.number" label="Number Tarjeta" type="text" pattern="[0-9]{16}" maxlength="16" />
            </VCol>

            <!-- 👉 Card Expiry -->
            <VCol cols="12" md="6" >
              <VTextField v-model="cardDetails.expiry"  label="Vencimiento MM/YY" type="text" />
            </VCol>

            <!-- 👉 Card CVV -->
            <VCol cols="12" md="6" >
              <VTextField v-model="cardDetails.cvv" type="text" pattern="[0-9]{5}" maxlength="5" label="Codigo CVV " />
            </VCol>

            <!-- 👉 Card Primary Set -->
            <VCol cols="12">
              <VSwitch
                v-model="cardDetails.isPrimary"
                label="Método de pago principal"
              />
            </VCol>

            <!-- 👉 Card actions -->
            <VCol cols="12" class="text-center" >
              <VBtn class="me-3" type="submit" @click="formSubmit" > Guardar </VBtn>
              <VBtn color="secondary" variant="tonal" @click="$emit('update:isDialogVisible', false)" > Cerrar </VBtn>
            </VCol>
            
          </VRow>
          
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
