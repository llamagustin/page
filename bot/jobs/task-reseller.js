const express = require('express')
const routerExcel= express.Router()

const path = require('path');
const fs = require('fs');
const { google } = require('googleapis');

// Ruta al archivo JSON de las credenciales
const credentials = require('./keys/google/credentials_google.json');
const tokens = require('./keys/google/tokens.json');

const { client_secret, client_id, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
oAuth2Client.setCredentials(tokens);
const auth = {
  drive: google.drive({ version: 'v3', auth: oAuth2Client }),
  sheets: google.sheets({ version: 'v4', auth: oAuth2Client }),
};
const { drive, sheets } = auth;
/**/
const axios = require('axios');
const WHATSAPP_API = "https://graph.facebook.com";
const VERSION = "v16.0";
const PHONE_NUMBER_ID = "118548874462493";
// const DESTINATION_WHATSAPP_BUSINESS_ACCOUNT_ID = "111050451852692";
// const WABA = "1093121278029705";

// const _WABA = "EAAPiMCF5L4kBAKGCd4ZBZASmDSLj1PCy4tOzoLwHb0Vuu3cmUsqJa2XwRKZAss8iZAQfwdxLadDMIwySI0ZBE9OZAesZBjklY7ukAZAZA5HGNX4qJG81KAJ4fOS4RnQmCvPnPlaud3WZCfVZB0W79wBSRFX9z2NAcleLdvRZBZBAQ3kVJJOZAltDL5flUh3NFozKvdVMRcjoqpYYi5qvsjo3C6N6IQ";
const _WABA = "EAAPiMCF5L4kBAAPKiKMLIZC3t9GtrXheDdtUkUmvp2ME9O6QrRwqNPBU33xYPgDV7FD7Mj1S5JRZCYEZCzIdGZC9hsRqZAoraPsD3yevdBx50B8rs8iFMm8V9eoJN3nL3rEob67uf6ZCiE0l3H7bvZC9iEN8C7rrYXtj3eh900uVWJih1PI2ZAuqxyytWrWyEw9sqxZCSbXTQVWxZCigZAw9wQr";
               
const configWhatsapp = {
  headers: {
    Authorization: `Bearer ${_WABA}`,
    "Content-Type": "application/json",
  },
};

const composeUri = (SLUG) => {
  return `${WHATSAPP_API}/${VERSION}/${PHONE_NUMBER_ID}/${SLUG}`;
};


async function sendMessage(phoneNumber, message) {
  const normalizePhone = String(phoneNumber).replace(/\+|[\s]/g, "");
  
  try {
    const phone = normalizePhone;
    const data = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      // "to": "51951557314",
      to: phone,
      type: "text",
      text: {
        preview_url: false,
        body: message,
      },
    };
    // console.log({ data })
    const uriWhatsapp = composeUri("messages");
    const response = await axios.post(uriWhatsapp, data, configWhatsapp)
    return response;
  } catch (error) {
    throw error;
  }
}
  
 




/**/
async function statusStartGood() {
return `
📣 Hola [nombre reseller]! 👋

¡Excelente trabajo ayer! 💪😄 Quería informarte sobre tus resultados: realizaste 100 llamadas y lograste contactar a 80 personas, ¡eso es impresionante! 👏 Además, generaste 10 interesados, ¡gran logro! De esos interesados, 2 están muy interesados, ¡qué emoción! 😍💼

Recuerda que es crucial mantener el seguimiento de los siguientes números:

01. 📞 Juan Carlos Valle (666 666 666) - Contactado hace 10 días.
02. 📞 Carles Batllori (666 666 666) - Contactado hace 5 días.

Sigue así, [nombre reseller] 👍💼 ¡Estás haciendo un trabajo increíble y estamos seguros de que lograrás más éxitos en el futuro! 🌟🚀

¡Mucho ánimo y que tengas un maravilloso día! 🌞✨
`
}

async function statusStartRegular(){
return `
📢 ¡Atención, [nombre reseller]! 📢

¡Es momento de encender el motor y llevar tus resultados al siguiente nivel! 💪📈 Hemos notado que has realizado un esfuerzo, pero todavía hay un margen para mejorar y aumentar tus oportunidades de éxito. 💼💥

No te preocupes, estamos aquí para ayudarte. ¡Toma nota de los siguientes clientes que están esperando tu llamada!

01. 📞 Juan Carlos Valle (666 666 666) - Hace 10 días que espera por ti.
02. 📞 Carles Batllori (666 666 666) - Hace 5 días que espera por ti.

Estos clientes están ansiosos por escucharte y por conocer lo que tienes para ofrecerles. Es tu oportunidad de brillar y demostrar tu valía como reseller. 💼✨

Sabemos que tienes el potencial y la determinación para marcar la diferencia. ¡No te rindas y mantén el enfoque en tus metas! 🔥🎯

¡Mucho ánimo y que tus llamadas sean todo un éxito! 📞✨
`
}

async function statusStartBad() {
return `
📢 ¡Atención, [nombre reseller]! 📢

¡Es hora de ponerse en acción y hacer que las comisiones empiecen a fluir! 💸💼 Sabemos que no has realizado las llamadas necesarias, pero hay clientes que te están esperando y ansiosos por trabajar contigo. 😮⏰

Recuerda que cada llamada es una oportunidad para generar nuevas ventas y aumentar tus ingresos. 💪💰 No dejes pasar más tiempo y comienza a contactar a los clientes potenciales de tu lista.

¡No pierdas ni un minuto más! Toma tu teléfono, marca esos números y muestra tu increíble habilidad para cerrar ventas. 📲💼

Sabemos que tienes el potencial para lograr grandes resultados y asegurarte esas tan esperadas comisiones. 💪💼 ¡Confiamos en ti y en tu capacidad para superar cualquier reto!

¡Mucho éxito en tus llamadas! 🚀📞
`
}

async function statusWeekly() {
return `
📊 Informe Semanal de Resultados 📊

¡Hola, [nombre reseller]! 👋 Es momento de revisar tus logros y destacar la profesionalidad con la que has llevado a cabo tu trabajo. 💼✨ Aquí te presentamos un resumen de tus objetivos obtenidos esta semana y las comisiones generadas. ¡Prepárate para impresionarte!

🎯 Objetivos Semanales:

Porcentaje de Éxito: [X%] 💯
Ventas Cerradas: [X] 📈
Llamadas Realizadas: [X] ☎️
Personas Interesadas: [X] 😃
Personas Rechazadas: [X] 😔
Media de Llamadas al Día: [X] ☀️

Es emocionante ver el número de personas interesadas que has generado. ¡Tu capacidad para despertar interés en los clientes es admirable! 😃✨ Aunque también es importante recordar que algunas personas pueden no estar interesadas en este momento. No te desanimes por los rechazos, ¡cada "no" te acerca más a un "sí"! 💪💼

¡Mucho éxito en tu camino hacia el logro y el crecimiento! 🌟📈
`
}

async function statusDaily() {
return `
📊 Informe Diario de Resultados 📊

¡Hola, [nombre reseller]! 👋 Queremos mantenerte al tanto de tus logros diarios y resaltar tu profesionalismo en el trabajo. 💼✨ Aquí tienes un resumen de tus resultados de hoy. ¡Prepárate para sentirte orgulloso/a de tus logros!

📅 Fecha: [Fecha actual]

📊 Resultados de Hoy:

Porcentaje de Éxito: [X%] 💯
Ventas Cerradas: [X] 📈
Llamadas Realizadas: [X] ☎️
Personas Interesadas: [X] 😃
Personas Rechazadas: [X] 😔

Recuerda que cada día es una nueva oportunidad para alcanzar tus metas y superar tus propios récords. Sigue enfocado/a, mantén tu energía y determinación en cada llamada. ¡Estamos seguros de que seguirás obteniendo resultados increíbles! 💥💼

¡Continúa con tu increíble labor y que el resto del día sea un éxito rotundo! 💪✨
`
}


/**/

async function searchQuery(data, title) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].properties.title === title) {
      // return data[i];
      return i;
    }
  }
  return null; 
}


async function searchID(url) {
  const regex = /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/;
  const match = url.match(regex);
  
  if (match && match.length >= 2) {
    return match[1];
  } else {
    return null;
  }
}


async function searchData(fileId, table){
  return await new Promise( async (resolve, reject) => {
    sheets.spreadsheets.get({ spreadsheetId: fileId }, async (err, res) => {
      if (err) {
        console.error('Error al leer el archivo de Excel:', err);
        return;
      }

      const index = await searchQuery(res.data.sheets, table)
      const sheetName = res.data.sheets[index].properties.title;

      // Leer los valores de la hoja de cálculo
      sheets.spreadsheets.values.get({ spreadsheetId: fileId, range: sheetName }, (err, res) => {
        if (err) {
          console.error('Error al leer los valores de la hoja de cálculo:', err);
          return;
        }
    
        const values = res.data.values;
        if (!values || values.length === 0) {
          console.log('No se encontraron datos.');
          return;
        }
    
        // Convertir los valores a JSON
        const headers = values[0];
        const rows = values.slice(1);
        const jsonData = rows.map(row => {
          return row.reduce((obj, value, index) => {
            obj[headers[index]] = value;
            return obj;
          }, {});
        });

        resolve(jsonData)
      });
    })
  })
}


/**/

async function agoDate(date) {
  const givenDate = new Date(date);
  const currentDate = new Date();

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const givenDateInMilliseconds = givenDate.getTime();
  const currentDateInMilliseconds = currentDate.getTime();

  const differenceInMilliseconds = givenDateInMilliseconds - currentDateInMilliseconds;
  const differenceInDays = Math.floor(differenceInMilliseconds / millisecondsPerDay);

  return Math.abs(differenceInDays);
}


function getYesterdayCalls(calls) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (yesterday.getDay() === 5 || yesterday.getDay() === 6) {
    const yesterdayCalls = calls.filter(call => {
      const callDate = new Date(call.date);
      return callDate.toDateString() === yesterday.toDateString();
    });

    return yesterdayCalls;
  } else {
    return [];
  }
}

function getPreviousWeekData(calls) {
  const previousWeek = new Date();
  previousWeek.setDate(previousWeek.getDate() - 7);

  const previousWeekData = calls.filter(call => {
    const callDate = new Date(call.date);
    return callDate >= previousWeek;
  });

  return previousWeekData;
}


/**/
async function getVariablesByDate(date) {
  const currentDate = new Date();
  const prevMonthDate = new Date();
  prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);

  const givenDate = new Date(date);

  let month = null;
  let monthprev = null;
  let today = null;
  let yesterday = null;

  if (givenDate.getFullYear() === currentDate.getFullYear() && givenDate.getMonth() === currentDate.getMonth()) {
    month = true;
  }

  if (givenDate.getFullYear() === prevMonthDate.getFullYear() && givenDate.getMonth() === prevMonthDate.getMonth()) {
    monthprev = true;
  }

  if (givenDate.toDateString() === currentDate.toDateString()) {
    today = true;
  }

  const yesterdayDate = new Date(currentDate);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  if (givenDate.toDateString() === yesterdayDate.toDateString()) {
    yesterday = true;
  }

  return { month, monthprev, today, yesterday };
}



/**/
(async function(){
  const dataResellers = await searchData('1J2k4WgwxGid7VRmyF3Z-utCefAVTSjUqFOtik_4I-pU', 'Resellers');
  
  //data
  var sheetsExcel = []
  var n = 0
  
  for(var i = 0; i<dataResellers.length; i++){
    if(dataResellers[i].url && dataResellers[i].url !== ''){
      var id = await searchID(dataResellers[i].url)
      sheetsExcel.push({
        id: id,
        name: dataResellers[i].reseller,
        email: dataResellers[i].email,
        phone: dataResellers[i].phone,
        zip: dataResellers[i].zip
      }); 
      
      ++n;
    }
  }
  
  //obtain data resellers
  var statusResellers = []
  
  for(var i = 0; i<sheetsExcel.length; i++){
    var dataReseller = await searchData(sheetsExcel[i].id, 'data');
  
    var totalMonth = 0 // -1 5
    var totalMonthPrev = 0 // -1 5
    var totalToday = 0 // -1 5
    var totalYesterday = 0 // -1 5
    
    var dataFollow = []
    var totalInterest = 0 // 2-4
    var totalFollow = 0 // 2-4 + 3 day
    
    for(var j = 0; j<dataReseller.length; j++){
      if(dataReseller[j].interest && /^-?\d+$/.test(dataReseller[j].interest)){
        //
        if(parseInt(dataReseller[j].interest) >= 0 ){
          //
          var labelDay = await getVariablesByDate(dataReseller[j].day)
    
          if(labelDay.month) ++totalMonth
          if(labelDay.monthprev) ++totalMonthPrev
          if(labelDay.today) ++totalToday
          if(labelDay.yesterday) ++totalYesterday
  
          if(parseInt(dataReseller[j].interest) >= 2 && parseInt(dataReseller[j].interest) <= 4){
            ++totalInterest
            
            var day = await agoDate(dataReseller[j].day)
  
            if(day >=3 ){
              ++totalFollow
              
              dataFollow.push({
                name: dataReseller[j].name,
                phone: dataReseller[j].phone,
                email: dataReseller[j].email,
                business: dataReseller[j].business,
                category: dataReseller[j].category,
                interest: dataReseller[j].interest,
                note: dataReseller[j].note,
                date: dataReseller[j].day,
                day: day
              })
            }
          }
        }
        
        
      }
    }
    
    // console.log('follow', dataFollow)
    statusResellers[i] = {
      reseller: sheetsExcel[i],
      month: totalMonth,
      monthPrev: totalMonthPrev,
      // today: totalToday,
      yesterday: totalYesterday,
      interest: totalInterest, 
      follow: totalFollow, 
      data: dataFollow
    }
  }
  
  // create message
  var txt = ''
  
  for( var i = 0; i<statusResellers.length; i++){
    txt += '===========================================================\n'
    txt +=  statusResellers[i].reseller.phone + ' - ' + statusResellers[i].reseller.name + ' (' + statusResellers[i].reseller.zip + ') \n'
    txt += 'Hay ' + statusResellers[i].interest + ' interesados y ' + statusResellers[i].follow + ' seguimientos pendientes. \n\n'
    
    txt += '📊 ' + statusResellers[i].month + ' llamadas realizadas este mes\n'
    txt += '📊 ' + statusResellers[i].monthPrev + ' llamadas realizadas el mes pasado\n'
    txt += '📊 ' + statusResellers[i].yesterday + ' llamadas realizadas ayer\n'
    
    
    var txtF = ''
    
    for( var j = 0; j<statusResellers[i].data.length; j++){
      txtF += '☎️ ' + statusResellers[i].data[j].phone + ' ' + statusResellers[i].data[j].business + ' (' + statusResellers[i].data[j].day  + ' días)\n' 
    }
    
    txt += '\n' + txtF + '\n'
  }
  
  
  
  sendMessage('+34667283537', txt)
  
})()



