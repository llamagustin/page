<script lang="ts" setup>
import ButtonStep from "@/shared/components/DumbComponents/ButtonStep.vue";

import OtpInput from "./OtpInput.vue";

import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

import axios from "axios";
// axiosIns.defaults.baseURL = "https://api.aythen.com"
const axiosIns = axios.create({
  baseURL: "https://api-prod.aythen.com",
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
});



// import ButtonStep from "@/shared/components/DumbComponents/ButtonStep.vue";

import { defineEmits, defineProps } from "vue";
import VSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import "vue3-treeselect/dist/vue3-treeselect.css";
// import LangJson from "./lang.json";

// import { textFormLocation } from "./text.js"

// const translation = reactive(LangJson.location);
import LangJson from "./lang.json";
const text = reactive(LangJson.fa2);



interface Props {
  dataForm: any
  show: (step: number) => void
}

interface Emits {
  (e: "setActivePanel", indexPanel: number): void;
}
const emit = defineEmits<Emits>();
const props = defineProps<Props>();

const {
  dataForm
} = toRefs(props);


onMounted(() => {
  emit("setActivePanel", 1);
});


var timeCount
const isTime = ref(true)
const count_resend = ref(0)

const time_resend = () => {
  isTime.value = false
  count_resend.value = 22
  
  timeCount = setInterval(() => {
    count_resend.value -= 1;
    if (count_resend.value === 0) {
      clearInterval(timeCount)
      isTime.value = true
    }
  }, 1000);
}


const sendVerified = async () => {
  if(isTime.value){
    var res = await axiosIns.post('/twilio/sms', {
      token: props.dataForm.token_phone,
      sender: props.dataForm.dial_phone
    })
    
    time_resend()
  }
}

sendVerified()


// const text = textFormLocation;

const updateOtp = (val) => {
  if(props.dataForm.token_phone == val){
    props.dataForm.valid_phone = true
    props.show(3)
  }
}


</script>



<template>
  <div>
    <div class=" d-flex align-center justify-center pa-4">
    <div class="position-relative ">
      <!-- 👉 Top shape -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <ButtonStep type-arrow="left" outline @click="show(1)" />
        </div>
      </div>
      <VDivider class="mt-8 mb-4 d-block" />

      <!-- 👉 Auth card -->
      <div
        class=""
      >
        <div class="pt-2">
          <h5 class="text-h5 font-weight-semibold mb-1">
            {{text.title}}
          </h5>
          <p class="mb-2">
            {{text.description}}
          </p>
          <h6 class="text-base font-weight-semibold">
            {{props.dataForm.dial_phone}}
          </h6>
        </div>

        <div class="mt-4">
          <VForm @submit.prevent="() => {}">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <OtpInput 
                @update-otp="updateOtp"/>
              </VCol>

              <!-- reset password -->
              <!--<VCol cols="12">-->
              <!--  <VBtn-->
              <!--    block-->
              <!--    type="submit"-->
              <!--  >-->
              <!--    {{text.button}}-->
              <!--  </VBtn>-->
              <!--</VCol>-->

              <!-- back to login -->
              <VCol cols="12">
                <div class="d-flex justify-center align-center flex-wrap">
                  <span class="me-1">{{text.label.title}}</span>
                  
                  <div v-if="isTime">
                    <VBtn @click="sendVerified" class="ml-2">
                      {{text.label.button}}
                    </VBtn>
                  </div>
                  <div v-else>
                    <b>
                      {{count_resend}} segundos
                    </b>
                  </div>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>



<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<style lang="scss" scoped>
.vs__select_scoped {
  & > .vs__dropdown-toggle {
    padding-block: 7px !important;
    border-radius: 6px !important;
  }
}
</style>


