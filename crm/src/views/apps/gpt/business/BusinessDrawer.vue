<script setup lang="ts">
import VSelect3 from "vue-select"
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import "vue-select/dist/vue-select.css"
import { VForm } from 'vuetify/components'
import { emailValidator, requiredValidator } from '@validators'
import { avatarText } from '@core/utils/formatters'
import { useUbigeo } from "@/shared/composables/useUbigeo"
import { uuid } from 'vue-uuid'
import { ref, nextTick, watch } from 'vue'
import { cloneDeep } from 'lodash'
import { useUser } from "@/views/apps/user/useUser";

interface Emit {
  (e: 'update:isDrawerOpen', value): void;
  (e: 'handleSubmit', value): void;
  (e: 'handleDelete', value): void;
}

interface Props {
  isDrawerOpen: boolean
  isEdit: boolean
  business: object
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();
const refForm = ref<VForm>();

const isSnackbarVisibility = ref(false)

// 👉 COMPOSABLES
const { ubigeo, getCities, getCodes } = useUbigeo();

const address = ref({
  province: '',
  city: '',
  zip: '',
  line: ''
})

const selectProvince = async (data) => {
  getCities(data.value)
  
  props.business.address.province = data.title
  props.business.address.city = ''
  props.business.address.zip = ''
  props.business.address.line = ''
  
  address.value.city = ''
  address.value.zip = ''
  address.value.line = ''
}

const selectCity = async (data) => {
  getCodes(data.value)
  
  props.business.address.city = data.title
  props.business.address.zip = ''
  props.business.address.line = ''

  address.value.zip = ''
  address.value.line = ''
}

const selectCode = async (data) => {
  props.business.address.zip = data.codigo_postal;
  address.value.line = '';
}

watch(address, (data) => {
  if (!data.province) {
    address.value.city = ''
    address.value.zip = ''
    address.value.line = ''
  }
})

watch(() => props.business.address, async (newAddress) => {
  if (newAddress?.province) {
    let _province = ubigeo.provinces.find((item) => item.title == newAddress.province);
    address.value.province = _province?.title;
    if (!address.value.province) return
    await getCities(_province.value);
    await nextTick();
    
    if (newAddress.city) {
      let _city = ubigeo.cities.find((city) => city.title === newAddress.city);
      address.value.city = _city?.title;
      if (!address.value.city) return
      await getCodes(_city.value);
      if (newAddress.zip) {
        await nextTick();
        let _code = ubigeo.codes.find((code) => code?.codigo_postal === newAddress.zip);
        address.value.zip = _code.codigo_postal;
        address.value.line = newAddress.line;
      }
    }
  }
});

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
  const { id, user, ...formData } = cloneDeep(props.business);
  emit('handleSubmit', {
    id,
    action: id ? 'update' : 'create',
    payload: {
      ...formData,
      address: {
        ...formData.address,
        ...address.value,
      }
    }
  });
  refForm.value?.reset()
  refForm.value?.resetValidation()
}

const onDelete = () => {
  emit('handleDelete', props.business.id)
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
        props.business.image = fileReader.result
      }
    }
  }
}

watch(() => props.isDrawerOpen, async (newVal) => {
  if(!newVal) return;
  
  searchQuery.value = ''
  searchByLead.value = ''
  labelCategory.value = ''
  
  if(!props.business.id) {
    address.value = {
      province: '',
      city: '',
      zip: '',
      line: ''
    }
  } else {
    let leadId = props.business.user_id;
    if(!thisLeadExistsUserList(leadId)) {
      searchByLead.value = leadId;
    }
  }
  await nextTick();
  refForm.value?.resetValidation();
  await fetchUsers();
});


const labelCategory = ref('');
function addCategoryhandleClick() {
  let newItem = String(labelCategory.value).trim().toLowerCase();
  let index = props.business.category.findIndex(c => c == newItem);
  labelCategory.value = '';
  if(!newItem.length || index != -1) return;
  props.business.category.push(newItem)
  labelCategory.value = '';
}

function removeCategory(item) {
  let index = props.business.category.findIndex(c => c == item);
  if(index == -1) return;
  props.business.category.splice(index, 1);
}

// 👉 FETCH USERS
const { users, searchQuery, fetchUsers, leadId: searchByLead } = useUser();

async function onSearchUsers(search, loading) {
  loading(true)
  searchQuery.value = search;
  await fetchUsers();
  loading(false);
}

function thisLeadExistsUserList(userId) {
  let index = users.value.find(c => c.id === userId);
  return index != -1;
}

</script>

<template>
  <VNavigationDrawer temporary :width="400" location="end" class="scrollable-content" @update:model-value="handleDrawerModelValueUpdate" :model-value="props.isDrawerOpen">
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
        <VCardText>
          <VForm ref="refForm" @submit.prevent="onSubmit">
            <VRow class="mb-4">
              <VCol cols="12" class="d-flex">
                <div class="text-center">
                  <VAvatar variant="tonal" color="200" class="me-3" size="60">
                    <VImg v-if="business.image" :src="business.image" />
                    <span v-else>{{ avatarText('?') }}</span>
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
            </VRow>
            <VRow class="mb-4">
              <VCol cols="12" class="pb-0">
                <span class="text-primary font-weight-regular">Información general</span>
                <VDivider class="mt-0" />
              </VCol>
              <VCol cols="12">
                <VTextField
                  v-model="business.title"
                  label="Título"
                  :rules="[requiredValidator]"
                />
              </VCol>
              <VCol cols="12">
                <VTextarea 
                  v-model="business.description"
                  label="Descripción"
                  auto-grow
                  rows="6"
                  row-height="40"
                  :rules="[requiredValidator]"
                />
              </VCol>
              <VCol cols="12">
                <VTextField
                  v-model="business.phone"
                  label="Teléfono"
                  :rules="[requiredValidator]"
                />
              </VCol>
              <VCol cols="12">
                <div class="border border-opacity-25 pa-2 rounded-s">
                  <label for="input-category" class="d-block font-weight-light ma-0 text-grey-400 label-category">Categorias</label>
                  <VChip
                    v-for="item in business.category"
                    class="ma-2 text-capitalize user-select-none"
                    color="primary"
                    prepend
                    style="margin: .2em !important"
                  >
                    <span class="pr-1">{{ item }}</span>
                    <VIcon size="16" icon="tabler-x" class="btn-close" @click.prevent="removeCategory(item)"/>
                  </VChip>
                  <VTextField v-model="labelCategory" placeholder="Aquí" id="input-category" label="" class="pa-0 __m-padding" variant="underlined" @keydown.enter.prevent="addCategoryhandleClick"/>
                  <em class="text-disabled text-xs d-block text-right mt-1">Presione <strong>Enter</strong> para agregar categoria</em>
                </div>
              </VCol>
              <VCol cols="12">
                <VSelect3
                  placeholder="Usuario"
                  label="name"
                  class="vs__select_scoped"
                  :reduce="c => c.id"
                  @search="onSearchUsers"
                  :filterable="false"
                  :options="users"
                  v-model="business.user_id"
                  :rules="[requiredValidator]"
                >
                  <template #option="{ name, avatar }">
                    <div>
                      <VAvatar variant="tonal" color="success" size="35">
                        <VImg v-if="avatar" src="avatar" />
                        <span v-else>{{ avatarText(`${name.name} ${name?.firstSurname}`) }}</span>
                      </VAvatar>
                      {{ name?.name }} {{ name?.firstSurname }} {{ name?.secondSurname }} 
                    </div>
                  </template>
                  <template #selected-option="{ name }">
                    <div>
                      {{ name?.name }} {{ name?.firstSurname }} {{ name?.secondSurname }} 
                    </div>
                  </template>
                  <template #no-options="{ search, searching }">
                    <template v-if="searching">
                      <p class="text-sm-caption">
                        No se han encontrado resultados para "<b>{{ search }}</b>".
                      </p>
                    </template>
                    <p v-else class="text-sm-caption">No hay opciones</p>
                  </template>
                  
                </VSelect3>
              </VCol>
            </VRow>
            <VRow class="mb-4">
              <VCol cols="12" class="pb-0">
                <span class="text-primary font-weight-regular">Información ubicación</span>
                <VDivider class="mb-0 mt-0" />
              </VCol>
              
              <VCol cols="12" md="4">
                <VTextField label="País" v-model="business.address.country" readonly/>
              </VCol>
              
              <VCol cols="12" md="8">
                <VSelect3 label="Provincia"
                  class="vs__select_scoped"
                  :options="ubigeo.provinces"
                  :getOptionLabel="(item) => item.title"
                  :reduce="(item) => item.title"
                  v-model="address.province"
                  maxHeight="200px"
                  placeholder="Provincia"
                  @option:selected="selectProvince"
                  :rules="[requiredValidator]"
                >
                  <template #no-options="{ search, searching }">
                    <template v-if="searching">
                      <p class="text-sm-caption pb-0">
                        No se han encontrado resultados para "<b>{{ search }}</b>".
                      </p>
                    </template>
                    <p v-else class="text-sm-caption">No hay opciones</p>
                  </template>
                </VSelect3>
              </VCol>
              <VCol cols="12" v-if="address.province">
                <VSelect3 id="city"
                  label="Ciudad"
                  :options="ubigeo.cities"
                  placeholder="Ciudad"
                  class="vs__select_scoped"
                  :getOptionLabel="(item) => item.title"
                  :reduce="(item) => item.title"
                  v-model="address.city"
                  maxHeight="200px"
                  @option:selected="selectCity"
                >
                  <template #no-options="{ search, searching }">
                    <template v-if="searching">
                      <p class="text-sm-caption">
                        No se han encontrado resultados para "<b>{{ search }}</b>".
                      </p>
                    </template>
                    <p v-else class="text-sm-caption">No hay opciones</p>
                  </template>
                </VSelect3>
              </VCol>
              <VCol cols="12" v-if="address.province && address.city">
                <VSelect3 id="postal-code"
                  label="Zip"
                  :options="ubigeo.codes"
                  placeholder="Zip"
                  class="vs__select_scoped"
                  :getOptionLabel="(item) => item.codigo_postal"
                  :reduce="(item) => item.codigo_postal"
                  v-model="address.zip"
                  maxHeight="200px"
                  @option:selected="selectCode"
                >
                  <template #no-options="{ search, searching }">
                    <template v-if="searching">
                      <p class="text-sm-caption">
                        No se han encontrado resultados para "<b>{{ search }}</b>".
                      </p>
                    </template>
                    <p v-else class="text-sm-caption">No hay opciones</p>
                  </template>
                </VSelect3>
              </VCol>
              <VCol cols="12" v-if="address.province && address.city && address.zip">
                <VTextField v-model="address.line" label="Dirección completa" />
              </VCol>
            </VRow>
            <VRow class="mb-4">
              <VCol cols="12" class="pb-0">
                <span class="text-primary font-weight-regular">Credenciales</span>
                <VDivider class="mb-0 mt-0" />
              </VCol>
              <VCol cols="12">
                <VTextField
                  v-model="business.email"
                  label="Correo"
                />
              </VCol>
              <VCol cols="12">
                <VTextField
                  v-model="business.password"
                  label="Contraseña"
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
  
  <!--<VSnackbar v-model="isSnackbarVisibility" location="bottom start" multi-line :timeout="10000">-->
  <!--  El "Email" ya ha sido registrado.-->
  <!--</VSnackbar>-->
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
</style>
