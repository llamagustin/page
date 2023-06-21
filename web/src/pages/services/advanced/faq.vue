<script setup lang="ts">
import { textFaq } from '/@src/texts/blocks'

import AdvancedFaqBlockA from '/@src/documentation/advanced/faq/AdvancedFaqBlockA.vue'
import AdvancedFaqBlockB from '/@src/documentation/advanced/faq/AdvancedFaqBlockB.vue'
import AdvancedFaqBlockC from '/@src/documentation/advanced/faq/AdvancedFaqBlockC.vue'
import AdvancedFaqBlockD from '/@src/documentation/advanced/faq/AdvancedFaqBlockD.vue'

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
    <HeroSub :title="textFaq.title" :subtitle="textFaq.subtitle" />

    <DemoLinks :links="demoLinks" width="420px" />

    <!--FAQ block A demo-->
    <AdvancedFaqBlockA />

    <!--FAQ block B demo-->
    <AdvancedFaqBlockB />

    <!--FAQ block C demo-->
    <AdvancedFaqBlockC />

    <!--FAQ block D demo-->
    <AdvancedFaqBlockD />
  </div>
</template>
