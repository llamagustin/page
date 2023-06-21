<script setup lang="ts">
import { textNavtabs } from '/@src/texts/blocks/features'

import TabsBase from '/@src/documentation/base/tabs/TabsBase.vue'
import TabsCentered from '/@src/documentation/base/tabs/TabsCentered.vue'
import TabsRight from '/@src/documentation/base/tabs/TabsRight.vue'
import TabsIcons from '/@src/documentation/base/tabs/TabsIcons.vue'
import TabsBoxed from '/@src/documentation/base/tabs/TabsBoxed.vue'
import TabsSliderDual from '/@src/documentation/base/tabs/TabsSliderDual.vue'
import TabsSliderTriple from '/@src/documentation/base/tabs/TabsSliderTriple.vue'

const demoLinks = [
  {
    label: 'Tabs',
    target: 'tabs-base-demo',
  },
  {
    label: 'Centered',
    target: 'tabs-centered-demo',
  },
  {
    label: 'Right',
    target: 'tabs-right-demo',
  },
  {
    label: 'Icons',
    target: 'tabs-icons-demo',
  },
  {
    label: 'Boxed',
    target: 'tabs-boxed-demo',
  },
  {
    label: 'Slider 2x',
    target: 'tabs-slider-dual-demo',
  },
  {
    label: 'Slider 3x',
    target: 'tabs-slider-triple-demo',
  },
]
</script>

<template>
  <div>
    <HeroSub :title="textNavtabs.title" :subtitle="textNavtabs.title" />

    <DemoLinks :links="demoLinks" width="620px" />

    <!--tabs base demo-->
    <TabsBase />

    <!--tabs centered demo-->
    <TabsCentered />

    <!--tabs right demo-->
    <TabsRight />

    <!--tabs icons demo-->
    <TabsIcons />

    <!--tabs boxed demo-->
    <TabsBoxed />

    <!--tabs slider 2x demo-->
    <TabsSliderDual />

    <!--tabs slider 3x demo-->
    <TabsSliderTriple />
  </div>
</template>
