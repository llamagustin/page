<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { hexToRgb } from '@layouts/utils'

const vuetifyTheme = useTheme()



interface Props {
  data: any
}

const props = defineProps<Props>()

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables
  const colorInactive = `rgba(${hexToRgb(currentTheme.primary)},${variableTheme['pressed-opacity']})`
  return {
    chart: {
      parentHeightOffset: 0,
      type: 'bar',
      toolbar: {
        show: false,
      },
      // events: {
      //   click: function (event, chartContext, { dataPointIndex, seriesIndex }) {
      //     const value = chartContext.w.globals.series[seriesIndex][dataPointIndex];
      //     alert(`Clicked on series ${seriesIndex}, data point ${dataPointIndex}. Value: ${value}`);
      //   },
      // },
    },
    plotOptions: { 
      bar: {
        barHeight: '60%',
        columnWidth: '35%',
        startingShape: 'rounded',
        endingShape: 'rounded',
        borderRadius: 4,
        distributed: true,
      },
    },
    grid: {
      show: false,
      padding: {
        top: -30,
        bottom: 0,
        left: -10,
        right: -10,
      },
    },
    colors: [
      colorInactive,
      colorInactive,
      colorInactive,
      colorInactive,
      colorInactive,
      colorInactive,
      colorInactive,
      colorInactive,
      colorInactive,
      colorInactive,
      colorInactive,
      currentTheme.primary,
    ],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    
    xaxis: {
      categories: [
        'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic', 'Ene', 'Feb'
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: `rgba(${hexToRgb(currentTheme['on-surface'])},${variableTheme['disabled-opacity']})`,
          fontSize: '14px',
          fontFamily: 'Public Sans',
        },
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 1025,
        options: {
          chart: {
            height: 199,
          },
        },
      },
    ],
  }
})







// function handleClick(event, chartContext, { dataPointIndex, seriesIndex }) {
//   console.log(`Clicked on series ${seriesIndex}, data point ${dataPointIndex}`);
// }
</script>

<template>
  <VCard v-if="data">
    <VCardItem class="pb-sm-0">
      <VCardTitle>Informes Ingresos</VCardTitle>
      <VCardSubtitle>Resumen de ganancias semanales</VCardSubtitle>

    </VCardItem>

    <VCardText>
      <VRow>
        <VCol
          cols="12"
          sm="5"
          class="d-flex flex-column align-self-end"
        >
          <div class="d-flex align-center gap-2 mb-2 pb-1 flex-wrap">
            <h4 class="text-4xl font-weight-semibold">
              {{data.total}}
            </h4>
            <VChip
              label
              color="success"
            >
              {{data.stats}}
            </VChip>
          </div>

          <p class="text-sm">
            Informe completdo de los ultimos 6 meses
          </p>
        </VCol>

        <VCol
          cols="12"
          sm="7"
          class="pt-0"
        >
          <VueApexCharts
            :options="chartOptions"
            :series="data.series"
            height="190"
          />
        </VCol>
      </VRow>

      <div class="border rounded mt-3 pa-4">
        <VRow v-if="data.data">
          <VCol
            v-for="report in data.data"
            :key="report.title"
            cols="12"
            sm="4"
          >
            <div class="d-flex align-center">
              <VAvatar
                rounded
                size="30"
                :color="report.color"
                variant="tonal"
                class="me-2"
              >
                <VIcon :icon="report.icon" />
              </VAvatar>

              <h6 class="text-base font-weight-medium">
                {{ report.title }}
              </h6>
            </div>
            <h6 class="text-h6 my-3">
              {{ report.amount }}
            </h6>
            <VProgressLinear
              :model-value="report.progress"
              :color="report.color"
              height="8"
              rounded
              rounded-bar
            />
          </VCol>
        </VRow>
      </div>
    </VCardText>
  </VCard>
</template>
