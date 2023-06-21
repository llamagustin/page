<script setup lang="ts">
import { textTerms, termsOfService } from '/@src/texts/terms'

//import { termsOfService } from '/@src/data/pages/terms'

</script>

<template>
  <div>
    <TermBlock
      :title="$t('terms_title')"
      :subtitle="$t('terms_subtitle')"
      :updated="$t('terms_updated')"
      image="/assets/illustrations/hero/terms-hero.svg"
      dark-image="/assets/illustrations/hero/terms-hero.svg"
      image-height="1152"
      image-width="517"
      :terms="$t('termsOfServices')"
    />
    <FooterD
      color="light"
    />
  </div>
</template>
