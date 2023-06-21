<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'

interface Props {
  data?: any
}

const props = defineProps<Props>()
</script>

<template>
  <VCard v-if="data">
    <VCardText class="d-flex flex-column pb-0">


      <h6 class="text-h6 mt-3 mb-1">
        <!--{{ props.stats }}-->
        {{ data.stats }}
      </h6>
      <span class="text-sm">{{ data.title }}</span>
    </VCardText>

    <VueApexCharts
      :series="data.series"
      :options="data.chartOptions"
      :height="data.height"
    />
  </VCard>
</template>
