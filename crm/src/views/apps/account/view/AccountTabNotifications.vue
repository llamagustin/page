<script lang="ts" setup>

const types=['New for you','Account activity','A new browser used to sign in','A new device is linked']


interface Emit { (e: 'updateAccount', value): void }
interface Props { accountData: {} }

const emit = defineEmits<Emit>()
const props = defineProps<Props>()

//notification
const notifications = ref([ 
    { t: 0, e: false, b: false,a: false},
    { t: 1, e: false, b: false,a: false},
    { t: 2, e: false, b: false,a: false},
    { t: 3, e: false, b: false,a: false },
]);


const getValue =(item:object) =>{
  
  let dbNotification = props.accountData.notification 
  
  let aplica=Array.isArray(dbNotification);
  
  console.log('item:', dbNotification,aplica)
  if(!aplica) return item
console.log('item:', dbNotification)
  

  let qr=dbNotification.filter(n=> n.t==item.t) ;
  return qr[0]
}



for (var i = 0; i < notifications.value.length; i++) {
  notifications.value[i] = getValue(notifications.value[i])
}


const saveNotifications=()=>{
  
  props.accountData.notification=notifications.value;
  
  emit('updateAccount', props.accountData);
  
}


</script>

<template>
  <VCard class="user-tab-notification">
    <VCardItem>
      <VCardTitle>Notifications</VCardTitle>
      <p class="text-sm mt-2 mb-0">
        You will receive notification for the below selected items.
      </p>
    </VCardItem>
    <VCardText>
      <VTable class="border rounded text-no-wrap">
        <thead>
          <tr>
            <th scope="col"> NOTIFICATION </th>
            <th scope="col"> EMAIL </th>
            <th scope="col"> BROWSER </th>
            <th scope="col"> APP </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="n in notifications" :key="n.t" >
            <td>{{ types[n.t] }}</td>
            <td>
              <VCheckbox v-model="n.e" />
            </td>
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
</template>
