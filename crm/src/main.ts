/* eslint-disable import/order */
//  import '@/@fake-db/db'
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import ability from '@/plugins/casl/ability'
import i18n from '@/plugins/i18n'
import layoutsPlugin from '@/plugins/layouts'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@/styles/styles.scss'
import { abilitiesPlugin } from '@casl/vue'
import '@core/scss/template/index.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { subGroup } from './views/demos/components/list/demoCodeList'
// import maska from 'maska'

import axios from '@axios';
const instance = axios.create({
  baseURL: "https://api.aythen.com",
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
});



//GET TOOLS
const fetchsTools = async () => {
  localStorage.dataTools = await instance.get('/tool').then( res => { console.log('res', res); return JSON.stringify(res.data) })
  // console.log('e', localStorage.dataTools)
}

if(!localStorage.dataTools) fetchsTools()






if (localStorage.getItem['time-cookie']) {
  const fecha = new Date(localStorage.getItem['time-cookie']);
  const now = new Date();
  if ((ahora - now) / 1000 > 86400) {
    document.cookie = "timee-cookie=; max-age=0; path=/";
    location.href = "/";
  }
}else{
  document.cookie = "time-cookie=true; max-age=86400; path=/";
}

// //SERVICE WORKER
// if ("Notification" in window) {
//   Notification.requestPermission().then(function(permission) {
//         if (permission === "granted") {
//             console.log("Permission to receive notifications has been granted.");
//             if ('serviceWorker' in navigator) {
//                 navigator.serviceWorker.register('/sw.js', {
//                     scope: '/'
//                 })
                
//                 // Use serviceWorker.ready to ensure that you can subscribe for push
//             navigator.serviceWorker.ready.then(
//               (serviceWorkerRegistration) => {
//                 const options = {
//                   userVisibleOnly: true,
//                   applicationServerKey: 'BPSQSA135CqY5dyajFyYoLrAjRDz3I8HeHKPh0f2WDoFPKvV0g_pVY1U3HExIWA5WU2mvEktVAVa6uzYNcAZ1Xo'
//                 };
//                 serviceWorkerRegistration.pushManager.subscribe(options).then(
//                   (pushSubscription) => {
                      
//                       var data = {
//                           browser: navigator.userAgent,
//                           plataform: navigator.platform, 
//                           language: navigator.language,
//                           endpoint: pushSubscription.endpoint,
//                           createdAt: new Date().toString(),
//                       }
                      
                      
//                       if (data.browser.indexOf("Chrome") !== -1) {
//                           data.browser = 'Chrome'
//                         } else if (data.browser.indexOf("Edge") !== -1) {
//                           data.browser = 'Edghe'
//                         } else if (data.browser.indexOf("Firefox") !== -1) {
//                           data.browser = 'Firefox'
//                         } else {
//                           data.browser = 'Undefined'
//                         }
                        
//                     console.log('end', data);
//                   }, (error) => {
//                     console.error(error);
//                   }
//                 );
//               });
              
  
//             }else{
//                 console.log("Service worker not works.");
//             }
//         } else {
//             console.log("Permission to receive notifications has been denied.");
//         }
//     });
// }



loadFonts()
// Create vue app
const app = createApp(App)

// Use plugins
app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(layoutsPlugin)
// app.use(i18n) at the moment we only use es
app.use(abilitiesPlugin, ability, {
  useGlobalProperties: true,
})

// Mount vue app
app.mount('#app')
