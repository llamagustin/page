<script setup lang="ts">
import AppDateTimePicker from '@core/components/AppDateTimePicker.vue'


import VueTelInput from 'vue-tel-input'

// import the component
import TreeSelect from 'vue3-treeselect'
// import the styles
import 'vue3-treeselect/dist/vue3-treeselect.css'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { VForm } from 'vuetify/components'
import type { AccountProperties } from '@/@fake-db/types'
import { emailValidator, requiredValidator } from '@validators'
// import { provinces, cities, codes } from '@/@fake-db/data/Newress'
import { avatarText } from '@core/utils/formatters'

import VSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import VSelectThree from "vue-select";
import "vue-select/dist/vue-select.css";
import { useAccountListStore } from '@/views/apps/account/useAccountListStore'
import { getUsername } from "@/shared/utils/strings";
import { optionsCharge } from "./optionsCharge";


import AccountSearchByZip from "./AccountSearchByZip.vue";


interface Emit {
  (e: 'update:isDrawerOpen', value: boolean): void
  (e: 'accountData', value: AccountProperties): void
  (e: 'deleteAccount', value): void
}



interface Props {
  account: object
  isDrawerOpen: boolean
  isEdit: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()
const refForm = ref<VForm>()

const isSnackbarVisibility = ref(false)

// 👉 address
import { useUbigeo } from "@/shared/composables/useUbigeo"
const { ubigeo, getCities, getCodes } = useUbigeo()

const  ubi  = ref(ubigeo)

const address = ref({
  province: '',
  city: '',
  zip: '',
  line: ''
})


const statusInfo = ref(false)

const onInfo = (e) => {
  console.log('estatusInfo', statusInfo.value)
  if(statusInfo.value){
    props.account.infoAt = new Date()
  }else{
    props.account.infoAt = null
  }
}


const selectProvince = async (data) => {
  //value
  getCities(data.value)
  // getCities(id)
  props.account.address.province = data.title
  props.account.address.city = ''
  props.account.address.zip = ''
  props.account.address.line = ''
  
  address.value.city = ''
  address.value.zip = ''
  address.value.line = ''
} 


const selectCity = async (data) => {
  getCodes(data.value)
  //
  props.account.address.city = data.title
  props.account.address.zip = ''
  props.account.address.line = ''

  address.value.zip = ''
  address.value.line = ''
}

const selectCode = async (data) => {
  //
  props.account.address.zip = data.codigo_postal
  address.value.line = ''
}


watch(address.value, (data) => {
  if(!data.province){
    address.value.city = ''
    address.value.zip = ''
    address.value.line = ''
  }
  
})





// console.log('pro', props.account.id)
// if(props.account?.id){
//   accountListStore.fetchLeadsZips(props.account.id).then( res => {
//     console.log('rres1111', res)
//     zips_leads.value = res
//   })
// }

watch(() => props.account.address, (newValue) => {
    if(1){
      // initial.value = true
      if(props.account.address?.province) {
        address.value.province = ubi.value.provinces.find((item) => item.title == props.account.address?.province);
        
        if(!address.value.province) return
        console.log('address', address.value.province)
        getCities(address.value.province.value)
        
        if (props.account.address?.city) {
          setTimeout(() => {
            address.value.city = ubi.value.cities.find((city) => city.title === props.account.address?.city);
            
            if(!address.value.city) return
            getCodes(address.value.city.value);
            // console.log('pro', props.account.address)
            if (props.account.address?.zip) {
              setTimeout(() => {
                address.value.zip = ubi.value.codes.find((zip) => zip.value === props.account.address?.zip[0]);
              }, 100);
            }
          }, 100);
        }
      }
      
      
      if(props.account.id){
        accountListStore.fetchLeadsZips(props.account.id).then( res => {
          console.log('rres1111', res)
          zips_leads.value = res
        })
      }
      
    }
});





// 👉 drawer close
const closeNavigationDrawer = () => {
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}



// 👉 Store
const accountListStore = useAccountListStore()



const onSubmit = async () => {
    var v = await refForm.value?.validate() 
    if (v.valid) {
      
        //
        if(!props.isEdit){
           var result = await accountListStore.fetchByEmail(props.account.email)
       
           if(result.data !== 404){
             isSnackbarVisibility.value = true
             return false
           }
        }
        
        
        
        //address
        if(typeof props.account.address.zip == 'string'){
          props.account.address.zip = [props.account.address.zip]
        }else{
          props.account.address.zip = props.account.address.zip
        }

        emit('accountData', {
          id: props.account?.id ?? null,
          fullName: props.account.fullName,
          avatar: props.account.avatar,
          email: props.account.email,
          role: "reseller",
          phone: props.account.phone,
          address: props.account.address,
          zone: props.account.zone,
          category: props.account.category,
          status: props.account.status ?? 300,
          password: '1234',
          username: getUsername(props.account.fullName),
          
          
          rating: props.account?.rating || 5,
          steps: props.account?.steps || [],
          note: props.account?.note || '',
          infoAt: props.account?.infoAt || null
        })
        
        emit('update:isDrawerOpen', false)
        nextTick(() => {
          refForm.value?.reset()
          refForm.value?.resetValidation()
        })
     }
}



const onDelete = () => {
  emit('deleteAccount', props.account.id)
  
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}



const handleDrawerModelValueUpdate = (val: boolean) => {

  emit('update:isDrawerOpen', false)
  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}



//
const showPostal = ref(false)





const optionSource =  [
  { title: 'Indeed', value: 'indeed-reseller' },
  { title: 'Funnel Direct', value: 'funnel-reseller' }
]


const colorStatus = { '200': 'success', '300': 'warning', '400': 'error' }
// const status = [
//   { title: 'Activo', value: 200 },
//   { title: 'Pendiente', value: 300 },
//   { title: 'Inactivo', value: 400 }
// ]
  

const dateRange = ref('')  
  
  
const optionStatus = [
  { 
    title: 'Active', 
    value: 200
  },
  { 
    title: 'Pending', 
    value: 300
  },
  { 
    title: 'Inactive', 
    value: 400
  },
]




//
// const items = [{
//   'Filtro #1', 
//   'Design', 
//   'Vue', 
//   'Vuetify'
// ]
const itemsNote = ref(['Filtro #1', 'Filtro #2', 'Filtro #3'])

// const itemsNote = [{
//   title: 'Filtro #1', 
//   value: '#1', 
// },{
//   title: 'Filtro #2',
//   value: '#2'
// },{
//   title: 'Filtro #3',
//   value: '#3'
// }]




// const availableStatus = [{
//   color: 'error',
//   label: 'Canceled',
//   value: 400
// },
// {
//   color: 'warning',
//   label: 'Pendent',
//   value: 300
// },
// {
//   color: 'secondary',
//   label: 'Active',
//   value: 200
// }]






const refInputEl = ref<HTMLElement>()
const changeAvatar = (file: Event) => {
  const fileReader = new FileReader();
  const { files } = file.target as HTMLInputElement;
  
  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        props.account.avatar = fileReader.result
      }
    }
  }
}




//
const zips_leads = ref([])

const deleteZip = async (zip) => {
    // zips_leads.value = zips_leads.value.filter(x => x.value !== zip);
    var index = zips_leads.value.findIndex(x => x.value == zip)
    zips_leads.value[index].deleted = true

    // console.log('res', index, zips_leads.value, zip)
    var res = await axiosIns.post('/account/' + props.account.id + '/leads/zip/delete', {
      zip: zip
    })
    
    console.log('rrr', res)
}



</script>

<template>
  <VNavigationDrawer
    temporary
    :width="400"
    location="end"
    class="scrollable-content"
    @update:model-value="handleDrawerModelValueUpdate"
    :model-value="props.isDrawerOpen"
  >
    <!-- 👉 Title -->
    <div class="d-flex align-center pa-6 pb-1">
      <h6 v-if="isEdit" class="text-h6">
        Modificar
      </h6>
      <h6 v-else class="text-h6">
        Nuevo
      </h6>
      
      
      <VSpacer />
      
 
      <VBtn  @click="onSubmit" size="32" class="me-2">
        <VIcon size="18" icon="tabler-edit" />
      </VBtn>
      
      <VBtn v-if="!edit" @click="onDelete" size="32" color="error" class="me-2">
        <VIcon size="18" icon="tabler-trash" />
      </VBtn>
      
      <!-- 👉 Close btn -->
      <VBtn
        variant="tonal"
        color="default"
        icon
        size="32"
        class="rounded"
        @click="closeNavigationDrawer"
      >
        <VIcon
          size="18"
          icon="tabler-x"
        />
      </VBTn>
    </div>
    
    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText >
          <!-- 👉 Form -->
          <VForm
            ref="refForm"
            @submit.prevent="onSubmit"
          >
            
            <VDivider />
            
            <!-- 👉 Source -->
            <VCol class="py-0">
              <VRating 
                v-model="account.rating"
                clearable 
                class="py-0 me-10"/>
            </VCol>
              
            <VDivider class="mb-4"/>
            
            <VRow>
              <VCol cols="12" class="d-flex" >
                <div class="text-center">
                  <VAvatar variant="tonal" :color="colorStatus[account?.status || 400]" 
                    class="me-3" size="60">
                    <VImg v-if="account?.avatar" :src="account?.avatar" />
                    <span v-else>{{ avatarText(account?.fullName || '?') }}</span>
                  </VAvatar>
                </div>
                <form ref="refForm" class="d-flex flex-column justify-center gap-1"  >
                  <div class="d-flex gap-2"> 
                    <VBtn color="primary" @click="refInputEl?.click()" size="small" >
                      <VIcon icon="tabler-cloud-upload" class="d-sm-none" />
                      <span class="d-none d-sm-block">Upload photo</span>
                    </VBtn>
                    <input ref="refInputEl" type="file" name="file" accept=".jpeg,.png,.jpg,GIF" hidden @input="changeAvatar" >
                    <VBtn type="reset" color="secondary" size="small" variant="tonal" @click="resetAvatar" >
                      <span class="d-none d-sm-block">Reset</span>
                    </VBtn>
                    <div>
                      <VBtn v-if="!showPostal" color="secondary" size="small" variant="tonal" @click="showPostal = true" >
                        <VIcon size="20" icon="tabler-search" />
                      </VBtn>
                      <VBtn v-else color="secondary" size="small" variant="tonal" @click="showPostal = false" >
                        <VIcon size="20" icon="tabler-user" />
                      </VBtn>
                    </div>
                  </div>
                  <p class="text-sm-caption mb-0 text-grey-400">
                    Allowed JPG, GIF or PNG. Max size of 800K
                  </p>
                </form>
              </VCol>
            </VRow>
            
            <VDivider class="mt-2 mb-4"/>
            
            <VRow v-if="!showPostal"> 
              <!-- 👉 Source -->
              <VCol cols="12">
                <VCombobox
                  v-model="account.steps"
                  :items="itemsNote"
                  label="Notas rápidas"
                  multiple
                  chips
                />
              </VCol>
              
              <!-- 👉 Source -->
              <VCol cols="12">
                <VRow>
                  <VCol cols="6">
                    <!--<VSelect-->
                    <!--  v-model="account.source"-->
                    <!--  label="Source"-->
                    <!--  :items="source">-->
                    <!--</VSelect>-->
                    <VSelect
                        label="Source"
                        :options="optionSource"
                        class="vs__select_scoped"
                        :getOptionLabel="(item) => item.title"
                        :reduce="(item) => item.value"
                        v-model="account.source"
                        maxHeight="200px"
                      >
                        <template #no-options="{ search, searching }">
                          <template v-if="searching">
                            <p class="text-sm-caption">
                              No se han encontrado resultados para "<b>{{ search }}</b
                              >".
                            </p>
                          </template>
                          <p v-else class="text-sm-caption">No hay opciones</p>
                        </template>
                      </VSelect>
                  </VCol>
                  <VCol cols="6">
                      <VSelect
                        label="Estado"
                        :options="optionStatus"
                        class="vs__select_scoped"
                        :getOptionLabel="(item) => item.title"
                        :reduce="(item) => item.value"
                        v-model="account.status"
                        maxHeight="200px"
                      >
                        <template #no-options="{ search, searching }">
                          <template v-if="searching">
                            <p class="text-sm-caption">
                              No se han encontrado resultados para "<b>{{ search }}</b
                              >".
                            </p>
                          </template>
                          <p v-else class="text-sm-caption">No hay opciones</p>
                        </template>
                      </VSelect>
                  </VCol>
                </VRow>
              </VCol>
              
              <VDivider class="mt-2 mb-4"/>
              
              
              <!-- 👉 Full name -->
              <VCol cols="12">
                <VTextField
                  v-model="account.fullName"
                  label="Full Name"
                  :rules="[requiredValidator]"
                />
              </VCol>
              
              <!-- 👉 Call -->
              <VCol cols="12">
                <AppDateTimePicker
                  v-model="dateRange"
                  label="LLamar"
                />  
              </VCol>
              
              <!-- 👉 Cargos -->
              <VCol cols="12">
                <div id="app">
                  <TreeSelect
                    v-model="account.category"
                    :multiple="true" 
                    :options="optionsCharge" />
                </div>
              </VCol>

              <!-- 👉 Email -->
              <VCol cols="12">
                <VTextField
                  v-model="account.email"
                  :rules="[requiredValidator, emailValidator]"
                  label="Email"
                />
              </VCol>
              
              
              <VCol cols="12">
                <VueTelInput 
                  v-model="account.phone"
                />
                <VTextField
                  v-model="account.phone"
                  :rules="[requiredValidator]"
                  label="Phone"
                  v-bind="account.props"
                />
              </VCol>
              
              <VDivider class="my-2"/>
              
              <!-- 👉 Country -->
              <VCol cols="6">
                <VTextField
                  v-model="account.address.country"
                  label="País"
                  readonly
                />
              </VCol>
            
              <!-- 👉 Provincia -->
              <VCol cols="12" sm="6" md="6">
                <VSelect
                  label="Provincia"
                  :options="ubi.provinces"
                  class="vs__select_scoped"
                  :getOptionLabel="(item) => item.title"
                  :reduce="(item) => item.value"
                  v-model="address.province"
                  maxHeight="200px"
                  @option:selected="selectProvince"
                >
                  <template #no-options="{ search, searching }">
                    <template v-if="searching">
                      <p class="text-sm-caption">
                        No se han encontrado resultados para "<b>{{ search }}</b
                        >".
                      </p>
                    </template>
                    <p v-else class="text-sm-caption">No hay opciones</p>
                  </template>
                </VSelect>
              </VCol>
              
   
              <!-- 👉 Ciudad -->
              <VCol cols="12" sm="7" md="7" 
                v-if="address.province">
                <VSelect
                  id="city"
                  label="Ciudad"
                  :options="ubi.cities"
                  class="vs__select_scoped"
                  :getOptionLabel="(item) => item.title"
                  :reduce="(item) => item.value"
                  v-model="address.city"
                  maxHeight="200px"
                  @option:selected="selectCity"
                  
                >
                  <template #no-options="{ search, searching }">
                    <template v-if="searching">
                      <p class="text-sm-caption">
                        No se han encontrado resultados para "<b>{{ search }}</b
                        >".
                      </p>
                    </template>
                    <p v-else class="text-sm-caption">No hay opciones</p>
                  </template>
                </VSelect>
              </VCol>
              
              <!-- 👉 Zip -->
              <VCol
                cols="12"
                sm="5"
                md="5"
                v-if="address.city"
              >
                <VSelect
                  id="postal-code"
                  label="Zip"
                  :options="ubi.codes"
                  class="vs__select_scoped"
                  :getOptionLabel="(item) => item.codigo_postal"
                  :reduce="(item) => item.value"
                  v-model="address.zip"
                  maxHeight="200px"
                  @option:selected="selectCode"
                >
                  <template #no-options="{ search, searching }">
                    <template v-if="searching">
                      <p class="text-sm-caption">
                        No se han encontrado resultados para "<b>{{ search }}</b
                        >".
                      </p>
                    </template>
                    <p v-else class="text-sm-caption">No hay opciones</p>
                  </template>
                </VSelect>
              </VCol>

              
              <!-- 👉 Line -->
              <VCol cols="12" v-if="address.zip">
                <VTextField
                  v-model="account.line"
                  label="Dirección"
                />
              </VCol>
              
              
              <VDivider class="my-2"/>
            
              <VCol cols="12">
                <VTextarea
                  v-model="account.note"
                  label="Nota Reseller"
                  auto-grow
                />
              </VCol>
              
              <VCol cols="12">
                <VCheckbox v-model="statusInfo" @change="onInfo">
                  <template #label>
                    <div>
                      Email 
                      <VTooltip location="bottom">
                        <template #activator="{ props }">
                          <a
                            href="https://api.aythen.com/static/src/assets/email/reseller/mail-step-1.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            v-bind="props"
                            @click.stop
                          >
                            enviado
                          </a>
                        </template>
                        Guia Reseller
                      </VTooltip>
                      a {{account.fullName}}
                    </div>
                  </template>
                </VCheckbox>
              </VCol>
              
            </VRow>
            <VRow v-else>
              <VCard
                v-for="(zip, key) in zips_leads"
                :key="key ">
                <div v-if="!zip?.deleted">
                  <AccountSearchByZip 
                    @delete-zip="deleteZip"
                    :zip="zip"
                  />
                </div>
              </VCard>
            </VRow>
          </VForm>
          
          
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
  
  
    <VSnackbar v-model="isSnackbarVisibility"
      location="bottom start"
      multi-line
      :timeout="10000">
      El "Email" ya ha sido registrado.
    </VSnackbar>
</template>

<style lang="scss">
.checkbox{
  padding: 4px 0px !important;
}

body {
  --vs-actions-padding: 5px 10px;
  --vs-dropdown-option--active-color: #7367F0;
}

.vs__selected-options {
  font-size: 15px !important;
}
</style>