<script setup lang="ts">
  // 👉 Components
  import GPTDataDrawer from "@/views/apps/gpt/data/GPTDataDrawer.vue"
  // 👉 Resources
  import flag from '@/assets/flagSpain.svg';

  // 👉 Imports of Methods, Hooks, Composables
  import { ref, watchEffect, computed, watch } from "vue";
  import { cloneDeep } from "lodash";
  import { avatarText } from '@core/utils/formatters'
  import { useGPT, initialStateGPTData } from "@/views/apps/gpt/data/useGTPData";
  import { formatDMY } from "@/shared/utils/date";
  
  // 👉 Composables
  const {
    fetchGPTData: fetchGPTDataClient,
    store,
    update,
    destroy
  } = useGPT();

  // 👉 General data
  const isEdit = ref(true);
  const isDrawerOpen = ref(false);
  const gpt = ref(cloneDeep(initialStateGPTData));
  const gpts = ref([]);
  const totalGpts = ref(0);
  const totalPages = ref(0);
  const filters = ref({
    title: '',
    input: '',
    output: '',
    isApproved: ''
  });
    
  const pagination = ref({
    perPage: 10,
    page: 1
  });

  const textPagination = computed(() => {
    const { page, perPage } = pagination.value;
    const firstIndex = gpts.value.length ? ((page - 1) * perPage) + 1 : 0
    const lastIndex = gpts.value.length + ((page - 1) * perPage)
    return `Mostrando ${firstIndex} de ${lastIndex} de ${totalGpts.value} valores`
  })

  // 👉 Methods
  async function handleDelete(id) {
    try {
      await destroy(id);
      let index = gpts.value.findIndex(c => c.id === id);
      if (index == -1) return;
      gpts.value.splice(index, 1);
      totalGpts.value -= 1;
    }
    catch (err) { console.error(err) }
  }

  async function handleSubmit({ id, action, payload }) {
    try {
      if (action === 'create') {
        const { data } = await store(payload);
        gpts.value.unshift(data);
        totalGpts.value += 1;
      }
      else {
        const { data } = await update(id, payload);
        let index = gpts.value.findIndex(c => c.id === id);
        if (index != -1)
          gpts.value.splice(index, 1, data);
      }
      isDrawerOpen.value = false;
    }
    catch (err) { console.error('Error:', err) }
  }

  function handleEdit(payload) {
    gpt.value = cloneDeep(payload);
    isDrawerOpen.value = true
    isEdit.value = true
  }

  function handleCreate() {
    gpt.value = cloneDeep(initialStateGPTData);
    isDrawerOpen.value = true
    isEdit.value = false
  }

  async function fetchGPTData() {
    try {
      let queries = {
        ...pagination.value,
        ...filters.value
      }
      const { data } = await fetchGPTDataClient(queries);
      gpts.value = data.gpts;
      totalGpts.value = data.totalGPTData;
      totalPages.value = data.totalPages;
    }
    catch (e) {}
  }
  watchEffect(fetchGPTData);
  
  
  const statusPromps = [
    {
      title: 'Todos',
      value: '',
    },
    {
      title: 'Aprobados',
      value: 'approved',
    },
    {
      title: 'No aprobados',
      value: 'no approved',
    },
  ]
  
  async function markAsApproved(id, isApproved) {
    const { data } = await update(id, {
      isApproved: !isApproved
    });
    let index = gpts.value.findIndex(c => c.id === id);
    if (index != -1)
      gpts.value.splice(index, 1, data);
    alertStatus.value = true;
  }
  
  const alertStatus = ref(false);
</script>

<template>
  <section>
    <VRow>
      <VCol cols="12">
        <VCard>
          <!--<VProgressLinear color="primary" indeterminate reverse />-->
          <VCardText>
            <VRow>
              <VCol cols="12">
                <div class="aythen-card-content">
                  <p class="d-flex align-center gap-2 user-select-none mb-auto">
                    <img :src="flag" width="20" height="20" />
                    <strong>España</strong>
                  </p>
                  <div class="d-flex gap-2">
                    <VBtn icon="tabler-plus" title="Nuevo" @click="handleCreate"></VBtn>
                  </div>
                </div>
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12" md="4" lg="3">
                <VTextField v-model="filters.title" placeholder="" label="Título" />
              </VCol>
              <VCol cols="12" md="4" lg="3">
                <VTextField v-model="filters.input" placeholder="" label="Input" />
              </VCol>
              <VCol cols="12" md="4" lg="3">
                <VTextField v-model="filters.output" placeholder="" label="Output" />
              </VCol>
              <VCol cols="12" md="4" lg="3">
                <VAutocomplete v-model="filters.isApproved" label="Estado" :items="statusPromps" item-value="value" clear-icon="tabler-x" autocomplete="none" />
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
                <th scope="col" width="60"></th>
                <th scope="col">TÍTULO</th>
                <th scope="col" class="min-width-300">CATEGORIA</th>
                <th scope="col">AUTOR</th>
                <th scope="col" width="200">INPUT</th>
                <th scope="col" width="200">OUTPUT</th>
                <th scope="col" width="60" class="text-center">USADO</th>
              </tr>
            </thead>
            <tbody v-if="gpts.length">
              <tr v-for="item in gpts" :key="item.id"
                class="cursor-pointer"
                :class="{ 'no-approved': !item.isApproved }"
                @dblclick="markAsApproved(item.id, item.isApproved)"
              >
                <td class="text-center">
                  <VBtn icon size="x-small" color="primary" variant="tonal" title="Editar" @click="handleEdit(item)">
                    <VIcon size="22" icon="tabler-edit" />
                  </VBtn>
                </td>
                <td>
                  {{ item.title }}
                  <span class="d-block text-grey-400 text-xs">
                    Creado {{ formatDMY(item.createdAt) }}
                  </span>
                </td>
                <td>
                  <div class="tags" v-if="item.category.length">
                    <span class="tags-item text-uppercase text-xs mx-1 pa-1" v-for="_item in item.category" :key="_item">
                      {{ _item }}
                    </span>
                  </div>
                </td>
                <td>
                  <div class="d-flex gap-2">
                    <VAvatar variant="tonal" color="primary" size="40">
                      <VImg v-if="item.author.avatar" :src="item.author.avatar" />
                      <span v-else>{{ avatarText(item.author.name) }}</span>
                    </VAvatar>
                    <div>
                      <h6 class="text-sm">
                        {{ item.author.name }}
                      </h6>
                      <span class="text-secondary text-xs">
                        Con {{ item.author.followers }} seguidores 
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="wrapper-text text-xs"><p>{{ item.input }}</p></div>
                </td>
                <td>
                  <div class="wrapper-text text-xs"><p>{{ item.output }}</p></div>
                </td>
                <td class="text-center">{{ item.used }}</td>
              </tr>
            </tbody>
            <tfoot v-else>
              <tr>
                <td colspan="7" class="text-center">
                  No se encontraron registros
                </td>
              </tr>
            </tfoot>
          </VTable>
          <VDivider />
          <VCardText class="d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5">
            <span class="text-sm text-disabled"> {{ textPagination }} </span>
            <VPagination v-show="Boolean(totalPages)" v-model="pagination.page" size="small" :total-visible="5" :length="totalPages" />
          </VCardText>
        </VCard>
      </VCol>
      
      <VSnackbar v-model="alertStatus">
        <span>Estado actualizado</span>
        <template v-slot:actions>
          <VBtn color="pink" variant="text" @click="alertStatus = false"> Close </VBtn>
        </template>
      </VSnackbar>
    </VRow>
  </section>
  
  <GPTDataDrawer
    v-model:isDrawerOpen="isDrawerOpen"
    :gpt="gpt"
    :is-edit="isEdit"
    @handle-delete="handleDelete"
    @handle-submit="handleSubmit"
  />
</template>

<style scoped lang="scss">
  
  .min-width-300 {
    min-width: 300px;
  }
  .no-approved {
    background-color: hsl(45.87deg 100% 50% / 5%);
    cursor: pointer;
    
    &:hover {
      background-color: hsl(45.87deg 100% 50% / 10%);
    }
  }
  .aythen-card-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  td {
    padding-top: .4em !important;
    padding-bottom: .4em !important;
  }
  .tags {
    display: flex;
    max-inline-size: 370px;
    flex-wrap: wrap;
    gap: .2em;
    
    > &-item {
      background: rgb(186 238 255);
      border-radius: .3em;
      color: rgb(32 185 234);
      font-weight: 700;
      font-size: 10px;
    }
  }
  
  .wrapper-text {
    width: 100%;
    max-width: 200px;
    overflow: hidden;
    height: 60px;
    white-space: normal;
    max-height: calc(1.6em * 3);
    line-height: 1.2;
    
    p {
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      display: -webkit-box;
      margin: 0;
    }
  }
</style>
