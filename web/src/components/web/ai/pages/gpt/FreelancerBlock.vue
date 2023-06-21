<script setup lang="ts">
import { computed } from 'vue'

import { viaPlaceholderErrorHandler } from '/@src/utils/viaPlaceholderErrorHandler'
import type { SocialLink } from '/@src/types'

export interface TeamBlockFItem {
  image: string
  name: string
  position: string
  bio: string
  socialLinks: SocialLink[]
}

export interface TeamBlockFProps {
  items: TeamBlockFItem[]
  limit?: number
  squared?: boolean
  bubbles?: boolean
  animated?: boolean
}

const props = withDefaults(defineProps<TeamBlockFProps>(), {
  limit: 6,
  squared: false,
  bubbles: false,
  animated: false,
})

const blockClasses = computed(() => [
  props.squared && `is-squared`,
  props.animated && `is-animated`,
])
</script>

<template>
  <div class="team-block py-2 px-4" :class="blockClasses">
    <div class="columns is-multiline b-columns-half-tablet-p">
      <div
        v-for="(item, index) in props.items.slice(0, props.limit)"
        :key="index"
        class="column is-6"
      >
        <div class="team-block-item media is-align-items-center mb-8">
          <div class="media-content">
            <div class="media-header">
              <div class="media-image">
                <img
                  class="block size-34x34"
                  :src="item.image"
                  alt="Team member photo"
                  height="40"
                  width="40"
                  @error.once="(event) => viaPlaceholderErrorHandler(event, '120x120')"
                />
              </div>
              <div>
                <Title tag="h3" :size="7" weight="semi" narrow>
                  <span>{{ item.name }}</span>
                </Title>
                <p class="paragraph rem-85">{{ item.position }}</p>
              </div>
            </div>
            <div>
              <p class="paragraph bio rem-85 mb-1 text-light">{{ item.bio }}</p>
            </div>
            <div class="is-flex">
              <RouterLink
                v-for="(link, i) in item.socialLinks"
                :key="i"
                :to="link.url"
                target="_blank"
                class="mr-2"
              >
                <i class="iconify" :data-icon="link.icon" ></i>
                <span class="is-sr-only">{{ link.name }}</span>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.team-block {
  .team-block-item {
    align-items: center;

    .media-image {
      position: relative;

      img {
        position: relative;
        border-radius: 50%;
        z-index: 2;
      }
    }

    .media-content {
      .media-header{
        display: flex;
        gap: 10px;
        
        .media-image{
          width:34px;
          height:34px;
          
          img{
            width: 34px;
            height: 34px;
            border-radius: 6px;
          }
        }
      }
      
      .bio {
        max-width: 250px;
      }

      a {
        &:hover {
          color: var(--primary-light-12);
        }
      }
    }
  }

  &.is-animated {
    .team-block-item {
      .media-image {
        &::after {
          content: '';
          position: absolute;
          top: calc(50% - 18px);
          left: calc(50% - 18px);
          height: 36px;
          width: 36px;
          border-radius: 10px;
          background: var(--primary);
          animation: waves 1.6s infinite;
          animation-duration: 1s;
          transform-origin: center center;
          z-index: 0;
          opacity: 0.2;
        }
      }
    }
  }

  /*&.is-squared {*/
    /*.team-block-item {*/
    /*  .media-left {*/
    /*    img {*/
    /*      border-radius: 1.5rem;*/
    /*    }*/
    /*  }*/
    /*}*/

  /*  &.is-animated {*/
  /*    .team-block-item {*/
  /*      .media-header {*/
  /*        &::after {*/
  /*          border-radius: 0.5rem !important;*/
  /*        }*/
  /*      }*/
  /*    }*/
  /*  }*/
  /*}*/
}


@keyframes waves {
  0% {
    height: 36px;
    width: 36px;
  }
  100% {
    height: 44px;
    width: 44px;
    top: calc(50% - 22px);
    left: calc(50% - 22px);
  }
}


.iconify{
  color: #000;
  color: #aeaeae40;
}
</style>