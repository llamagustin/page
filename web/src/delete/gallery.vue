<script setup lang="ts">
import { textGallery } from '/@src/texts/blocks/features'

import GalleryBlockADoc from '/@src/documentation/blocks/gallery/GalleryBlockADoc.vue'
import GalleryBlockBDoc from '/@src/documentation/blocks/gallery/GalleryBlockBDoc.vue'
import GalleryBlockCDoc from '/@src/documentation/blocks/gallery/GalleryBlockCDoc.vue'
import GalleryBlockDDoc from '/@src/documentation/blocks/gallery/GalleryBlockDDoc.vue'

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
    <HeroSub :title="textGallery.title" :subtitle="textGallery.subtitle" />

    <DemoLinks :links="demoLinks" width="420px" />

    <!--Block A demo-->
    <GalleryBlockADoc />

    <!--Block B demo-->
    <GalleryBlockBDoc />

    <!--Block C demo-->
    <GalleryBlockCDoc />

    <!--Block D demo-->
    <GalleryBlockDDoc />
  </div>
</template>
