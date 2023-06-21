<script setup lang="ts">
export interface QuickFeaturesProps {
  features?: string[]
  inverted?: boolean
}

const props = withDefaults(defineProps<QuickFeaturesProps>(), {
  features: () => [],
  inverted: false,
})
</script>

<template>
  <div class="columns field is-grouped mx-auto max-w-5 -m-2 mb-5">
    <div class="column is-6">
        <div
          v-for="(feature, index) in props.features.slice(0, props.features.length/2)"
          :key="index"
          class="control"
          :class="props.inverted && 'is-inverted'"
        >
          <i class="iconify" data-icon="feather:check"></i>
          <span class="is-weight-500 pl-2 pr-4">{{ feature }}</span>
        </div>
    </div>
    <div class="column is-6">
        <div
          v-for="(feature, index) in props.features.slice(props.features.length/2)"
          :key="index"
          class="control"
          :class="props.inverted && 'is-inverted'"
        >
          <i class="iconify" data-icon="feather:check"></i>
          <span class="is-weight-500 pl-2 pr-4">{{ feature }}</span>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.control {
  .iconify,
  span {
    color: var(--quick-features-color);
    vertical-align: middle;
  }

  &.is-inverted {
    .iconify,
    span {
      color: var(--white-smoke);
    }
  }
}
</style>
