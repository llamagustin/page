<script setup lang="ts">
import { legalTerms, legal } from '/@src/texts/terms'

//import { termsOfService } from '/@src/data/pages/terms'

</script>

<template>
  <div>
    <TermBlock
      :title="$t('legal_title')"
      :subtitle="$t('legal_subtitle')"
      :updated="$t('terms_updated')"
      image="/assets/illustrations/hero/terms-hero.svg"
      dark-image="/assets/illustrations/hero/terms-hero.svg"
      image-height="1152"
      image-width="517"
      :terms="$t('legalTerms')"
    />

    <FooterD
      color="light"
    />
  </div>
</template>