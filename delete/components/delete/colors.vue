<script setup lang="ts">
import { textColors } from '/@src/texts/blocks/features'

import ColorsDoc from '/@src/documentation/blocks/setup/ColorsDoc.vue'
</script>

<template>
  <div>
    <BlocksHeroSub
      :title="textColors.title"
      :subtitle="textColors.subtitle"
      :button_0="textColors.button_0"
      :button_1="textColors.button_1"
    />

    <Section>
      <Container>
        <!--Colors-->
        <ColorsDoc />
      </Container>
    </Section>
  </div>
</template>
