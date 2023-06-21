<script setup lang="ts">
import { useLayout } from '/@src/composable/useLayout'
import Chat from '/@src/components/plugin/Chat.vue'

const { transition } = useLayout()

</script>

<template>
  <Navbar />

  <RouterView v-slot="{ Component }">
    <Transition :name="transition" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
  <BackToTop />
  <Chat />
</template>
