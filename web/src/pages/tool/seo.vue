<route lang="yaml">
meta:
  layout: default
</route>

<script setup lang="ts">
import {
  features,
  marketingIconFeatures,
  seoAdvancedReports,
  textA,
  textB,
  textC,
  textD,
  textE,
  textG
} from '/@src/texts/tool/seo+sem'

import { customerLogos } from '/@src/texts/assets/logos'
//import { customerLogos } from '/@src/data/pages/logos'
//import { marketingIconFeatures } from '/@src/data/pages/marketing'
//import { marketingIconFeatures } from '/@src/data/pages/marketing'
//import { features } from '/@src/data/blocks/features'
</script>

<template>
  <div>
    
    <component :is="'style'">
      .color-kit-digital{
        fill: #f7e06f !important;
      }
      .button-kit-digital, .custom-toggle input:checked + span span.track .track-knob{
        background: #f7e06f !important;
        border-color: #f7e06f !important;
      }
    </component>

    <ToolPanel type="seo+sem" color="yellow" />

    
    <Section class="mt-20">
      
      <Container>
        <SectionTitle :title="$t('seoG_title')" :subtitle="$t('seoG_subtitle')" />
        <SEOIconSection class="" :features="marketingIconFeatures" />
       
        <SEOInfoSection :features="seoAdvancedReports" color="yellow"/>

        
        
      </Container>
    </Section>

    <FooterD color="light" />
  </div>
</template>


