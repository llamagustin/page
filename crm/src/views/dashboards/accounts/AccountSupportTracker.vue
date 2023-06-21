<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { hexToRgb } from '@layouts/utils'

interface Props {
  data: any
}



const vuetifyTheme = useTheme()

const props = defineProps<Props>()


const series = ref([10])

if(props.data?.completed) seties.value = [props.data.completed]

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables

  return {
    labels: ['Seguimiento Completados'],
    chart: {
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        offsetY: 10,
        startAngle: -140,
        endAngle: 130,
        hollow: {
          size: '65%',
        },
        track: {
          background: currentTheme.surface,
          strokeWidth: '100%',
        },
        dataLabels: {
          name: {
            offsetY: -20,
            color: `rgba(${hexToRgb(currentTheme['on-background'])},${variableTheme['disabled-opacity']})`,
            fontSize: '14px',
            fontWeight: '400',
            fontFamily: 'Public Sans',
          },
          value: {
            offsetY: 10,
            color: `rgba(${hexToRgb(currentTheme['on-background'])},${variableTheme['high-emphasis-opacity']})`,
            fontSize: '38px',
            fontWeight: '600',
            fontFamily: 'Public Sans',
          },
        },
      },
    },
    colors: [currentTheme.primary],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        shadeIntensity: 0.5,
        gradientToColors: [currentTheme.primary],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 0.6,
        stops: [30, 70, 100],
      },
    },
    stroke: {
      dashArray: 10,
    },
    grid: {
      padding: {
        top: -20,
        bottom: 5,
      },
    },
    states: {
      hover: {
        filter: {
          type: 'none',
        },
      },
      active: {
        filter: {
          type: 'none',
        },
      },
    },
    responsive: [
      {
        breakpoint: 960,
        options: {
          chart: {
            height: 280,
          },
        },
      },
    ],
  }
})

const supportReseller = ref([
  {
    avatarColor: 'primary',
    avatarIcon: 'tabler-phone',
    title: 'Resellers',
    subtitle: '',
  },
  {
    avatarColor: 'primary',
    avatarIcon: 'tabler-ticket',
    title: 'Tickets',
    subtitle: '',
  },

  {
    avatarColor: 'primary',
    avatarIcon: 'tabler-clock',
    title: 'Subastas',
    subtitle: '',
  },
])


</script>

<template>
  <VCard
    v-if="data"
    title="Información Resellers"
    subtitle="Resumen de ventas"
  >
    <VCardText>
      <VRow>
        <VCol
          cols="12"
          md="5"
          sm="6"
          class="mt-auto"
        >
          <div class="mb-4">
            <h4 class="text-4xl font-weight-semibold mb-2">
              {{data.total}}
            </h4>
            <p class="text-sm">
              Tickets vendidos
            </p>
          </div>

          <VList class="card-list">
            <VListItem
              v-for="(reseller, key) in supportReseller"
              :key="reseller.title"
            >
              <VListItemTitle class="font-weight-medium">
                {{ reseller.title }}
              </VListItemTitle>
              <VListItemSubtitle class="opacity-100 text-disabled">
                {{ data.support[key] }}
              </VListItemSubtitle>
              <template #prepend>
                <VAvatar
                  rounded
                  size="34"
                  :color="reseller.avatarColor"
                  variant="tonal"
                >
                  <VIcon :icon="reseller.avatarIcon" />
                </VAvatar>
              </template>
            </VListItem>
          </VList>
        </VCol>
        <VCol
          cols="12"
          md="7"
          sm="6"
        >
          <VueApexCharts
            :options="chartOptions"
            :series="series"
            height="360"
          />
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 18px;
}
</style>
