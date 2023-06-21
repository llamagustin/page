<script lang="ts" setup >
interface Emit {
  (e: "upgradePlan", val: any): void;
}

const emit = defineEmits<Emit>();

interface iPlan{
    image:string
    subtitle:string
    costo:number
    tag:string
    db:object
  }


interface Props {
  Plan: iPlan
}
const props = defineProps<Props>()

const plan = {...props.Plan};

const isDialogVisible = ref(false);

const upgradePlan=(data:any )=>{
  
  emit('upgradePlan',data)
}

function diasTranscurridos(fecha1:Date):number {
  let diferenciaEnMilisegundos = new Date().getTime() - fecha1.getTime();
  let diasTranscurridos = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);
  return parseInt(diasTranscurridos.toString());
}

const activePlan = computed(()=>{
  let plan:any=props.Plan.db;
  if(plan.tag){
    let fecha = new Date(plan.createdAt);
    plan.dias= diasTranscurridos(fecha);
    plan.faltan=30-plan.dias;
    plan.diasPercent= (plan.dias/30)*100;
    fecha.setDate(fecha.getDate() + 30);
    plan.vigente = fecha.toLocaleDateString('es-ES', { month: 'short', day: '2-digit', year: 'numeric' });
    
    plan.activo=true;
  }
  return plan;
})



</script> 
<template>
  <VCol cols="12" :md=" activePlan.activo ? 12 : 6">
    <VCard color="#f5f5f5" elevation="3" class="mb-3" >
    <VCardTitle> 
      <VRow no-gutters>
        <VCol cols="12" md="8" class="d-flex">
          <span>{{ plan.subtitle }}</span>
        </VCol>
         <VCol cols="12" md="4" class="d-flex">
           <VSpacer />
          <VBtn color="primary" @click="isDialogVisible=!isDialogVisible" variant="text" > {{ activePlan.activo ? 'Mejorar' : 'Activar' }} </VBtn>
          <VImg  :src="plan.image" style="width:32px; height:32px;" />
        </VCol>
    </VRow>
    </VCardTitle>
    <VDivider />
    <VCardText>
      <VRow v-if="activePlan.activo === true">
        <VCol cols="12" md="6">
          <div >
            <div class="mb-6">
              <h3 class="text-base font-weight-medium mb-1">
                Tu plan actual es {{activePlan.tipo}}
              </h3>
              <p class="text-base">Un inicio fácil para todo el mundo</p>
            </div>

            <div class="mb-6">
              <h3 class="text-base font-weight-medium mb-1">
                Activo hasta {{activePlan.vigente}}
              </h3>
              <p class="text-base">
                Le enviaremos una notificación cuando su Suscripción haya expirado
              </p>
            </div>

            <div>
              <h3 class="text-base font-weight-medium mb-1">
                <span class="me-3">${{activePlan.costo}} Mensual</span>
                <VChip color="primary" size="small" label> Popular </VChip>
              </h3>
              <p class="text-base mb-0">
                Plan Estándar ara pequeñas y medianas empresas
              </p>
            </div>
          </div>
        </VCol>
        <VCol cols="12" md="6">
          <VAlert color="warning" variant="tonal">
            <VAlertTitle class="mb-1"> Queremos tu atención! </VAlertTitle>

            <span>Tu plan necesita una actualización</span>
          </VAlert>

          <!-- progress -->
          <h6 class="d-flex font-weight-semibold text-base mt-4 mb-2">
            <span>Días</span>
            <VSpacer />
            <span>{{activePlan.dias}} de 30 Días</span>
          </h6>

          <VProgressLinear color="primary" rounded height="12" :model-value="activePlan.diasPercent" />

          <p class="text-base mt-2 mb-0">
            Restan {{activePlan.faltan}} días hasta que su plan necesite de actualización
          </p>
        </VCol>
      </VRow>
      <VRow v-else>
        <VCol cols="12">
          <VAlert color="info" variant="tonal">
            <VAlertTitle class="mb-1"> Queremos tu atención! </VAlertTitle>

            <span>No tienes un plan ACTIVO, solo tiene los beneficios esenciales.</span>
          </VAlert>
        </VCol>
      </VRow>
      
      <AccountUpgradePlan @upgradePlan="upgradePlan" :optsSelected="{newPlanTag:plan.tag}" @update:isDialogVisible="isDialogVisible=!isDialogVisible"  :isDialogVisible="isDialogVisible" />
    </VCardText>
    
  </VCard>
  </VCol>
</template>
