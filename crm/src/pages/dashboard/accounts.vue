<script setup lang="ts">
  import { onMounted, reactive, ref } from "vue";
  import AccountEarningReportsWeeklyOverview from '@/views/dashboards/accounts/AccountEarningReportsWeeklyOverview.vue'
  import AccountMonthlyCampaignState from '@/views/dashboards/accounts/AccountMonthlyCampaignState.vue'
  import AccountProjectTable from '@/views/dashboards/accounts/AccountProjectTable.vue'
  import AccountSalesOverview from '@/views/dashboards/accounts/AccountSalesOverview.vue'
  import AccountSupportTracker from '@/views/dashboards/accounts/AccountSupportTracker.vue'
  import AccountWebsiteAccount from '@/views/dashboards/accounts/AccountWebsiteAnalytics.vue'
  import AccountStatisticsVertical from '@/views/dashboards/accounts/AccountStatisticsVertical.vue'
  import MenuRight from '@/views/dashboards/MenuRight.vue'

  import { useDashboardAccounts } from "./fn_accounts";
  // import { analytics, statisticsVertical } from './dataAccounts'

  const currentUser = JSON.parse(window.localStorage.userData)

  // const data = reactive({
  //   leadsAccepted: 0
  // })

  const analytics = ref()
  const statisticsVertical = ref()
  const salesOverview = ref()
  const earningsReports = ref()
  const supportTracker = ref()
  const monthlyCampaign = ref()

  onMounted(async () => {
    useDashboardAccounts().then(res => {
      analytics.value = res.analytics
      salesOverview.value = res.salesOverview
      statisticsVertical.value = res.statisticsVertical
      earningsReports.value = res.earningsReports
      supportTracker.value = res.supportTracker
      monthlyCampaign.value = res.monthlyCampaign

    })
  })

  const drawer = ref(false);
</script>

<template>

  <VRow class="match-height">
    <!-- 👉 Website analytics -->
    <VRow>
      <VCol cols="12" md="6" v-if="analytics">
        <AccountWebsiteAccount :data="analytics" />
      </VCol>
      <VCol cols="12" sm="6" md="3" v-if="salesOverview">
        <AccountSalesOverview :data="salesOverview" />
      </VCol>
      <VCol cols="12" sm="6" md="3" v-if="statisticsVertical">
        <AccountStatisticsVertical :data="statisticsVertical" />
      </VCol>

      <!-- 👉 Support Tracker -->
      <VCol cols="12" sm="12" md="6" v-if="supportTracker">
        <AccountSupportTracker :data="supportTracker" />
      </VCol>

      <!-- 👉 Monthly Campaign State -->
      <VCol cols="12" sm="12" md="6" v-if="monthlyCampaign">
        <AccountEarningReportsWeeklyOverview :data="earningsReports" />
      </VCol>
      
    <VCol cols="12" md="4" v-if="earningsReports">
      <AccountMonthlyCampaignState :data="monthlyCampaign" />
    </VCol>

    <!-- 👉 Project Table -->
    <VCol cols="12" md="8">
      <AccountProjectTable />
    </VCol>
    </VRow>

  </VRow>
</template>

<style lang="scss">
  @use "@core/scss/template/libs/apex-chart.scss";
</style>
