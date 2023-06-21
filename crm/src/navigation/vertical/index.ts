import main from './main'
import business from './business'
import appAndPages from './app-and-pages'
import aythenGpt from "./aythen-gpt"
import aythenData from "./aythen-data"

import lead from './lead'
import other from './other'

import type { VerticalNavItems } from '@/@layouts/types'

var menu = [...appAndPages, ...lead, ...other]

const userData = localStorage.userData;
let abilities = JSON.parse(localStorage.getItem('userAbilities') || '{}')

if(userData) {
  // abilities = JSON.parse(abilities);
  // const hasManage = abilities.some(ability => ability?.action === 'manage')
  const hasManage = abilities.action == 'manage' ? true : false
// console.log('eee menu', hasManage)
  if(hasManage) {
    menu = [...main, ...aythenGpt, ...aythenData, ...business,...appAndPages, ...lead, ...other]
    // menu = [...main, ...business,...appAndPages, ...lead, ...other]
  }
}


export default menu as VerticalNavItems


