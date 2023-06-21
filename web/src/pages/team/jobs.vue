

<script setup lang="ts">
import { customerLogos } from '/@src/data/pages/logos/index.ts'
import {
  mentorBoxCarousel,
  // mentorStats,
  mentorTestimonials,
  mentorsFaq,
} from '/@src/data/pages/mentors/'

import {
  textLogos,
  textMentors,
  textSchedule,
  textAssistance,
  textSubscriptions,
  textResults,
  textRoad,
  textMembers,
  textPricing,
  textGrowth,
} from '/@src/texts/jobs'
</script>

<template>
  <div>
    <!--
    <HeroI />
    -->
    <Section >
      <Container >
        <JobsSpinnerSection 
          inverted
          :subtitle="$t('|')"
          :title="$t('freelancerResultsTitle')"
          :content="$t('freelancerResultsContent')"
          :cta="$t('freelancerResultsCta')"
          :to="textResults.to"
          image="/assets/illustrations/chart/vulk-chart.png"
          layer-base="/assets/illustrations/chart/tech-chart"
          layer-extension="svg"
          bordered
        />

        <JobsNumbersSection 
          inverted
          :subtitle="$t('freelancerRoadSubtitle')"
          :title="$t('freelancerRoadTitle')"
          :content="$t('freelancerRoadContent')"
          animated
        />
      </Container>
    </Section>
    
    <!-- Exito Digital -->
    <Section tongue="tongue-2" >
      <Container>
        <SectionTitle
          :title="$t('freelancerMembersTitle')"
          :subtitle="$t('freelancerMembersSubtitle')"
        />

        <JobsTestimonialsTabbed 
          :freelancers="mentorTestimonials.trainees"
          :clients="mentorTestimonials.mentors"
        />
      </Container>
    </Section>

    <!-- Ayudanos a hacer crecer tu negocio -->
    <Section  wave="wave-2" shape-color="grey"  >
      <Container >
        <JobsBenefits />
      </Container>
    </Section>

    <Section color="grey"  tongue="tongue-1">  
      <Container>
  
        <JobsSideSection
          :subtitle="$t('freelancerMentorSubtitle')"
          :title="$t('freelancerMentorTitle')"
          :content="$t('freelancerMentorContent')"
          :cta="$t('freelancerMentorCta')"
          :to="textMentors.to"
          image="/assets/illustrations/features/meeting-feature-4.png"
          dark-image="/assets/illustrations/features/meeting-feature-4-dark.png"
          image-width="776"
          image-height="647"
          blob
        /><!--hecho-->

        <JobsSideSection
          :subtitle="$t('freelancerScheduleSubtitle')"
          :title="$t('freelancerScheduleTitle')"
          :content="$t('freelancerScheduleContent')"
          :cta="$t('freelancerScheduleCta')"
          :to="textSchedule.to"
          image="/assets/illustrations/features/meeting-feature-5.png"
          dark-image="/assets/illustrations/features/meeting-feature-5-dark.png"
          image-width="776"
          image-height="647"
          reverse
          blob
        />
      </Container>
    </Section>


    <Section>
      <template #background>
        <JobsSectionMap light />
      </template>
      <Container>
        <JobsCompanyGrid
          :title="$t('freelancer_title0')"
          :logos="customerLogos"
          :limit="20"
        /><!--hecho-->
      </Container>
    </Section>
    
    
    
    
    <Section  tongue="tongue-1">
      <Container>
        <JobsBoxCarousel :slides="mentorBoxCarousel" />
      </Container>
    </Section>
    
    <FooterD color="light" />
  </div>
</template>
