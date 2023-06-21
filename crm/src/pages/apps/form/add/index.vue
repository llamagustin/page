<script lang="ts" setup>
  // import FormEditable from '@/views/apps/form/FormEditable.vue'
  import Form from '@/views/apps/form/Form.vue'
  import { v4 as uuidv4 } from 'uuid';
  import { ref, watch } from "vue";
  // Type: Forms data
  import { useForm } from '@/views/apps/form/useForm'
  import { FormData } from '@/views/apps/form/types';
  import { useFormStore } from '@/views/apps/form/useFormStore';
  import { useRouter } from "vue-router"
  import { cloneDeep } from 'lodash'
  
  
  const userData = JSON.parse(localStorage.userData) || []
  
  const formListStore = useFormStore()
  const { infoForm } = useForm()
  
  // console.log('list store', formListStore.forms)

  const router = useRouter();
  const initialState = newInitialState();
  
  
  function dateNow() {
    let date = new Date();
    let formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
    return formattedDate;
  }
  function newInitialState() {
    let now = dateNow();
    return {
      id: uuidv4(),
      service: "subencionate",
      total: 0,
      dueDate: now,
      note: "",
      paymentMethod: {
        name: "",
        token: "",
      },
      tools: [],
      user_id: userData.id,
      info: { ...infoForm.value },
      client_id: "",
      issuedDate: now,
      payDate: now,
      status: 200,
      ref: "ref123"
    }
  }
  
  // 👉 Default Blank Data
  const formData = ref<FormData>(cloneDeep(initialState))
  
  // const paymentTerms = ref(true)
  // const clientNotes = ref(false)
  // const paymentStub = ref(false)
  // const selectedPaymentMethod = ref('Bank Account')
  // const paymentMethods = ['Bank Account', 'PayPal', 'UPI Transfer']

  // const payment = ref({paymentTerms:false,clientNotes:false,paymentStub:false,PaymentMethod: 'Bank Account'})
  const payment = ref({
    paymentTerms: false,
    clientNotes: false,
    paymentStub: false,
    PaymentMethod: 'Bank Account'
  })

  const saveForm = () => {
    console.log('FURMULARIO',formData.value)
    let data = cloneDeep(formData.value);
    if(formInvalid(data)) return;
    errors.value = [];
    console.log(data)
    /*formListStore.postForm(data).then(result => {
      router.push('/apps/form/list')
    });*/
  }
  
  let errors = ref([]);
  function formInvalid(payload) {
    let count = 0;
    errors.value = [];
  
    /*
    if(!payload.client_id) {
      errors.value.push('Seleccione un(a) Lead.')
      count++;
    }*/
    
    if(!payload.paymentMethod?.name) {
      errors.value.push('Seleccione un método de pago.')
      count++;
    }
    
    if(!payload.tools.length) {
      errors.value.push('Seleccione al menos 1 servicio.')
      count++;
    }
    
    return count > 0;
  }

  const subtotal = ref(0)
  const discount = ref(0)
  const tax = ref(0)
  const total = ref(0)
  
  const calculateForm = () => {
    subtotal.value = 0
    const sub = formData.value.tools.reduce((acc, c) => acc + parseFloat(c.cost), 0)
    subtotal.value = sub;
    tax.value = (sub * 0.21).toFixed(2)
    total.value = (sub + parseFloat(tax.value)).toFixed(2)
    formData.value.total = Number(total.value)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ED6B6C'
      case 'medium': return '#FFAC5C'
      default: return '#B4B5B9'
    }
  }
</script>

<template>
  <VRow justify="center">
    <VCol cols="12" md="9">
      <VRow justify="space-between" class="mb-4">
        <VCol cols="12" md="4" lg="3">
          <VBtn block color="error" :to="{ name: 'apps-form-list' }">
            atrás
          </VBtn>
        </VCol>
        <VCol cols="12" md="4" lg="3">
          <VBtn block v-on:click="saveForm">
            Guardar
          </VBtn>
        </VCol>
        <VCol cols="12" md="4" lg="3">
          <VBtn block color="default" variant="tonal">
            <!--:to="{ name: 'apps-form-preview-id', params: { id: formData.form.id } }"-->
            Vista Previa
          </VBtn>
        </VCol>
      </VRow>
      <VAlert v-show="errors.length" title="Corrija los errores" color="error" class="mb-4">
        <ul>
          <li class="pl-3" v-for="error in errors">{{  error }}</li>
        </ul>
      </VAlert>
      
      <Form :data="formData" @change-form="calculateForm" />
    </VCol>
    
    <!-- 👉 RIGHT CONTENT -->
    <VCol cols="12" md="3" class="relative">
      <div class="fixed">
        <!--<VCard class="mb-4">-->
        <!--  <VCardText>-->
        <!--    <div class="d-flex gap-2">-->
        <!--      <div class="w-50">-->
        <!--        <VBtn block color="secondary" variant="tonal" :to="{ name: 'apps-form-preview-id', params: { id: route.params.id } }">-->
        <!--          Preview-->
        <!--        </VBtn>-->
        <!--      </div>-->
        <!--      <div class="w-50">-->
        <!--        <VBtn block variant="tonal" @click="updateForm">-->
        <!--          Save-->
        <!--        </VBtn>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--  </VCardText>-->
        <!--</VCard>-->
        <!-- 👉 Total Amount -->
        <VCard class="d-flex flex-column gap-2 pa-4">
          <div class="my-2">
            <VTable density="compact" style="overflow: auto;" hover>
              <tbody>
                <tr>
                  <th class="text-end">Subtotal:</th>
                  <td class="font-weight-semibold text-right">${{subtotal}}</td>
                </tr>
                <tr>
                  <th class="text-end">Descuento:</th>
                  <td class="font-weight-semibold text-right">${{discount}}</td>
                </tr>
                <tr>
                  <th class="text-end">Tax:</th>
                  <td class="font-weight-semibold text-right">${{tax}}</td>
                </tr>
                <tr>
                  <th class="text-end">Total:</th>
                  <td class="font-weight-semibold text-right">${{total}}</td>
                </tr>
              </tbody>
            </VTable>
          </div>
    
          <VDivider />
    
          <div class="my-2 w-100">
            <VCardText class="note" :style="{padding: '0px'}">
              <p class="font-weight-semibold mb-2">
                Nota:
              </p>
              <VTextarea v-model="formData.note" :rows="2" />
            </VCardText>
          </div>
    
        </VCard>
      </div>
    </VCol>
  
  </VRow>
</template>
