<script setup lang="ts">
import { textAvatars } from '/@src/texts/blocks/features'

import AvatarSimpleSizes from '/@src/documentation/base/avatar/AvatarSimpleSizes.vue'
import AvatarSimpleShapes from '/@src/documentation/base/avatar/AvatarSimpleShapes.vue'
import AvatarSimpleBadge from '/@src/documentation/base/avatar/AvatarSimpleBadge.vue'
import AvatarGroupBlock from '/@src/documentation/base/avatar/AvatarGroupBlock.vue'

const demoLinks = [
  {
    label: 'Sizes',
    target: 'avatar-size-demo',
  },
  {
    label: 'Square',
    target: 'avatar-square-demo',
  },
  {
    label: 'Badge',
    target: 'avatar-badge-demo',
  },
  {
    label: 'Group',
    target: 'avatar-group-demo',
  },
]
</script>

<template>
  <div>
    <BlocksHeroSub
      :title="textAvatars.title"
      :subtitle="textAvatars.subtitle"
      :button_0="textAvatars.button_0"
      :button_1="textAvatars.button_1"
    />

    <DemoLinks :links="demoLinks" width="340px" />

    <!--Avatar sizes demo-->
    <AvatarSimpleSizes />

    <!--Avatar squared demo-->
    <AvatarSimpleShapes />

    <!--Avatar badge-->
    <AvatarSimpleBadge />

    <!--Avatar groups-->
    <AvatarGroupBlock />
  </div>
</template>
