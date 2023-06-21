<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()


interface Props {
  data?: object
}

const props = withDefaults(defineProps<Props>(), {
  data: [{
    name: 'PRODUCT A',
    data: [4, 3, 6, 4, 3, 3, 1],
  },
  {
    name: 'PRODUCT B',
    data: [-3, -4, -3, -2, -3, -3, -3],
  }],
})




const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors

  return {
    chart: {
      type: 'bar',
      height: 90,
      parentHeightOffset: 0,
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30%',
        barHeight: '100%',
        borderRadius: 5,
        startingShape: 'rounded',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 1,
      lineCap: 'round',
      colors: [currentTheme.surface],
    },
    legend: {
      show: false,
    },
    colors: [currentTheme.primary, currentTheme.success],
    grid: {
      show: false,
      padding: {
        top: -41,
        right: -5,
        left: -3,
        bottom: -22,
      },
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 1441,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '40%',
            },
          },
        },
      },
      {
        breakpoint: 1300,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '50%',
            },
          },
        },
      },
      {
        breakpoint: 1279,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 6,
              columnWidth: '20%',
            },
          },
        },
      },
      {
        breakpoint: 1025,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 7,
              columnWidth: '25%',
            },
          },
          chart: {
            height: 110,
          },
        },
      },
      {
        breakpoint: 960,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 6,
            },
          },
        },
      },
      {
        breakpoint: 782,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '30%',
            },
          },
        },
      },
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 12,
              columnWidth: '25%',
            },
          },
          chart: {
            height: 160,
          },
        },
      },
      {
        breakpoint: 426,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 8,
            },
          },
        },
      },
      {
        breakpoint: 376,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 6,
            },
          },
        },
      },
    ],
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
  }
})
</script>

<template>
  <VCard>
    <VCardText>
      <div>
        <h6 class="text-h6">
          Lead Generator
        </h6>
        <span class="text-body-2">Últimos 7 días</span>
      </div>

      <VueApexCharts
        :options="chartOptions"
        :series="props.data"
        :height="82"
      />

      <div class="d-flex align-center justify-space-between mt-4">
        <h6 class="text-h6 text-center font-weight-semibold">
          45
        </h6>
        <VChip label="success"  >
          +15
          </VChip>
      </div>
    </VCardText>
  </VCard>
</template>
