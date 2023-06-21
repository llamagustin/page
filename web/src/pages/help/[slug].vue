<script setup lang="ts">
  import { ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  
  const route = useRoute()
  const router = useRouter()
  const slug = route.params.slug as string
  
  import {
    textHelpCenter,
    helpCenterTopics,
    helpCategories,
    textHelp,
  } from '/@src/texts/help'
  
  const helpCategory = ref({})
  const typeCategory = ref('docs')
  
  const openCategory = (category) => {
    typeCategory.value = category
    helpCategory.value = helpCategories[category]
    
    scrollTo(`#apps-group`, 800, {
      offset: -100,
    })
  }
  
  openCategory(slug)
</script>

<template>
  <div>
    
    <Section color="grey">
      <Container >
        <div>
          <PageTitle
            :title="textHelp.title"
            :subtitle="textHelp.subtitle"
            :text="textHelp.text"
          >
            <template #content>
              <Control icon="feather:search">
                <VInput placeholder="Search topics..." />
              </Control>
            </template>
          </PageTitle>
      
          <div class="help-center-navigation">
            <div class="columns is-multiline b-columns-half-tablet-p">
              <div
                v-for="(topic, index) in helpCenterTopics.slice(0, 8)"
                :key="index"
                class="column is-3"
              >
                <div @click="openCategory(topic.link)" class="box cursor-pointer">
                  <i
                    class="iconify"
                    :data-icon="topic.icon"
                    :class="topic.iconColor && `text-${topic.iconColor}`"
                  ></i>
                  <Title tag="h3" :size="6" weight="semi" narrow>
                    <span>{{ topic.title }}</span>
                  </Title>
                  <p class="paragraph rem-85">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>

    <Section color="grey">
      <Container >
        <SectionTitle
          :title="textHelpCenter.title"
          :subtitle="textHelpCenter.subtitle"
        />
        <div class="py-6">
          <div class="help-center-categories">
            <div class="columns is-multiline">
              <div
                v-for="(category, index) in helpCategory"
                :key="index"
                class="column is-6"
              >
                <HelpsCenterCategoryCard 
                  :type="typeCategory"
                  :category="category" 
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>

  </div>
</template>










<style scoped lang="scss">
:deep(.control) {
  max-width: 540px;
  margin: 1rem auto 0;
}

:deep(.form-icon) {
  height: 54px !important;
  width: 54px !important;
  font-size: 1.5rem;
}

:deep(.input) {
  height: 54px !important;
  padding-left: 54px !important;
  border-radius: 50rem;
}


.help-center-categories {
  position: relative;
}


.help-center-navigation {
  max-width: 1080px;
  margin: 0 auto;

  .box {
    background: var(--card-bg-color);
    border: 1px solid var(--card-border-color);
    box-shadow: none;
    border-radius: 0.85rem;
    text-align: center;
    padding: 1.75rem;
    transition: box-shadow 0.3s, transform 0.3s;

    svg {
      font-size: 2.5rem;
      margin-bottom: 0.75rem;
    }

    &:hover {
      box-shadow: var(--spread-shadow);
      transform: translateY(-0.25rem);
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  .help-center-navigation {
    .box {
      padding: 1.5rem 1rem;
    }
  }
}
</style>
