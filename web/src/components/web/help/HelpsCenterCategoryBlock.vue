<script setup lang="ts">

  import {ref,watch} from 'vue'

  export interface HelpCenterCategoryBlockProps {
    article?: any
    subarticle?: any
    type?: String
  }
  
  const props = defineProps<HelpCenterCategoryBlockProps>()

  watch(props,val=>{
    const iconElement = document.getElementById('iconArt')
    iconElement.setAttribute('data-icon', props.article.icon)
    iconElement.style.color = props.article.iconColor
    
  })


function getID(article){
  
  if(article.resume.length>0)
    return article.resume[0].id;
  else{
    return article.number
    
  }
}
  
</script>

<template>
  <div v-if="article" class="help-container">
    <div class="help-toolbar">
      <a
        class="back-link"
        @click.prevent="$router.push('/help')"
        @keydown.space.prevent="$router.push('/help')"
      >
        <i-ph-arrow-left-bold />
        <span>Back</span>
      </a>
    </div>
    <div class="help-container-bg">
      <div class="category-header">
        <div class="icon" :style="{borderColor: props.article.iconColor}">
          <i id="iconArt" :data-icon="props.article.icon" class="iconify" :style="{color: props.article.iconColor}" />
        </div>
        <div class="inner-content">
          <Title tag="h2" :size="3" weight="semi" leading>
            <span>{{ props.article.title }} </span>
          </Title>
          <div class="inner-text">
            {{ props.article.text }}
          </div>
        </div>
      </div>

      <div class="articles-list">
        <div v-for="(article, index) in props.subarticle" :key="index" class="help-article paragraph"> 
        {{article.title}}
          <RouterLink :to="'/help/resume/' + getID(article)" >
            <div class="inner-content">
              <Title tag="h3" :size="5" weight="semi" leading>
                <span>{{ article.title }}</span>
              </Title>
              <div class="inner-text">
                {{ article.text }}
                  
              </div>
              
              
              
            </div>
          </RouterLink>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.help-container {
  position: relative;
  max-width: 880px;
  -margin: -2rem auto 3rem;

  .help-toolbar {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    .back-link {
      display: inline-flex;
      align-items: center;
      font-family: var(--font);
      color: var(--primary);

      svg {
        vertical-align: middle;
        margin-right: 0.5rem;
        stroke: var(--primary);
        transition: transform 0.3s;
      }

      &:hover {
        svg {
          transform: translateX(-0.25rem);
        }
      }
    }
  }

  .help-container-bg {
    width: 100%;
    background: var(--wrap-muted-color-inverted);
    padding: 2rem 0rem;
    border-radius: 1rem;
  }

  .category-header {
    display: flex;
    padding: 0 2rem 1rem;
    z-index: 2;

    .icon {
      border: 1px solid #000;
      border-radius: 20px;
      width: 90px;
      min-width: 90px;
      height: 90px;
      display: flex;
      align-items: center;
      justify-content: center;

      .iconify {
        font-size: 3rem;
        color: var(--light-text);
      }
    }

    .inner-content {
      padding-left: 1.25rem;

      .inner-text {
        font-family: var(--font);
        font-size: 0.95rem;
        color: var(--medium-text);
      }

      .card-meta {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-top: 12px;

        .small-avatar {
          height: 34px;
          width: 34px;
          border-radius: 50%;
          margin-right: 10px;
          border: 2px solid var(--card-bg-color);
          position: relative;

          &:not(:first-child) {
            margin-left: -19px;
          }

          &:first-child {
            z-index: 3;
          }

          &:nth-child(2) {
            z-index: 2;
          }

          &:nth-child(3) {
            z-index: 1;
          }

          &:nth-child(4) {
            z-index: 0;
          }

          &.is-more {
            display: flex;
            justify-content: center;
            align-items: center;
            color: var(--title-color);
            background: var(--wrap-muted-color);
            font-weight: 500;
            font-size: 13px;

            span {
              position: relative;
              top: -2px;
              left: -1px;
            }
          }
        }

        .meta-info {
          color: var(--medium-text);
          font-family: var(--font);

          .articles-number {
            font-size: 0.85rem;
          }

          .authors {
            color: var(--light-text);
            font-size: 0.85rem;

            .contributor-name {
              color: var(--primary);
            }
          }
        }
      }
    }
  }

  .articles-list {
    position: relative;
    margin: 0rem 2rem;
    background: var(--card-bg-color);
    width: calc(100% - 4rem);
    border-radius: 0.75rem;
    border: 1px solid var(--card-border-color);

    .help-article {
      padding: 30px;

      a {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .inner-content {
          .title {
            margin-bottom: 10px;
            font-weight: 400;
            color: var(--primary);
          }

          .inner-text {
            font-family: var(--font);
            font-size: 0.95rem;
            color: var(--medium-text);
          }

          .card-meta {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-top: 12px;

            .small-avatar {
              height: 34px;
              width: 34px;
              border-radius: 50%;
              margin-right: 10px;
              border: 2px solid var(--wrap-bg-color);
              position: relative;
            }

            .meta-info {
              font-family: var(--font);
              color: var(--medium-text);
              line-height: 1.1rem;

              .author {
                color: var(--light-text);
                font-size: 0.85rem;

                span {
                  color: var(--primary);
                }
              }

              .status {
                font-size: 12px;
                color: var(--light-text);
              }
            }
          }
        }
      }

      &:not(:last-child) {
        border-bottom: 1px solid var(--card-border-color);
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .help-container {
    .help-container-bg {
      padding: 1rem;

      .category-header {
        flex-direction: column;
        padding-left: 1rem;
        padding-right: 1rem;

        .icon {
          position: relative;
          left: -1rem;
        }

        .inner-content {
          padding: 0;
        }
      }
    }

    .articles-list {
      margin: 1rem;
      width: calc(100% - 2rem);

      .help-article {
        padding: 1.25rem;
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
  .help-container {
    .help-container-bg {
      padding: 3rem 1.75rem 1.75rem;
    }
  }
}
</style>
