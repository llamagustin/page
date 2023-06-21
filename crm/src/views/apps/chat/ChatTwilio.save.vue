<script setup lang="ts">

import { loadScript } from '@/shared/utils/dom'

// import '@/assets/twilio/twilio.css'
import '@/assets/twilio/twilio.min.js'
//import '@/assets/twilio/twilio.js'


interface Props {
  called?: string;
  calling: boolean;
}


interface Emits {
  (e: 'loadCall', value): void;
}


const props = defineProps<Props>()
const emit = defineEmits<Emits>()




// 👉 store
const called = ref(props.called)
var timeInterval

var callMake = () => {
  setTimeout(function(){
    emit('loadCall', true)
    window.makeOutgoingCall();
  }, 1000)
}

var callIni = () => {
  if(window.available){
       if(props.calling) callMake()
  }else{
    timeInterval = setInterval(function(){
      if(window.available){
        clearInterval(timeInterval)
        
        if(props.calling) callMake()
      }
    }, 1000)
  }
}




watch(() => props.called, () => {
  console.log('eee')
    console.log('calling.', props.called)
    if(props.called){
      callIni()
    }
    
})






onMounted(async () => {
    console.log('wfuwu', props.called, 'we', called.value)
    
    loadScript('//ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js')


    
    
    //start twilio
    setTimeout(async function(){
      loadScript('https://api.aythen.com/static/src/assets/twilio/twilio.js')
        setTimeout(async function(){
          window.startupClient()
        }, 1000)
    }, 1000)


    if(called.value){
      callIni()
    }
    
    
  
})

  
  
// loadScript('//ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js')

// setTimeout(async function(){
//   await loadScript('https://api.aythen.com/static/src/assets/twilio/twilio.js')
 

// }, 3000)



  

// const id = ref('id')
// const status = ref(300)
 
</script>

<template>
    <div :style="{background: 'red'}">
      <!-- ringtone -->
      <VMenu  open-on-hover size="small">
        <template #activator="{ props }">
          <VBtn 
            variant="tonal" 
            color="" 
            size="32"
            v-bind="props"
            class="rounded me-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mic"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
          </VBtn>
        </template>
        <VList class="cursor-pointer">
          <template v-for="(item, index) in itemsMenu">
            <VListItem  @click="selectedMenu = item.value">
              <VListItemTitle>{{ item.title }}</VListItemTitle>
            </VListItem>
          </template>
        </VList>
      </VMenu>
      <!-- speaker -->
      <VMenu  open-on-hover size="small">
        <template #activator="{ props }">
          <VBtn 
            variant="tonal" 
            color="" 
            size="32"
            v-bind="props"
            class="rounded me-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-headphones"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
          </VBtn>
        </template>
        <VList class="cursor-pointer">
          <template v-for="(item, index) in itemsMenu">
            <VListItem  @click="selectedMenu = item.value">
              <VListItemTitle>{{ item.title }}</VListItemTitle>
            </VListItem>
          </template>
        </VList>
      </VMenu>
    </div>
    
    
    <section id="info">
            <VBtn 
               id="startup-button"
               variant="text" size="xx-small" icon>
              <VIcon icon="tabler-message-circle"></VIcon>
            </VBtn>
            <div id="client-name"></div>
            <div id="output-selection" class="hide">
              <label>Ringtone</label>
              <select id="ringtone-devices" multiple></select>
              <label>Speaker</label>
              <select id="speaker-devices" multiple></select
              ><br />
              <button id="get-devices">Seeing "Unknown" devices?</button>
            </div>
            <div id="call-controls" class="hide">
              
              <div id="incoming-call" class="hide">
                <h2>Incoming Call Controls</h2>
                <p class="instructions">
                  Incoming Call from <span id="incoming-number"></span>
                </p>
                <button id="button-accept-incoming">Accept</button>
                <button id="button-reject-incoming">Reject</button>
                <button id="button-hangup-incoming" class="hide">Hangup</button>
              </div>
              <div id="volume-indicators" class="hide">
                <label>Mic Volume</label>
                <div id="input-volume"></div>
                <br /><br />
                <label>Speaker Volume</label>
                <div id="output-volume"></div>
              </div>
            </div>
            <div :style="{display: 'none'}">
                <input id="phone-number" v-model="called" type="text" placeholder="+15552221234" />
                <button id="button-call" type="submit">Call</button>
                <button id="button-hangup-outgoing" class="hide">Hang Up</button>
            </div>
    </section>
</template>



