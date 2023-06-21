<script setup lang="ts">
import { computed } from 'vue'

import Button from '/@src/components/web/ai/modal/redirection/Button.vue'


export interface ResourceGridProps {
  posts: ResourceItem[]
  upsideDown?: boolean
  limit?: number
  sideGrid?: boolean
}

const props = withDefaults(defineProps<ResourceGridProps>(), {
  posts: () => [],
  upsideDown: false,
  limit: 20,
  sideGrid: false,
})

const columnClasses = computed(() => [props.sideGrid ? 'is-6' : 'is-4'])
</script>

<template>
  <div class="resource-grid">
    <div class="columns b-columns-half-tablet-p is-multiline">
      <div
        v-for="(post, index) in props.posts.slice(0, props.limit)"
        :key="index"
        class="column"
        :class="columnClasses"
      >
        <Button :post="post" :upside-down="props.upsideDown" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.buttons{
  justify-content: space-between;
}

.resource-grid {
  position: relative;
}
</style>
