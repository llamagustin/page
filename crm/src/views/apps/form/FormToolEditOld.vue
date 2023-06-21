<!-- eslint-disable vue/no-mutating-props -->
<script setup lang="ts">
//import {services} from '../../.././@fake-db/services.ts';
const tools = JSON.parse(localStorage.dataTools) || []
  
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
  }
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<Emit>()

// console.log('t', tools.value[0].title)

// console.log('All Prop DATA: ',props.data);



const typePayment = [{
  title: 'Mensual',
  value: 'month'
},{
  title:'Anual',
  value:'anual'
}]


// if
const selectedType = ref(props.data.type || typePayment[0]);
const selectedQty= ref(props.data.qty || 1)
// selectedType.value = typePayment[0];

const itemsTool = ref([])

tools.map(x => {
  itemsTool.value.push({
    title: x.title,
    value: x.tag,
    description: x.description
  })
})


 
const calculatePrice = () => {
  var cost_license = 40
  let cost = 0;
  if(props.totalLicense >= 15){ // 0-5
    cost_license = 25 
  }else if(props.totalLicense > 5){ //0-5
    cost_license = 33 
  }
  
  if(selectedType.value == 'anual'){
    cost = cost_license * selectedQty.value * 0.9
  }else{
    cost = cost_license * selectedQty.value / 12
  }
  return cost.toFixed(2) + "€"
}



const selectedTool = ref({})

var index = itemsTool.value.findIndex(x => x.title == props.data.title)
if(index>-1){
  selectedTool.value = itemsTool.value[index]
}else{
  selectedTool.value = itemsTool.value[0]
  // props.data.title = selectedTool.value.title
  props.data.description = selectedTool.value.description
  
  props.data.cost = calculatePrice()
}



// const toolCategory = [{
//   title: 'Starter',
//   value: 'starter'
// },{
//   title: 'Profesional',
//   value: 'profesional'
// },{
//   title: 'Startup',
//   value: 'startup'
// }]










const selectedReseller = ref(null)

watch(props.resellers, val => {
  console.log('val', val)
})





const changePrice = () => {
  console.log('change', props.id)
  props.data.title = selectedTool.value.title
  props.data.description = selectedTool.value.description
  props.data.cost = calculatePrice()
  
  props.data.qty = parseInt(selectedQty.value)
  props.data.type = selectedType.value
  
  emit('changeTool', ({index: props.id, data: props.data}))
}


// watch(selectedTool, () => {
  // console.log('selected', selectedTool.value)
  // props.data.title
  
  // var cost = selectedTool.value
  
  // console.log('cost frekrfnm', cost)
  
  // console.log('selec', selectedTool.value)
  
  // props.data.title = structuredClone(toRaw(selectedTool.value.title));
  // props.data.title = structuredClone(toRaw(selectedTool.value.title))
  // props.data.description = structuredClone(toRaw(selectedTool.value.resume))
  // props.data.title = selectedTool.value.title
  // props.data.description = selectedTool.value.description
  // props.data.cost = '41.67€'
  // props.data.qty = 1
  // props.data.qty = 'month'
  // props.data.title = structuredClone(toRaw(selectedTool.value.title))
  // props.data.category = selectedCategory.value
  
//   changePrice()
// })



// watch(selectedQty, () => {
// changePrice()
// })


watch(() => selectedTool.value, changePrice)
watch(() => selectedQty.value, changePrice)
watch(() => selectedType.value, changePrice)

//
watch(() => props.data.type, (val) => {
  selectedType.value = val
})

var rulesQty =  [
  (value) => !!value || false,
  (value) => value >= 1 || true,
]
// const verifCant = () =>{
//   const input = document.getElementById('userCant') as HTMLInputElement | null
  
//   if(input.value!=''){
//     let newValue = input.value;
    
//     newValue = newValue.split('');
    
//     let newText = '';
    
//     let cont = 0;
//     for(let i =0; i<newValue.length;i++){
//       cont++;
//       if(!isNaN(newValue[i])){
//         if(cont==1){
//           if(newValue[i]>0){
//             newText += newValue[i];
//           }
//         }else{
//           newText += newValue[i];
//         }
//       }else{
//         delete newValue[i];
//       }
//     }
    
//     selectedQty.value = newText;
//     input.value = newText;
//     // console.log(selectedQty.value);
//   }
    
// }

// watch(selectedType, () => {
//   changePrice()
// })


watch(selectedReseller, () => {
  console.log('11 sele reseller', selectedReseller.value)
})


const removeTool = () => {
  emit('removeTool', props.id)
}


</script>

<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <!--<div class="add-products-header mb-2 d-none d-md-flex">-->
  <!--  <VRow class="font-weight-medium px-4">-->
  <!--    <VCol-->
  <!--      cols="12"-->
  <!--      md="9"-->
  <!--    >-->
  <!--      <span class="text-sm">-->
  <!--        Servicio-->
  <!--      </span>-->
  <!--    </VCol>-->
  <!--    <VCol-->
  <!--      cols="12"-->
  <!--      md="2"-->
  <!--    >-->
  <!--      <span class="text-sm">-->
  <!--        Total-->
  <!--      </span>-->
  <!--    </VCol>-->
  <!--  </VRow>-->
  <!--</div>-->

  <VCard
    flat
    border
    class="d-flex flex-row"
  >
    <!-- 👉 Left Form -->
    <div class="pa-5 flex-grow-1">
      <VRow>
        <VCol cols="12" md="4" >
          <VSelect
            v-model="selectedTool"
            label="Tool"
            :items="itemsTool"
            return-object
            class="mb-3"
            readonly
          />
          <!--:item-text="text"-->
        </VCol>
        <VCol cols="12" sm="2">
          <VTextField
            v-model="selectedQty"
            label="Licenses"
            class="mb-3"
            type="number"
            min="1"
            :rules="[rulesQty]"
          />
        </VCol>
        <VCol cols="12" sm="2">
          <VTextField
            v-model="props.data.cost"
            label="Precio"
            readonly
          />
        </VCol>
        <VCol cols="12" :style="{marginTop: '-15px'}">
          <VTextarea
            v-model="props.data.description"
            rows="2"
            label="Description"
            placeholder="Description"
          />
        </VCol>
        <VCol cols="12" sm="5" class="ml-auto">
          <VSelect
            v-model="selectedType"
            label="Pago"
            :items="typePayment"
            class="mb-3"
          />
        </VCol>
        <VCol cols="12" sm="5">
          <VAutocomplete 
                v-model="selectedReseller"
                label="Form to"
                :items="props.resellers"
                clearable
                clear-icon="tabler-x"
                autocomplete="none"
          />
        </VCol>
      </VRow>
    </div>

    <!-- 👉 Item Actions -->
    <div class="d-flex flex-column justify-space-between border-s pa-1">
      <VBtn
        icon
        size="x-small"
        color="default"
        variant="text"
        @click="removeTool"
      >
        <VIcon
          size="20"
          icon="tabler-x"
        />
      </VBtn>
    </div>
  </VCard>
</template>
