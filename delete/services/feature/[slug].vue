<script setup lang="ts">
////web/services/category/making-your-first-steps

import { ref, onMounted, onServerPrefetch, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getCategory } from '/@src/utils/api/category'
import { helpCenterTopics } from '/@src/texts/services'
import { HelpCenterCategory } from '/@src/types'

const route = useRoute()
const router = useRouter()
const slug = route.params.slug as string

// get category data
const category = ref<HelpCenterCategory>()
async function fetchCategory() {
  try {
    category.value = await getCategory(slug)
  } catch {
    router.replace({
      name: 'all',
      params: { all: `not-found-${route.params.slug}` },
    })
  }
}

onMounted(fetchCategory)
onServerPrefetch(fetchCategory)
watch(() => route.fullPath, fetchCategory)
</script>

<template>
  <div>
    <Section color="grey" overflown>
      <Container v-if="category" class="mt-8">
        <!--
        <HelpsCenterHeader
          :title="category.name"
          subtitle="Category"
          :topics="helpCenterTopics"
          compact
        />
        -->

        <HelpsCenterCategoryBlock :category="category" />
      </Container>
    </Section>

    <FooterD
      color="light"
    />
  </div>
</template>
