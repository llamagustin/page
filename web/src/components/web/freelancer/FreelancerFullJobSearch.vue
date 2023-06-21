<script setup lang="ts">
import { computed,ref } from 'vue'
import { Categories } from '/@src/texts/fakeProfiles'

interface Emit {
   (e: 'applyFilters', value: object): void
 }

const emit = defineEmits<Emit>()

export interface FullJobSearchProps {
  compact?: boolean
}

const props = withDefaults(defineProps<FullJobSearchProps>(), {
  compact: false,
})

const selectedCategory=ref('')
const selectedSubCategory=ref('')

const formClasses = computed(() => [props.compact && 'is-compact'])

const categories=Categories.map(c=> {
  return {value:  c.category, label: c.category}
})

const subCategories =computed(()=>{
  if(!selectedCategory.value) return []
  
  selectedSubCategory.value=''
  
  let qr= Categories.filter(c => c.category==selectedCategory.value)[0]
  
  return qr.subCategory.map(s=>{
    return {value:s,label:s}
  })
})

const queryString=ref('');

const filters = computed(()=>{
  return{
    q:queryString.value,
    category: selectedCategory.value,
    subCategory: selectedSubCategory.value
  }
})

const applyFilters=()=>{
  emit('applyFilters',filters.value)
}

</script>

<template>
  <form v-on:submit.prevent class="form-container">
    <div class="flex-form is-relative z-1" :class="formClasses">
      <Field grouped>
        <Control icon="feather:search" expanded>
          <VInput :placeholder="$t('jobSearch_placeholder')" v-model="queryString" />
        </Control>
        
        <Control>
          <VSelect   :options="categories" v-model="selectedCategory" />
        </Control>
        <Control v-if="subCategories.length>0">
          <VSelect :options="subCategories" v-model="selectedSubCategory" />
        </Control>
        
        <Control v-if="false">
          <VSelect :options="options" placeholder="All" />
        </Control>
        
        <Control>
          <Button @click="applyFilters" type="submit" color="primary" :long="2" bold raised>{{ $t('jobSearch_btn') }}</Button>
        </Control>
      </Field>
    </div>
  </form>
</template>

<style scoped lang="scss">
.form-container{
  margin-top: 50px;
}
.flex-form {
  max-width: 1040px;
  margin: 0 auto;
  padding: 1rem;
  background: var(--wrap-muted-color);
  border-radius: 1rem;
  transition: box-shadow 0.3s;

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
    :deep(.control) {
      margin-right: 0 !important;
      margin-bottom: 0.75rem !important;
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
  .flex-form {
    :deep(.field) {
      flex-wrap: wrap;
    }

    :deep(.control) {
      //margin-right: 0 !important;
      margin-bottom: 0.75rem !important;

      &:first-child {
        min-width: 100%;
      }

      &:not(:first-child) {
        flex: 1 1 0;
      }
    }

    :deep(.button) {
      width: 100% !important;
      min-width: 100% !important;
    }
  }
}
</style>
