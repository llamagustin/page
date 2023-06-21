<!--script setup lang="ts">
import { watch } from 'vue'

export interface AcademiesDetails {
   openModal: boolean
}
const props = withDefaults(defineProps<AcademiesDetails>(),{openModal: false})


watch(openModal, ()=>{
  console.log(openModal)
})

</script>

<template>
  <Modal title="Premium features" :open="modalBaseOpen" actions="center" noscroll @close="$emit('modalClose')">
    <template #content>
      <PlaceholderSection title="Go Premium" subtitle="Unlock more features and business tools by going premium" >
        <template #image>
          <DarkImage src="/@src/assets/illustrations/features/vr.svg" src-dark="/@src/assets/illustrations/features/vr-dark.svg" alt="dark image" />
        </template>
      </PlaceholderSection>
    </template>
    <template #action>
      <Button color="primary" :long="2" raised>Confirm</Button>
    </template>
  </Modal>
</template-->