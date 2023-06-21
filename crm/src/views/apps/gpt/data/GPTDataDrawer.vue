<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { cloneDeep } from 'lodash'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { VForm } from 'vuetify/components'
import { emailValidator, requiredValidator } from '@validators'
import { avatarText } from '@core/utils/formatters'
import VSelect from "vue-select"
import "vue-select/dist/vue-select.css"

interface Emit {
  (e: 'update:isDrawerOpen', value): void;
  (e: 'handleSubmit', value): void;
  (e: 'handleDelete', value): void;
}

interface Props {
  isDrawerOpen: boolean
  isEdit: boolean
  gpt: object
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();
const refForm = ref<VForm>();

// 👉 COMPOSABLES

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
  const { id, ...payload } = cloneDeep(props.gpt);
  emit('handleSubmit', {
    id,
    action: id ? 'update' : 'create',
    payload
  });
  refForm.value?.reset()
  refForm.value?.resetValidation()
}

const onDelete = () => {
  emit('handleDelete', props.gpt.id)
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

const refInputEl = ref<HTMLElement>()

const changeAvatar = (file: Event) => {
  const fileReader = new FileReader();
  const { files } = file.target as HTMLInputElement;
  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        props.gpt.author.avatar = fileReader.result
      }
    }
  }
}

watch(() => props.isDrawerOpen, async (newVal) => {
  if(!newVal) return;
  labelCategory.value = ''
  await nextTick();
  refForm.value?.resetValidation();
});


const labelCategory = ref('');

function addCategoryHandleClick() {
  let newItem = String(labelCategory.value).trim().toLowerCase();
  let index = props.gpt.category.findIndex(c => c == newItem);
  labelCategory.value = '';
  if(!newItem.length || index != -1) return;
  props.gpt.category.push(newItem)
  labelCategory.value = '';
}

function removeCategory(item) {
  let index = props.gpt.category.findIndex(c => c == item);
  if(index == -1) return;
  props.gpt.category.splice(index, 1);
}

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
              <VCol cols="12" class="pb-0">
                <span class="text-primary font-weight-regular text-sm">Información del autor</span>
                <VDivider class="mt-0" />
              </VCol>
              
              <VCol cols="12" md="8">
                <VSelect label="Business"
                  :options="['First', 'Second']"
                  class="vs__select_scoped"
                  placeholder="Business"
                >
                  <!--@option:selected="selectProvince"-->
                  <!--:getOptionLabel="(item) => item.title"-->
                  <!--:reduce="(item) => item.title"-->
                  <!--v-model="address.province"-->
                  <template #no-options="{ search, searching }">
                    <template v-if="searching">
                      <p class="text-sm-caption">
                        No se han encontrado resultados para "<b>{{ search }}</b>".
                      </p>
                    </template>
                    <p v-else class="text-sm-caption">No hay opciones</p>
                  </template>
                </VSelect>
              </VCol>
              <!--
              <VCol cols="12" class="d-flex">
                <div class="text-center">
                  <VAvatar variant="tonal" color="200" class="me-3" size="60">
                    <VImg v-if="gpt.author.avatar" :src="gpt.author.avatar" />
                    <span v-else>{{ avatarText(gpt.author.name || '?') }}</span>
                  </VAvatar>
                </div>
                <div class="d-flex flex-column justify-center gap-1">
                  <div class="d-flex gap-2">
                    <VBtn color="primary" @click="refInputEl.click()" size="small">
                      <VIcon icon="tabler-cloud-upload" class="d-sm-none" />
                      <span class="d-none d-sm-block">Upload photo</span>
                    </VBtn>
                    <input ref="refInputEl" type="file" name="file" accept=".jpeg,.png,.jpg,GIF" hidden @input="changeAvatar">
                    <VBtn type="reset" color="secondary" size="small" variant="tonal">
                      <span class="d-none d-sm-block">Reset</span>
                    </VBtn>
                  </div>
                  <p class="text-sm-caption mb-0 text-grey-400">
                    Allowed JPG, GIF or PNG. Max size of 800K
                  </p>
                </div>
              </VCol>
              <VCol cols="12">
                <VTextField
                  v-model="gpt.author.name"
                  label="Nombre completo"
                  :rules="[requiredValidator]"
                />
              </VCol>
              <VCol cols="12">
                <VTextField
                  type="number"
                  v-model.number="gpt.author.followers"
                  label="Cantidad de seguidores"
                  :rules="[requiredValidator]"
                />
              </VCol>
              -->
            </VRow>
            
            <VRow class="mb-4">
              <VCol cols="12" class="pb-0">
                <span class="text-primary font-weight-regular text-sm">Información general</span>
                <VDivider class="mt-0" />
              </VCol>
              <VCol cols="12">
                <VTextField
                  v-model="gpt.title"
                  label="Título"
                  :rules="[requiredValidator]"
                />
              </VCol>
              <VCol cols="12">
                <div class="border border-opacity-25 pa-2 rounded-s">
                  <label for="input-category" class="d-block font-weight-light ma-0 text-grey-400 label-category">Categorias</label>
                  <VChip
                    v-for="item in gpt.category"
                    class="ma-2 text-capitalize user-select-none"
                    color="primary"
                    prepend
                    style="margin: .2em !important"
                  >
                    <span class="pr-1">{{ item }}</span>
                    <VIcon size="16" icon="tabler-x" class="btn-close" @click.prevent="removeCategory(item)"/>
                  </VChip>
                  <VTextField v-model="labelCategory"
                    placeholder="Aquí"
                    id="input-category"
                    label=""
                    class="pa-0 __m-padding"
                    variant="underlined"
                    @keydown.enter.prevent="addCategoryHandleClick"
                    :rules="!gpt.category.length ? [requiredValidator] : []"
                  />
                  <em class="text-disabled text-xs d-block text-right mt-1">Presione <strong>Enter</strong> para agregar categoria</em>
                </div>
              </VCol>
              <VCol cols="12">
                <VTextarea 
                  v-model="gpt.input"
                  label="Input"
                  auto-grow
                  rows="6"
                  row-height="40"
                  :rules="[requiredValidator]"
                />
              </VCol>
              <VCol cols="12">
                <VTextarea 
                  v-model="gpt.output"
                  label="Output"
                  auto-grow
                  rows="6"
                  row-height="40"
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

<style lang="scss">
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
