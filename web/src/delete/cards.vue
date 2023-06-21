<script setup lang="ts">
import { textCards } from '/@src/texts/blocks/features'

import CardShape from '/@src/documentation/base/card/CardShape.vue'
import CardPadding from '/@src/documentation/base/card/CardPadding.vue'
import CardShadow from '/@src/documentation/base/card/CardShadow.vue'
import CardAnimated from '/@src/documentation/base/card/CardAnimated.vue'

const demoLinks = [
  {
    label: 'Shape',
    target: 'card-shapes-demo',
  },
  {
    label: 'Padding',
    target: 'card-padding-demo',
  },
  {
    label: 'Shadow',
    target: 'card-shadow-demo',
  },
  {
    label: 'Animated',
    target: 'card-animated-demo',
  },
]
</script>

<template>
  <div>
    <BlocksHeroSub
      :title="textCards.title"
      :subtitle="textCards.subtitle"
      :button_0="textCards.button_0"
      :button_1="textCards.button_1"
    />

    <DemoLinks :links="demoLinks" width="400px" />

    <!--Card shape demo-->
    <CardShape />

    <!--Card padding demo-->
    <CardPadding />

    <!--Card shadows demo-->
    <CardShadow />

    <!--Card animation demo-->
    <CardAnimated />
  </div>
</template>
