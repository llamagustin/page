<script lang="ts" setup>
  import FormAddPaymentDrawer from '@/views/apps/form/FormAddPaymentDrawer.vue'
  import FormEditable from '@/views/apps/form/FormEditable.vue'
  import Form from '@/views/apps/form/Form.vue'
  import FormSendFormDrawer from '@/views/apps/form/FormSendFormDrawer.vue'

  // Type: form data
  import type { FormData } from '@/views/apps/form/types'

  // Store
  // import { useForm } from '@/views/apps/form/useForm'
  import { useFormStore } from '@/views/apps/form/useFormStore'

  const formListStore = useFormStore()
  const route = useRoute()

  //const formData = ref<FormData>()
  // const { infoForm } = useForm()

  const formData = ref(formListStore.$state.formData)
  // console.log(formData)
  // 👉 fetchForm
  formListStore.fetchForm(route.params.id).then(response => {
    if (response.data !== 404) {
      console.log('e', formData)
      formData.value = response.data
      calculateForm()
    }
    console.log(response.data);
    // payment.value=response.data.paymentMethod;

    // formData.value = {
    //   form: response.data,
    // /* paymentDetails: response.data.paymentDetails,
    //   items:response.data.items,
    //   note: 'It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!',
    //   paymentMethod: 'Bank Account',
    //   salesperson: 'Tom Cook',
    //   thanksNote: 'Thanks for your business',*/
    // }
  }).catch(error => {
    //console.log(error)
  })

  const isSendSidebarActive = ref(false)
  const isAddPaymentSidebarActive = ref(false)
  const paymentTerms = ref(true)
  const clientNotes = ref(false)
  const paymentStub = ref(false)
  const selectedPaymentMethod = ref('Bank Account')
  //const paymentMethods = ['Bank Account', 'PayPal', 'UPI Transfer']

  const payment = ref({
    paymentTerms: false,
    clientNotes: false,
    paymentStub: false,
    PaymentMethod: 'Bank Account'
  })

  const updateForm = () => {
    // console.log('save event')
    // formData.value.form.paymentMethod=payment.value;
    let data = formData.value;
    console.log({ data })
    // formListStore.postForm(data).then(result=>{
      // router.push('/apps/form/list')
    // });
  }




  //
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#ED6B6C'
      case 'medium':
        return '#FFAC5C'
      default:
        return '#B4B5B9'
    }
  }


  const allEvents = [{
    id: '',
    priority: '12',
    title: '323'
  }]

  // const _total = ref(0)

  const subtotal = ref(0)
  const discount = ref(0)
  const tax = ref(0)
  const total = ref(0)


  const calculateForm = () => {
    subtotal.value = 0
    formData.value.tools?.map(x => {
      subtotal.value += parseFloat(x.cost)
    })

    tax.value = (parseFloat(subtotal.value) * 0.21).toFixed(2)
    total.value = (parseFloat(subtotal.value) + parseFloat(tax.value)).toFixed(2)
  }

  const changeForm = (form: any) => {
    formData.value = form

    calculateForm()
  }
</script>

<template>
  <VRow>
    <!-- 👉 FormEditable   -->
    <VCol v-if="formData" cols="12" md="9">
      <Form :data="formData" @change-form="changeForm" />
      <!--<FormEditable :data="formData" :payment="payment" @change-form="changeForm" />-->
    </VCol>

    <!-- 👉 Right Column: Form Action -->
    <VCol cols="12" md="3" class="relative">
      <div class="fixed">
        <VCard class="mb-4">
          <VCardText>

            <div class="d-flex gap-2">
              <div class="w-50">
                <!-- 👉  Preview button -->
                <VBtn block color="secondary" variant="tonal" :to="{ name: 'apps-form-preview-id', params: { id: route.params.id } }">
                  Preview
                </VBtn>
              </div>

              <div class="w-50">
                <!-- 👉 Save button -->
                <VBtn block variant="tonal" @click="updateForm">
                  Save
                </VBtn>
              </div>
            </div>

            <!-- 👉 Add Payment trigger button 
            <VBtn
              block
              prepend-icon="tabler-currency-dollar"
              @click="isAddPaymentSidebarActive = true"
            >
              Add Payment
            </VBtn> -->
          </VCardText>
        </VCard>



        <!-- 👉 Total Amount -->
        <VCard class="d-flex flex-column gap-2 pa-4">
          <div class="my-2 mx-sm-4">
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

        <div side="end" align="start" truncate-line="both" density="compact" class="mt-4 v-timeline-density-compact">
          <VExpansionPanels variant="popout">
            <VExpansionPanel v-for="item in 4" :key="item">
              <VExpansionPanelTitle>Popout {{ item }}</VExpansionPanelTitle>
              <VExpansionPanelText>
                Cupcake ipsum dolor sit amet. Candy canes cheesecake chocolate bar I love I love jujubes gummi bears ice cream. Cheesecake tiramisu toffee cheesecake sugar plum candy canes bonbon candy.
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </div>

        <VTimeline side="end" align="start" truncate-line="both" density="compact" class="v-timeline-density-compact">
          <VTimelineItem v-for="item in allEvents" :key="item.id" :dot-color="getPriorityColor(item.priority)" size="x-small" class="time-line-custom">
            <div class="d-flex justify-space-between gap-2">
              <h6 class="event-title text-subtitle-2 font-weight-semibold">
                {{ item.title }}
              </h6>
            </div>
            <div v-if="false" class="d-flex align-center">
              <VAvatar :image="item?.user?.avatar || ImgDefaultAvatar" class="me-3" />
              <div class="text-sm">
                <span class="text-primary">Lead</span>
                <p class="mb-0 name-client">{{ item?.user?.fullName }}</p>
              </div>
            </div>
            <div v-if="false" class="mb-0">
              <span class="mb-2 font-weight-bold text-sm-caption">
                {{ MiniMoment.formatDateWithHour(item.start) }}
              </span>
            </div>
          </VTimelineItem>
        </VTimeline>
      </div>
    </VCol>



  </VRow>
</template>

<style type="text/css" scoped>
  .relative {
    position: relative;
  }

  .fixed {
    position: fixed;
  }
</style>
