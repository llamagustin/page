<script setup lang="ts">
import { textBlog } from '/@src/texts/blocks'

import AdvancedBlogBlockADoc from '/@src/documentation/advanced/blog/AdvancedBlogBlockADoc.vue'
import AdvancedBlogBlockBDoc from '/@src/documentation/advanced/blog/AdvancedBlogBlockBDoc.vue'

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
    <HeroSub :title="textBlog.title" :subtitle="textBlog.subtitle" />

    <DemoLinks :links="demoLinks" width="400px" />

    <!--Blog block A demo-->
    <AdvancedBlogBlockADoc />

    <!--Blog block B demo-->
    <AdvancedBlogBlockBDoc />
  </div>
</template>
