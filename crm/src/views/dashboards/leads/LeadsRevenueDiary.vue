<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { hexToRgb } from '@layouts/utils'

const vuetifyTheme = useTheme()



interface Props {
  data?: object
}

const props = withDefaults(defineProps<Props>(), {
  data: {
    total: '€0,0',
    rate: '+0%',
    series: [{
      name: 'Hello',
      data: [0, 0, 0, 0, 0, 0],
    }]
  }
})


const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables

  const labelSuccessColor = `rgba(${hexToRgb(currentTheme.success)},0.16)`
  const labelColor = `rgba(${hexToRgb(currentTheme['on-surface'])},${variableTheme['disabled-opacity']})`

  return {
    chart: {
      type: 'bar',
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        barHeight: '80%',
        columnWidth: '30%',
        startingShape: 'rounded',
        endingShape: 'rounded',
        borderRadius: 6,
        distributed: true,
      },
    },
    tooltip: {
      enabled: false,
    },
    grid: {
      show: false,
      padding: {
        top: -20,
        bottom: -12,
        left: -10,
        right: 0,
      },
    },
    colors: [
      labelSuccessColor,
      labelSuccessColor,
      labelSuccessColor,
      labelSuccessColor,
      currentTheme.success,
      labelSuccessColor,
      labelSuccessColor,
    ],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: ['Dic', 'Ene', 'Feb', 'Mar', 'Abr'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '14px',
          fontFamily: 'Public sans',
        },
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    states: {
      hover: {
        filter: {
          type: 'none',
        },
      },
    },
    responsive: [
      {
        breakpoint: 1471,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '50%',
            },
          },
        },
      },
      {
        breakpoint: 1350,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '57%',
            },
          },
        },
      },
      {
        breakpoint: 1032,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '60%',
            },
          },
        },
      },
      {
        breakpoint: 992,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '40%',
              borderRadius: 8,
            },
          },
        },
      },
      {
        breakpoint: 855,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '50%',
              borderRadius: 6,
            },
          },
        },
      },
      {
        breakpoint: 440,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '40%',
            },
          },
        },
      },
      {
        breakpoint: 381,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '45%',
            },
          },
        },
      },
    ],
  }
})
</script>

<template>
  <VCard>
    <VCardText class="d-flex justify-space-between">
      <div class="d-flex flex-column">
        <div class="mb-auto">
          <h6 class="text-h6 text-no-wrap">
            Ingresos Diarios
          </h6>
          <span class="text-sm">Hoy</span>
        </div>

        <div>
          <h5 class="text-h5 mb-1">
            {{ props.data.total }}
          </h5>
          <VChip
            label
            color="success"
          >
            {{ props.data.rate }}
          </VChip>
        </div>
      </div>
      <div>
        <VueApexCharts
          :options="chartOptions"
          :series="props.data.series"
          :height="165"
        />
      </div>
    </VCardText>
  </VCard>
</template>
