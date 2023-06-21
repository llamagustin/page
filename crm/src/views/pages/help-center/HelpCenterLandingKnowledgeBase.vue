<script setup lang="ts">

interface Props {
  help: any
}

const props = defineProps<Props>()

const totalArticles = (help) => {
  return help.articles.map(article => article.subarticles.length)
  .reduce((partialSum, a) => partialSum + a, 0)
}
</script>

<template>
  <VRow >
    <VCol
      cols="12"
      lg="10"
      class="mx-auto mb-8"
    >
      <VRow >
        <VCol
          v-for="help in props.help"
          :key="help.title"
          cols="12"
          sm="6"
          md="4"
        >
          <VCard  :title="help.title">
            <template #prepend>
              <VAvatar
                :icon="help.icon"
                rounded
                :color="help.iconColor"
                variant="tonal"
              />
            </template>

            <VCardText >
              <ul
                class="ps-6"
                style="list-style: disc ;"
              >
                <li
                  v-for="article in help.articles"
                  :key="article.title"
                  class="text-primary mb-2"
                >
                  <RouterLink
                    :to="{
                      name: 'help-center-help-article',
                      params: { help: help.link, article: article.link },
                    }"
                  >
                    {{ article.title }}
                  </RouterLink>
                </li>
              </ul>
              <div class="mt-4">
                <RouterLink 
                  :to="{
                    name: 'help-center-help-article',
                    params: { help: help.link, article: help.articles[0].link },
                  }"
                  class="text-base font-weight-semibold"
                >
                  {{ totalArticles(help) }} articles
                </RouterLink>
              </div>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
