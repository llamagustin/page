<script setup lang="ts">
import { textIcons } from '/@src/texts/blocks/features'

import IconBoxSize from '/@src/documentation/base/icon/IconBoxSize.vue'
import IconBoxRounded from '/@src/documentation/base/icon/IconBoxRounded.vue'
import IconBoxColors from '/@src/documentation/base/icon/IconBoxColors.vue'
import IconBoxBorder from '/@src/documentation/base/icon/IconBoxBorder.vue'

const demoLinks = [
  {
    label: 'Size',
    target: 'iconbox-size-demo',
  },
  {
    label: 'Rounded',
    target: 'iconbox-rounded-demo',
  },
  {
    label: 'Colors',
    target: 'iconbox-colors-demo',
  },
  {
    label: 'Border',
    target: 'iconbox-border-demo',
  },
]
</script>

<template>
  <div>
    <HeroSub :title="textIcons.title" :subtitle="textIcons.subtitle" />

    <DemoLinks :links="demoLinks" width="360px" />

    <!--Iconbox sizes demo-->
    <IconBoxSize />

    <!--Iconbox rounded demo-->
    <IconBoxRounded />

    <!--Iconbox colors demo-->
    <IconBoxColors />

    <!--Iconbox border demo-->
    <IconBoxBorder />
  </div>
</template>
