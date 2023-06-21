<script setup lang="ts">
import { useUserListStore } from '@/views/apps/user/useUserListStore'
import { VIcon} from 'vuetify/lib/components/VIcon/VIcon'
//import { VImg } from 'vuetify/lib/components/VImg/VImg'
import sliderBar1 from '@/assets/images/illustrations/sidebar-pic-1.png'
import sliderBar2 from '@/assets/images/illustrations/sidebar-pic-2.png'
import sliderBar3 from '@/assets/images/illustrations/sidebar-pic-3.png'
//import {services} from  '@/@fake-db/services.ts'


interface Props {
  data: any
}

const props = defineProps<Props>()
const Store = useUserListStore()

// console.log('props', props.analytics)


// const websiteAnalytics = [
//   {
//     name: 'Tráfico',
//     slideImg: services[0].image,
//     title: services[0].title,
//     subtitle: services[0].subtitle,
//     data: [
//       {
//         number: analytics.value.web.accepted,
//         text: 'accepted',
//       },
//       {
//         number: analytics.value.web.pending,
//         text: 'pending',
//       },
//       {
//         number: analytics.value.web.totalMoney,
//         text: 'totalMoney',
//       },
//       {
//         number: analytics.value.web.pendingMoney,
//         text: 'pendingMoney',
//       },
//     ],
//   },
//   {
//     name: 'Gasto',
//     slideImg: services[1].image,
//     title: services[1].title,
//     subtitle: services[1].subtitle,
//     data: [
//       {
//         number: '12h',
//         text: 'Gastado',
//       },
//       {
//         number: '182',
//         text: 'Pedidos',
//       },
//       {
//         number: '127',
//         text: 'Pedidos',
//       },
//       {
//         number: '23k',
//         text: 'Items',
//       },
//     ],
//   },
//   {
//     name: 'Fuentes de Ingresos',
//     slideImg: services[2].image,
//     title: services[2].title,
//     subtitle: services[2].subtitle,
//     data: [
//       {
//         number: '268',
//         text: 'Directo',
//       },
//       {
//         number: '890',
//         text: 'Orgánico',
//       },
//       {
//         number: '622',
//         text: 'Por referencia',
//       },
//       {
//         number: '1.2k',
//         text: 'Campaña',
//       },
//     ],
//   },
//   {
//     name: 'Fuentes de Ingresos',
//     slideImg: services[3].image,
//     title: services[3].title,
//     subtitle: services[3].subtitle,
//     data: [
//       {
//         number: analytics.value.social.accepted,
//         text: 'accepted',
//       },
//       {
//         number: analytics.value.social.pending,
//         text: 'pending',
//       },
//       {
//         number: analytics.value.social.totalMoney,
//         text: 'totalMoney',
//       },
//       {
//         number: analytics.value.social.pendingMoney,
//         text: 'pendingMoney',
//       },
//     ],
//   },
//   {
//     name: 'Fuentes de Ingresos',
//     slideImg: services[4].image,
//     title: services[4].title,
//     subtitle: services[4].subtitle,
//     data: [
//       {
//         number: '268',
//         text: 'Directo',
//       },
//       {
//         number: '890',
//         text: 'Orgánico',
//       },
//       {
//         number: '622',
//         text: 'Por referencia',
//       },
//       {
//         number: '1.2k',
//         text: 'Campaña',
//       },
//     ],
//   },
//   {
//     name: 'Fuentes de Ingresos',
//     slideImg: services[5].image,
//     title: services[5].title,
//     subtitle: services[5].subtitle,
//     data: [
//       {
//         number: '268',
//         text: 'Directo',
//       },
//       {
//         number: '890',
//         text: 'Orgánico',
//       },
//       {
//         number: '622',
//         text: 'Por referencia',
//       },
//       {
//         number: '1.2k',
//         text: 'Campaña',
//       },
//     ],
//   },
// ]

/*
console.log("analytics", analytics.value)
Store.analytics(props.idAccount).then(rs=>{
console.log("data", rs.data)
 analytics.value =rs.data;
})
*/

</script>

<template>
  <VCard>
    <VCarousel
      cycle
      :continuous="false"
      :show-arrows="false"
      hide-delimiter-background
      :delimiter-icon="() => h(VIcon, { icon: 'fa-circle', size: '10' })"
      height="auto"
      class="carousel-delimiter-top-end web-analytics-carousel"
    >
      <VCarouselItem
        v-for="item in data"
        :key="item.name"
        :style="{background: item.color}"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <h6 class="text-h6 text-white mb-1">
                {{item.title}}  <!--Website Analytics-->
              </h6>
              <p class="text-sm text-white mb-0">
                {{item.subtitle}} <!--Total 28.5% Tasa de conversión-->
              </p>
            </VCol>

            <VCol
              cols="12"
              sm="6"
              order="2"
              order-sm="1"
            >
              <VRow class="text-white">
                <VCol
                  cols="12"
                  class="pb-0"
                >
                  <p class="font-weight-semibold visivility-hidden">
                    Información
                  </p>
                </VCol>

                <VCol cols="6" class="text-no-wrap" >
                  <VChip label class="me-2" >
                    {{ item.data[0].quantity }}
                  </VChip>
                  <span class="text-xs">Acceptado</span>
                </VCol>
                <VCol cols="6" class="text-no-wrap" >
                  <VChip label class="me-2" >
                    {{ item.data[1].quantity }}
                  </VChip>
                  <span class="text-xs">Pendiente</span>
                </VCol>
                <VCol cols="6" class="text-no-wrap" >
                  <VChip label class="me-2" >
                    {{ item.data[2].quantity }}
                  </VChip>
                  <span class="text-xs">Dinero total</span>
                </VCol>
                <VCol cols="6" class="text-no-wrap" >
                  <VChip label class="me-2" >
                    {{ item.data[3].quantity }}
                  </VChip>
                  <span class="text-xs">Dinero pendiente</span>
                </VCol>
              </VRow>
            </VCol>
            
            <VCol
              cols="12"
              sm="6"
              order="1"
              order-sm="2"
              class="position-relative text-center"
            >
             <!--imagen-->
              <img
                :src="item.slideImg"
                class="card-website-analytics-img" />
            <!--VImg :icon="item.slideImg" /-->
            
            </VCol>
          </VRow>
        </VCardText>
      </VCarouselItem>
    </VCarousel>
  </VCard>
</template>

<style lang="scss">
.card-website-analytics-img {
  block-size: 140px;
}

.visivility-hidden {
  visibility: hidden;
}

@media screen and (min-width: 600px) {
  .card-website-analytics-img {
    position: absolute;
    margin: auto;
    inset-block-end: 40px;
    inset-block-start: -1rem;
    inset-inline-end: .1rem;/*1rem*/
  }
}

.web-analytics-carousel {
  .v-carousel__controls {
    .v-btn:not(.v-btn--active) {
      opacity: 0.4;
    }
  }
}
</style>

