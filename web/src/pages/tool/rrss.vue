<route lang="yaml">
meta:
  layout: default
</route>

<script setup lang="ts">
import { customerLogos } from '/@src/texts/assets/logos'
//import { testimonials } from '/@src/texts/assets/testimonials'

import {
  insuranceFeatures,
  values,
  featureMatrix,
  textTestimonialBlock,
  testimonials
} from '/@src/texts/tool/rrss'

/*
import {
  insuranceFeatures,
  values,
  appFeatures,
  featureMatrix,
  testimonials,
} from '/@src/data/pages/insurance'
*/
</script>

<template>
  <div>
    
    <component :is="'style'">
      .color-kit-digital{
        fill: #d21643 !important;
      }
      .button-kit-digital, .custom-toggle input:checked + span span.track .track-knob{
        background: #d21643 !important;
        border-color: #d21643 !important;
      }
    </component>
    
    <ToolPanel  type="rrss" color="red"/>
    
      <Section class="mt-10">
        <Container>
          <RrssFeatureSeo color="red"/>
        </Container>
      </Section>


    <Section >
      <Container>
        <RrssTestimonialBlock
          image="/assets/illustrations/rrss/example.jpeg"
          :title="$t('testimonialBlock_title')"
          :content="textTestimonialBlock.subtitle"
          :link-label="$t('testimonialBlock_btn')"
          :link="textTestimonialBlock.link"
        />
      </Container>
    </Section>

    <Section color="grey">
      <Container>
        <RrssValuesSection :values="values" />
      </Container>
    </Section>

    <Section>
      <Container>
        <RrsStackedSection
          :features="insuranceFeatures"
          image="/assets/illustrations/features/ensuring.svg"
          dark-image="/assets/illustrations/features/ensuring-dark.svg"
          rounded
        />
      </Container>
    </Section>

    <RrssTestimonials 
      :testimonials="testimonials"
      compact
    />
      
    <div v-if="false">
      <Section>
        <Container>
          <RrssFeatureBlockA
            :features="featureMatrix"
            :columns="3"
            :limit="8"
            size="small"
          />
        </Container>
      </Section>

      <Section wave="wave-2">
        <Container>
          <RrssCenteredMedia
            title="The Tool made for people like you"
            cta-text="Start My Free-Trial"
            cta-link="/about"
          />
        </Container>
      </Section>

      <Section color="grey">
        <Container>
          <SectionTitle
            title="They're in love with what we do"
            subtitle="Why you should try"
          />
        </Container>
      </Section>

      

      <Section color="grey" wave="wave-2" shape-color="footer-dark">
        <Container>
          <RrssCompanyGrid
            class="-mt-6"
            title="The best insurance deals"
            :logos="customerLogos"
            :limit="20"
          />
        </Container>
      </Section>
      
      
      </div>
      
     <RrssHome /> 
     
    <FooterD color="light" />
  </div>
</template>



