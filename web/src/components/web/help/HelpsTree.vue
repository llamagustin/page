<script setup lang="ts">
import {ref,computed,onMounted} from 'vue'
import { createRouter } from '/@src/router'
import { data_help } from '/@src/texts/help/data'
import {  text, blocks, blockGroups } from '/@src/texts/services/index'
import VueScrollTo from 'vue-scrollto'

const scrollTo = VueScrollTo.scrollTo

const filter = ref('')
const activeArticle = ref(0)
const activeResume = ref(0)
const activeSubarticle = ref(-1)

const router=createRouter();

export interface treeProps {
  link: string
}

const props = withDefaults(defineProps<treeProps>(), {
  link: 'web-basis',
})

const emits = defineEmits(['changeLink' ])


function handleClick(indexA,item) {
    if(activeArticle == indexA){
      activeArticle.value = -1
    }else{
      activeArticle.value = indexA
      activeResume.value = 0
    }
    
    scrollTo(`#article-${indexA}`, 800, {offset: -100})
    link.value=item.link
    linkArticle.value="basis"
    
    emits('changeLink',linkTree.value)
    router.push('/help/article/'+linkTree.value)
}

function handleKey(indexA){
  if(activeArticle == indexA){
    activeArticle.value = -1
  }else{
    activeArticle.value = indexA
    activeResume.value = -1
  }
  
  scrollTo(`#article-${indexA}`, 800, { offset: -100 })
                        
}

function handleResumeKey(indexA,indexB){
  if(activeArticle == indexB){
    activeArticle.value = -1
  }else{
    activeArticle.value = indexB
    activeResume.value = -1
  }
  
  scrollTo(`#article-${indexA}-${indexB}`, 800, { offset: -100 })
}

function handleResumeClick(indexA,indexB,item){
  if(activeResume == indexB)
    activeResume.value = -1
  else
    activeResume.value = indexB
  
  
  scrollTo(`#article-${indexA}-${indexB}`, 800, { offset: -100 })
  
  linkArticle.value= item.link
  
  emits('changeLink',linkTree.value)
  router.push('/help/article/'+linkTree.value)
                          
}

const articles = computed(()=>{
  let result=data_help.reduce((accumulator, currentObject, index) => {
    const { link } = currentObject;
    accumulator[link] = index;
    return accumulator;
  }, {});

  return result
})

const link=ref('web')
const linkArticle= ref('basis')
const helpData=ref([])
const resumes= {basis:0,features:1,steps:2}

onMounted(()=>{
  
  const rs = [];

  data_help.forEach(item => {
    item.articles.forEach(subitem => {
      subitem.subarticles[0].resume.forEach(article => {
        const obj = {
          id:article.id,
          link: item.link + '-' + subitem.link,
          text: article.text,
          title: article.title
        };

        rs.push(obj);
      });
    });
  });
  
  helpData.value=rs;
  
  
  const Link=props.link.split('-');
  
   activeArticle.value= articles.value[Link[0]];
   activeResume.value=resumes[Link[1]];
   
   link.value=Link[0]
   linkArticle.value=Link[1]
   
})

const linkTree = computed(()=>{
  return `${link.value}-${linkArticle.value}`
})


const dataHelpFiltered = computed(()=>{
  const Filter=filter.value;
  
  if(Filter == '') return []
  
  const regex = new RegExp(filter.value, "i"); 

  let rs = helpData.value.filter(item => {
    return regex.test(item.text) || regex.test(item.title);
  }).slice(0,10);

  return rs;
  
  
  
})

function handleLinkClick(newLink:string){
   const Link=newLink.split('-');
  
   activeArticle.value= articles.value[Link[0]];
   activeResume.value=resumes[Link[1]];
   
   link.value=Link[0]
   linkArticle.value=Link[1]
   filter.value=''
   
}

</script>
<template>
  <div>
  <div class="vulk-docs">
          <div  class="left">
            <div class="left-menu">
              <!--Section Title-->
              <div  class="is-relative pr-4 z-3">
                
                <div class="pb-2 mb-2">
                    
                    <div class="library-search">
                      <Field>
                        <Control icon="feather:search">
                          <VInput v-model="filter" type="text" :placeholder="text.placeholder" />
                          <button v-if="filter.length > 0" class="close-search" @click="filter = ''" >
                            <i-feather-x />
                          </button>
                        </Control>
                        
                        <div v-if="filter.length > 0" class="filter-results">
                          <div class="filter-results-inner">
                            <ul v-if="dataHelpFiltered.length">
                              <li v-for="result in dataHelpFiltered" :key="result.id" >
                                <RouterLink :to="result.link" @click.native="filter=''; handleLinkClick(result.link)">
                                  <div class="filter-result-item">
                                    <div class="meta">
                                      <h3>{{ result.title }}</h3>
                                      <p class="paragraph rem-85">
                                        {{ result.link }}
                                      </p>
                                    </div>
                                    <div class="go-icon">
                                      <i-ph-arrow-circle-right-duotone />
                                    </div>
                                  </div>
                                </RouterLink>
                              </li>
                            </ul>
                            <div v-else-if="!dataHelpFiltered.length">
                              <div class="search-placeholder">
                                <div>
                                  <i-iconoir-google-docs />
                                  <h3>Sin resultado</h3>
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
              <hr />
              <div class="mb-4 aythen-docs-title">
                <strong>Aythen Docs</strong>
              </div>
              <ul>
                <li v-for="(help, indexA) in data_help" :key="'article-app' + indexA" >
                    <a :class="activeArticle === indexA ? 'is-active' : ''" @click="handleClick(indexA,help)" @keydown.space.prevent="handleKey(indexA)">
                      {{ help.title }}
                    </a>
                    <ul v-if="activeArticle === indexA" :style="{paddingLeft: '12px'}" >
                      <li v-for="(article, indexB) in help.articles" :key="indexB" >
                          <a :class="activeResume === indexB ? 'is-active' : ''" 
                            @click="handleResumeClick(indexA,indexB,article)"
                            @keydown.space.prevent="handleResumeKey(indexA,indexB)">
                              {{ article.title }}
                          </a>
                          
                      </li>
                    </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
      </div>
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
</style>