<script setup lang="ts">
import { textClients } from '/@src/texts/blocks'

import AdvancedClientsBlockADoc from '/@src/documentation/advanced/clients/AdvancedClientsBlockADoc.vue'
import AdvancedClientsBlockBDoc from '/@src/documentation/advanced/clients/AdvancedClientsBlockBDoc.vue'
import AdvancedClientsBlockCDoc from '/@src/documentation/advanced/clients/AdvancedClientsBlockCDoc.vue'

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
]
</script>

<template>
  <div>
    <HeroSub :title="textClients.title" :subtitle="textClients.subtitle" />

    <DemoLinks :links="demoLinks" width="360px" />

    <!--Clients block A demo-->
    <AdvancedClientsBlockADoc />

    <!--Clients block B demo-->
    <AdvancedClientsBlockBDoc />

    <!--Clients block C demo-->
    <AdvancedClientsBlockCDoc />
  </div>
</template>
