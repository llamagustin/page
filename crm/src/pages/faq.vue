



<script setup lang="ts">
import AppSearchHeaderBg from '@/assets/images/pages/app-search-header-bg.png'


// import type { FaqCategory } from '@/@fake-db/types'
import sittingGirlWithLaptop from '@/assets/images/illustrations/sitting-girl-with-laptop.png'
// import axios from '@axios'
import AppSearchHeader from '@core/components/AppSearchHeader.vue'

import { data_faq } from '@/@fake-db/pages/faq'



const searchQuery = ref('')

const faqs = ref<FaqCategory[]>([])

const fetchFaqs = () => {
  console.log('weod3iuhdj faqs')
  const q = searchQuery.value
  const queryLowered = q.toLowerCase()

  const filteredData = []

  Object.entries(data_faq).forEach(([_, faqObj]) => {
    const filteredQAndA = faqObj.faqs.filter(obj => {
      return obj.question.toLowerCase().includes(queryLowered)
    })

    if (filteredQAndA.length)
      filteredData.push({ ...faqObj, faqs: filteredQAndA })
  })

  faqs.value = filteredData
  
}

const activeTab = ref('Pagos')
const activeQuestion = ref(0)

watch(activeTab, () => activeQuestion.value = 0)
watch(() => searchQuery.value, fetchFaqs, {immediate: true})
// watch(faqSearchQuery, fetchFaqs, { immediate: true })

const contactUs = [
  {
    icon: 'tabler-phone',
    via: '+34 631 83 13 83',
    tagLine: '¡Siempre estamos felices de ayudar!',
  },
  {
    icon: 'tabler-mail',
    via: 'info@aythen.com',
    tagLine: 'La mejor manera de obtener una respuesta!',
  },
]
</script>

<template>
  <section>
    <!-- 👉 Search -->
    <!--<AppSearchHeader-->
    <!--  v-model="faqSearchQuery"-->
    <!--  title="Hola, ¿cómo podemos ayudar?"-->
    <!--  subtitle="o seleccione una categoría para encontrar rápidamente la ayuda que necesita"-->
    <!--  custom-class="mb-7"-->
    <!--/>-->
    <!-- 👉 Search Banner  -->
    <VCard
      flat
      class="text-center search-header mb-7"
      :style="`background: url(${AppSearchHeaderBg});`"
    >
      <VCardText>
        <h5 class="text-h5 font-weight-semibold">
          Hola, ¿cómo podemos ayudar?
        </h5>
        <!-- 👉 Search Input -->
        <VTextField
          v-model="searchQuery"
          placeholder="Qué estás buscando..."
          class="search-header-input mx-auto my-3"
          density="comfortable"
        >
          <template #prepend-inner>
            <VIcon
              icon="tabler-search"
              size="23"
            />
          </template>
        </VTextField>
        <p class="mb-0">
          o seleccione una categoría para encontrar rápidamente la ayuda que necesita
        </p>
      </VCardText>
    </VCard>
  
  
    <!-- 👉 Faq sections and questions -->
    <VRow>
      <VCol
        v-show="faqs.length"
        cols="12"
        sm="4"
        lg="3"
        class="position-relative"
      >
        <!-- 👉 Tabs -->
        <VTabs
          v-model="activeTab"
          direction="vertical"
          class="v-tabs-pill"
          grow
        >
          <VTab
            v-for="faq in faqs"
            :key="faq.faqTitle"
            :value="faq.faqTitle"
            class="text-high-emphasis"
          >
            <VIcon
              :icon="faq.faqIcon"
              :size="20"
              start
            />
            {{ faq.faqTitle }}
          </VTab>
        </VTabs>
        <VImg
          :width="245"
          :src="sittingGirlWithLaptop"
          class="d-none d-sm-block mt-10 mx-auto"
        />
      </VCol>

      <VCol
        cols="12"
        sm="8"
        lg="9"
      >
        <!-- 👉 Windows -->
        <VWindow
          v-model="activeTab"
          class="faq-v-window disable-tab-transition"
        >
          <VWindowItem
            v-for="faq in faqs"
            :key="faq.faqTitle"
            :value="faq.faqTitle"
          >
            <div class="d-flex align-center mb-6">
              <VAvatar
                rounded
                color="primary"
                variant="tonal"
                class="me-3"
                size="large"
              >
                <VIcon
                  :size="32"
                  :icon="faq.faqIcon"
                />
              </VAvatar>

              <div>
                <h6 class="text-h6">
                  {{ faq.faqTitle }}
                </h6>
                <span class="text-sm">{{ faq.faqSubtitle }}</span>
              </div>
            </div>

            <VExpansionPanels
              v-model="activeQuestion"
              multiple
            >
              <VExpansionPanel
                v-for="item in faq.faqs"
                :key="item.question"
                :title="item.question"
                :text="item.answer"
              />
            </VExpansionPanels>
          </VWindowItem>
        </VWindow>
      </VCol>

      <VCol
        v-show="!faqs.length"
        cols="12"
        :class="!faqs.length ? 'd-flex justify-center align-center' : ''"
      >
        <VIcon
          icon="tabler-help"
          start
          size="20"
        />
        <span class="text-base font-weight-medium">
          No se encontraron resultados!
        </span>
      </VCol>
    </VRow>

    <!-- 👉 You still have a question? -->
    <div class="text-center pt-15">
      <VChip
        label
        color="primary"
        size="small"
        class="mb-2"
      >
        QUESTION
      </VChip>

      <h5 class="text-h5 mb-2">
        Aún necesitas resolver algun aspecto?
      </h5>
      <p>
        En caso de no solucionar el problema en nuestro FAQ, ponte en contacto con nosotros. Obtendrás una respuesta en la mayor brevedad posible!
      </p>

      <!-- contacts -->
      <VRow class="mt-4">
        <VCol
          v-for="contact in contactUs"
          :key="contact.icon"
          sm="6"
          cols="12"
        >
          <VCard
            flat
            variant="tonal"
          >
            <VCardText>
              <VAvatar
                rounded
                color="primary"
                variant="tonal"
                class="me-3"
              >
                <VIcon :icon="contact.icon" />
              </VAvatar>
            </VCardText>
            <VCardText>
              <h6 class="text-h6 mb-2">
                {{ contact.via }}
              </h6>
              <span>{{ contact.tagLine }}</span>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </div>
  </section>
</template>

<style lang="scss">
.faq-v-window {
  .v-window__container {
    z-index: 0;
  }
}
</style>
