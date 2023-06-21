<script setup lang="ts">
  import flag from '@/assets/flagSpain.svg'
  import { cloneDeep } from 'lodash'
  import { FreelancerProperties } from '@/@fake-db/types.d'
  import TeamsFreelancerDrawer from '@/views/apps/teams-freelancer/TeamsFreelancerDrawer.vue'
  import { useTeamFreelancer, initialStateTeamFreelancer } from "@/views/apps/teams-freelancer/useTeamFreelancer"
  import { avatarText } from '@core/utils/formatters'
  import { provinces, cities, codes } from '@/@fake-db/data/address'
  import router from '@/router/index.ts'
  import { useRouter } from 'vue-router'
  import { sessionStore } from '@/shared/utils/sessionStore.ts'
  import { ref, watchEffect, computed } from 'vue';
  
  import Debug from "@/shared/utils/debugger";

  // 👉 Store
  const { addSession, setSession, local } = sessionStore()
  const { getList, store, update, destroy } = useTeamFreelancer()
  
  const teamfreelancer = ref(cloneDeep(initialStateTeamFreelancer))
  const teamFreelancers = ref([])
  const countTeamFreelancers = ref(0)
  const numberOfPages = ref(1)

  const searchQuery = ref(local('q'))
  const searchFullname = ref(local('searchFullname', ''))
  
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
  watchEffect(getTeamFreelancers);
  
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
          Debug.log('FETCH', data)
          teamFreelancers.value = data.data;
          countTeamFreelancers.value = data.count;
          numberOfPages.value = data.countPages;
        });
    }, 500);
    
  }
  
  // 👉 watching current page
  watchEffect(() => {
    if (currentPage.value > numberOfPages.value) currentPage.value = 1
  })

  const isDrawerOpen = ref(false);
  
  // 👉 Computing pagination data
  const paginationData = computed(() => {
    const firstIndex = teamFreelancers.value.length ? ((currentPage.value - 1) * rowPerPage.value) + 1 : 0
    const lastIndex = teamFreelancers.value.length + ((currentPage.value - 1) * rowPerPage.value)
    return `Mostrando ${firstIndex} de ${lastIndex} de ${countTeamFreelancers.value} valores`
  });

  // 👉 Create/Update Team freelancer
  const handleSubmit = async ({ action, id, payload }) => {
    try {
      if(action === 'create') {
        const { data } = await store(payload);
        teamFreelancers.value.unshift(data);
      } else {
        const { data } = await update(id, payload);
        let index = teamFreelancers.value.findIndex(c => c.id === id);
        if(index != -1)
          teamFreelancers.value.splice(index, 1, data);
      }
      isDrawerOpen.value = false;
    } catch (err) {
      console.error('Error:', err)
    }
  }

  const handleDestroy = async (id) => {
    try {
      const response = await destroy(id);
      let index = teamFreelancers.value.findIndex(c => c.id === id);
      if(index == -1) return;
      teamFreelancers.value.splice(index, 1);
    } catch (e) {}
  }

  const handleCreate = () => {
    isFormValid.value = false;
    teamfreelancer.value = cloneDeep(initialStateTeamFreelancer);
    isDrawerOpen.value = true
    edit.value = false
  }

  const handleEdit = (data) => {
    teamfreelancer.value = cloneDeep(data);
    isDrawerOpen.value = true
    edit.value = true
  }

  // 👉 List
  const colorTitle = {
    200: 'success',
    300: 'warning',
    400: 'error'
  }
  
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
          <!--<VProgressLinear v-if="loadBulk" color="primary" indeterminate reverse />-->
          <VCardText>
            <div :style="{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}">
              <p class="d-flex items-center">
                <img :src="flag" :style="{width: '20px', height: '20px'}" />
                <strong class="ms-2">{{ country }}</strong>
              </p>
              <div class="d-flex gap-2" :style="{marginTop: '-20px'}">
                <VBtn icon="tabler-plus" @click="handleCreate"></VBtn>
              </div>
            </div>
            <!--
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
            -->
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12">
        <VCard>
          <VTable class="text-no-wrap" style="overflow-y: auto">
            <thead>
              <tr>
                <th scope="col" style="width: 3rem"></th>
                <th scope="col" width="200">NOMBRE</th>
                <th scope="col">MIEMBROS</th>
                <th scope="col" width="400">DESCRIPCIÓN</th>
                <th scope="col" width="50" class="text-center">ESTADO</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in teamFreelancers" :key="item.id">
                <td class="text-center">
                  <VBtn icon size="x-small" color="primary" variant="tonal" title="Editar" @click="handleEdit(item)">
                    <VIcon size="22" icon="tabler-edit" />
                  </VBtn>
                </td>
                <th>
                  <p v-text="item.name"></p>
                </th> 
                <td>
                  <div class="v-avatar-group">
                    <VAvatar
                      v-for="_item in item.members"
                      :key="_item"
                      variant="tonal" color="success" class="me-3" size="38">
                      <VImg v-if="true" src="https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-2/assets/avatar-6-c56877f3.png" />
                      <span v-else>{{ avatarText(item.name) }}</span>
                      <VTooltip
                        activator="parent"
                        location="top"
                      >
                        {{ _item }}
                      </VTooltip>
                    </VAvatar>
                  </div>
                </td>
                <td>
                  <div class="wrapper-text text-xs"><p v-text="item.description"></p></div>
                </td>
                <td class="text-center">
                  <VChip :color="colorTitle[item.status]" label size="x-small">
                    <b v-text="item.status"></b>
                  </VChip>
                </td>
              </tr>
            </tbody>
            <tfoot v-show="!teamFreelancers.length">
              <tr>
                <td colspan="5" class="text-center">
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
    
    <TeamsFreelancerDrawer 
      v-model:isDrawerOpen="isDrawerOpen"
      :teamfreelancer="teamfreelancer"
      :is-edit="edit"
      @handleDestroy="handleDestroy"
      @handleSubmit="handleSubmit"
    />
    
  </section>
</template>

<style scoped lang="scss">
  .app-user-search-filter {
    inline-size: 31.6rem;
  }
  
  p {
    margin-bottom: 0;
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
  
  .wrapper-text {
    width: 100%;
    min-width: 400px;
    overflow: hidden;
    height: 60px;
    white-space: normal;
    max-height: calc(1.6em * 2.2);
    line-height: 1.2;
    
    p {
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      display: -webkit-box;
      margin: 0;
      width: 100%;
      
    }
  }
</style>
