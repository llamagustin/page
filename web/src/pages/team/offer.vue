<script setup lang="ts">
  import {ref} from 'vue'
  
  const Filter=ref({
  "text": "",
  "category": "All",
  "subCategory": "All",
  "skills": "All",
  "price": 0
})
  

  const onChange = (val)=>{
    Filter.value=val;
  }

  //import { socialLinks } from '/@src/data/services/advanced/social'
  
</script>

<template>
  <div>
    <BusinessHome >
      <template #Search>
        <FullOfferSearch @change="onChange" />
      </template>
    </BusinessHome>
    
    <Section color="grey" overflown>
      <Container>
        <BusinessFilterList :filters="Filter" />
      </Container>
    </Section>

  </div>
</template>

