<script lang="ts" setup>
  import FormEditable from '@/views/apps/form/FormEditable.vue'
  import { v4 as uuidv4 } from 'uuid';

  // Type: Forms data
  import type { FormData } from '@/views/apps/form/types';
  import { useFormStore } from '@/views/apps/form/useFormStore';


  const formListStore = useFormStore()

  console.log('list store', formListStore.forms)

  const router = useRouter();


  // 👉 Default Blank Data
  const formData = ref<FormData>({
    form: {
      id: uuidv4(),
      issuedDate: '',
      service: '',
      total: 0,
      avatar: '',
      formStatus: '',
      balance: 0,
      dueDate: '',
      client: {
        address: '',
        company: '',
        companyEmail: '',
        contact: '',
        country: '',
        fullName: '',
      },
      paymentDetails: {
        totalDue: '$12,110.55',
        bankName: 'American Bank',
        country: 'United States',
        iban: 'ETD95476213874685',
        swiftCode: 'BR91905',
      },
      user_id: 'c82c5d22-68f8-49ae-a464-e3aadb8383cd',
      items: [],
      note: '',
      paymentMethod: {},
      salesperson: '',
      thanksNote: ''
    }
  })

  // const paymentTerms = ref(true)
  // const clientNotes = ref(false)
  // const paymentStub = ref(false)
  // const selectedPaymentMethod = ref('Bank Account')
  // const paymentMethods = ['Bank Account', 'PayPal', 'UPI Transfer']

  // const payment = ref({paymentTerms:false,clientNotes:false,paymentStub:false,PaymentMethod: 'Bank Account'})

  const saveForm = () => {
    // formData.value.form.paymentMethod=payment.value;
    let data = formData.value;

    console.log(data);
    // formListStore.postForm(data).then(result=>{
    //   console.log(result)
    // });

    //{ name: 'apps-form-preview-id', params: { id: '5036' } }
    //router.push({ name: 'apps-form-preview-id', params: {id: ''} })
    //return false
    //router.push('/dashboard/leads')

    /*
    router.push({ name: 'user', params: {id: 123}});

      // or
      
      const id = 123;
      */
    //  router.push({ name: 'apps-form-preview-id', params: { id: '5036' } } );

  }
</script>

<template>
  <VRow>
    <!-- 👉 FormEditable -->
    <VCol cols="12" md="9">
      <FormEditable :data="formData" :payment="payment" />
    </VCol>

    <!-- 👉 Right Column: Form Action -->
    <VCol cols="12" md="3">
      <VCard class="mb-4">
        <VCardText>
          <!-- 👉 Back -->
          <VBtn block class="mb-2" :to="{ name: 'apps-form-list' }">
            Atrás
          </VBtn>

          <!-- 👉 Save Form -->
          <VBtn block class="mb-2" v-on:click="saveForm">
            Guardar Form
          </VBtn>

          <!-- 👉 Preview -->
          <VBtn block color="default" variant="tonal" class="mb-2" :to="{ name: 'apps-form-preview-id', params: { id: formData.form.id } }">
            Vista Previa
          </VBtn>

        </VCardText>
      </VCard>
      
      <div>
        <VExpansionPanels variant="popout">
          <VExpansionPanel v-for="form in formListStore.forms" :key="form">
            <VExpansionPanelTitle>
              Popout {{ form.id }}
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <div v-if="false">
                <VAvatar variant="tonal" :color="resolveAccountRoleVariant(account.role).color" class="me-3" size="38">
                  <VImg v-if="account.avatar" :src="account.avatar" />
                  <span v-else>{{ avatarText(account.fullName) }}</span>
                </VAvatar>
              </div>
              {{form}}
              {{form.info}}
              {{form.tools}}

              {{form.ref}}

              {{form.issuedDate}}
              {{form.dueDate}}
              {{form.payDate}}
              {{form.createdAt}}

              {{form.total}}
              {{form.status}}

              <VCard>
                <VCardText>

                </VCardText>
              </VCard>
              {{form.note}}
              ------
              View Copiar
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </div>


    </VCol>
  </VRow>
</template>
