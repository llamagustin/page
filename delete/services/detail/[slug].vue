<script setup lang="ts">
import { ref, onMounted, onServerPrefetch, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getService } from '/@src/utils/api/service'
import { socialLinks } from '/@src/data/blocks/advanced/social'
import type { Service } from '/@src/types'

const route = useRoute()
const router = useRouter()
const slug = route.params.slug as string

// get service data
const service = ref<Service>()
async function fetchService() {
  try {
    service.value = await getService(slug)
  } catch {
    router.replace({
      name: 'all',
      params: { all: `not-found-${route.params.slug}` },
    })
  }
}

onMounted(fetchService)
onServerPrefetch(fetchService)
watch(() => route.fullPath, fetchService)
</script>

<template>
  <div>
    <Section overflown>
      <Container v-if="service">
        <ServiceDetails :job="service" />
      </Container>
    </Section>

    <FooterD
      color="light"
    />
  </div>
</template>
