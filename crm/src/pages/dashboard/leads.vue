<script setup lang="ts">
import laptopGirl from '@/assets/images/illustrations/laptop-girl.png'


import LeadCongratulations from '@/views/dashboards/leads/LeadCongratulations.vue'
import LeadsAnalyticsSales from '@/views/dashboards/leads/LeadsAnalyticsSales.vue'
import LeadsServicesStates from '@/views/dashboards/leads/LeadsServicesStates.vue'
import LeadsServices from '@/views/dashboards/leads/LeadsServices.vue'
import LeadsWhitdrawal from '@/views/dashboards/leads/LeadsWhitdrawal.vue'
import LeadsRevenueDiary from '@/views/dashboards/leads/LeadsRevenueDiary.vue'


import { useDashboardLeads } from './fn_leads.ts'


// const {
//   simpleStatisticsDemoCards,
//   leadsRevenueDiary_series,
//   leadsServices_series,
//   leadsAnalyticsSales_series,
//   leadsServicesStates_series,
//   leadsActive_series,
//   leadsWhitdrawal_series
// } = useDashboardLeads()


const leadsActive = ref()
const simpleStatisticsDemoCards = ref()
const leadsRevenueDiary_series = ref()
const leadsServices_series = ref()
const leadsAnalyticsSales_series = ref()
const leadsServicesStates_series = ref()
// const leadsActive_series = ref()
const leadsWhitdrawal_series = ref()

const userData = JSON.parse(localStorage.getItem('userData') || '{}')
onMounted(async () => {
  useDashboardLeads().then( res => {
    //1
    leadsActive.value = res.leadsActive
    leadsActive.value.name = userData.fullName
    leadsActive.value.email = userData.email
    //2
    simpleStatisticsDemoCards.value = res.simpleStatisticsDemoCards
    //3
    leadsRevenueDiary_series.value = res.leadsRevenueDiary_series
    //4
    leadsServicesStates_series.value = res.leadsServicesStates_series
    //5
    leadsServices_series.value = res.leadsServices_series
    //6
    leadsAnalyticsSales_series.value = res.leadsAnalyticsSales_series
    //7
    // console.log('aa', res.leadsActive_series)
    // leadsActive_series.value = res.leadsActive_series
    //8
    leadsWhitdrawal_series.value = res.leadsWhitdrawal_series
    
  })
})

</script>

<template>
  <VRow>
    
    <VCol 
      cols="12" 
      sm="4" 
      v-if="leadsActive">
      <LeadCongratulations 
        :data="leadsActive" class="h-100" />
    </VCol>
    
    <VCol
      v-if="simpleStatisticsDemoCards"
      v-for="demo in simpleStatisticsDemoCards"
      :key="demo.title"
      cols="12"
      sm="4"
    >
      <VCard>
        <VCardText>
          <VAvatar
            :color="demo.color"
            variant="tonal"
            rounded
            size="42"
          >
            <VIcon :icon="demo.icon" />
          </VAvatar>

          <h6 class="text-h6 mt-3">
            {{ demo.title }}
          </h6>
          <p class="text-sm text-disabled mt-1 mb-0">
            {{ demo.subTitle }}
          </p>
          <VChip
            label
            color="success"
            class="mt-6"
            :style="{fontSize: '22px', height: 'auto'}"
          >
            {{ demo.stat }}
          </VChip>
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Revenue Growth -->
    <VCol
      cols="12"
      sm="4"
      v-if="leadsRevenueDiary_series"
    >
      <LeadsRevenueDiary :data="leadsRevenueDiary_series" />
    </VCol>

    <VCol cols="12" class=" ">
      <VCard class=" d-flex align-center flex-md-row flex-column position-relative mx-auto">
        <div class="text-center text-md-start py-10 px-10 ">
          <!--text-primary-->
          <h2 class="text-h6 font-weight-bold mb-2">
            ¿Todavía no está convencido?
          </h2>
          <h1 class=""> ¡Obtén más informción!</h1>
          <p class="text-sm">
            Descubre todo lo que necesitas saber sobre nuestro Kit Digital
          </p>
          <VBtn :to="{name: 'help-center'}" class="mt-4">
            Nuestra guia
          </VBtn>
        </div>
  
        <div class="ml-2 free-trial-illustrator">
          <VImg :src="laptopGirl" :width="230" />
        </div>
      </VCard>
    </VCol>
    
    
    <!-- 👉 Browser States -->
    <VCol
      cols="12"
      md="3"
      sm="4"
      v-if="leadsServicesStates_series"
    >
      <LeadsServicesStates :data="leadsServicesStates_series"/>
    </VCol>
    
    <!-- 👉 Earning Reports -->
    <VCol
      cols="12"
      md="9"
      sm="8"
      v-if="leadsServices_series"
    >
      <LeadsServices :data="leadsServices_series" />
    </VCol>

    <!-- 👉 Sales -->
    <VCol
      cols="12"
      md="4"
      sm="6"
      v-if="leadsAnalyticsSales_series"
    >
      <LeadsAnalyticsSales :data="leadsAnalyticsSales_series" />
    </VCol>
  
    <!-- 👉 Recent Transaction -->
    <VCol
      cols="12"
      md="8"
      v-if="leadsWhitdrawal_series"
    >
      <LeadsWhitdrawal :data="leadsWhitdrawal_series"/>
    </VCol>
  </VRow>
</template>


<style lang="scss">
.btn-lead-list{
    background: transparent !important;
    box-shadow: none !important;
}






.page-pricing-free-trial-banner-bg {
  /* stylelint-disable-next-line color-function-notation */
  background-color: rgba(var(--v-theme-primary), var(--v-selected-opacity));
  padding: 20px;
  border-radius: 12px;
}

@media screen and (min-width: 960px) {
  .free-trial-illustrator {
    position: absolute;
    inset-block-end: 0;
    inset-inline-end: 10%;
  }
}

@media screen and (max-width: 959px) {
  .free-trial-illustrator {
    position: relative;
    inset-block-end: -11px;
  }
}
</style>