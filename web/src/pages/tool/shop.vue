<route lang="yaml">
meta:
  layout: default
</route>

<script setup lang="ts">
import {
  textB,
  salesFeatures,
  textC,
  growthFeatures,
  textE,
  managementFeatures,
  textSignUp,
  textTestimonials,
  textF,
  faq,
  testimonials
} from '/@src/texts/tool/ecommerce'

//import { testimonials } from '/@src/texts/assets/testimonials'
import { customerLogos } from '/@src/texts/assets/logos'
</script>

<template>
  <div>
    <!--
    <EcommerceHeroS />
    -->
    <component :is="'style'">
      .color-kit-digital{
        fill: #13d33b !important;
      }
      .button-kit-digital, .custom-toggle input:checked + span span.track .track-knob{
        background: #13d33b !important;
        border-color: #13d33b !important;
      }
    </component>

    <ToolPanel type="ecommerce" color="green"/>
 
    <Section>
      <Container>
        <EcommerceFeatures
          :subtitle="$t('shopB_subtitle')"
          :title="$t('shopB_title')"
          :content="$t('shopB_text')"
          :features="salesFeatures"
          image="/assets/illustrations/features/commerce-feature-1.png"
          dark-image="/assets/illustrations/features/commerce-feature-1-dark.png"
          image-width="900"
          image-height="788"
          blob
        />
      </Container>
    </Section>
    
    <Section>
      <Container>
        <EcommerceFeaturesGrowth
          :subtitle="$t('shopC_subtitle')"
          :title="$t('shopC_title')"
          :content="$t('shopC_text')"
          :features="growthFeatures"
          image="/assets/illustrations/features/commerce-feature-3.png"
          dark-image="/assets/illustrations/features/commerce-feature-3-dark.png"
          image-width="900"
          image-height="788"
          blob
          reverse
        />
      </Container>
    </Section>

    <Section color="gradients">
      <Container>
        <EcommerceTestimonials
          :slides="testimonials"
          :title="$t('shopTestimonials_title')"
          :subtitle="$t('shopTestimonials_subtitle')"
          :content="$t('shopTestimonials_text')"
          inverted
        />
      </Container>
    </Section>

    <Section color="grey">
      <Container>
        <EcommerceFeaturesManagment
          :subtitle="$t('shopE_subtitle')"
          :title="$t('shopE_title')"
          :content="$t('shopE_title')"
          :features="managementFeatures"
          image="/assets/illustrations/features/commerce-feature-4.png"
          image-width="900"
          image-height="788"
          reverse
        />

        <EcommercePanel
          :title="$t('signUpShop_title')"
          :subtitle="$t('signUpShop_subtitle')"
          :logos-text="$t('signUpShop_text')"
          :cta-primary="textSignUp.button[0].label"
          :cta-primary-link="textSignUp.button[0].link"
          :cta-secondary="textSignUp.button[1].label"
          :cta-secondary-link="textSignUp.button[1].link"
          :logos="customerLogos"
          boxed
          shapes
        />
      </Container>
    </Section>

    <Section color="grey" wave="wave-1" shape-color="white">
      <Container>
        <SectionTitle 
          :title="$t('shopF_title')" 
          :subtitle="$t('shopF_subtitle')" 
          color="green"
        />

        <EcommerceFaq
          :left="faq.left"
          :right="faq.right"
          chevrons
        />
      </Container>
    </Section>

    <FooterD color="light" />
    
  </div>
</template>







<style scoped lang="scss">
.is-gradients{
    background: linear-gradient(to right, #39c457, #39e45d) !important;
}
</style>