<script lang="ts" setup>
import { cities, codes, provinces } from "@/@fake-db/data/address.ts";
import avatar1 from '@/assets/images/avatars/avatar-14.png';
import { useUserListStore } from '@/views/apps/user/useUserListStore';

import BillingHistoryTable from "./BillingHistoryTable.vue";

import mastercard from "@/assets/images/icons/payments/mastercard.png";
import visa from "@/assets/images/icons/payments/visa.png";

interface Props { 
  billingaddress:object
  userData:object
};
const props = defineProps<Props>()

interface Emit { (e: 'updateUser', value: any): void }
const emit = defineEmits<Emit>()

const isLoading =ref(true)
const store=useUserListStore()



const refInputEl = ref<HTMLElement>()

const isConfirmDialogOpen = ref(false)

const isAccountDeactivated = ref(false)

const validateAccountDeactivation = [(v: string) => !!v || 'Please confirm account deactivation']

// changeAvatar function
const changeAvatar = (file: Event) => {
  const fileReader = new FileReader()
  const { files } = file.target as HTMLInputElement

  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
       props.userData.avatar = fileReader.result
       saveUser()
    }
  }
}

const saveUser=async ()=>{
  await store.updateUser({...props.userData})
}

// reset avatar image
const resetAvatar = () => {
 props.userData.avatar = avatar1
}

const timezones = [
  '(GMT-11:00) International Date Line West',
  '(GMT-11:00) Midway Island',
  '(GMT-10:00) Hawaii',
  '(GMT-09:00) Alaska',
  '(GMT-08:00) Pacific Time (US & Canada)',
  '(GMT-08:00) Tijuana',
  '(GMT-07:00) Arizona',
  '(GMT-07:00) Chihuahua',
  '(GMT-07:00) La Paz',
  '(GMT-07:00) Mazatlan',
  '(GMT-07:00) Mountain Time (US & Canada)',
  '(GMT-06:00) Central America',
  '(GMT-06:00) Central Time (US & Canada)',
  '(GMT-06:00) Guadalajara',
  '(GMT-06:00) Mexico City',
  '(GMT-06:00) Monterrey',
  '(GMT-06:00) Saskatchewan',
  '(GMT-05:00) Bogota',
  '(GMT-05:00) Eastern Time (US & Canada)',
  '(GMT-05:00) Indiana (East)',
  '(GMT-05:00) Lima',
  '(GMT-05:00) Quito',
  '(GMT-04:00) Atlantic Time (Canada)',
  '(GMT-04:00) Caracas',
  '(GMT-04:00) La Paz',
  '(GMT-04:00) Santiago',
  '(GMT-03:30) Newfoundland',
  '(GMT-03:00) Brasilia',
  '(GMT-03:00) Buenos Aires',
  '(GMT-03:00) Georgetown',
  '(GMT-03:00) Greenland',
  '(GMT-02:00) Mid-Atlantic',
  '(GMT-01:00) Azores',
  '(GMT-01:00) Cape Verde Is.',
  '(GMT+00:00) Casablanca',
  '(GMT+00:00) Dublin',
  '(GMT+00:00) Edinburgh',
  '(GMT+00:00) Lisbon',
  '(GMT+00:00) London',
]

const currencies = [ 'USD', 'EUR', 'GBP', 'AUD', 'BRL', 'CAD', 'CNY', 'CZK', 'DKK', 'HKD', 'HUF', 'INR', ]

//------------------------------------------------------------

//billing address
const saveBillingAddress=()=>{
  props.userData.billingaddress=billingAddress.value;
  emit("updateUser",{...props.userData})

}



const billingAddress = ref({
  companyName: "",
  country: "España",
  province: "",
  city: "",
  address: "",
  state: "",
  zipCode: "",
});



const countryList = [ "United States", "Canada", "United Kingdom", "Australia", "New Zealand", "India", "Russia", "China", "Japan"];

const computedCities = (val)=>{
  const provincia=val || props.userData.address.province;
  
  if(provincia === '') return []
  return cities.filter((item:any)=> String(item.value).startsWith(provincia))
}
const computedCode = val =>{
     const city=val || props.userData.address.city;
     
     if(!val) return []
     
     return codes.filter((item:any)=> String(item.municipio_id) == city).map((item:any)=> {
       return {
         value: item.codigo_postal,
         title: item.municipio_nombre
       }
     })
}

watch(props,val=>{
  if(!!val.userData.billingaddress){
    billingAddress.value=val.userData.billingaddress
  }
})





//active cards


interface CardDetails {
  name: string
  number: string
  expiry: string
  isPrimary: boolean
  type: string
  cvv: string
  image: string
}

const selectedPaymentMethod = ref("credit-debit-atm-card");

const isPricingPlanDialogVisible = ref(false);
const isConfirmDialogVisible = ref(false);
const isCardEditDialogVisible = ref(false);
const isCardAddDialogVisible = ref(false)
const isCardDetailSaveBilling = ref(false);
//mapear y actualizar el array
const creditCards: CardDetails[] = ref([
  {
    name: "Tom McBride",
    number: "5531234567899856",
    expiry: "12/23",
    isPrimary: true,
    type: "visa",
    cvv: "456",
    image: visa,
  },
  {
    name: "Mildred Wagner",
    number: "4851234567895896",
    expiry: "10/27",
    isPrimary: false,
    type: "mastercard",
    cvv: "123",
    image: mastercard,
  },
]);


const isUser=ref(false);

const currentCardDetails = ref();
const indice = ref();

const openEditCardDialog = (cardDetails: CardDetails, i: Number) => {
  indice.value = i;
  currentCardDetails.value = cardDetails;

  isCardEditDialogVisible.value = true;
};

const handleEditSubmit = (data:CardDetails) => {
  creditCards[indice.value] = data;
};

const isDialogVisible = ref(true)



const typeCards ={
  "visa":visa,
  "mastercard":mastercard
}

const cardSubmit = (data:CardDetails)=> {
  let aplica= !!props.userData.carddetails || false;
  
  if (!aplica) props.userData.carddetails = [];
  props.userData.carddetails.push(data)
  
  emit('updateUser',{...props.userData})
}
  
  
  
const eliminarCard = (index :number)=> {
  let pagos=props.userData.carddetails;
  pagos.splice(index,1);
  props.userData.carddetails = pagos;
  
  saveUser()
}

const updateCard = (data:CardDetails)=>{
  props.userData.carddetails[indice.value] = data;
  saveUser()
}



const activeCards = computed(()=>{
  return props.userData.carddetails || [];
})


const maskCardNumber=val=>{
  val=val||"****";
  let rs=`**** **** **** ${val.substring(val.length - 4)}`
  
  return rs
}


</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Profile Details">
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar rounded size="100" class="me-6" :image="props.userData.avatar" />
          
          <!-- 👉 Upload Photo -->
          <form ref="refForm" class="d-flex flex-column justify-center gap-4" >
            <div class="d-flex flex-wrap gap-2"> 
            <VBtn color="primary" @click="refInputEl?.click()" >
                <VIcon icon="tabler-cloud-upload" class="d-sm-none" />
                <span class="d-none d-sm-block">Upload new photo</span>
            </VBtn>

              <input ref="refInputEl" type="file" name="file" accept=".jpeg,.png,.jpg,GIF" hidden @input="changeAvatar" >

              <VBtn type="reset" color="secondary" variant="tonal" @click="resetAvatar" >
                <span class="d-none d-sm-block">Reset</span>
                <VIcon icon="tabler-refresh" class="d-sm-none" />
              </VBtn>
            </div>

            <p class="text-body-1 mb-0">
              Allowed JPG, GIF or PNG. Max size of 800K
            </p>
          </form>
        </VCardText>

        <VDivider />

        <VCardText class="pt-2">
          <!-- 👉 Form -->
          <VForm class="mt-6">
            <VRow>
              <!-- 👉 FullName -->
              <VCol cols="12" >
                <VTextField v-model="props.userData.fullName" label="Full Name" />
              </VCol>

              <!-- 👉 Email -->
              <VCol cols="12" md="6" >
                <VTextField
                  v-model="userData.email"
                  label="E-mail"
                  type="email"
                />
              </VCol>

              <!-- 👉 Organization -->
              <VCol cols="12" md="6" >
                <VTextField v-model="userData.company" label="Company" />
              </VCol>

              <!-- 👉 Phone -->
              <VCol cols="12" md="4" >
                <VTextField v-model="props.userData.phone" label="Phone Number" />
              </VCol>

              <!-- 👉 Country -->
              <VCol cols="12" md="4" >
                <VSelect v-model="props.userData.address.country" label="Country" :items="['España']" />
              </VCol>

              <!-- 👉 State -->
              <VCol cols="12" md="4">
              <!--VTextField ese era el que estaba antes-->
                <VSelect
                  @update:modelValue="props.userData.address.city = props.userData.address.zip =''"
                  v-model="props.userData.address.province"
                  label="Provincia"
                  :items="provinces"
                />
              </VCol>
         
              <VCol cols="12" md="4">

                <VSelect
                  @update:modelValue="props.userData.address.zip =''"
                  v-model="props.userData.address.city"
                  label="Ciudad"
                  :items="computedCities()"
                />
              </VCol>

              <!-- 👉 Zip Code -->
              <VCol cols="12" md="4" >
                <VSelect
                  v-model="props.userData.address.zip"
                  label="Zip Code"
                  :items="computedCode(props.userData.address.city)"
                />
              </VCol>

              <!-- 👉 Language -->
              
             <VCol cols="12" md="4" >
                <VSelect
                  v-model="props.userData.language"
                  label="Language"
                  :items="['Español','English']"
                />
              </VCol>
              
               <!-- 👉 Currency -->
              <VCol
                cols="12"
                md="4"
              >
                <VSelect
                  v-model="props.userData.currency"
                  label="Currency"
                  :items="currencies"
                  :menu-props="{ maxHeight: 200 }"
                />
              </VCol>
              
               <!-- 👉 Address -->
              <VCol
                cols="12"
                md="8"
              >
                <VTextField v-model="props.userData.address.line" label="Address" />
              </VCol>

              <!-- 👉 Timezone 
              <VCol
                cols="12"
                md="6"
              >
                <VSelect
                  v-model="userData.timezone"
                  label="Timezone"
                  :items="timezones"
                  :menu-props="{ maxHeight: 200 }"
                />
              </VCol>
-->
        

              <!-- 👉 Form Actions -->
              <VCol cols="12" class="d-flex flex-wrap gap-4" >
                <VBtn @click="saveUser">Save changes</VBtn>
                <VBtn color="secondary" variant="tonal" type="reset" @click.prevent="resetForm" >
                  Reset
                </VBtn>
              </VCol>
            </VRow>
    
          </VForm>
        </VCardText>
        
      </VCard>
    </VCol>

  <!-- 👉 Billing Address -->
    <VCol cols="12">
      <VCard title="Billing Address">
        <VCardText>
          <VForm @submit.prevent="() => {}">
            <VRow>
              <!-- 👉 Company name -->
              <VCol cols="12" md="8">
                <VTextField v-model="billingAddress.companyName" label="Company Name" />
              </VCol>

              <!-- 👉 Country -->
              <VCol cols="12" md="4">
                <VSelect
                  v-model="billingAddress.country"
                  label="Pais"
                  :items="['España']"
                />
              </VCol>
              <VCol cols="12" md="4">
                <VSelect
                  @update:modelValue="billingAddress.city = billingAddress.zip =''"
                  v-model="billingAddress.province"
                  label="Provincia"
                  :items="provinces"
                />
              </VCol>
              <VCol cols="12" md="4">
                <VSelect
                  @update:modelValue="billingAddress.zip =''"
                  v-model="billingAddress.city"
                  label="Ciudad"
                  :items="computedCities(billingAddress.province)"
                  v-show="billingAddress.province !== ''"
                />
              </VCol>

              <!-- 👉 Zip Code -->
              <VCol cols="12" md="4">
                <VSelect label="Zip Code" v-show="billingAddress.city !== ''" v-model="billingAddress.zipCode" :items="computedCode(billingAddress.city)" />
              </VCol>
              <!-- 👉 Billing Address -->
              <VCol cols="12" md="12" >
                <VTextField v-model="billingAddress.address" label="Billing Address" />
              </VCol>

              <!-- 👉 Actions Button -->
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn @click="saveBillingAddress"> Save changes </VBtn>
                <VBtn type="reset" color="secondary" variant="tonal"> Reset </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
        
      </VCard>
    </VCol>
    
    
    <!-- 👉 Payment Methods -->
    <VCol v-if="activeCards.length>0" cols="12">
      <VCard title="Payment Methods">
        <VCardText>
          <VForm @submit.prevent="()=>{}">
            <VRow>
   
              <!-- 👉 Saved Cards -->
              <VCol cols="12">
                <h6 class="text-base font-weight-medium mb-3">My Cards</h6>
               
                <div class="d-flex flex-column gap-y-4">
                  <VCard
                    v-for="(card, i) in activeCards"
                    :key="card.name"
                    flat
                    variant="tonal"
                  >

                    <VCardText class="d-flex flex-sm-row flex-column pa-4">
                      <div class="text-no-wrap">
                    <VImg :src=" typeCards[card.type]"  :width="60" :height="25" />   
                        <h4 class="my-3">
                          {{ card.name }}
                          <VChip v-if="card.isPrimary" label color="primary" size="small">
                            Primaria
                          </VChip>
                        </h4>
                        <span class="text-base"> {{maskCardNumber(card.number)}}</span>
                        
                      </div>

                      <VSpacer />

                      <div class="d-flex flex-column text-sm-end">
                        <div class="d-flex flex-wrap gap-4 order-sm-0 order-1">
                          <VBtn variant="tonal" @click="openEditCardDialog(card, i)">
                            Edit
                          </VBtn>
                          <!--eliminar una tarjeta de la lista-->
                          <VBtn color="secondary" variant="tonal" @click="eliminarCard(i)"> Eliminar </VBtn>
                        </div>
                        <span class="text-sm mt-sm-auto mb-sm-0 my-5 order-sm-1 order-0"
                          >Card expires at {{ card.expiry }}</span
                        >
                      </div>
                    </VCardText>
                  </VCard>
                </div>

                  <AccountCard
                    :indice="indice"
                    @update="updateCard"
                    v-model:isDialogVisible="isCardEditDialogVisible"
                    :card-details="currentCardDetails"
                    class="v-dialog-lg"
                  />
              </VCol>

              <!-- 👉 Payment method action button -->
              <VCol v-if="false" cols="12" class="d-flex flex-wrap gap-4">
                <VBtn  @click="isCardAddDialogVisible= !isCardAddDialogVisible"> Añadir Tarjeta</VBtn>
              </VCol>

            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
    
     <AccountCard
      :indice="-1"
      @submit="cardSubmit"
      v-model:isDialogVisible="isCardAddDialogVisible"
      class="v-dialog-lg"
    />
    
    
    
  <!-- 👉 Billing History -->
    <VCol cols="12">
      <BillingHistoryTable />
    </VCol>

  
  <VCol cols="12">
      <!-- 👉 Delete Account -->
      <VCard title="Delete Account">
        <VCardText>
          <!-- 👉 Checkbox and Button  -->
          <VAlert
            color="warning"
            variant="tonal"
            class="mb-4"
          >
            <VAlertTitle class="mb-1">
              Are you sure you want to delete your account?
            </VAlertTitle>
            <p class="mb-0">
              Once you delete your account, there is no going back. Please be certain.
            </p>
          </VAlert>
          <div>
            <VCheckbox
              v-model="isAccountDeactivated"
              :rules="validateAccountDeactivation"
              label="I confirm my account deactivation"
            />
          </div>

          <VBtn
            :disabled="!isAccountDeactivated"
            color="error"
            class="mt-3"
            @click="isConfirmDialogOpen = true"
          >
            Deactivate Account
          </VBtn>
        </VCardText>
        
      </VCard>
    </VCol>
  
   </VRow>
    
    
    <!-- Confirm Dialog -->
  <ConfirmDialog
    v-model:isDialogVisible="isConfirmDialogOpen"
    confirmation-msg="Are you sure you want to deactivate your account?"
  />
</template>
