<script setup lang="ts">
import { textPlaceholder } from '/@src/texts/blocks/features'

import PlaceholderDemo from '/@src/documentation/base/placeholder/PlaceholderDemo.vue'
</script>

<template>
  <div>
    <HeroSub
      :title="textPlaceholder.title"
      :subtitle="textPlaceholder.subtitle"
    />

    <!--Placeholder demo-->
    <PlaceholderDemo />
  </div>
</template>
