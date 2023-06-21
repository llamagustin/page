<route lang="yaml">
  meta:
  layout: default
</route>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import {
    textA,
    textB,
    textC,
    speakers,
    conferenceGallery,
  }
  from '/@src/texts/wait'

  const features = ref([{
    color: 'red',
    icon: 'd3rfef',
    title: '334',
    text: '43r'
  }])

  const tabbedProcess = {
    steps: [{
        id: 0,
        icon: '/assets/icons/abstract/1.svg',
        title: 'En 4 pasos tu negocio digital',
        content: `¿Quieres emprender pero no sabes por dónde empezar? ¡Nuestro repositorio de 
        negocios es la solución! Construye tu negocio en tan solo 4 pasos con los 
        recursos necesarios de profesionales, servicios y herramientas, todo completamente gratuito. 
        ¡Haz realidad tu sueño empresarial!`,
      },
      {
        id: 1,
        icon: '/assets/icons/abstract/2.svg',
        title: 'Usa +2000 prompts de GPT',
        content: `Descubre los secretos del éxito empresarial con los prompts más utilizados de 
        nuestra comunidad. Gracias al poder de GPT, podrás entender y crear tu proyecto de 
        manera sencilla y rápida. ¡Aprovecha la herramienta de nueva generación del Big Data 
        y conviértete en un emprendedor exitoso!`,
      },
      {
        id: 2,
        icon: '/assets/icons/abstract/3.svg',
        title: 'Usa 6 sentidos de AI',
        content: `¿Quieres mejorar la eficiencia de tu equipo en el uso de inteligencias artificiales? 
        Ofrecemos una herramienta completa que facilita todos los procesos de creación. 
        Así podrás aprovechar al máximo todas las ventajas de la tecnología para lograr 
        los objetivos de tu negocio. ¡Innova con nosotros!`,
      },
      {
        id: 3,
        icon: '/assets/icons/abstract/4.svg',
        title: 'Contrata cualquier cosa',
        content: `¿Cómo saber si estás logrando tus objetivos empresariales? ¡Con nuestro sistema de 
        métricas combinadas de producto, campaña y rentabilidad lo sabrás! Comprende el 
        desempeño total de tu negocio con información individual y toma decisiones 
        estratégicas basadas en datos. ¡Potencia tu empresa con nosotros!`,
      },
    ],
    images: [{
        id: 0,
        url: '/assets/illustrations/placeholder/placeholder-process-1.png',
        darkUrl: '/assets/illustrations/placeholder/placeholder-process-1-dark.png',
      },
      {
        id: 2,
        url: '/assets/illustrations/placeholder/placeholder-process-2.png',
        darkUrl: '/assets/illustrations/placeholder/placeholder-process-2-dark.png',
      },
      {
        id: 3,
        url: '/assets/illustrations/placeholder/placeholder-process-3.png',
        darkUrl: '/assets/illustrations/placeholder/placeholder-process-3-dark.png',
      },
      {
        id: 4,
        url: '/assets/illustrations/placeholder/placeholder-process-4.png',
        darkUrl: '/assets/illustrations/placeholder/placeholder-process-4-dark.png',
      },
    ]
  }
</script>

<template>
  <div>
    <WaitHome />
    <HomeVideo />
    <container>
      <WaitFeatures :steps="tabbedProcess.steps" :images="tabbedProcess.images" />
      <WaitTimelineTitle class="mt-20" :title="$t('waittextC_title')" :subtitle="$t('waittextC_subtitle')" :minititle="$t('waittextC_minititle')" color="primary" :step="1" />
      <WaitHeroD2 />
    </container>
    <WaitHeaderCta />
    <container>
      <WaitTimelineTitle class="mt-10" :title="$t('waittextA_title')" :subtitle="$t('waittextA_subtitle')" :minititle="$t('waittextA_minititle')" color="primary" :step="2" />
      <ClientGlobeStats2 class="goble-component mb-0" />
      <WaitTimelineTitle class="mb-10" :title="$t('waittextB_title')" :subtitle="$t('waittextB_subtitle')" :minititle="$t('waittextB_minititle')" color="primary" :step="3" />
      <WaitTabbedFeatures />
    </container>
  </div>
  <FooterD class="mt-20" color="light" />
</template>

<style type="scss" scoped>
  .goble-component{
    margin-top: 160px;
  }
</style>
