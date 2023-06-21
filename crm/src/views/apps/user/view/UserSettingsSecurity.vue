<script lang="ts" setup>
import { ref } from 'vue'
import laptopGirl from '@/assets/images/illustrations/laptop-girl.png'
import { useAccountListStore } from '@/views/apps/account/useAccountListStore'

interface Props { userData: {notification: []} }
interface Emit {  
  (e: 'updatePassword', value: any): void 
   (e: 'updateUser', value: any): void
}

const emit = defineEmits<Emit>()
const props = defineProps<Props>()

const isCurrentPasswordVisible = ref(false)
const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const Store = useAccountListStore();

const passwordRequirements = [
  'Minimum 8 characters long - the more, the better',
  'At least one lowercase character',
  'At least one number, symbol, or whitespace character',
]

const serverKeys = [
  {
    name: 'Server Key 1',
    key: '23eaf7f0-f4f7-495e-8b86-fad3261282ac',
    createdOn: '28 Apr 2021, 18:20 GTM+4:10',
    permission: 'Full Access',
  },
  {
    name: 'Server Key 2',
    key: 'bb98e571-a2e2-4de8-90a9-2e231b5e99',
    createdOn: '12 Feb 2021, 10:30 GTM+2:30',
    permission: 'Read Only',
  },
  {
    name: 'Server Key 3',
    key: '2e915e59-3105-47f2-8838-6e46bf83b711',
    createdOn: '28 Dec 2020, 12:21 GTM+4:10',
    permission: 'Full Access',
  },
]

const recentDevices = [
  {
    browser: 'Chrome on Windows',
    device: 'HP Spectre 360',
    location: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: { icon: 'tabler-brand-windows', color: 'primary' },
  },
  {
    browser: 'Chrome on iPhone',
    device: 'iPhone 12x',
    location: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: { icon: 'tabler-device-mobile', color: 'error' },
  },
  {
    browser: 'Chrome on Android',
    device: 'Oneplus 9 Pro',
    location: 'San Francisco, CA',
    recentActivity: '16 Apr 2022, 04:20',
    deviceIcon: { icon: 'tabler-brand-android', color: 'success' },
  },
  {
    browser: 'Chrome on MacOS',
    device: 'Apple iMac',
    location: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: { icon: 'tabler-brand-apple', color: 'secondary' },
  },
  {
    browser: 'Chrome on Windows',
    device: 'HP Spectre 360',
    location: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: { icon: 'tabler-brand-windows', color: 'primary' },
  },
  {
    browser: 'Chrome on Android',
    device: 'Oneplus 9 Pro',
    location: 'San Francisco, CA',
    recentActivity: '16 Apr 2022, 04:20',
    deviceIcon: { icon: 'tabler-brand-android', color: 'success' },
  },
]

const updatePassword=async ()=>{
    let data = {
    password:confirmPassword.value,
    token: props.userData.password_id
  }
  
 await Store.savePassword(data)
}

const isOneTimePasswordDialogVisible = ref(false)
const types=['New for you','Account activity','A new browser used to sign in','A new device is linked']


let notifications = reactive([ 
  { t: 0, e: false, b: false,a: false},
  { t: 1, e: false, b: false,a: false},
  { t: 2, e: false, b: false,a: false},
  { t: 3, e: false, b: false,a: false},
]);


  

const getValue =(item:object) =>{
  let qr = {...props.userData?.notification} || {};
  let rs=qr[item.t] || {t:item.t,a:false, b:false, e:false} ;
  
  return rs 
}


for (var i = 0; i < notifications.length; i++) {
  
  notifications[i] = getValue(notifications[i])
}


const updateUser = ()=>{
  props.userData.notification=notifications;
  emit('updateUser', props.userData)
    
}
</script>

<template>
  <VRow>
    <!-- SECTION: Change Password -->
    <VCol cols="12">
      <VCard title="Change Password">
        <VForm>
          <VCardText class="pt-0">
  
            <!-- 👉 New Password -->
            <VRow>
              <VCol cols="12" md="6" >
                <!-- 👉 new password -->
                <VTextField
                  v-model="newPassword"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isNewPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  label="New Password"
                  @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible"
                />
              </VCol>

              <VCol cols="12" md="6" >
                <!-- 👉 confirm password -->
                <VTextField
                  v-model="confirmPassword"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isConfirmPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  label="Confirm New Password"
                  @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                />
              </VCol>
            </VRow>
          </VCardText>

          <!-- 👉 Password Requirements -->
          <VCardText>
            <h6 class="text-base font-weight-medium mb-3">
              Password Requirements:
            </h6>

            <VList class="card-list">
              <VListItem
                v-for="item in passwordRequirements"
                :key="item"
                :title="item"
                class="text-medium-emphasis"
              >
                <template #prepend>
                  <VIcon
                    size="8"
                    icon="tabler-circle"
                    class="me-3"
                  />
                </template>
              </VListItem>
            </VList>
          </VCardText>

          <!-- 👉 Action Buttons -->
          <VCardText class="d-flex flex-wrap gap-4">
            <VBtn @click="updatePassword">Guardar Cambios</VBtn>
          </VCardText>

        </VForm>
      </VCard>
    </VCol>
    <!-- !SECTION -->


    <!-- -->
    <VCol cols="12">
      <VCard>
      <VCardItem>
        <VCardTitle>Recent Devices</VCardTitle>
        <p class="text-sm mt-2 mb-0">
          We need permission from your browser to show notifications. <span class="font-weight-bold">Request Permission</span>
        </p>
      </VCardItem>
  
      <VCardText>
        <VTable class="text-no-wrap rounded border">
          <thead>
            <tr>
              <th scope="col">
                Type
              </th>
              <th scope="col">
                EMAIL
              </th>
              <th scope="col">
                BROWSER
              </th>
              <th scope="col">
                App
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="device in notifications"
              :key="device.t"
            >
              <td>
                {{ types[device.t] }}
              </td>
              <td>
                <VCheckbox v-model="device.e" />
              </td>
              <td>
                <VCheckbox v-model="device.b" />
              </td>
              <td>
                <VCheckbox v-model="device.a" />
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCardText>
      
      <VDivider />
  
      <VCardText>
        <VForm @submit.prevent="() => {}">
          
          <div class="d-flex flex-wrap gap-4 mt-4">
            <VBtn @click="updateUser"> Save Changes </VBtn>
            <VBtn color="secondary" variant="tonal" type="reset" > Reset </VBtn>
          </div>
        </VForm>
      </VCardText>
    </VCard>
    </VCol>
    <!-- -->
    
    <!-- SECTION Two-steps verification -->
    <!--<VCol cols="12">-->
    <!--  <VCard title="Two-steps verification">-->
    <!--    <VCardText>-->
    <!--      <h6 class="text-base font-weight-semibold mb-3">-->
    <!--        Two factor authentication is not enabled yet.-->
    <!--      </h6>-->
    <!--      <p>-->
    <!--        Two-factor authentication adds an additional layer of security to your account by-->
    <!--        <br>-->
    <!--        requiring more than just a password to log in.-->
    <!--        <a-->
    <!--          href="javascript:void(0)"-->
    <!--          class="text-decoration-none"-->
    <!--        >Learn more.</a>-->
    <!--      </p>-->

    <!--      <VBtn @click="isOneTimePasswordDialogVisible = true">-->
    <!--        Enable two-FA-->
    <!--      </VBtn>-->
    <!--    </VCardText>-->
    <!--  </VCard>-->
    <!--</VCol>-->
    <!-- !SECTION -->

    <VCol cols="12">
      <!-- SECTION: Create an API key -->
      <VCard title="Create an API key">
        <VRow no-gutters>
          <!-- 👉 Choose API Key -->
          <VCol
            cols="12"
            md="5"
            order-md="0"
            order="1"
          >
            <VCardText>
              <VForm @submit.prevent="() => {}">
                <VRow>
                  <!-- 👉 Choose API Key -->
                  <VCol cols="12">
                    <VSelect
                      label="Choose the API key type you want to create"
                      :items="['Full Control', 'Modify', 'Read & Execute', 'List Folder Contents', 'Read Only', 'Read & Write']"
                    />
                  </VCol>

                  <!-- 👉 Name the API Key -->
                  <VCol cols="12">
                    <VTextField label="Name the API key" />
                  </VCol>

                  <!-- 👉 Create Key Button -->
                  <VCol cols="12">
                    <VBtn type="submit" block >
                      Create Key
                    </VBtn>
                  </VCol>
                </VRow>
              </VForm>
            </VCardText>
          </VCol>

          <!-- 👉 Lady image -->
          <VCol
            cols="12"
            md="7"
            order="0"
            order-md="1"
            class="d-flex flex-column justify-center align-center"
          >
            <VImg
              :src="laptopGirl"
              :width="200"
              :style="$vuetify.display.smAndDown ? '' : 'position: absolute; bottom: 0;'"
            />
          </VCol>
        </VRow>
      </VCard>
    <!-- !SECTION -->
    </VCol>

    <VCol cols="12">
      <!-- SECTION: API Keys List -->
      <VCard title="API Key List &amp; Access">
        <VCardText>
          An API key is a simple encrypted string that identifies an application without any principal. They are useful for accessing public data anonymously, and are used to associate API requests with your project for quota and billing.
        </VCardText>

        <!-- 👉 Server Status -->
        <VCardText class="d-flex flex-column gap-y-4">
          <VCard
            v-for="serverKey in serverKeys"
            :key="serverKey.key"
            flat
            variant="tonal"
            class="pa-4"
          >
            <VBtn
              icon
              variant="plain"
              size="25"
              color="default"
              class="position-absolute server-close-btn"
            >
              <VIcon icon="tabler-dots-vertical" />

              <VMenu activator="parent">
                <VList>
                  <VListItem
                    v-for="(item, index) in [{ icon: 'tabler-pencil', text: 'Edit' }, { icon: 'tabler-trash', text: 'Delete' }]"
                    :key="index"
                    :value="index"
                    :title="item.text"
                  >
                    <template #prepend>
                      <VIcon
                        :icon="item.icon"
                        class="me-2"
                      />
                    </template>
                  </VListItem>
                </VList>
              </VMenu>
            </VBtn>

            <div class="d-flex align-center flex-wrap mb-3">
              <h6 class="text-h6 me-3">
                {{ serverKey.name }}
              </h6>

              <VChip
                label
                color="primary"
                size="small"
              >
                {{ serverKey.permission }}
              </VChip>
            </div>

            <div class="d-flex align-center text-base font-weight-semibold mb-2">
              <h6 class="text-base me-3">
                {{ serverKey.key }}
              </h6>

              <div class="cursor-pointer">
                <VIcon
                  icon="tabler-copy"
                  class="text-disabled"
                />
              </div>
            </div>

            <span>Created on {{ serverKey.createdOn }}</span>
          </VCard>
        </VCardText>
      </VCard>
      <!-- !SECTION -->
    </VCol>

    <!-- SECTION Recent Devices -->
    <VCol cols="12">
      <!-- 👉 Table -->
      <VCard title="Recent Devices">
        <VDivider />

        <VTable class="text-no-wrap">
          <thead>
            <tr>
              <th scope="col">
                BROWSER
              </th>
              <th scope="col">
                DEVICE
              </th>
              <th scope="col">
                LOCATION
              </th>
              <th scope="col">
                RECENT ACTIVITIES
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="device in recentDevices"
              :key="device.recentActivity"
            >
              <td class="d-flex align-center">
                <VIcon
                  start
                  :icon="device.deviceIcon.icon"
                  :color="device.deviceIcon.color"
                />
                <h6 class="text-base font-weight-semibold">
                  {{ device.browser }}
                </h6>
              </td>
              <td>{{ device.device }}</td>
              <td>{{ device.location }}</td>
              <td>{{ device.recentActivity }}</td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
    <!-- !SECTION -->
    
    
    
  </VRow>
  
  

  <!-- SECTION Enable One time password -->
  <EnableOneTimePasswordDialog v-model:isDialogVisible="isOneTimePasswordDialogVisible" />
  <!-- !SECTION -->
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 5px;
}

.server-close-btn {
  inset-inline-end: 0.5rem;
}
</style>
