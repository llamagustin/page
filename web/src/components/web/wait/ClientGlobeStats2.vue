<script setup lang="ts">
import { textGlobeStats } from '/@src/texts/client'
</script>

<template>
  <div class="pb-6">
    <div class="globe-stats columns is-flex-direction-row-reverse">
      <div class="column is-6-desktop globe-holder">
        <div class="globe-inner">
          <Globe :size="800" theta="5" :map-samples="11098.83" />
        </div>
      </div>
      
      <div  class="colimn is-6-desktop stats-block">
        <div class="stat-block">
          <div class="block-inner has-text-centered">
            <span class="globe-title">{{ $t('waitGlobeTitle0') }} </span>
            <p class="paragraph px-3 has-text-justified is-size-10">{{ $t('waitGlobeDescription0') }}</p>
          </div>
        </div>
        <div class="stat-block">
          <div class="block-inner has-text-centered">
              <span class="globe-title">{{ $t('waitGlobeTitle1') }}</span>
              <p class="paragraph px-3 has-text-justified is-size-10">
                {{ $t('waitGlobeDescription1') }}
              </p>
          </div>
        </div>
        <div class="stat-block">
          <div class="block-inner has-text-centered">
              <span class="globe-title">{{ $t('waitGlobeTitle2') }}</span>
            <p class="paragraph px-3 has-text-justified is-size-10">
              {{ $t('waitGlobeDescription2') }}
            <span> </span>
            </p>
          </div>
        </div>
        <div class="stat-block">
          <div class="block-inner has-text-centered">
              <span class="globe-title">{{ $t('waitGlobeTitle3') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.globe-title{
  color:#00f;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 20px;
}
.is-dark .globe-title{
  color: var(--white-smoke);
} 
.globe-stats {
  position: relative;

  .globe-holder {
    -height: 450px;
    width: 800px;
    margin-top: -100px;
    overflow: hidden;

    .globe-inner {
      overflow: hidden;
      margin: 0 auto;
      display: grid;
      place-items: center;
      place-content: center;
    }
  }

  .stats-block {
    display: grid;
    width: 450px;
    justify-content: center;
    -border-bottom: 1px solid var(--wrap-border-color);

    .stat-block {
      flex: 1 1 0;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 150px;
      -border-left: 1px solid var(--wrap-border-color);

      .block-inner {
        gap: 20px;
        
        p {
            margin-top: 10px;
          position: relative;
          -text-transform: uppercase;
        }
      }

      &:last-child {
        -border-right: 1px solid var(--wrap-border-color);
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .globe-holder{
    width: 100% !important;
    overflow: hidden !important;
  }
  
  .globe-stats {
    /*margin-left: -1.5rem;*/
    /*margin-right: -1.5rem;*/

    .stats-block {
      flex-wrap: wrap;
        width: 90%;
        margin-left: 5%;
    
      .stat-block {
        flex: none;
        width: 100%;
        margin-top: 5%;

        &:first-child,
        &:nth-child(2) {
          border-bottom: 1px solid var(--wrap-border-color);
        }

        &:first-child,
        &:nth-child(3) {
          border-left: none;
        }

        &:nth-child(2),
        &:nth-child(4) {
          border-left: 1px solid var(--wrap-border-color);
          border-right: none;
        }

        :deep(.title) {
          font-size: 2rem;
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
  .globe-stats {
    margin-left: -1.5rem;
    margin-right: -1.5rem;

    .stats-block {
      .stat-block {
        :deep(.title) {
          font-size: 2.5rem;
        }
      }
    }
  }
}
</style>
