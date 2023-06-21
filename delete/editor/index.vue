

<script setup lang="ts">
import { saveAs } from 'file-saver';
import { uuid } from 'vue-uuid'; 


import AppDateTimePicker from '@core/components/AppDateTimePicker.vue'
//import { data_editor } from './editor.ts'
import { useEditorListStore } from '@/views/editor/useEditorListStore'


const editorListStore = useEditorListStore()


const editor_show = ref(false)
const editor_post_show = ref(false)
const editor_paragraph_show = ref(false)

const currentEditor = ref('web')
const currentPost = ref('')
const currentParagraph = ref('')

const _currentEditor = ref('')
const _currentPost = ref('')
const _currentParagraph = ref('')


//
const editor = ref([])

const key_editor = ref([])
const key_posts = ref([])
const key_paragraphs = ref([])


//
//const editor = ref(data_editor)
const data_editor = ref({
  //id
  title: '',
  version: 0,
  data: {},
  logs: [],
  createdAt: new Date(),
  updatedAt: new Date()
})




const fetchDoc = () => {
  editorListStore.fetchDoc({
    id: '418d53f3-1362-42fc-b817-2fbc49f11737'
  }).then( result => {
    
    if(result.data !== 404){
      data_editor.value = result.data
      editor.value = result.data.data
      
      //var keys = Object.keys(editor.value)
      keys.map( key => {
        key_editor.value.push({
          key: key,
          id: uuid.v4()
        }) 
      })
      
    }
  }).catch( err => {
    console.log('err', err)
  })
}


fetchDoc()


/*
if(localStorage.dataEditor){
  editor.value = JSON.parse(localStorage.dataEditor)
}
*/

//data tab


const blank_editor = ref({
  title: '',
  description: '',
  posts: []
})

const blank_post = ref({
    id: '9dc5a5f0-2e48-4fb5-b9bc-3bf9141587e9',
    available: true,
    date: new Date(),
    title: 'publicación web 1',
    description: 'ee',
    paragraphs: []
})



const blank_paragraph = ref({
  available: true,
  date: new Date(),
  title: '',
  description: '',
  data: ''
})



const data_post = ref({})
const data_paragraph = ref({})



const toggleEditor = (value) => {
  key_posts.value = []
  key_paragraphs.value = []

  editor.value[currentEditor.value].posts.map( post => {
     key_posts.value.push({
       id: post.id,
       title: post.title
     })
  })
  
  editor.value[currentEditor.value].posts[0].paragraphs.map( paragraph => {
       key_paragraphs.value.push({
         id: paragraph.id,
         title: paragraph.title
       })
  })
  
  currentPost.value = editor.value[value].posts[0].id
  currentParagraph.value = editor.value[value].posts[0].paragraphs[0].id
  

  _currentEditor.value = currentEditor.value
  _currentPost.value = currentPost.value
  _currentParagraph.value = currentParagraph.value
  
  data_paragraph.value = editor.value[value].posts[0].paragraphs[0]
}






const capitalizedLabel = (label: boolean) => {
  const convertLabelText = label.toString()

  return convertLabelText.charAt(0).toUpperCase() + convertLabelText.slice(1)
}





const exportData = () => {
  var data = JSON.parse(localStorage.dataEditor)
  
  var str = localStorage.dataEditor;
  var bytes = new TextEncoder().encode(str);
  
  var blob = new Blob([bytes], {
    type: "application/json;charset=utf-8"})
    
  saveAs(blob, "static.txt");
}


const importData = () => {
    const input = document.createElement('input')
    input.type = 'file'
    
    input.addEventListener('change', handleFileUpload)
    
    input.click()
}








const handleFileUpload = (event) => {
    var file = event.target.files[0]
    
    var reader = new FileReader()
    reader.onload = (event) => {
      var fileContent = event.target.result
      var json = JSON.parse(fileContent)
      var keys = Object.keys(json)


      //validator
      var index = keys.indexOf('web')
    
      if(index > -1){
        localStorage.dataEditor = JSON.stringify(json)
        
        location.reload()
      }
      
    }
    reader.readAsText(file)
}





const saveEditor = () => {
  editorListStore.updateDoc(data_editor.value).then( result => {

  }).catch( err => {

  })
}









//
//toggleEditor('web')


const openEditor = async (key) => {
  //await saveParagraph()
  
  //toggleEditor(key)
  
  console.log('edi', editor.value)
  
  if(!editor.value[key]){
    console.log('not exist key')
    
    editor.value.push(blank_editor)
    
    
    return false
  }

  var data = editor.value[key].posts[0]
  data_post.value = data
  
  var data = editor.value[key].posts[0].paragraphs[0]
  data_paragraph.value = data
  
  //_currentEditor.value = currentEditor.value
  //_currentPost.value = currentPost.value
  //_currentParagraph.value = editor_post_show.value.id
}

const openPost = async () => {
  //await saveParagraph()
    
  var index_post = editor.value[currentEditor.value].posts.findIndex(x => { return x.id == currentPost.value })
  
  
  var data = editor.value[currentEditor.value].posts[index_post]
  data_post.value = data
  
  var data = editor.value[currentEditor.value].posts[index_post].paragraphs[0]
  data_paragraph.value = data
  
  //
  key_paragraphs.value = []

  editor.value[currentEditor.value].posts[index_post].paragraphs.map( paragraph => {
       key_paragraphs.value.push({
         id: paragraph.id,
         title: paragraph.title
       })
  })
  
  currentParagraph.value = data_paragraph.value.id

  _currentPost.value = currentPost.value
  _currentParagraph.value = currentParagraph.value.id
}



const openParagraph = async () => {
  //await saveParagraph()
  
  var index_post = editor.value[currentEditor.value].posts.findIndex(x => { return x.id == currentPost.value })
  var index_paragraph = editor.value[currentEditor.value].posts[index_post].paragraphs.findIndex(x => { return x.id == currentParagraph.value })
 
 
  data_paragraph.value = editor.value[currentEditor.value].posts[index_post].paragraphs[index_paragraph]
  
  
  _currentEditor.value = currentEditor.value
  _currentPost.value = currentPost.value
  _currentParagraph.value = currentParagraph.value
}




//
const saveParagraph = async () => {
  editor_post_show.value = false
  
  var index_post = editor.value[_currentEditor.value].posts.findIndex(x => { return x.id == _currentPost.value })
  var index_paragraph = editor.value[_currentEditor.value].posts[index_post].paragraphs.findIndex(x => { return x.id == _currentParagraph.value })

  editor.value[_currentEditor.value].posts[index_post].paragraphs[index_paragraph] = data_paragraph.value

  localStorage.dataEditor = JSON.stringify(editor.value)
  //localStorage.dataEditor = JSON.stringify(editor.value)

  _currentEditor.value = currentEditor.value
  _currentPost.value = currentPost.value
  _currentParagraph.value = currentParagraph.value
}




const deleteParagraph = async () => {
  
  if(key_paragraphs.value.length == 1){
    alert('Cannot delete single item')
    return false
  }
  
  var index_post = editor.value[currentEditor.value].posts.findIndex(x => x.id == currentPost.value)
  var index_paragraph = editor.value[currentEditor.value].posts[index_post].paragraphs.findIndex(x => x.id == currentParagraph.value)
  
  
  
  delete key_paragraphs.value[index_paragraph]
  key_paragraphs.value = key_paragraphs.value.filter(Boolean)
  
  delete editor.value[currentEditor.value].posts[index_post].paragraphs[index_paragraph]
  editor.value[currentEditor.value].posts[index_post].paragraphs = editor.value[currentEditor.value].posts[index_post].paragraphs.filter(Boolean)
  
  var data = editor.value[currentEditor.value].posts[index_post].paragraphs[0]
  
  currentParagraph.value = data.id
  _currentParagraph.value = data.id
  
  data_paragraph.value = data
  
}




const showEditor = () => {
  if(editor_show.value){
    editor_show.value = false
  }else{
    editor_show.value = true
  }
}

const showPostEditor = () => {
  if(editor_post_show.value){
    editor_post_show.value = false
  }else{
    editor_post_show.value = true
  }
}

const showParagraphEditor = () => {
  if(editor_paragraph_show.value){
    editor_paragraph_show.value = false
  }else{
    editor_paragraph_show.value = true
  }
}


//
const addEditor = () => {
  
  console.log('e', editor.value)
  var data = JSON.parse(JSON.stringify(blank_editor.value))
  data.id = uuid.v4()
  
  editor.value.push(data)
  
  //key_editor.value = []
  //var keys = Object.keys(editor.value)
  key_editor.value.push({
    key: data.title,
    id: data.id
  })
  
}

const addPost = () => {
  if(editor_post_show.value){
    editor_post_show.value = false
  }else{
    editor_post_show.value = true
  }
}



const addParagraph = async () => {
 //await saveParagraph()
 
 var index = editor.value[currentEditor.value].posts.findIndex(x => { return x.id == currentPost.value })
 
 
 blank_paragraph.value.id = uuid.v4()
 data_paragraph.value = JSON.parse(JSON.stringify(blank_paragraph.value))
 

 editor.value[currentEditor.value].posts[index].paragraphs.push(data_paragraph.value)
 key_paragraphs.value.push({
   id: data_paragraph.value.id,
   title: data_paragraph.value.title
 })
 
 
 currentParagraph.value = data_paragraph.value.id
 _currentParagraph.value = data_paragraph.value.id
}


//
const changeTitleParagraph = () => {
  var index = key_paragraphs.value.findIndex(x => x.id == currentParagraph.value)
  
  key_paragraphs.value[index].title = data_paragraph.value.title
}
</script>


<template>
  <div :style="{padding: '10px'}">
    <VRow>
    <VCol
      cols="2"
    >
      
      <div class="d-flex items-center">
        <VBtn 
          icon
          variant="tonal"
          class="mb-2"
          @click="addEditor">
            <VIcon
              size="18"
              icon="tabler-plus"
            />
        </VBtn>
          <VBtn
            icon
            variant="tonal"
            size="32"
            class="rounded ml-auto"
            color="default"
            @click="saveEditor"
          >
            <VIcon
              size="18"
              icon="tabler-cloud-upload"
            />
          </VBtn>
    </div>
    
      <VTabs
        v-model="currentEditor"
        direction="vertical"
        class="v-tabs-pill"
      >
        <VTab
          v-for="(key, index) in key_editor"
          :value="key"
          @click="openEditor(key)">
          <VIcon
            start
            icon="tabler-alert-circle"
            @click="showEditor"
          />
          {{ key.key }} 
        </VTab>
      </VTabs>
    </VCol>

    <VCol
      cols="10"
    >
     <VRow>
       <VCol >
         <div class="d-flex">
           <VBtn
              icon
              variant="tonal"
              size="32"
              class="rounded me-3"
              color="default"
              @click="showPostEditor"
            >
              <VIcon
                size="18"
                icon="tabler-alert-circle"
              />
            </VBtn>
            <VBtn
              icon
              variant="tonal"
              size="32"
              class="rounded me-3"
              color="default"
              @click="addPost"
            >
              <VIcon
                size="18"
                icon="tabler-plus"
              />
            </VBtn>
            <VBtn
                icon
                variant="tonal"
                size="32"
                class="rounded me-3"
                color="default"
                @click="deletePost(data_post.id)"
              >
                <VIcon
                  size="18"
                  icon="tabler-trash"
                />
              </VBtn>
         </div>
       </VCol>
       <VCol>
           <VTabs
              v-if="key_posts.length > -1"
              v-model="currentPost">
            <VTab
                v-for="(key, index) in key_posts"
                :value="key.id"
                @click="openPost()"
              >
                {{ key.title }}
              </VTab>
            </VTabs>
       </VCol>
     </VRow>
     <VCard v-if="editor_post_show" class="mt-2">
       <VCardText>
         <VRow>
             <VCol cols="7">
                  <VTextField v-model="data_post.title" label="Titulo" />
              </VCol>
              <VCol cols="1">
                  <VSwitch
                      v-model="data_post.available"
                    />
              </VCol>
              <VCol cols="12" :style="{marginTop: '-28px'}">
                <VTextarea cols="12" class="mt-4"
                  v-model="data_post.description"
                />
              </VCol>
         </VRow>
       </VCardText>
     </VCard>
     <VTabs
        v-if="key_paragraphs.length > -1"
        v-model="currentParagraph"
        class="v-tabs-pill my-2"
      >
        <VTab
            v-for="(key, index) in key_paragraphs"
            :value="key.id"
            @click="openParagraph()">
            {{ key.title }}
        </VTab>
      </VTabs>
      <VCard>
        <pre v-if="false">
          {{ editor[currentEditor] }}
        </pre>
        <VCardText>
            <div v-if="editor_paragraph_show">
              <VRow class="mt-2s">
                  <VCol cols="6">
                      <VTextField 
                      v-model="data_paragraph.title"
                      @input="changeTitleParagraph"
                      label="Titulo" />
                  </VCol>
                  <VCol cols="3">
                      <AppDateTimePicker
                            v-model="date"
                            label="Default"
                          />
                  </VCol>
                  <VCol cols="1">
                      <VSwitch
                          v-model="data_paragraph.available"
                        />
                  </VCol>
                  <VCol cols="2">
                      <VRow>
                        <VCol cols="4">
                          <div class="d-flex">
                              <VBtn
                                icon
                                variant="tonal"
                                size="32"
                                class="rounded me-3"
                                color="default"
                                @click="deleteParagraph(data_paragraph.id)"
                              >
                                <VIcon
                                  size="18"
                                  icon="tabler-trash"
                                />
                              </VBtn>
                               <VBtn
                                  icon
                                  variant="tonal"
                                  size="32"
                                  class="rounded me-3"
                                  color="default"
                                  @click="showParagraphEditor"
                                >
                                  <VIcon
                                    size="18"
                                    icon="tabler-alert-circle"
                                  />
                                </VBtn>
                              <VBtn
                                icon
                                variant="tonal"
                                size="32"
                                class="rounded me-3"
                                color="default"
                                @click="addParagraph()"
                              >
                                <VIcon
                                  size="18"
                                  icon="tabler-plus"
                                />
                              </VBtn>
                          </div>
                        </VCol>
                      </VRow>
                  </VCol>
              </VRow>
               <VTextarea class="mt-4"
                  v-model="data_paragraph.description"
                />
            </div>
            <div v-else>
                <VRow>
                  <VCol cols="3" class="ml-auto">
                      <div>
                          <VBtn
                            icon
                            variant="tonal"
                            size="32"
                            class="rounded me-3"
                            color="default"
                            @click="deleteParagraph(data_paragraph.id)"
                          >
                            <VIcon
                              size="18"
                              icon="tabler-trash"
                            />
                          </VBtn>
                           <VBtn
                              icon
                              variant="tonal"
                              size="32"
                              class="rounded me-3"
                              color="default"
                              @click="showParagraphEditor"
                            >
                              <VIcon
                                size="18"
                                icon="tabler-alert-circle"
                              />
                            </VBtn>
                          <VBtn
                            icon
                            variant="tonal"
                            size="32"
                            class="rounded me-3"
                            color="default"
                            @click="addParagraph()"
                          >
                            <VIcon
                              size="18"
                              icon="tabler-plus"
                            />
                          </VBtn>
                      </div>
                  </VCol>
                </VRow>
            </div>
                <v-md-editor 
                  v-model="data_paragraph.data" 
                  height="100vh"></v-md-editor>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  </div>
</template>

<!--
https://github.com/code-farmer-i/vue-markdown-editor

https://github.com/imzbf/md-editor-v3
-->




<script lang="ts">
import { createApp } from 'vue';
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

import enUS from '@kangc/v-md-editor/lib/lang/en-US';

VMdEditor.lang.use('en-US', enUS);


// highlightjs
import hljs from 'highlight.js';

VMdEditor.use(githubTheme, {
  Hljs: hljs,
});

const app = createApp(/*...*/);

app.use(VMdEditor);
</script>


<!--
<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
</route>
-->



<style lang="scss">
.v-md-editor{
  box-shadow: none;
  border: 1px solid lightgrey;
  margin-top: 14px;
}
</style>




