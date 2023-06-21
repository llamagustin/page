import axios from 'axios'

const axiosIns = axios.create({
  baseURL: "https://api.aythen.com",
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
    }
});


export const useTwilio = (
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
    ) => {
      //
      const handleIncomingCall = ref(false)
      const availableCall = ref(false)
      const ringTone = ref([])
      const speaker = ref([])
      
    //   const speakerDevices = document.getElementById("speaker-devices");
    //   const ringtoneDevices = document.getElementById("ringtone-devices");
    //   const outputVolumeBar = document.getElementById("output-volume");
    //   const inputVolumeBar = document.getElementById("input-volume");
    //   const volumeIndicators = document.getElementById("volume-indicators");
    //   const callButton = document.getElementById("button-call");
    //   const outgoingCallHangupButton = document.getElementById("button-hangup-outgoing");
    //   const callControlsDiv = document.getElementById("call-controls");
    //   const audioSelectionDiv = document.getElementById("output-selection");
    //   const getAudioDevicesButton = document.getElementById("get-devices");
    //   const incomingCallDiv = document.getElementById("incoming-call");
    //   const incomingCallHangupButton = document.getElementById("button-hangup-incoming");
    //   const incomingCallAcceptButton = document.getElementById("button-accept-incoming");
    //   const incomingCallRejectButton = document.getElementById("button-reject-incoming");
    //   const phoneNumberInput = document.getElementById("phone-number");
    //   const incomingPhoneNumberEl = document.getElementById("incoming-number");
    //   const startupButton = document.getElementById("startup-button");
    
      window.call;
      let device;
      let token;
    
      
    
      const startupClient = async () => {
        try {
          // const data = await $.getJSON("https://api.aythen.com/twilio/token");
          const { data } = await axiosIns.get('/twilio/token');
          
          token = data.token;
          setClientNameUI(data.identity);
          intitializeDevice();
        } catch (err) {
          console.log("An error occurred. See your browser console for more information.");
        }
      }
    

      const intitializeDevice = () => {
        device = new Twilio.Device(token, {
          logLevel:1,
          codecPreferences: ["opus", "pcmu"],
        });
    
        addDeviceListeners(device);
        device.register();
      }
      
      const addDeviceListeners = (device) => {
        device.on("registered", function () {
          availableCall.value = true
          callControlsDiv.classList.remove("hide");
        });

        device.on("incoming", fnHandleIncomingCall);
    
        device.audio.on("deviceChange", updateAllAudioDevices.bind(device));
        
        if (device.audio.isOutputSelectionSupported) {
          audioSelectionDiv.classList.remove("hide");
        }
      }
    
 
      const makeOutgoingCall = async () => {
        var params = {
          To: phoneNumberInput.value,
        };
    
        if (device) {
          window.call = await device.connect({ params });
    
          call.on("accept", updateUIAcceptedOutgoingCall);
          call.on("disconnect", updateUIDisconnectedOutgoingCall);
          call.on("cancel", updateUIDisconnectedOutgoingCall);
    
          outgoingCallHangupButton.onclick = () => {
            window.call.disconnect();
          };
    
        } else {
          console.log("Unable to make call.");
        }
      }
    
      const updateUIAcceptedOutgoingCall = (call) => {
        callButton.disabled = true;
        outgoingCallHangupButton.classList.remove("hide");
        volumeIndicators.classList.remove("hide");
        bindVolumeIndicators(call);
      }
    
      const updateUIDisconnectedOutgoingCall = () => {
        handleIncomingCall.value = false
        callButton.disabled = false;
        outgoingCallHangupButton.classList.add("hide");
        volumeIndicators.classList.add("hide");
      }
    
      const fnHandleIncomingCall = (call) => {
        handleIncomingCall.value = true
        
        incomingPhoneNumberEl.innerHTML = call.parameters.From;
    
        incomingCallAcceptButton.onclick = () => {
          acceptIncomingCall(call);
        };
    
        incomingCallRejectButton.onclick = () => {
          rejectIncomingCall(call);
        };
    
        incomingCallHangupButton.onclick = () => {
          hangupIncomingCall(call);
        };
    
        // add event listener to call object
        call.on("cancel", handleDisconnectedIncomingCall);
        call.on("disconnect", handleDisconnectedIncomingCall);
        call.on("reject", handleDisconnectedIncomingCall);
      }
    
      // ACCEPT INCOMING CALL
    
      const acceptIncomingCall = (call) => {
        window.call.accept();
      }
    
      const rejectIncomingCall = (call) => {
        window.call.reject();
        resetIncomingCallUI();
      }
    
      const hangupIncomingCall = (call) => {
        window.call.disconnect();
        resetIncomingCallUI();
      }
    
 
      const handleDisconnectedIncomingCall = () => {
        handleIncomingCall.value = false
        resetIncomingCallUI()
      }
    
    
      const setClientNameUI = (clientName) => {
        var div = document.getElementById("client-name");
        div.innerHTML = `Your client name: <strong>${clientName}</strong>`;
      }
    
      const resetIncomingCallUI = () => {
        incomingPhoneNumberEl.innerHTML = "";
        incomingCallAcceptButton.classList.remove("hide");
        incomingCallRejectButton.classList.remove("hide");
        incomingCallHangupButton.classList.add("hide");
        incomingCallDiv.classList.add("hide");
      }
    
      // AUDIO CONTROLS
    
      const getAudioDevices = async () => {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        updateAllAudioDevices.bind(device);
      }
    
      const updateAllAudioDevices = () => {
        if (device) {
          speaker.value = device.audio.speakerDevices.get()
          ringTone.value = device.audio.ringtoneDevices.get()
          
          updateDevices(speakerDevices, device.audio.speakerDevices.get());
          updateDevices(ringtoneDevices, device.audio.ringtoneDevices.get());
        }
      }
    
      const updateOutputDevice = () => {
        const selectedDevices = Array.from(speakerDevices.children)
          .filter((node) => node.selected)
          .map((node) => node.getAttribute("data-id"));
    
        device.audio.speakerDevices.set(selectedDevices);
      }
    
      const updateRingtoneDevice = () => {
        const selectedDevices = Array.from(ringtoneDevices.children)
          .filter((node) => node.selected)
          .map((node) => node.getAttribute("data-id"));
    
        device.audio.ringtoneDevices.set(selectedDevices);
      }
    
      const bindVolumeIndicators = (call) => {
        call.on("volume", function (inputVolume, outputVolume) {
          var inputColor = "red";
          if (inputVolume < 0.5) {
            inputColor = "green";
          } else if (inputVolume < 0.75) {
            inputColor = "yellow";
          }
    
          inputVolumeBar.style.width = Math.floor(inputVolume * 300) + "px";
          inputVolumeBar.style.background = inputColor;
    
          var outputColor = "red";
          if (outputVolume < 0.5) {
            outputColor = "green";
          } else if (outputVolume < 0.75) {
            outputColor = "yellow";
          }
    
          outputVolumeBar.style.width = Math.floor(outputVolume * 300) + "px";
          outputVolumeBar.style.background = outputColor;
        });
      }
    

      const updateDevices = (selectEl, selectedDevices) => {
        selectEl.innerHTML = "";
    
        device.audio.availableOutputDevices.forEach(function (device, id) {
          var isActive = selectedDevices.size === 0 && id === "default";
          selectedDevices.forEach(function (device) {
            if (device.deviceId === id) {
              isActive = true;
            }
          });
    
          var option = document.createElement("option");
          option.label = device.label;
          option.setAttribute("data-id", id);
          if (isActive) {
            option.setAttribute("selected", "selected");
          }
          selectEl.appendChild(option);
        });
      }
    


      //
      callButton.onclick = (e) => {
        e.preventDefault();
        makeOutgoingCall();
      };
      
      getAudioDevicesButton.onclick = getAudioDevices;
      speakerDevices.addEventListener("change", updateOutputDevice);
      ringtoneDevices.addEventListener("change", updateRingtoneDevice);
      startupButton.addEventListener("click", startupClient);

  return {
    handleIncomingCall,
    availableCall,
    ringTone,
    speaker,
    
    acceptIncomingCall,
    hangupIncomingCall,
    makeOutgoingCall,
    startupClient
  }
}
