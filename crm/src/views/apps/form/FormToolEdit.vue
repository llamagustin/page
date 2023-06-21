<script setup lang="ts">
  // const tools = JSON.parse(localStorage.dataTools) || []
  import { useTools } from "@/shared/composables/useTools"
  const { tools } = useTools();

  interface Emit {
    (e: 'removeTool', value: number): void
    (e: 'changeTool', value: any): void
  }

  interface Props {
    totalLicense: number
    id: number
    resellers: any
    data: {
      title: string
      cost: number
      qty: number
      description: string
      type: string
      tag?: string
    }
  }

  const props = withDefaults(defineProps<Props>(), {})
  const emit = defineEmits<Emit>()
  const itemsTool = ref([])
  
  const selectedType = ref(props.data.type || typePayment[0]);
  const selectedQty = ref(props.data.qty || 1)
  
  const PRICES = {
    MIN:25,
    MEDIUM:32,
    MAX:42
  }
  
  const typePayment = [{
    title: 'Mensual',
    value: 'month'
  }, {
    title: 'Anual',
    value: 'anual'
  }]

  tools.value.map(x => {
    itemsTool.value.push({
      title: x.title,
      value: x.tag,
      description: x.description
    })
  })


  const calculatePrice = () => {
    var cost_license = PRICES.MAX
    let cost = 0;
    
    if (props.totalLicense > 15) {
      cost_license = PRICES.MIN
     
    }
    else if (props.totalLicense > 5) {
      cost_license = PRICES.MEDIUM
    }

    if (selectedType.value == 'anual') {
      cost = (cost_license * selectedQty.value) * 12
      // cost = cost_license * selectedQty.value * 0.9
    }
    else {
      console.log('costLicen',cost_license)
      cost = cost_license * selectedQty.value
      
      // cost = cost_license * selectedQty.value / 12
    }
    
    return cost.toFixed(2) + "€"
  }

  const selectedReseller = ref(null)

  const changePrice = () => {
    props.data.cost = calculatePrice()
    props.data.qty = parseInt(selectedQty.value)
    props.data.type = selectedType.value
    emit('changeTool', ({ index: props.id, data: props.data }))
  }

  watch(() => selectedQty.value, changePrice)
  watch(() => selectedType.value, changePrice)
  watch(() => props.data.type, (val) => selectedType.value = val)
  
  const removeTool = () => emit('removeTool', props.id)
  
  watch(selectedQty, (newValue) => {
    if(newValue >= 1) return;
    selectedQty.value = 1;
  })
  
  function getColorTools(title) {
    return tools.value.find(c => c.title == title )?.iconColor || 'inherit';
  }
</script>

<template>
  <VCard flat border class="d-flex flex-row">
    <!--:style="{ borderColor: getColorTools(data.title) }"-->
    <!-- 👉 Left Form -->
    <div class="pa-5 flex-grow-1">
      <VRow>
        <VCol cols="12" md="4">
          <!--<VSelect v-model="selectedTool" label="Tool" :items="itemsTool" return-object class="mb-3" readonly />-->
          <!--:item-text="text"-->
          <VTextField v-model="data.title" label="Tool" class="mb-3" readonly/>
        </VCol>
        <VCol cols="12" sm="2">
          <VTextField v-model="selectedQty" label="Licenses" class="mb-3" type="number" min="1" />
          <!--:rules="[rulesQty]"-->
        </VCol>
        <VCol cols="12" sm="2">
          <VTextField v-model="data.cost" label="Precio" readonly />
        </VCol>
        <VCol cols="12" :style="{marginTop: '-15px'}">
          <VTextarea v-model="data.description" rows="2" label="Description" placeholder="Description" />
        </VCol>
        <VCol cols="12" sm="5" class="ml-auto">
          <VSelect v-model="selectedType" label="Pago" :items="typePayment" class="mb-3" />
        </VCol>
        <VCol cols="12" sm="5">
          <VAutocomplete v-model="selectedReseller" label="Form to" :items="resellers" clearable clear-icon="tabler-x" autocomplete="none" />
        </VCol>
      </VRow>
    </div>
    
    <!-- 👉 Item Actions -->
    <div class="d-flex flex-column justify-space-between border-s pa-1">
      <VBtn icon size="x-small" color="default" variant="text" @click="removeTool" >
        <VIcon size="20" icon="tabler-x" />
      </VBtn>
    </div>
  </VCard>
</template>
