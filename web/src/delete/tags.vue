<script setup lang="ts">
import { textTags } from '/@src/texts/blocks/features'

import TagColor from '/@src/documentation/base/tag/TagColor.vue'
import TagRounded from '/@src/documentation/base/tag/TagRounded.vue'
import TagSquare from '/@src/documentation/base/tag/TagSquare.vue'
import TagOutlined from '/@src/documentation/base/tag/TagOutlined.vue'
import TagElevated from '/@src/documentation/base/tag/TagElevated.vue'

const demoLinks = [
  {
    label: 'Color',
    target: 'tag-colors-demo',
  },
  {
    label: 'Rounded',
    target: 'tag-rounded-demo',
  },
  {
    label: 'Square',
    target: 'tag-square-demo',
  },
  {
    label: 'Outlined',
    target: 'tag-outlined-demo',
  },
  {
    label: 'Elevation',
    target: 'tag-elevation-demo',
  },
]
</script>

<template>
  <div>
    <HeroSub :title="textTags.title" :subtitle="textTags.subtitle" />

    <DemoLinks :links="demoLinks" width="480px" />

    <!--Tag colors demo-->
    <TagColor />

    <!--Tag rounded demo-->
    <TagRounded />

    <!--Tag square demo-->
    <TagSquare />

    <!--Tag outlined demo-->
    <TagOutlined />

    <!--Tag elevated demo-->
    <TagElevated />
  </div>
</template>
