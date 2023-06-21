<route lang="yaml">
meta:
  layout: default
</route>

<script setup lang="ts">
import {
  textA,
  meetingFeatures,
  //textB,
  //statistics,
  //posts,
  texts,
  textOfficeCta,
} from '/@src/texts/tool/office'

//import { testimonials } from '/@src/texts/assets/testimonials'
import { customerLogos } from '/@src/texts/assets/logos'
</script>

<template>
  <div>
    
    <component :is="'style'">
      .color-kit-digital{
        fill: #d216ff !important;
      }
      .button-kit-digital, .custom-toggle input:checked + span span.track .track-knob{
        background: #d216ff !important;
        border-color: #d216ff !important;
      }
    </component>
      
    <ToolPanel type="office" color="violet" />
    
    <Section>
      <Container>
        <OfficeSideSection
          :subtitle="$t('officeText_subtitle0')"
          :title="$t('officeText_title0')"
          :content="$t('officeText_text0')"
          :cta="texts[0].cta"
          :to="texts[0].to"
          image="/assets/illustrations/features/office-feature-1.png"
          dark-image="/assets/illustrations/features/office-feature-1-dark.png"
          image-width="1119"
          image-height="792"
          blob
        />
        
        <OfficeSideSection
          :subtitle="$t('officeText_subtitle1')"
          :title="$t('officeText_title1')"
          :content="$t('officeText_text1')"
          :cta="texts[1].cta"
          :to="texts[1].to"
          image="/assets/illustrations/features/office-feature-2.png"
          dark-image="/assets/illustrations/features/office-feature-2-dark.png"
          image-width="1119"
          image-height="792"
          reverse
          blob
        />
        
        <OfficeSideSection
          :subtitle="$t('officeText_subtitle4')"
          :title="$t('officeText_title4')"
          :content="$t('officeText_text4')"
          :cta="texts[4].cta"
          :to="texts[4].to"
          image="/assets/illustrations/features/meeting-feature-5.png"
          dark-image="/assets/illustrations/features/meeting-feature-5-dark.png"
          image-width="1119"
          image-height="792"
          blob
        />
        
        <OfficeSideSection
          :subtitle="$t('officeText_subtitle2')"
          :title="$t('officeText_title2')"
          :content="$t('officeText_text2')"
          :cta="texts[2].cta"
          :to="texts[2].to"
          image="/assets/illustrations/features/meeting-feature-4.png"
          dark-image="/assets/illustrations/features/meeting-feature-4-dark.png"
          image-width="1119"
          image-height="792"
          blob
          reverse
        />
      </Container>
    </Section>


    <Section  color="grey">
      <Container>
        <SectionTitle
          :title="$t('officeTextCta_title')"
          :subtitle="$t('officeTextCta_subtitle')"
        />
        
        <!--
        <OfficeResourceGrid :posts="posts" :limit="3" />
        -->
        
        <OfficeCtaBlockF
          :title="$t('officeTextCta_title1')"
          :subtitle="$t('officeTextCta_subtitle1')"
          background="/assets/images/tool-office/background.jpg"
          :cta="$t('officeTextCta_btn')"
          :cta-link="textOfficeCta.button[0].link"
          overlay
        />
      </Container>
    </Section>
    
    <Section v-if="true" >
      <Container>
        <OfficeSideSection
          :subtitle="$t('officeText_subtitle3')"
          :title="$t('officeText_title3')"
          :content="$t('officeText_text3')"
          :cta="texts[3].cta"
          :to="texts[3].to"
          image="/assets/illustrations/features/meeting-feature-7.png"
          dark-image="/assets/illustrations/features/meeting-feature-7-dark.png"
          image-width="1119"
          image-height="792"
          reverse
        />
        <OfficeLogoMarquee
          class="mt-10"
          title="textB.title_logo"
          :logos="customerLogos"
        />
      </Container>
    </Section>

    <FooterD color="light"/>
  </div>
</template>


