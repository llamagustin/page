<script setup lang="ts">
import { computed } from 'vue'

export type FooterColors = 'light' | 'dark'

export interface FooterASocialLink {
  url: string
  name: string
  icon: string
}

export interface FooterAProps {
  color?: FooterColors
  socialLinks?: FooterASocialLink[]
  bubbles?: boolean
  curved?: boolean
}

const props = withDefaults(defineProps<FooterAProps>(), {
  color: undefined,
  socialLinks: undefined,
  bubbles: false,
  curved: false,
})

const footerClasses = computed(() => [
  props.color && `footer-${props.color}`,
  props.curved && `footer-curved`,
  props.bubbles && 'footer-overflow',
])
</script>

<template>
  <footer class="footer" :class="footerClasses">
    <FooterBubbles v-if="props.bubbles" />

    <div class="container">
      <div class="columns is-vcentered b-flex-tablet-p">
        <div class="column is-4">
          <div class="level is-mobile mobile:mb-4">
            <slot name="leftLinks">
              <RouterLink
                :to="{ name: 'home' }"
                class="level-item footer-link"
              >
                Aythen
              </RouterLink>
              <RouterLink
                :to="{ name: 'kit+digital' }"
                class="level-item footer-link"
              >
                Kit Digital
              </RouterLink>
              <RouterLink
                :to="{ name: 'grant' }"
                class="level-item footer-link"
              >
                Premium
              </RouterLink>
            </slot>
          </div>
        </div>
        <div class="column is-4 has-text-centered">
          <RouterLink class="footer-logo-centered" :to="{ name: 'index' }">
            <div>
              <svg style="enable-background:new 0 0 500 500; max-height:60px" class="navbar-logo color-kit-digital" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 500 500"  xml:space="preserve"><g>	<defs>		<rect id="SVGID_1_" width="500" height="500"/>	</defs>	<clipPath id="SVGID_2_">		<use xlink:href="#SVGID_1_"  style="overflow:visible;"/>	</clipPath>	<path class="st0" d="M84.02,63.04c-8.4,7.46-17.57,16.61-26.72,27.68c-12.57,15.19-21.74,29.92-28.4,42.48		c49.35-1.06,87.45-0.78,107.04,0.06c4.56,0.2,12.3,0.68,20.43,5.17c10.56,5.82,15.75,14.93,20.51,23.29		c4.18,7.35,6.57,13.97,7.94,18.55c-27.74,60.5-55.48,120.99-83.22,181.49h77.65l44.55-97.53l65.58,141.21		c1.63,3.46,6.27,12.16,16.46,18.38c9.96,6.08,19.99,6.12,25.18,6.15c20.92,0.13,52.69,0.42,92.48,0.02		c8.89-8.56,18.92-19.49,28.78-33.05c9.83-13.52,17.13-26.39,22.54-37.46c-46.98,0.11-83.07-0.11-102.33-0.17		c-2.94-0.01-8.97-0.09-15.89-2.94c-13.99-5.76-20.77-18.35-23.99-24.33c-2.32-4.31-3.75-8.14-4.63-10.86		c-55.75-122.28-97.76-211.63-108.67-234.03c-1.53-3.13-5.25-10.7-13.23-16.52c-10.64-7.76-22.74-8.02-29.46-8.07		C153.94,62.39,122.41,62.24,84.02,63.04"/></g></svg>
            </div>
            <span class="is-sr-only">Logo</span>
          </RouterLink>
          <div
            v-if="props.socialLinks"
            class="level is-mobile py-4 mx-auto max-w-1"
          >
            <RouterLink
              v-for="(link, index) in props.socialLinks"
              :key="index"
              :to="link.url"
              class="level-item footer-link"
            >
              <span class="icon">
                <i class="iconify" :data-icon="link.icon"></i>
              </span>
              <span class="is-sr-only">{{ link.name }}</span>
            </RouterLink>
          </div>
        </div>
        <div class="column is-4 has-text-right">
          <div class="level is-mobile">
            <slot name="rightLinks">
              <RouterLink
                :to="{ name: 'services' }"
                class="level-item footer-link"
              >
                Templates
              </RouterLink>
              <RouterLink
                :to="{ name: 'team-freelancer' }"
                class="level-item footer-link"
              >
                Freelancers
              </RouterLink>
              <RouterLink
                :to="{ name: 'help' }"
                class="level-item footer-link"
              >
                Support
              </RouterLink>
            </slot>
          </div>
        </div>
      </div>
      <p class="paragraph rem-90 footer-text has-text-centered is-6">
        <span role="img" aria-label="copyright">©</span>
        2023 Aythen. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  position: relative;
  z-index: -1;
  margin-top: 2rem;
  padding-top: 2rem;
  padding-bottom: 3rem;
  background: var(--footer-default-bg-color);

  &.footer-overflow {
    :global(body) {
      //overflow-x: hidden;
    }
  }

  &.footer-curved {
    border-top-left-radius: 50% 20%;
    border-top-right-radius: 50% 20%;
  }

  &.footer-light {
    background: var(--footer-light-bg-color);
  }

  &.footer-dark {
    background: var(--footer-dark-bg-color);

    .title {
      color: var(--white-smoke);
      opacity: 0.6;
    }

    .footer-link {
      color: var(--white-smoke);
      opacity: 0.8;
    }

    .footer-text {
      color: var(--white-smoke);
    }
  }

  &.footer-left {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  .footer-link {
    position: relative;
    font-family: var(--font);
    color: var(--medium-text);
    transition: color 0.3s;

    &::before {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 35%;
      transform-origin: right center;
      height: 3px;
      border-radius: 50px;
      background: var(--primary);
      transform: scale(0, 1);
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover {
      color: var(--primary-light-5);
      opacity: 1;

      &::before {
        transform-origin: left center;
        transform: scale(1, 1);
      }
    }
  }

  .footer-text {
    font-family: var(--font);
    color: var(--medium-text);
  }

  .footer-logo-centered {
    display: block;
    width: 100%;

    img {
      margin: 0 auto;
    }
    
    svg{
      width: 40px;
      fill: #000fff;
    }
  }

  .footer-logo-left {
    img {
      display: block;
    }
  }
}

@media only screen and (max-width: 767px) {
  .footer {
    .footer-link {
      margin-right: 0 !important;
    }

    &.footer-curved {
      border-top-left-radius: 80% 20%;
      border-top-right-radius: 80% 20%;
    }
  }
}
</style>
