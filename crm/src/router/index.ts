import { canNavigate } from '@layouts/plugins/casl'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import { isUserLoggedIn } from './utils'


// Import
import router from "@/router";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ℹ️ We are redirecting to different pages based on role.
    // NOTE: Role is just for UI purposes. ACL is based on abilities.
    {
      path: '', // /
      redirect: to => {
        const userData = JSON.parse(localStorage.getItem('userData')) || ''
        const userRole = userData && userData.role ? userData.role : null
        // console.log('u', userData)
      
        if (userRole){
          return { name: 'dashboard-leads' }
        }else{
          return { name: 'login' }
        }
        //return { name: 'login', query: to.query }
      },
    },
    {
      path: '/reset-password', // /
      redirect: to => {
        if(!to.query.email){
          return { name: 'login' }
        }
        
        return { name: 'reset-password' }

        // const userData = JSON.parse(localStorage.getItem('userData')) || ''
        // const userRole = userData && userData.role ? userData.role : null
        // // console.log('u', userData)
      
        // if (userRole){
        //   return { name: 'dashboard-leads' }
        // }else{
        //   return { name: 'login' }
        // }
        //return { name: 'login', query: to.query }
      },
    },
    ...setupLayouts(routes),
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})



// var abilities = JSON.parse(localStorage.getItem('userAbilities') || '[]')
// var block = abilities.find(x => x.action === 'block') || false
// console.log('a', abilities)

var user = JSON.parse(localStorage.getItem('userData') || '{}')
var abilities = JSON.parse(localStorage.getItem('userAbilities'))
var block = abilities?.action == 'block' ? true : false
    
    
// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
router.beforeEach(to => {
  const isLoggedIn = isUserLoggedIn()
  
  console.log('is login', isLoggedIn, canNavigate(to))
  // console.log('t0', to)
  
  if(isLoggedIn){
    //test
      if(to.meta.redirectIfLoggedIn){
         return  { name: 'dashboard-leads' }
      }
      
      if(block){
        if(to.name !== 'form-academy') return  { name: 'form-academy' }
      }else{
        if(to.meta.redirectIfBlockIn){
          return  { name: 'dashboard-leads' }
        }
        // return  { name: 'dashboard-leads' }
      }
    
    // else if(block){
    //   //view here
    //   if(to.redirectIfBlockIn){
    //     console.log('aaa')
    //     //return  { name: 'form-academy' }
    //   }else{
    //     return  { name: 'form-academy' }
    //   }
    // }
    //dashboard
  }else{
    //ACL'
    if(canNavigate(to)){
      // console.log('eeeee')
    }else{
      console.log('name', to.name)
        if(to.name !== 'login'){
          return  { name: 'not-authorized' } 
        }else if(to.name == 'login'){
          // return  { name: 'not-authorized' } 
        }else{
          return { name: 'login' }
        }
    }
      
      //return { name: 'login', query: { to: to.name !== 'index' ? to.fullPath : undefined } }
      
      //login
    
  }
  
})

export default router
