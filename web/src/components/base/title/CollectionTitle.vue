<script setup lang="ts">
export interface CollectionTitleProps {
  title: string
  subtitle: string
  inverted?: boolean
  spaced?: boolean
}

const props = withDefaults(defineProps<CollectionTitleProps>(), {
  title: undefined,
  subtitle: undefined,
  inverted: false,
  spaced: false
})
</script>

<template>
  <div class="collection-title">
    <div class="left">
      <Title tag="h2" :size="3" weight="bold" :inverted="props.inverted">
        <span class="titulo">
          <slot>{{ props.title }}</slot>
        </span>
      </Title>
      <Subtitle tag="h3" :size="6">
        <span class="subtitle">
          <slot>{{ props.subtitle }}</slot>
        </span>
      </Subtitle>
    </div>
    <div class="right">
      <slot name="toolbar"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.collection-title {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 60px;
}
.collection-title .titulo {
   color: var(--primary);
}
.collection-title span .subtitle{
  color: #000 !important;
}
.is-dark {
.collection-title .subtitle {
    color: var(--white-smoke) !important; 
}
}
@media only screen and (max-width: 767px) {
  .collection-title {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
