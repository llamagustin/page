<script setup lang="ts">
import VueSelect from "vue-select"
import "vue-select/dist/vue-select.css"

import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import type { VForm } from 'vuetify/components'
import { emailValidator, requiredValidator } from '@validators'
import { uuid } from 'vue-uuid'
import { ref, nextTick, watch } from 'vue'
// import { useFreelancer } from "./useTeamFreelance"
import { cloneDeep } from 'lodash'

interface Emit {
  (e: 'update:isDrawerOpen', value: boolean): void;
  (e: 'handleSubmit', value): void;
  (e: 'handleDestroy', value): void;
}

interface Props {
  isDrawerOpen: boolean
  isEdit: boolean
  teamfreelancer: object
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();
const $form = ref<VForm>();

const isSnackbarVisibility = ref(false)

// 👉 COMPOSABLES
// const { findOne } = useFreelancer();

// 👉 drawer close
const closeNavigationDrawer = () => {
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    $form.value?.reset()
    $form.value?.resetValidation()
  })
}

// 👉 Store
const onSubmit = async () => {
  var v = await $form.value?.validate()
  if (v.valid) {
    const { id, ...payload } = cloneDeep(props.teamfreelancer);
    emit('handleSubmit', {
      action: id ? 'update' : 'create',
      id,
      payload
    });
    $form.value?.reset()
    $form.value?.resetValidation()
  }
}

const onDelete = () => {
  emit('handleDestroy', props.teamfreelancer.id)
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    $form.value?.reset()
    $form.value?.resetValidation()
  })
}

const handleDrawerModelValueUpdate = (val: boolean) => {
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    $form.value?.reset()
    $form.value?.resetValidation()
  })
}

watch(() => props.isDrawerOpen, async (newVal) => {
  if(!newVal) return;
  $form.value.resetValidation();
});

const status = [
  {
    title: 'Disponible',
    value: 200,
  },
  {
    title: 'No disponible',
    value: 300,
  },
]

function addMemberHandleClick() {
  $modalSearchFreelancers.value = true;
  
}

function destroyMemberHandleClick(index) {
  console.log({ index })
}

// 👉 MODAL
const $modalSearchFreelancers = ref(false);

const loading = ref(false);
const items = ref([]);
const search = ref(null);
const select = ref(null);
const states = [
  'Alabama',
  'Alaska',
  'American Samoa',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District of Columbia',
  'Federated States of Micronesia'
]

watch(search, (val) => {
  // querySelections(val)
  val && val !== select.value && querySelections(val);
});

function querySelections(v) {
  loading.value = true
  setTimeout(() => {
    items.value = states.filter(e => {
      return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
    })
    loading.value = false
  }, 500)
}
</script>

<template>
  <VNavigationDrawer temporary :width="400" location="end" class="scrollable-content"
  @update:model-value="handleDrawerModelValueUpdate" :model-value="isDrawerOpen">
    <div class="d-flex align-center pa-6 pb-1">
      <!-- 👉 Title -->
      <h6 class="text-h6">
        {{ isEdit ? 'Editar' : 'Nuevo' }}
      </h6>
      <VSpacer />
      <template v-if="isEdit">
        <VBtn @click="onDelete" size="32" color="error" class="me-2">
          <VIcon size="18" icon="tabler-trash" />
        </VBtn>
      </template>
      <VBtn variant="tonal" color="default" icon size="32" class="rounded" @click="closeNavigationDrawer">
        <VIcon size="18" icon="tabler-x" />
      </VBTn>
    </div>
    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <!-- 👉 Form -->
          <VForm ref="$form" @submit.prevent="onSubmit">
            <VRow class="mb-4">
              <VCol cols="12">
                <VSelect
                  label="Estado"
                  :items="status"
                  variant="outlined"
                  v-model="teamfreelancer.status"
                ></VSelect>
              </VCol>
              <VCol cols="12">
                <VTextField
                  v-model="teamfreelancer.name"
                  label="Nombre"
                  :rules="[requiredValidator]"
                />
              </VCol>
              <VCol cols="12">
                <VTextarea 
                  v-model="teamfreelancer.description"
                  label="Descripción"
                  auto-grow
                  rows="6"
                  row-height="40"
                />
              </VCol>
              <VCol cols="12">
                <strong class="text-sm d-block mb-0">Miembros</strong>
                <span class="text-caption text-disabled d-block">Hay {{ teamfreelancer.members.length }} miembros</span>
                <div class="v-avatar-group mb-4">
                    <VAvatar
                      v-for="(item, index) in teamfreelancer.members"
                      :key="item"
                      variant="tonal" color="success" class="me-3" size="38">
                      <button class="btn-unset" @click.prevent="destroyMemberHandleClick(index)">
                        <VImg v-if="true" src="https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-2/assets/avatar-6-c56877f3.png" />
                        <span v-else>{{ avatarText(item.name) }}</span>
                        <VTooltip
                          activator="parent"
                          location="top"
                        >
                          {{ item }}
                        </VTooltip>
                      </button>
                    </VAvatar>
                  <button type="button" class="bg-primary pa-2 btn-plus" title="Agregar" @click="addMemberHandleClick">
                    <VIcon icon="tabler-user-plus" />
                  </button>
                </div>
                <!--<VBtn color="primary" block size="small">Seleccionar</VBtn>-->
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12">
                <VBtn type="submit" color="success" block>
                  <VIcon icon="tabler-device-floppy" class="mr-2"/>
                  Guardar
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>

  <!--
  <VSnackbar v-model="isSnackbarVisibility" location="bottom start" multi-line :timeout="10000">
    El "Team Freelancer" ya ha sido registrado.
  </VSnackbar>
  -->
  
  <VDialog v-model="$modalSearchFreelancers" scrollable width="400">
    <VCard class="">
      <VCardTitle>
        <span class="text-sm">
          <VIcon icon="tabler-hand-click" size="1.2em" class="mr-1" /> Seleccione un freelancer
        </span>
      </VCardTitle>
      <VDivider />
      <div class="py-6">
        <v-autocomplete
          v-model="select"
          v-model:search="search"
          :loading="loading"
          :items="items"
          class="mx-4"
          density="comfortable"
          hide-no-data
          hide-details
          label="Seleccione"
        ></v-autocomplete>
      </div>
      <VDivider />
      <VCardActions class="py-2 justify-end">
        <VBtn variant="outlined" color="error" size="small" @click="$modalSearchFreelancers = false">
          Cancelar
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
  .btn-unset {
    width: 100%;
    height: 100%;
    background: transparent;
    padding: 0;
    margin: 0;
    position: relative;
    
    &::before {
      content: "",
      
    }
  }
  .btn-plus {
    border-radius: 50%;
    width: 35.764px;
    height: 35.764px;
    display: flex;
    align-items: center;
    justify-content: center;  
  }
  
  .checkbox {
    padding: 4px 0px !important;
  }

  body {
    --vs-actions-padding: 5px 10px;
    --vs-dropdown-option--active-color: #7367F0;
  }

  .vs__selected-options {
    font-size: 15px !important;
  }
</style>
