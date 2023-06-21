<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { LanguageMegamenu } from '/@src/texts/dashboard'

  const emit = defineEmits(['close', 'updateFlag'])
  const details = ref({})

  const description = ref(LanguageMegamenu.subtitle)
  const setDescription = val => {
    description.value = val
  }

  const showDetail = computed(() => {
    let { title, subtitle } = details.value


    title = title || LanguageMegamenu.title
    subtitle = subtitle || LanguageMegamenu.subtitle

    return { title, subtitle }

  })

  const updateFlag = val => {

    emit('updateFlag', val)
  }
</script>

<template>
  <div class="megamenu-inner">
    <button class="close-button" @click="emit('close')">
      <i class="iconify" data-icon="feather:arrow-left"></i>
    </button>
    <Container>
      <div class="columns ">
        <div class="column ">
          <div class="megamenu-block is-4 ml-6">
            <div class="columns is-multiline">
              <template v-for="(lang, index) in LanguageMegamenu.data" :key="index">
                <div class="column is-3 p-0" style="cursor:pointer">
                  <li @click="$i18n.locale=lang.tag; updateFlag(lang.tag)" @mouseenter="details={title:lang.language,subtitle:lang.subtitle}" @mouseleave="details={}" style="list-style: none;">
                    <img style=" height:12px" class="mr-2 ml-1" :src="lang.flag" />
                    <span class="paragraph"> {{lang.language}}</span>
                  </li>
                </div>
              </template>
            </div>
          </div>
        </div>

        <div class="column is-4">
          <div class="megamenu-block is-left-bordered">
            <div class="media">
              <div class="media-content">
                <div class="media-left is-bolt flex ">
                  <span class="iconify" data-icon="heroicons-solid:translate" data-inline="false"></span>
                  <h3 class="ml-3">{{showDetail.title}}</h3>
                </div>

                <p>
                  {{showDetail.subtitle}}
                </p>

              </div>
            </div>
          </div>
        </div>


      </div>
    </Container>
  </div>
</template>


<style scoped lang="scss">
  .link-href {
    border: none;
    padding: 0px;
    background: transparent !important;
    color: #0000ff !important;

  }

  .list-link {
    display: flex !important;
    gap: 14px;
    align-items: center;
    margin-bottom: 14px !important;

    p {
      margin-top: -4px;
    }


    .icon-service {
      width: 30px !important;
      height: 30px !important;
      margin-right: 6px !important;
    }
  }

  @media only screen and (max-width: 767px) {
    .megamenu-block {
      margin-left: 0px !important;
      display: grid;
      gap: 20px;
    }

    .columns {
      grid-template-columns: 1fr !important;
    }
  }
</style>
