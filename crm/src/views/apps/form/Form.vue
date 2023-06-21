<script setup lang="ts">
  import FormToolEdit from './FormToolEdit.vue'
  import type { FormData } from './types'
  import { useForm } from './useForm'
  import { useFormStore } from './useFormStore'
  import { useUserListStore } from '../user/useUserListStore'
  import { watch, onMounted, nextTick } from 'vue'
  // import type { Client } from '@/@fake-db/types'
  import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
  import { themeConfig } from '@themeConfig'
  import { cloneDeep } from 'lodash'
  import Debugger from "@/shared/utils/debugger"
  import { useTools } from "@/shared/composables/useTools"
import { sessionStore } from '@/shared/utils/sessionStore.ts'


  //Team Freelance
  
  import { useTeamFreelancer, initialStateTeamFreelancer } from "@/views/apps/teams-freelancer/useTeamFreelancer"
  const { local } = sessionStore('form')
  
  
  interface Emit { (e: 'changeForm', value: any): void }
  const emit = defineEmits<Emit>()

  interface Props {
    // payment?: {},
    data: FormData
  }

  const { tools } = useTools();
  const props = defineProps<Props>()

  const formListStore = useFormStore()
  const userListStore = useUserListStore()

  const { infoForm } = useForm()


const teams=ref([])
const { getList, store, update, destroy } = useTeamFreelancer()
const teamfreelancer = ref(cloneDeep(initialStateTeamFreelancer))
const teamFreelancers = ref([])
const countTeamFreelancers = ref(0)
const numberOfPages = ref(1)
const rowPerPage = ref(local('perPage', 10))
const currentPage = ref(local('currentPage', 1))
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

  // if(props.data.tools){
  //   props.data.tools.map( x => {
  //     console.log('cost', x.cost)
  //     totalLicense.value += x.qty
  //     totalCost.value += x.cost
  //   })
  // }

  const changeTool = async (tool: any) => {
    // eslint-disable-next-line vue/no-mutating-props
    // totalLicense.value = 0
    const type = tool.data.type
    props.data.tools[tool.index] = tool.data
    let numberLicenses = 0,
      total = 0;

    for (var i = 0; i < props.data.tools.length; i++) {
      props.data.tools[i].type = type
      numberLicenses += props.data.tools[i].qty;
      total += Number(props.data.tools[i].cost.replaceAll('€', ''))
    }

    totalLicense.value = numberLicenses;
    totalCost.value = total;
    
    emit('changeForm', props.data)
  }

  // 👉 Add item function
  const addTool = () => {
    // eslint-disable-next-line vue/no-mutating-props
    toolsSelected.value.forEach((value) => {
      const tool = tools.value.find(c => c.tag == value);
      console.log('TOLLLES',tool)
      if (!props.data.tools.some(c => c.tag == value)) {
        props.data.tools.push({
          title: tool.title,
          cost: '42.00',
          tag: tool.tag,
          // cost: '42.67',
          qty: 1,
          description: tool.resume,
          type: 'month',
          reseller: null
        })
      }
    });
    emit('changeForm', props.data)
  }

  const removeTool = (index: number) => {
    // eslint-disable-next-line vue/no-mutating-props
    let tools = cloneDeep(props.data.tools);
    tools.splice(index, 1);
    props.data.tools = tools;
    emit('changeForm', props.data)
  }
  
  //team frelancer
  const selectedTeam = ref(props.data.client_id || null)
  
  const selectedLead = ref(props.data.client_id || null)
  // const selectedLead = ref(props.data.user_id || null)
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
    // console.log(userListStore.fetchUser)
    /*
    if(val) {
      userListStore.fetchUser(val).then(res => {
        // Debugger.log('Fetch Resellers', res)
        // cards.value = 
        // cards.value = res.carddetails
        res.reseller.map(x => {
          resellers.value.push({
            title: x.name,
            value: x.id
          })
        })
      })
    }*/

  });

  var sendMethodPayment = () => {
    alert(1)
  }

  const toolsSelected = ref([]);

  const toolsAvailables = computed(() => {
    let selected = props.data.tools?.map(c => c?.tag);
    return tools.value.filter(c => !selected?.includes(c.tag));
  });
  
  watch(selectedCard, (newValue) => {
    props.data.paymentMethod = {
      name: newValue?.title ?? "",
      token: newValue?.value ?? "",
    }
  })
  
  watch(selectedLead, (newValue) => {
    props.data.client_id = newValue ?? "";
  })
  
  //para team freelancer
  watch(selectedTeam,(newValue)=>{
    console.log(newValue)
    props.data.client_id=newValue ?? "";
  })
  
  watch(() => props.data.tools, (newValue) => {
    toolsSelected.value = [...props.data.tools?.map(c => c?.tag)];
  })
  
  watch(() => props.data.client_id, async (newValue) => {
    
    selectedTeam.value=newValue
    await nextTick()
    selectedCard.value = {
      title: props.data.paymentMethod.name,
      value: props.data.paymentMethod.token,
    };
  })


//team freelance
let timeoutSearch = 0;
watch(getTeamFreelancers);
  
  async function getTeamFreelancers() {
    
    if(timeoutSearch) clearTimeout(timeoutSearch);
    const filters = {
      // q: searchQuery.value,
      perPage: rowPerPage.value,
      currentPage: currentPage.value,
      // fullname: searchFullname.value,
    }
    timeoutSearch = setTimeout(() => {
      getList(filters)
        .then(({ data }) => {
          teamFreelancers.value = data.data;
          countTeamFreelancers.value = data.count;
          numberOfPages.value = data.countPages;
          
          //teams
          data.data.map(t=>{
            console.log('IDES',t.id)
            console.log('NAMES',t.name)
            teams.value.push({
              value:t.id,
              title:t.name
              
            })
          })
          console.log('TEAMS',teams.value)
        });
    }, 500);
    
    
  }  
  

</script>

<template>
  <VCard>
    <!-- SECTION Header -->
    <VCardText class="d-flex flex-xs-wrap justify-space-between flex-row ">
      <!-- 👉 Left Content -->
      <div class="ma-sm-4">
        <div class="d-flex align-center mb-6">
          <!-- 👉 Logo -->
          <!--<VNodeRenderer-->
          <!--  :nodes="themeConfig.app.logo"-->
          <!--  class="me-3"-->
          <!--/>-->
          <!-- 👉 Title -->
          <h6 class="font-weight-bold text-xl">
            <!--some-->
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
            <VTextField v-model="data.id" disabled prefix="#" density="compact" style="width: 14rem;" />
          </span>
        </h6>

        <!-- 👉 Issue Date -->
        <p class="d-flex align-center justify-sm-end mb-3">
          <span class="me-3">Emisión</span>
          <span>
            <AppDateTimePicker v-model="data.issuedDate" density="compact" placeholder="YYYY-MM-DD" style="width: 14rem;  " />
          </span>
        </p>
        <!-- 👉 Due Date -->
        <p class="d-flex align-center justify-sm-end mb-0">
          <span class="me-3">Vencimiento</span>
          <span>
            <AppDateTimePicker v-model="data.dueDate" density="compact" placeholder="YYYY-MM-DD" style="width: 14rem;" :config="{ position: 'auto right' }" />
          </span>
        </p>
      </div>
    </VCardText>
    
    <VDivider />
    
    <!-- 👉 Payment Details -->
    <VCardText class="d-flex justify-space-between flex-wrap flex-column flex-sm-row print-row">
      <VRow justify="start">
        <VCol v-if='teams' cols="12" md="4">
          <div>
            <VAutocomplete v-model="selectedTeam"  label="Teams" :items="teams" item-text="fullName" clearable clear-icon="tabler-x" autocomplete="none" />
          </div>
        </VCol>
        <VCol cols="12" md="4">
          <div>
            <VAutocomplete v-model="selectedLead" label="Form to" :items="users" item-text="fullName" clearable clear-icon="tabler-x" autocomplete="none" />
          </div>
        </VCol>
        
        <VCol cols="12" md="4" v-if="(selectedLead || selectedTeam)&& cards.length">
          <div>
            <VAutocomplete v-model="selectedCard" label="Pay to" return-object :items="cards" item-text="fullName" clearable clear-icon="tabler-x" autocomplete="none" />
          </div>
        </VCol>
        
        <VCol cols="4" v-if="selectedLead || selectedTeam">
          <VBtn block v-if="cards.length == 0" @click="sendMethodPayment">
            Método de pago
          </VBtn>
          <div v-else-if="data.paymentMethod?.name">
            <VBtn block v-if="1">
              Enviar pago
            </VBtn>
            <VBtn block v-else>
              Enviar impago
            </VBtn>
          </div>
        </VCol>
      </VRow>
    </VCardText>

    <VDivider />

    <!-- 👉 Add purchased tools -->
    <VCardText class="add-tools-form">
      <div v-for="(tool, index) in props.data.tools" :key="tool.tag" class="ma-sm-4">
        <FormToolEdit :id="index" :data="tool" :resellers="resellers" :total-license="totalLicense" @change-tool="changeTool" @remove-tool="removeTool" />
      </div>
      <div class="mt-4 ma-sm-4">
        <VContainer fluid>
          <VRow>
            <VCol cols="12">
              <label class="font-weight-bold">Seleccione los servicios: </label>
            </VCol>
            <VCol v-for="tool in toolsAvailables" cols="12" sm="4" md="4" lg="3" :key="tool.id">
              <VCheckbox 
                v-model="toolsSelected"
                :label="tool.title"
                :value="tool.tag"
                :color="tool.iconColor"
              />
            </VCol>
            <VCol cols="12">
              <VBtn @click="addTool" :disabled="toolsSelected?.length <= data.tools?.length">Añadir</VBtn>
            </VCol>
          </VRow>
        </VContainer>
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
