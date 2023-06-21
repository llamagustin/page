<script setup lang="ts">
  import FormToolEdit from './FormToolEdit.vue'
  import type { FormData } from './types'
  import { useForm } from './useForm'
  import { useFormStore } from './useFormStore'
  import { useUserListStore } from '../user/useUserListStore'
  // import type { Client } from '@/@fake-db/types'
  import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
  import { themeConfig } from '@themeConfig'
  import Debugger from "@/shared/utils/debugger"
  import { useTools } from "@/shared/composables/useTools"

  interface Emit {
    (e: 'changeForm', value: any): void
  }
  interface Props {
    data: FormData
  }

  const emit = defineEmits<Emit>();
  const props = defineProps<Props>();
  
  const { tools } = useTools();
  const formListStore = useFormStore()
  const userListStore = useUserListStore()
  const { infoForm } = useForm()

  // 👉 Clients
  const users = ref([]);
  const userData = JSON.parse(localStorage.userData) || []

  // 👉 fetch Leads
  userListStore.fetchLeads(userData.id).then(response => {
    response.data.users.map(user => {
      var name = (user.name?.name || '' + ' ' + user.name?.firstSurname || '' + ' ' + user.name?.secondSurname || '').trim()
      if (name !== 'undefined') {
        users.value.push({
          value: user.id,
          title: name
        })
      }
    })
  }).catch(err => {
    console.log(err)
  })


  const totalLicense = ref(0)
  const totalCost = ref(0)

  const changeTool = async (tool: any) => {
    // eslint-disable-next-line vue/no-mutating-props
    const type = tool.data.type
    props.data.tools[tool.index] = tool.data

    totalLicense.value = 0

    for (var i = 0; i < props.data.form.tools.length; i++) {
      props.data.tools[i].type = type
      totalLicense.value += props.data.form.tools[i].qty
      totalCost.value += props.data.form.tools[i].cost
    }

    emit('changeForm', props.data)
  }

  // 👉 Add item function
  const addTool = () => {
    // eslint-disable-next-line vue/no-mutating-props
    props.data.tools.push({
      title: '',
      cost: '42.67',
      qty: 1,
      tag: '',
      description: '',
      type: 'month',
      reseller: null
    })
  }

  // 👉 Remove Tool edit section
  const removeTool = (id: number) => {
    // eslint-disable-next-line vue/no-mutating-props
    props.data.tools.splice(id, 1)
    emit('changeFom', props.data)
  }

  const selectedLead = ref(props.data.user_id || null)
  const resellers = ref([])

  const cards = ref([{
      title: 'Method 01',
      value: 'Token 01'
    },
    {
      title: 'Method 02',
      value: 'Token 02'
    },
    {
      title: 'Method 03',
      value: 'Token 03'
    },
  ])

  const selectedCard = ref([]);

  watch(selectedLead, val => {

    // console.log('tt', val)
    userListStore.fetchUser(val).then(res => {
      Debugger.log('fetchUser', res)
      // console.log('resellers: ', res);
      // console.log('rrr', res)
      // cards.value = 
      // cards.value = res.carddetails
      res.reseller.map(x => {
        resellers.value.push({
          title: x.name,
          value: x.id
        })
      })
    })

  });

  var sendMethodPayment = () => {
    // 👉 Add payment method
    alert(1)
  }


  // watch( (props.data.tools), () => {
  //   console.log('wffr')
  // })
  // props.data.tools.map( x => {
  // x.qty
  // })
</script>

<template>
  <VCard>
    <!-- SECTION Header -->
    <!--  eslint-disable vue/no-mutating-props -->
    <VCardText class="d-flex flex-xs-wrap justify-space-between flex-row ">
      <!-- 👉 Left Content -->
      <div class="ma-sm-4">
        <div class="d-flex align-center mb-6">
          <!-- 👉 Logo -->
          <VNodeRenderer :nodes="themeConfig.app.logo" class="me-3" />
          <!-- 👉 Title -->
          <h6 class="font-weight-bold text-xl">
            {{ themeConfig.app.title }}
          </h6>
        </div>

        <!-- 👉 Address -->
        <p class="mb-0">
          {{infoForm.address}}
        </p>
        <p class="mb-0">
          {{infoForm.city}}
        </p>
        <p class="mb-0">
          {{infoForm.phone}}, {{infoForm.email}}
        </p>
      </div>

      <!-- 👉 Right Content -->
      <div class="mt-4 ma-sm-4">
        <!-- 👉 Form Id -->
        <h6 v-if="props.data?.id" class="d-flex align-center font-weight-medium justify-sm-end text-xl mb-3">
          <span class="me-3">Form</span>
          <span>
            <VTextField v-model="props.data.id" disabled prefix="#" density="compact" style="width: 14rem;" />
          </span>
        </h6>

        <!-- 👉 Issue Date -->
        <p class="d-flex align-center justify-sm-end mb-3">
          <span class="me-3">Emisión</span>
          <span>
            <AppDateTimePicker v-model="props.data.issuedDate" density="compact" placeholder="YYYY-MM-DD" style="width: 14rem;" />
          </span>
        </p>
        <!-- 👉 Due Date -->
        <p class="d-flex align-center justify-sm-end mb-0">
          <span class="me-3">Vencimiento</span>
          <span>
            <AppDateTimePicker v-model="props.data.dueDate" density="compact" placeholder="YYYY-MM-DD" style="width: 14rem;" :config="{ position: 'auto right' }" />
          </span>
        </p>
      </div>
    </VCardText>
    <!-- !SECTION -->
    <VDivider />
    <!-- 👉 Payment Details -->
    <VCardText class="d-flex justify-space-between flex-wrap flex-column flex-sm-row print-row">
      <VRow>
        <VCol cols="4">
          <div>
            <VAutocomplete v-model="selectedLead" label="Form to" :items="users" item-text="fullName" clearable clear-icon="tabler-x" autocomplete="none" />
          </div>
        </VCol>
        <VCol cols="5" v-if="cards.length">
          <div>
            <VAutocomplete v-model="selectedCard" label="Pay to" :items="cards" item-text="fullName" clearable clear-icon="tabler-x" autocomplete="none" />
          </div>
        </VCol>
        <VCol cols="4" v-if="selectedLead">
          <VBtn v-if="cards.length == 0" @click="sendMethodPayment">
            Método de pago
          </VBtn>
          <div v-else>
            <VBtn v-if="1">
              Enviar pago
            </VBtn>
            <VBtn v-else>
              Enviar impago
            </VBtn>
          </div>
        </VCol>
      </VRow>
    </VCardText>

    <VDivider />

    <!-- 👉 Add purchased tools -->
    <VCardText class="add-tools-form">
      <div v-for="(tool, index) in props.data.tools" :key="tool.title" class="ma-sm-4">
        <FormToolEdit :id="index" :data="tool" 
          :resellers="resellers" 
          :total-license="totalLicense"
          @change-tool="changeTool"
          @remove-tool="removeTool"
        />
      </div>

      <div class="mt-4 ma-sm-4">
        <VBtn @click="addTool"> Añadir </VBtn>
      </div>
    </VCardText>

  </VCard>
</template>


<style land="scss">
  .v-card-text {
    &.note {
      padding: 4px;
    }
  }
</style>
