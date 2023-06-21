<script setup lang="ts">
  import { ref, computed } from 'vue'
  import type { Nft } from '/@src/types'
  import { nFormatter } from '/@src/utils/nFormatter'

  import { viaPlaceholderErrorHandler } from '/@src/utils/viaPlaceholderErrorHandler'

  export interface NftCardProps {
    flat ? : boolean
    profile: {}
  }

  const props = withDefaults(defineProps < NftCardProps > (), {
    flat: false,
    profile: {}
  })


  const cardClasses = computed(() => [props.flat && 'is-flat'])


  const second = 1000
  const minute = second * 60
  const hour = minute * 60
  const day = hour * 24

  const currentSeconds = ref(0)
  const currentMinutes = ref(0)
  const currentHours = ref(0)
  const currentDays = ref(0)

  const nextroute = ref([{
    to: '/team/backend-developer'
  }])

  //This commented block is used to get the auction end date from props
  //const event = `${props.content.auctionEnd} 00:00:00`
  //const countDown = new Date(event).getTime()

  //This generates a random countdown adding a random number of days to a now date
  const randomDays = Math.floor(Math.random() * 11)
  const countDown = new Date(
    Date.now() + randomDays * (3600 * 1000 * 24)
  ).getTime()

  const x = setInterval(() => {
    const now = new Date().getTime()
    const distance = countDown - now

    currentDays.value = Math.floor(distance / day)
    currentHours.value = Math.floor((distance % day) / hour)
    currentMinutes.value = Math.floor((distance % hour) / minute)
    currentSeconds.value = Math.floor((distance % minute) / second)

    //do something later when date is reached
    if (distance < 0) {
      //do something later when date is reached

      clearInterval(x)
    }
    //seconds
  }, 0)
</script>

<template>

  <div class="nft-card" :class="cardClasses">
    <div class="card-image">
      <img :src="props.profile.avatar" alt="avatar" width="600" height="510" class="skeleton" @error.once="(event) => viaPlaceholderErrorHandler(event, `600x510`)" />


      <RouterLink :to="nextroute[0].to" class="details">
        <i-uiw-star-on class="rem-70" />
      </RouterLink>

    </div>

    <div class="card-info-container">
      <RouterLink class="fullname" :to="`/team/developer?id=${props.profile.id}`">
        <Title tag="h3" :size="5" weight="semi" class="mb-1">{{ props.profile.fullname }}</Title>
        <p tag="h3" class="mb-3 paragraph">{{ props.profile.experiences[0].description }}</p>
        <Title tag="h3" :size="5" weight="semi" class="mb-1">{{ props.profile.address.country }}</Title>
        <div class="icon-list-stars">
          <div class="stars-container">
            <i class="iconify text-light mb-4" data-icon="typcn:star"></i>
            <i class="iconify text-light mb-4" data-icon="typcn:star"></i>
            <i class="iconify text-light mb-4" data-icon="typcn:star"></i>
            <i class="iconify text-light mb-4" data-icon="typcn:star"></i>
            <i class="iconify text-light mb-4" data-icon="typcn:star"></i>
          </div>
          <Title tag="h3" :size="6" weight="semi" class="mb-1">{{ props.profile.rate }}</Title>
        </div>
        <Title tag="h3" :size="6" weight="semi" class="mb-1">{{ props.profile.rangosalarial.rango + '&nbsp;$USD'}}</Title>
      </RouterLink>
      <!--RouterLink :to="`?category=${props.profile.category}`">
        <Title tag="h3" :size="6" weight="semi" style="color:#888">{{props.profile.category}}</Title>
      </RouterLink-->
    </div>
    <div class="card-foot">

    </div>

  </div>
</template>

<style scoped lang="scss">
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

  .card-info-container p {
    text-decoration: none;
    color: var(--medium-text);
    font-weight: 400;
    opacity: 0.7;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    /* number of lines to show */
    transition: transform 0.3s, opacity 0.3s;
    -webkit-line-clamp: none;
  }

  .is-dark .description p {
    color: var(--white-smoke);
  }

  .card-info-container .country {
    font-size: 2rem;
  }

  .nft-card {
    background: var(--card-bg-color);
    border: 1px solid var(--card-border-color);
    border-radius: 1.25rem;
    padding: 0.7rem;
    box-shadow: var(--spread-shadow);
    text-align: left;
    overflow: hidden;
    transition: box-shadow 0.3s;

    .card-image {
      position: relative;

      >img {
        display: block;
        border-radius: 1rem;
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