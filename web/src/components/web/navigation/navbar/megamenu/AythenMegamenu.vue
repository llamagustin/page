<script setup lang="ts">
  import { ref } from 'vue'
  import { AythenMegamenu } from '/@src/texts/dashboard'

  const emit = defineEmits(['close'])

  const description = ref(AythenMegamenu.subtitle)
  const setDescription = val => {
    description.value = val;
  }
</script>

<template>
  <div class="megamenu-inner">
    <Container>
      <div class="columns is-mobile">

        <div class="column">
          <div class="megamenu-block margin-menu">
            <h4>{{$t('home')}}</h4>
            <ul v-for="(link, index) in AythenMegamenu.data.slice(0, 3)" :key="index">
              <li>
                <RouterLink  @mouseover="setDescription($t(link.title+'_resume'))" v-preload-link :to="link.to" class="list-link">
                  {{$t(link.title)}}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>

        <div class="column ">
          <div class="megamenu-block margin-menu">
            <h4>{{$t('links')}}</h4>
            
            <ul v-for="(link, index) in AythenMegamenu.data.slice(4, 8)" :key="index">
              <li>
                <RouterLink @mouseover="setDescription($t(link.title+'_resume'))" v-preload-link :to="link.to" class="list-link">
                  {{$t(link.title)}}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>

        <div class="column">
          <div class="megamenu-block  is-left-bordered">
            <h4>{{$t('support') }} </h4>
            <ul v-for="(link, index) in AythenMegamenu.support.slice(0, 4)" :key="index">
              <li>
                <RouterLink @mouseover="setDescription($t(link.title+'_resume'))" v-preload-link :to="link.to" class="list-link">
                  {{$t(link.title)}}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="column">
          <div class="megamenu-block is-left-bordered">
            <div class="media">

              <div class="media-content">
                <div class="media-left is-resources flex">
                  <span class="iconify mr-2" data-icon="heroicons-solid:office-building" data-inline="false"></span>
                  <div>
                    <h3 class="ml-2">{{ AythenMegamenu.title }}</h3>
                  </div>
                </div>
                <p>{{description}} </p>
                <Button v-preload-link :to="AythenMegamenu.button.link" target="_blank" class="link-href">
                  <span>{{$t('more-info')}}</span>
                  <i class="iconify" data-icon="feather:arrow-right" data-inline="false"></i>
                </Button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Container>
    <button class="close-button" @click="emit('close')">
      <i class="iconify" data-icon="feather:arrow-left"></i>
    </button>
  </div>
</template>


<style>
  .link-href {
    border: none;
    padding: 0px;
    background: transparent !important;
    color: #0000ff !important;
  }
</style>


<style lang="scss" scoped>
  .margin-menu {
    margin-left: 1.5rem;
  }

  .centered-app-wrapper {
    position: relative;

    .centered-app {
      position: relative;
      display: block;
      border-radius: 2rem;
      border: 1px solid var(--border);
      box-shadow: var(--light-box-shadow);
      z-index: 1;
    }

    .centered-app-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 2rem;
      background: var(--card-bg-color);
      opacity: 0;
      transition: opacity 0.3s;
      z-index: 2;
    }

    .centered-app-button.active {
      opacity: 0.1;
    }

    .centered-app-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.85);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.35rem;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      z-index: 3;
      cursor: pointer;
      border: none;
      background: var(--primary);
      box-shadow: var(--primary-box-shadow);
      transition: transform 0.3s;

      .iconify {
        position: relative;
        right: 0px;
        font-size: 20px;
        width: 40px;
        height: 40px;
        padding: 0px;
        vertical-align: middle;
        color: var(--white);

        :deep(path) {
          fill: var(--white);
        }
      }
    }

    &:hover {
      .centered-app-overlay {
        opacity: 0.7;
      }

      .centered-app-button {
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }

  .is-dark {
    .centered-app-wrapper {
      .centered-app {
        border: none;
      }
    }
  }

  @media only screen and (max-width: 767px) {
    .centered-app-wrapper {
      .centered-app {
        border-radius: 0.75rem;
      }
    }

    .margin-menu {
      margin-left: 0.5rem;
    }
  }
</style>
