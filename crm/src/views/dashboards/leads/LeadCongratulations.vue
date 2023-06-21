<script setup lang="ts">
interface Props {
  data?: object
}

const props = defineProps<Props>()


import congoImg from '@/assets/images/illustrations/congo-illustration.png'
</script>

<template>
  <VCard v-if="data">
    <VRow no-gutters>
      <VCol cols="8">
        <VCardText>
          <h6 class="text-lg text-no-wrap font-weight-semibold">
            Felicidades<br> {{data.name}}! 🎉
          </h6>
          <p class="mb-2">
            {{data.email}}
          </p>
          <h5 class="text-h5 font-weight-semibold text-primary mb-2">
            € {{data.total}}
          </h5>
          <VBtn :to="{name: 'apps-lead-list'}">
            Ver leads
          </VBtn>
        </VCardText>
      </VCol>

      <VCol cols="4">
        <VCardText class="pb-0 px-0 position-relative h-100">
          <VImg
            :src="congoImg"
            height="140"
            class="w-100 position-absolute"
            style="bottom: 0;"
          />
        </VCardText>
      </VCol>
    </VRow>
  </VCard>
</template>
