<script setup lang="ts">
import { ref, watch } from 'vue'


export interface Modal {
  page: Number
}

const props = withDefaults(defineProps<Modal>(), {
  page: 0,
})


import ModalOneRedirection from './ModalOneRedirection.vue'
import ModalTwoName from './ModalTwoName.vue'
import ModalTrheeMap from './ModalTrheeMap.vue'
import ModalFourWeb from './ModalFourWeb.vue'
import ModalFiveBusiness from './ModalFiveBusiness.vue'
import ModalSixAddress from './ModalSixAddress.vue'
import ModalSevenPosition from './ModalSevenPosition.vue'


const data = ref([
  false,
  false, 
  false,
  false,
  false,
  false,
  false,
  false, 
  false
])


props.page ? data.value[props.page] = true : data.value[0] = true



watch( () => props.page, () => {
  data.value.fill(false)
  data.value[props.page] = true
})


</script>

<template>
  <section>
    {{props.page}}
    <ModalOneRedirection v-if="data[0]" />
    <ModalTwoName v-if="data[1]" />
    <ModalTrheeMap v-if="data[2]" />
    <ModalFourWeb v-if="data[3]" />
    <ModalFiveBusiness v-if="data[4]" />
    <ModalSixAddress v-if="data[5]" />
    <ModalSevenPosition v-if="data[6]" />

  </section>
</template>



<style lang="scss" scoped>

</style>