<script setup lang="ts">
//https://stackoverflow.com/questions/72169746/vue3-vite-directly-access-parent-data-from-child-component
import { ref, watchEffect } from 'vue'



export interface AppsDemo {
  dataApp: object
  showApp: integer
}

const props = defineProps<AppsDemo>()


const emit = defineEmits<{
  (e: 'update:showApp', value: number): void
}>();

const _showApp = ref(props.showApp);

watchEffect(() => {
  _showApp.value = props.showApp
});





/*
function setValue(newValue: number) {
  _showApp.value = key;
  emit('update:showApp', _showApp.value);
}
*/




/*
console.log('dd', props.dataApp.value)

const showApp = ref(props.showApp)
showApp.value = props.showApp
*/

//console.log('showApp', showApp.value)

const showImage = (index) => {
  console.log('index: ', index)
  var img = document.getElementById('image-' + index) 
  console.log('img', img)
  
  var panelImg = document.getElementById('image-from')
  
  panelImg.prepend(img)
}

const setApp = (index) => {
  //dataApp.value = data.data[index]
  //showApp.value = index
  //console.log('e', showApp.value)
  
  //props.showApp = index
  console.log('index', index)
  _showApp.value = index
  _activeMenuAppData.value = index
  
  emit('update:activeMenuAppData', index);
}
</script>



<template>
  <section class="py-20" color="grey">
    <div v-if="_showApp < 0" class="columns">
      <div class="column is-6">
        <Title tag="h1" :size="1" weight="bold" class="mb-2">
          <span class="text-gradient">{{ props.dataApp.title }}</span>
        </Title>
        <p>
          {{ props.dataApp.subtitle }}
        </p>
        <div class="mt-2 mb-4">
          <small>
            {{ props.dataApp.resume }}
          </small>
        </div>
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
              v-for="(app, index) in props.dataApp.app"
              :key="index"
              class="card is-curved card-overflow card-shadow-hover mb-2 cursor-pointer"
              @click="setApp(index)"
              @keydown.space.prevent="() => (setApp = index)"
              >
                <div>
                  <div>
                    {{ app.type }}
                    {{ app.title }}
                  </div>
                  <p>
                      {{ app.info }}
                  </p>
                  <div v-if="false">
                      <h3>
                        Login Credentials
                      </h3>
                      <div>
                        <span>Phone:</span>
                        <strong>{{ app.user }}</strong>
                      </div>
                      <div>
                        <span>Password:</span>
                        <strong>{{ app.password }}</strong>
                      </div>
                  </div>
                </div>
            </div>
          </div>
      </div>
    </div>
    
    <div v-if="_showApp >= 0" class="columns">
        <div class="column is-6">
          <Title class="mb-2" tag="h1" :size="3" weight="bold">
              {{ props.dataApp.data[_showApp].title }}
          </Title>
          <p>
            {{ props.dataApp.data[_showApp].info }}
          </p>
          <div class="columns mt-2">
            <div 
              class="column is-6">
              <Tag 
                class="cursor-pointer"
                v-for="(content, index) in props.dataApp.data[_showApp].content.slice(0, props.dataApp.data[_showApp].content.length/2 )"
                @click="showImage(index)">
                {{ content }}
              </Tag>
            </div>
            <div 
              class="column is-6">
              <Tag 
                class="cursor-pointer"
                v-for="(content, index) in props.dataApp.data[_showApp].content.slice(props.dataApp.data[_showApp].content.length/2)"
                @click="showImage(index + props.dataApp.data[_showApp].content.length/2)">
                {{ content }}
              </Tag>
            </div>
          </div>
        </div>
        <div class="column is-6 ml-4">
            <div id="image-from" class="columns">
                <div 
                    class="column is-6"
                    v-for="(image, index) in props.dataApp.data[_showApp].images" 
                    :key="'image-' + index"
                    :id="'image-' + index">
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

.tag{
text-overflow: ellipsis !important;
    display: inherit !important;
    overflow: hidden !important;
    margin-bottom: 8px;
}

#image-from>div:first-child{
    border: 8px solid #000;
    border-bottom: 12px solid #000;
    border-radius: 40px;
    right: -60px;
    position: relative;
    z-index: 999;
    padding: 0px;
    overflow: hidden;
}
</style>
