<route lang="yaml">
meta:
  layout: default
</route>

<script setup lang="ts">
import { useI18n }    from 'vue-i18n'


</script>

<template>
  <div class="mt-20">
    <section>
        <h2>{{$t('home')}}</h2>   
        <h5>{{$t('need-refresh')}}</h5>
    
    </section>
    
    <div class="mb-8">
        <button @click="$i18n.locale='en'" >nuevo idioma</button>
    </div>
    
 

    
  </div>
</template>


