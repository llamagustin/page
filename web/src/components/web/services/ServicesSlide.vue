<script setup lang="ts">
import { titleDemo } from '/@src/texts/tool/web'

import type { Ref, ComputedRef } from 'vue'
import { ref, computed } from 'vue'
import { debouncedWatch } from '@vueuse/core'
import { useDarkmode } from '/@src/stores/darkmode'

import landing from '/@src/texts/tool/web/landing'

export interface DemoItem {
  name: string
  category: string
  keywords: string
  displayOrder: number
  new: boolean
  route: {
    name: string
    path: string
  }
  screenshot: {
    light: string
    dark: string
  }
}

const props = defineProps({
    slide: {}
})

const darkmode = useDarkmode()


function generateFeatureRequestLink(name: string) {
  return `https://github.com/cssninjaStudio/vulk-public/issues/new?assignees=&labels=feature-request%2Ctriage&template=feature_request.yml&title=%5BFeature%5D%3A+%20${name}`
}

function displayOrder(
  a: { displayOrder: number },
  b: { displayOrder: number }
) {
  if (a.displayOrder < b.displayOrder) {
    return -1
  }
  if (a.displayOrder > b.displayOrder) {
    return 1
  }
  return 0
}

const landingDemos = landing.sort(displayOrder) as DemoItem[]
//const aboutDemos = about.sort(displayOrder) as DemoItem[]
//const pricingDemos = pricing.sort(displayOrder) as DemoItem[]
//const blogDemos = blog.sort(displayOrder) as DemoItem[]
//const subDemos = sub.sort(displayOrder) as DemoItem[]
//const authDemos = auth.sort(displayOrder) as DemoItem[]
//const layoutsDemos = layouts.sort(displayOrder) as DemoItem[]

const totalDemos = landingDemos.length
//aboutDemos.length
//pricingDemos.length +
//blogDemos.length +
//subDemos.length +
//authDemos.length +
//layoutsDemos.length

const filterInput = ref('')

const searchLabel = computed(() => {
  if (!filterInput.value) {
    return `Search in the ${totalDemos} demos`
  }

  if (!totalResults.value) {
    return `Oops, no demo available for "${filterInput.value}" yet!`
  }

  return `${totalResults.value} demos over ${totalDemos} match your request!`
})

// We use debouncedWatch to debounce the filter input
debouncedWatch(
  filterInput,
  () => {
    if (filterInput.value.length < 3) {
      return
    }

    // gtag and is injected via vite-plugin-radar
    if (window && window.gtag) {
      window.gtag('event', 'search', {
        search_term: filterInput.value,
      })
      //console.log(window.dataLayer)
    }
  },
  { debounce: 300 }
)

  const emit = defineEmits(['handleTemplate'])

const handleTemplate = ()=>{
  emit('handleTemplate')
}
</script>

<template>
  <div class="vulk-demos">

    <!--Landing pages-->
    <div v-if="true" class="demo-section">


      <div class="columns is-multiline">
        <!-- Demo item -->
        <div class="column is-12 has-text-centered">
          <figure
            class="vulk-demo-wrapper loaded"
            tabindex="0"
            @keydown.space.prevent="(e) => ((e.target as HTMLElement).querySelector('a[href]') as HTMLAnchorElement)?.click()"
          >
            <span v-if="props.slide.new" class="new-tag">New</span>
            <img
              v-if="!darkmode.isDark"
              :src="props.slide.screenshotlight"
              alt="Demo screenshot"
              loading="lazy"
            />
            <img
              v-else
              :src="props.slide.screenshotdark"
              alt="Demo screenshot"
              loading="lazy"
            />
            <div class="circle-overlay"></div>
            <div class="demo-info has-text-centered">
              <div class="wrapper">
                <div class="demo-title">
                  <span>{{ props.slide.category }}</span>
                  <span>{{ props.slide.name }}</span>
                </div>
                <div class="demo-link">
                  <!--:href="'https://api.aythen.com/template/' + props.slide.route"-->
                  <!--Button
                    class="button-demo"
                    target="_blank"
                    :href="props.slide.urltemplate"
                    tabindex="-1"
                  >
                    {{ titleDemo[0].button }}
                    <i
                      aria-hidden="true"
                      class="iconify"
                      data-icon="feather:arrow-right"
                    ></i>
                  </Button-->
                    <Button @click="handleTemplate" size="xs"  color="primary" raised bold>
                      Show Template
                    </Button>
                </div>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
.button-demo {
  color: #000;
  background: transparent !important;
  border: none !important;
}
</style>

<style lang="scss" scoped>
.demo-search-section {
  margin: 2rem 0;

  &:deep(.label) {
    text-align: center !important;
  }

  :deep(.input) {
    width: 100%;
    height: 44px;
    padding-left: 44px;
    box-shadow: none;
    font-family: var(--font);
    background: var(--input-base-bg-color);
    border-color: var(--input-base-border-color);
    color: var(--input-base-color);
    transition: border 0.3s, box-shadow 0.3s;

    &::placeholder {
      color: var(--input-placeholder-color);
    }

    &:focus {
      box-shadow: var(--light-box-shadow);
    }
  }

  :deep(.form-icon) {
    height: 44px !important;
    width: 44px !important;
  }
}

.vulk-demos {
  .demo-section {
    margin-bottom: 50px;

    .demo-section-title {
      display: flex;
      align-items: center;
      margin-bottom: 30px;

      img {
        display: block;
        width: 100%;
        max-width: 100px;
        margin-bottom: 0;
      }

      .title-meta {
        margin-left: 12px;
        line-height: 1.2;

        h3 {
          font-family: var(--font-alt);
          font-weight: 500;
          font-size: 1.3rem;
          color: var(--title-color);
        }

        p {
          font-family: var(--font);
          font-size: 0.95rem;
          color: var(--light-text);
        }
      }
    }
  }
}

.vulk-demo-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid var(--fade-grey-dark-5);
  min-height: 205px;
  max-height: 205px;

  &:focus-visible {
    outline-offset: var(--accessibility-focus-outline-offset);
    outline-width: var(--accessibility-focus-outline-width);
    outline-color: var(--accessibility-focus-outline-color);
    //outline-style: var(--accessibility-focus-outline-style);
  }

  &:hover {
    .circle-overlay {
      transform: scale(35);
    }

    .demo-title {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 0 !important;
    }

    .demo-link {
      color: var(--white);
      opacity: 1;
      transform: translateY(0);
      transition-delay: 0 !important;
    }
  }

  img {
    border-radius: 10px;
    max-width: 100%;
    width: 100%;
    border: 1px solid var(--card-border-color);
  }

  .new-tag {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: red;
    color: var(--white);
    font-family: var(--font);
    padding: 6px 16px;
    border-radius: 8px;
    text-transform: uppercase;
    font-size: 0.8rem;
    z-index: 3;
  }

  .circle-overlay {
    position: absolute;
    top: -60px;
    left: -60px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: var(--primary);
    transform: scale(1);
    transition: all 0.5s;
    z-index: 1;
  }

  .demo-info {
    position: absolute;
    margin: 0 auto;
    top: 26%;
    left: 0;
    right: 0;
    z-index: 2;
    color: var(--white);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .demo-title {
    color: var(--white);
    font-family: var(--font);
    font-size: 1.5rem;
    font-weight: 600;
    opacity: 0;
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--primary-light-20);
    transform: translateY(20px);
    transition: all 0.3s;
    transition-delay: 0.1s;

    span {
      display: block;

      &:first-child {
        text-transform: uppercase;
        font-size: 0.75rem;
      }

      &:nth-child(2) {
        font-weight: 300;
      }
    }
  }

  .demo-link {
    opacity: 0;
    transform: translateY(20px);
    transition: transform 0.3s, opacity 0.3s, color 0.3s;
    transition-delay: 0.2s;

    a {
      font-family: var(--font);
      color: var(--white);
      font-size: 1rem;
      margin-left: 8px;

      .iconify {
        position: relative;
        vertical-align: middle;
        opacity: 0;
        transform: translateX(0);
        transition: all 0.3s ease-out;
      }

      &:hover .iconify {
        opacity: 1;
        transform: translateX(5px);
      }
    }
  }
}

@media (max-width: 767px) {
  .vulk-demo-wrapper {
    min-height: 184px;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
  .vulk-demos {
    .demo-section {
      .columns {
        display: flex;

        .column.is-4 {
          min-width: 50% !important;
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  .vulk-demo-wrapper {
    min-height: 174px;
  }
}
</style>
