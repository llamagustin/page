<script setup lang="ts">
import { textFeatures } from '/@src/texts/blocks'

import AdvancedFeatureBlockADoc from '/@src/documentation/advanced/features/AdvancedFeatureBlockADoc.vue'
import AdvancedFeatureBlockBDoc from '/@src/documentation/advanced/features/AdvancedFeatureBlockBDoc.vue'
import AdvancedFeatureBlockCDoc from '/@src/documentation/advanced/features/AdvancedFeatureBlockCDoc.vue'
import AdvancedFeatureBlockDDoc from '/@src/documentation/advanced/features/AdvancedFeatureBlockDDoc.vue'
import AdvancedFeatureBlockEDoc from '/@src/documentation/advanced/features/AdvancedFeatureBlockEDoc.vue'
import AdvancedFeatureBlockFDoc from '/@src/documentation/advanced/features/AdvancedFeatureBlockFDoc.vue'

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
  {
    label: 'Block E',
    target: 'block-e-demo',
  },
  {
    label: 'Block F',
    target: 'block-f-demo',
  },
]
</script>

<template>
  <div>
    <HeroSub :title="textFeatures.title" :subtitle="textFeatures.subtitle" />

    <DemoLinks :links="demoLinks" width="580px" />

    <!--Feature block A demo-->
    <AdvancedFeatureBlockADoc />

    <!--Feature block B demo-->
    <AdvancedFeatureBlockBDoc />

    <!--Feature block C demo-->
    <AdvancedFeatureBlockCDoc />

    <!--Feature block D demo-->
    <AdvancedFeatureBlockDDoc />

    <!--Feature block E demo-->
    <AdvancedFeatureBlockEDoc />

    <!--Feature block F demo-->
    <AdvancedFeatureBlockFDoc />
  </div>
</template>
