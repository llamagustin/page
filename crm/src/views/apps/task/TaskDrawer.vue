<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { cloneDeep } from 'lodash'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { VForm } from 'vuetify/components'
import { emailValidator, requiredValidator } from '@validators'
import { avatarText } from '@core/utils/formatters'

interface Emit {
  (e: 'update:isDrawerOpen', value): void;
  (e: 'handleSubmit', value): void;
  (e: 'handleDelete', value): void;
}

interface Props {
  isDrawerOpen: boolean
  isEdit: boolean
  task: object
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();
const refForm = ref<VForm>();

// 👉 drawer close
const closeNavigationDrawer = () => {
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

// 👉 Store
const onSubmit = async () => {
  let { valid } = await refForm.value.validate();
  if (!valid) return;
  const { offer_id, ...payload } = cloneDeep(props.task);
  emit('handleSubmit', {
    id: offer_id,
    action: offer_id ? 'update' : 'create',
    payload
  });
  refForm.value?.reset()
  refForm.value?.resetValidation()
}

const onDelete = () => {
  emit('handleDelete', props.task.offer_id)
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const handleDrawerModelValueUpdate = (val: boolean) => {
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

watch(() => props.isDrawerOpen, async (newVal) => {
  if(!newVal) return;
  await nextTick();
  refForm.value?.resetValidation();
});

const optionsFormFees = [
  {
    label: "Hourly rate",
    value: "hourlyrate"
  },
  {
    label: "Fix price",
    value: "fixprice"
  }
]

const optionsCurrency = ["EUR", "DOLLAR"]
</script>

<template>
  <VNavigationDrawer 
    temporary
    :width="400"
    location="end"
    class="scrollable-content"
    @update:model-value="handleDrawerModelValueUpdate"
    :model-value="isDrawerOpen">
    <!-- 👉 Header -->
    <div class="d-flex align-center pa-6 pb-1 border-b">
      <h6 class="text-h6">
        {{ isEdit ? 'Editar' : 'Nuevo' }}
      </h6>
      <VSpacer />
      <template v-if="isEdit">
        <VBtn @click="onSubmit" size="32" class="me-2">
          <VIcon size="18" icon="tabler-edit" />
        </VBtn>
        <VBtn @click="onDelete" size="32" color="error" class="me-2">
          <VIcon size="18" icon="tabler-trash" />
        </VBtn>
      </template>
      <VBtn variant="tonal" color="default" icon size="32" class="rounded" @click="closeNavigationDrawer">
        <VIcon size="18" icon="tabler-x" />
      </VBTn>
    </div>
    <!-- 👉 Body -->
    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <div class="loader" v-if="!isDrawerOpen">
          <div class="loader-await text-primary text-sm font-weight-black">Espere...</div>
        </div>
        <VCardText>
          <VForm ref="refForm" @submit.prevent="onSubmit">
            <VRow class="mb-4">
              <VCol cols="12">
                <VTextField
                  v-model="task.title"
                  label="Proyecto"
                  :rules="[requiredValidator]"
                />
              </VCol>
              <VCol cols="12">
                <VTextarea 
                  v-model="task.description"
                  label="Descripción"
                  auto-grow
                  rows="6"
                  row-height="40"
                  :rules="[requiredValidator]"
                />
              </VCol>
              <VCol cols="12">
                <VLabel>Estado</VLabel>
                <div class="group-checkbox">
                  <VCheckbox v-model="task.isCompleted" class="checkbox" color="success" label="Completado"></VCheckbox>
                  <VCheckbox v-model="task.isImportant" class="checkbox" color="warning" label="Importante"></VCheckbox>
                  <VCheckbox v-show="task.offer_id" v-model="task.isDeleted" class="checkbox" color="error" label="Eliminado"></VCheckbox>
                </div>
              </VCol>
              <VCol cols="12">
                <VTextField
                  v-model="task.weeklimit"
                  label="Límite de semana"
                  :rules="[requiredValidator]"
                />
              </VCol>
              <VCol cols="12">
                <VSelect
                  v-model="task.selectedcurrency"
                  :items="optionsCurrency"
                  label="Tipo moneda"
                ></VSelect>
              </VCol>
              <VCol cols="12">
                <VSelect
                  v-model="task.picked"
                  :items="optionsFormFees"
                  label="Honorarios por"
                  item-title="label"
                  item-value="value"
                  :rules="[requiredValidator]"
                ></VSelect>
              </VCol>
              <VCol cols="12" v-if="task.picked == 'hourlyrate'">
                <VTextField
                  v-model="task.hourlyrate"
                  label="Monto Hourly rate"
                  :rules="[requiredValidator]"
                />
              </VCol>
              <VCol cols="12" v-if="task.picked == 'fixprice'">
                <VTextField
                  v-model="task.tarifa"
                  label="Monto Fix price"
                  :rules="[requiredValidator]"
                />
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
</template>

<style lang="scss" scoped>
  .group-checkbox {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    text-align: center;
    gap: 0 1em;
  }
  .checkbox {
    display: inline-block;
    /*padding: 4px 0px !important;*/
    :deep(.v-label) {
      font-size: 14px;
    }
  }
  body {
    --vs-actions-padding: 5px 10px;
    --vs-dropdown-option--active-color: #7367F0;
  }
  .vs__selected-options {
    font-size: 15px !important;
  }
  .__m-padding input {
    padding-top: 0 !important;
  }
  
  .btn-close {
    border: 1px solid transparent;
    border-radius: 50%;
    transition: border-color 100ms
  }
  .btn-close:hover {
    border-color: #7367F0;
  }
  
  .vs__search::placeholder {
    opacity: .5 !important;
  }
  
  .loader {
    inline-size: 100%;
    block-size: 100%;
    background-color: hsl(0deg 0% 100% / 80%);
    position: absolute;
    z-index: 10;
    top: 0;
    display: grid;
    place-items: center;
    user-select: none;
    pointer-events: all;
  }
</style>
