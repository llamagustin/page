<script setup lang="ts">
  import Papa from 'papaparse';
  import flag from '@/assets/flagSpain.svg'
  import { cloneDeep } from 'lodash'
  import { FreelancerProperties } from '@/@fake-db/types.d'
  import FreelancerDrawer from '@/views/apps/freelancer/list/FreelancerDrawer.vue'
  import {
    useFreelancer,
    initialState as initialStateFreelancer
  } from "@/views/apps/freelancer/useFreelancer"
  import { avatarText } from '@core/utils/formatters'
  import { provinces, cities, codes } from '@/@fake-db/data/address'
  import router from '@/router/index.ts'
  import { useRouter } from 'vue-router'
  import { sessionStore } from '@/shared/utils/sessionStore.ts'
  
  // 👉 Store
  const { addSession, setSession, local } = sessionStore()
  const { getList, store, update, destroy } = useFreelancer()
  const _router = useRouter()
  
  const freelancer = ref(cloneDeep(initialStateFreelancer))
  const freelancers = ref([])
  const countFreelancers = ref(0)
  const numberOfPages = ref(1)

  const loadBulk = ref(false)
  const searchQuery = ref(local('q'))
  const selectedProvince = ref(local('byProvince', null))
  const selectedCity = ref(local('byCity', null))
  const searchFullname = ref(local('searchFullname', ''))
  const searchRate = ref(local('searchRate', ''))
  
  const rowPerPage = ref(local('perPage', 10))
  const currentPage = ref(local('currentPage', 1))
  const scrollPage = ref(local('scrollPage', 0))
  const edit = ref(false)

  setTimeout(function() {
    window.scrollBy(0, parseInt(scrollPage.value));
  }, 1000)
  window.addEventListener("scroll", function() {
    //scrollPage.value = parseInt(window.scrollY)
    setSession([{
      key: 'scrollPage',
      value: parseInt(window.scrollY)
    }])
  });
  
  const totalPage = ref(1);
  const isFormValid = ref(false);

  let isRunning = false;
  

  let timeoutSearch = 0;
  watchEffect(getFreelancers);
  
  async function getFreelancers() {
    if(timeoutSearch) clearTimeout(timeoutSearch);
    const filters = {
      q: searchQuery.value,
      province: selectedProvince.value ?? '',
      city: selectedCity.value ?? '',
      perPage: rowPerPage.value,
      currentPage: currentPage.value,
      fullname: searchFullname.value,
      rate: searchRate.value,
    }
    timeoutSearch = setTimeout(() => {
      getList(filters)
        .then(({ data}) => {
          freelancers.value = data.freelancers;
          countFreelancers.value = data.count;
          numberOfPages.value = data.totalPages;
        });
    }, 500);
    
  }
  
  // 👉 watching current page
  watchEffect(() => {
    if (currentPage.value > numberOfPages.value) {
      currentPage.value = 1
    }
  })

  const isDrawerOpen = ref(false);
  
  // 👉 Computing pagination data
  const paginationData = computed(() => {
    const firstIndex = freelancers.value.length ? ((currentPage.value - 1) * rowPerPage.value) + 1 : 0
    const lastIndex = freelancers.value.length + ((currentPage.value - 1) * rowPerPage.value)
    
    return `Mostrando ${firstIndex} de ${lastIndex} de ${countFreelancers.value} valores`
  })

  // 👉 Create/Update Freelancer
  const handleSubmit = async ({ action, freelancerId, freelancer }) => {
    try {
      if(action === 'create') {
        const { data } = await store({ freelancer });
        freelancers.value.unshift(data);
      } else {
        const { data } = await update(freelancerId, freelancer);
        let index = freelancers.value.findIndex(c => c.id === freelancerId);
        if(index != -1)
          freelancers.value.splice(index, 1, data);
      }
      isDrawerOpen.value = false;
    } catch (err) {
      console.error('Error:', err)
    }
  }

  const deleteFreelancer = async (id) => {
    try {
      const response = await destroy(id);
      let index = freelancers.value.findIndex(c => c.id === id);
      if(index == -1) return;
      freelancers.value.splice(index, 1);
    } catch (e) {}
  }

  const createFreelancer = () => {
    isFormValid.value = false;
    freelancer.value = cloneDeep(initialStateFreelancer);
    isDrawerOpen.value = true
    edit.value = false
  }

  const editFreelancer = (data: FreelancerProperties) => {
    freelancer.value = cloneDeep(data);
    isDrawerOpen.value = true
    edit.value = true
  }

  // 👉 List
  const colorTitle = { '200': 'success', '300': 'warning', '400': 'error' }

  const computedCities = computed(() => {
    selectedCity.value = null;
    let codeProvince = provinces.filter(p => p.title == selectedProvince.value)
    if (codeProvince.length < 1) return []
    const province = codeProvince[0].value
    const qr = cities.filter((item: any) => String(item.value).startsWith(province));
    return qr
  })

  const country = "España"

  function groupStarts(quantity, items = 5) {
    return [
      Array(quantity).fill("tabler-jewish-star-filled"),
      Array(items - quantity).fill("tabler-jewish-star"),
    ].flat();
  }
  
  function formatDate(fechaISO) {
    const fecha = new Date(fechaISO);
    const dia = fecha.getUTCDate().toString().padStart(2, "0");
    const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, "0");
    const anio = fecha.getUTCFullYear().toString();
    return `${dia}-${mes}-${anio}`;
  }

  const optionsStars = [
    {
      content: 'Todos',
      value: ''
    },
    {
      content: '1 Estrella',
      value: 1
    },
    {
      content: '2 Estrellas',
      value: 2
    },
    {
      content: '3 Estrellas',
      value: 3
    },
    {
      content: '4 Estrellas',
      value: 4
    },
    {
      content: '5 Estrellas',
      value: 5
    },
  ]
</script>

<template>
  <section>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VProgressLinear v-if="loadBulk" color="primary" indeterminate reverse />
          <VCardText>
            <div :style="{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}">
              <p class="d-flex items-center">
                <img :src="flag" :style="{width: '20px', height: '20px'}" />
                <strong class="ms-2">{{ country }}</strong>
              </p>
              <div class="d-flex gap-2" :style="{marginTop: '-20px'}">
                <VBtn icon="tabler-plus" @click="createFreelancer"></VBtn>
              </div>
            </div>
            <VRow>
              <VCol cols="12" md="4" lg="3">
                <VAutocomplete v-model="selectedProvince" label="Provincia" :items="provinces" item-value="title" clearable clear-icon="tabler-x" autocomplete="none" />
              </VCol>
              <VCol cols="12" md="4" lg="3" v-if="!!selectedProvince">
                <VAutocomplete v-model="selectedCity" label="Ciudad" :items="computedCities" item-value="title" clearable clear-icon="tabler-x" autocomplete="none" />
              </VCol>
              <VCol cols="12" md="4" lg="3">
                <VTextField v-model="searchFullname" placeholder="" label="Nombres" />
              </VCol>
              <VCol cols="12" md="4" lg="3">
                <VSelect
                  v-model="searchRate"
                  label="Calificación"
                  :items="optionsStars"
                  item-title="content"
                  item-value="value"
                />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12">
        <VCard>
          <VTable class="text-no-wrap" style="overflow-y: auto">
            <thead>
              <tr>
                <th scope="col" style="width: 3rem"></th>
                <th scope="col">USUARIO</th>
                <th scope="col">DIRECCIÓN</th>
                <th scope="col">CATEGORIA</th>
                <th scope="col">PERFIL</th>
                <th scope="col" class="text-center">SALARIO</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in freelancers" :key="item.id" style="height: 3.75rem;">
                <td class="text-center">
                  <VBtn icon size="x-small" color="primary" variant="tonal" title="Editar">
                    <VIcon @click="editFreelancer(item)" size="22" icon="tabler-edit" />
                  </VBtn>
                </td>
                <td>
                  <div class="d-flex align-center gap-2">
                    <VAvatar variant="tonal" color="success" class="me-3" size="38">
                      <VImg v-if="item.avatar" :src="item.avatar" />
                      <span v-else>{{ avatarText(item.fullname) }}</span>
                    </VAvatar>
                    <div class="d-flex flex-column">
                      <h6 class="text-base" style="line-height: 1;">
                        <span class="d-block">
                          <VIcon v-for="nameIcon in groupStarts(item.rate)"
                            size="16"
                            :icon="nameIcon"
                            color="warning"
                          />
                        </span>
                        <span class="link">{{ item.fullname }}</span>
                      </h6>
                      <div class="d-flex gap-2">
                        <span class="text-secondary text-xs">
                          Se unio {{ formatDate(item.createdAt) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="d-flex align-center">
                    <div class="d-flex flex-column">
                      <h6 class="text-base font-weight-regular">
                        <span class="text-uppercase font-weight-black" style="font-size: 14px">{{ item?.address?.country }}</span>  <br />
                        <VChip v-if="item?.address?.code" label color="primary" size="small">
                          {{ item.address.code }}
                        </VChip> {{ item?.address?.line }}
                      </h6>
                    </div>
                  </div>
                </td>
                <td style="line-height: 1.2">
                  <span class="text-primary font-weight-bold">{{ item.subcategory }}</span> <br />
                  {{ item.category }}
                </td>
                <td>
                  <span class="d-block">
                    Personal: <a :href="item.profile" target="_blank">Sitio Web</a>
                  </span>
                  <span class="d-block">
                    Plataforma: <a :href="`http://46.24.179.57:2070/backend-developer?id=${item.id}`" target="_blank">Sitio Web</a>
                  </span>
                </td>
                <td class="text-center">{{ item.rangosalarial.min }} - {{ item.rangosalarial.max }}</td>
              </tr>
            </tbody>

            <!-- 👉 table footer  -->
            <tfoot v-show="!freelancers.length">
              <tr>
                <td colspan="7" class="text-center">
                  No data available
                </td>
              </tr>
            </tfoot>
          </VTable>
          <VDivider />
          <VCardText class="d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5">
            <span class="text-sm text-disabled">
              {{ paginationData }}
            </span>
            <VPagination v-model="currentPage" size="small" :total-visible="5" :length="numberOfPages" />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- 👉 Add New User -->
    <!--v-model:account="accountData"-->
    <FreelancerDrawer 
      v-model:isDrawerOpen="isDrawerOpen"
      :freelancer="freelancer"
      :is-edit="edit"
      @deleteFreelancer="deleteFreelancer"
      @handleSubmit="handleSubmit"
    />
  </section>
</template>

<style lang="scss">
  .app-user-search-filter {
    inline-size: 31.6rem;
  }

  .text-capitalize {
    text-transform: capitalize;
  }

  .user-list-name:not(:hover) {
    color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
  }

  .link {
    transition: color 300ms;
    cursor: pointer;

    &:hover {
      color: #7367F0;
    }
  }
</style>
