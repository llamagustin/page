<script setup lang="ts">

export interface HelpCenterCategoryCardProps {
  article: any,
  type: String
}

const props = defineProps<HelpCenterCategoryCardProps>()


</script>

<template>
  <div class="flex-card category-card light-bordered">
    <div class="card-body">
      <RouterLink
        :to="'/help/article/' + props.type + '-' + props.article.link"
      >
        <div class="inner-content">
          <div class="flex">
              <div class="icon"  >
                <i class="iconify" :data-icon="props.article.icon"></i>
              </div>
              <Title tag="h3" :size="4" weight="thin" leading>
                <span style="color:var(--myColor)">{{ props.article.title }} </span>
              </Title>
          </div>
          <div class="inner-text">
            <span>
              {{ props.article.text }}
            </span>
          </div>
          <div class="card-meta">
            <div class="meta-info">
              <div class="articles-number">
                {{ props.article.subarticles.length }} articles in this section
              </div>
            </div>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.iconify {
  color:var(--myColor) !important;
}
.category-card {
  background: var(--card-bg-color);
  padding: 1rem;
  border: 1px solid var(--card-border-color);
  border-radius: 0.85rem;
  box-shadow: none;
  transition: box-shadow 0.3s, transform 0.3s;

  .card-body {
    a {
      display: flex;

      .icon {
        width: 40px;
        min-width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: -0.5rem;

        .iconify {
          font-size: 1.5rem;
          color: var(--light-text);
        }
      }

      .inner-content {
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
            color: var(--medium-text) !important;
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
  }

  &:hover {
    box-shadow: var(--spread-shadow);
    transform: translateY(-0.25rem);
  }
}

@media only screen and (max-width: 767px) {
  .category-card {
    padding: 1rem;

    .card-body {
      a {
        flex-direction: column;
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  .category-card {
    padding: 1rem;

    .card-body {
      a {
        .icon {
          width: 60px;
          min-width: 60px;
          height: 60px;

          .iconify {
            font-size: 2.25rem;
          }
        }
      }
    }
  }
}
</style>
