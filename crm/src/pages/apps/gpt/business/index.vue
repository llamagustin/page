<script setup lang="ts">
  // 👉 Components
  import BusinessDrawer from  "@/views/apps/gpt/business/BusinessDrawer.vue";
  
  // 👉 Resources
  import flag from "@/assets/flagSpain.svg";
  
  // 👉 Imports of Methods, Hooks, Composables
  import { ref, watchEffect, computed, watch } from "vue";
  import { avatarText } from "@core/utils/formatters";
  // import { formatDMY } from "@/shared/utils/date";
  import { useBusiness, initialStateBusiness } from "@/views/apps/gpt/business/useBusiness";
  import { cloneDeep } from "lodash";
  import { provinces, cities } from '@/@fake-db/data/address'
  
  // Composables
  const {
    fetchBusiness: fetchBusinessClient,
    store,
    update,
    destroy
  } = useBusiness();
  
  // 👉 General data
  const isEdit = ref(true);
  const isDrawerOpen = ref(false);
  const business = ref(cloneDeep(initialStateBusiness));
  const businessList = ref([]);
  const totalBusiness = ref(0);
  const totalPages = ref(0);
  const filters = ref({
    province: null,
    city: null,
  });
  const pagination = ref({
    perPage: 10,
    page: 1
  });
  
  const textPagination = computed(() => {
    const { page, perPage } = pagination.value;
    const firstIndex = businessList.value.length ? ((page - 1) * perPage) + 1 : 0
    const lastIndex = businessList.value.length + ((page - 1) * perPage)
    return `Mostrando ${firstIndex} de ${lastIndex} de ${totalBusiness.value} valores`
  })
  
  async function handleDelete(id) {
    try {
      await destroy(id);
      let index = business.value.findIndex(c => c.id === id);
      if(index == -1) return;
      businessList.value.splice(index, 1);
    } catch (err) { console.error(err) }
  }
  
  async function handleSubmit({ id, action, payload }) {
    try {
      if(action === 'create') {
        const { data } = await store(payload);
        businessList.value.unshift(data);
      } else {
        const { data } = await update(id, payload);
        let index = businessList.value.findIndex(c => c.id === id);
        if(index != -1)
          businessList.value.splice(index, 1, data);
      }
      isDrawerOpen.value = false;
    } catch (err) {
      console.error('Error:', err)
    }
  }
  
  function handleEdit(payload) {
    business.value = cloneDeep(payload);
    isDrawerOpen.value = true
    isEdit.value = true
  }
  
  function createBusiness() {
    business.value = cloneDeep(initialStateBusiness);
    isDrawerOpen.value = true
    isEdit.value = false
  }

  async function fetchBusiness() {
    try {
      let queries = {
        ...pagination.value,
        ...filters.value
      }
      const { data } = await fetchBusinessClient(queries);
      businessList.value = data.business;  
      totalBusiness.value = data.totalBusiness; 
      totalPages.value = data.totalPages;
    } catch (e) {}
  }
  watchEffect(fetchBusiness);
  
  
  // FILTERS
  const citiesFiltered = computed(() => {
    filters.value.city = null;
    let codeProvince = provinces.filter(c => c.title == filters.value.province)
    if (codeProvince.length < 1) return []
    const province = codeProvince[0].value
    const filtered = cities.filter((item) => String(item.value).startsWith(province));
    return filtered
  })
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
                    <VBtn icon="tabler-plus" title="Nuevo" @click="createBusiness"></VBtn>
                  </div>
                </div>
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12" md="4" lg="3">
                <VAutocomplete v-model="filters.province" label="Provincia" :items="provinces" item-value="title" clearable clear-icon="tabler-x" autocomplete="none" />
              </VCol>
              <VCol cols="12" md="4" lg="3" v-if="!!filters.province">
                <VAutocomplete v-model="filters.city" label="Ciudad" :items="citiesFiltered" item-value="title" clearable clear-icon="tabler-x" autocomplete="none" />
              </VCol>
              <VCol cols="12" md="4" lg="3">
                <VTextField placeholder="" label="Search" />
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
                <th scope="col" width="75" class="text-center">IMG</th>
                <th scope="col" width="250">USUARIO</th>
                <th scope="col" width="160" class="text-center">TELÉFONO</th>
                <th scope="col">DIRECCIÓN</th>
                <th scope="col" style="min-inline-size: 300px;">CATEGORIA</th>
                <th scope="col" width="85" class="text-center">ESTADO</th>
                <!--<th scope="col" width="85" class="text-center">CREADO EL</th>-->
              </tr>
            </thead>
            <tbody v-if="businessList.length">
              <tr v-for="item in businessList" :key="item.id">
                <td class="text-center">
                  <VBtn icon size="x-small" color="primary" variant="tonal" title="Editar" @click="handleEdit(item)">
                    <VIcon size="22" icon="tabler-edit" />
                  </VBtn>
                </td>
                <td width="75" class="text-center px-0">
                  <VAvatar variant="tonal" color="primary" size="45">
                    <VImg v-if="item.image" :src="item.image" />
                    <span v-else>{{ avatarText(item.title) }}</span>
                  </VAvatar>
                </td>
                <td>
                  <h6 class="text-base" style="line-height: 1.2;">
                    <span class="link">
                      {{ item.user?.name?.name }} {{ item.user?.name?.firstSurname }} {{ item.user?.name?.secondSurname }}
                    </span>
                  </h6>
                  <span class="text-secondary text-sm">
                    {{ item.user?.email }}
                  </span>
                </td>
                <td style="line-height: 1.2">
                  <VIcon icon="tabler-phone" color="success" />
                  <a :href="`tel:${item.phone}`" class="text-grey-600 text-xs">{{ item.phone }}</a>
                </td>
                <td>
                  <div class="d-flex align-center">
                    <div class="d-flex flex-column">
                      <h6 class="text-sm font-weight-regular">
                        <span class="text-uppercase font-weight-black text-xs">
                          <VChip label color="primary" size="small" v-if="item.address.zip" >
                            <span style="font-size: 11px;" class="font-weight-black">{{ item.address.zip }}</span>
                          </VChip> {{ item.address.province }} - {{ item.address.city }}
                        </span>
                        <br />
                       {{ item.address.line }}
                      </h6>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="tags" v-if="item.category.length">
                    <span class="tags-item text-uppercase text-xs mx-1 pa-1" v-for="_item in item.category" :key="_item">
                      {{ _item }}
                    </span>
                  </div>
                </td>
                <td class="text-center">
                  <VChip label color="primary" size="small">
                    {{ item.status }}
                  </VChip>
                </td>
                <!--<td>{{ formatDMY(item.createdAt) }}</td>-->
              </tr>
            </tbody>
            <tfoot v-else>
              <tr>
                <td colspan="8" class="text-center">
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
    </VRow>
  </section>
  <BusinessDrawer
    v-model:isDrawerOpen="isDrawerOpen"
    :business="business"
    :is-edit="isEdit"
    @handle-delete="handleDelete"
    @handle-submit="handleSubmit"
  />
</template>

<style scoped lang="scss">
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
</style>
