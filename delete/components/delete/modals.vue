<script setup lang="ts">
import { textModals } from '/@src/texts/blocks/features'

import ModalBase from '/@src/documentation/base/modal/ModalBase.vue'
import ModalSmall from '/@src/documentation/base/modal/ModalSmall.vue'
import ModalMedium from '/@src/documentation/base/modal/ModalMedium.vue'
import ModalLarge from '/@src/documentation/base/modal/ModalLarge.vue'
import ModalBig from '/@src/documentation/base/modal/ModalBig.vue'

const demoLinks = [
  {
    label: 'Modal',
    target: 'modal-base-demo',
  },
  {
    label: 'Small',
    target: 'modal-small-demo',
  },
  {
    label: 'Medium',
    target: 'modal-medium-demo',
  },
  {
    label: 'Large',
    target: 'modal-large-demo',
  },
  {
    label: 'Big',
    target: 'modal-big-demo',
  },
]
</script>

<template>
  <div>
    <HeroSub :title="textModals.title" :subtitle="textModals.subtitle" />

    <DemoLinks :links="demoLinks" width="400px" />

    <!--Modal base demo-->
    <ModalBase />

    <!--Modal small demo-->
    <ModalSmall />

    <!--Modal medium demo-->
    <ModalMedium />

    <!--Modal large demo-->
    <ModalLarge />

    <!--Modal big demo-->
    <ModalBig />
  </div>
</template>
