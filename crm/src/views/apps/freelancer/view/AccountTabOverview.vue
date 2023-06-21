<script lang="ts" setup>
import UserInvoiceTable from './UserInvoiceTable.vue'
import avatar2 from '@/assets/images/avatars/avatar-2.png'
import figma from '@/assets/images/icons/project-icons/figma.png'
import html5 from '@/assets/images/icons/project-icons/html5.png'
import python from '@/assets/images/icons/project-icons/python.png'
import react from '@/assets/images/icons/project-icons/react.png'
import sketch from '@/assets/images/icons/project-icons/sketch.png'
import vue from '@/assets/images/icons/project-icons/vue.png'
import xamarin from '@/assets/images/icons/project-icons/xamarin.png'
import MiniMoment from "@/shared/utils/MiniMoment"
import { avatarText } from '@core/utils/formatters'
import { useCalendarStore } from '@/views/apps/calendar/useCalendarStore.ts'
import { useRoute } from 'vue-router'


import AccountUpgradeLeads from '@/views/apps/account/view/AccountUpgradeLeads.vue'



interface Prop {
  accountData: {};
}

const props = defineProps<Prop>();




const isUpgradePlanDialogVisible = ref(false)

// const upgradePlan = (data:any)=>{
//   let plan=props.accountData.plan;
//   if(Array.isArray(plan)  || (typeof plan === "string")) plan =  { plan:{}};
//   console.log(plan)
//   plan.plan = data;
//   props.accountData.plan = plan;
  
//   emit('updateSeller',{...props.accountData})
// }



// CURRENT PLAN SELECTED
const currentPlanSelected = ref({
  newPlanTag:'crm',
  isAnnual: true
})







const storeCalendar = useCalendarStore()
const route = useRoute()

const projects = [
  {
    logo: react,
    name: 'BGC eCommerce App',
    project: 'React Project',
    totalTask: '122/240',
    progress: 78,
    hours: '18:42',
  }
]
const timeline = [{
  title: '12 Invoices have been paid',
  date: '12 min ago',
  subtitle: 'Invoices have been paid to the company',
  attachaments: [{
    icon: 'tabler-file',
    label: 'Invoices.pdf'
  }],
  stakes: [{
    avatar: avatar2,
    fullName: 'John Doe (Client)',
    charge: 'CEO of Kelly Group'
  },]
}]

const resolveAccountProgressVariant = (progress: number) => {
  if (progress <= 25)
    return 'error'
  if (progress > 25 && progress <= 50)
    return 'warning'
  if (progress > 50 && progress <= 75)
    return 'primary'
  if (progress > 75 && progress <= 100)
    return 'success'

  return 'secondary'
}

// GET EVENTS OF LEAD FROM RESELLERS
const events = ref([]);
onMounted(async () => {
  const resellerId = route.params.id;
  const data = await storeCalendar.getAllEvents(resellerId);
  events.value = data;
})
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard >
        <VCardText class="d-flex" :style="{justifyContent: 'space-between'}">
          <h3>
            Lista de leads recientes
          </h3>
          <VBtn @click="isUpgradePlanDialogVisible = true" > Ajustes </VBtn>
        </VCardText>
        <VDivider />
        <VTable class="text-no-wrap">
          <thead>
            <tr>
              <th scope="col">
                Lead
              </th>
              <th scope="col">
                Valor
              </th>
              <th scope="col">
                Progreso
              </th>
              <th scope="col">
                Hora
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in projects" :key="project.name" style="height: 3.75rem;" >
              <td>
                <div class="d-flex align-center">
                  <VAvatar :size="38" class="me-3" :image="project.logo" />
                  <div>
                    <p class="text-base mb-0">
                      {{ project.name }}
                    </p>
                    <p class="text-sm text-disabled mb-0">
                      {{ project.project }}
                    </p>
                  </div>
                </div>
              </td>
              <td>
                {{ project.totalTask }}
              </td>
              <td>
                <span>{{ project.progress }}%</span>
                <VProgressLinear
                  :height="8"
                  :model-value="project.progress"
                  rounded
                  :color="resolveAccountProgressVariant(project.progress)"
                />
              </td>
              <td class="text-medium-emphasis">
                {{ project.hours }}
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>

    <VCol cols="12">
      <!-- 👉 Activity timeline -->
      <VCard title="Timeline leads">
        <VCardText>
          <VTimeline
            density="compact"
            align="start"
            truncate-line="both"
            class="v-timeline-density-compact"
          >
            <VTimelineItem
              v-for="(event, index) in timeline"
              :key="index"
              dot-color="error"
              size="x-small"
            >
              <div class="d-flex justify-space-between align-center flex-wrap">
                <h4 class="text-base font-weight-semibold me-1">
                  {{ event.title }}
                </h4>
                <span class="text-sm text-disabled text-no-wrap">{{ event.date }}</span>
              </div>
              <p class="mb-2">
                {{ event.subtitle }}
              </p>
              <div v-if="event.stakes.length > 0" >
                <div
                  v-for="(stake, index) in event.stakes"
                  :key="index"
                  class="d-flex align-center mt-3"
                  >
                  <VAvatar
                    size="34"
                    class="me-2"
                    :image="stake.avatar"
                  />
                  <div>
                    <h6 class="text-sm font-weight-semibold mb-0">
                      {{ stake.fullName }}
                    </h6>
                    <span>{{ stake.charge }}</span>
                  </div>
                </div>
              </div>
              <div v-if="event.attachaments.length > 0" >
                <div 
                  v-for="(attach, index) in event.attachaments"
                  :key="index"
                  class="d-flex align-center mt-2"
                >
                  <VIcon
                    color="error"
                    :icon="attach.icon"
                    size="18"
                    class="me-2"
                  />
                  <h6 class="font-weight-semibold text-sm">
                    {{ attach.label }}
                  </h6>
                </div>
              </div>
            </VTimelineItem>
          </VTimeline>
        </VCardText>
      </VCard>
    </VCol>
    

    <!-- 
      <VCol cols="12">
        <AccountInvoiceTable />
      </VCol>
    -->
    
    <!-- 👉 Upgrade plan dialog -->
    <AccountUpgradeLeads  
      v-model:isDialogVisible="isUpgradePlanDialogVisible"
      :account-data="accountData"
    />
  
  </VRow>
</template>
