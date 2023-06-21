<script setup lang="ts">
import axios from "axios";

const axiosIns = axios.create({
  baseURL: "https://api.aythen.com",
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
});


import { PhCheckCircle, PhCurrencyEur } from "phosphor-vue";
import { defineEmits, defineProps } from "vue";
// €
interface Emit {
  (e: "update:isDialogVisible", val: boolean): void;
}

interface Prop {
  accountData: {};
  isDialogVisible?: boolean;
}

const props = defineProps<Prop>();
const emit = defineEmits<Emit>();



const listAbilities = ref([{
  title: 'Permitir acceso reseller',
  value: 'allow_reseller'
},{
  title: 'Acceso admin reseller',
  value: 'manage_reseller'
},{
  title: 'Autoasignar Leads',
  value: 'assign_reseller'
}])


// const abilities = ref(Object.keys(props.accountData.abilities || []))


const abilities = ref([])

console.log('account abilities', props.accountData.abilities)
if(props.accountData.abilities?.action == 'manage'){
  abilities.value.push('manage_reseller')
}

if(props.accountData.abilities?.action !== 'block'){
  abilities.value.push('allow_reseller')
}

if(props.accountData.abilities?.assign){
  abilities.value.push('assign_reseller')
}


const upgradeAbilities = async (data) => { 
  console.log('111 upgrade', data)
  // var options = {}

  // for(var i = 0; i<abilities.value.length; i++){
  //   options[abilities.value[i]] = new Date()
  // }

  // var data = {
  //   id: props.accountData.id,
  //   abilities: {
  //     options: options
  //   }
  // }
  
  var options = {}
  
  
  if(abilities.value.includes('allow_reseller')){
      var index = abilities.value.indexOf("action");
      if (index > -1) abilities.value.splice(index, 1);
  }else{
    options.action = 'block'
  }
  
  abilities.value.includes('manage_reseller') ? options.action = 'manage' : null
  abilities.value.includes('assign_reseller') ? options.assign = true : options.assign = false
  
  
  var data = {
    id: props.accountData.id,
    abilities: options
  }
  

  console.log('ab', data)
  // return

  // 
  var res = await axiosIns.put('/account/abilities', data)

  props.accountData.abilities = res.data.abilities

  // 👉 upgrade plan
  // localStorage.userData = JSON.stringify(props.accountData)
  // localStorage.userAbilities = JSON.stringify(res.data.abilities)
}


watch(() => abilities.value, upgradeAbilities)
</script>

<template>
  <!-- 👉 upgrade plan -->
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 560"
    :model-value="isDialogVisible"
    persistent
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="emit('update:isDialogVisible', false);" />

    <VCard class="py-5">
      <!--<VCardItem class="text-center">-->
        <!--<VCardTitle-->
        <!--  class="text-h6 text-lg-h4 text-grey-700"-->
        <!--  style="line-height: 1.3"-->
        <!-- > -->
        <!--</VCardTitle>-->
      <!--</VCardItem>-->
      <VCardText>
        <h5 class="font-weight-bold text-grey-600 text-lg mb-2">
          Lead Generator
        </h5>
        <p class="text-caption aythen-text-sm">
          Asigna leads a cada Reseller y define las métricas con las que 
          quiere que este Reseller este trabajando.
        </p>
        <p class="mb-2">Elige el mejor plan.</p>
      </VCardText>
      <VDivider  />
      <VCardText class="">
        <VRow>
          <VCol cols="12" sm="12" md="12">
             <VSwitch
                v-for="ability in listAbilities"
                v-model="abilities"
                :label="ability.title"
                :value="ability.value"
              />
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style lang="scss" scoped>
.card__styled {
  position: relative;
  padding: 0.5em;
  border: 1px solid lightgray;
  border-radius: 0.6em;
  block-size: 100%;

  &.active {
    border-color: transparent;
    box-shadow: 0 0 4px blue;
  }
}

.text-recommended {
  position: absolute;
  display: block;
  border-radius: 50px;
  background: white;
  box-shadow: 0 0 4px;
  inset-block-start: -1em;
  inset-inline: 1em;
  line-height: 1;
  padding-block: 5px;
  padding-inline: 10px;
}

.option-card {
  display: flex !important;
  align-items: center !important;
  gap: 0.5em !important;
  font-size: 1em !important;
}

.switchPlan {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1em;
  font-size: .9em;
  & > label {
    line-height: 1;
  }
}

.aythen-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: row;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    font-size: 15px;
  }
}



</style>
