<script setup lang="ts">
import { textTableflex } from '/@src/texts/blocks/features'

const demoLinks = [
  {
    label: 'Block A',
    target: 'block-a-demo',
  },
]
</script>

<template>
  <div>
    <HeroSub :title="textTableflex.title" :subtitle="textTableflex.subtitle" />

    <DemoLinks :links="demoLinks" width="240px" />

    <Section id="block-a-demo">
      <Container>
        <DemoTitle
          title="Block A"
          subtitle="Block A variation 1"
          link="block-a-props"
        />

        <TableBlockA />
      </Container>
    </Section>
  </div>
</template>
