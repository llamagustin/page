<script setup lang="ts">
const sourceVisits = [
  {
    avatarIcon: 'tabler-shadow',
    title: 'Fuente directa',
    subtitle: 'Clic en enlace directo',
    stats: '1.2k',
    profitLoss: 4.2,
  },
  {
    avatarIcon: 'tabler-globe',
    title: 'Red Social',
    subtitle: 'Canales sociales',
    stats: '31.5k',
    profitLoss: 8.2,
  },
  {
    avatarIcon: 'tabler-mail',
    title: 'Boletín electrónico',
    subtitle: 'Campañas de correo',
    stats: '893',
    profitLoss: 2.4,
  },
  {
    avatarIcon: 'tabler-external-link',
    title: 'Referencias',
    subtitle: 'Visitas de radio de impacto',
    stats: '342',
    profitLoss: -0.4,
  },
  {
    avatarIcon: 'tabler-discount-2',
    title: 'ADVT',
    subtitle: 'Google ADVT',
    stats: '2.15k',
    profitLoss: 9.1,
  },
  {
    avatarIcon: 'tabler-star',
    title: 'Otros',
    subtitle: 'Muchas fuentes',
    stats: '12.5k',
    profitLoss: 6.2,
  },
]
</script>

<template>
  <VCard
    title="Visitas de origen"
    subtitle="38.4k Visitantes"
  >
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

    <VCardText>
      <VList class="card-list">
        <VListItem
          v-for="visit in sourceVisits"
          :key="visit.title"
        >
          <template #prepend>
            <VAvatar
              size="34"
              color="secondary"
              variant="tonal"
              rounded
            >
              <VIcon :icon="visit.avatarIcon" />
            </VAvatar>
          </template>

          <VListItemTitle class="font-weight-medium">
            {{ visit.title }}
          </VListItemTitle>
          <VListItemSubtitle class="opacity-100 text-disabled">
            {{ visit.subtitle }}
          </VListItemSubtitle>

          <template #append>
            <div class="d-flex align-center">
              <span class="me-2">{{ visit.stats }}</span>
              <VChip
                label
                :color="visit.profitLoss > 0 ? 'success' : 'error'"
              >
                {{ visit.profitLoss > 0 ? '+' : '' }}
                {{ visit.profitLoss }}%
              </VChip>
            </div>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 19px;
}
</style>
