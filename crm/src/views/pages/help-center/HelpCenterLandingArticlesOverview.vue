<script setup lang="ts">
import type {
  HelpCenterArticlesOverviewType,
} from '@/@fake-db/types'

interface Props {
  articles: HelpCenterArticlesOverviewType[]
}

const props = defineProps<Props>()
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      lg="10"
      class="mx-auto mb-8"
    >
      <VRow>
        <VCol
          v-for="article in props.articles"
          :key="article.title"
          cols="12"
          md="4"
        >
          <VCard
            flat
            border
          >
            <VCardText class="text-center">
              <VImg
                :src="article.img"
                aspect-ratio="1"
                width="58"
                class="mx-auto"
              />

              <h6 class="text-h6 my-3">
                {{ article.title }}
              </h6>
              <p>
                {{ article.subtitle }}
              </p>

              <VBtn
                size="small"
                variant="tonal"
                :href="article.href"
              >
                Ir a link
              </VBtn>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
