<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { hexToRgb } from '@layouts/utils'

const vuetifyTheme = useTheme()

const currentTab = ref<number>(0)
const refVueApexChart = ref()



interface Props {
  data?: object
}

const props = withDefaults(defineProps<Props>(), {
  data: [{
    title: 'Web',
    icon: 'tabler-shopping-cart',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
  },{
    title: 'eCommerce',
    icon: 'tabler-chart-bar',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
  },{
    title: 'SEO',
    icon: 'tabler-chart-pie-2',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
  },{
    title: 'RRSS',
    icon: 'tabler-chart-pie-2',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
  },{
    title: 'Office',
    icon: 'tabler-shopping-cart',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
  },{
    title: 'CRM',
    icon: 'tabler-shopping-cart',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
  }]
})




const chartConfigs = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables

  const labelPrimaryColor = `rgba(${hexToRgb(currentTheme.primary)},${variableTheme['dragged-opacity']})`
  const legendColor = `rgba(${hexToRgb(currentTheme['on-background'])},${variableTheme['high-emphasis-opacity']})`
  const borderColor = `rgba(${hexToRgb(String(variableTheme['border-color']))},${variableTheme['border-opacity']})`
  const labelColor = `rgba(${hexToRgb(currentTheme['on-surface'])},${variableTheme['disabled-opacity']})`
  
  
  //
  var data = []
  props.data.map( i => {
    data.push({
      title: i.title,
      icon: i.icon,
      chartOptions: {
        chart: {
          parentHeightOffset: 0,
          type: 'bar',
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: '32%',
            startingShape: 'rounded',
            borderRadius: 4,
            distributed: true,
            dataLabels: {
              position: 'top',
            },
          },
        },
        grid: {
          show: false,
          padding: {
            top: 0,
            bottom: 0,
            left: -10,
            right: -10,
          },
        },
        colors: [
          labelPrimaryColor,
          labelPrimaryColor,
          currentTheme.primary,
          labelPrimaryColor,
          labelPrimaryColor,
          labelPrimaryColor,
          labelPrimaryColor,
          labelPrimaryColor,
          labelPrimaryColor,
        ],
        dataLabels: {
          enabled: true,
          formatter(val: unknown) {
            return `${val}k`
          },
          offsetY: -25,
          style: {
            fontSize: '15px',
            colors: [legendColor],
            fontWeight: '600',
            fontFamily: 'Public Sans',
          },
        },
        legend: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          axisBorder: {
            show: true,
            color: borderColor,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            style: {
              colors: labelColor,
              fontSize: '14px',
              fontFamily: 'Public Sans',
            },
          },
        },
        yaxis: {
          labels: {
            offsetX: -15,
            formatter(val: number) {
              return `$${parseInt(val / 1)}k`
            },
            style: {
              fontSize: '14px',
              colors: labelColor,
              fontFamily: 'Public Sans',
            },
            min: 0,
            max: 60000,
            tickAmount: 6,
          },
        },
        responsive: [
          {
            breakpoint: 1441,
            options: {
              plotOptions: {
                bar: {
                  columnWidth: '41%',
                },
              },
            },
          },
          {
            breakpoint: 590,
            options: {
              plotOptions: {
                bar: {
                  columnWidth: '61%',
                },
              },
              yaxis: {
                labels: {
                  show: false,
                },
              },
              grid: {
                padding: {
                  right: 0,
                  left: -20,
                },
              },
              dataLabels: {
                style: {
                  fontSize: '12px',
                  fontWeight: '400',
                },
              },
            },
          },
        ],
      },
      series: [
        {
          data: i.data,
        },
      ],
    })
  })
  
  return data
 
})
</script>

<template>
  <VCard
    title="Informes de Servicios"
    subtitle="Resumen de ganancias anuales"
  >
    <template #append>
      <div class="mt-n4 me-n2">
        <VBtn
          icon
          size="x-small"
          variant="plain"
          color="default"
        >
          <VIcon
            size="22"
            icon="tabler-dots-vertical"
          />

          <VMenu activator="parent">
            <VList>
              <VListItem
                v-for="(item, index) in ['View More', 'Delete']"
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
      <VSlideGroup
        v-model="currentTab"
        show-arrows
        mandatory
      >
        <VSlideGroupItem
          v-for="(report, index) in chartConfigs"
          :key="report.title"
          v-slot="{ isSelected, toggle }"
          :value="index"
        >
          <div
            style=" width: 110px;height: 94px;"
            :style="isSelected ? 'border-color:rgb(var(--v-theme-primary)) !important' : ''"
            :class="isSelected ? 'border' : 'border border-dashed'"
            class="d-flex flex-column justify-center align-center cursor-pointer rounded px-5 py-2 me-6"
            @click="toggle"
          >
            <VAvatar
              rounded
              size="38"
              :color="isSelected ? 'primary' : 'secondary'"
              variant="tonal"
              class="mb-2"
            >
              <VIcon :icon="report.icon" />
            </VAvatar>
            <p class="mb-0">
              {{ report.title }}
            </p>
          </div>
        </VSlideGroupItem>

        <!-- 👉 slider more -->
        <VSlideGroupItem>
          <div
            style=" width: 110px;height: 94px;"
            class="d-flex flex-column justify-center align-center rounded me-6 border border-dashed"
          >
            <VAvatar
              rounded
              size="38"
              color="default"
              variant="tonal"
              class="text-disabled"
            >
              <VIcon icon="tabler-plus" />
            </VAvatar>
          </div>
        </VSlideGroupItem>
      </VSlideGroup>

      <VueApexCharts
        ref="refVueApexChart"
        :key="currentTab"
        :options="chartConfigs[Number(currentTab)].chartOptions"
        :series="chartConfigs[Number(currentTab)].series"
        height="240"
        class="mt-3"
      />
    </VCardText>
  </VCard>
</template>
