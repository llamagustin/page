<script setup lang="ts">
import { cities, codes, provinces } from "@/@fake-db/data/address.ts";
import { useAccountListStore } from '@/views/apps/account/useAccountListStore';
import ImgAvatarDefault from "@/assets/images/avatars/default-avatar.png";
import Languages from "@/@fake-db/languages.js";

interface AccountData {
  id: number
  fullName: string
  company: string
  role: string
  country: string
  contact: string
  email: string
  currentPlan: string
  status: string
  avatar: string
  taskDone: number
  projectDone: number
  taxId: string
  language: string
}

interface Props {
  accountData: AccountData
  isDialogVisible: boolean
}

interface Emit {
  (e: 'update:modelValue', value: boolean): void
  (e: 'submit', value: AccountData): void
  (e: 'update:isDialogVisible', val: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()
const accountData = ref<AccountData>(structuredClone(toRaw(props.accountData)))
const isUseAsBillingAddress = ref(false)

watch(props, () => {
  accountData.value = structuredClone(toRaw(props.accountData))
})

const statusList=[
  {title:'Aceptado' ,value:400},
  {title:'Pendiente' ,value:300},
  {title:'Cancelado' ,value:200}
  ]

const onFormSubmit = () => {
  //const zip = accountData.value.address.zip
   
  emit('update:modelValue', false)
  emit('submit', accountData.value)
  emit('update:isDialogVisible', false)
}

const refInputEl = ref<HTMLElement>()

const changeAvatar = (file: Event) => {
  const fileReader = new FileReader()
  const { files } = file.target as HTMLInputElement

  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
        accountData.value.avatar = fileReader.result
    }
  }
}

const onFormReset = () => {
  accountData.value = structuredClone(toRaw(props.accountData))

  emit('update:isDialogVisible', false)
}

const dialogModelValueUpdate = (val: boolean) => {
  emit('update:isDialogVisible', val)
}

const computedCities = computed(()=>{
    const dataProvince: string | number = accountData.value.address.province
    let codeProvince=null;
    
    if (!dataProvince) return [];
    
    
    
    if(typeof dataProvince == "string")
      codeProvince = provinces.find(province => province.title == dataProvince)?.value ?? '01';
    else
      codeProvince=dataProvince;
    
    return cities.filter((city) => city.value.slice(0, 2) === codeProvince);
  
})

const computedCode = computed(()=>{
    let cityName = accountData.value.address.city;
    accountData.value.address.zip = [];

    if (!cityName) return [];
    const currentCity = cities.find(city => city.title == cityName);
    
    if (!currentCity) return [];
    
    return codes
      .filter((x) => x.municipio_id == currentCity.value)
      .map((code) => ({
        value: code.codigo_postal,
        title: code.codigo_postal,
      }));
  
})

function resetAvatar() {
  accountData.value.avatar = null
}


watch(() => props.isDialogVisible, (newValue) => {
  if(!newValue) return;
  let data = JSON.parse(JSON.stringify({ ...props.accountData.address }));
  
  if (data.province) {
    setTimeout(() => {
      if (data.city) {
        setTimeout(() => {
          accountData.value.address.city = data.city;
          if (data.zip) {
            setTimeout(() => {
              accountData.value.address.zip = data.zip;
            }, 100);
          }
        }, 100);
      }
    },100)
  }
})
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 850"
    :model-value="props.isDialogVisible"
    @update:model-value="dialogModelValueUpdate"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="dialogModelValueUpdate(false)" />

    <VCard class="pa-sm-5 pa-2">

      <VCardText>
        <!-- 👉 Upload Photo -->
          <form ref="refForm" class="d-flex flex-column justify-center gap-4" >
            <VRow>
              <VCol cols="12" md="6">
                <VRow>
                  <VCol cols="12" md="2">
                    <VImg v-if="accountData.avatar" width="56" :src="accountData.avatar" class="ma-auto" />
                    <VImg v-else width="56" :src="ImgAvatarDefault" class="ma-auto"/>
                  </VCol>
                
                  <VCol cols="12" md="6">
                    <div class="d-flex "> 
                    <VBtn size="small" class="mr-3" color="primary" @click="refInputEl?.click()" >
                        <VIcon icon="tabler-upload" class="d-sm-none" />
                        <span class="d-none d-sm-block">
                          {{ accountData.avatar ? 'Update image' : 'Upload Image' }}
                        </span>
                    </VBtn >
                      <input ref="refInputEl" type="file" name="file" accept=".jpeg,.png,.jpg,GIF" hidden @input="changeAvatar" >
                      <VBtn size="small" type="reset" color="secondary" variant="tonal" @click="resetAvatar" >
                        <span class="d-none d-sm-block">Reset</span>
                        <VIcon icon="tabler-refresh" class="d-sm-none" />
                      </VBtn>
                    </div>
                    <p class="text-body-1 mb-0 text-caption">
                      Allowed JPG, GIF or PNG. Max size of 800K
                    </p>
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12" md="6">
                <VRow class="align-center">
                <!-- 👉 Status -->
                <VCol cols="12" md="6">
                  <VSelect  v-model="accountData.status" label="Estado" :items="statusList" />
                </VCol>
                <VCol cols="12" md="6">
                  <VSelect v-model="accountData.languaje" label="Idioma" :items="Languages" />
                </VCol>
                </VRow>
              </VCol>
            </VRow>
          </form>
      </VCardText>
      

      <VCardText>
        <!-- 👉 Form -->
        <VForm
          class="mt-6"
          @submit.prevent="onFormSubmit"
        >
          <VRow>
            <!-- 👉 First Name -->
            <VCol
              cols="12"
              md="12"
            >
              <VTextField
                v-model="accountData.fullName"
                label="Nombre completo"
              />
            </VCol>
            <!-- 👉 Email -->
            <VCol cols="12" md="6" >
              <VTextField v-model="accountData.email" label="Correo" />
            </VCol>
            
            <!-- 👉 Phone -->
            <VCol cols="12" md="6">
              <VTextField
                v-model="accountData.phone"
                label="Telefono"
              />
            </VCol>

            <!-- 👉 Country -->
            <VCol cols="12" md="6" >
              <VSelect  v-model="accountData.address.country" label="País" :items="['España']" />
            </VCol>
            
            <!-- 👉 Province -->
              <VCol cols="12" md="6">
                <VSelect
                  label="Provincia"
                  v-model="accountData.address.province"
                  :items="provinces"
                  :item-value="(item) => item.title"
                />
              </VCol>
         
              <VCol cols="12" md="6">
                <VSelect
                  label="Ciudad"
                  v-model="accountData.address.city"
                  :items="computedCities"
                  :item-value="(item) => item.title"
                />
              </VCol>

              <!-- 👉 Zip Code -->
              <VCol cols="12" md="6">
                <VSelect
                  v-model="accountData.address.zip"
                  label="Zip Code"
                  multiple
                  :items="computedCode"
                />
              </VCol>
              
              <VCol cols="12">
                <VTextarea v-model="accountData.address.line" label="Dirección" rows="2" />
              </VCol>


            <!-- 👉 Submit and Cancel -->
            <VCol cols="12" class="d-flex flex-wrap justify-end gap-4" >
            <VBtn type="submit"> Actualizar </VBtn>              
            </VCol>
          </VRow>
  
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
 