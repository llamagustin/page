<script setup lang="ts">
export type IconBoxSize = 'small' | 'medium' | 'large' | 'big' | 'xl'

export interface IconBoxProps {
  size?: IconBoxSize
  color?: string
  rounded?: boolean
  bordered?: boolean
  inverted?: boolean
}

const props = withDefaults(defineProps<IconBoxProps>(), {
  size: undefined,
  color: 'default',
  bordered: false,
  inverted: false,
})
</script>

<template>
  <div
    class="icon-box"
    :class="[
      props.size && 'is-' + props.size,
      props.rounded && 'is-rounded',
      props.bordered && 'is-bordered',
      props.inverted && 'is-inverted',
    ]"
    :style="{
      background: props.color
    }"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.icon-box {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  min-width: 40px;
  border-radius: 0.5rem;
  background: var(--icon-bg-color);
  transition: all 0.3s;
  color: #fff !important;
  
  &.is-small {
    height: 32px;
    width: 32px;
    min-width: 32px;

    svg {
      height: 16px;
      width: 16px;
      stroke-width: 1.4px;
    }
  }

  &.is-medium {
    height: 50px;
    width: 50px;
    min-width: 50px;
    font-size: 1.25rem;
    border-radius: 0.75rem;

    &.is-bordered {
      border-width: 1.6px;
    }

    svg {
      height: 25px;
      width: 25px;
      stroke-width: 1.4px;
    }
  }

  &.is-large {
    height: 68px;
    width: 68px;
    min-width: 68px;
    font-size: 1.9rem;
    border-radius: 1rem;

    &.is-bordered {
      border-width: 2px;
    }

    svg {
      height: 34px;
      width: 34px;
      stroke-width: 2px;
    }
  }

  &.is-big {
    height: 80px;
    width: 80px;
    min-width: 80px;
    font-size: 1.75rem;
    border-radius: 1.25rem;

    &.is-bordered {
      border-width: 2px;
    }

    svg {
      height: 40px;
      width: 40px;
      stroke-width: 3px;
    }
  }

  &.is-xl {
    height: 100px;
    width: 100px;
    min-width: 100px;
    font-size: 2rem;
    border-radius: 1.5rem;

    &.is-bordered {
      border-width: 2px;
    }

    svg {
      height: 50px;
      width: 50px;
      stroke-width: 3px;
    }
  }

  &.is-rounded {
    border-radius: 50%;
  }

  &.is-inverted {
    i {
      color: var(--white-smoke) !important;
    }

    :deep(svg) {
      color: var(--white-smoke) !important;
    }
  }

  &.is-default {
    :deep(svg) {
      color: var(--icon-color);
    }
  }


  &.is-bordered {
    border: 1px solid var(--widget-grey);
  }


  .iconify {
    font-size: 1.4rem;
    color: #fff !important;
    transition: color 0.3s;
  }

  svg {
    height: 20px;
    width: 20px;
    color: #fff !important;
    stroke-width: 1.4px;
  }
}


.is-dark {
  .icon-box {
    i{
      color: red !important;
    }
    
    :deep(svg) {
      color: #fff !important;
    }
  }
}
</style>
