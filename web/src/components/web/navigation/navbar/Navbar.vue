<script setup lang="ts">
  import { computed, ref, watch, onMounted } from 'vue'
  import { header, LanguageFlags, LanguageText } from '/@src/texts/dashboard'

  import { useRoute } from 'vue-router'
  import { useWindowScroll, onClickOutside } from '@vueuse/core'
  import { testimonials } from '/@src/texts/home'
  import CountryFlags from './CountryFlags.vue'


  export interface NavbarProps {
    inverted ? : boolean
    solid ? : boolean
  }

  const props = withDefaults(defineProps < NavbarProps > (), {
    inverted: false,
    solid: false,
  })

  const user = ref(null) //user


  const isNavbarOpen = ref(false)
  const isMegamenuOpen = ref(false)
  const activeDropdown = ref('')

  const route = useRoute()

  const navbar = ref(null)
  const megamenu = ref(null)

  const { y } = useWindowScroll()

  const isScrolled = computed(() => {
    return y.value > 60
  })

  const selectMobileMenu = (menuId = '') => {
    isMegamenuOpen.value = !!menuId
    activeDropdown.value = menuId
  }

  onClickOutside(navbar, () => {
    selectMobileMenu()
    isNavbarOpen.value = false
  })


  watch(() => route?.fullPath, () => {
    isNavbarOpen.value = false
    selectMobileMenu()
  })

  const handleUser = computed(() => {
    if (typeof window !== 'undefined') {
      user.value = JSON.parse(window.sessionStorage.getItem('credentials'))
      return user.value
    }
  })

  const hideMenuRoute = computed(() => {
    if (route.fullPath === '/login') {
      return false
    }
    /*
    if(route.fullPath === '/servicespack'){
      return false
    }*/
    else {
      return true
    }
  })
  let indice = ref('es')

  const updateFlag = (index: string) => {
    indice.value = index
  }

  //const flags = ["es","en","ca","eu","gl","pt"]

  watch(isNavbarOpen, val => {
    if (!val) selectMobileMenu()

  })
</script>

<template>
  <nav v-show="hideMenuRoute" ref="navbar" class="navbar is-transparent is-fixed-top is-fade" role="navigation" aria-label="main navigation" :class="[
      isScrolled && 'is-scrolled',
      isNavbarOpen && 'is-solid',
      isMegamenuOpen && 'is-solid',
      props.inverted && 'is-inverted',
      props.solid && 'is-solid',
    ]" @mouseleave="() => selectMobileMenu()" @focusout="() => selectMobileMenu()">
    <div class="container">
      <div class="navbar-brand">
        <RouterLink v-preload-link class="navbar-item" to="/">
          <div>
            <svg style="enable-background:new 0 0 500 500; max-height:60px" class="navbar-logo color-kit-digital" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 500 500" xml:space="preserve">
              <g>
                <defs>
                  <rect id="SVGID_1_" width="500" height="500" />
                </defs>
                <clipPath id="SVGID_2_">
                  <use xlink:href="#SVGID_1_" style="overflow:visible;" />
                </clipPath>
                <path class="st0" d="M84.02,63.04c-8.4,7.46-17.57,16.61-26.72,27.68c-12.57,15.19-21.74,29.92-28.4,42.48		c49.35-1.06,87.45-0.78,107.04,0.06c4.56,0.2,12.3,0.68,20.43,5.17c10.56,5.82,15.75,14.93,20.51,23.29		c4.18,7.35,6.57,13.97,7.94,18.55c-27.74,60.5-55.48,120.99-83.22,181.49h77.65l44.55-97.53l65.58,141.21		c1.63,3.46,6.27,12.16,16.46,18.38c9.96,6.08,19.99,6.12,25.18,6.15c20.92,0.13,52.69,0.42,92.48,0.02		c8.89-8.56,18.92-19.49,28.78-33.05c9.83-13.52,17.13-26.39,22.54-37.46c-46.98,0.11-83.07-0.11-102.33-0.17		c-2.94-0.01-8.97-0.09-15.89-2.94c-13.99-5.76-20.77-18.35-23.99-24.33c-2.32-4.31-3.75-8.14-4.63-10.86		c-55.75-122.28-97.76-211.63-108.67-234.03c-1.53-3.13-5.25-10.7-13.23-16.52c-10.64-7.76-22.74-8.02-29.46-8.07		C153.94,62.39,122.41,62.24,84.02,63.04" />
              </g>
            </svg>
          </div>
          <!--<img class="navbar-logo color-kit-digital" src="/assets/images/logo.svg" alt="logo" />-->
        </RouterLink>

        <div class="navbar-burger" @click.prevent="isNavbarOpen = !isNavbarOpen" @keydown.space.prevent="() => (isNavbarOpen = !isNavbarOpen)">
          <Hamburger :open="isNavbarOpen" />
        </div>
      </div>
      <!--Menu-->
      <div class="navbar-menu b-centered-mobile b-centered-tablet-p" :class="[isNavbarOpen && 'is-active']">
        <div class="navbar-start">
          <a role="button" class="navbar-item text-white-x" :class="[activeDropdown === 'aythen-drop' && 'is-selected']" tabindex="0" @mouseover="() => selectMobileMenu('aythen-drop')" @touchstart="() => selectMobileMenu('aythen-drop')">
            <span class="has-naver mr-1">
              
              {{$t('home')}}
            </span>
            <i class="iconify" data-icon="feather:chevron-down"></i>
          </a>
          <a role="button" class="navbar-item text-white-x" :class="[activeDropdown === 'services-drop' && 'is-selected']" tabindex="0" @mouseover="() => selectMobileMenu('services-drop')" @touchstart="() => selectMobileMenu('services-drop')">
            <span class="has-naver mr-1">
              {{$t('digital-kit') }}
            </span>
            <i class="iconify" data-icon="feather:chevron-down"></i>
          </a>
          <a role="button" class="navbar-item text-white-x" :class="[activeDropdown === 'editor-drop' && 'is-selected']" tabindex="0" @mouseover="() => selectMobileMenu('editor-drop')" @touchstart="() => selectMobileMenu('editor-drop')">
            <span class="has-naver mr-1">
              {{$t('services') }}
            </span>
            <i class="iconify" data-icon="feather:chevron-down"></i>
          </a>
          <a role="button" class="navbar-item text-white-x" :class="[activeDropdown === 'cooworking-drop' && 'is-selected']" tabindex="0" @mouseover="() => selectMobileMenu('cooworking-drop')" @touchstart="() => selectMobileMenu('cooworking-drop')">
            <span class="has-naver mr-1">
              {{$t('team')}}
            </span>
            <i class="iconify" data-icon="feather:chevron-down"></i>
          </a>
        </div>

        <div class="navbar-end">
          <div class="navbar-item is-flex is-align-items-center is-justify-content-center is-justify-content-center">
            <img style=" height:12px" class="mr-2 ml-1" :src="LanguageFlags[indice]" />

            <a role="button" class="navbar-item text-white-x" :class="[activeDropdown === 'flags-selected' && 'is-selected']" tabindex="0" @mouseover="() => selectMobileMenu('flags-selected')" @touchstart="() => selectMobileMenu('flags-selected')">
              <span class="has-naver mr-1">
                {{LanguageText[indice]}}
              </span>
              <i class="iconify" data-icon="feather:chevron-down"></i>
            </a>

            <RouterLink v-preload-link class="navbar-item" to="/kit+digital">
              <div class="d-none-mobile is-flex is-align-items-center is-justify-content-center">
                <Tag label="Next Generation" :style="{ display: 'flex', paddingLeft: '2px' }" color="primary" shape="squared">
                  <img alt="next generation" src="/assets/images/eu.jpg" :style="{ width: '36px', marginRight: '4px' }" />
                  Next Generation
                </Tag>
              </div>
            </RouterLink>
            <ThemeToggle />
          </div>
          <div class="navbar-item">
            <Button :href="header.button.link" v-show="!handleUser" target="_blank" color="primary" class="button-kit-digital" raised bold>
              {{$t('login')}}
            </Button>
            <RouterLink v-preload-link class="navbar-item" to="/login">
              {{user?.username}}
              <AvatarSimple class="ml-2" v-show="handleUser" size="small" :picture="testimonials[0].avatar" />
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <!--Dropdown-->
    <div ref="megamenu" class="megamenu" :class="[isMegamenuOpen && 'is-active']">
      <AythenMegamenu v-if="activeDropdown === 'aythen-drop'" @close="() => selectMobileMenu()" />
      <ServicesMegamenu v-if="activeDropdown === 'services-drop'" @close="() => selectMobileMenu()" />
      <CooworkingMegamenu v-if="activeDropdown === 'cooworking-drop'" @close="() => selectMobileMenu()" />
      <EditorMegamenu v-if="activeDropdown === 'editor-drop'" @close="() => selectMobileMenu()" />
      <LanguageMegamenu @updateFlag="updateFlag" v-if="activeDropdown === 'flags-selected'" @close="() => selectMobileMenu()" />
    </div>
  </nav>
</template>

<style lang="scss" scoped>
  .debugger {
    outline: 1px solid red;

    &>* {
      outline: 1px solid red;
    }
  }

  .text-dark {
    color: var(--navbar-link-color);
  }

  .navbar {
    height: 70px;
    transition: all 0.3s;
    width: 100vw !important;

    .navbar-brand {
      height: 70px;

      .navbar-logo {
        display: block;
        width: 100%;
        max-width: 40px;
        max-height: 28px;
        fill: #000fff;
      }

      .navbar-logo-text {
        font-family: var(--font-alt);
        font-weight: 300;
        font-size: 1.1rem;
        text-transform: uppercase;
        margin-left: 0.75rem;
        margin-right: 1rem;
        color: var(--dark-text);
      }

      .navbar-burger {
        display: none;
        align-items: center;
        justify-content: center;
        height: 70px;
        width: 70px;
        background: none;
      }
    }

    .navbar-menu {
      box-shadow: none;

      &.is-active {
        background: var(--navbar-bg-color-solid);
      }
    }

    .navbar-item {
      font-family: var(--font-alt);
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--navbar-link-color);
      transition: color 0.3s;
      background: none;
      border: none;

      &.router-link-exact-active {
        color: var(--primary);

        &.has-naver {
          &::before {
            background: var(--primary);
          }
        }
      }

      &.is-selected {
        color: var(--dark-text) !important;

        >.iconify {
          transform: rotate(180deg) !important;
        }
      }

      &:hover {
        .has-naver {
          color: var(--primary);

          &::before {
            transform-origin: left center;
            transform: scale(1, 1);
          }
        }
      }

      &.has-dropdown {
        .navbar-link {
          color: var(--medium-text);

          &:hover {
            color: var(--primary);
          }
        }

        .navbar-dropdown {
          width: 240px;
        }
      }

      .has-naver {
        position: relative;

        &::before {
          content: '';
          position: absolute;
          top: -4px;
          left: 2px;
          width: 50%;
          transform-origin: right center;
          height: 3px;
          border-radius: 50px;
          background: var(--primary);
          transform: scale(0, 1);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
      }

      >.social-item {
        color: var(--medium-text);
        transition: color 0.3s;

        &:hover {
          color: var(--primary);
        }
      }

      >.button {
        min-height: 48px;
        min-width: 110px;
      }

      >.iconify {
        transition: transform 0.3s;
        vertical-align: middle;
        font-size: 1.1rem;
      }
    }

    &.is-fade {
      background: transparent;

      &.is-scrolled {
        background: var(--navbar-bg-color-solid);
        -box-shadow: rgb(0 0 0 / 8%) 0 1px 12px;
        border-bottom: 1px solid var(--navbar-border-color);
      }
    }

    &.is-solid {
      background: var(--navbar-bg-color-solid);
      box-shadow: none;

      .navbar-menu {
        border-bottom: 1px solid var(--navbar-border-color);
      }
    }

    &.is-inverted:not(.is-solid):not(.is-scrolled) {
      .navbar-brand {
        .navbar-logo {
          filter: brightness(0) invert(1);
        }
      }

      .navbar-item {
        color: rgb(255 255 255 / 90%);
      }
    }

    &.is-fixed-top {
      z-index: 32;
    }
  }

  :deep(.megamenu) {
    position: fixed;
    top: 69px;
    left: 0;
    width: 100%;
    background: var(--navbar-bg-color-solid);
    border-top: 1px solid var(--navbar-border-color);
    box-shadow: 0 15px 15px 0 rgb(0 0 0 / 7%);
    opacity: 0;
    pointer-events: none;
    transform: translateY(10px);
    transition: opacity 0.3s, transform 0.3s;

    &.is-active {
      opacity: 1;
      pointer-events: all;
      transform: translateY(0);
    }

    .countryWidth {
      position: absolute;
      padding: 0;
      padding-top: 5px;
      padding-bottom: 7px;
      top: 0px;
      right: 38%;
      width: 130px;
      background: var(--navbar-bg-color-solid);
      border-top: 1px solid var(--navbar-border-color);
      box-shadow: 0 15px 15px 0 rgb(0 0 0 / 7%);
    }

    .megamenu-inner {
      position: relative;
      padding: 30px 0 20px;

      .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        display: none;
        align-items: center;
        justify-content: center;
        height: 38px;
        width: 38px;
        padding: 0;
        border: none;
        background: none;
        outline: none;
        font-size: 1.75rem;
        color: var(--megamenu-close-color);
      }

      .megamenu-block {
        &.is-left-bordered {
          padding-left: 2rem;
          border-left: 1px solid var(--navbar-border-color);
        }

        .media {
          .media-left {
            &.is-bolt {
              color: #ffb921;
            }

            &.is-company {
              color: var(--success);
            }

            &.is-resources {
              color: #f16036;
            }

            .iconify {
              font-size: 2.25rem;
            }
          }

          .media-content {
            .tag {
              margin-bottom: 0.5rem;
            }

            h3 {
              font-family: var(--font-alt);
              font-size: 1.25rem;
              font-weight: 600;
              color: var(--megamenu-heading-color);
              margin-bottom: 1.25rem;
            }

            p {
              font-family: var(--font);
              color: var(--medium-text);
              margin-bottom: 1rem;
            }

            a {
              font-family: var(--font);
              font-weight: 500;
              transition: color 0.3s;

              .iconify {
                vertical-align: middle;
                transition: transform 0.3s;
              }

              &:hover {
                color: var(--primary-light-16);

                .iconify {
                  transform: translateX(0.25rem);
                }
              }
            }
          }
        }

        h4 {
          font-family: var(--font-alt);
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--megamenu-heading-color);
          margin-bottom: 0.75rem;
        }

        li {
          position: relative;
          margin-bottom: 0.25rem;

          &::before {
            content: '';
            position: absolute;
            top: 15%;
            left: 0;
            width: 3px;
            height: 0;
            background: var(--primary);
            border-radius: 20rem;
            transition: height 0.3s, transform 0.3s;
          }

          &:hover {
            .list-link {
              color: var(--primary);
              transform: translateX(0.5rem);
            }

            &::before {
              height: 70%;
            }
          }
        }

        .list-link {
          display: block;
          position: relative;
          font-family: var(--font);
          font-size: 0.9rem;
          color: var(--medium-text);
          margin-bottom: 0.5rem;
          transition: color 0.3s, transform 0.3s;
        }

        a {
          .iconify {
            vertical-align: middle;
            margin-left: 0.5rem;
          }
        }

        .image-block {
          position: relative;

          img {
            position: relative;
            display: block;
            border-radius: 0.95rem;
            object-fit: cover;
          }

          .inner-block {
            position: absolute;
            bottom: -1rem;
            left: 0;
            right: 0;
            width: 90%;
            margin: 0 auto;
            padding: 0.75rem 1.25rem;
            border-radius: 0.75rem;
            background: var(--card-bg-color);
            border: 1px solid var(--card-border-color);
            box-shadow: var(--light-box-shadow);
            z-index: 1;
          }
        }
      }
    }
  }

  @media only screen and (max-width: 1024px) {
    .navbar {
      &.is-centered {
        &:not(.no-nav) {
          .navbar-brand {
            display: flex;
          }

          .navbar-menu {
            .navbar-center {
              display: none !important;
            }
          }
        }

        &.no-nav {
          .navbar-menu {
            display: flex !important;
            padding: 0 !important;
            box-shadow: none !important;
            background: transparent !important;
          }
        }
      }
    }
  }

  @media only screen and (max-width: 980px) {
    .navbar-start {
      display: flex;
      justify-content: center;
    }

    .navbar-end {
      margin-top: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .navbar {
      .navbar-brand {
        .navbar-burger {
          display: flex !important;
        }
      }
    }
  }

  @media only screen and (max-width: 767px) {
    .navbar-start {
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
    }

    .navbar-start a {
      width: 100%;
    }

    .navbar-end {
      margin-top: 50px;
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .navbar .navbar-menu .navbar-item {
      margin: 0;
    }

    .navbar {
      .navbar-brand {
        .navbar-burger {
          display: flex;
        }
      }

      .navbar-menu {
        .d-none-mobile {
          display: none !important;
        }

        .navbar-item {
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 20px;


          &.has-dropdown {
            .navbar-dropdown {
              width: 100%;
            }
          }

          :deep(.custom-toggle) {
            max-width: 44px;
            margin: 0 auto;
            padding: 1rem 0;
          }

          .button {
            min-height: 46px;
            width: 100%;
          }
        }
      }

      :deep(.megamenu) {
        top: 0;
        padding: 0 20px;

        .megamenu-inner {
          .close-button {
            display: flex;
          }

          .columns {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }

          .megamenu-block {
            &.is-left-bordered {
              padding-left: 0;
              border-left: none;
            }

            .media {
              flex-direction: column;
              margin-left: 0px;
            }
          }
        }
      }
    }
  }

  @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
    .navbar-start {
      display: flex;
    }

    .navbar {
      .navbar-brand {
        .navbar-burger {
          display: flex;
        }
      }

      .navbar-menu {
        max-width: 100%;

        .navbar-item {
          margin: 0 auto;

          &.has-dropdown {
            .navbar-dropdown {
              width: 100%;
            }
          }

          :deep(.custom-toggle) {
            max-width: 44px;
            margin: 0 auto;
            padding: 1rem 0;
          }

          .button {
            min-height: 46px;
            width: 100%;
          }
        }
      }

      :deep(.megamenu) {
        top: 0;

        .megamenu-inner {
          .close-button {
            display: flex;
            top: 30px;
            right: 30px;
          }

          .megamenu-block {
            &.is-left-bordered {
              padding-left: 0;
              border-left: none;
            }

            .media {
              flex-direction: column;
              margin-left: 3rem;
            }
          }
        }
      }
    }
  }

  /* stylelint-disable */
  @media only screen and (min-device-width: 1024px) and (max-device-height: 1366px) and (-webkit-min-device-pixel-ratio: 1.5) and (orientation: portrait) {
    .navbar {
      .navbar-brand {
        .navbar-burger {
          display: none !important;
        }
      }
    }
  }




  /* stylelint-enable */
</style>
