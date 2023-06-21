<script setup lang="ts">
import { viaPlaceholderErrorHandler } from '/@src/utils/viaPlaceholderErrorHandler'

import { textHeroW } from '/@src/texts/tool/rrss'
</script>

<template>
  <Hero
    color="grey"
    class="product-hero"
    shape="/assets/shapes/hero-shape.svg"
    shape-orientation="right"
  >
    <template #body>
      <div class="hero-inner">
        <div class="columns is-vcentered">
          <div class="column is-7">
            <div class="hero-caption">
              <Title tag="h1" :size="2" weight="bold">
                {{ $t('textHeroW_title') }}
              </Title>
              <Subtitle
                tag="p"
                :size="5"
                classes="b-centered-tablet-p text-medium"
              >
                {{ $t('textHeroW_subtitle') }}
              </Subtitle>
            </div>
            <div class="hero-box-grid">
              <!--Grid item-->
              <div class="hero-box-item">
                <div class="box-inner" >
                  <!--img :src="textHeroW.features[0].image" width="60" /-->
                  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="#000000" viewBox="0 0 256 256"><path d="M208,32H80A16,16,0,0,0,64,48V64H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V192h16a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM80,48H208v69.38l-16.7-16.7a16,16,0,0,0-22.62,0L93.37,176H80Zm96,160H48V80H64v96a16,16,0,0,0,16,16h96Zm32-32H116l64-64,28,28v36Zm-88-64A24,24,0,1,0,96,88,24,24,0,0,0,120,112Zm0-32a8,8,0,1,1-8,8A8,8,0,0,1,120,80Z"></path></svg>
                  <Subtitle tag="p" :size="6" weight="semi" leading>
                    {{ $t('textHeroW_features_label0') }}
                  </Subtitle>
                </div>
              </div>
              <!--Grid item-->
              <div class="hero-box-item">
                <div class="box-inner">
                  <!--img :src="textHeroW.features[1].image" width="60" /-->
                  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="#000000" viewBox="0 0 256 256"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-48-56a8,8,0,0,1-8,8H136v16a8,8,0,0,1-16,0V160H104a8,8,0,0,1,0-16h16V128a8,8,0,0,1,16,0v16h16A8,8,0,0,1,160,152Z"></path></svg>
                  <Subtitle tag="p" :size="6" weight="semi" leading>
                    {{ $t('textHeroW_features_label1') }}
                  </Subtitle>
                </div>
              </div>
              <!--Grid item-->
              <div class="hero-box-item">
                <div class="box-inner">
                  <!--img :src="textHeroW.features[2].image" width="60" /-->
                  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="#000000" viewBox="0 0 256 256"><path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0v94.37L90.73,98a8,8,0,0,1,10.07-.38l58.81,44.11L218.73,90a8,8,0,1,1,10.54,12l-64,56a8,8,0,0,1-10.07.38L96.39,114.29,40,163.63V200H224A8,8,0,0,1,232,208Z"></path></svg>
                  <Subtitle tag="p" :size="6" weight="semi" leading>
                    {{ $t('textHeroW_features_label2') }}
                  </Subtitle>
                </div>
              </div>
              <!--Grid item-->
            <!--
              <div class="hero-box-item">
                <div class="box-inner">
                  <img :src="textHeroW.features[3].image" width="60" />
                  <Title tag="h3" :size="7" weight="semi" leading>
                    {{ textHeroW.features[3].label }}
                  </Title>
                </div>
              </div>

              <div class="hero-box-item">
                <div class="box-inner">
                  <img :src="textHeroW.features[4].image" width="60" />
                  <Title tag="h3" :size="7" weight="semi" leading>
                    {{ textHeroW.features[4].label }}
                  </Title>
                </div>
              </div>
              <div class="hero-box-item">
                <div class="box-inner">
                  <img :src="textHeroW.features[5].image" width="60" />
                  <Title tag="h3" :size="7" weight="semi" leading>
                    {{ textHeroW.features[5].label }}
                  </Title>
                </div>
              </div>
              -->
            </div>
          </div>
          <div class="column is-5">
            <div class="hero-image-container">
              <DarkImage
                src="/assets/illustrations/hero/working-laptop.svg"
                src-dark="/assets/illustrations/hero/working-laptop-dark.svg"
                alt="Hero image"
                width="640"
                height="960"
                @error.once="
                  (event) => viaPlaceholderErrorHandler(event, `640x960`)
                "
              />

              <!--Card-->
              <div class="stat-card stat-card-1">
                <div class="data text-primary">
                  <i-ion-calendar-outline />
                  <span class="metric">{{ textHeroW.graph[0].title }}</span>
                  <span class="legend">{{ textHeroW.graph[0].subtitle }}</span>
                </div>
                <div class="graph text-primary">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 281.3 123.7"
                    style="enable-background: new 0 0 281.3 123.7"
                    xml:space="preserve"
                  >
                    <path
                      d="M6.8,27c38-31.6,57.9-26.4,69.2-14c20.9,22.9,16.4,74.9,35.4,85.2c18.6,10.1,30-35.8,55.6-30.9
	c22.7,4.3,26.4,42.8,49.6,51.5c11.9,4.5,30.5,1.7,57.8-36.5"
                    />
                  </svg>
                </div>
              </div>
              <!--Card-->
              <div class="stat-card stat-card-2">
                <div class="data text-success">
                  <i-ion-business-outline />
                  <span class="metric">{{ textHeroW.graph[1].title }}</span>
                  <span class="legend">{{ textHeroW.graph[1].subtitle }}</span>
                </div>
                <div class="graph text-success">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 281.3 123.7"
                    style="enable-background: new 0 0 281.3 123.7"
                    xml:space="preserve"
                  >
                    <path
                      d="M6.8,96.7c38,31.6,57.9,26.4,69.2,14c20.9-22.9,16.4-74.9,35.4-85.2c18.6-10.1,30,35.8,55.6,30.9
	c22.7-4.3,26.4-42.8,49.6-51.5c11.9-4.5,30.5-1.7,57.8,36.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Hero>
</template>

<style lang="scss" scoped>
.hero-inner {
  padding-top: 2.5rem;

  .hero-caption {
    max-width: 480px;
  }
}

.hero-box-grid {
  display: flex;
  flex-wrap: wrap;
  margin: -0.5rem;
  padding-top: 1.5rem;
  max-width: 580px;

  .hero-box-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(33.3% - 1rem);
    text-align: center;
    margin: 0.5rem;
    padding: 1.5rem 1rem;
    background: var(--card-bg-color);
    border: 1px solid var(--card-border-color);
    border-radius: 0.85rem;
    box-shadow: var(--spread-shadow);
    cursor: pointer;

    :deep(.icon-box) {
      margin: 0 auto 0.5rem;
    }

    .go-icon {
      font-size: 0.9rem;
      color: var(--primary);
    }
  }
}

.hero-image-container {
  position: relative;

  img {
     position: relative;
    display: block;
    max-width: 800px;
    width: 800px;
    right: 100px;
    z-index: 1;
  }

  .stat-card {
    position: absolute;
    display: flex;
    align-items: center;
    padding: 1rem;
    background: var(--card-bg-color);
    border: 1px solid var(--card-border-color);
    border-radius: 0.9rem;
    box-shadow: var(--spread-shadow);
    z-index: 2;

    .data {
      span {
        font-family: var(--font);
        display: block;

        &.metric {
          font-weight: 600;
          color: var(--title-color);
        }

        &.legend {
          color: var(--light-text);
          font-size: 0.7rem;
        }
      }
    }

    .graph {
      svg {
        width: 100%;
        max-width: 100px;
        stroke-dasharray: 406;
        stroke-dashoffset: 406;
        animation: dash 1s linear forwards;

        path {
          fill: none;
        }

        stroke: currentcolor;
        stroke-width: 5px;
      }
    }

    &.stat-card-1 {
      top: 150px;
      left: 0;
    }

    &.stat-card-2 {
      bottom: 50px;
      right: -80px;
    }
  }
}
.is-dark svg{
  fill: var(--white-smoke);
}
@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}

@media only screen and (max-width: 767px) {
  .product-hero {
    text-align: center;
  }

  .hero-inner {
    .hero-caption {
      :deep(.title) {
        margin-top: 3rem;

        &.is-2 {
          font-size: 2rem;
        }
      }
    }
  }

  .hero-image-container {
    img {
      max-width: 100%;
    }

    .stat-card {
      &.stat-card-1 {
        left: -35px;
      }
    }
  }

  .hero-box-grid {
    max-width: 100%;

    .hero-box-item {
      width: calc(50% - 1rem);
      padding: 1rem;
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
  .product-hero {
    text-align: center;

    .buttons {
      justify-content: center;
    }

    .hero-image-container {
      img {
        margin: 0 auto;
      }

      .stat-card {
        &.stat-card-1 {
          left: 50px;
        }

        &.stat-card-2 {
          right: 50px;
        }
      }
    }
  }

  .hero-inner {
    .hero-caption {
      margin: 0 auto;

      :deep(.title) {
        margin-top: 3rem;
        font-size: 2.25rem;
        margin-left: auto;
        margin-right: auto;
        max-width: 580px;
      }

      :deep(.subtitle) {
        margin-left: auto;
        margin-right: auto;
        max-width: 580px;
      }
    }
  }

  .hero-box-grid {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
