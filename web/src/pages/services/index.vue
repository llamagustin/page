<script setup lang="ts">
  import axios from 'axios'
  import { useRoute } from 'vue-router'
  import { text, blocks, apisInfoArr, blockGroups } from '/@src/texts/services/index'

  import { appGroups } from '/@src/texts/services/apps/index'
  import { templateGroups, newTemplateGroups } from '/@src/texts/services/templates/index'

  import { ref, watch, computed, onMounted, onBeforeMount } from 'vue'
  import VueScrollTo from 'vue-scrollto'
  import ServiceBlock from '/@src/components/web/services/ServiceBlock.vue'

  import landing from '/@src/texts/tool/web/landing.json'
  import ServicesCarousel from '/@src/components/web/services/ServicesCarousel.vue'

  const scrollTo = VueScrollTo.scrollTo
  const activeMenuItem = ref(0)

  const route = useRoute();

  watch(route, (val) => {
    scrollToAny('components-group-' + val.query.id)
  })

  const instance = axios.create({
    baseURL: "https://api.aythen.com",
    withCredentials: false,
    headers: { 'Content-Type': 'application/json' }
  });

  //template
  const dataTemplate = ref({})
  const showTemplate = ref(-1)
  const titleTemplate = ref('')

  const activeMenuTemplateCategory = ref(-1)
  const activeMenuTemplate = ref(-1)
  const activeMenuTemplateData = ref(-1)

  const filterTemplate = ref('')

  const filteredTemplateData = computed(() => {
    if (filterTemplate.value === '') {
      return []
    }
    else {
      return blocks.filter((item) => {
        return (
          item.icon.match(new RegExp(filterTemplate.value, 'i')) ||
          item.name.match(new RegExp(filterTemplate.value, 'i')) ||
          item.type.match(new RegExp(filterTemplate.value, 'i'))
        )
      })
    }
  })

  dataTemplate.value = {
    title: "",
    subtitle: "",
    resume: "",
    app: [],
    data: []
  }

  const templates = ref([])
  const templateid = ref('')


  const identifiers = {
    c: "components-group-",
    t: "templates-group-"
  }

  watch(route, (route) => {
    if (route.query.id) {
      const [identifier, number] = route.query.id.split("")
      scrollToAny(identifiers[identifier] + number)
    }
  })

  onMounted(async () => {
    if (route.query.id) {
      const [identifier, number] = route.query.id.split("")
      scrollToAny(identifiers[identifier] + number)
    }

    let templateList = await instance.get('/templates').then(res => { return JSON.stringify(res.data) })
    templates.value = JSON.parse(templateList)

    if (window !== undefined) {
      templateid.value = window.location.search.split('/')[1]
    }

    const articles = document.querySelectorAll('.block-group');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let index_a = parseInt(entry.target.getAttribute('data-a'));
          activeMenuItem.value = index_a
        }
      });
    });

    articles.forEach((item) => {
      observer.observe(item);
    });
  })

  const dataApp = ref({})
  const activeMenuAppCategory = ref(-1)
  const filterApp = ref('')
  let showSlide = ref()

  watch(templates, () => { showSlide.value = templates.value })

  let uploadAI = ref(false)
  let uploadTemplate = ref(false)
  let newShowSlide = ref([])

  const updateTemplateBlock = (slide) => {
    newShowSlide.value = slide
    uploadTemplate.value = true
  }

  const getCategory = (category) => {

    const filteredcategories = showSlide.value?.filter(item => item.category == category)
    return filteredcategories || []
  }
  const filteredTemplate = computed(() => {
    let filtemplate = showSlide.value?.filter(item => item.id == templateid.value)
    return filtemplate || []
  })
  const uploadTemplateBlock = computed(() => {
    if (!uploadTemplate.value) {
      return uploadTemplate.value
    }
    return uploadTemplate.value
  })

  let newCarousel = ref([])
  const handleTemplateList = (group, index) => {


    if (!uploadTemplate.value) {
      document.getElementById(group)?.scrollIntoView({ behavior: 'smooth' });
    }
    else {
      newCarousel.value = JSON.parse(JSON.stringify(getCategory(group)));
      document.getElementById(group)?.scrollIntoView({ behavior: 'smooth' });

    }
  }

  const scrollToAny = (id) => {
    uploadAI.value = false
    uploadTemplate.value = false

    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  const filteredComponentCategory = (cat) => {
    let componentCategory = apisInfoArr.filter(item => item.categoria == cat)
    return componentCategory
  }

  const openService = (service) => {

    uploadAI.value = true
  }
</script>

<template>
  <div>
    <Section overflown :style="{ marginTop: '70px' }" class="section is-overflown pt-0">

      <Container>
        <div class="vulk-docs">
          <div class="left">
            <div class="left-menu">
              <!--Section Title-->
              <div class="is-relative pr-4 z-3">
                <div class="pb-4">
                  <div class="">
                    <div class="library-search">
                      <Field>
                        <Control icon="feather:search">
                          <VInput v-model="filterApp" type="text" :placeholder="text.placeholder" />
                          <button v-if="filterApp.length > 0" class="close-search" @click="filterApp = ''">
                            <i-feather-x />
                          </button>
                        </Control>
                        <div v-if="filterApp.length > 0" class="filter-results">
                          <div class="filter-results-inner">
                            <ul v-if="filteredAppData.length">
                              <li v-for="result in filteredAppData" :key="result.name">
                                <RouterLink :to="result.link">
                                  <div class="filter-result-item">
                                    <div class="result-icon">
                                      <i class="iconify" :data-icon="result.icon"></i>
                                    </div>
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
                            <div v-else-if="!filteredAppData.length">
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


              <div v-if="true">
                <hr />
                <div class="mb-4">
                  <strong class="components-title">Ai module</strong>
                </div>
                <ul>
                  <li v-for="(group, index) in apisInfoArr.slice(0,10)" @click="activeMenuItem = index" @keydown.space.prevent="activeMenuItem = index" class="menu-item">
                    <a :class="activeMenuItem === index ? 'is-active' : ''" @click.prevent="()=>{
                        scrollToAny(`components-group-${index}`)
                        }
                      " @keydown.space.prevent="
                        () =>
                          scrollTo(`#components-group-${index}`, 800, {
                            offset: -100,
                          })
                      ">
                      {{ group.categoria }}
                    </a>
                  </li>
                </ul>
              </div>
              <div v-if="true">
                <hr />
                <div class="mb-4">
                  <strong class="templates-title">Templates</strong>
                </div>
                <ul>
                  <li v-for="(group, index) in newTemplateGroups" class="menu-item">
                    <a :class="activeMenuItem === index+100 ? 'is-active' : ''" @click="
                        () => {
                            activeMenuItem = index+100
                            
                            
                            if(false && activeMenuAppCategory == index){
                              activeMenuAppCategory = -1
                            }else{
                              activeMenuAppCategory = index
                            }
                            handleTemplateList(group, index)
                        }" @keydown.space.prevent="
                        () => {
                            if(false && activeMenuAppCategory == index){
                              activeMenuAppCategory = -1
                            }else{
                              activeMenuAppCategory = index
                            }
                        }">
                      {{ group }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="right pt-4">
            <ServiceBlock v-if="uploadTemplate" :showText="uploadTemplate" :showSlide="newShowSlide.length > 0 ? newShowSlide : filteredTemplate" />

            <ServiceGPT v-if="uploadAI" />


            <div v-if="!uploadTemplate && !uploadAI">
              <div v-for="(group, index) in apisInfoArr.slice(0,10)" :id="`components-group-${index}`" :data-a="index" class="block-group">
                <div class="block-group-header">
                  <div class="group-icon">
                    <i class="iconify" data-icon="ph:rocket-duotone"></i>
                  </div>
                  <div class="meta">
                    <h3>{{ group.categoria }}</h3>
                    <p class="paragraph">{{ group.list[0].description }}</p>
                  </div>
                </div>
                <div class="block-group-body">
                  <div class="columns is-multiline b-columns-third-tablet-p pb-6">
                    <div v-for="(block, i) in group.list" :key="i" class="column is-5" @click="openService(block)">
                      <Card class="block-group-card api-items">
                        <div class="block-link p-2">
                          <div>
                            <Title tag="h3" :size="7" weight="semi" narrow>
                              <span>{{ block.webs_con_ias }}</span>
                            </Title>
                            <p class="text-description paragraph rem-85 pb-3">{{ block.categoria }}</p>
                            <p class="text-description paragraph rem-85 pt-1">{{ block.description }}</p>
                          </div>
                          <div>
                            <i class="iconify" data-icon="feather:arrow-right"></i>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
              <div v-for="(cat, index) in newTemplateGroups" :id="`templates-group-${index}`" class="block-group" :data-a="index+100">
                <ServicesCarousel :id="cat" @handleTemplate="updateTemplateBlock" :slides="getCategory(cat)">
                  <template #title>
                    <CollectionTitle class="mt-0" :title="getCategory(cat) ? getCategory(cat)[0]?.category : 'all templates'" subtitle="Templates" />
                  </template>
                </ServicesCarousel>
                <div v-if="getCategory(cat)?.length == 0 || getCategory(cat) == [] || undefined" class="custom-loader"></div>
              </div>
            </div>



            <!--<div shape-color="footer-dark">-->
            <!--  <Container>-->


            <!--    <div v-if="false" >-->
            <!--      <templateCarousel :id="newCarousel[0]?.category" @handleTemplate="updateTemplateBlock" :slides="newCarousel">-->
            <!--        <template #title>-->
            <!--          <CollectionTitle :title="newCarousel ? newCarousel[0]?.category : 'all templates'" subtitle="Templates" />-->
            <!--        </template>-->
            <!--      </templateCarousel>-->
            <!--    </div>-->

            <!--  </Container>-->
            <!--</div>-->
          </div>
        </div>
      </Container>
    </Section>
  </div>
</template>

<style lang="scss" scoped>
  .is-dark .card-text-container {
    color: var(--white-smoke);
  }

  .section {
    &.is-overflown {
      height: calc(100vh - 70px);
      overflow: hidden;
      margin-right: 0px;
      width: 100%;
      padding-right: 0px;

      .is-container {
        height: 100%;
        width: 100%;
        margin-right: 0px;
      }

      .left::-webkit-scrollbar,
      .right::-webkit-scrollbar {
        display: none;
      }
    }
  }

  :deep(.page-title) {
    padding-top: 0;
    padding-bottom: 0;
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

        >div {
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
    column-gap: 10px;

    .left {
      width: calc(240px - -7rem);
      /*300px  calc(310px - 2rem);*/
      /*margin-right: 2rem;*/
      border-right: 1px solid var(--wrap-border-color);

      overflow-y: scroll;
      overflow-x: hidden;
      height: calc(100vh - 70px);

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
      width: calc(100% - 10px);
      overflow-y: scroll;
      overflow-x: hidden;
      height: calc(100vh - 70px);

      .block-group {
        margin-bottom: 3rem;
        margin-top: 10px;

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
              font-size: 1.25rem;
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

  .is-dark .templates-title {
    color: var(--white-smoke);
  }

  .is-dark .components-title {
    color: var(--white-smoke);
  }

  .custom-loader {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 0 auto;
    background:
      radial-gradient(farthest-side, #0400F4 94%, #0000) top/16px 16px no-repeat,
      conic-gradient(#0000 30%, #0400F4);
    -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 16px), #000 0);
    animation: s3 1s infinite linear;
  }

  @keyframes s3 {
    100% {
      transform: rotate(1turn)
    }
  }

  .block-group-card {
    cursor: pointer;
  }

  .text-description {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    /* number of lines to show */
    max-height: 1*1;
    /* fallback */
    font-family: var(--font);
    font-size: 1.2rem;
    transition: transform 0.3s, opacity 0.3s;
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
        width: calc(100% - 100px);
        /*calc(100% - 240px);*/
        padding: 0 50px;
      }
    }
  }

  .api-items {
    height: 150px;
  }
</style>
