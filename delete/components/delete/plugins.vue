<script setup lang="ts">
import { textPlugins } from '/@src/texts/blocks/features'

import PluginsDoc from '/@src/documentation/blocks/setup/PluginsDoc.vue'
</script>

<template>
  <div>
    <HeroSub :title="textPlugins.title" :subtitle="textPlugins.subtitle" />

    <Section>
      <Container>
        <!--Plugins-->
        <PluginsDoc />
      </Container>
    </Section>
  </div>
</template>
