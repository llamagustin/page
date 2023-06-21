<script setup lang="ts">
  import AppDateTimePicker from '@core/components/AppDateTimePicker.vue'
  import AdSearchByZip from "./AdSearchByZip.vue";

  // import the component
  import TreeSelect from 'vue3-treeselect'
  import VSelect from "vue-select";
  // import the styles
  import 'vue3-treeselect/dist/vue3-treeselect.css'
  import "vue-select/dist/vue-select.css";
  
  import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
  import { VForm } from 'vuetify/components'
  import { emailValidator, requiredValidator } from '@validators'
  import { avatarText } from '@core/utils/formatters'

  import { useAdListStore } from '@/views/apps/ad/useAdListStore'
  import { useUbigeo } from "@/shared/composables/useUbigeo"
  
  interface Emit {
    (e: 'update:isDrawerOpen', value: boolean): void;
    (e: 'adData', value): void;
    (e: 'deleteAd', value): void;
    (e: 'handleSubmit', value): void;
  }

  interface Props {
    ad: object;
    isDrawerOpen: boolean;
    isEdit: boolean;
  }
  
  const props = defineProps<Props>()
  const emit = defineEmits<Emit>()
  const refForm = ref<VForm>()

  const isSnackbarVisibility = ref(false)
  // 👉 address
  
  const { ubigeo, getCities, getCodes } = useUbigeo()

  const ubi = ref(ubigeo)

  const address = ref({
    country: 'España',
    province: '',
    city: '',
    zip: '',
    line: ''
  })

  function setAddress() {
    let data = props.ad;
    if(data?.id) return { ...data?.address, country: data?.address?.country || 'España' };
    return {
      country: 'España',
      province: '',
      city: '',
      zip: '',
      line: ''
    };
  }
  watch(() => props.ad, (data) => {
    address.value = setAddress()
    dateRange.value = new Date()
    nextTick(() => refForm.value?.resetValidation())
    // if(!data.province){
    //   address.value.city = ''
    //   address.value.zip = ''
    //   address.value.line = ''
    // }
  })

  const statusInfo = ref(false)

  const onInfo = (e) => props.ad.constitutionAt = statusInfo.value ? new Date() : null;

  const selectProvince = async (data) => {
    getCities(data.value)

    props.ad.address.province = data.title
    props.ad.address.city = ''
    props.ad.address.zip = ''
    props.ad.address.line = ''

    address.value.city = ''
    address.value.zip = ''
    address.value.line = ''
  }

  const selectCity = async (data) => {
    getCodes(data.value)

    props.ad.address.city = data.title
    props.ad.address.zip = ''
    props.ad.address.line = ''

    address.value.zip = ''
    address.value.line = ''
  }

  const selectCode = async (data) => {
    props.ad.address.zip = data.codigo_postal;
    address.value.line = '';
  }

  watch(address, (data) => {
    if (!data.province) {
      address.value.city = ''
      address.value.zip = ''
      address.value.line = ''
    }
  })

  watch(() => props.ad.address, async (newAddress) => {
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
      // 👉 TODO Realizar un fetch de leads zip
      if (props.ad.id) {
        adListStore.fetchLeadsZips(props.ad.id).then(res => {
          zips_leads.value = res
        })
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
  const adListStore = useAdListStore()

  const onSubmit = async () => {
    var v = await refForm.value?.validate()
    if(!v.valid) return;
    if (typeof props.ad.address.zip == 'string') {
      props.ad.address.zip = [props.ad.address.zip]
    } else {
      props.ad.address.zip = props.ad.address.zip
    }
    
    emit('handleSubmit', {
      ...props.ad,
      address: {
        ...props.ad.address,
        ...address.value
      }
    })
    
    // emit('handleSubmit', {
    //   id: props.ad?.id ?? null,
    //   name: {
    //     name: props.ad.name?.name,
    //     firstSurname: props.ad.name?.firstSurname,
    //   },
    //   avatar: props.ad.avatar,
    //   email: props.ad.email,
    //   role: "reseller",
    //   phone: props.ad.phone,
    //   address: props.ad.address,
    //   zone: props.ad.zone,
    //   category: props.ad.category,
    //   status: props.ad.status ?? 300,
    //   password: '1234',
      
    //   rating: props.ad?.rating || 5,
    //   steps: props.ad?.steps || [],
    //   note: props.ad?.note || '',
    //   constitutionAt: props.ad?.constitutionAt || null
    // })
    
    emit('update:isDrawerOpen', false)
    
    nextTick(() => {
      refForm.value?.reset()
      refForm.value?.resetValidation()
    })
  }

  const onDelete = () => {
    emit('deleteAd', props.ad.id)

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

  const showPostal = ref(false)

  const colorStatus = { '200': 'success', '300': 'warning', '400': 'error' }

  const dateRange = ref('')

  const optionStatus = [{
      title: 'Active',
      value: 200
    },
    {
      title: 'Pending',
      value: 300
    },
    {
      title: 'Inactive',
      value: 400
    },
  ]

  const itemsNote = ref(['Filtro #1', 'Filtro #2', 'Filtro #3'])

  const itemsTools = ref([
    'Gestión de procesos',
    'Marketplace',
    'Business Intelligence y Analítica',
    'Factura electrónica',
    'Comercio electrónico',
    'Gestión de redes sociales',
    'Sitio Web y Presencia básica en Internet',
    'Servicios y herramientas de Oficina Virtual',
    'Comunicaciones seguras',
    'Ciberseguridad'
  ])
  
  const refInputEl = ref<HTMLElement>();
  
  const changeAvatar = (file: Event) => {
    const fileReader = new FileReader();
    const { files } = file.target as HTMLInputElement;

    if (files && files.length) {
      fileReader.readAsDataURL(files[0])
      fileReader.onload = () => {
        if (typeof fileReader.result === 'string') {
          props.ad.avatar = fileReader.result
        }
      }
    }
  }

  const zips_leads = ref([])

  const deleteZip = async (zip) => {
    // zips_leads.value = zips_leads.value.filter(x => x.value !== zip);
    var index = zips_leads.value.findIndex(x => x.value == zip)
    zips_leads.value[index].deleted = true

    // console.log('res', index, zips_leads.value, zip)
    // var res = await axiosIns.post('/ad/' + props.ad.id + '/leads/zip/delete', {
    //   zip: zip
    // })

    // console.log('rrr', res)
  }
  
  const selectedMenu = ref('ad')

  const itemsMenu = [
    {
      title: 'Usuario',
      value: 'ad'
    },
    {
      title: 'Subastas',
      value: 'auction'
    }
  ];
  
  // 👉 FIELD ENTITY
  function addBusinessHandleClick(indexParent) {
    let value = {
      name: '',
      path: '',
      isActive: true,
    }
    props.ad.entity[indexParent]?.business.push(value);
  }
  
  function addEntityHandleClick() {
    let value = {
      name: '',
      path: '',
      isActive: true,
      charge: {
        active: 0,
        business: 0,
        inactive: 0
      },
      business: []
    }
    
    props.ad.entity.push(value);
  }
  
  function removeBusiness(index, indexParent) {
    console.log({ index, indexParent })
    props.ad.entity[indexParent]?.business.splice(index, 1);
  }
</script>

<template>
  <VNavigationDrawer 
    temporary
    :width="400"
    location="end"
    class="scrollable-content"
    @update:model-value="handleDrawerModelValueUpdate"
    :model-value="props.isDrawerOpen"
  >
    <!-- 👉 Title -->
    <div class="d-flex align-center pa-6 pb-1">
      <h6 class="text-h6">
        {{ isEdit ? 'Editar' : 'Nuevo' }}
      </h6>
      <VSpacer />
      <!--ad {{address}}-->
      <VBtn @click="onSubmit" size="32" class="me-2">
        <VIcon size="18" icon="tabler-edit" />
      </VBtn>

      <VMenu open-on-hover size="small">
        <template #activator="{ props }">
          <VBtn variant="tonal" color="" size="32" v-bind="props" class="rounded me-3">
            <VIcon size="18" icon="tabler-menu" />
          </VBtn>
        </template>
        <VList class="cursor-pointer">
          <template v-for="(item, index) in itemsMenu">
            <VListItem @click="selectedMenu = item.value">
              <VListItemTitle>{{ item.title }}</VListItemTitle>
            </VListItem>
          </template>
        </VList>
      </VMenu>

      <!-- 👉 Close btn -->
      <VBtn variant="tonal" color="default" icon size="32" class="rounded" @click="closeNavigationDrawer">
        <VIcon size="18" icon="tabler-x" />
      </VBTn>
    </div>

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <template v-if="selectedMenu == 'ad'">
        <VCard flat>
          <VCardText>
             <!--👉 Form -->
            <VForm ref="refForm" @submit.prevent="onSubmit">
              <VRow>
                 <!--👉 Source -->
                <VCol cols="12">
                  <VRow>
                     <!--👉 Source -->
                    <VCol cols="12" class="py-0">
                      <VRating v-model="ad.rating" clearable class="py-0 me-10" />
                    </VCol>
                    <!-- 👉 Enviar propuesta si el estatus es 200 -->
                    <VDivider v-show="ad.status == 200" />
                    <VCol cols="12" v-show="ad.status == 200">
                      <VCheckbox v-model="statusInfo" @change="onInfo">
                        <template #label>
                          <div>
                            Email
                            <VTooltip location="bottom">
                              <template #activator="{ props }">
                                <a href="https://api.aythen.com/static/src/assets/email/reseller/mail-step-1.html" target="_blank" rel="noopener noreferrer" v-bind="props" @click.stop>
                                  enviado
                                </a>
                              </template>
                              Guia Reseller
                            </VTooltip>
                            a {{ props?.ad?.company || '-' }}
                          </div>
                        </template>
                      </VCheckbox>
                    </VCol>

                    <VDivider class="mt-2 mb-4" />
                    <VCol cols="12">
                      <VCombobox v-model="ad.tools" :items="itemsTools" label="Servicios" multiple chips block />
                    </VCol>
                    <!--
                    <VDivider class="mt-2 mb-4" />
                    <VCol cols="6">
                      <VCombobox v-model="ad.steps" :items="itemsNote" label="Notas rápidas" multiple chips />
                    </VCol>
                    -->
                    <VCol cols="12">
                      <VSelect 
                        label="Estado"
                        :options="optionStatus"
                        class="vs__select_scoped"
                        :getOptionLabel="(item) => item.title"
                        :reduce="(item) => item.value"
                        placeholder="Estado"
                        v-model="ad.status" maxHeight="200px"
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
                  </VRow>
                </VCol>

                <!--<VDivider class="mt-2 mb-4" />-->
                <VCol cols="12" class="pb-0">
                  <span class="text-primary font-weight-regular">Información empresa</span>
                  <VDivider class="mb-0 mt-0" />
                </VCol>
                
                <!--👉 Name -->
                <VCol cols="12">
                  <VTextField v-model="ad.name.name" label="Nombres" />
                </VCol>
                <!--👉 First surname -->
                <VCol cols="12" md="6">
                  <VTextField v-model="ad.name.firstSurname" label="Primer ape." />
                </VCol>
                <!--👉 Second surname -->
                <VCol cols="12" md="6">
                  <VTextField v-model="ad.name.secondSurname" label="Segundo ape." />
                </VCol>
                <!--👉 Company -->
                <VCol cols="12">
                  <VTextField v-model="ad.company" label="Company" :rules="[requiredValidator]" />
                </VCol>
                <!--👉 Path -->
                <VCol cols="12">
                  <VTextField v-model="ad.path" label="Path" :rules="[requiredValidator]" />
                </VCol>
                <!--👉 CIF -->
                <VCol cols="12" md="6">
                  <VTextField v-model="ad.cif" label="CIF" />
                </VCol>
                <!--👉 BUDGET -->
                <VCol cols="12" md="6">
                  <VTextField v-model="ad.budget" label="Budget" />
                </VCol>
                <!--<VDivider class="mt-2 mb-4" />-->
                <VCol cols="12" class="pb-0">
                  <span class="text-primary font-weight-regular">Información contacto</span>
                  <VDivider class="mb-0 mt-0" />
                </VCol>
                <!--👉 Full name -->
                <!--
                <VCol cols="12">
                  <VTextField v-model="ad.fullname" label="Full Name" />
                </VCol>
                -->
                <!--👉 Web -->
                <VCol cols="12">
                  <VTextField v-model="ad.web" label="Web" />
                </VCol>
                 <!--👉 Email -->
                <VCol cols="6">
                  <VTextField v-model="ad.email" :rules="[requiredValidator, emailValidator]" label="Email" />
                </VCol>
                <VCol cols="6">
                  <!--v-bind="ad.props"-->
                  <VTextField v-model="ad.phone" :rules="[requiredValidator]" label="Phone" />
                </VCol>
                <!--👉 Call -->
                <!--
                <VCol cols="12">
                  <AppDateTimePicker v-model="dateRange" label="LLamar" />
                </VCol>
                -->
                <VCol cols="12" class="pb-0">
                  <span class="text-primary font-weight-regular">Información de ubigeo</span>
                  <VDivider class="mb-0 mt-0" />
                </VCol>
                <!--👉 Country -->
                <VCol cols="12" sm="12" md="4">
                  <VTextField v-model="address.country" label="País" readonly />
                </VCol>
                <!--👉 Provincia -->
                <VCol cols="12" sm="12" md="8">
                  <VSelect label="Provincia"
                    :options="ubi.provinces"
                    class="vs__select_scoped"
                    :getOptionLabel="(item) => item.title"
                    :reduce="(item) => item.title"
                    v-model="address.province"
                    placeholder="Provincia"
                    maxHeight="200px"
                    @option:selected="selectProvince"
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
                <!--👉 Ciudad -->
                <VCol cols="12" sm="12" md="12" v-if="address.province">
                  <VSelect id="city"
                    label="Ciudad"
                    :options="ubi.cities"
                    class="vs__select_scoped"
                    :getOptionLabel="(item) => item.title"
                    :reduce="(item) => item.title"
                    v-model="address.city"
                    maxHeight="200px"
                    placeholder="Ciudad"
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
                 <!--👉 Zip -->
                <VCol cols="12" sm="12" md="12" v-if="address.city">
                  <VSelect id="postal-code"
                    label="Zip"
                    :options="ubi.codes"
                    class="vs__select_scoped"
                    :getOptionLabel="(item) => item.codigo_postal"
                    :reduce="(item) => item.codigo_postal"
                    v-model="address.zip"
                    maxHeight="200px"
                    placeholder="Zip"
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
                <!--👉 Line -->
                <VCol cols="12" v-if="address.zip">
                  <VTextField v-model="address.line" label="Dirección" />
                </VCol>
                
                <VCol cols="12" class="pb-0">
                  <span class="text-primary font-weight-regular">Entidades</span>
                  <VDivider class="mb-0 mt-0" />
                </VCol>
                
                <VCol cols="12">
                  <VExpansionPanels>
                    <VExpansionPanel
                      v-for="(item, index) in ad.entity"
                      :key="index"
                      variant="inset"
                    >
                      <VExpansionPanelTitle>
                        <div class="text-sm text-capitalize">{{ item.name?.toLowerCase() }}</div>
                      </VExpansionPanelTitle>
                      <VExpansionPanelText>
                        <VContainer fluid>
                          <VRow>
                            <VCol cols="12 px-0">
                              <VTextField v-model="item.name" label="Enterprise" class="mb-3" />
                              <VTextField v-model="item.path" label="Path" class="mb-0" />
                            </VCol>
                            <VCol cols="12 px-0 position-relative">
                              <span class="position-absolute text-primary text-sm" style="top: 0">Negocios</span>
                              <VDivider inset color="primary" class="my-0"/>
                            </VCol>
                            <VCol cols="12 px-0" v-for="(_item, _index) in item.business">
                              <div class="pa-2 border rounded border-primary cursor-pointer" @dblclick="removeBusiness(_index, index)">
                                <em class="text-caption text-secondary d-block text-center mb-2 text-delete">Haz doble click para eliminar</em>
                                <VTextField v-model="_item.name" label="Negocio" class="mb-3" />
                                <VTextField v-model="_item.path" label="Path" class="mb-3" />
                              </div>
                            </VCol>
                            <VCol cols="12 px-0">
                              <VBtn color="primary" class="text-caption" block @click="addBusinessHandleClick(index)">AGREGAR NEGOCIO</VBtn>
                            </VCol>
                          </VRow>
                        </VContainer>
                      </VExpansionPanelText>
                    </VExpansionPanel>
                  </VExpansionPanels>
                </VCol>
                <VCol cols="12">
                  <VBtn color="info" class="text-caption" block @click="addEntityHandleClick">AGREGAR EMPRESA</VBtn>
                </VCol>
                <VCol cols="12" class="pb-0">
                  <span class="text-primary font-weight-regular">Adicional</span>
                  <VDivider class="mb-0 mt-0" />
                </VCol>
                <VCol cols="12">
                  <VTextarea v-model="ad.note" label="Nota Reseller" auto-grow />
                </VCol>
                <VCol cols="12">
                  <VBtn color="success" block @click="onSubmit">GUARDAR</VBtn>
                </VCol>
              </VRow>
            </VForm>

          </VCardText>
        </VCard>
      </template>
      <template v-if="selectedMenu == 'auction'">
        <!--Subastas-->
        <VRow>
          <VCard v-for="(zip, key) in zips_leads" :key="key">
            <div v-if="!zip?.deleted">
              <AdSearchByZip @delete-zip="deleteZip" :zip="zip" />
            </div>
          </VCard>
        </VRow>
      </template>
    </PerfectScrollbar>
  </VNavigationDrawer>


  <VSnackbar v-model="isSnackbarVisibility" location="bottom start" multi-line :timeout="10000">
    El "Email" ya ha sido registrado.
  </VSnackbar>
</template>

<style lang="scss">
  .text-delete {
    user-select: none;
    pointer-events: none;
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
