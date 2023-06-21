<script setup lang="ts">
import { ref } from 'vue'
  
const services = ref([
  {
    icon: 'ph:pencil',
    iconColor: '#0000ff',
    title: 'Web'
  },
  {
    icon: 'ph:storefront',
    iconColor: '#13d33b',
    title: 'Shop'
  },
  {
    icon: 'ph:funnel',
    iconColor: '#fff343',
    title: 'SEO'
  },
  {
    icon: 'ph:chat-circle',
    iconColor: '#d21643',
    title: 'RRSS'
  },
  {
    icon: 'ph:users',
    iconColor: '#ffa726',
    title: 'CRM'
  },
  {
    icon: 'ph:headset',
    iconColor: '#d216ff',
    title: 'Office'
  }
])
</script>

<template>
  <div class="ui-mockup is-keywords">
    <div class="toolbar">
      <h3>Keywords</h3>
      <Field>
        <Control icon="feather:search">
          <VInput placeholder="Search Keywords..." />
        </Control>
      </Field>
    </div>
    <div>
      <ul 
        class="mt-2 columns flex px-2"
        :style="{flexWrap: 'wrap'}">
        <div 
          v-for="(slide, index) in services"
          class="column is-6 p-1" >
          <Card :style="{width: '100%'}" rounded="squared">
              <div :style="{display: 'flex', gap: '4px'}">
                <IconService
                  class="icon-prompts"
                  :color="slide.iconColor"
                  size="x-small"
                >
                  <i
                    class="iconify"
                    :data-icon="slide.icon"
                  ></i>
                </IconService>
                <small class="title-inner">
                    +200 prompts
                </small>
              </div>
              <p class="paragraph" :style="{fontSize: '12px'}">
                Lorem ipsum dolor et epsum
              </p>
          </Card>
        </div>
      </ul>
    </div>
    <div class="keywords">
      <div class="keyword">
        <div class="word">
          <span>Audio headset</span>
        </div>
        <div class="sales">
          <span>$1,243.12</span>
        </div>
      </div>
      <div class="keyword">
        <div class="word">
          <span>Audio Headset</span>
        </div>
        <div class="sales">
          <span>$971.47</span>
        </div>
      </div>
    </div>
    <div class="button-wrap">
      <Button color="primary" fullwidth bold raised>Add Keyword</Button>
    </div>
  </div>
</template>


  <style lang="scss" scoped>
  .columns{
    .column{
      display: flex;
      align-items: center;
      gap: 6px;
      
      .title-inner{
        font-size: 14px;
      }
      
      .icon-prompts{
        width: 20px;
        height: 20px;
        min-width: 20px;
      }
      
    }
  }
  
  
  .keywords{
    margin-top: 34px;
  }
  </style>