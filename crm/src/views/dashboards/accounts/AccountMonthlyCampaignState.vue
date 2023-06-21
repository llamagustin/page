<script setup lang="ts">

interface Props {
  data: any
}



const props = defineProps<Props>()


const monthlyCampaignState = [
  {
    avatarColor: 'success',
    avatarIcon: 'tabler-mail',
    title: 'Emails',
    statsColor: 'success',
  },
  {
    avatarColor: 'primary',
    avatarIcon: 'tabler-users',
    title: 'Nuevos',
    statsColor: 'success',
  },
  {
    avatarColor: 'info',
    avatarIcon: 'tabler-link',
    title: 'Abierto',
    statsColor: 'success',
  },
  {
    avatarColor: 'warning',
    avatarIcon: 'tabler-click',
    title: 'Hizo clic',
    statsColor: 'error',
  },
  {
    avatarColor: 'secondary',
    avatarIcon: 'tabler-alert-triangle',
    title: 'Pendientes',
    statsColor: 'error',
  },
  {
    avatarColor: 'error',
    avatarIcon: 'tabler-ban',
    title: 'No suscrito',
    statsColor: 'success',
  },
]

</script>

<template>
  <VCard
    v-if="data"
    title="Estado de campaña mensual"
    subtitle="8.52k visitantes sociales"
  >
    <!--
    <template #append>
      <div class="mt-n4 me-n2">
        <VBtn
          icon
          color="default"
          size="x-small"
          variant="plain"
        >
          <VIcon
            size="22"
            icon="tabler-dots-vertical"
          />

          <VMenu activator="parent">
            <VList>
              <VListItem
                v-for="(item, index) in ['Actualizar', 'Descargar', 'Ver todo']"
                :key="index"
                :value="index"
              >
                <VListItemTitle>{{ item }}</VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>
        </VBtn>
      </div>
    </template>
    -->

    <VCardText>
      <VList class="card-list">
        <VListItem
          v-for="(state, key) in monthlyCampaignState"
          :key="state.title"
        >
          <template #prepend>
            <VAvatar
              :color="state.avatarColor"
              variant="tonal"
              size="34"
              rounded
            >
              <VIcon :icon="state.avatarIcon" />
            </VAvatar>
          </template>

          <VListItemTitle class="font-weight-medium">
            {{ state.title }}
          </VListItemTitle>

          <template #append>
            <span class="font-weight-medium text-medium-emphasis me-3">
              {{ data[key].count }}</span>
            <span :class="`text-${state.statsColor}`">
              {{ data[key].stats }}
            </span>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 26px;
}
</style>
