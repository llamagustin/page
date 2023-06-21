<script setup lang="ts">
  import { onMounted, reactive, ref } from "vue";
  import AccountMonthlyCampaignState from '@/views/dashboards/accounts/AccountMonthlyCampaignState.vue'
  import AccountProjectTable from '@/views/dashboards/accounts/AccountProjectTable.vue'
  
  import { useDashboardAccounts } from "./fn_accounts";

  const currentUser = JSON.parse(window.localStorage.userData)

  const earningsReports = ref()
  const monthlyCampaign = ref()
  
  onMounted(async () => {
    useDashboardAccounts().then(res => {
      earningsReports.value = res.earningsReports
      monthlyCampaign.value = res.monthlyCampaign
    })
  })
</script>

<template>
  
  <VRow class="match-height">
    <!-- 👉 Earning Reports Weekly Overview -->
    <VCol cols="12" md="4" v-if="earningsReports">
      <AccountMonthlyCampaignState :data="monthlyCampaign" />
    </VCol>

    <!-- 👉 Project Table -->
    <VCol cols="12" md="8">
      <AccountProjectTable />
    </VCol>
  </VRow>
</template>

<style lang="scss">
  @use "@core/scss/template/libs/apex-chart.scss";
</style>
