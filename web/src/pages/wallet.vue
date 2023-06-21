<route lang="yaml">
meta:
  layout: inverted-nav
</route>

<script>

</script>

<template>
  <div>
      <div class="home-container">
        <HeaderDone/>
        <LearnHistoryDone/>
        <CreateDone/>
        <GalleriesProgress/>
        <TopSellerDone/>
        <!--LastestBlogDone/-->
        <FooterDone/>
      </div>
    <FooterD color="grey" />
  </div>
</template>

<style scoped>

.home-container {
  width: 100%;
  display: flex;
  min-height: 100vh;
  margin: 0;
  align-items: center;
  flex-direction: column;
  background-color: #060A16;
}
</style>

<!--script setup lang="ts">
import {
  textHome,
  textLogoStats,
  videoFeatures,
  textBusinessSolutions,
  businessSolutions,
  textVideoFeatures,
  textTestimonials,
  textCtaBlockH,
} from '/@src/texts/bi'

import { testimonials } from '/@src/texts/assets/testimonials'
import { customerLogos } from '/@src/texts/assets/logos'
</script>

<template>
  <div>
    <Section
      v-background="{
        src: '/assets/shapes/lowpoly-pattern.png',
        placeholder: 'https://dummyimage.com/1920x1080/ededed/000000',
      }"
      color="darker"
    >
      <Container>
        <BiSpinnerSection
          inverted
          :subtitle="textHome.subtitle"
          :title="textHome.title"
          :content="textHome.content"
          :cta="textHome.cta"
          :link="textHome.link"
          image="/assets/illustrations/chart/tech-chart.png"
          layer-base="/assets/illustrations/chart/tech-chart"
          layer-extension="svg"
        />
      </Container>
    </Section>

    <Section color="grey">
      <Container>
        <BiLogoStats
          :title="textLogoStats.title"
          :subtitle="textLogoStats.subtitle"
          :heading="textLogoStats.heading"
          :content="textLogoStats.content"
          :logos="customerLogos"
        />
      </Container>
    </Section>

    <Section color="grey">
      <Container>
        <SectionTitle
          :title="textVideoFeatures.title"
          :subtitle="textVideoFeatures.subtitle"
        />

        <BiVideoBlockB
          :title="textVideoFeatures.title_1"
          :features="videoFeatures"
          source="/assets/video/meeting.mp4"
          poster="data:image/gif;base64,replace_with_your_image"
        />

        <hr />
      </Container>
    </Section>

    <Section color="grey">
      <Container>
        <SectionTitle
          :title="textBusinessSolutions.title"
          :subtitle="textBusinessSolutions.subtitle"
        />

        <BiPulseCards :features="businessSolutions" links animated />
      </Container>
    </Section>

    <Section color="grey">
      <Container>
        <SectionTitle
          :title="textTestimonials.title"
          :subtitle="textTestimonials.subtitle"
        />

        <BiTestimonialBlockA
          :testimonials="testimonials"
          boxed
          :columns="3"
          :limit="4"
        />

        <hr />

        <BiCtaBlockH
          :small-text="textCtaBlockH.smallText"
          :title="textCtaBlockH.title"
          :subtitle="textCtaBlockH.subtitle"
          image="/assets/illustrations/apps/app-widgets-slant.png"
          dark-image="/assets/illustrations/apps/app-widgets-slant.png"
        />
      </Container>
    </Section>

    <FooterD />
  </div>
</template-->
