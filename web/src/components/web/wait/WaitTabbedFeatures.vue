<script setup lang="ts">
  import { viaPlaceholderErrorHandler } from '/@src/utils/viaPlaceholderErrorHandler'
  import { textBenefits } from '/@src/texts/wait'
</script>

<template>
  <!--<div class="mx-auto max-w-9">-->
  <div class="container">
    <Tabs alignment="centered" :tabs="textBenefits.labels">
      <template #tab="{ selected }">
        <div v-if="selected === 'javascript'">
          <div class="columns is-vcentered b-columns-half-tablet-p">
            <div class="column is-6">
              <div class="image-block">
                <img class="main-image" src="/assets/wait/wait_picture3.avif" alt="featured image" width="400" height="400" />
                <div class="small-image-holder">
                  <img src="/assets/wait/wait_picture2.avif" alt="featured image" width="400" height="400" />
                </div>
                <div class="tiny-image-holder">
                  <img src="/assets/wait/wait_picture1.avif" alt="featured image" width="400" height="400" />
                </div>
              </div>
            </div>
            <div class="column is-5 is-offset-1 px-10 px-sm-0">
              <Title tag="h2" :size="4" weight="bold">
                {{ $t('textBenefitsDataTitle0') }}
              </Title>
              <p class="paragraph  mb-4 is-size-5">
                {{ $t('textBenefitsDataContent0') }}
              </p>
              <hr />
              <div v-for="(benefit, index) in textBenefits.benefits" :key="index" class="benefit mb-2">
                <i class="iconify" data-icon="feather:check"></i>
                <span class="is-weight-500 pl-2 pr-4">{{ $t('benefits' + index) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="selected === 'development'">
          <div class="columns is-vcentered b-columns-half-tablet-p">
            <div class="column is-6">
              <div class="image-block">
                <img class="main-image" src="/assets/wait/wait_freelancer2.avif" alt="featured image" width="400" height="400" @error.once="
                    (event) => viaPlaceholderErrorHandler(event, `400x400`)
                  " />
                <div class="small-image-holder">
                  <img src="/assets/wait/wait_freelancer3.avif" alt="featured image" width="400" height="400" @error.once="
                      (event) => viaPlaceholderErrorHandler(event, `400x400`)
                    " />
                </div>
                <div class="tiny-image-holder">
                  <img src="/assets/wait/wait_freelancer1.avif" alt="featured image" width="400" height="400" @error.once="
                      (event) => viaPlaceholderErrorHandler(event, `400x400`)
                    " />
                </div>
              </div>
            </div>
            <div class="column is-5 is-offset-1 px-10 px-sm-0">
              <Title tag="h2" :size="4" weight="bold">
                {{ $t('textBenefitsDataTitle1') }}
              </Title>
              <p class="paragraph is-size-5 mb-4">
                {{ $t('textBenefitsDataContent1') }}
              </p>
              <hr />
              <div v-for="(benefit, index) in textBenefits.benefits" :key="index" class="benefit mb-2">
                <i class="iconify" data-icon="feather:check"></i>
                <span class="is-weight-500 pl-2 pr-4">{{ $t('benefits_1_' + index) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="selected === 'design'">
          <div class="columns is-vcentered b-columns-half-tablet-p">
            <div class="column is-6">
              <div class="image-block">
                <img class="main-image" src="/assets/wait/wait_client1.avif" alt="featured image" width="400" height="400" @error.once="
                    (event) => viaPlaceholderErrorHandler(event, `400x400`)
                  " />
                <div class="small-image-holder">
                  <img src="/assets/wait/wait_client3.jpg" alt="featured image" width="400" height="400" @error.once="
                      (event) => viaPlaceholderErrorHandler(event, `400x400`)
                    " />
                </div>
                <div class="tiny-image-holder">
                  <img src="/assets/wait/wait_client2.avif" alt="featured image" width="400" height="400" @error.once="
                      (event) => viaPlaceholderErrorHandler(event, `400x400`)
                    " />
                </div>
              </div>
            </div>
            <div class="column is-5 is-offset-1 px-10 px-sm-0">
              <Title tag="h2" :size="4" weight="bold">
                {{ $t('textBenefitsDataTitle2') }}
              </Title>
              <p class="paragraph is-size-5 mb-4">
                {{ $t('textBenefitsDataContent2') }}
              </p>
              <hr />
              <div v-for="(benefit, index) in textBenefits.benefits" :key="index" class="benefit mb-2">
                <i class="iconify" data-icon="feather:check"></i>
                <span class="is-weight-500 pl-2 pr-4">{{ $t('benefits_2_' + index) }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Tabs>
  </div>
</template>

<style scoped lang="scss">
  .container {
    padding: 0 2rem;
    overflow-x: auto;
  }

  :deep(.tabs) {
    margin-bottom: 2rem;
  }

  .benefit {
    font-family: var(--font);
    color: var(--medium-text);
  }

  .image-block {
    position: relative;

    .main-image {
      display: block;
      width: 400px;
      height: 400px;
      object-fit: cover;
    }

    .small-image-holder {
      position: absolute;
      bottom: -40px;
      right: -15px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 200px;
      height: 200px;
      background: var(--section-bg-color);

      img {
        display: block;
        width: 180px;
        height: 180px;
        object-fit: cover;
      }
    }

    .tiny-image-holder {
      position: absolute;
      top: 25px;
      left: -50px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 120px;
      height: 120px;
      background: var(--section-bg-color);

      img {
        display: block;
        width: 105px;
        height: 105px;
        object-fit: cover;
      }
    }
  }

  @media only screen and (max-width: 767px) {
    .image-block {
      .main-image {
        max-width: 100%;
      }

      .small-image-holder {
        bottom: -20px;
        right: -50px;
        width: 140px;
        height: 140px;

        img {
          width: 120px;
          height: 120px;
        }
      }

      .tiny-image-holder {
        width: 100px;
        height: 100px;

        img {
          width: 85px;
          height: 85px;
        }
      }
    }
  }

  @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
    .image-block {
      .main-image {
        max-width: 100%;
        height: 350px;
      }

      .small-image-holder {
        bottom: -70px;
        right: 40px;
        width: 140px;
        height: 140px;

        img {
          width: 120px;
          height: 120px;
        }
      }

      .tiny-image-holder {
        width: 100px;
        height: 100px;

        img {
          width: 85px;
          height: 85px;
        }
      }
    }
  }
</style>
