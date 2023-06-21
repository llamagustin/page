<script setup lang="ts">
import Papa from 'papaparse';

var content 
var parsed 
var file 


const parseFile = () => {
    var data = []

    Papa.parse( file, {
        header: true,
        skipEmptyLines: true,
        complete: function( results ){
            content = results;
            parsed = true;
            
            
            results.data.map( reseller  => {
                data.push({
                    fullName: reseller['nombre'],
                    email: reseller['email'],
                    telephone: reseller['teléfono'],
                    status: reseller['estado'], //||Valoración pendiente ||Revisado ||Rechazado
                    address: reseller['ubicación del candidato(a)'],
                    work: reseller['puesto actual'],
                    education: reseller['educación'],
                    date: reseller['fecha'],
                    interes: reseller['Nivel de interés'],
                    faqs: [
                        reseller['Cualificación 1'],
                        reseller['Cualificación 2']
                    ]
                })
            })

        }.bind(this)
    });
}

const handleFileUpload = (event) => {
    file = event.target.files[0];
    parseFile();
}




import axios from 'axios'

import { Device } from '@twilio/voice-sdk';



const instance = axios.create({
  baseURL: "https://api.aythen.com",
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
    }
});



//
var device 
const timeToLive = 600000; 
const refreshBuffer = 30000; 



//device.destroy();


const registerDevice = () => {
  console.log('Registering the device.');
  device.register();
}

const unregisterDevice = () => {
  console.log('Unregistering the device.');
  device.unregister();
}


const onCall = async () => {
    console.log('d', device)
    
    let call = await device.connect({ 
      params: {
        //To: '+34667283537'
        To: '+13393561146'
      } 
    }).then(err => console.log('err', err))
}

const hangupCall = () => {
 device.disconnectAll();
 console.log('The call has ended.');
}




//const token = await getTokenViaAjax({ timeToLive });
//const device = new Device(token);

const iniTwilio = async () => {
    var token = await getToken()
    console.log('t', token)
    
    device = new Device(token, { edge: 'ashburn' });
    
    console.log('Registering the device to receive calls.');
   
    

    // or handle an incoming call
    device.on('incoming', call => {
        console.log('wfrrf')
    });
    
    device.on('error', err => {
        console.log('err', err)
    });
    
    device.on('ready', device => {
        console.log('The device is ready')
    })
    
    device.on('registered', device => {
      console.log('The device is ready to receive incoming calls.')
    });
    
    device.on('unregistered', device => {
      console.log('The device is no longer able to receive calls.')
    });

}

const getToken = async () => {
    var res = await instance.post('https://api.aythen.com/twilio/token')
    return res.data
}

setInterval(async () => {
  var token = await token()
  device.updateToken(token)
  
  //device.updateToken(token);
}, timeToLive - refreshBuffer); 

</script>


<template>
    <div>
        <div v-if="true">
            <div>
                File:
                <input type="file" accept=".csv" @change="handleFileUpload( $event )"/>
            </div>
            <table v-if="parsed" style="width: 100%;">
                <thead>
                    <tr>
                        <th v-for="(header, key) in content.meta.fields"
                            v-bind:key="'header-'+key">
                            {{ header }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, rowKey) in content.data"
                        v-bind:key="'row-'+rowKey">
                            <td v-for="(column, columnKey) in content.meta.fields"
                                v-bind:key="'row-'+rowKey+'-column-'+columnKey">
                                    <input v-model="content.data[rowKey][column]"/>
                            </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="false">
            Hello World
            <Button
                @click="onCall">
                Llaamas
            </Button>
            <Button
                class="ml-10"
                @click="hangupCall">
                desconectar
            </Button>
            <Button
                class="ml-10"
                @click="iniTwilio">
                start
            </Button>
            <Button
                class="ml-10"
                @click="registerDevice">
                register
            </Button>
            <Button
                class="ml-10"
                @click="unregisterDevice ">
                unregister
            </Button>
        </div>
    </div>
</template>



<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
</route>
