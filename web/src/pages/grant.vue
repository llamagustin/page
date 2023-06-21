<script setup lang="ts">
import axios from 'axios';
const instance = axios.create({
  baseURL: "https://api.aythen.com",
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
});


import { textHome, textA } from '/@src/texts/grant'
import { services } from '/@src/texts/services'
import { onMounted, onUnmounted, ref } from 'vue'
import { customerLogos } from '/@src/texts/assets/logos'

const servicesCrm = ref(services);

onMounted(async () => {
  document.body.classList.add('pricing-container')
  
  servicesCrm.value = await instance.get('/tool').then( res => { return res.data })
  
})

onUnmounted(() => {
  document.body.classList.remove('pricing-container')
})

</script>

<template>
  <div>
   
    <Section overflown>
      
      <Container>
        <PageTitle :title="$t('grant_title')" :subtitle="$t('grant_subtitle')" :text="$t('grant_text')" />
          
        <GrantSection :services="servicesCrm" /> 
      </Container>
    </Section>
    
    <!--Footer-->
    <FooterD color="light" />
  </div>
</template>

<style lang="scss" scoped>
:global(body) {
  overflow: initial;
}
</style>
