<script setup lang="ts">
import { computed } from 'vue'
export type WaveOneColor =
    'greydarker'
  | 'grey'
  | 'darker'
  | 'primary'
  | 'white'
  | 'footer-dark'
    'steelblue'

export interface WaveOneProps {
  color?: WaveOneColor
}

const props = withDefaults(defineProps<WaveOneProps>(), {
  color: 'grey',
})

const svgClasses = computed(() => [props.color && `wave-${props.color}`])
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path
      :class="svgClasses"
      fill-opacity="1"
      d="M0,224L60,224C120,224,240,224,360,229.3C480,235,600,245,720,234.7C840,224,960,192,1080,197.3C1200,203,1320,245,1380,266.7L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
    />
  </svg>
</template>

<style scoped lang="scss">
svg {
  display: block;
}

.wave-white {
  fill: var(--section-bg-color);
}

.wave-grey {
  fill: var(--section-bg-color-grey);
}
.wave-greydarker{
  fill: #e3e3e3;
}
.wave-darker {
  fill: var(--section-bg-color-dark);
}

.wave-footer-dark {
  fill: var(--footer-dark-bg-color);
}
.wave-steelblue {
  fill: #4682B4
}
.wave-blue-aythen{
  fill: #0000ff
}
.is-dark .wave-greydarker{
  fill: var(--night-light-1); /*cambiar color por props del wave a dark*/
}
</style>
