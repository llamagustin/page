<script lang="ts" setup>
// import { v4 as uuidv4 } from 'uuid';

// Composables
import { templates } from '@/assets/email/templates'
// import { plantillas } from '@/@fake-db/email/plantillas'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { useEmail } from '@/views/apps/email/useEmail'
import { useEmailStore } from '@/views/apps/email/useEmailStore'

const route = useRoute()
const store = useEmailStore()

interface Props {
  to?: [],
  userData: {},
  leads: [],
  subject?: '',
  email?: {}
}

const props = defineProps<Props>()
const leadsAssigned = ref([]);

const emit = defineEmits<{ (e: 'close'): void }>()

const to = ref(props.to ||[])
const subject = ref('')
const message = ref('')
const isTemplate = ref(false)
const html = ref()
const saveUndefineds = ref([])

const resetValues = () => {
  to.value = []
  subject.value = ''
  message.value = ''
  isTemplate.value = false;
  templateSelected.value = null;
}



const closeTable = async () => {
  console.log('closing...');
  emit('close');
}
// Send emails
const loadSend = ref(false)
const errors = ref('')

const sendEmail = async () => {
  // var id_email = uuidv4()
  
  var currentMessage = templateSelected.value ? html.value.outerHTML : message.value
  
  // if(templateSelected.value){
  //   var regex = new RegExp('ay-pixel', 'g');
  //   currentMessage = await currentMessage.replace(regex, id_email)
  // }

  if(loadSend.value) return
  
  if(!to.value){
    errors.value = 'No existe destinatario'
    return
  }else if(!subject.value){
    errors.value = 'No existe subject'
    return
  }else if(!currentMessage){
    errors.value = 'No existe mensaje'
    return
  }
  
  // console.log('to', to.value, props.userData.email)
  // if(loadSend.value || !(to.value && subject.value && currentMessage)){
  //   return
  // }
  
  
  
  loadSend.value = true
  
  const data = {
    sender: 'info@aythen.com',
    // category: 'test',
    // type: 'test',
    recipient: to.value,
    subject: subject.value,
    body_html: currentMessage,
    email: {
      // id: uuidv4(),
      user_id:props.userData.id,
      to: to.value,
      from: {
        email: props.userData.email,
        name: props.userData.fullName,
        avatar: props.userData.avatar
      },
      subject: subject.value,
      cc: [],
      bcc: [],
      message: currentMessage,
      attachments: [],
      isStarred: false,
      labels: [],
      time: Date.now(),
      replies: [],
      folder: 'sent',
      isRead: true,
      isDeleted: false,
      isOpen: 400, //200 open 300 recivied 400 send
      status:0,
    }
  }


  var abilities = JSON.parse(localStorage.getItem('userAbilities'))
  var manage = abilities?.action == 'manage' ? true : false
  
  if(manage) data.email.status = 1
  
  var result = await store.saveEmail(data.email)
  // console.log('result', result)
  if(manage) await store.sendEmail(result.data)
  
  
  await closeTable();
  
  loadSend.value = false
  resetValues()
}



watch(() => props.leads, (newLeads) => {
  if(newLeads?.length) {
    for(let i = 0; i < props.leads.length; i++){
      if(props.leads[i].name?.name){
        var fullName = props.leads[i].name?.name + '' + props.leads[i].name?.firstSurname + ' ' + props.leads[i].name?.secondSurname
        leadsAssigned.value.push(`${fullName}<${props.leads[i].email}>`)
      }else{
        leadsAssigned.value.push(`${props.leads[i].company}<${props.leads[i].email}>`)
      }
      // console.log(props.leads[i].email);
    }
  }
})


watch(() => props.to, (newTo) => {
  if(newTo?.length) {
    for(let i = 0; i < props.to.length; i++){
      if(props.to[i].name?.name){
        var fullName = props.to[i].name?.name + '' + props.to[i].name?.firstSurname + ' ' + props.to[i].name?.secondSurname
        to.value.push(`${fullName}<${props.to[i].email}>`)
      }else{
        to.value.push(`${props.to[i].company}<${props.to[i].email}>`)
      }
      // console.log(props.leads[i].email);
    }
  }
})

const getTemplate = async (folder:string, template:string)=>{
  let qr = await store.getTemplate(folder, template);
  message.value = qr.data;
  isTemplate.value = true;
}

const saveDraft = async () =>{
  // console.log('saving...');
  // let aplica = subject.value != '' &&  to.value.length && message.value !='';
  let aplica = (message.value !== '');
  const currentMessage = templateSelected.value ? html.value.outerHTML : message.value;

  if(aplica) {
    const email = {
      to: {
        email: to.value,
        name: 'Aythen'
      },
      from: {
        email: props.userData.email,
        name: props.userData.fullName
      },
      subject: subject.value,
      cc: [],
      bcc: [],
      message: currentMessage,
      attachments: [],
      isStarred: false,
      labels: ['draft'],
      replies: [],
      time: Date.now(),
      folder: 'draft',
      isRead: true,
      isDeleted: false,
      status: 0,
      user_id: props.userData.id
    }
    
    
    var result = await store.saveEmail(email)
    
    // console.log('saved to borradores...');
  }
  resetValues();
  // console.log('not saved...');
  emit('close'); 
}


// TEMPLATES AVAILABLES
const FROM_FOLDER = ref('lead');
const templateSelected = ref(null);
const availableTemplates = templates.template[FROM_FOLDER.value];

watch(templateSelected, (newValue) => {
  if(newValue && newValue != 'Ninguno') {
    subject.value = 'Template "' + newValue.replace(/\.html/g, "") + '"';
    
    getTemplate(FROM_FOLDER.value, templateSelected.value)
  } else {
    message.value = '';
    isTemplate.value = false;
  }
  
  
    // let elemento = document.getElementById('expandible') as HTMLDivElement | null
    
    // elemento.style.height="80%";
})

// RESENT
watch(() => store.typeAction, (newValue) => {
  if(props.email) {
    const data = props.email
    if(store.typeAction === 'forward'){
      // to.value = data.to.email
      console.log('eee message:', data.message.startsWith('<'))
      subject.value = data.subject
      // templateSelected.value = 'Ninguno'
      if(data.message.startsWith('<')) {
        console.log('eee', isTemplate.value)
        isTemplate.value = true
      }
      setTimeout(() => {
        message.value = data.message
      }, 300)
    }else if(store.typeAction === 'reply'){
      resetValues();
      to.value = data.from.email;
    }else {
      resetValues();
    }
  }
})


//INSERT NEW EMAILS
const insertEmail = () => {
  const element = document.getElementById('getInput') as HTMLInputElement | null;
  let value = element.value;
  let cont = 0;
  
  for(let i = 0; i<props.leads.length;i++){
    if(props.leads[i].email==value){
      cont++;
    }
  }
  if(cont==0){
    let valid =/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    if(valid.exec(value)){
      to.value.push(value);
      saveUndefineds.value.push(value);
    }else{
      // console.log('email invalido.');
    }
  }
}


const deleteEmail = () => {
  to.value = ''
  message.value = ''
  subject.value = ''
  templateSelected.value = ''
  
  emit('close');
}

const deleteUndefineds = () => {
  let ultEmail = saveUndefineds.value[saveUndefineds.value.length-1];
  
  for (let i=0;i<to.value.length;i++){
    if(to.value[i]===ultEmail){
      to.value.splice(i, 1);
    }
  }
}

// const saludar = () => {
//   if(isTemplate.value){
//     isVisible = true;
//     console.log(isVisible)
//   }else{
//     isVisible = false;
//     console.log(isVisible)
//   }
// }
 


// END INSERT
</script>

<template>
  <VCard 
    :class="templateSelected ? 'email-large' : 'email-small'"
    class="email-compose-dialog"
    id="expandible" elevation="24">
    
    
    
    <VCardItem  class="py-3 px-5" >
      <div class="d-flex align-center">
        <span class="font-weight-semibold">Redactar Correo</span>
        <VSpacer />
        <VIcon size="20" icon="tabler-minus" class="me-4" @click="$emit('close')" />
        <VIcon size="20" icon="tabler-x" @click="$emit('close'); saveDraft();" />
      </div>
    </VCardItem>

    <div class="pe-5">
      <VAutocomplete v-model="to" id="getInput" @change="insertEmail()" @keyup.delete="deleteUndefineds()" density="compact" :items="leadsAssigned" multiple>
        <template #prepend-inner>
          <div class="text-sm text-disabled">
            Para:
          </div>
        </template>
      </VAutocomplete>
    </div>
    <VDivider />
  
    <VRow style="flex:.1;">
      <VCol>
        <VTextField v-model="subject" style="flex:.1;" density="compact" >
          <template #prepend-inner>
            <div class="text-sm text-disabled">
              Asunto:
            </div>
          </template>
        </VTextField>
      </VCol>
      <VCol>
        
        <VAutocomplete 
          v-model="templateSelected"
          density="compact"
          :items="availableTemplates"
          clearable
        >
          <template #prepend-inner>
            <div class="text-sm text-disabled">
              Template
            </div>
          </template>
        </VAutocomplete>
      </VCol>
    </VRow>

    <VDivider />
    
    <div class="divTemplate py-2 px-4">
      <VTextarea 
        v-if="isTemplate == false" 
        v-model="message" 
        class="px-0"
      />
      <html v-else 
        ref="html"
        contenteditable="true"
        v-html="message"></html>
    </div>
    <VDivider />
    <div class="d-flex align-center px-5 py-4">
      <VBtn @click="sendEmail">Enviar</VBtn>
      <p v-if="errors">
        {{errors}}
      </p>
      <!-- 
      <VBtn icon size="x-small" color="default" variant="text" >
        <VIcon size="22" icon="tabler-link" />
        <VMenu activator="parent">
          <VList>
            <VListItem v-for="f in plantillas.folders"> 
              
              <VBtn variant="text" color="default" >
                {{f}} 
                <VIcon icon="tabler-caret-right" />
                <VMenu activator="parent">
                  <VList>
                    <VListItem 
                      @click="getPlantilla(f,p)"
                      v-for="p in plantillas.plantilla[f]"
                    >
                      {{p}}
                    </VListItem>
                  </VList>
                </VMenu>
              </VBtn>
            </VListItem>
          </VList>
        </VMenu>
       </VBtn>
       -->
      <VSpacer />
      <VIcon icon="tabler-trash" size="20" class="ms-4 cursor-pointer" @click="deleteEmail" />
    </div>
    <VProgressLinear
      v-if="loadSend"
      color="primary"
      indeterminate
      reverse
    />
  </VCard>
</template>

<style lang="scss">

main .flex-important{
  display:flex; 
}
.divTemplate{
  min-height:150px;
  overflow-y: auto;
  flex:1;
}
.divEditable{
  max-height:320px; 
  min-height:150px;
  border:none;
}
.email-compose-dialog {
  /*height:50%;*/
  flex-direction:column;
  z-index: 911 !important;
  display:flex;

  .v-card-item {
    background-color: rgba(var(--v-theme-on-surface), var(--v-hover-opacity));
  }

  .v-field__outline {
    display: none;
  }
}

.email-large{
  height:90% !important;
  
}
textarea {
  resize: none;
  height: 170px;
}
</style>
