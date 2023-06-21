<script lang="ts" setup>
import avatar1 from '@/assets/images/avatars/avatar-14.png'
import { useUserListStore } from '@/views/apps/user/useUserListStore'
import UserSettingsBillingAndPlans from '@/views/apps/user/view/UserSettingsBillingAndPlans.vue'
import UserSettingsConnections from '@/views/apps/user/view/UserSettingsConnections.vue'
import UserSettingsNotification from '@/views/apps/user/view/UserSettingsNotification.vue'
import UserSettingsSecurity from '@/views/apps/user/view/UserSettingsSecurity.vue'
import UserSettingsUser from '@/views/apps/user/view/UserSettingsUser.vue'
import { useRoute } from 'vue-router'

//

let userData = ref({
  avatar: avatar1,
  fullName: "",
  username: "",
  company: "",
  category: "",
  plan: {
    
    connections: [
      {
        logo: "",
        name: "",
        subtitle: "",
        connected: "",
      },
    ],
    
  },
  address: {
    zip: "",
    city: "",
    line: "",
    country: "España",
    latitude: "",
    province: "",
    longitude: "",
  },
  contact: [],
  oauth: [],
  notification: [],
  web: "",
  phone: "",
  email: "",
  language: "Español",
});

// 👉 Store
const Store = useUserListStore();

const route = useRoute();

var url = "account";
//const activeTab = ref(route.params.tab)
const activeTab = ref(url);

// tabs
const tabs = [
  { title: "Cuenta", icon: "tabler-users", tab: "account" },
  { title: "Seguridad", icon: "tabler-lock", tab: "security" },
  { title: "Suscripción", icon: "tabler-file-text", tab: "billing-plans" },
  // { title: "Notificaciones", icon: "tabler-bell", tab: "notification" },
//  { title: "Servicios", icon: "tabler-link", tab: "connection" },
];

const updateUser = async (data:any) => {
  console.log('update user:', data)
 let qr= await Store.updateUser(data);  
};

const updatePassword= async (data) =>{
  console.log('update pass:', data)
}

Store.fetchUser(route.params.id).then(data => { 
  userData.value = data
})

</script>

<template>
  <div>
    <VTabs v-model="activeTab" show-arrows class="v-tabs-pill mb-4">
      <VTab v-for="item in tabs" :key="item.icon" :value="item.tab">
        <VIcon size="20" start :icon="item.icon" />
        {{ item.title }}
      </VTab>
    </VTabs>

    <VWindow v-model="activeTab" class="disable-tab-transition" :touch="false">
      <!-- Account -->
      <VWindowItem value="account">
        <UserSettingsUser :userData="userData" :id="route.params.id" @updateUser="updateUser" />
      </VWindowItem>

      <!-- Security -->
      <VWindowItem value="security">
        <UserSettingsSecurity :userData="userData" @updateUser="updateUser" @updatePassword="updatePassword" />
      </VWindowItem>

      <!-- Billing -->
      <VWindowItem value="billing-plans">
        <UserSettingsBillingAndPlans :userData="userData" @updateUser="updateUser" />
      </VWindowItem>

      <!-- Notification -->
      <!--<VWindowItem value="notification">-->
      <!--  <UserSettingsNotification @updateLead="updateLead" :userData="userData" />-->
      <!--</VWindowItem>-->
      

      <!-- Connections -->
      <!--<VWindowItem value="connection">-->
      <!--  <UserSettingsConnections @updateLead="updateLead" :userData="userData"  />-->
      <!--</VWindowItem>-->
    </VWindow>
  </div>
</template>
