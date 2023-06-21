<script setup lang="ts">
  import { ref, defineEmits, defineProps } from 'vue'
  import { services } from '/@src/texts/ai/flow'
  import { features } from '/@src/data/services/features'
  import { cardTeam } from '/@src/data/services/team'
  import { usePageInformation } from "/@src/components/web/ai/pages/usePageInformation"


  const props = defineProps < {
    showPage: any;
  } > ();

  const emit = defineEmits < {
    (e: 'changePage', value): void;
  } > ()

  const { countPrompts, freelancers } = usePageInformation();

  const user = ref({
    name: 'Diexco SL',
    company: {
      employeer: 10,
      name: 'Has completado un 67% tu perfil ',
      description: `Lorem ipsum dolor et orem ipsum dolor et orem ipsum dolor et orem ipsum dolor et orem ipsum dolor et orem ipsum dolor et`,
      tag: [
        'Default',
        'Default'
      ]
    }
  })
</script>

<template>
  <Card class="flow-business" rounded="small">
    <Card class="p-2">
      <div class="flex items-center" :style="{alignItems: 'center'}">
        <Title :size="4" class="mb-0">
          Aythen GPT
        </Title>
        <div v-if="props.showPage[3] == true" class="ml-auto button-header" :style="{gap: '10px'}">
          <Button :to="{ name: 'ai'}" class="mt-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 -0.5 21 21" version="1.1">
              <g id="Page-1" stroke="none" stroke-width="1" fill="currentColor" fill-rule="evenodd">
                <g id="Dribbble-Light-Preview" transform="translate(-419.000000, -720.000000)">
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path d="M379.79996,578 L376.649968,578 L376.649968,574 L370.349983,574 L370.349983,578 L367.19999,578 L367.19999,568.813 L373.489475,562.823 L379.79996,568.832 L379.79996,578 Z M381.899955,568.004 L381.899955,568 L381.899955,568 L373.502075,560 L363,569.992 L364.481546,571.406 L365.099995,570.813 L365.099995,580 L372.449978,580 L372.449978,576 L374.549973,576 L374.549973,580 L381.899955,580 L381.899955,579.997 L381.899955,570.832 L382.514204,571.416 L384.001,570.002 L381.899955,568.004 Z" id="home-[#1391]"></path>
                  </g>
                </g>
              </g>
            </svg>
          </Button>
        </div>
        <div v-else class="ml-auto button-header flex" :style="{gap: '10px'}">
          <!--@click="emit('changePage', 0)"-->
          <Button @click="emit('changePage', 3)" class="mt-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-corner-down-left">
              <polyline points="9 10 4 15 9 20" />
              <path d="M20 4v7a4 4 0 0 1-4 4H4" />
            </svg>
          </Button>
        </div>
      </div>
      <hr class="my-2" />
      <div class="flex" :style="{gap: '8px'}">
        <div>
          <img class="logo" src="https://dummyimage.com/150x150" />
        </div>
        <div>
          <Title tag="h2" weight="semi" :size="6" leading>
            {{user.name}}
          </Title>
          <p class="paragraph rem-90 -mt-1">
            {{user.company.name}}
          </p>
          <div class="flex" :style="{gap: '4px', marginTop: '-2px'}">
            <Tag color="primary" :size="small">
              {{user.company.employeer}} works
            </Tag>
            <div v-for="(category, index) in user.company.tag">
              <Tag label="Default" color="primary" :size="small" outlined></Tag>
            </div>
          </div>
        </div>
      </div>
      <div>
        <small>
          {{user.company.description}}
        </small>
      </div>
    </Card>
    <div class="mt-4">
      <Card class="py-4 px-2">
        <div>
          <Title tag="h2" weight="semi" :size="6" leading>
            Herramientas Aythen
          </Title>
          <p class="-mt-2">
            Descubre como las herramientas interactuan entre sí
          </p>
        </div>
        <ul class="mt-2 columns flex px-2" :style="{flexWrap: 'wrap'}">
          <li :key="index" class="column is-6 p-1" v-for="(slide, index) in services">
            <Card class="box-carousel-box flex items-center" shape="squared">
              <div class="box-inner flex " :style="{gap: '8px', alignItems: 'center'}">
                <IconService class="icon-prompts" :style="{color: slide.iconColor + ' !important', borderColor: slide.iconColor + ' !important'}" size="x-small">
                  <i class="iconify" :data-icon="slide.icon"></i>
                </IconService>
                <div>
                  <span class="is-block mb-1">
                    {{ slide.title }}
                  </span>
                  <small class="is-block title-inner" :style="{fontSize: '12px'}">
                    {{ countPrompts[slide.title.toLowerCase()] ?? 0 }}
                    prompts
                  </small>
                </div>
              </div>
            </Card>
          </li>
        </ul>
        <hr />
        <div>
          <div v-for="(item, index) in freelancers" class="mt-2 flex" :style="{gap: '6px'}">
            <div>
              <!--picture="https://dummyimage.com/150x150"-->
              <AvatarSimple :picture="item.avatar" size="medium" squared badge="/@src/assets/icons/flags/united-states-of-america.svg" />
            </div>
            <div>
              <div class="mb-3">
                <b class="is-block">
                  {{ item.fullname }}
                </b>
                <span class="is-block" style="line-height: 1; font-size: 12px;">
                  {{ item.experiences.map(c => c.position).join(', ') }}
                </span>
              </div>
              <div class="flex" :style="{alignItems: 'center'}">
                <div class="wrapper-text">
                  <p>{{ item.about }}</p>
                </div>
                <!--<label class="ml-2 is-block" :style="{fontSize: '10px', color: '#000fff'}">-->
                <!--  Con nosotros {{ }}-->
                <!--</label>-->
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </Card>
</template>


<style lang="scss" scoped>
  .wrapper-text {
    width: 100% !important;
    max-width: 100% !important;
    overflow: hidden !important;
    height: 50px !important;
    white-space: normal !important;
    max-height: calc(1.6em * 3) !important;
    line-height: 1.2 !important;

    p {
      -webkit-box-orient: vertical !important;
      -webkit-line-clamp: 3 !important;
      display: -webkit-box !important;
      margin: 0 !important;
      font-size: 14px;
    }
  }

  .flow-business {

    .button-header {
      .button {

        height: 38px;
        width: 38px;
        min-height: 38px;
        padding: 5px;
      }
    }

    .logo {
      width: 70px;
      height: 70px;
      border-radius: 6px;
    }


    .box-inner {
      .icon-box {
        height: 36px;
        width: 36px;
        min-width: 36px;
        border: 1px solid #000;
      }

      span {
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: -6px;
      }

      small {
        margin-top: -4px;
        float: left;
      }
    }
  }
</style>
