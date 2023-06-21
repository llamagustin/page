<script setup lang="ts">
import { textTable } from '/@src/texts/blocks/features'

import SimpleTableBase from '/@src/documentation/base/table/SimpleTableBase.vue'
import SimpleTableStriped from '/@src/documentation/base/table/SimpleTableStriped.vue'
import SimpleTableBordered from '/@src/documentation/base/table/SimpleTableBordered.vue'
import SimpleTableBoth from '/@src/documentation/base/table/SimpleTableBoth.vue'

const demoLinks = [
  {
    label: 'Table',
    target: 'table-base-demo',
  },
  {
    label: 'Striped',
    target: 'table-striped-demo',
  },
  {
    label: 'Bordered',
    target: 'table-bordered-demo',
  },
  {
    label: 'Both',
    target: 'table-both-demo',
  },
]
</script>

<template>
  <div>
    <HeroSub :title="textTable.title" :subtitle="textTable.subtitle" />

    <DemoLinks :links="demoLinks" width="360px" />

    <!--Simple table demo-->
    <SimpleTableBase />

    <!--Simple table striped demo-->
    <SimpleTableStriped />

    <!--Simple table bordered demo-->
    <SimpleTableBordered />

    <!--Simple table both demo-->
    <SimpleTableBoth />
  </div>
</template>
