<script setup lang="ts">
import { onMounted, reactive } from "vue";
import AccountEarningReportsWeeklyOverview from '@/views/dashboards/accounts/AccountEarningReportsWeeklyOverview.vue'
import AccountMonthlyCampaignState from '@/views/dashboards/accounts/AccountMonthlyCampaignState.vue'
import AccountProjectTable from '@/views/dashboards/accounts/AccountProjectTable.vue'
import AccountSalesOverview from '@/views/dashboards/accounts/AccountSalesOverview.vue'
import AccountSupportTracker from '@/views/dashboards/accounts/AccountSupportTracker.vue'
// import AccountTotalEarning from '@/views/dashboards/accounts/AccountTotalEarning.vue'
import AccountWebsiteAccount from '@/views/dashboards/accounts/AccountWebsiteAnalytics.vue'
import AccountStatisticsVertical from '@/views/dashboards/accounts/AccountStatisticsVertical.vue'
import { useDashboardLeads } from "./";
import { analytics, statisticsVertical } from './dataAccounts'

const currentUser = JSON.parse(window.localStorage.userData)
const { getToolsWithCounts } = useDashboardLeads();

const data = reactive({
  leadsAccepted: 0
})

onMounted(() => {
  getToolsWithCounts()
    .then((res) => {
      data.leadsAccepted = res.data?.numberLeads?.count
    })
    .catch((err) => {
      console.error(err)
    })
})

</script>

<template>
  <VRow class="match-height">
    <!-- 👉 Website analytics -->
    <VCol cols="12" md="6">
      <AccountWebsiteAccount :analytics="analytics" :idAccount="currentUser.id" />
    </VCol>
    
    <!-- 👉 Sales Overview -->
    <VCol
      cols="12"
      md="3"
      sm="6"
    >
      <AccountSalesOverview />
    </VCol>

    <!-- 👉 Statistics Vertical -->
    <VCol cols="12" md="3" sm="6">
      <AccountStatisticsVertical 
        v-bind="statisticsVertical"
        :leads-accepted="data.leadsAccepted" />
    </VCol>

    <!-- 👉 Earning Reports Weekly Overview -->
    <VCol
      cols="12"
      md="6"
    >
      <AccountEarningReportsWeeklyOverview />
    </VCol>

    <!-- 👉 Support Tracker -->
    <VCol
      cols="12"
      md="6"
    >
      <AccountSupportTracker />
    </VCol>

    <!-- 👉 Sales by Countries 
    <VCol
      cols="12"
      sm="6"
      lg="4"
    >
      <AccountSalesByCountries />
    </VCol>
    -->

    <!-- 👉 Total Earning
    <VCol
      cols="12"
      sm="6"
      lg="4"
    >
      <AccountTotalEarning />
    </VCol>
     -->

    <!-- 👉 Monthly Campaign State -->
    <VCol
      cols="12"
      sm="6"
      lg="4"
    >
      <AccountMonthlyCampaignState />
    </VCol>

    <!-- 👉 Source Visits 
    <VCol
      cols="12"
      sm="6"
      lg="4"
    >
      <AccountSourceVisits />
    </VCol>
    -->

    <!-- 👉 Project Table -->
    <VCol
      cols="12"
      lg="8"
    >
      <AccountProjectTable />
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";
</style>
