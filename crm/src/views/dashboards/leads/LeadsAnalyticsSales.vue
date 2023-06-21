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
    category: ['WEB', 'SHOP', 'SEO', 'RRSS', 'CRM', 'OFFICE'],
    series: [{
       name: 'Total',
       data: [0, 100, 0, 0, 0, 0],
     },{
       name: 'Tools',
       data: [0, 100, 0, 0, 0, 0],
     }]
  }
})

// console.log('data propsss', props.data)



const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables

  const borderColor = `rgba(${hexToRgb(String(variableTheme['border-color']))},${variableTheme['border-opacity']})`
  const labelColor = `rgba(${hexToRgb(currentTheme['on-surface'])},${variableTheme['disabled-opacity']})`
  const legendColor = `rgba(${hexToRgb(currentTheme['on-background'])},${variableTheme['high-emphasis-opacity']})`

  return {
    chart: {
      type: 'radar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: borderColor,
          connectorColors: borderColor,
        },
      },
    },
    stroke: {
      show: false,
      width: 0,
    },
    legend: {
      show: true,
      fontSize: '14px',
      position: 'bottom',
      labels: {
        colors: legendColor,
        useSeriesColors: false,
      },
      markers: {
        height: 10,
        width: 10,
        offsetX: -3,
      },
      itemMargin: {
        horizontal: 10,
      },
      onItemHover: {
        highlightDataSeries: false,
      },
    },
    colors: [currentTheme.primary, currentTheme.info],
    fill: {
      opacity: [1, 0.85],
    },
    markers: {
      size: 0,
    },
    grid: {
      show: false,
      padding: {
        top: 0,
        bottom: -5,
      },
    },
    xaxis: {
      categories: props.data.category,
      labels: {
        show: true,
        style: {
          colors: [labelColor, labelColor, labelColor, labelColor, labelColor, labelColor],
          fontSize: '14px',
          fontFamily: 'Public Sans',
        },
      },
    },
    yaxis: {
      show: false,
      min: 0,
      max: 100,
      tickAmount: 4,
    },
    responsive: [
      {
        breakpoint: 769,
        options: {
          chart: {
            height: 372,
          },
        },
      },
    ],
  }
})

</script>

<template>
  <VCard>
    <VCardItem class="pb-0">
      <VCardTitle>Ventas</VCardTitle>
      <VCardSubtitle>Últimos 6 meses</VCardSubtitle>

    </VCardItem>

    <VCardText>
      <VueApexCharts
        :options="chartOptions"
        :series="props.data.series"
        height="355"
      />
    </VCardText>
  </VCard>
</template>
