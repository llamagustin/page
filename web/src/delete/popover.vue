<script setup lang="ts">
import { textPopover } from '/@src/texts/blocks/features'

import PopoverBase from '/@src/documentation/base/popover/PopoverBase.vue'
import PopoverTrigger from '/@src/documentation/base/popover/PopoverTrigger.vue'
import PopoverColors from '/@src/documentation/base/popover/PopoverColors.vue'
import PopoverCustomIcons from '/@src/documentation/base/popover/PopoverCustomIcons.vue'
import PopoverCustomAvatars from '/@src/documentation/base/popover/PopoverCustomAvatars.vue'

const demoLinks = [
  {
    label: 'Placement',
    target: 'popover-placement-demo',
  },
  {
    label: 'Trigger',
    target: 'popover-trigger-demo',
  },
  {
    label: 'Colors',
    target: 'popover-colors-demo',
  },
  {
    label: 'Icons',
    target: 'custom-icons-demo',
  },
  {
    label: 'Avatars',
    target: 'custom-avatars-demo',
  },
]
</script>

<template>
  <div>
    <HeroSub :title="textPopover.title" :subtitle="textPopover.subtitle" />

    <DemoLinks :links="demoLinks" width="500px" />

    <!--Popover base demo-->
    <PopoverBase />

    <!--Popover trigger demo-->
    <PopoverTrigger />

    <!--Popover colors demo-->
    <PopoverColors />

    <!--Popover icons demo-->
    <PopoverCustomIcons />

    <!--Popover avatars demo-->
    <PopoverCustomAvatars />
  </div>
</template>
