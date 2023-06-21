<script setup lang="ts">
import { useAccountListStore } from '@/views/apps/account/useAccountListStore'
import AccountBioPanel from '@/views/apps/account/view/AccountBioPanel.vue'
import AccountTabBillingsPlans from '@/views/apps/account/view/AccountTabBillingsPlans.vue'
//import AccountTabConnections from '@/views/apps/account/view/AccountTabConnections.vue'
import AccountTabNotifications from '@/views/apps/account/view/AccountTabNotifications.vue'
import AccountTabOverview from '@/views/apps/account/view/AccountTabOverview.vue'
import AccountTabSecurity from '@/views/apps/account/view/AccountTabSecurity.vue'
import { useRoute } from 'vue-router'

// 👉 Store
const accountListStore = useAccountListStore()
const route = useRoute()

const accountData = ref()
const accountTab = ref(null)


const tabs = [
  { icon: 'tabler-user-check', title: 'Inicio' },
  { icon: 'tabler-lock', title: 'Seguridad' },
  // { icon: 'tabler-currency-dollar', title: 'Plan' },
  // { icon: 'tabler-bell', title: 'Alertas' },
 // { icon: 'tabler-link', title: 'Conexiones' },
]


accountListStore.fetchAccount(route.params.id).then(response => {
  accountData.value = response.data
})

const updateSellerEvent = async (data:any)=>{
  await accountListStore.updateAccount(data);
  accountData.value=data;
}

const OnUpdateNotifications= async data=>{
  accountData.value=data;
  await accountListStore.updateAccount({...accountData.value});
}

const updateCard=async (cards:any)=>{
  accountData.value.carddetails=cards;
  await accountListStore.updateAccount(accountData.value);
}

const updatePass=async (pass:string)=>{
  let data = {
    password:pass,
    email: accountData.value.email,
    token: localStorage.accessToken.replace(/"/g, '')
  }
  accountListStore.savePassword(data)
}

//console.log(localStorage.userData)

</script>

<template>
  <VRow v-if="accountData">
    <VCol cols="12" md="5" lg="4" >
      <AccountBioPanel :account-data="accountData" @update-seller="updateSellerEvent" />
    </VCol>
    <VCol cols="12" md="7" lg="8">
      <VTabs v-model="accountTab" class="v-tabs-pill">
        <VTab v-for="tab in tabs" :key="tab.icon" >
          <VIcon :size="18" :icon="tab.icon" class="me-1"/>
          <span>{{ tab.title }}</span>
        </VTab>
      </VTabs>
      <VWindow  v-model="accountTab" class="mt-6 disable-tab-transition"
        :touch="false">
        <VWindowItem>
          <AccountTabOverview :accountData="accountData"  />
        </VWindowItem>
        
        <VWindowItem>
          <AccountTabSecurity :accountData="accountData"  @updateAccount="updateSellerEvent" @updatePassword="updatePass" />
        </VWindowItem>
        
        <!--<VWindowItem>-->
        <!--  <AccountTabBillingsPlans :accountData="accountData" @updateCard="updateCard"  />-->
        <!--</VWindowItem>-->
      </VWindow>
    </VCol>
  </VRow>
</template>
