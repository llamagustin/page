<script setup lang="ts">
import { timeAgo } from '@/shared/utils/date'

import { onMounted } from 'vue';
import axios from "axios";

const axiosIns = axios.create({
  baseURL: "https://api.aythen.com",
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
});
  // import axiosInstance from "@axios";
  // import { localStore } from '@/shared/utils/sessionStore.ts'

  interface Emit {
    (e: 'updatePassword', value: string): void
    (e: 'updateAccount', value:any): void
  }
  

  const emit = defineEmits<Emit>()
  
  
  const pass = ref('');
  const confirmPass = ref('');

  const isNewPasswordVisible = ref(false)
  const isConfirmPasswordVisible = ref(false)
  const smsVerificationNumber = ref('+1(968) 819-2547')
  const isTwoFactorDialogOpen = ref(false)
  // const key = "BG1RRYn7WKcMNPCtalYvj4OOqgsLAh1C8lfsFIc04JCqC5us9OPl3hJ-D6s-PiqFmdQkRrRdBWRYNmj7PpldN0Q"
  const key = 'BPSQSA135CqY5dyajFyYoLrAjRDz3I8HeHKPh0f2WDoFPKvV0g_pVY1U3HExIWA5WU2mvEktVAVa6uzYNcAZ1Xo'
  
  const device = reactive({});
  const location = reactive({ latitude: null, longitude: null });



  const OnUnpdatePassword = () => {
    console.log('wdwe', confirmPass.value)
    emit('updatePassword', confirmPass.value)
  }

  interface Props {
    accountData: {}
  }

  const props = defineProps<Props>();
  
  
  
  const devices = ref([])
  if(props.accountData.devices){
    console.log('213io3jk')
    const {devices: devicesInit} = props.accountData;
    
    devices.value = devicesInit ? devicesInit : [];
    console.log('de', devices.value)
  }
  
  const deleteDevices = async (id) => {
    
    const res = await axiosIns.post('/account/delete/devices', {
      id: props.accountData.id,
      device: id
    })
  
    if (res.data == 200) {
      console.log('wfkmirw')
      var index = devices.value.findIndex(x => x.id == id)
      console.log('eee', index)
      delete devices.value[index]
      devices.value = Boolean(devices.value)
    }
  }

  var fetchDevices = () => {

  }



  const registerPemission = ref(true)
  const registerActive = ref(false)

  if (Notification.permission === 'granted') {
    registerPemission.value = true
  }
  
  

 
  async function registerDevice() {
    if ('Notification' in window) {
      Notification.requestPermission().then(async (permission) => {
        if (permission === "granted") {
          navigator.serviceWorker.register('/sw.js', { scope: '/' })
          
          navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
            const options = {
              userVisibleOnly: true,
              applicationServerKey: 'BI2GGdf8jYG2Oom-CHoVo8CQdhW1ZF96aU4w-k_WsTJ6RD26TbuSO8a9EyFw7QEd_Hw-nEvO8IB0uItLPq_u2f0'
            };
            
            serviceWorkerRegistration.pushManager.subscribe(options).then((pushSubscription) => {
              navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
                
                location.latitude = latitude;
                location.longitude = longitude;
                
                var suscription = JSON.parse(JSON.stringify(pushSubscription))
    
                device.lastActivity = new Date().toString();
                device.location = location;
                device.plataform = navigator.platform;
                device.suscription = suscription
    
                const browserMap = ['Google Chrome', 'Microsoft Edge', 'Brave', 'Opera', 'Opera GX'];
                const { userAgentData } = navigator;
                if (userAgentData) {
                  let brandFound = "";
                  for (const { brand } of userAgentData.brands) {
                    const inc = browserMap.includes(brand);
                    if (inc) brandFound = brand;
                  }
                  device.browser = browserMap.find(browser => browser === brandFound) || 'Undefined';
                }
                else {
                  const data = navigator.userAgent.split(" ");
                  device.browser = data[data.length - 1].split("/")[0];
                }
    
                devices.value.push(device);
                const data = {
                  id: props.accountData.id,
                  type: 'account',
                  device
                };
                
                axiosIns.post(`/account/add/devices`, data).then(res => {
                  // 👉 Se puede realizar una acción despúes de guardar el Device en la DB
                })
              });
            }, (error) => {
              console.error(error);
            });
          });
        }
        else {
          console.log("Service worker not works.");
        }
      })
   }
  }
  
  
  //notification
  const typeNotification = [
    'Aviso de registro',
    'Aviso de seguimiento',
    'Aviso nuevo lead',
    'Aviso nuevo impacto'
  ]
  
  const notifications = ref([ 
    { t: 0, a: false, b: false},
    { t: 1, a: false, b: false},
    { t: 2, a: false, b: false},
    { t: 3, a: false, b: false},
  ]);
  
  const saveNotifications = () => {
    props.accountData.notification = notifications.value;
    
    emit('updateAccount', props.accountData);
  }
  
  async function unregisterDevice() {
    navigator.serviceWorker.ready.then(function(registration) {
      registration.pushManager.getSubscription().then(function(subscription) {
        console.log('fijf', subscription)
        if (subscription) {
          subscription.unsubscribe().then(function(successful) {
            console.log('Push unsubscription successful', successful);
            registerActive.value = false
          }).catch(function(e) {
            console.log('Push unsubscription failed: ', e);
          });
        }
      }).catch(function(e) {
        console.error('Error during getSubscription()', e);
      });
    });
  }
  
  async function pushNotification() {
    const data = {
      id: props.accountData.id,
      type: 'account',
    }
    
    const res = await axiosIns.post('/devices/send', data);
    console.log('data not:', res)
  }

</script>

<template>
  <VRow>
    <VCol cols="12">
      <!-- 👉 Change password -->
      <VCard title="Cambiar Contraseña">
        <VCardText>
          <VAlert variant="tonal" color="warning" class="mb-4">
            <VAlertTitle class="mb-1">
              Asegúrese de que se cumplan estos requisitos
            </VAlertTitle>
            <span>
              Mínimo 8 caracteres de largo, mayúsculas y símbolos
            </span>
          </VAlert>
          <VForm @submit.prevent="OnUnpdatePassword">
            <VRow>
              <VCol cols="12" md="6">
                <VTextField label="Nueva Constraseña" :type="isNewPasswordVisible ? 'text' : 'password'" :append-inner-icon="isNewPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'" @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible" v-model="pass" />
              </VCol>
              <VCol cols="12" md="6">
                <VTextField label="Confirma Contraseña" :type="isConfirmPasswordVisible ? 'text' : 'password'" :append-inner-icon="isConfirmPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'" @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible" v-model="confirmPass" />
              </VCol>
              <VCol cols="12">
                <VBtn type="submit">
                  Cambiar Contraseña
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
    
    <VCol cols="12">
      <VCard class="user-tab-notification">
        <VCardItem>
          <VCardTitle>Notificaciones</VCardTitle>
          <p class="text-sm mt-2 mb-0">
            Recibirá una notificación para los elementos seleccionados a continuación.
          </p>
        </VCardItem>
        <VCardText>
          <VTable class="border rounded text-no-wrap">
            <thead>
              <tr>
                <th scope="col"> </th>
                <th scope="col"> EMAIL </th>
                <th scope="col"> APP </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="n in notifications" :key="n.t">
                <td>{{ typeNotification[n.t] }}</td>
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

    <VCol cols="12">
      <VCard title="Dispositivos Recientes">
        <template #append>
          <div v-if="registerPemission">
            <VBtn v-if="devices.length" @click="pushNotification" prepend-icon="tabler-plus" size="small">
              Push
            </VBtn>
            <VBtn v-if="registerActive" @click="unregisterDevice" color="danger" size="small">
              Unsync
            </VBtn>
            <VBtn v-else @click="registerDevice" prepend-icon="tabler-plus" size="small">
              Sync
            </VBtn>
          </div>
          <label v-else>
            No permission granted
          </label>
        </template>
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
                RECENT ACTIVITY
              </th>
              <th width="30"></th>
            </tr>
          </thead>
          <tbody>
            <template v-if="devices.length">
              <tr v-for="(device, key) in devices" :key="key">
                <td>
                  <span class="font-weight-medium"> {{ device.browser || 'not exist' }}</span>
                </td>
  
                <td class="text-medium-emphasis">
                  {{ device.plataform || 'not exist' }}
                </td>
                
                <!--<td class="text-medium-emphasis">-->
                <!--  latitude: {{ device.location.latitude || 'not exist'}},-->
                <!--  longitude: {{ device.location.longitude || 'not exist'}}-->
                <!--</td>-->
  
                <td class="text-medium-emphasis">
                  {{ timeAgo(device.lastActivity) || 'not exist'}}
                </td>
                <td>
                  <VBtn @click="deleteDevices(device.id)" size="small" title="Quitar">
                    <v-icon icon="mdi-trash"></v-icon>
                  </VBtn>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="4">
                  <p class="py-4 m-0 text-center text-secondary">
                    <span class="d-block mb-1">
                      <v-icon icon="tabler-device-mobile-plus" color="secondary" size="50" />
                    </span>
                    <span class="d-block mb-1">
                      No hay dispositivos sincronizados
                    </span>
                    <VBtn @click="registerDevice" size="small">
                      Sincronizar
                      <v-icon icon="tabler-refresh" />
                    </VBtn>
                  </p>
                </td>
              </tr>
            </template>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>

  <!-- 👉 Enable One Time Password Dialog -->
  <AccountEnablePassword v-model:isDialogVisible="isTwoFactorDialogOpen" :mobile-number="smsVerificationNumber" />
</template>
