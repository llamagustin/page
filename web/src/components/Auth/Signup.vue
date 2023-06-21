<route lang="yaml">
  meta:
  layout: auth
</route>

<script setup lang="ts">
  import { ServicesMegamenu } from '/@src/texts/dashboard';
  import { ref, computed, watch } from 'vue';
  import axios from 'axios';
  import { cloneDeep } from 'lodash';
  import provinces from '/@src/data/fake/provinces.json'
  import cities from '/@src/data/fake/cities.json'
  import zips from '/@src/data/fake/zips.json'

  const initialState = {
    title: "",
    description: "",
    phone: "",
    category: [],
    status: 400,
    address: {
      country: "España",
      province: "",
      city: "",
      zip: "",
      line: "",
    }
  }

  const categories = ref('');
  const business = ref(JSON.parse(JSON.stringify(initialState)));


  // 👉 UBIGEO
  const selectedProvince = ref(null);
  const selectedCity = ref(null);
  const selectedZip = ref(null);

  const citiesFiltered = computed(() => {
    selectedCity.value = null;
    business.value.address.city = null
    business.value.address.zip = null

    let province = provinces.find(c => c.value == business.value.address.province);
    selectedProvince.value = province;
    if (!province) return [];
    const newCities = cities.filter((c) => String(c.value).startsWith(province.value));
    return newCities;
  })

  const zipsFiltered = computed(() => {
    selectedZip.value = null;
    business.value.address.zip = null
    let city = cities.find(c => c.value == business.value.address.city);
    selectedCity.value = city;
    if (!city) return [];
    const newZips = zips.filter(c => String(c.value) == city.value);
    return newZips;
  })

  watch(() => business.value.address.zip, (newZip) => {
    if (!newZip) return selectedZip.value = null;
    selectedZip.value = zips.find(c => c.value == newZip);
  })

  const sendingForm = ref(false);

  let errors = ref({});

  function setErrorList(property) {
    errors.value[property] = {
      validation: true,
      'is-invalid': true
    }
  }
  
  function isValidForm() {
    let countErrors = 0;
    const data = business.value;
    let valueBoolean = true;
    if (!String(data.address.province || '').trim().length){
      setErrorList('province');
      countErrors++;
    }
    if (!String(data.address.city || '').trim().length){
      setErrorList('city');
      countErrors++;
    }
    if (!String(data.address.zip || '').trim().length){
      setErrorList('zip');
      countErrors++;
    }
    if (!String(data.address.line || '').trim().length){
      setErrorList('line');
      countErrors++;
    }
    if (!categories.value.split(',').map(c => c.toLowerCase()).filter(c => c.trim() && c.trim().length && /\w/.test(c)).length){
      setErrorList('categories');
      countErrors++;
    }
    if (!String(data.title).trim().length){
      setErrorList('title');
      countErrors++;
    }
    if (!String(data.description).trim().length){
      setErrorList('description');
      countErrors++;
    }
    if (!String(data.phone).trim().length){
      setErrorList('phone');
      countErrors++;
    }
    
    return countErrors == 0;
  }

  function hideErrorList(property) {
    let cloneErrors = cloneDeep({ ...errors.value });
    if (!Object(cloneErrors).hasOwnProperty(property)) return;
    errors.value[property] = {
      validation: false,
      'is-invalid': false
    }
  }
  
  // 👉 FORM SUBMIT
  async function handlSubmit() {
    console.log('Validate')
    if (!isValidForm()) return;
    console.log('Passed Validation')
    sendingForm.value = true;
    try {
      let newCategories = categories.value.split(',').map(c => c.toLowerCase()).filter(c => c.trim() && c.trim().length);
      const payload = {
        ...business.value,
        category: Array.from(new Set(newCategories)),
        address: {
          ...business.value.address,
          province: selectedProvince.value?.label,
          city: selectedCity.value?.label,
          zip: selectedZip.value?.label,
        }
      }

      let data = await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('Great job!')
        }, 3000)
      })
      console.log({ data })
      // const data = await axios.post('https://test-api.aythen.com/business', payload);
    }
    finally {
      sendingForm.value = false;
    }
  }
</script>

<template>
  <div>
    <div class="container">
      <form class="columns is-multiline m-0 w-full" autocomplete="off" @submit.prevent="handlSubmit">
        <div class="column is-12 mb-3">
          <Subtitle tag="p" :size="6" weight="thin">
            Complete el formulario con sus datos, para registrarlo y darle acceso a nuestra plataforma
          </Subtitle>
        </div>
        <div class="column is-4">
          <Field>
            <FieldLabel label="Provincia" />
            <Control v-bind:="errors.province">
              <VSelect v-model="business.address.province" :options="provinces" @change="hideErrorList('province')" />
            </Control>
          </Field>
        </div>
        <div class="column is-4">
          <Field>
            <FieldLabel label="Ciudad" />
            <Control v-bind:="errors.city">
              <VSelect v-model="business.address.city" :options="citiesFiltered" @change="hideErrorList('city')" />
            </Control>
          </Field>
        </div>
        <div class="column is-4">
          <Field>
            <FieldLabel label="Zip" />
            <Control v-bind:="errors.zip">
              <VSelect v-model="business.address.zip" :options="zipsFiltered" @change="hideErrorList('zip')" />
            </Control>
          </Field>
        </div>
        <div class="column is-8">
          <Field>
            <FieldLabel label="Dirección completa" />
            <Control v-bind:="errors.line">
              <VInput v-model="business.address.line" @input="hideErrorList('line')" />
            </Control>
          </Field>
        </div>
        <div class="column is-4">
          <Field>
            <FieldLabel label="Teléfono" />
            <Control v-bind:="errors.phone">
              <VInput type="tel" v-model="business.phone" @input="hideErrorList('phone')" />
            </Control>
          </Field>
        </div>
        <div class="column is-12">
          <Field>
            <FieldLabel label="Categoria(s)" />
            <Control v-bind:="errors.categories">
              <VInput v-model="categories" @input="hideErrorList('categories')" />
            </Control>
            <small class="is-7 subtitle"><em>Separa los items por comas (<strong class="text-primary"> , </strong>)</em></small>
          </Field>
        </div>
        <div class="column is-12">
          <Field>
            <FieldLabel label="Título" />
            <Control v-bind:="errors.title">
              <VInput v-model="business.title" @input="hideErrorList('title')" />
            </Control>
          </Field>
        </div>
        <div class="column is-12">
          <Field>
            <FieldLabel label="Descripción" />
            <Control v-bind:="errors.description">
              <VTextarea v-model="business.description" :rows="4" @input="hideErrorList('description')" />
            </Control>
          </Field>
        </div>
        <div class="column is-12 pt-4">
          <Button color="primary" type="submit" :loading="sendingForm" :disabled="sendingForm">Registrarme</Button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  form {
    >* {
      padding-block: .2em;
    }
  }
  
  .title,
  .subtitle,
  .hero {
    color: var(--medium-text);
  }
</style>
