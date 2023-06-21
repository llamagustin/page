<script setup lang="ts">
import { avatarText, kFormatter } from '@core/utils/formatters';
import { cities, codes, provinces } from "@/@fake-db/data/address.ts";
import { useRouter, useRoute } from 'vue-router'

import AddNewAccountDrawer from '@/views/apps/account/list/AddNewAccountDrawer.vue'

import { useAccount } from '@/views/apps/account/useAccount'


const {
  resolveAccountStatusVariant
} = useAccount()
  
  

const tools = ref(JSON.parse(localStorage.dataTools || '[]'))

interface iAccountData {
  id: number
  fullName: string
  company: string
  role: string
  country: string
  contact: string
  email: string
  currentPlan: string
  status: string
  avatar: string
  taskDone: number
  projectDone: number
  taxId: string
  language: string
}

interface Props {
  accountData: iAccountData
}
interface Emit {
  (e: 'updateSeller', value: iAccountData): void
  (e: 'updateAccount', value: any): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const avatar = ref()
avatar.value = props.accountData.avatar;

const standardPlan = {
  plan: 'Standard',
  price: 99,
  benefits: ['10 Accounts', 'Up to 10GB storage', 'Basic Support'],
}

const isAccountInfoEditDialogVisible = ref(false)

// 👉 Status 

// const statusColor = { "200":'error', "300":'warning', "400":'success' }

// const statusObject ={ "200":'Cancelado', "300":'Pendiente', "400":'Aceptado' }

// 👉 Role variant resolver
// const resolveAccountRoleVariant = (role: string) => {
//   if (role === 'subscriber') return { color: 'warning', icon: 'tabler-user' }
//   if (role === 'author') return { color: 'success', icon: 'tabler-circle-check' }
//   if (role === 'maintainer') return { color: 'secondary', icon: 'tabler-chart-pie-2' }
//   if (role === 'editor') return { color: 'info', icon: 'tabler-pencil' }
//   if (role === 'admin') return { color: 'primary', icon: 'tabler-server-2' }

//   return { color: 'primary', icon: 'tabler-user' }
// }

const submitEvent = async (data:iAccountData)=>{
  props.accountData = data;
  avatar.value = data.avatar;
  emit('updateSeller',data)
}


function diasTranscurridos(fecha1:Date):number {
  let diferenciaEnMilisegundos = new Date().getTime() - fecha1.getTime();
  let diasTranscurridos = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);
  return parseInt(diasTranscurridos.toString());
}

const activePlan = computed(()=>{
  let plan:any = props.accountData.plan;
  
  if(typeof plan !== 'object') plan={}
  
  plan.activo=false;
  
  if(plan.tag){
    let servicio = tools.value.filter(s=> s.tag==plan.tag)[0]
    
    let fecha = new Date(plan.createdAt);
    plan.dias = diasTranscurridos(fecha);
    plan.faltan = 30-plan.dias;
    plan.diasPercent= (plan.dias/30)*100;
    fecha.setDate(fecha.getDate() + 30);
    plan.vigente = fecha.toLocaleDateString('es-ES', { month: 'short', day: '2-digit', year: 'numeric' });
    //plan.benefits = servicio.benefits[plan.tipo];
    plan.activo = true;
  }
  return plan;
})


const provinceText = computed(()=>{
  //props.accountData.addressbilling.country
  return props.accountData.address.province || '-';
  // let cod =  props.accountData.address.province || '';
  // if(cod == '') return '';
  // let p= provinces.filter(p=> p.value==cod)
  // p=p[0] || {};
  // return p.title;
  
})

const cityText = computed(()=>{
  return props.accountData.address.city || '-';
  // let ciudad = props.accountData.address.city || ''
  // if(ciudad=='') return '';
  // let c = cities.filter((item)=> item.value == ciudad)
  // c=c[0] || {};
  // return c.title;
})


const getNameCity = (zipCode) => {
  let qr = codes.find((code) => code.codigo_postal == zipCode)
  if(qr) {
    return qr.municipio_nombre
  }
}

const router = useRouter();
function goToHome() {
  router.push("/apps/account/list")
}

const isAnnual = ref(true);




  // 👉 Add new user
  const addNewAccount = async (account: AccountProperties) => {
    if (account?.id) {
      await accountListStore.updateAccount(account);
    }
    else {
      delete account['id']
      await accountListStore.addAccount(account);
    }
    fetchAccounts(false)
  }

</script>

<template>
  <VRow>
    <!-- SECTION User Details -->
    <VCol cols="12">
      <VCard v-if="props.accountData" >
        <VCardText class="text-center pt-0">
          
          <!-- 👉 Avatar -->
          <div class="">
            <div class="mt-4 d-flex align-center gap-2">
              <VAvatar rounded :size="64" variant="tonal"
                :color="resolveAccountStatusVariant(props.accountData.status)"  >
                <VImg v-if="props.accountData.avatar" :src="avatar" />
                <span v-else class="text-base font-weight-semibold" >
                  {{ avatarText(props.accountData.fullName) }}
                </span>
              </VAvatar>
              <div>
                <div class="d-flex gap-2">
                  <VChip class="text-capitalize " :color="resolveAccountStatusVariant(props.accountData.status)" label  size="small">
                    {{ props.accountData.role }}
                  </VChip>
                  <VBtn @click="goToHome()" :color="resolveAccountStatusVariant(props.accountData.status)" variant="tonal" :size="26"> 
                    <VIcon :size="18" icon="tabler-home"  class="hover-scale-sm mx-2"/>
                  </VBtn>
                  <VBtn @click="isAccountInfoEditDialogVisible = true" color="primary" variant="tonal" :size="26">
                    <VIcon :size="18" icon="tabler-edit"  class="hover-scale-sm mx-2"/>
                  </VBtn>
                  <!--<VChip label size="small" :color="statusColor[props.accountData.status]" class="text-capitalize">-->
                  <!--        {{ statusObject[props.accountData.status] }}-->
                  <!--</VChip>-->
                </div>
                <div class="d-flex mt-2 gap-2">
                  <div class="d-flex align-center">
                    <div class="align-center d-flex gap-0 gap-2">
                      <h6 class="text-base font-weight-semibold">
                        {{ kFormatter(props.accountData.taskDone || 0) }}
                      </h6>
                      <span class="text-sm">Leads</span>
                    </div>
                  </div>
                  <div class="d-flex align-center me-4">
                    <div class="align-center d-flex gap-0 gap-2">
                      <h6 class="text-base font-weight-semibold">
                        {{ kFormatter(props.accountData.projectDone || 0) }}
                      </h6>
                      <span class="text-sm">Clientes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </VCardText>
        <VDivider/>
        <VCardText>
          <p class="text-sm text-uppercase text-disabled">
            Información
          </p>

          <!-- 👉 Account Details list -->
          <VTable density="compact">
            <tr>
              <td><h6 class="text-base font-weight-semibold">Nombre:</h6> </td>
              <td><h6 class="text-base font-weight-semibold">
                  <span class="text-body-2">
                    {{ props.accountData.fullName }}
                  </span>
                </h6>
              </td>
            </tr>
            <tr>
              <td><h6 class="text-base font-weight-semibold">Idioma:</h6> </td>
              <td><h6 class="text-base font-weight-semibold">
                  <span class="text-body-2">
                    {{ props.accountData.languaje }}
                  </span>
                </h6>
              </td>
            </tr>
            <tr>
              <td><h6 class="text-base font-weight-semibold">Correo:</h6> </td>
              <td><h6 class="text-base font-weight-semibold">
                  <span class="text-body-2">
                    {{ props.accountData.email }}
                  </span>
                </h6>
              </td>
            </tr>
            <tr>
              <td><h6 class="text-base font-weight-semibold">Telefono:</h6> </td>
              <td><h6 class="text-base font-weight-semibold">
                  <span class="text-body-2">
                    {{ props.accountData.phone }}
                  </span>
                </h6>
              </td>
            </tr>
            <tr>
              <td><h6 class="text-base font-weight-semibold">País:</h6> </td>
              <td><h6 class="text-base font-weight-semibold">
                  <span class="text-body-2">
                    {{  props.accountData.address.country }}
                  </span>
                </h6>
              </td>
            </tr>
            <tr>
              <td><h6 class="text-base font-weight-semibold">Provincia:</h6> </td>
              <td><h6 class="text-base font-weight-semibold">
                  <span class="text-body-2">
                    {{  provinceText }}
                  </span>
                </h6>
              </td>
            </tr>
            <tr>
              <td><h6 class="text-base font-weight-semibold">Ciudad:</h6> </td>
              <td><h6 class="text-base font-weight-semibold">
                  <span class="text-body-2">
                    {{  cityText }}
                  </span>
                </h6>
              </td>
            </tr>
            <tr>
              <td><h6 class="text-base font-weight-semibold">Codigo postal:</h6> </td>
              <td>
                <template v-if="typeof props.accountData.address.zip == 'number' || typeof props.accountData.address.zip == 'string'">
                  <VChip class="px-2 rounded-pill user-select-none text-sm-caption">
                    {{ getNameCity(accountData.address.zip) }} - {{accountData.address.zip}}
                  </Vchip>
                </template>
                <template v-else-if="Array.isArray(props.accountData.address.zip)">
                  <VChip v-for="(item, index) in props.accountData.address.zip" :key="index"
                    class="bg-grey-300 px-2 rounded-pill user-select-none text-sm-caption" >
                    {{ getNameCity(item) }} - {{item}}
                  </VChip>
                </template>
              </td>
            </tr>            
          </VTable>
        </VCardText>
      </VCard>
    </VCol>
    <!-- !SECTION -->

    <!-- SECTION Current Plan -->
    <VCol cols="12" >
      <VCard v-if="activePlan.activo">
        <VCardText class="d-flex">
          <!-- 👉 Standard Chip -->
          <VChip label color="primary" size="small" >
            <span class="text-capitalize">{{activePlan.tipo}}</span>
          </VChip>
          <VSpacer />
          <!-- 👉 Current Price  -->
          <div class="d-flex align-center">
            <sup class="text-primary text-sm font-weight-regular">€</sup>
            <h3 class="text-h3 text-primary font-weight-semibold">
              {{activePlan.costo}}
            </h3>
            <sub class="mt-3"><h6 class="text-sm font-weight-regular">/ Month</h6></sub>
          </div>
        </VCardText>
        
        <VCardText>
          <!-- 👉 Price Benefits -->
          <VList class="card-list">
            <VListItem  v-for="benefit in activePlan.benefits" :key="benefit" >
              <VIcon size="12" color="#A8AAAE" class="me-2" icon="tabler-circle" />
              <span>{{ benefit.content }}</span>
            </VListItem>
          </VList>
          <!-- 👉 Days -->
          <div class="my-6">
            <div class="d-flex font-weight-semibold mt-3 mb-2">
              <h6 class="text-base font-weight-semibold">
                Días
              </h6>
              <VSpacer />
              <h6 class="text-base font-weight-semibold">
                {{activePlan.dias}} de 30 Días
              </h6>
            </div>

            <!-- 👉 Progress -->
            <VProgressLinear
              rounded
              rounded-bar
              :model-value="activePlan.diasPercent"
              height="8"
              color="primary"
            />

            <p class="mt-2">
              {{activePlan.faltan}} días restantes
            </p>
          </div>

          <!-- 👉 Upgrade Plan -->
          
        </VCardText>
        
      </VCard>

    </VCol>
    <!-- !SECTION -->
  </VRow>

  <!-- 👉 Edit account info dialog -->
  <!--<AccountInfo-->
  <!--  v-model:isDialogVisible="isAccountInfoEditDialogVisible"-->
  <!--  :account-data="props.accountData"-->
  <!--  @submit="submitEvent"-->
  <!--/>-->
  
  <!-- 👉 Add New User -->
  <AddNewAccountDrawer 
    v-model:isDrawerOpen="isAccountInfoEditDialogVisible" 
    v-model:account="props.accountData" 
    @accountData="addNewAccount" />

</template>

<style lang="scss">
:root {
  --primary-blue: #7367F0;
}
.card-list {
  --v-card-list-gap: 0.7rem;
}

.text-capitalize {
  text-transform: capitalize !important;
}
td {
  padding-bottom: 10px;
}
</style>
