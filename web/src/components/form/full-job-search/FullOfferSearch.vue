<script setup lang="ts">
  import {ref,computed} from 'vue'
  
  interface Emit {(e: 'change', value: any): void }

  const emit = defineEmits<Emit>()
  
  export interface OfferFilterProps {
    category?:string
  }
  
  const props = withDefaults(defineProps<OfferFilterProps>(), {
    category: 'All',
  })
  
  const categoryOptions=[{value:'DISEÑO, MEDIOS',label:'DISEÑO, MEDIOS',},{value:'SITIO WEB Y SOFTWARE',label:'SITIO WEB Y SOFTWARE',},{value:'ENTRADA DE DATOS',label:'ENTRADA DE DATOS',},]
  const subCategoryOptions=[{value:'Diseño de logotipos',label:'Diseño de logotipos',},{value:'Inteligencia artificial',label:'Inteligencia artificial',},{value:'Diseño gráfico',label:'Diseño gráfico',},{value:'Desarrollo de juegos',label:'Desarrollo de juegos',},{value:'Diseño de sitios web',label:'Diseño de sitios web',},{value:'Desarrollo web',label:'Desarrollo web',},{value:'Procesamiento de datos',label:'Procesamiento de datos',},{value:'Illustrator',label:'Illustrator',},{value:'Soporte al cliente',label:'Soporte al cliente',},{value:'Microsoft Office',label:'Microsoft Office',},{value:'Oficina general',label:'Oficina general',},{value:'Arquitectura de software',label:'Arquitectura de software',},]
  const skillOptions=[{value:'Databases',label:'Databases',},{value:'Frameworks',label:'Frameworks',},{value:'Programming Languages',label:'Programming Languages',},{value:'Programs',label:'Programs',},{value:'Other Skills',label:'Other Skills',},]

  const categorySelect = ref('All')
  const subCategorySelect = ref('All')
  const skills = ref('All')
  const textFilter = ref('')
  const priceValue = ref(0)
  

  const resetFilters = () => {
    priceValue.value = 0
    categorySelect.value = 'All'
    subCategorySelect.value = 'All'
    skills.value = 'All'
  }
  
  const onChange = () =>{
    const rs= {
      text: textFilter.value,
      category:categorySelect.value,
      subCategory: subCategorySelect.value,
      skills: skills.value,
      price: priceValue.value
      
    }
    
    emit('change',rs)
    
  }
  
</script>

<template>
  <form >
      <div class="flex-form is-relative z-1">
        <Control class="is-6" icon="feather:search" expanded>
          <VInput @keyup="onChange" v-model="textFilter" placeholder="Search items..." />
        </Control>
        <div class="nft-list-filters">
          <div>
            <label class="small-label">Price</label>
            <Control>
              <Slider v-model="priceValue" :min="6" :max="12" :step="1" show-tooltip="drag" />
              <div class="slider-tics">
                <span v-for="index in 8" :key="index"></span>
              </div>
              <div class="slider-labels">
                <span>€ 6</span>
                <span>€ 12</span>
              </div>
            </Control>
          </div>
        </div>
        
      </div>
        <div >
            <div class="columns">
              <div class="column is-3">
                <label class="small-label">Category</label>
                <Control>
                  <VSelect v-model="categorySelect" :options="categoryOptions" placeholder="All" />
                </Control>
              </div>
              <div class="column is-3">
                <label class="small-label">Subcategory</label>
                <Control>
                  <VSelect v-model="subCategorySelect" :options="subCategoryOptions" placeholder="All" />
                </Control>
              </div>
              <div class="column is-3">
                <label class="small-label">Skills</label>
                <Control>
                  <VSelect v-model="skills" :options="skillOptions" placeholder="All" />
                </Control>
              </div>
              <div class="column is-3">
                <Button fullwidth bold @click="resetFilters" class="mt-4">
                  Reset Filters
                </Button>
              </div>
            </div>
        </div>
    </form>
</template>

<style lang="scss" scoped>
.nft-list-filters {
  max-width: 400px;
  min-width: 400px;
  position: sticky;
  top: 50px;
  margin-right: 1.5rem;

  .small-label {
    display: inline-block;
    margin-bottom: 0.5rem;
    font-family: var(--font);
    font-weight: 500;
    font-size: 0.7rem;
    text-transform: uppercase;
    color: var(--medium-text);
  }

  .slider-tics {
    display: flex;

    span {
      position: relative;
      display: block;
      flex: 1 1 0;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 0.5rem;
        width: 1px;
        border-right: 1px solid var(--light-text);
      }

      &:last-child::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        height: 0.5rem;
        width: 1px;
        border-right: 1px solid var(--light-text);
      }
    }
  }

  .slider-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 0.75rem;

    span {
      display: block;
      font-family: var(--font);
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--light-text);
    }
  }
}

.flex-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
  margin: 0 auto 1rem;

  :deep(.control) {
    .form-icon {
      height: 48px;
      width: 48px;

      .iconify {
        font-size: 1.25rem;
      }
    }
  }

  :deep(.input) {
    height: 48px;
    padding-left: 48px;
  }

  :deep(.select) {
    height: 48px;

    select {
      height: 48px;
    }

    &::after {
      top: 58%;
    }
  }

  &.is-compact {
    background: none;
    box-shadow: none;
  }
}

@media only screen and (max-width: 767px) {
  .flex-form {
    flex-direction: column;

    :deep(.control) {
      margin-top: 2rem;
      margin-right: 0 !important;
      margin-bottom: 0.75rem !important;
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
  .flex-form {
    flex-direction: column;

    :deep(.field) {
      flex-wrap: wrap;
    }

    :deep(.control) {
      margin-top: 2rem;
      margin-bottom: 0.75rem !important;
      min-width: 340px;
    }
  }
}
</style>
