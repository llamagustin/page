<script setup lang="ts">
import AppDateTimePicker from '@core/components/AppDateTimePicker.vue'
import VueTelInput from 'vue-tel-input'
import TreeSelect from 'vue3-treeselect'
import VSelect from "vue-select"
import "vue-select/dist/vue-select.css"
import StarIcon from "./Icons/StarIcon.vue";
import EducationIcon from "./Icons/EducationIcon.vue";
import SkillIcon from "./Icons/SkillIcon.vue";
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import 'vue3-treeselect/dist/vue3-treeselect.css'
import type { VForm } from 'vuetify/components'
import type { FreelancerProperties } from '@/@fake-db/types'
import { emailValidator, requiredValidator } from '@validators'
import { avatarText } from '@core/utils/formatters'
import { getUsername } from "@/shared/utils/strings"
import { useUbigeo } from "@/shared/composables/useUbigeo"
import { uuid } from 'vue-uuid'
import { ref, nextTick, watch } from 'vue'
import { useFreelancer } from "@/views/apps/freelancer/useFreelancer"
import { cloneDeep } from 'lodash'

interface Emit {
  (e: 'update:isDrawerOpen', value: boolean): void;
  (e: 'handleSubmit', value: FreelancerProperties): void;
  (e: 'deleteFreelancer', value): void;
}

interface Props {
  isDrawerOpen: boolean
  isEdit: boolean
  freelancer: FreelancerProperties
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();
const refForm = ref<VForm>();

const isSnackbarVisibility = ref(false)

// 👉 COMPOSABLES
const { findOne } = useFreelancer();
const { ubigeo, getCities, getCodes } = useUbigeo();

const address = ref({
  province: '',
  city: '',
  code: '',
  line: ''
})

const selectProvince = async (data) => {
  getCities(data.value)
  
  props.freelancer.address.province = data.title
  props.freelancer.address.city = ''
  props.freelancer.address.code = ''
  props.freelancer.address.line = ''
  
  address.value.city = ''
  address.value.code = ''
  address.value.line = ''
}

const selectCity = async (data) => {
  getCodes(data.value)
  
  props.freelancer.address.city = data.title
  props.freelancer.address.code = ''
  props.freelancer.address.line = ''

  address.value.code = ''
  address.value.line = ''
}

const selectCode = async (data) => {
  props.freelancer.address.code = data.codigo_postal;
  address.value.line = '';
}

watch(address, (data) => {
  if (!data.province) {
    address.value.city = ''
    address.value.code = ''
    address.value.line = ''
  }
})

watch(() => props.freelancer.address, async (newAddress) => {
  if (newAddress?.province) {
    let _province = ubigeo.provinces.find((item) => item.title == newAddress?.province);
    address.value.province = _province?.title;
    if (!address.value.province) return
    await getCities(_province.value);
    await nextTick();
    
    if (newAddress?.city) {
      let _city = ubigeo.cities.find((city) => city.title === newAddress?.city);
      address.value.city = _city?.title;
      if (!address.value.city) return
      await getCodes(_city.value);
      if (newAddress?.code) {
        await nextTick();
        let _code = ubigeo.codes.find((code) => code?.codigo_postal === newAddress?.code);
        address.value.code = _code.codigo_postal;
        address.value.line = newAddress?.line;
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
  var v = await refForm.value?.validate()
  if (v.valid) {
    const { id, ...formData } = cloneDeep(props.freelancer);
    emit('handleSubmit', {
      action: id ? 'update' : 'create',
      freelancerId: id,
      freelancer: {
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
}

const onDelete = () => {
  emit('deleteFreelancer', props.freelancer.id)
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
        props.freelancer.avatar = fileReader.result
      }
    }
  }
}

watch(() => props.isDrawerOpen, async (newVal) => {
  if(!newVal) return;
  formEducationActive.value = false
  formExperienceActive.value = false
  formSkillActive.value = false
  await nextTick();
  if(!props.freelancer.id) {
    address.value = {
      province: '',
      city: '',
      code: '',
      line: ''
    }
  }
  refForm.value?.resetValidation();
});

// MINIFORMS
const BY_PROPERTY_EDUCATION = 'id' //degree;
const BY_PROPERTY_EXPERIENCE = 'id' //company;
const BY_PROPERTY_SKILL = 'id'

// 👉 SECTION EDUCATION
const formEducationActive = ref(false);
const formEducation = ref({
  id: "",
  degree: "",
  startDate: "",
  endDate: "",
  institution: "",
});

// 👉️ SECTION EXPERIENCE
const formExperienceActive = ref(false);
const formExperience = ref({
  id: "",
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  description: "",
});

// 👉️ SECTION EXPERIENCE
const formSkillActive = ref(false);
const formSkill = ref({
  key: "",
  values: ""
});

function clearMiniform(name) {
  switch (name) {
    case 'education':
      formEducation.value = {
        id: uuid.v4(),
        degree: "",
        startDate: "",
        endDate: "",
        institution: "",
      }
      break;
    case 'experience':
      formExperience.value = {
        id: uuid.v4(),
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      }
      break;
    case 'skill':
      formSkill.value = {
        id: uuid.v4(),
        key: "",
        value: ""
      }
      break;
    default:
  }
}

function showMiniform(name, data) {
  clearMiniform(name)
  switch (name) {
    case 'education':
      formEducationActive.value = true;
      if(!data) return;
      formEducation.value = { 
        ...data,
        id: data.id || uuid.v4()
      }
      break;
    case 'experience':
      formExperienceActive.value = true;
      if(!data) return;
      formExperience.value = { 
        ...data,
        id: data.id || uuid.v4()
      }
      break;
    case 'skill':
      formSkillActive.value = true;
      if(!data) return;
      formSkill.value = {
        ...data,
        values: data.values.join(', '),
        id: data.id || uuid.v4()
      }
      break;
    default:
      console.warn('The form',name,'not found')
  }
}

function handleSaveMiniform(name) {
  switch (name) {
    case 'education':
      if(!props.freelancer.academies.length) {
        props.freelancer.academies.push(formEducation.value);
      } else {
        const index = props.freelancer.academies.findIndex(c => c?.[BY_PROPERTY_EDUCATION] == formEducation.value[BY_PROPERTY_EDUCATION]);
        if(index !== -1) {
          props.freelancer.academies.splice(index, 1, formEducation.value);
        } else {
          props.freelancer.academies.push(formEducation.value);
        }
      }
      formEducationActive.value = false;
      break;
    case 'experience':
      if(!props.freelancer.experiences.length) {
        props.freelancer.experiences.push(formExperience.value)
      } else {
        const index = props.freelancer.experiences.findIndex(c => c?.[BY_PROPERTY_EXPERIENCE] == formExperience.value[BY_PROPERTY_EXPERIENCE]);
        if(index !== -1) {
          props.freelancer.experiences.splice(index, 1, formExperience.value);
        } else {
          props.freelancer.experiences.push(formExperience.value);
        }
      }
      formExperienceActive.value = false;
      break;
    case 'skill':
      const data = formSkill.value;
      props.freelancer.skills[data.key] = (data.values || '').split(',').map(c => c.trim()).filter(c => String(c).length);
      formSkillActive.value = false;
      break;
    default:
      console.warn('The form',name,'not found.')
  }
}

function handleDeleteMiniform(name, data) {
    switch (name) {
      case 'education':
        {
          formEducation.value = data;
          let index = props.freelancer.academies.findIndex(c => c?.[BY_PROPERTY_EDUCATION] == formEducation.value[BY_PROPERTY_EDUCATION]);
          if(index !== -1) {
            props.freelancer.academies.splice(index, 1);
          }
          formEducationActive.value = false;
        }
        break;
      case 'experience':
        {
          formExperience.value = data;
          let index = props.freelancer.experiences.findIndex(c => c?.[BY_PROPERTY_EXPERIENCE] == formExperience.value[BY_PROPERTY_EXPERIENCE]);
          if(index !== -1) {
            props.freelancer.experiences.splice(index, 1);
          }
          formExperienceActive.value = false;
        }
        break;
      case 'skill':
        {
          let array = Object.entries(props.freelancer.skills);
          let index = array.findIndex(([key]) => key == data.key);
          if(index == -1) return;
          array.splice(index, 1);
          props.freelancer.skills = Object.fromEntries(array);
          formSkillActive.value = false;
        }
        break;
      default:
    }
  }
</script>

<template>
  <VNavigationDrawer temporary :width="400" location="end" class="scrollable-content" @update:model-value="handleDrawerModelValueUpdate" :model-value="props.isDrawerOpen">
    <div class="d-flex align-center pa-6 pb-1">
      <!-- 👉 Title -->
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
      <!-- 👉 Close btn -->
      <VBtn variant="tonal" color="default" icon size="32" class="rounded" @click="closeNavigationDrawer">
        <VIcon size="18" icon="tabler-x" />
      </VBTn>
    </div>

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <!-- 👉 Form -->
          <VForm ref="refForm" @submit.prevent="onSubmit">
            <VRow>
              <VDivider />
              <VCol cols="12">
                <p class="mb-0 mt-2">Calificación</p>
                <VRating v-model="freelancer.rate" clearable class="py-0 me-10" />
              </VCol>
            </VRow>
            <VDivider class="mb-4" />
            <VRow class="mb-4">
              <VCol cols="12" class="d-flex">
                <div class="text-center">
                  <VAvatar variant="tonal" color="200" class="me-3" size="60">
                    <VImg v-if="freelancer?.avatar" :src="freelancer.avatar" />
                    <span v-else>{{ avatarText(freelancer?.fullname || '?') }}</span>
                  </VAvatar>
                </div>
                <form ref="refForm" class="d-flex flex-column justify-center gap-1">
                  <div class="d-flex gap-2">
                    <VBtn color="primary" @click="refInputEl?.click()" size="small">
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
                </form>
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12">
                <span class="text-primary font-weight-regular">Información personal</span>
                <VDivider class="mt-0" />
              </VCol>
            </VRow>
            <VRow class="mb-4">
              <VCol cols="12">
                <VTextField
                  v-model="freelancer.fullname"
                  label="Full Name"
                  :rules="[requiredValidator]"
                />
              </VCol>
              <VCol cols="12">
                <VTextarea 
                  v-model="freelancer.about"
                  label="Descripción"
                  auto-grow
                  rows="6"
                  row-height="40"
                  :rules="[requiredValidator]"
                />
              </VCol>
              <VCol cols="12">
                <VTextField
                  type="url"
                  v-model="freelancer.profile"
                  label="Sitio web"
                  :rules="[requiredValidator]"
                />
              </VCol>
              
              <VCol cols="12">
                <VTextField
                  v-model="freelancer.category"
                  label="Categoría"
                  :rules="[requiredValidator]"
                />
              </VCol>
              <VCol cols="12">
                <VTextField
                  v-model="freelancer.subcategory"
                  label="Subcategoría"
                  :rules="[requiredValidator]"
                />
              </VCol>
              <VCol cols="12">
                <span class="d-block mb-2 text-center text-success">Salario</span>
                <div class="d-flex gap-2 w-100">
                  <VTextField
                    type="number"
                    label="Mínimo"
                    v-model.number="freelancer.rangosalarial.min"
                    :rules="[requiredValidator]"
                  />
                  <VTextField
                    type="number"
                    v-model.number="freelancer.rangosalarial.max"
                    label="Máximo"
                    :rules="[requiredValidator]"
                  />
                </div>
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12">
                <span class="text-primary font-weight-regular">Información ubicación</span>
                <VDivider class="mb-0 mt-0" />
              </VCol>
            </VRow>
            <VRow class="mb-4">
              <VCol cols="12">
                <VTextField label="Lenguage" v-model="freelancer.language" :rules="[requiredValidator]"/>
              </VCol>
              <VCol cols="12">
                <VTextField label="Zona horaria" v-model="freelancer.timezone" :rules="[requiredValidator]" />
              </VCol>
              <!-- 👉 Country -->
              <VCol cols="12" md="4">
                <VTextField label="País" v-model="freelancer.address.country" readonly/>
              </VCol>
              <!-- 👉 Provincia -->
              <VCol cols="12" md="8">
                <VSelect label="Provincia"
                  :options="ubigeo.provinces"
                  class="vs__select_scoped"
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
                      <p class="text-sm-caption">
                        No se han encontrado resultados para "<b>{{ search }}</b>".
                      </p>
                    </template>
                    <p v-else class="text-sm-caption">No hay opciones</p>
                  </template>
                </VSelect>
              </VCol>
              
              <!-- 👉 Ciudad -->
              <VCol cols="12" v-if="address.province">
                <VSelect id="city"
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
                </VSelect>
              </VCol>

              <!-- 👉 Zip -->
              <VCol cols="12" v-if="address.province && address.city">
                <VSelect id="postal-code"
                  label="Zip"
                  :options="ubigeo.codes"
                  placeholder="Code"
                  class="vs__select_scoped"
                  :getOptionLabel="(item) => item.codigo_postal"
                  :reduce="(item) => item.codigo_postal"
                  v-model="address.code"
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
                </VSelect>
              </VCol>
              
              <VCol cols="12" v-if="address.province && address.city && address.code">
                <VTextField v-model="address.line" label="Dirección completa" />
              </VCol>
              
            </VRow>
            <VRow class="mb-4">
              <VCol cols="12">
                <span class="text-primary font-weight-regular">Educación</span>
                <VDivider class="my-0" />
              </VCol>
              <template v-if="!formEducationActive">
                <VCol cols="12" v-for="item in freelancer?.academies">
                  <div class="border border-opacity-50 border-primary pa-2 pa-4 rounded-lg text-sm position-relative">
                    <div class="position-absolute" style="top: .3em; right: .3em">
                      <VBtn variant="tonal" icon size="small" class="text-primary mr-1"
                        title="Editar"
                        @click="showMiniform('education', item)"
                      >
                       <VIcon size="18" icon="tabler-edit" />
                      </VBtn>
                      <VBtn variant="tonal" icon size="small" class="text-error"
                        title="Eliminar"
                        @click="handleDeleteMiniform('education', item)"
                      >
                       <VIcon size="18" icon="tabler-trash" />
                      </VBtn>
                    </div>
                    <span class="d-block font-weight-black text-primary">Grado</span>
                    <span class="d-block pl-4">{{ item.degree }}</span>
                    <span class="d-block font-weight-black text-primary">Fecha Inicio / Fin</span>
                    <span class="d-block pl-4">
                      {{ item.startDate.replaceAll('-', '/') }} - {{ item.endDate.replaceAll('-', '/') }}
                    </span>
                    <span class="d-block font-weight-black text-primary">Institución</span>
                    <span class="d-block pl-4">{{ item.institution }}</span>
                  </div>
                </VCol>
                <VCol cols="12" class="text-end">
                  <VBtn color="primary" variant="outlined" @click="showMiniform('education')">
                    <span class="pr-3">Agregar</span>
                    <EducationIcon />
                  </VBtn>
                </VCol>
              </template>
              <template v-else>
                <VCol cols="12">
                  <VTextField label="Grado" v-model="formEducation.degree" />
                </VCol>
                <VCol cols="12" md="6">
                  <VTextField type="date" label="Fecha inicio" v-model="formEducation.startDate" />
                </VCol>
                <VCol cols="12" md="6">
                  <VTextField type="date" label="Fecha fin" v-model="formEducation.endDate" />
                </VCol>
                <VCol cols="12">
                  <VTextField label="Instituto / Universidad" v-model="formEducation.institution"/>
                </VCol>
                <VCol cols="12" class="d-flex gap-2 justify-end">
                  <VBtn color="#F44336" variant="outlined" size="small" @click="formEducationActive = false">Cancelar</VBtn>
                  <VBtn color="success" variant="outlined" size="small" @click="handleSaveMiniform('education')">Guardar</VBtn>
                </VCol>
              </template>
            </VRow>
            <VRow class="mb-4">
              <VCol cols="12">
                <span class="text-primary font-weight-regular">Experiencia</span>
                <VDivider class="m-0" />
              </VCol>
              <template v-if="!formExperienceActive">
                <VCol cols="12" v-for="item in freelancer?.experiences">
                  <div class="border border-opacity-50 border-primary pa-2 pa-4 rounded-lg text-sm position-relative">
                    <div class="position-absolute" style="top: .3em; right: .3em">
                      <VBtn variant="tonal" icon size="small" class="text-primary mr-1"
                        title="Editar"
                        @click="showMiniform('experience', item)"
                      >
                       <VIcon size="18" icon="tabler-edit" />
                      </VBtn>
                      <VBtn variant="tonal" icon size="small" class="text-error"
                        title="Eliminar"
                        @click="handleDeleteMiniform('experience', item)"
                      >
                       <VIcon size="18" icon="tabler-trash" />
                      </VBtn>
                    </div>
                    <span class="d-block font-weight-black text-primary">Compañia</span>
                    <span class="d-block pl-4">{{ item.company }}</span>
                    <span class="d-block font-weight-black text-primary">Posición</span>
                    <span class="d-block pl-4">{{ item.position }}</span>
                    <span class="d-block font-weight-black text-primary">Fecha Inicio / Fin</span>
                    <span class="d-block pl-4">
                      {{ item.startDate.replaceAll('-', '/') }} - {{ item.endDate.replaceAll('-', '/') }}
                    </span>
                    <span class="d-block font-weight-black text-primary">Descripción</span>
                    <span class="d-block pl-4">{{ item.description }}</span>
                  </div>
                </VCol>
                <VCol cols="12" class="text-end">
                  <VBtn color="primary" variant="outlined" @click="showMiniform('experience')">
                    <span class="pr-3">Agregar</span>
                    <StarIcon />
                  </VBtn>
                </VCol>
              </template>
              <template v-else>
                <VCol cols="12">
                  <VTextField label="Compañia" v-model="formExperience.company" />
                </VCol>
                <VCol cols="12">
                  <VTextField label="Posición" v-model="formExperience.position" />
                </VCol>
                <VCol cols="12" md="6">
                  <VTextField type="date" label="Fecha inicio" v-model="formExperience.startDate" />
                </VCol>
                <VCol cols="12" md="6">
                  <VTextField type="date" label="Fecha fin" v-model="formExperience.endDate" />
                </VCol>
                <VCol cols="12">
                  <VTextarea label="Descripción" v-model="formExperience.description"/>
                </VCol>
                <VCol cols="12" class="d-flex gap-2 justify-end">
                  <VBtn color="#F44336" variant="outlined" size="small" @click="formExperienceActive = false">Cancelar</VBtn>
                  <VBtn color="success" variant="outlined" size="small" @click="handleSaveMiniform('experience')">Guardar</VBtn>
                </VCol>
              </template>
            </VRow>
            <VRow class="mb-4">
              <VCol cols="12">
                <span class="text-primary font-weight-regular">Habilidades</span>
                <VDivider class="m-0" />
              </VCol>
              <template v-if="!formSkillActive">
                <VCol cols="12" v-for="(items, key) in freelancer?.skills">
                  <div class="border border-opacity-50 border-primary pa-2 pa-4 rounded-lg text-sm position-relative">
                    <div class="position-absolute" style="top: .3em; right: .3em">
                      <VBtn variant="tonal" icon size="small" class="text-primary mr-1"
                        title="Editar"
                        @click="showMiniform('skill', {key, values: items})"
                      >
                       <VIcon size="18" icon="tabler-edit" />
                      </VBtn>
                      <VBtn variant="tonal" icon size="small" class="text-error"
                        title="Eliminar"
                        @click="handleDeleteMiniform('skill', {key, values: items})"
                      >
                       <VIcon size="18" icon="tabler-trash" />
                      </VBtn>
                    </div>
                    <div >
                      <strong class="text-uppercase d-block mb-3">{{ key }}</strong>
                      <ul>
                        <li v-for="item in items" class="text-capitalize pl-4 mb-2" style="line-height: 1">{{ item }}</li>
                      </ul>
                    </div>
                  </div>
                </VCol>
                <VCol cols="12" class="text-end">
                  <VBtn color="primary" variant="outlined" @click="showMiniform('skill')">
                    <span class="pr-3">Agregar</span>
                    <SkillIcon />
                  </VBtn>
                </VCol>
              </template>
              <template v-else>
                <VCol cols="12">
                  <VTextField v-model="formSkill.key" label="Habilidad" />
                </VCol>
                <VCol cols="12">
                  <VTextField v-model="formSkill.values" label="Tecnologías" title="Separar items por comas (,)"/>
                  <small class="text-muted font-italic">Separar items por comas (<strong> , </strong>)</small>
                </VCol>
                <VCol cols="12" class="d-flex gap-2 justify-end">
                  <VBtn color="#F44336" variant="outlined" size="small" @click="formSkillActive = false">Cancelar</VBtn>
                  <VBtn color="success" variant="outlined" size="small" @click="handleSaveMiniform('skill')">Guardar</VBtn>
                </VCol>
              </template>
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


  <VSnackbar v-model="isSnackbarVisibility" location="bottom start" multi-line :timeout="10000">
    El "Email" ya ha sido registrado.
  </VSnackbar>
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
</style>
