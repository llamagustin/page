<script setup lang="ts">
import { ref, onMounted } from 'vue'

import {
  textHelpCenter,
  helpCenterTopics,
  // helpCategories,
  textHelp,
} from '/@src/texts/help'

import { data_help } from '/@src/texts/help/data'


const data_articles = ref({})
const typeArticle = ref('web')

const openCategory = (category) => {
  var index = data_help.findIndex( x => x.link == category)
  typeArticle.value = category

  data_articles.value = data_help[index].articles
  
  
  document.documentElement.style.setProperty('--myColor', data_help[index].iconColor);
  
}

onMounted(()=>{
  openCategory(typeArticle.value)
})


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
                v-for="(topic, index) in data_help.slice(0, 8)"
                :key="index"
                class="column is-4"
              >
                <div @click="openCategory(topic.link)" class="box cursor-pointer">
                  <i
                    class="iconify"
                    :data-icon="topic.icon"
                    :style="{color: topic.iconColor}"
                  ></i>
                  <Title tag="h3" :size="6" weight="semi" narrow>
                    <span>{{ topic.title }}</span>
                  </Title>
                  <p class="paragraph rem-85">
                    {{ topic.text }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>

    <Section  color="grey">
      <Container>
        <SectionTitle
          :title="textHelpCenter.title"
          :subtitle="textHelpCenter.subtitle"
        />
        <div class="py-6">
          <div class="help-center-categories">
            <div class="columns is-multiline">
              <div
                v-for="(article, index) in data_articles"
                :key="index"
                class="column is-4"
              >
                <HelpsCenterCategoryCard :type="typeArticle" :article="article" 
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

:root {
  --myColor: #0000ff;
}

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

    p{
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    
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
