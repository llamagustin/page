<script setup lang="ts">
import logo_web from '@/assets/images/services/blue.png'
import logo_ecommerce from '@/assets/services/logos/blue.png'
import logo_seo from '@/assets/images/services/blue.png'
import logo_rrss from '@/assets/images/services/blue.png'
import logo_office from '@/assets/images/services/blue.png'
import logo_crm from '@/assets/images/services/blue.png'



interface Props {
  data?: object
}

const props = withDefaults(defineProps<Props>(), {
  data: [
    // {
    //   avatarImg: logo_web,
    //   title: 'Google Chrome',
    //   stats: '90.4',
    //   progress: 'secondary',
    // },
    // {
    //   avatarImg: logo_web,
    //   title: 'Apple Safari',
    //   stats: '70.6',
    //   progress: 'success',
    // }
  ]
})

</script>

<template>
  <VCard
    title="Estados de Servicios"
    subtitle="Contador Abril 2022"
  >
    <VCardText>
      <VList class="card-list">
        <VListItem
          v-for="state in props.data"
          :key="state.title"
        >
          <template #prepend>
            <VAvatar
              size="28"
              :image="state.avatarImg"
            />
          </template>

          <VListItemTitle class="font-weight-medium">
            {{ state.title }}
          </VListItemTitle>

          <template #append>
            <span class="font-weight-medium text-medium-emphasis me-3">{{ state.stats }}%</span>
            <VProgressCircular
              :model-value="state.stats"
              :color="state.progress"
              width="3"
            />
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 30px;
}
</style>
