<script setup lang="ts">
import { textContact } from '/@src/texts/blocks'

import AdvancedContactBlockADoc from '/@src/documentation/advanced/contact/AdvancedContactBlockADoc.vue'
import AdvancedContactBlockBDoc from '/@src/documentation/advanced/contact/AdvancedContactBlockBDoc.vue'
import AdvancedContactBlockCDoc from '/@src/documentation/advanced/contact/AdvancedContactBlockCDoc.vue'
import AdvancedContactBlockDDoc from '/@src/documentation/advanced/contact/AdvancedContactBlockDDoc.vue'

const demoLinks = [
  {
    label: 'Block A',
    target: 'block-a-demo',
  },
  {
    label: 'Block B',
    target: 'block-b-demo',
  },
  {
    label: 'Block C',
    target: 'block-c-demo',
  },
  {
    label: 'Block D',
    target: 'block-d-demo',
  },
]
</script>

<template>
  <div>
    <HeroSub :title="textContact.title" :subtitle="textContact.subtitle" />

    <DemoLinks :links="demoLinks" width="400px" />

    <!--Contact block A demo-->
    <AdvancedContactBlockADoc />

    <!--Contact block B demo-->
    <AdvancedContactBlockBDoc />

    <!--Contact block C demo-->
    <AdvancedContactBlockCDoc />

    <!--Contact block D demo-->
    <AdvancedContactBlockDDoc />
  </div>
</template>
