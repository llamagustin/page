<script lang="ts" setup>
import { PhArrowLeft, PhArrowRight } from "phosphor-vue";
import { computed, defineProps } from "vue";

interface Props {
  typeArrow?: string;
  isDisabled?: boolean;
  outline?: boolean;
  otherText?: boolean;
  hiddenArrow?: boolean;
}

interface Styled {
  cursor: string;
  bgColor: string;
}

const props = defineProps<Props>();
const { typeArrow, isDisabled } = toRefs(props);

const styled = computed<Styled>(() => {
  return {
    cursor: !isDisabled.value ? "cursor-pointer" : "cursor-default",
    bgColor: !isDisabled.value ? "#000fff !important" : "",
  };
});

const properties = computed(() => {
  const properties = {}
  
  if(props.hiddenArrow) {
    properties.size = 'x-large';
  }
  
  return properties
})


</script>

<template>
  <div class="d-inline-block">
    <template v-if="outline">
      <a href="javascript:;" class="d-inline-flex align-center gap-1 link">
        Ir atrás
      </a>
    </template>
    <template v-else>
      <VBtn
        color="secondary text-lg-body-2"
        class="ml-auto next-button"
        :class="[styled.cursor]"
        :style="{ background: styled.bgColor }"
        v-bind="{...properties}"
      >
        <div class="d-flex items-center gap-2">
          <span v-if="otherText">
            <slot></slot>
          </span>
          <span v-else> Siguiente paso </span>
          <template v-if="!hiddenArrow">
            <PhArrowLeft v-if="typeArrow === 'left'" :size="20" />
            <PhArrowRight v-if="typeArrow === 'right'" :size="20" />
          </template>
        </div>
      </VBtn>
    </template>
  </div>
</template>

<style scoped>
.next-button {
  width: auto;
  text-transform: capitalize;
}

.link:hover {
  border-bottom: 1px solid;
}
</style>
