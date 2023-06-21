<script setup lang="ts">
import { ref, onMounted, onServerPrefetch, watch,computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getJob } from '/@src/utils/api/job'
import { socialLinks } from '/@src/data/services/advanced/social'
import type { Job } from '/@src/types'
import { Categories, Profiles } from '/@src/texts/fakeProfiles'
import { useFreelancerListStore } from '/@src/components/web/freelancer/useFreelancerListStore.ts'

const Store=useFreelancerListStore();
const route = useRoute()
const router = useRouter()
const slug = route.params.slug as string


// get job data
const job = ref<Job>()

async function fetchJob() {
  console.log('sss', slug)
  try {
    //slug
    job.value = await getJob('backend-developer')
  } catch {
    console.log('not found')
    // router.replace({
    //   name: 'all',
    //   params: { all: `not-found-${route.params.slug}` },
    // })
  }
}

const freelancer=ref({})

const getFreelancer= async ()=>{
  const {id} = route.query
  
  freelancer.value= await Store.fetchFreelancer(id).then(rs=> rs.data)   // Profiles.profiles.filter(p=>p.id==id)
  
}

onMounted(()=>{
  fetchJob()
  getFreelancer()
})
onServerPrefetch(fetchJob)
watch(route.fullPath, () => fetchJob())


</script>

<template>
  <div>

    <Section overflown>
      <Container v-if="job">
        <FreelancerDetails :profile="freelancer" :job="job" />
      </Container>
    </Section>

    <FooterD color="light" />
    
  </div>
</template>
