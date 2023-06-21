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


//
oAuth2Client.setCredentials(tokens);

// Crear el cliente de autenticación
const auth = {
  drive: google.drive({ version: 'v3', auth: oAuth2Client }),
  sheets: google.sheets({ version: 'v4', auth: oAuth2Client }),
};

// Utilizar los servicios de Google Drive y Google Sheets
const { drive, sheets } = auth;





//
const fnAuth = (req, res) => {
  // const GOOGLE_SCOPES = [
  //     'https://www.googleapis.com/auth/gmail.send',
  //     'https://www.googleapis.com/auth/gmail.readonly'
  // ];
  
  const GOOGLE_SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets.readonly',
    'https://www.googleapis.com/auth/drive'
  ];
  
  
  const url = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: GOOGLE_SCOPES,
  });
  
  return res.send(url)
  /**/
  

  // Replace with the code you received from Google
  const code = '4/0AbUR2VNV44Hn5J8oonP7hypfiyT7iFxzdQEds1ivWTR9YdIVcNy5eURs94PR0WJHmentzA';
  
  oAuth2Client.getToken(code).then(({ tokens }) => {
    const tokenPath = path.join(__dirname, './keys/google/tokens.json');
    fs.writeFileSync(tokenPath, JSON.stringify(tokens));
    console.log('Access token and refresh token stored to tokens.json');
  });

}





const excel_fn = async (req, res) => {
  // ID del archivo de Excel en Google Drive
  const fileId = '1_fU5NCoxlMeXkNJoQlhYBrh-uYE281Lz0vK5fB8rM1k';
  
  
  // Crear el cliente de Google Sheets
  // const sheets = google.sheets({ version: 'v4', auth });
  
  var data = await new Promise( (resolve, reject) => {
    
    // Leer el archivo de Excel
    sheets.spreadsheets.get({ spreadsheetId: fileId }, (err, res) => {
      if (err) {
        console.error('Error al leer el archivo de Excel:', err);
        return;
      }
    
      // Obtener el nombre de la hoja de cálculo
      const sheetName = res.data.sheets[0].properties.title;
    
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
    
        // Imprimir el JSON resultante
        console.log(JSON.stringify(jsonData, null, 2));
        
        resolve(jsonData)
      });
    });
  })
  
  return res.send(data)
}


// routerExcel.get('/token', fnAuth);
routerExcel.get('/test', excel_fn);

module.exports = routerExcel