<script setup lang="ts">
//import { helpCenterTopics, helpCenterCategories } from '/@src/data/pages/help'
//import { genericFaq } from '/@src/data/blocks/advanced/faq'

import { 
  helpCenterTopics,
  helpCenterCategories,
  genericFaq,
  boxedPosts } from '/@src/texts/services'
</script>

<template>
  <div>
    <Section color="grey">
      <Container>
        <HelpCenterHeader
          title="Help Center"
          subtitle="Our Resources"
          text="We have some nice resources to help you setup your project and get started as fast as possible."
          :topics="helpCenterTopics"
        />
      </Container>
    </Section>

    <Section color="grey">
      <Container>
        <SectionTitle title="Help Categories" subtitle="Take a look at" />

        <HelpsCenterCategories :categories="helpCenterCategories" />
      </Container>
    </Section>

    <Section color="grey">
      <Container>
        <SectionTitle title="Read our FAQs" subtitle="Have a Question?" />

       
        <HelpsBoxedGrid
          punchline="Easy-Peezy 👌"
          title="Resources to Get Started"
          subtitle="You should definitely subscribe to our news for daily tips and tricks"
          :posts="boxedPosts"
          inverted
        />
      </Container>
    </Section>

    <FooterD
      color="light"
    />
  </div>
</template>
