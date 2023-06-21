<script lang="ts" setup>
//import { cities, codes, provinces } from "@/@fake-db/data/address.ts";
//import { services } from "@/@fake-db/services";
import mastercard from "@/assets/images/icons/payments/mastercard.png";
import visa from "@/assets/images/icons/payments/visa.png";

import PlanDetails from "./PlanDetails.vue";



interface Emit { 
   (e: 'updateLead', value: any): void
 }

const emit = defineEmits<Emit>()

interface Props {
  userData: {
    notification: Array<object>
    plan: { payment:Array<object> }
    
  }
}
const props = defineProps<Props>()


const tools = ref(JSON.parse(localStorage.dataTools) || [])
  



const lastUpgrade = ref();

function isObject(val) {
    return Object.prototype.toString.call(val) === "[object Object]";
}

const upgradePlan=(data:object)=>{
  if(isObject(props.userData.plan)==false) props.userData.plan ={};
  props.userData.plan[data.tag] = data
  lastUpgrade.value=Date.now();
  
  emit('updateLead',{...props.userData})
}

const activePlans = computed(()=>{
    let hora= lastUpgrade.value;
    let plans= props.userData.plan;
     
    const servicios=tools.value.map(s=>{
      return {
        tag:s.tag,
        image:s.image,
        subtitle:s.subtitle,
        costo:s.cost,
        beneficios:s.benefits,
        db: plans[s.tag] || {activo:false}
      }})
  
    
    return servicios.sort((a,b)=> b.db.activo - a.db.activo);

})




</script>

<template>

  <VRow>
    
    
    <!-- 👉 Current Plan -->
    <VCol cols="12">
      <VCard title="Current Plan">
        <VCardText>
          <VRow>
          <template v-for="s in activePlans">
            <PlanDetails @upgradePlan="upgradePlan" :Plan="s"  ></PlanDetails>
          </template>
          </VRow>
        </VCardText>
        
      </VCard>
    </VCol>


    
    
  </VRow>
</template>

<style lang="scss">
.pricing-dialog {
  .pricing-title {
    font-size: 1.5rem !important;
  }

  .v-card {
    border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    box-shadow: none;
  }
}

</style>
