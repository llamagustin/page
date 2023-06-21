<script setup lang="ts">

import mastercard from '@/assets/images/icons/payments/mastercard.png';
import visa from '@/assets/images/icons/payments/visa.png';
import { useAccountListStore } from '@/views/apps/account/useAccountListStore';
//import { services } from '@/@fake-db/services'
import { cities, codes, provinces } from "@/@fake-db/data/address.ts";

const store = useAccountListStore();

const typeCards ={
  "visa":visa,
  "mastercard":mastercard
}

interface CardDetail {
  name: string
  number: string
  expiry: string
  isPrimary: boolean
  type: string
  cvv: string
  image: string
}


interface Props {
  accountData: {  }
}

const props = defineProps<Props>()




interface Emit {
   (e: 'updateCard', value:any): void
   (e: 'updateAccount', value:any): void
 }

const services = ref(JSON.parse(localStorage.dataServices || "[]"))

const emit = defineEmits<Emit>()

const isUpgradePlanDialogVisible = ref(false)

const currentCardDetails = ref()
const indice=ref(-1)
const isCardEditDialogVisible = ref(false)
const isCardAddDialogVisible = ref(false)
const isEditAddressDialogVisible = ref(false)

const openEditCardDialog = (cardDetails: CardDetail,currentIndex:number) => {
  indice.value=currentIndex
  currentCardDetails.value = cardDetails
  isCardEditDialogVisible.value = true
}

const creditCards = ref([])

creditCards.value=props.accountData.carddetails || [];

const currentBillingAddress=ref();
const defaultValuesBilling = ()=>{
  let { 
    companyName= '',
    line= '',
    country= 'España',
    province= '',
    city='',
    zipCode= [],
  } = props.accountData.addressbilling
  
  zipCode=[...zipCode];
  return {companyName,line,country,province, city, zipCode}
}

currentBillingAddress.value = defaultValuesBilling();

const updCard = (data:any)=>{
  creditCards.value[indice.value]=data;
  emit('updateCard',creditCards.value)
}

const submitCard= (data)=>{
  creditCards.value.push(data);
  
  emit('updateCard',creditCards.value)
  
}

const upgradePlan = async (data)=>{
  let account=props.accountData;
  
  account.plan.plan=data;
  
  await store.updateAccount(account);
}

const eliminarCard=(index:number)=>{
  creditCards.value.splice(index,1);
}

const submitBilling= async (data:any)=>{
  let account=props.accountData;
  currentBillingAddress.value=data;
  account.addressbilling=data;
  
  await store.updateAccount(account);
}

function diasTranscurridos(fecha1:Date):number {
  let diferenciaEnMilisegundos = new Date().getTime() - fecha1.getTime();
  let diasTranscurridos = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);
  return parseInt(diasTranscurridos.toString());
}

const activePlan = computed(()=>{
  let plan:any=props.accountData.plan.plan || {activo:false,tipo:'', vigente:'',costo:'',dias:0,faltan:0,diasPercent:0,benefits:[]};
  
  console.log('revisar',plan)
  
  if(plan.tag){
    let servicio=services.filter(s=> s.tag==plan.tag)[0]
    let fecha = new Date(plan.createdAt);
    plan.dias= diasTranscurridos(fecha);
    plan.faltan=30-plan.dias;
    plan.diasPercent= (plan.dias/30)*100;
    fecha.setDate(fecha.getDate() + 30);
    plan.vigente = fecha.toLocaleDateString('es-ES', { month: 'short', day: '2-digit', year: 'numeric' });
    plan.benefits=servicio.benefits[plan.tipo];
    plan.activo=true;
  } else {
    plan.activo=false
  }
  
  return plan;
})

const provinceText = computed(()=>{
  let cod =  currentBillingAddress.value.province || '';
  
  if(cod=='') return '';
  
  let p= provinces.filter(p=> p.value==cod)
  
  p=p[0] || {};
  
  return p.title;
  
})

const cityText = computed(()=>{
  let ciudad = currentBillingAddress.value.city || ''
  if(ciudad=='') return '';
  let c = cities.filter((item)=> item.value == ciudad)
  
  c=c[0] || {};
  
  return c.title;
})

const cancelPlan=async ()=>{
  let account = {...props.accountData}
  account.plan.plan={};
  await store.updateAccount(account);
}





/**************************/

const types=['New for you','Account activity','A new browser used to sign in','A new device is linked']





//notification
const notifications = ref([ 
    { t: 0, e: false, b: false,a: false},
    { t: 1, e: false, b: false,a: false},
    { t: 2, e: false, b: false,a: false},
    { t: 3, e: false, b: false,a: false },
]);


const getValue =(item:object) =>{
  let dbNotification =props.accountData.notification
  let aplica=Array.isArray(dbNotification);

  if(!aplica) return item

  let qr=dbNotification.filter(n=> n.t==item.t) ;
  if(qr.length==0) return item
  else return qr[0]
}



for (var i = 0; i < notifications.value.length; i++) {
  notifications.value[i] = getValue(notifications.value[i])
}


const saveNotifications=()=>{
  
  props.accountData.notification=notifications.value;
  
  emit('updateAccount', props.accountData);
  
}



</script>

<template>
  <VRow>
    <!-- 👉 Payment Methods -->
    <VCol cols="12">
      <VCard title="Metodos de Pago"> 
        <template #append>
          <VBtn prepend-icon="tabler-plus" size="small" @click="isCardAddDialogVisible = !isCardAddDialogVisible" >Tarjeta </VBtn>
        </template>

        <VCardText class="d-flex flex-column gap-y-4">
          <VCard :key="card.name" border flat v-for="(card,index) in creditCards" >
            <VCardText class="d-flex flex-sm-row flex-column pa-4">
              <div class="text-no-wrap">
                <VImg :src=" typeCards[card.type]"  :width="60" :height="25" />
                <h4 class="text-base my-3">
                  {{ card.name }}
                  <VChip
                    v-if="card.isPrimary"
                    label
                    color="primary"
                    size="small"
                  >
                    Primary
                  </VChip>
                </h4>
                <span class="text-body-1">**** **** **** {{ card.number.substring(card.number.length - 4) }}</span>
              </div>

              <VSpacer />

              <div class="d-flex flex-column text-sm-end gap-2">
                <div class="order-sm-0 order-1">
                  <VBtn variant="tonal" class="me-2" @click="openEditCardDialog(card,index)" > Editar </VBtn>
                  <VBtn color="secondary" variant="tonal" @click="eliminarCard(index)" > Eliminar </VBtn>
                </div>

                <span class="mt-auto order-sm-1 order-0">Card expires at {{ card.expiry }}</span>
              </div>
            </VCardText>
          </VCard>
          
        </VCardText>
      </VCard>
    </VCol>
    
    <VCol cols="12">
      <VCard class="user-tab-notification">
        <VCardItem>
          <VCardTitle>Notifications</VCardTitle>
          <p class="text-sm mt-2 mb-0">
            You will receive notification for the below selected items.
          </p>
        </VCardItem>
        <VCardText>
          <VTable class="border rounded text-no-wrap">
            <thead>
              <tr>
                <th scope="col"> NOTIFICATION </th>
                <th scope="col"> EMAIL </th>
                <th scope="col"> BROWSER </th>
                <th scope="col"> APP </th>
              </tr>
            </thead>
    
            <tbody>
              <tr v-for="n in notifications" :key="n.t" >
                <td>{{ types[n.t] }}</td>
                <td>
                  <VCheckbox v-model="n.e" />
                </td>
                <td>
                  <VCheckbox v-model="n.b" />
                </td>
                <td>
                  <VCheckbox v-model="n.a" />
                </td>
              </tr>
            </tbody>
          </VTable>
        
        
        </VCardText>
    
        <VCardText class="d-flex flex-wrap gap-4">
          <VBtn @click="saveNotifications">Guardar Cambios</VBtn>
          
        </VCardText>
      </VCard>
    </VCol>
    
    

    <!--<VCol cols="12">-->
      <!-- 👉 Billing Address -->
    <!--  <VCard title="Billing Address">-->
    <!--    <template #append>-->
    <!--      <VBtn size="small" @click="isEditAddressDialogVisible = !isEditAddressDialogVisible">-->
    <!--        Cambia la dirección-->
    <!--      </VBtn>-->
    <!--    </template>-->

    <!--    <VCardText>-->
    <!--      <VRow>-->
    <!--        <VCol cols="12"  >-->
    <!--          <VTable class="billing-address-table">-->
    <!--            <tr>-->
    <!--              <td>-->
    <!--                <h6 class="text-sm text-no-wrap mb-4">-->
    <!--                  Company:-->
    <!--                </h6>-->
    <!--              </td>-->
    <!--              <td>-->
    <!--                <p class="text-body-2">-->
    <!--                  {{ currentBillingAddress.companyName }}-->
    <!--                </p>-->
    <!--              </td>-->
                
    <!--              <td>-->
    <!--                <h6 class="text-sm text-no-wrap mb-4">-->
    <!--                Address:-->
    <!--                </h6>-->
    <!--              </td>-->
    <!--              <td>-->
    <!--                <p class="text-body-2">-->
    <!--                  {{ currentBillingAddress.line }}-->
    <!--                </p>-->
    <!--              </td>-->
    <!--            </tr>-->
    <!--            <tr>-->
    <!--              <td>-->
    <!--                <h6 class="text-sm text-no-wrap mb-4">-->
    <!--                  Country:-->
    <!--                </h6>-->
    <!--              </td>-->
    <!--              <td>-->
    <!--                <p class="text-body-2">-->
    <!--                  {{ currentBillingAddress.country }}-->
    <!--                </p>-->
    <!--              </td>-->
                
    <!--              <td>-->
    <!--                <h6 class="text-sm text-no-wrap mb-4">-->
    <!--                  Province:-->
    <!--                </h6>-->
    <!--              </td>-->
    <!--              <td>-->
    <!--                <p class="text-body-2">-->
    <!--                  {{ provinceText }}-->
    <!--                </p>-->
    <!--              </td>-->
    <!--            </tr>-->
    <!--            <tr>-->
    <!--              <td>-->
    <!--                <h6 class="text-sm text-no-wrap mb-4">-->
    <!--                  City:-->
    <!--                </h6>-->
    <!--              </td>-->
    <!--              <td>-->
    <!--                <p class="text-body-2">-->
    <!--                  {{ cityText }}-->
    <!--                </p>-->
    <!--              </td>-->
                
    <!--              <td>-->
    <!--                <h6 class="text-sm text-no-wrap">-->
    <!--                  Zip Code:-->
    <!--                </h6>-->
    <!--              </td>-->
    <!--              <td>-->
    <!--                <p class="text-body-2 mb-0">-->
    <!--                  <VChip color="primary" class="mr-2"  v-for="z in currentBillingAddress.zipCode">{{z}}</VChip> -->
    <!--                </p>-->
    <!--              </td>-->
    <!--            </tr>-->
    <!--          </VTable>-->
    <!--        </VCol>-->
    <!--      </VRow>-->
          
    <!--    </VCardText>-->
    <!--  </VCard>-->
    <!--</VCol>-->
  </VRow>

  <!-- 👉 Edit Card Dialog -->
  <AccountCard
    v-model:isDialogVisible="isCardEditDialogVisible"
    :card-details="currentCardDetails"
    :indice="indice"
    class="v-dialog-lg"
    @update="updCard"
  />

  <!-- 👉 Add Card Dialog -->
  <AccountCard
    @submit="submitCard"
    :indice="-1"
    v-model:isDialogVisible="isCardAddDialogVisible"
    class="v-dialog-lg"
  />

  <!-- 👉 Edit Address dialog -->
  <AccountAddress @submit="submitBilling" v-model:isDialogVisible="isEditAddressDialogVisible" :billing-address="currentBillingAddress" />

  <!-- 👉 Upgrade plan dialog -->
  <AccountUpgradePlan @upgradePlan="upgradePlan" :optsSelected="{newPlanTag:'crm'}" :isReseller="true"  v-model:isDialogVisible="isUpgradePlanDialogVisible" />
</template>

<style lang="scss">
.billing-address-table {
  tr {
    td:first-child {
      inline-size: 148px;
    }
  }
}
</style>
