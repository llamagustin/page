<script setup lang="ts">
import { pricingSplit, pricingTexts, textD, textFaq, genericFaq, testimonials } from '/@src/texts/pricing'
//import { testimonials } from '/@src/texts/assets/testimonials'
</script>

<template>
  <div>
    <Section>
      <Container>
        <PageTitle 
          :title="pricingTexts.title"
          :subtitle="pricingTexts.subtitle"
          :text="pricingTexts.text"
        />
        <PricingSplit  
          :text="pricingSplit.text"
          :regular-plans="pricingSplit.regularPlans"
          :premium-plan="pricingSplit.premiumPlan"
        />
        <PricingTestimonial :testimonials="testimonials" />
      </Container>
    </Section>

    <Section wave="wave-1" shape-color="grey">
      <Container>
        <SectionTitle 
          :title="textFaq.title" 
          :subtitle="textFaq.subtitle" />

        <PricingFaq :items="genericFaq" />

        <PricingBlock
          :title-primary="textD.titlePrimary"
          :content-primary="textD.contentPrimary"
          :cta-primary="textD.ctaPrimary"
          :cta-primary-link="textD.ctaPrimaryLink"
          :title-secondary="textD.titleSecondary"
          :content-secondary="textD.contentSecondary"
          :cta-secondary="textD.ctaSecondary"
          :cta-secondary-link="textD.ctaSecondaryLink"
          boxed
          shapes
          animated
        />
        
      </Container>
    </Section>

    <FooterD
    />
  </div>
</template>
