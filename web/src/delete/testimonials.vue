<script setup lang="ts">
import { textTestimonials } from '/@src/texts/blocks/features'

import TestimonialBlockADoc from '/@src/documentation/blocks/testimonials/TestimonialBlockADoc.vue'
import TestimonialBlockBDoc from '/@src/documentation/blocks/testimonials/TestimonialBlockBDoc.vue'
import TestimonialBlockCDoc from '/@src/documentation/blocks/testimonials/TestimonialBlockCDoc.vue'
import TestimonialBlockDDoc from '/@src/documentation/blocks/testimonials/TestimonialBlockDDoc.vue'
import TestimonialBlockEDoc from '/@src/documentation/blocks/testimonials/TestimonialBlockEDoc.vue'

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
]
</script>

<template>
  <div>
    <HeroSub
      :title="textTestimonials.title"
      :subtitle="textTestimonials.subtitle"
    />

    <DemoLinks :links="demoLinks" width="480px" />

    <!--Block A demo-->
    <TestimonialBlockADoc />

    <!--Block B demo-->
    <TestimonialBlockBDoc />

    <!--Block C demo-->
    <TestimonialBlockCDoc />

    <!--Block D demo-->
    <TestimonialBlockDDoc />

    <!--Block E demo-->
    <TestimonialBlockEDoc />
  </div>
</template>
