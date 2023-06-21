<script setup lang="ts">
  // 👉 Components
  import TaskDrawer from  "@/views/apps/task/TaskDrawer.vue";
  
  // 👉 Resources
  import flag from "@/assets/flagSpain.svg";
  // 👉 Imports of Methods, Hooks, Composables
  // import Debugger from "@/shared/utils/debugger";
  import { ref, watchEffect, computed } from "vue";
  import { avatarText } from "@core/utils/formatters";
  import { formatDMY } from "@/shared/utils/date";
  import { useTask } from "@/views/apps/task/useTask.ts";
  
  // 👉 Composables
  const { fetchAllTasks, destroy, store, update, task, setTask } = useTask();
  
  // 👉 General data
  const isEdit = ref(false);
  const isDrawerOpen = ref(false)
  const filters = ref({
    title: '',
    description: ''
  });
  const tasks = ref([]);
  const totalTasks = ref(0);
  const totalPages = ref(0);
  
  const pagination = ref({
    perPage: 10,
    page: 1
  });
  
  const textPagination = computed(() => {
    const { page, perPage } = pagination.value;
    const firstIndex = tasks.value.length ? ((page - 1) * perPage) + 1 : 0
    const lastIndex = tasks.value.length + ((page - 1) * perPage)
    return `Mostrando ${firstIndex} de ${lastIndex} de ${totalTasks.value} valores`
  })
  
  watchEffect(fetchTasks);
  
  // 👉 Methods
  async function fetchTasks() {
    try {
      const queries = {
        ...pagination.value,
        ...filters.value
      }
      const { data } = await fetchAllTasks(queries);
      tasks.value = data.tasks;
      totalTasks.value = data.count;
      totalPages.value = data.totalPages;
    }
    catch (e) {}
  }

  async function handleDelete(id) {
    try {
      await destroy(id);
      let index = task.value.findIndex(c => c.id === id);
      if (index == -1) return;
      tasks.value.splice(index, 1);
    }
    catch (err) { console.error(err) }
  }

  async function handleSubmit({ id, action, payload }) {
    try {
      if (action === 'create') {
        const { data } = await store(payload);
        tasks.value.unshift(data);
      }
      else {
        const { data } = await update(id, payload);
        let index = tasks.value.findIndex(c => c.offer_id === id);
        if (index != -1)
          tasks.value.splice(index, 1, data);
      }
      isDrawerOpen.value = false;
    }
    catch (err) {
      console.error('Error:', err)
    }
  }
  
  function handleEdit(payload) {
    setTask(payload);
    isDrawerOpen.value = true
    isEdit.value = true
  }
  
  function handleCreate() {
    setTask()
    isDrawerOpen.value = true
    isEdit.value = false
  }
  
  const optionsFormFees = {
    hourlyrate: "Hourly rate",
    fixprice: "Fix price"
  }
  
  const optionStatus = [
    {
      name: 'Completado',
      value: 'isCompleted',
    },
    {
      name: 'Importante',
      value: 'isImportant',
    },
    {
      name: 'Eliminado',
      value: 'isDeleted',
    }
  ]
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
                  <p class="d-flex align-center gap-2 user-select-none mb-auto text-primary">
                    <VIcon icon="tabler-search"></VIcon>
                    <strong class="">Filtros</strong>
                  </p>
                  <div class="d-flex gap-2">
                    <VBtn icon="tabler-plus" title="Nuevo" @click="handleCreate"></VBtn>
                  </div>
                </div>
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12" md="4" lg="3">
                <VTextField v-model="filters.title" placeholder="" label="Proyecto" />
              </VCol>
              <VCol cols="12" md="4" lg="3">
                <VTextField v-model="filters.description" placeholder="" label="Descripción" />
              </VCol>
              <VCol cols="12" md="4" lg="3">
                <VAutocomplete v-model="filters.status"
                  label="Estado"
                  :items="optionStatus"
                  item-title="name"
                  item-value="value"
                  clearable
                  persistent-hint
                  clear-icon="tabler-x"
                  multiple autocomplete="none"
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
                <th scope="col" width="60"></th>
                <th scope="col" width="250">USUARIO</th>
                <th scope="col" width="300" style="min-width: 300px">PROYECTO / DESCRIPCIÓN</th>
                <th scope="col" class="text-center">ESTADO</th>
                <th scope="col">HONORARIOS</th>
                <th scope="col" width="85" class="text-center">PUBLICADO</th>
              </tr>
            </thead>
            <tbody v-if="tasks.length">
              <tr v-for="item in tasks" :key="item.id"> 
                <td class="text-center">
                  <VBtn icon size="x-small" color="primary" variant="tonal" title="Editar" @click="handleEdit(item)">
                    <VIcon size="22" icon="tabler-edit" />
                  </VBtn>
                </td>
                <td width="75" class="text-center px-0">
                  <div class="d-flex gap-2" v-if="item.account">
                    <VAvatar variant="tonal" color="primary" size="45">
                      <VImg v-if="item.account.avatar" :src="item.account.avatar" />
                      <span v-else>{{ avatarText(item.account.fullName) }}</span>
                    </VAvatar>
                    <div class="user-data text-left">
                      <span class="d-block w-100">{{ item.account.fullName }}</span>
                      <span class="d-block w-100">{{ item.account.email }}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <strong class="d-block mb-1 text-capitalize">{{ item.title }}</strong>
                  <div class="wrapper-text">
                    <p class="mb-0 job-description">
                      {{ item.description }}
                    </p>
                  </div>
                </td>
                <td class="text-center">
                  <template v-if="item.isCompleted">
                    <VChip class="mb-1 justify-center" style="width: 98px" color="success">
                      Completado
                    </VChip> <br />
                  </template>
                  <template v-if="item.isImportant">
                    <VChip class="mb-1 justify-center" style="width: 98px" color="warning">
                      Importante
                    </VChip> <br />
                  </template>
                  <template v-if="item.isDeleted">
                    <VChip class="mb-1 justify-center" style="width: 98px" color="error">
                      Eliminado
                    </VChip>
                  </template>
                  <template v-if="!item.isCompleted && !item.isDeleted && !item.isImportant">
                    <VChip class="mb-1 justify-center" style="width: 98px">
                      Sin estado
                    </VChip>
                  </template>
                </td>
                <td>
                  <div class="table">
                    <div class="table-row">
                      <div class="table-col text-primary text-right">Tipo</div>
                      <div class="table-col text-dark table-value">{{ optionsFormFees[item.picked] }}</div>
                    </div>
                    <div class="table-row">
                      <div class="table-col text-primary text-right">Tarifa</div>
                      <div class="table-col text-dark table-value">
                        {{ item.picked == 'fixprice' ? Number(item.tarifa).toFixed(2) : Number(item.hourlyrate).toFixed(2) }}
                        {{ item.selectedcurrency?.toLowerCase() }}
                      </div>
                    </div>
                    <div class="table-row">
                      <div class="table-col text-primary text-right">Límite</div>
                      <div class="table-col text-dark table-value">{{ item.weeklimit }}</div>
                    </div>
                  </div>
                </td>
                <td>{{ formatDMY(item.createdAt) }}</td>
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
  <TaskDrawer
    v-model:isDrawerOpen="isDrawerOpen"
    :task="task"
    :is-edit="isEdit"
    @handle-delete="handleDelete"
    @handle-submit="handleSubmit"
  />
</template>

<style scoped lang="scss">
.wrapper-text {
  width: 100%;
  max-width: 400px;
  overflow: hidden;
  height: 50px;
  white-space: normal;
  max-height: calc(1.6em * 3);
  line-height: 1;
  font-size: 13px;
  p {
    line-height: 1;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    display: -webkit-box;
    margin: 0;
  }
}
.job-description {
  line-height: 1.1;
}
.table {
  border-radius: .3em;
  overflow: hidden;
  line-height: .7;
  
  &-row {
    display: grid;
    grid-template-columns: 70px auto;
  }
  &-col {
    padding: .3em .5em;
  }
  &-value {
    font-size: 12px;
    line-height: 1;
    text-transform: uppercase;
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
</style>