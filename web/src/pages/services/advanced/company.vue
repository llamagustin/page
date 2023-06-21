<script setup lang="ts">
import { textCompany } from '/@src/texts/blocks'

import AdvancedCompanyBlockADoc from '/@src/documentation/advanced/company/AdvancedCompanyBlockADoc.vue'
import AdvancedCompanyBlockBDoc from '/@src/documentation/advanced/company/AdvancedCompanyBlockBDoc.vue'
import AdvancedCompanyBlockDDoc from '/@src/documentation/advanced/company/AdvancedCompanyBlockDDoc.vue'
import AdvancedCompanyBlockCDoc from '/@src/documentation/advanced/company/AdvancedCompanyBlockCDoc.vue'

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
    <HeroSub :title="textCompany.title" :subtitle="textCompany.subtitle" />

    <DemoLinks :links="demoLinks" width="400px" />

    <!--Company block A demo-->
    <AdvancedCompanyBlockADoc />

    <!--Company block B demo-->
    <AdvancedCompanyBlockBDoc />

    <!--Company block C demo-->
    <AdvancedCompanyBlockCDoc />

    <!--Company block D demo-->
    <AdvancedCompanyBlockDDoc />
  </div>
</template>
