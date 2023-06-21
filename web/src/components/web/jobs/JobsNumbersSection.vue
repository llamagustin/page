<script setup lang="ts">
import { computed } from 'vue'

export interface NumberBlock {
  prefix: string
  suffix: string
  value: number
  text: string
}

export interface NumberBlocksProps {
  numbers: NumberBlock[]
  title: string
  subtitle: string
  content: string
  inverted?: boolean
  animated?: boolean
}

const props = withDefaults(defineProps<NumberBlocksProps>(), {
  numbers: () => [],
  title: undefined,
  subtitle: undefined,
  content: undefined,
  inverted: false,
  animated: false,
})

const textClasses = computed(() => [props.inverted && `is-inverted`])
</script>

<template>
  <div class="py-2 z-1">
    <div class="columns is-multiline">
      <div class="column is-12">
        <div class="max-w-6">
          <Subtitle tag="h3" :size="5" weight="bold" narrow class="pb-5">
            <span class="text-gradient">{{ props.subtitle }}</span>
          </Subtitle>
          <Title tag="h3" :size="2" weight="bold">
            {{ props.title }}
          </Title>
          <p
            class="paragraph rem-115 mb-4 text-light "
            :class="textClasses"
          >
            {{ props.content }}
          </p>
        </div>
      </div>
      <div class="column is-3">
        <div class="py-4">
          <Title tag="h3" :size="1" weight="bold" >
            <span>{{ $t('freelancerRoadPrefix0') }}</span>
            <Counter v-if="props.animated" :number="$t('freelancerRoadNum0')" />
            <span v-else>{{ $t('freelancerRoadNum0') }}</span>
            <span>{{ $t('freelancerRoadSuffix0') }}</span>
          </Title>
          <Subtitle tag="h3" :size="6" class="pb-4 text-light">
            {{ $t('freelancerRoadText0') }}
          </Subtitle>
        </div>
      </div>
      <div class="column is-3">
        <div class="py-4">
          <Title tag="h3" :size="1" weight="bold" >
            <span>{{ $t('freelancerRoadPrefix1') }}</span>
            <Counter v-if="props.animated" :number="$t('freelancerRoadNum1')" />
            <span v-else>{{ $t('freelancerRoadNum1') }}</span>
            <span>{{ $t('freelancerRoadSuffix1') }}</span>
          </Title>
          <Subtitle tag="h3" :size="6" class="pb-4 text-light">
            {{ $t('freelancerRoadText1') }}
          </Subtitle>
        </div>
      </div>
      <div class="column is-3">
        <div class="py-4">
          <Title tag="h3" :size="1" weight="bold" >
            <span>{{ $t('freelancerRoadPrefix2') }}</span>
            <Counter v-if="props.animated" :number="$t('freelancerRoadNum2')" />
            <span v-else>{{ $t('freelancerRoadNum2') }}</span>
            <span>{{ $t('freelancerRoadSuffix2') }}</span>
          </Title>
          <Subtitle tag="h3" :size="6" class="pb-4 text-light">
            {{ $t('freelancerRoadText2') }}
          </Subtitle>
        </div>
      </div>
      <div class="column is-3">
        <div class="py-4">
          <Title tag="h3" :size="1" weight="bold" >
            <span>{{ $t('freelancerRoadPrefix3') }}</span>
            <Counter v-if="props.animated" :number="$t('freelancerRoadNum3')" />
            <span v-else>{{ $t('freelancerRoadNum3') }}</span>
            <span>{{ $t('freelancerRoadSuffix3') }}</span>
          </Title>
          <Subtitle tag="h3" :size="6" class="pb-4 text-light">
            {{ $t('freelancerRoadText3') }}
          </Subtitle>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
  .columns {
    display: flex;

    .column {
      &.is-12 {
        width: 100%;
        min-width: 100%;
      }

      &.is-3 {
        :deep(.title) {
          &.is-1 {
            font-size: 2.25rem;
          }
        }
      }
    }
  }
}
</style>
