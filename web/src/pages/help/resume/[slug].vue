<script setup lang="ts">
import { ref, onMounted, onServerPrefetch, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getArticle } from '/@src/utils/api/article'
import { HelpCenterArticle } from '/@src/types'
import {  text, blocks, blockGroups } from '/@src/texts/services/index'
import { appGroups } from '/@src/texts/services/apps/index'
import { helpCategories } from '/@src/texts/help'
import { data_help } from '/@src/texts/help/data'
import VueScrollTo from 'vue-scrollto'

const scrollTo = VueScrollTo.scrollTo

const keys_menu = Object.keys(helpCategories)


const activeArticle = ref(0)
const activeResume = ref(0)
const activeSubarticle = ref(-1)

///

const route = useRoute()
const router = useRouter()
//const slug = route.params.slug as string

var data = route.params.slug.split('-')
const type = data.splice(0, 1)[0]

var data = data.join('-')
const slug = data as string


// get article data
const article = ref<HelpCenterArticle>()
async function fetchArticle() {
  //console.log('dqwoediji')
  // article.value = await getArticle(type, slug)
  /*
  try {
    article.value = await getArticle(type, slug)
  } catch {

  }
  */
      /*
    router.replace({
      name: 'all',
      params: { all: `not-found-${route.params.slug}` },
    })
    */
}

onMounted(()=>{
  fetchArticle()
  
  const articles = document.querySelectorAll('.article-title');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let index_a= parseInt(entry.target.getAttribute('data-a'));
        let index_b= parseInt(entry.target.getAttribute('data-b'));
        
        activeArticle.value=index_a
        activeResume.value=index_b;
        
      }
    });
  });

  articles.forEach((article) => {
    observer.observe(article);
  });
  
})
  
onServerPrefetch(fetchArticle)
watch(() => route.fullPath, fetchArticle)




const filter = ref('')

const filteredData = computed(() => {
  if (filter.value === '') {
    return []
  } else {
    return blocks.filter((item) => {
      return (
        item.icon.match(new RegExp(filter.value, 'i')) ||
        item.name.match(new RegExp(filter.value, 'i')) ||
        item.type.match(new RegExp(filter.value, 'i'))
      )
    })
  }
})


</script>

<template>
  <div>
    <Section overflown :style="{ marginTop: '70px' }" class="section is-overflown pt-0" >
      <Container>
        <div  class="vulk-docs">
          <div  class="left">
            <div class="left-menu">
              <!--Section Title-->
              <div class="is-relative pr-4 z-3">
                <div class="pb-2">
                  <div class="mb-2">
                    <div class="help-toolbar mb-3">
                      <a
                        class="back-link"
                        @click.prevent="$router.back()"
                        @keydown.space.prevent="() => $router.back()"
                      >
                        <i-ph-arrow-left-bold />
                        <span>Back</span>
                      </a>
                    </div>
                    <div class="library-search">
                      <Field>
                        <Control icon="feather:search">
                          <VInput
                            v-model="filter"
                            type="text"
                            :placeholder="text.placeholder"
                          />
                          <button
                            v-if="filter.length > 0"
                            class="close-search"
                            @click="filter = ''"
                          >
                            <i-feather-x />
                          </button>
                        </Control>
                        <div v-if="filter.length > 0" class="filter-results">
                          <div class="filter-results-inner">
                            <ul v-if="filteredData.length">
                              <li
                                v-for="result in filteredData"
                                :key="result.name"
                              >
                                <RouterLink :to="result.link">
                                  <div class="filter-result-item">
                                    <div class="meta">
                                      <h3>{{ result.name }}</h3>
                                      <p class="paragraph rem-85">
                                        {{ result.type }}
                                      </p>
                                    </div>
                                    <div class="go-icon">
                                      <i-ph-arrow-circle-right-duotone />
                                    </div>
                                  </div>
                                </RouterLink>
                              </li>
                            </ul>
                            <div v-else-if="!filteredData.length">
                              <div class="search-placeholder">
                                <div>
                                  <i-iconoir-google-docs />
                                  <h3>Nothing Found</h3>
                                  <p class="paragraph rem-90">
                                    We couldn't find any matching results
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Field>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div class="mb-4 aythen-docs-title">
                <strong>Aythen Docs</strong>
              </div>
              <ul>
                <li
                  v-for="(help, indexA) in data_help"
                  :key="'article-app' + indexA"
                  >
                    <a
                      :class="activeArticle === indexA ? 'is-active' : ''"
                      @click="
                      () => {
                          if(activeArticle == indexA){
                            activeArticle = -1
                          }else{
                            activeArticle = indexA
                            activeResume = 0
                          }
                          
                          scrollTo(`#article-${indexA}`, 800, {
                            offset: -100,
                          })
                      }"
                      @keydown.space.prevent="
                      () => {
                          if(activeArticle == indexA){
                            activeArticle = -1
                          }else{
                            activeArticle = indexA
                            activeResume = -1
                          }
                          
                          scrollTo(`#article-${indexA}`, 800, {
                            offset: -100,
                          })
                      }"
                    >
                      {{ help.title }}
                    </a>
                    <ul
                      v-if="activeArticle === indexA"
                      :style="{paddingLeft: '12px'}"
                      >
                      <li v-for="(article, indexB) in help.articles" :key="indexB" >
                          <a 
                            :class="activeResume === indexB ? 'is-active' : ''"
                            @click="
                            () => { 
                                if(activeResume == indexB){
                                  activeResume = -1
                                }else{
                                  activeResume = indexB
                                  
                                }
                                
                                scrollTo(`#article-${indexA}-${indexB}`, 800, {
                                  offset: -100,
                                })
                            }"
                            @keydown.space.prevent="
                            () => {      
                                if(activeArticle == indexB){
                                  activeArticle = -1
                                }else{
                                  activeArticle = indexB
                                  activeResume = -1
                                }
                                
                                scrollTo(`#article-${indexA}-${indexB}`, 800, {
                                          offset: -100,
                                })
                            }"
                            >
                              {{ article.title }}
                          </a>
                      </li>
                    </ul>
                </li>
              </ul>
            </div>
          </div>
          <div class="right pt-4">
              <div
                  v-for="(help, indexA) in data_help"
                  :id="`help-${indexA}`"
                  :key="indexA"
                  class="block-group"
                >
                    <div
                      v-for="(article, indexB) in help.articles"
                      :id="`article-${indexA}-${indexB}`"
                      :key="indexB"
                      class="block-group"
                    >
                      <div v-if="true" class="block-group-header">
                        <div class="meta">
                          <h3 :id="`article-${indexA}`" :data-a="indexA" :data-b="indexB"   class="article-title">{{ article.title }}</h3>
                          <h4 class="article-text">{{ article.text }}</h4>
                        </div>
                        <div>
                        </div>
                      </div>
                      
                      <div
                        v-for="(subarticle, indexC) in article.subarticles"
                        :id="`article-${indexA}-${indexB}-${indexC}`"
                        :key="indexC"
                        class="block-group"
                      >
                        <div v-if="subarticle.resume.length > 0">
                          <!--<div class="block-group-header" >-->
                          <!--  <div class="meta"> -->
                          <!--    <h3>{{ subarticle.title }}</h3>-->
                          <!--    <p class="paragraph">{{ subarticle.text }}</p>-->
                          <!--  </div>-->
                          <!--</div>-->
                          
                          <div class="block-group-body">
                            <div class="columns is-multiline b-columns-third-tablet-p pb-6">
                
                                  <HelpsCenterArticleBlock :subarticle="subarticle" />
                            </div>
                            <!--<div class="columns is-multiline b-columns-third-tablet-p pb-6">-->
                            <!--  <div-->
                            <!--    v-for="(resume, indexD) in subarticle.resume"-->
                            <!--    :id="`article-${indexA}-${indexB}-${indexC}-${indexD}`"-->
                            <!--    :key="indexC"-->
                            <!--  >-->
                            <!--      <HelpsCenterArticleBlock :resume="resume" />-->
                            <!--  </div>-->
                            <!--</div>-->
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
          </div>
        </div>
      </Container>
    </Section>
  </div>
</template>





<style lang="scss" scoped>
:deep(.page-title) {
  padding-top: 0;
  padding-bottom: 0;
}


:deep(img[alt="img10"]){ width: 10% !important; }
:deep(img[alt="img20"]){ width: 20% !important; }
:deep(img[alt="img30"]){ width: 30% !important; }
:deep(img[alt="img40"]){ width: 40% !important; }
:deep(img[alt="img50"]){ width: 50% !important; }
:deep(img[alt="img60"]){ width: 60% !important; }
:deep(img[alt="img70"]){ width: 70% !important; }
:deep(img[alt="img80"]){ width: 80% !important; }
:deep(img[alt="img90"]){ width: 90% !important; }
:deep(img[alt="img100"]){ width: 100% !important; }

.library-search {
  :deep(.input) {
    height: 52px;
    padding-left: 52px;
    border-radius: 0.85rem;
    border-color: var(--input-base-border-color-hover);
  }

  :deep(.field) {
    position: relative;
  }

  :deep(.control) {
    .form-icon {
      height: 52px;
      width: 52px;

      .iconify {
        font-size: 1.5rem;
      }
    }

    .close-search {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 52px;
      width: 52px;
      font-size: 1rem;
      background: none;
      border: none;
      padding: none;
      color: var(--light-text);
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: var(--primary);
      }
    }
  }
}

.filter-results {
  position: absolute;
  top: 42px;
  left: 0;
  width: 100%;
  background: var(--input-base-bg-color);
  border: 1px solid var(--input-base-border-color-hover);
  border-radius: 0 0 0.85rem 0.85rem;
  border-top: none;

  .filter-results-inner {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 0.75rem;

    ul {
      max-height: 290px;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 5px !important;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 10px !important;
        background: rgb(0 0 0 / 20%) !important;
      }
    }

    .filter-result-item {
      padding: 0.75rem 1rem;
      display: flex;
      align-items: center;
      margin: 0 0.5rem;
      width: calc(100% - 1rem);
      border-radius: 0.75rem;
      margin-bottom: 0.5rem;
      transition: background-color 0.3s;

      .result-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        width: 40px;
        min-width: 40px;
        border-radius: 50%;
        background: var(--wrap-muted-color);
        font-size: 1.25rem;
        color: var(--primary);
      }

      .meta {
        margin-left: 0.75rem;
        line-height: 1.2;
       
        h3 {
          font-family: var(--font-alt);
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--title-color);
        }
      }

      .go-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 36px;
        width: 36px;
        min-width: 36px;
        border-radius: 50%;
        margin-left: auto;
        background: var(--wrap-bg-color);
        box-shadow: var(--spread-shadow);
        font-size: 1.15rem;
        color: var(--primary);
        transform: rotate(235deg) scale(0);
        transition: transform 0.3s;
      }

      &:hover {
        background: var(--wrap-muted-color);

        .go-icon {
          transform: rotate(0) scale(1);
        }
      }
    }

    .search-placeholder {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 200px;
      text-align: center;

      > div {
        position: relative;
        top: -1rem;
      }

      h3 {
        font-family: var(--font-alt);
        font-weight: 600;
        font-size: 0.9rem;
        color: var(--title-color);
      }

      svg {
        font-size: 1.75rem;
        color: var(--primary);
      }
    }
  }
}

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

  .right {
    width: calc(100% - 300px);

    .block-group {
      margin-bottom: 3rem;

      .block-group-header {
        display: flex;
        align-items: center;
        margin-bottom: 2rem;

        .group-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 55px;
          width: 55px;
          min-width: 55px;
          border-radius: 50%;
          background: var(--wrap-muted-color);
          font-size: 1.5rem;
          color: var(--primary);
        }

        .meta {
          margin-left: 0.75rem;

          h3 {
            font-size: 2.1rem; /*1.25*/
            font-family: var(--font-alt);
            font-weight: 500;
            color: var(--primary);
          }

          .paragraph {
            font-size: 0.95rem;
          }
        }
      }
    }
  }
}

:deep(.card) {
  .block-head {
    background: var(--component-card-bg-color);
    transition: 600ms ease;

    img {
      display: block;
      max-width: 100%;
      transform: scale(0.8);
      transition: transform 0.3s;
    }
  }

  &:hover {
    .block-head {
      img {
        transform: scale(0.9);
      }
    }
  }
}

.block-link {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .iconify {
    font-size: 1.25rem;
    transform: translateX(-5px);
    color: var(--placeholder);
    transition: opacity 0.3s, transform 0.3s;
  }

  &:hover {
    .iconify {
      color: var(--primary);
      transform: translateX(0);
    }

    :deep(.title) {
      span {
        color: var(--primary) !important;
      }
    }
  }
}
.meta .article-text{
    color: var(--medium-text); 
    font-size: 1.3rem;
}
.aythen-docs-title strong{
    font-size: 1.2rem;
    color: var(--medium-text); 
}
.back-link{
   display: flex;
   align-items: center;
   text-align: center;
   font-size: 1.2rem;
}
@media only screen and (max-width: 1023px) {
  .vulk-docs {
    .left {
      display: none;
    }

    .right {
      width: 100%;
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  .vulk-docs {
    .left {
      width: calc(240px - 2rem);
    }

    .right {
      width: calc(100% - 240px);
    }
  }
}
</style>
