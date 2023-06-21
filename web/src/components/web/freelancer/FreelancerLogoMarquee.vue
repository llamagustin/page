<script setup lang="ts">
// import MarqueeText from 'vue-marquee-text-component'

export interface CustomerLogo {
  logo: string
}
export interface JobTopic {
  name: string
  text: string
  icon: string
  link: string
}

export interface CustomerLogosProps {
  logos: CustomerLogo[]
  inverted?: boolean
  compact?: boolean
  topics: JobTopic[]
  limit?: number
}

const props = withDefaults(defineProps<CustomerLogosProps>(), {
  logos: () => [],
  inverted: false,
  compact: false,
  topics: () => [],
  limit: 3,
})
</script>

<template>
  <div class="logo-marquee" :class="props.compact && 'is-compact'">
    <div v-if="!props.compact" class="has-text-centered pb-6">
      <Subtitle tag="h3" :size="6" weight="bold">
        <span class="text-gradient px-2">
          WE DRIVE RESULTS FOR ENTREPRENEURS TO THE FORTUNE 500
        </span>
      </Subtitle>
    </div>

    <div class="track">
      <MarqueeText :repeat="1" :duration="40">
        <!--div class="marquee-logos" :class="props.inverted && 'is-inverted'">
          <div v-for="(logo, index) in props.logos" :key="index">
            <img
              class="is-relative mx-6"
              :src="logo.logo"
              alt="Customer logo"
              width="110"
              height="52"
            />
          </div>
        </div-->
     <div class="language-container">
        <div
          v-for="(topic, index) in props.topics.slice(0, props.limit)"
          :key="index"
          class="column is-4"
        >
          <RouterLink :to="topic.link" class="job-topic">
            <div class="topic-icon">
              <ClientOnly>
                <i class="iconify" :data-icon="topic.icon"></i>
              </ClientOnly>
            </div>
            <div class="meta">
              
              <h3>{{ topic.name }}</h3>
              <p class="paragraph rem-90">{{ topic.text }}</p>
            </div>
          </RouterLink>
        </div>
     </div>   
      </MarqueeText>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.language-container{
     display: flex;
     width: 33%;
}
.job-topic {
    display: flex;
    align-items: center;
    column-gap: 15px;
    background: var(--card-bg-color);
    border: 1px solid var(--card-border-color);
    border-radius: 0.85rem;
    padding: 1rem;
    transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
}
.topic-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      width: 40px;
      background: var(--wrap-muted-color);
      border-radius: 50%;
      font-size: 1.25rem;
    }
   .meta {
      margin-left: 0.75rem;

      h3 {
        font-family: var(--font-alt);
        font-weight: 600;
        color: var(--title-color);
        line-height: 1.2;
      }
    }

    .job-topic:hover {
      transform: translateY(-5px);
      border-color: var(--primary);
      box-shadow: var(--light-box-shadow);
    }
    
    
    
    
.logo-marquee {
    position: relative;
    width: 100vw;
    max-width: 100%;
    height: 100px;
    overflow-x: hidden;
    margin-top: 70px;
    
  .marquee-logos {
    display: flex;
    align-items: center;

    > div {
      padding: 0 10px;
    }

    img {
      display: block;
      max-width: 110px;
      min-width: 110px;
    }

    &.is-inverted {
      img {
        filter: invert(1);
      }
    }
  }

  .track {
    position: absolute;
    white-space: nowrap;
    will-change: transform;
  }

  &.is-compact {
    display: flex;
    align-items: center;
    /*height: 100px;*/
  }
}

.is-dark {
  .logo-marquee {
    .marquee-logos {
      img {
        filter: invert(1);
      }
    }
  }
}
</style>
