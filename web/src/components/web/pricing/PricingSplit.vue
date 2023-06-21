<script setup lang="ts">
  import { ref } from 'vue'

  export interface PremiumFeature {
    title: string
    text: string
  }

  export interface PricingRegularPlan {
    logo: string
    name: string
    price: string
    priceLabel: string
    features: string[]
  }

  export interface PricingSplitPropsPremiumPlan {
    logo: string
    name: string
    features: PremiumFeature[]
  }

  export interface PricingSplitProps {
    text: object
    regularPlans: PricingRegularPlan[]
    premiumPlan: PricingSplitPropsPremiumPlan
    /*
    regularLabel: string
    premiumLabel: string
    regularSublabel: string
    premiumSublabel: string
    */
  }

  const props = withDefaults(defineProps < PricingSplitProps > (), {
    regularPlans: () => [],
  })

  const redirectToTeamOffer = () => {
    window.location.href = '/team/offer/';
  }

  const activePricing = ref('monthly')
</script>

<template>
  <div class="pricing-split">
    <div class="pricing-solo-head">
      <div class="billing-selector">
        <div class="billing-selector-inner">
          <button :class="activePricing === 'monthly' && 'is-active'" @click="activePricing = 'monthly'">
            {{ $t('pricingMonth_text') }}
          </button>
          <button :class="activePricing === 'yearly' && 'is-active'" @click="redirectToTeamOffer">
            {{ $t('pricingAnual_text') }}
          </button>
          <div class="naver"></div>
        </div>
      </div>
    </div>

    <div class="split-card">
      <div class="split-card-left">
        <div class="split-card-head">
          <Title tag="h2" :size="4" weight="semi" leading>
            <span>{{ $t('pricingService_text0') }}</span>
          </Title>
          <p class="paragraph">{{ $t('pricingService_text1') }}</p>
        </div>
        <div class="split-card-body">
          <div class="left-plans">
            <div v-for="(plan, index) in props.regularPlans.slice(0, 3)" :key="index" class="left-plan ">
              <div class="plan-logo">
                <svg v-if="index===0" xmlns="http://www.w3.org/2000/svg" width="55" fill="var(--title-color)" viewBox="0 0 256 256">
                  <path d="M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.42,29.84l85.62,40.55,40.55,85.62A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14L118.42,148.9l47.24-47.25a8,8,0,0,0-11.31-11.31L107.1,137.58,24,98.22l.14,0L216,40Z"></path>
                </svg>
                <svg v-if="index===1" xmlns="http://www.w3.org/2000/svg" width="55" fill="var(--title-color)" viewBox="0 0 256 256">
                  <path d="M235.58,128.84,160,91.06V48a32,32,0,0,0-64,0V91.06L20.42,128.84A8,8,0,0,0,16,136v32a8,8,0,0,0,9.57,7.84L96,161.76v18.93L82.34,194.34A8,8,0,0,0,80,200v32a8,8,0,0,0,11,7.43l37-14.81,37,14.81A8,8,0,0,0,176,232V200a8,8,0,0,0-2.34-5.66L160,180.69V161.76l70.43,14.08A8,8,0,0,0,240,168V136A8,8,0,0,0,235.58,128.84ZM224,158.24l-70.43-14.08A8,8,0,0,0,144,152v32a8,8,0,0,0,2.34,5.66L160,203.31v16.87l-29-11.61a8,8,0,0,0-5.94,0L96,220.18V203.31l13.66-13.65A8,8,0,0,0,112,184V152a8,8,0,0,0-9.57-7.84L32,158.24v-17.3l75.58-37.78A8,8,0,0,0,112,96V48a16,16,0,0,1,32,0V96a8,8,0,0,0,4.42,7.16L224,140.94Z"></path>
                </svg>
                <svg v-if="index===2" xmlns="http://www.w3.org/2000/svg" width="55" fill="var(--title-color)" viewBox="0 0 256 256">
                  <path d="M152,224a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h32A8,8,0,0,1,152,224ZM128,112a12,12,0,1,0-12-12A12,12,0,0,0,128,112Zm95.62,43.83-12.36,55.63a16,16,0,0,1-25.51,9.11L158.51,200h-61L70.25,220.57a16,16,0,0,1-25.51-9.11L32.38,155.83a16.09,16.09,0,0,1,3.32-13.71l28.56-34.26a123.07,123.07,0,0,1,8.57-36.67c12.9-32.34,36-52.63,45.37-59.85a16,16,0,0,1,19.6,0c9.34,7.22,32.47,27.51,45.37,59.85a123.07,123.07,0,0,1,8.57,36.67l28.56,34.26A16.09,16.09,0,0,1,223.62,155.83ZM99.43,184h57.14c21.12-37.54,25.07-73.48,11.74-106.88C156.55,47.64,134.49,29,128,24c-6.51,5-28.57,23.64-40.33,53.12C74.36,110.52,78.31,146.46,99.43,184Zm-15,5.85Q68.28,160.5,64.83,132.16L48,152.36,60.36,208l.18-.13ZM208,152.36l-16.83-20.2q-3.42,28.28-19.56,57.69l23.85,18,.18.13Z"></path>
                </svg>

              </div>
              <div class="plan-name">
                <span>{{ $t('pricingPlan_name' + index)}}</span>
              </div>
              <div class="plan-price">
                <span>{{ plan.priceLabel }}</span>
                <h3 v-if="activePricing === 'monthly'">{{ $t('pricingPlan_price' + index) }}</h3>
                <h3 v-else>{{ plan.price.annually }}</h3>
              </div>
              <div class="plan-features">
                <div v-for="(feature, f) in plan.features" :key="f" class="plan-feature">
                  <p>{{ feature }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="split-card-action">
          <Buttons alignment="centered">
            <Button :href="props.text.to" color="primary" raised bold>
              {{ props.text.regularLabel }}
            </Button>
          </Buttons>
          <p class="paragraph rem-85">{{ props.text.regularSublabel }}</p>
        </div>
      </div>
      <div v-background="{src: '/assets/shapes/lowpoly-pattern.png',placeholder: 'https://dummyimage.com/1920x1080/ededed/000000',}" class="split-card-right">
        <div class="split-card-head">
          <Title tag="h2" :size="4" weight="semi" inverted leading>
            <span>{{ props.premiumPlan.name }}</span>
          </Title>
          <p class="paragraph is-inverted-light">
            {{ props.premiumPlan.text }}
          </p>
        </div>
        <div class="split-card-body">
          <div class="right-plan">
            <!--div class="plan-logo">
              < img :src="props.premiumPlan.logo" alt="Plan logo" />
            </div-->
            <div class="plan-features">
              <div v-for="(item, i) in props.premiumPlan.features.slice(0, 5)" :key="i" class="plan-feature">
                <h3>{{ $t('pricingPremiumPlanTitle' + i) }}</h3>
                <p>
                  {{ $t('pricingPremiumPlanText' + i) }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="split-card-action">
          <Buttons alignment="centered">
            <Button to="/team/jobs" bold>{{ props.text.premiumLabel }}</Button>
          </Buttons>
          <p class="paragraph rem-85">{{ props.text.premiumSublabel }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .imagePricing {
    color: var(--title-color) !important;
  }

  .colorIcon {

    fill: var(--title-color) !important;
  }

  .pricing-solo-head {
    margin-bottom: 2rem;

    .billing-selector {
      max-width: 400px;
      margin: 0 auto;

      .billing-selector-inner {
        background-color: rgba(0, 0, 0, 0.03);
        position: relative;
        width: 100%;
        display: flex;
        border: 1px solid var(--input-base-border-color);
        border-radius: 50rem;

        button {
          position: relative;
          font-size: 1rem;
          font-family: var(--font);
          font-weight: semibold;
          color: var(--medium-text);
          padding: 0;
          border: none;
          background: none;
          width: 50%;
          min-height: 50px;
          z-index: 1;
          cursor: pointer;

          &.is-active {
            color: var(--title-color);

            &:first-child~.naver {
              margin-left: 0;
            }

            &:nth-child(2)~.naver {
              margin-left: 50%;
            }
          }
        }

        .naver {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 50%;
          margin-left: 0;
          border-radius: 50rem;
          background: var(--card-bg-color);
          box-shadow: var(--spread-shadow);
          pointer-events: none;
          z-index: 0;
          transition: margin 0.3s ease-in-out;
        }
      }
    }
  }

  .pricing-split {
    position: relative;

    .split-card {
      display: flex;
      align-items: stretch;
      overflow: hidden;
      border-radius: 0.65rem;
      -border: 0px solid var(--card-border-color);
      box-shadow: var(--spread-shadow);

      .split-card-left {
        display: flex;
        flex-direction: column;
        gap: 20px;
        flex-grow: 1;
        height: inherit;
        width: 65%;
        background: var(--card-bg-color);
        padding: 3rem 1rem;
      }

      .split-card-right {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        height: inherit;
        width: 35%;
        background: var(--section-bg-color-dark);
        padding: 3rem 1rem;
      }

      .split-card-head {
        text-align: center;
        margin-bottom: 2rem;
      }

      .left-plans {
        display: flex;
        align-items: stretch;
        margin-bottom: 3rem;

        .left-plan {
          text-align: center;
          width: 33.3%;
          padding: 0 0.75rem;

          .plan-logo {
            margin-bottom: 1rem;

            img {
              display: block;
              max-width: 50px;
              margin: 0 auto;
            }
          }

          .plan-name {
            margin-bottom: 2rem;
            font-family: var(--font-alt);
            font-weight: 700;
            font-size: 0.75rem;
            color: var(--title-color);
            text-transform: uppercase;
          }

          .plan-price {
            margin-bottom: 2rem;

            span {
              font-family: var(--font);
              font-size: 0.9rem;
              color: var(--light-text);
            }

            h3 {
              font-family: var(--font);
              font-weight: 500;
              font-size: 1.35rem;
              color: var(--title-color);
            }
          }

          .plan-features {
            .plan-feature {
              font-family: var(--font);
              font-size: 0.9rem;
              color: var(--medium-text);

              &:not(:last-child) {
                margin-bottom: 1rem;
              }
            }
          }

          &:not(:last-child) {
            -border-right: 1px solid var(--card-border-color);
          }
        }
      }

      .right-plan {
        .plan-logo {
          margin-bottom: 2rem;

          img {
            display: block;
            max-width: 50px;
            margin: 0 auto;
          }
        }

        .plan-features {
          --display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-content: center;
          align-items: center;
          margin-bottom: 3rem;

          .plan-feature {
            /*width: 50%;*/
            padding: 1rem;

            h3 {
              font-family: var(--font-alt);
              font-weight: 600;
              font-size: 0.75rem;
              color: var(--white-smoke);
              text-transform: uppercase;
              margin-bottom: 0.25rem;
            }

            p {
              font-size: 0.775rem;
              font-family: var(--font);
              color: var(--light-text);
              opacity: 0.8;
            }

            &:nth-child(odd) {
              -border-right: 1px solid var(--dark-bg-light-10);
            }
          }
        }
      }

      .split-card-action {
        /*margin-top: auto;*/
        align-items: center;
        text-align: center;

        :deep(.buttons) {
          margin-bottom: 0;
        }

        :deep(.button) {
          min-height: 52px;
          min-width: 240px;
        }
      }
    }
  }

  @media (max-width: 767px) {
    .pricing-split {
      .split-card {
        flex-direction: column;

        .split-card-left,
        .split-card-right {
          width: 100%;
        }

        .left-plans {
          flex-wrap: wrap;

          .left-plan {
            min-width: 100%;
            max-width: 100%;
            border-right: none !important;

            &:not(:last-child) {
              margin-bottom: 2rem;
              padding-bottom: 2rem;
              border-bottom: 1px solid var(--card-border-color);
            }
          }
        }

        .right-plan {
          .plan-features .plan-feature {
            width: 100%;
            border-right: none !important;
          }
        }
      }
    }
  }

  @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
    .pricing-split {
      .split-card {
        flex-direction: column;

        .split-card-left,
        .split-card-right {
          width: 100%;
        }
      }
    }
  }
</style>
