<script setup lang="ts">
import { textVideo } from '/@src/texts/blocks/features'

import VideoBlockADoc from '/@src/documentation/blocks/video/VideoBlockADoc.vue'
import VideoBlockBDoc from '/@src/documentation/blocks/video/VideoBlockBDoc.vue'
import VideoBlockCDoc from '/@src/documentation/blocks/video/VideoBlockCDoc.vue'

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
    <HeroSub :title="textVideo.title" :subtitle="textVideo.subtitle" />
    <DemoLinks :links="demoLinks" width="320px" />

    <!--Video block A docs-->
    <VideoBlockADoc />

    <!--Video block B docs-->
    <VideoBlockBDoc />

    <!--Video block C docs-->
    <VideoBlockCDoc />
  </div>
</template>
