<script lang="ts" setup>
// import axios from "@axios";
import Notifications from '@core/components/Notifications.vue'
import type { Notification } from '@layouts/types'
import { useAlerts } from "@/shared/composables/useAlerts"
// 👉 Resources
// import avatar3 from '@/assets/images/avatars/avatar-3.png'
// import avatar4 from '@/assets/images/avatars/avatar-4.png'
// import avatar5 from '@/assets/images/avatars/avatar-5.png'
// import paypal from '@/assets/images/svg/paypal.svg'
// const userData = JSON.parse(localStorage.userData);
const { alerts } = useAlerts();
// const notifications: Notification[] = [
//   {
//     img: avatar4,
//     title: 'Congratulation Flora! 🎉',
//     subtitle: 'Won the monthly best seller badge',
//     time: 'Today',
//   },
//   {
//     text: 'Tom Holland',
//     title: 'New user registered.',
//     subtitle: '5 hours ago',
//     time: 'Yesterday',
//   },
//   {
//     img: avatar5,
//     title: 'New message received 👋🏻',
//     subtitle: 'You have 10 unread messages',
//     time: '11 Aug',
//   },
//   {
//     img: paypal,
//     title: 'Paypal',
//     subtitle: 'Received Payment',
//     time: '25 May',
//     color: 'error',
//   },
//   {
//     img: avatar3,
//     title: 'Received Order 📦',
//     subtitle: 'New order received from john',
//     time: '19 Mar',
//   },
// ]

// const notifications = ref([]);

// onMounted(() => {
//   // console.log('1111')
//   axiosIns.get('/devices/' + userData.id).then( res => {
//     // console.log('res push', res)
//   })
// })

</script>

<template>
  <Notifications :notifications="alerts" />
</template>
