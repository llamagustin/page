<script setup lang="ts">
import AppSearchHeaderBg from '@/assets/images/pages/app-search-header-bg.png'

interface Props {
  query
  title?: string
  subtitle?: string
  customClass?: string
}

const props = defineProps<Props>()

defineOptions({
  inheritAttrs: false,
})


const searchQuery = ref('')


interface Emits {
  (e: 'search', val): void;
}

const emit = defineEmits<Emits>()


watch(searchQuery, (val) => {
  emit('search', val)
})



</script>

<template>
  <!-- 👉 Search Banner  -->
  <VCard
    flat
    class="text-center search-header"
    :class="props.customClass"
    :style="`background: url(${AppSearchHeaderBg});`"
  >
    <VCardText>
      <h5 class="text-h5 font-weight-semibold">
        {{ props.title }}
      </h5>

      <!-- 👉 Search Input -->
      <VTextField
        v-model="searchQuery"
        placeholder="Qué estás buscando..."
        class="search-header-input mx-auto my-3"
        density="comfortable"
      >
        <template #prepend-inner>
          <VIcon
            icon="tabler-search"
            size="23"
          />
        </template>
      </VTextField>

      <p class="mb-0">
        {{ props.subtitle }}
      </p>
    </VCardText>
  </VCard>
</template>

<style lang="scss">
.search-header {
  padding: 4rem !important;
  background-size: cover !important;
}

// search input
.search-header-input {
  background-color: rgb(var(--v-theme-surface));
  border-radius: 0.375rem !important;
  max-inline-size: 40.125rem !important;

  .v-field__prepend-inner {
    i {
      inset-block-start: 3px !important;
    }
  }
}

@media (max-width: 37.5rem) {
  .search-header {
    padding: 1.5rem !important;
  }
}
</style>
