<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { viaPlaceholderErrorHandler } from '/@src/utils/viaPlaceholderErrorHandler'

  export interface NftCardProps {
    profile: {
      id: number
      fullname: string
      address: {
        country: string
      }
      rangoSalarial: {
        rango: string
      }
      category: string
    }
  }

  const props = withDefaults(defineProps < NftCardProps > (), {
    profile: {
      id: 0,
      fullname: "John Doe",
      address: {
        country: "United Kingdom"
      },
      rangosalarial: {
        rango: "1200 - 1500"
      },
      category: "Developer"
    }
  })
</script>

<template>
  <div class="nft-card">
    <div class="card-header">
      <div class="card-image">
        <img :src="props.profile.avatar" alt="avatar" class="skeleton" @error.once="(event) => viaPlaceholderErrorHandler(event, `600x510`)" />
        <!--<img src="https://thispersondoesnotexist.com/" alt="avatar" width="600" height="510" class="skeleton" @error.once="(event) => viaPlaceholderErrorHandler(event, `600x510`)" />-->
      </div>
      <div class="card-header-body">
        <RouterLink class="fullname" :to="`/team/developer?id=${props.profile.id}`">
          <Text>{{ props.profile.fullname }}</Text>
        </RouterLink>
        <p class="paragraph mb-1">{{ props.profile.address.country }}</p>
      </div>
    </div>
    <div class="card-info-container">
      <p class="medium-text">{{ `${props.profile.rangosalarial.min} - ${props.profile.rangosalarial.max} &nbsp;$USD` }}</p>
      <RouterLink :to="`?category=${props.profile.category}`">
        <Text style="color: #888;">{{props.profile.category}}</Text>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
  a {
    width: fit-content;
  }

  .card-header {
    display: flex;
  }
  
  .card-header-body {
    margin-left: 1rem;
    
    p {
      font-size: 0.7rem;
    }
  }
  
  .icon-list-stars {
    display: flex;
    column-gap: 10px;
    align-items: center;
  }

  .icon-list-stars .stars-container {
    display: flex;
    align-items: center;
    margin-top: 7px;
  }

  .icon-list-stars .stars-container .iconify {
    color: orange !important;
    font-size: 1.3rem;
    text-align: center;
  }

  .card-info-container {
    display: grid;
    gap: 10px;
  }

  .card-info-container {
    overflow: hidden;
  }
  
  .card-info-container .medium-text {
    display: block;
    font-weight: 700;
    font-family: var(--font-main);
    color: var(--title-color);
  }
  
  .nft-card {
    text-align: left;
    overflow: hidden;

    .card-image {
      position: relative;

      &>img {
        width: 5rem;
        height: 5rem;
        display: block;
        /*border-radius: 1rem;*/
        margin-bottom: 0.75rem;
      }

      .likes {
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
        display: flex;
        align-items: center;
        padding: 0.25rem 0.5rem;
        border-radius: 10rem;
        background: var(--wrap-bg-color);

        svg {
          vertical-align: middle;
          margin-right: 0.25rem;
        }

        span {
          font-size: 0.75rem;
          font-family: var(--font-alt);
          font-weight: 600;
          color: var(--title-color);
        }
      }

      .details {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 26px;
        width: 26px;
        border-radius: 50%;
        background: var(--wrap-bg-color);
        color: var(--light-text);
        opacity: 0;
        transform: translateY(5px);
        pointer-events: none;
        transition: transform 0.3s, opacity 0.3s;

        svg {
          vertical-align: middle;
        }
      }

      .auction-timer {
        position: absolute;
        bottom: 1rem;
        left: 0;
        right: 0;
        width: 100%;
        max-width: 160px;
        height: 36px;
        margin: 0 auto;

        .timer-inner {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          padding: 0 1rem;

          .inner-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--dark-bg);
            border-radius: 0.85rem;
            opacity: 0.4;
            transition: opacity 0.3s;
          }
        }

        .timer-block {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 36px;
          font-family: var(--font);
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--white-smoke);
          padding: 0 0.25rem;

          &.is-separator {
            padding: 0;
          }
        }
      }
    }

    .card-head {
      display: flex;
      align-items: center;
      padding: 0 0.25rem;

      :deep(.title) {
        line-height: 1;
        transition: opacity 0.3s;
      }

      :deep(.avatar) {
        margin-right: 0.5rem;
      }

      a {
        &:hover {
          :deep(.title) {
            opacity: 0.9;
          }
        }
      }
    }

    .card-foot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 0.25rem 0.5rem;

      .bid {
        position: relative;

        span {
          display: block;
          font-family: var(--font-alt);
        }

        .bid-label {
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--light-text);
        }

        .bid-value {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--title-color);
        }

        .bid-action {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          opacity: 0;
          transform: translateY(60px);
          transition: transform 0.3s, opacity 0.2s;

          :deep(.button) {
            min-height: 38px;
            font-size: 0.9rem;
          }
        }
      }
    }

    &:hover {
      .card-image {
        .auction-timer {
          .timer-inner {
            .inner-bg {
              opacity: 0.6;
            }
          }
        }

        .details {
          pointer-events: all;
          opacity: 1;
          transform: translateY(0);
        }
      }

      .card-foot {
        .bid {
          .bid-action {
            transform: translateY(0);
            opacity: 1;
          }
        }
      }
    }

    &.is-flat {
      box-shadow: none;

      &:hover {
        box-shadow: var(--spread-shadow);
      }
    }
  }
</style>
