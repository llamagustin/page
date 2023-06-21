<script lang="ts" setup>

const types=['New for you','Account activity','A new browser used to sign in','A new device is linked']

interface Props {
  userData: {notification: []}
}
const props = defineProps<Props>()

let notifications = reactive([ 
  { t: 0, e: false, b: false,a: false},
  { t: 1, e: false, b: false,a: false},
  { t: 2, e: false, b: false,a: false},
  { t: 3, e: false, b: false,a: false},
]);


  

const getValue =(item:object) =>{
  
  let qr = props.userData?.notification || {};
  
  let rs=qr[item.t] ;
  
  
  return rs
}


for (var i = 0; i < notifications.length; i++) {
  
  notifications[i] = getValue(notifications[i])
}


interface Emit { 
   (e: 'updateLead', value: any): void
 }

const emit = defineEmits<Emit>()

const updateLead = ()=>{
  props.userData.notification=notifications;
  
  console.log('-->', notifications)
  
  emit('updateLead', props.userData)
    
}

</script>

<template>
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
          <VBtn @click="updateLead"> Save Changes </VBtn>
          <VBtn color="secondary" variant="tonal" type="reset" > Reset </VBtn>
        </div>
      </VForm>
    </VCardText>
  </VCard>
</template>
