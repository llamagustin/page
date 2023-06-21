<script setup lang="ts">
import { ref, onMounted, onServerPrefetch, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { data_help } from '/@src/texts/help/data'
import {  text, blocks, blockGroups } from '/@src/texts/services/index'
import VueScrollTo from 'vue-scrollto'

const scrollTo = VueScrollTo.scrollTo

const route = useRoute()
const router = useRouter()


var data = route.params.slug.split('-')
const type = ref(data[0])
const type_article = ref(data[1])

var data = data.join('-')
const slug = data as string


var index = data_help.findIndex( x => x.link == type.value)
const article = ref(data_help[index])
const subarticle = ref()

const setContent= (link) =>{
  data = link.split('-')
   type.value = data[0]
   type_article.value = data[1]
  
  try {
    var index = article.value.articles.findIndex( x => x.link == type_article.value)
    var indexArticle = data_help.findIndex( x => x.link == type.value)

    article.value=data_help[indexArticle];
    
    subarticle.value = article.value.articles[index].subarticles //await getCategory(type, slug)

  } catch {}
}

// get category data
async function fetchCategory() {
  
  setContent(route.params.slug)
   
}

onMounted(fetchCategory)
onServerPrefetch(fetchCategory)

watch(route, fetchCategory)

const filter = ref('')

const changeLink= val =>{
  setContent(val)
}

</script>

<template>
  <Section color="grey" overflown>
    <div class="columns">
      
      <div class="column is-3 ">
        <HelpsTree @changeLink="changeLink" :link="route.params.slug" />
      </div>
      <div class="column">
        
          <Container v-if="subarticle">
            <HelpsCenterCategoryBlock class="mt-10" :type="type" :article="article" :subarticle="subarticle" />
          </Container>
        
      </div>
  
    </div>
  </Section>
</template>


<style lang="scss" scoped> 
  .vulk-docs {
  display: flex;

  .left {
    width: calc(300px - 2rem);
    margin-right: 2rem;
    border-right: 1px solid var(--wrap-border-color);

    .left-menu {
      position: sticky;
      top: 90px;

      ul {
        li {
          a {
            position: relative;
            left: 2px;
            display: flex;
            font-family: var(--font);
            margin-bottom: 1rem;
            color: var(--medium-text);
            border-right: 3px solid transparent;

            &.is-active {
              color: var(--primary);
              border-color: var(--primary);
            }
          }
        }
      }
    }
  }
  }
</style>