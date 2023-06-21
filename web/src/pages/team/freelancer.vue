<route lang="yaml">
  meta:
  layout: default
</route>

<script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { useFreelancerListStore } from '/@src/components/web/freelancer/useFreelancerListStore.ts'

  const route = useRoute()
  const Store = useFreelancerListStore();
  import {
    customerLogos,
    jobs,
    jobTopics,
    jobCategories,
    candidates,
    testimonials,
  }
  from '/@src/data/pages/jobs'

  import {
    textJobs,
    textJobCategory,
    textSkills,
    textJobTopics,
    textJobCandidates,
    textJobCompanyLogos,
  }
  from '/@src/texts/freelancer'

  import { Profiles } from '/@src/texts/fakeProfiles'

  import FreelancerCarousel from '/@src/components/web/freelancer/FreelancerCarousel.vue'
  import FreelancerProfiles from '/@src/components/web/freelancer/FreelancerProfiles.vue'

  const filtersProfile = ref({ q: '', category: '', subCategory: '' })
  const filtrados = ref([])

  onMounted(async () => {
    filtrados.value = await Store.fetchFreelancers(route.query).then(res => res.data)
  })

  watch(route, async () => {
    filtrados.value = await Store.fetchFreelancers(route.query).then(res => res.data)
  })

  const ApplyFilters = async (filters) => {

    let qr = await Store.fetchFreelancers({ ...filters })

    filtrados.value = qr.data;
    return filtrados.value;
  }
  
</script>

<template>
  <div>
    <FreelancerLogoMarquee :topics="jobTopics" :limit="12" :logos="customerLogos" compact />

    <Section shape-color="footer-dark" class="pt-0">
      <Container>
        <CollectionTitle class="mt-2" title="Freelancer 🔥" subtitle="Echa un vistazo más de cerca a nuestros artículos populares" />
        <FreelancerFullJobSearch class="mt-4" @applyFilters="ApplyFilters" />
        <FreelancerCarousel :profiles="filtrados" />
      </Container>
    </Section>

    <Section color="grey">
      <Container>
        <SectionTitle :title="$t('textJobCategory_title')" :subtitle="$t('textJobCategory_subtitle')" />
        <FreelancerFeatureBlockA alignment="centered" :features="jobCategories" :columns="3" :limit="8" size="medium" links />
        <div class="my-4">
          <Buttons alignment="centered">
            <Button color="primary" :long="3" raised bold>
              {{ $t('textJobCategory_button') }}
            </Button>
          </Buttons>
        </div>
      </Container>
    </Section>

    <!--Enumera tus habilidades-->
    <Section v-background="{
        src: '/public/assets/images/job_image01.avif',
        placeholder: 'https://dummyimage.com/1920x1080/',
      }" overlay>
      <Container>
        <div class="py-6">
          <div class="columns">
            <div class="column">
              <FreelancerCtaBlockA :title="$t('textSkills_title')" :subtitle="$t('textSkills_subtitle')" :cta-primary="$t('textSkills_btn1')" :cta-primary-link="textSkills.button[0].link" :cta-secondary="$t('textSkills_btn2')" :cta-secondary-link="textSkills.button[1].link" boxed shapes />
            </div>
          </div>
        </div>
      </Container>
    </Section>

    <Section color="grey" wave="wave-2" shape-color="footer-dark">
      <Container>
        <!--JobsTeamBlockB :items="candidates" bubbles /-->
        <FreelancerTestimonialsCarouselSingle :slides="filtrados.slice(0,1)" />
        <FreelancerCompanyGrid class="-mt-6" :title="$t('textJobsCompanyLogos_title')" :logos="customerLogos" :limit="20" />
      </Container>
    </Section>

    <FooterD color="dark" />
  </div>
</template>
