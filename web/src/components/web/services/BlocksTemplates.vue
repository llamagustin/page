<script setup lang="ts">
//https://stackoverflow.com/questions/72169746/vue3-vite-directly-access-parent-data-from-child-component
import { ref, watchEffect } from 'vue'



export interface TemplatesDemo {
  dataTemplate: object
  showTemplate: integer
}

const props = defineProps<TemplatesDemo>()


const emit = defineEmits<{
  (e: 'update:showTemplate', value: number): void
}>();

const _showTemplate = ref(props.showTemplate);

watchEffect(() => {
  _showTemplate.value = props.showTemplate
});





/*
function setValue(newValue: number) {
  _showTemplate.value = key;
  emit('update:showTemplate', _showTemplate.value);
}
*/




/*
console.log('dd', props.dataTemplate.value)

const showTemplate = ref(props.showTemplate)
showTemplate.value = props.showTemplate
*/

//console.log('showTemplate', showTemplate.value)

const showImage = (index) => {
  console.log('index: ', index)
  var img = document.getElementById('image-' + index) 
  console.log('img', img)
  
  var panelImg = document.getElementById('image-from')
  
  panelImg.prepend(img)
}

const setTemplate = (index) => {
  //dataTemplate.value = data.data[index]
  //showTemplate.value = index
  //console.log('e', showTemplate.value)
  
  //props.showTemplate = index
  console.log('index', index)
  _showTemplate.value = index
  _activeMenuTemplateData.value = index
  
  emit('update:activeMenuTemplateData', index);
}
</script>



<template>
  <section color="grey">
    <div v-if="_showTemplate < 0" class="columns">
      <div class="column is-6">
        <Title tag="h1" :size="1" weight="bold">
          <span class="text-gradient">{{ props.dataTemplate.title }}</span>
        </Title>
        <p>
          {{ props.dataTemplate.subtitle }}
        </p>
        <p>
          {{ props.dataTemplate.resume }}
        </p>
        <Buttons class="mt-2">
          <Button size="xs"  color="primary" raised bold>
            Test Demo
          </Button>
          <Button size="xs" bold>
            Más info
          </Button>
        </Buttons>
      </div>
      <div class="column is-6">
          <div>
            <div 
              v-for="(template, index) in props.dataTemplate.template"
              :key="index"
              class="card is-curved card-overflow card-shadow-hover mb-2 cursor-pointer"
              @click="setTemplate(index)"
              @keydown.space.prevent="() => (setTemplate = index)"
              >
                <div>
                  <div>
                    {{ template.type }}
                    {{ template.title }}
                  </div>
                  <p>
                      {{ template.info }}
                  </p>
                  <div v-if="false">
                      <h3>
                        Login Credentials
                      </h3>
                      <div>
                        <span>Phone:</span>
                        <strong>{{ template.user }}</strong>
                      </div>
                      <div>
                        <span>Password:</span>
                        <strong>{{ template.password }}</strong>
                      </div>
                  </div>
                </div>
            </div>
          </div>
      </div>
    </div>
    
    <div v-if="_showTemplate >= 0" class="columns">
        <div class="column is-6">
          <Title class="mb-2" tag="h1" :size="3" weight="bold">
              {{ props.dataTemplate.data[_showTemplate].title }}
          </Title>
          <p>
            {{ props.dataTemplate.data[_showTemplate].info }}
          </p>
          <div class="columns mt-2">
            <div 
              class="column is-6">
              <Tag 
                class="cursor-pointer"
                v-for="(content, index) in props.dataTemplate.data[_showTemplate].content.slice(0, props.dataTemplate.data[_showTemplate].content.length/2 )"
                @click="showImage(index)">
                {{ content }}
              </Tag>
            </div>
            <div 
              class="column is-6">
              <Tag 
                class="cursor-pointer"
                v-for="(content, index) in props.dataTemplate.data[_showTemplate].content.slice(props.dataTemplate.data[_showTemplate].content.length/2)"
                @click="showImage(index + props.dataTemplate.data[_showTemplate].content.length/2)">
                {{ content }}
              </Tag>
            </div>
          </div>
        </div>
        <div class="column is-6 ml-4">
            <div id="image-from" class="columns">
                <div 
                    class="column is-6"
                    v-for="(image, index) in props.dataTemplate.data[_showTemplate].images" 
                    :key="'image-' + index"
                    :id="'image-' + index">
                    {{ image }}
                    <img :src="image" class="image" />
                </div>
            </div>
        </div>
    </div>
    
    
    
  </section>
</template>

<style lang="scss" scoped>
.image {
    width: 300px !important;
}
</style>
