<script setup lang="ts">
import { textImages } from '/@src/texts/blocks/features'

import DarkImageBase from '/@src/documentation/base/image/DarkImageBase.vue'
import ImageRatioBase from '/@src/documentation/base/image/ImageRatioBase.vue'
import ImageRatioRounded from '/@src/documentation/base/image/ImageRatioRounded.vue'
import ImageRatioSquare from '/@src/documentation/base/image/ImageRatioSquare.vue'

const demoLinks = [
  {
    label: 'Dark',
    target: 'image-dark-demo',
  },
  {
    label: 'Ratio',
    target: 'image-ratio-demo',
  },
  {
    label: 'Rounded',
    target: 'image-rounded-demo',
  },
  {
    label: 'Square',
    target: 'image-square-demo',
  },
]
</script>

<template>
  <div>
    <HeroSub :title="textImages.title" :subtitle="textImages.subtitle" />

    <DemoLinks :links="demoLinks" width="360px" />

    <!--Dark image demo-->
    <DarkImageBase />

    <!--Image ratio demo-->
    <ImageRatioBase />

    <!--Image ratio rounded demo-->
    <ImageRatioRounded />

    <!--Image ratio square demo-->
    <ImageRatioSquare />
  </div>
</template>
