<route lang="yaml">
meta:
  layout: default
</route>

<script setup lang="ts">
import {
  videoFeatures,
  textVideoFeatures,
  textTestimonials,
  textCtaBlockH,
  seoAdvancedReports,
  textD,
  businessFeatures,
  testimonials
} from '/@src/texts/tool/crm'

//import { testimonials } from '/@src/texts/assets/testimonials'
</script>

<template>
  <div>
    <component :is="'style'">
      .color-kit-digital{
        fill: #ffa726 !important;
      }
      .button-kit-digital, .custom-toggle input:checked + span span.track .track-knob{
        background: #ffa726 !important;
        border-color: #ffa726 !important;
      }
    </component>
    <ToolPanel type="crm" color="orange"/>
    
    <!--CrmHome v-if="false" />

    <Section v-if="false">
      <Container>
        <CrmInfo
          :subtitle="textD.subtitle"
          :title="textD.title"
          :content="textD.content"
          :features="businessFeatures"
          image="/assets/illustrations/features/commerce-feature-3.png"
          dark-image="/assets/illustrations/features/commerce-feature-3-dark.png"
          image-width="900"
          image-height="788"
          blob
          reverse
        />
      </Container>
    </Section -->
  
    <Section>
      <Container>
        <CrmSeoFeatures :features="seoAdvancedReports" color="orange"/>

        <hr />

        <CrmPanel
          :small-text="$t('crmTextCtaBlock_text')"
          :title="$t('crmTextCtaBlock_title')"
          :subtitle="$t('crmTextCtaBlock_subtitle')"
          image="/assets/illustrations/apps/app-widgets-slant.png"
          dark-image="/assets/illustrations/apps/app-widgets-slant.png"
        >
          <Buttons>
            <Button
              :to="textCtaBlockH.button[0].link"
              target="_blank"
              color="primary"
              :style="{background: '#ffa726', borderColor: '#ffa726'}"
              :long="2"
              bold
              raised
            >
              {{ $t('crmTextCtaBlock_btn0') }}
            </Button>
            <Button
              :to="textCtaBlockH.button[1].link"
              target="_blank"
              :long="2"
              bold
              raised
            >
              {{ $t('crmTextCtaBlock_btn1') }}
            </Button>
          </Buttons>
        </CrmPanel>

        <CrmFeatures
          :title="textVideoFeatures.title_1"
          :features="videoFeatures"
          source="/assets/video/meeting.mp4"
          poster="data:image/gif;base64,replace_with_your_image"
        />

        <SectionTitle
          :title="$t('crmTestimonialsText_title')"
          :subtitle="$t('crmTestimonialsText_subtitle')"
        />

        <CrmTestimonial
          :testimonials="testimonials"
          boxed
          :columns="4"
          :limit="4"
        />
      </Container>
    </Section>

    <FooterD color="light" />
  </div>
</template>






