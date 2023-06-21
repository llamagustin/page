<script setup lang="ts">

import { loadScript } from '@/shared/utils/dom'
import { useTwilio } from '@/views/apps/chat/useTwilio'

// import '@/assets/twilio/twilio.css'
import '@/assets/twilio/twilio.min.js'
//import '@/assets/twilio/twilio.js'



interface Props {
  handleIncomingCall: boolean;
  called: string;
  calling: boolean;
}


interface Emits {
  (e: 'loadCall', value): void;
}


const props = defineProps<Props>()
const emit = defineEmits<Emits>()



// const {
//     ringTone,
//     speaker,
//     availableCall,
//     makeOutgoingCall,
//     startupClient
// } = ref()

const availableCall = ref(false)
const ringTone = ref([])
const speaker = ref([])
const handleIncomingCall = ref(props.handleIncomingCall)

var acceptIncomingCall, makeOutgoingCall, hangupIncomingCall
  
// acceptIncomingCall
// call


onMounted(async () => {
  const speakerDevices = document.getElementById("speaker-devices");
  const ringtoneDevices = document.getElementById("ringtone-devices");
  const outputVolumeBar = document.getElementById("output-volume");
  const inputVolumeBar = document.getElementById("input-volume");
  const volumeIndicators = document.getElementById("volume-indicators");
  const callButton = document.getElementById("button-call");
  const outgoingCallHangupButton = document.getElementById("button-hangup-outgoing");
  const callControlsDiv = document.getElementById("call-controls");
  const audioSelectionDiv = document.getElementById("output-selection");
  const getAudioDevicesButton = document.getElementById("get-devices");
  const incomingCallDiv = document.getElementById("incoming-call");
  const incomingCallHangupButton = document.getElementById("button-hangup-incoming");
  const incomingCallAcceptButton = document.getElementById("button-accept-incoming");
  const incomingCallRejectButton = document.getElementById("button-reject-incoming");
  const phoneNumberInput = document.getElementById("phone-number");
  const incomingPhoneNumberEl = document.getElementById("incoming-number");
  const startupButton = document.getElementById("startup-button");
console.log('call', callControlsDiv)

  var {
    handleIncomingCall: _handleIncomingCall,
    availableCall: _availableCall,
    ringTone: _ringTone,
    speaker: _speaker,
    hangupIncomingCall: _hangupIncomingCall,
    acceptIncomingCall: _acceptIncomingCall,
    makeOutgoingCall: _makeOutgoingCall,
    startupClient
  } = await useTwilio(
      speakerDevices,
      ringtoneDevices,
      outputVolumeBar,
      inputVolumeBar,
      volumeIndicators,
      callButton,
      outgoingCallHangupButton,
      callControlsDiv,
      audioSelectionDiv,
      getAudioDevicesButton,
      incomingCallDiv,
      incomingCallHangupButton,
      incomingCallAcceptButton,
      incomingCallRejectButton,
      phoneNumberInput,
      incomingPhoneNumberEl,
      startupButton
    )
  
  await startupClient()

  handleIncomingCall.value = _handleIncomingCall.value
  availableCall.value = _availableCall.value
  ringTone.value = _ringTone.value
  speaker.value = _speaker.value
  
  console.log('_________________________', availableCall.value)
  hangupIncomingCall = _hangupIncomingCall
  acceptIncomingCall = _acceptIncomingCall
  console.log('accept', hangupIncomingCall)
  makeOutgoingCall = _makeOutgoingCall
  // startupClient = _startupClient
  

  
  console.log('wfuwu', props.called, 'we', called.value)
    
    // await loadScript('//ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js')

    //start twilio
    // setTimeout(async function(){
    //   // loadScript('https://api.aythen.com/static/src/assets/twilio/twilio.js')
    //   //   setTimeout(async function(){
    //   //     startupClient() //twilio
    //   //   }, 1000)
    //   startupClient()
    // }, 1000)


console.log('eeee called value', called.value)
  if(called.value){
    callIni()
  }
    
})


  
onBeforeUnmount(() => {
  hangupIncomingCall()
  console.log('disconected')
});

watch(() => props.called, () => {
    if(props.called){
      console.log('111111111111111111111111')
      callIni()
    }
})
  
watch(() => props.calling, (val) => {
  console.log('chaaat twilioo', val)
  if(val){ //accept
    handleIncomingCall.value = false //not alert
    acceptIncomingCall()
  }else{ //hangout
    call.disconnect();
  }
})









// 👉 store
const called = ref(props.called)
var timeInterval

var callMake = () => {
  setTimeout(function(){
    emit('loadCall', true)
    makeOutgoingCall(); //twilio
  }, 1000)
}

var callIni = () => {
  console.log('availableca', availableCall.value)
  if(availableCall.value){ //twilio
       if(props.calling) callMake()
  }else{
    timeInterval = setInterval(function(){
      if(availableCall){ //twilio
        clearInterval(timeInterval)
        
        if(props.calling) callMake()
      }
    }, 1000)
  }
}











watch(() => handleIncomingCall, (val) => {
  props.handleIncomingCall = val
}, {immediate: true})






// onMounted(async () => {
//     console.log('wfuwu', props.called, 'we', called.value)
    
//     await loadScript('//ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js')

//     //start twilio
//     setTimeout(async function(){
//       // loadScript('https://api.aythen.com/static/src/assets/twilio/twilio.js')
//       //   setTimeout(async function(){
//       //     startupClient() //twilio
//       //   }, 1000)
//       startupClient()
//     }, 1000)


//     if(called.value){
//       callIni()
//     }
    
    
  
// })

  
  
// loadScript('//ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js')

// setTimeout(async function(){
//   await loadScript('https://api.aythen.com/static/src/assets/twilio/twilio.js')
 

// }, 3000)



  

// const id = ref('id')
// const status = ref(300)
 

</script>

<template>
    <br>
    calling: {{calling}}
    called: {{called}}
    ringtone: {{ringTone}}
    <div class="d-flex gap-2" >
      <VMenu  open-on-hover size="small">
        <template #activator="{ props }">
          <VBtn 
            variant="tonal" 
            color="" 
            size="32"
            v-bind="props"
            class="rounded">
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
      <VMenu  open-on-hover size="small">
        <template #activator="{ props }">
          <VBtn 
            variant="tonal" 
            color="" 
            size="32"
            v-bind="props"
            class="rounded">
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
    
    <!-- <section id="info">-->
    <!--        <VBtn -->
    <!--           id="startup-button"-->
    <!--           variant="text" size="xx-small" icon>-->
    <!--          <VIcon icon="tabler-message-circle"></VIcon>-->
    <!--        </VBtn>-->
    <!--        <div id="client-name"></div>-->
    <!--        <div id="output-selection" class="hide">-->
    <!--          <label>Ringtone</label>-->
    <!--          <select id="ringtone-devices" multiple></select>-->
    <!--          <label>Speaker</label>-->
    <!--          <select id="speaker-devices" multiple></select-->
    <!--          ><br />-->
    <!--          <button id="get-devices">Seeing "Unknown" devices?</button>-->
    <!--        </div>-->
    <!--        <div id="call-controls" class="hide">-->
              
    <!--          <div id="incoming-call" class="hide">-->
    <!--            <h2>Incoming Call Controls</h2>-->
    <!--            <p class="instructions">-->
    <!--              Incoming Call from <span id="incoming-number"></span>-->
    <!--            </p>-->
    <!--            <button id="button-accept-incoming">Accept</button>-->
    <!--            <button id="button-reject-incoming">Reject</button>-->
    <!--            <button id="button-hangup-incoming" class="hide">Hangup</button>-->
    <!--          </div>-->
    <!--          <div id="volume-indicators" class="hide">-->
    <!--            <label>Mic Volume</label>-->
    <!--            <div id="input-volume"></div>-->
    <!--            <br /><br />-->
    <!--            <label>Speaker Volume</label>-->
    <!--            <div id="output-volume"></div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div :style="{display: 'none'}">-->
    <!--            <input id="phone-number" v-model="called" type="text" placeholder="+15552221234" />-->
    <!--            <button id="button-call" type="submit">Call</button>-->
    <!--            <button id="button-hangup-outgoing" class="hide">Hang Up</button>-->
    <!--        </div>-->
    <!--</section>-->
    
    <section id="info" >
      <VBtn id="startup-button" />
      <div id="client-name"></div>
      <div id="output-selection" class="hide">
        <select id="ringtone-devices" multiple />
        <select id="speaker-devices" multiple />
        <button id="get-devices" />
      </div>
      <div id="call-controls" class="hide">
        <div id="incoming-call" class="hide">
          <span id="incoming-number" />
          <button id="button-accept-incoming" />
          <button id="button-reject-incoming" />
          <button id="button-hangup-incoming" class="hide" />
        </div>
        <div id="volume-indicators" class="hide">
          <div id="input-volume" />
          <div id="output-volume" />
        </div>
      </div>
      <div :style="{display: 'none'}">
          <input id="phone-number" v-model="called" type="text" placeholder="+15552221234" />
          <button id="button-call" type="submit" />
          <button id="button-hangup-outgoing" class="hide" />
      </div>
    </section>
</template>


<style lang="scss">
#info{
 width: 0px;
 height: 0px;
 position: fixed;
 top: -2000px;
 left: -2000px;
}
</style>


