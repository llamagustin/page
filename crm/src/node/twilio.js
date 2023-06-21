//inbound calls
const express =  require('express')


const routerTwilio = express.Router()

const twilioAccountSid = 'ACe7156eb6183f1cf27d22a75735424ca1'
const twilioAuthToken = 'e950db4a07e8860d8fe9f20942e7d134'

//const twilioAccountSid = 'AC2935187770b7f41a60e640d52e140afb'
//const twilioAuthToken = 'c51b45ee79867baf41d710653dea424f'
const twilioApiKey = 'SK513aef71b9b95b7a67aa287bd63f8fd9'
const twilioApiSecret = 'jGokw2HwYZLuO3cdTL3ul0PtgSAl99DW'

const twilioServicesId = 'IS5ded63fd333a47189f0d65656e950147';
// const identity = 'info@aythen.com';


const twilioAppId = 'APc1a44752f9383cd023e89422ede3511a';
//const twilioCallerId = '+15165189796'
const twilioCallerId = '+34900759890'
// const twilioCallerId = '+34900759890'
//APc1a44752f9383cd023e89422ede3511a
const client = require('twilio')(twilioAccountSid, twilioAuthToken)

const AccessToken = require('twilio').jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;
const VoiceGrant = AccessToken.VoiceGrant;


const VoiceResponse = require('twilio').twiml.VoiceResponse;


///
const nameGenerator = require("./name_generator");
// const config = require("../config");

var identity;

// guardar llamadas
// grabar llamadas
// list llamadas
// realizar llamada desde crm voIP
// obtener webhook atender por agente 



const Sequelize = require('sequelize')
const { Op } = require("sequelize");
const { User } = require("./model/user");

var config = require('./config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
})


const { Call } = require('./model/call.js')











const tokenGenerator = (req, res) =>  {
  identity = 'b4aaf870-3fc7-4be0-9cbb-488877e9a757'
  // identity = nameGenerator();
  
  const accessToken = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret,
    {identity: identity}
  );
  

  // accessToken.identity = identity;
  const grant = new VoiceGrant({
    outgoingApplicationSid: twilioAppId,
    incomingAllow: true,
  });
  
 
  
  accessToken.addGrant(grant);

  // Include identity and token in a JSON response
  return res.send({
    identity: identity,
    token: accessToken.toJwt(),
  });
};

const voiceResponse = async (req, res) => {
//   res.set("Content-Type", "text/xml");
console.log('erfemwi', identity)
  
  const toNumberOrClientName = req.body.To;
  const callerId = twilioCallerId;
  let twiml = new VoiceResponse();
  
 //twiml.say('Hola como estás? Quiero decirle que tengo ganas de realizar una llamada apunto');
    console.log('twiml', twiml)
  //console.log('ee', req.body.From, toNumberOrClientName, callerId)
  // If the request to the /voice endpoint is TO your Twilio Number, 
  // then it is an incoming call towards your Twilio.Device.
  if (toNumberOrClientName == callerId) {
    
    let dial = twiml.dial();

    // // This will connect the caller with your Twilio.Device/client 
    dial.client(identity);


    //twiml.say("Thanks for calling!");
  } else if (req.body.To) {
    console.log('called', req.body, callerId, toNumberOrClientName)
    // This is an outgoing call

    // set the callerId
    let dial = twiml.dial({ callerId });
    
    // console.log('dial', callerId,toNumberOrClientName,  dial.dial)

    // Check if the 'To' parameter is a Phone Number or Client Name
    // in order to use the appropriate TwiML noun 
    const attr = isAValidPhoneNumber(toNumberOrClientName)
      ? "number"
      : "client";
    
    //var attr = 'number:+18186479935'
    console.log('nn', attr)
    
    dial[attr]({}, toNumberOrClientName);
  } else {
    twiml.say("Thanks for calling!");
  }
  
  
  // console.log('eeokeeo')
  // const data_call = await new Promise((resolve, reject) => {
  //   var data = {
  //     caller: callerId,
  //     called: toNumberOrClientName,
  //     calls: [{'ok': 200}],
  //     status: -3
  //   }
    
  //   // Call.create(data).then(r => resolve(r)).catch(e => resolve(e))
  // })
  
  // console.log('data:Call', data_call)
  
  
  console.log('twiml.', twiml.toString())

   res.send(twiml.toString())
};


const statusResponse = async (req, res) => {
//   res.set("Content-Type", "text/xml");
  console.log('erfemwi', req.body)
  //35..36
  const call = req.body
  
  
  var result = '404'
  
  if(req.body?.ApiVersion){
    var data = {
      calls: [{
        date: call['Timestamp'],
        direction: call['Direction'],
        call: call['Call'],
        call_duration: call['CallDuration'],
        status: call['CallStatus']
      }],
      user_id: call['Caller'].split(':')[1],
      status: -2
    }
    
    console.log('deee', data)
    
    var result = await new Promise((resolve, reject) => {
        Call.upsert(data).then( result => {
          resolve(result)
        }).catch( err => resolve(err) )
    })
    
    console.log('result', result)
  }
  
  
  return res.status(200).send(result)
  
  // in From: '+34629571058',
  //Called 900 sale solo cuando reecibes llamada
  // Caller: 'client:UniqueTammyNevis', el que llama uuid o si es out el telefono
  // From: 'client:UniqueTammyNevis',
  
  //CalledCountry cuando llamadas

  // CA984bac5500d04e4f0754ce1875c2e411
  // {
  //   ApiVersion: '2010-04-01',
  //   AccountSid: 'ACe7156eb6183f1cf27d22a75735424ca1',
  //   ApplicationSid: 'APc1a44752f9383cd023e89422ede3511a',
  //   CallSid: 'CA19d29bba536fcdf7e086457846f298db'
  //   Caller: 'client:GoldenQuincyPortland',
  //   CallStatus: 'completed',
  //   Called: '', //numero 900 cuando te llamanc
  //   Called: '', //numero del que llama
  //   Duration: '1', //offset time seconds
  //   CallDuration: '4', //seconds
  //   Direction: 'inbound',
  //   Timestamp: 'Fri, 17 Mar 2023 11:28:31 +0000', //utc+0
  //   To: '',
  //   From: '', //numero desde el que llaman
  //   FromCountry: 'ES', //pais delq ue te llama
  //   SequenceNumber: '0',
  //   From: 'client:GoldenQuincyPortland',
  //   CallbackSource: 'call-progress-events',
  // }
  
  
  // Hangup
  

};




function isAValidPhoneNumber(number) {
  return /^[\d\+\-\(\) ]+$/.test(number);
}




// const getConversation = (req, res) => {
//   client.queues('QUxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
//     .members
//     .list()
//     .then(members => members.forEach(member => console.log(member.callSid)));
// }


const smsResponse = async (req, res) => {
  const { token, sender } = req.body
  
    // Enviar un mensaje de texto
  var result = await new Promise((resolve, reject) => {
    client.messages
      .create({
         body: 'Su código para Aythen es ' + token,
         from: '+18186479935',
         to: sender
       })
      .then(message => resolve(message.sid))
      .catch(error => resolve(error));
  })
  
  return res.send(result)
  

}





// const sendWahtsapp = (req, res) => {
//     client.messages
//     .create({
//         body: 'Necesitas que te ayude a solicitar el Kit Digital?',
//         from: 'whatsapp:+14155238886',
//         to: 'whatsapp:+34667283537'
//     })
//     .then(message => {
//       console.log(message.sid)
//       return res.send('messega')
//     })
//     .done();
// }


// const receiveWahtsapp = (req, res) => {
//   const twiml = new MessagingResponse();
//   console.log('hello world')
//   twiml.message('The Robots are coming! Head for the hills!');
  
//   // res.type('text/xml').send(twiml.toString());
//   res.send({
//     data: twiml.toString()
//   })
// }











const welcome = (req, res) => {
  let twiml = new VoiceResponse();
  
  // const twiml = new twilio.twiml.VoiceResponse();
  // const twiml = new twiml.VoiceResponse();

  // twiml.say('wiiiillyy.');
  // twiml.say('Bienvenido a Aythen. Por favor, introduzca el número de su comercio a continución.');
  
  twiml.play('https://api.aythen.com/static/src/node/voice/twilio-welcome.mp3');

  twiml.gather({
    numDigits: 5,
    action: '/twilio/gather',
    method: 'POST',
  });
  
  // twiml.gather({
  //   numDigits: 5,
  //   action: '/twilio/gather',
  //   method: 'POST',
  // }, (gatherNode) => {
  //     gatherNode.play({ loop: 1 }, 'https://api.aythen.com/static/src/node/voice/twilio-welcome.mp3');
  // });

  
  res.type('text/xml');
  res.send(twiml.toString());
}



const waitMusic = (req, res) => {
  // console.log('wait')
  // let twiml = new VoiceResponse();
  // twiml.play('https://api.aythen.com/static/src/node/voice/twilio-wait.mp3');
  console.log('eeieudunde')
  let twiml = new VoiceResponse();
  twiml.dial('+34606310994');
  
  
  res.type('text/xml');
  res.send(twiml.toString());
}


const gather = (req, res) => {
  console.log('gatherrr')
  let twiml = new VoiceResponse();
  // const twiml = new twilio.twiml.VoiceResponse();
  const digit = req.body.Digits;
  // let business = '';

  // if (digit) {
    // business = digit;
    // twiml.say(`El número de su comercio es ${business}.`);
    // crear una arbol de jerarquias a través de las dos primeros números del digito de 5 de la variable business
    // si no existe devolver la llamada a +34667283537. 01 => depertamento tecnico (+34667283531), 02 => depertamento de ventas (+34667283532), 
    // 03 => departamento de contabilidad (+34667283533)
  if (digit) {
    business = digit;
    const departmentCode = business.substring(0, 2);
    console.log('det', departmentCode)
    
    
    /*
    02 => ID => RESELLER (llame a su fijo al que tenga puesto)
    */
  
      if (departmentCode === '10') { //atencion al cliente default
        // twiml.say(`Redirigiendo su llamada al departamento de soporte.`);
        twiml.play('https://api.aythen.com/static/src/node/voice/twilio-tech.mp3');

        twiml.dial("+34629571058");
      } else if (departmentCode === '00') { //carles
        // twiml.say(`Redirigiendo su llamada al departamento de soporte.`);
        twiml.play('https://api.aythen.com/static/src/node/voice/twilio-tech.mp3');
        twiml.dial('+34629571058');
      } else if (departmentCode === '01') { //carlos
        // twiml.say(`Redirigiendo su llamada al departamento técnico.`);
        twiml.play('https://api.aythen.com/static/src/node/voice/twilio-tech.mp3');
        twiml.dial('+34667283537');
      } else if (departmentCode === '11') { //uri
        // twiml.say(`Redirigiendo su llamada al departamento de ventas.`);
        twiml.play('https://api.aythen.com/static/src/node/voice/twilio-sell.mp3');
        twiml.dial('+34646173286');
      } else if (departmentCode === '12') { //willy
        // twiml.say(`Redirigiendo su llamada al departamento de ventas.`);
        twiml.play('https://api.aythen.com/static/src/node/voice/twilio-sell.mp3');
        twiml.dial('+34606310994');
      } else { //default
        // twiml.say(`Lo siento, no pudimos identificar el departamento al que desea llamar.`);
        twiml.play('https://api.aythen.com/static/src/node/voice/twilio-not-found.mp3');
        twiml.dial('+34629571058');
      }
  } else {
    // twiml.say('No ha introducido ningún número. Vuelva a intentarlo.');
    twiml.play('https://api.aythen.com/static/src/node/voice/twilio-not-number.mp3');
    // twiml.redirect('/voice');
    twiml.dial('+34667283537');
  }

  // } else {
  //   twiml.say('No ha introducido ningún número. Vuelva a intentarlo.');
  //   twiml.redirect('/voice');
  // }

  res.type('text/xml');
  res.send(twiml.toString());
}







function getNumbersFromText(text) {
  const regex = /[0-9]+/g;
  return text.match(regex) || [];
}













routerTwilio.post('/voice', welcome);
routerTwilio.post('/gather', gather);
routerTwilio.post('/wait', waitMusic);
// routerTwilio.post("/status", statusResponse);


// routerTwilio.get("/welcome", voiceWelcome);


routerTwilio.get("/token", tokenGenerator);
routerTwilio.post("/sms", smsResponse);
// routerTwilio.post("/voice", voiceResponse);
routerTwilio.post("/status", statusResponse);

// routerTwilio.post("/conversation", getConversation);



//
// routerTwilio.post("/watshapp/send", sendWahtsapp);
// routerTwilio.post("/watshapp/receive", receiveWahtsapp);




module.exports = routerTwilio
