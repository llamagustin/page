const express = require('express')
const routerUnataca = express.Router()
// const axios = require('axios')
// import fetch from "node-fetch";
const fetch = require('node-fetch')
const FormData =  require("form-data")

// const { uuidv4 } = require('uuidv4')
// const SignaturitClient = require('signaturit-sdk')

const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

// const https = require('https')
const path = require("path");
// const fetch = require('node-fetch');


const request = require('request');
// const api_key = 'TU_API_KEY';
// const api_secret = 'TU_API_SECRET';

//sequelize 
// const Sequelize = require('sequelize')
// const { Op } = require("sequelize");

// var config = require('./config.json')
// const sequelize = new Sequelize(config.database, config.username, config.password, {
//   host: config.host,
//   dialect: config.dialect
// })


const privateKEY = fs.readFileSync(
  path.resolve(__dirname, "./keys/privateKey.pem"),
  "utf8"
);
const publicKEY = fs.readFileSync(
  path.resolve(__dirname, "./keys/publicKey.pem"),
  "utf8"
);


const options = {
    cert: publicKEY,
    key: privateKEY
}
    
// const sslConfiguredAgent = new https.Agent(options);



// const ACCESS_TOKEN = "KgNMyFirzeLgCPmtRUvCrzfVNPaTlFrsKCGtQhvSWFdAHFLTJChSVtmgpUVjCmFJbWbwlABHDUKgUwmRuKaYDU";
// const ACCESS_TOKEN = "ybkExfCFHbtVsvNvMNjnBxLdxnzNezmOnnEgsCeiLIbJCppSmDOniEQIouWJVTeGKryUVIHTtuMXeXjGIQUIuW";
// const API_BASE = "https://api.signaturit.com"
// const VERSION = "v3"
// const API_URI = `${API_BASE}/${VERSION}`

// const clientS = new SignaturitClient(ACCESS_TOKEN, true)



const createRequest = async (req, res) => {

  const {
    id,
    fullName,
    
    otGrantor,
    
    otNif,
    otEmail,
    otDialPhone,
    otPhone,
    otName,
    otFirstSurname,
    otSecondSurname,
    
    notaryName,
    notaryFirstSurname,
    notarySecondSurname,
    notaryNumber,
    notaryDate
  } = req.body
  


  var data_text = {
    modeloUnificadoRazonSocial: fullName,
    modeloUnificadoNIF: otNif,
    
    modeloUnificadoNIFOtorgante1: otNif,
    modeloUnificadoEmailOtorgante1: otEmail,
    modeloUnificadoTelefonoOtorgante1: otPhone,
    modeloUnificadoNombreOtorgante1: otName,
    modeloUnificadoPrimerApellidoOtorgante1: otFirstSurname,
    modeloUnificadoSegundoApellidoOtorgante1: otSecondSurname,
    
    modeloUnificadoRazonSocialAutorizado_1Otorgantes: 'DISTRIBUCIONES EXCLUSIVAS COLL SL',
    modeloUnificadoNIFAutorizado_1Otorgantes: 'B61077863'
  }
  
  
  var data_drop = {
    modeloUnificadoEnCalidadDe: otGrantor
  }
  
  // var nifRegex = /^[a-zA-Z]\d{8}$/;
  // if(nifRegex.test(data.otNif)) {
  //   // data.modeloUnificadoNombreNotario_1Otorgantes = ot.notaryName
  //   // data.modeloUnificadoPrimerApellidoNotario_1Otorgantes = ot.notaryFirstSurname
  //   // data.modeloUnificadoSegundoApellidoNotario_1Otorgantes = ot.notarySecondSurname
  //   // data.modeloUnificadoNumeroProtocoloNotario_1Otorgantes = ot.notaryNumber
  //   // data.modeloUnificadoFechaProtocoloNotario_1Otorgantes = ot.notaryDate
  // }

  const currPdf = await fs.readFileSync('/var/www/crm/pdf/modelo-aythen-backup.pdf')//.then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(currPdf);

  const form = pdfDoc.getForm();
  
  
  
  let textFields = form.getFields();


  // textFields.forEach(field => {
  //   const type = field.constructor.name
  //   const name = field.getName()
  // })


  
  
  Object.keys(data_drop).map( (key, value) => {
     const textField = form.getDropdown(key);
     const textFieldValue = textField.select(data_drop[key]);
  })
    

  Object.keys(data_text).map( (key, value) => {
     const textField = form.getTextField(key);
     const textFieldValue = textField.setText(data_text[key]);
  })

 

  const pdfBytesModificado = await pdfDoc.save();
  fs.writeFileSync('/var/www/crm/pdf/modelo-aythen/aythen-'+ id +'.pdf', pdfBytesModificado);

  //create request
  var request_data = await new Promise( async(resolve, reject) => {
        var options = {
          'method': 'POST',
          'url': 'https://one-shot.uanataca.com/api/v1/sign',
          'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          formData: {
            'file': {
              'value': fs.createReadStream('/var/www/crm/pdf/modelo-aythen/aythen-'+ id +'.pdf'),
              'options': {
                'filename': 'aythen-'+ id,
                'contentType': null
              }
            },
            // 'data': '[\n{"name": "First Signer", \n"mobile": "+34888888888",\n"documents": [{"tag": "ID Front", "format": "image"}, {"tag": "ID Rear", "format": "image"}],\n"position": "65, 100, 30, 250",\n"horizontal_position": true,\n"page":0\n},\n{"name": "Second Signer", \n"mobile": "+34999999999",\n"documents": [{"tag": "POA", "format": "PDF"}],\n"position": "65, 100, 30, 250",\n"horizontal_position": true,\n"page":0\n}\n]',
            'data': JSON.stringify([{
                "name": otName + ' ' + otFirstSurname + ' ' + otSecondSurname, 
                "mobile": otDialPhone,
                // "documents": [{"tag": "ID Front", "format": "image"}, {"tag": "ID Rear", "format": "image"}],
                "position": "65, 100, 30, 250",
                "horizontal_position": true,
                "page":0
            }]),
            'callback': 'https://api-prod.aythen.com/unataca/confirm/' + '2344',
            // 'callback': 'http://fse:7777/callback',
            'graphometric': 'True',
            'billing_username': 'aythen@uanataca.com',
            'billing_password': 't879BOzT',
            'partner': 'Sample Corp.',
            'returnmethod': 'API',
            // 'enablehardware': 'True',
            'enableotp': 'True',
            'signaturetext': 'Signature Test',
            // 'sendersms': 'MySender'
          }
        };
        request(options, function (error, response) {
          if (error) resolve(error);
          resolve(response.body);
        });
        
  })


    return res.send(request_data)
//   var upload_document = await new Promise( async(resolve, reject) => {
//     var formData = new FormData();
    
//     formData.append('type', 'document_front');
//     formData.append('document', fs.createReadStream('sample_folder/img_front.png'));
    
//     var url = 'https://api.uanataca.com/api/v1/requests/25139/pl_upload_document/';
    
//     var options = {
//       method: 'POST',
//       body: formData,
//       redirect: 'follow'
//     };
    
//     options.body = formData;
    
//     fetch(url, options)
//       .then(res => res.json())
//       .then(json => resolve(json))
//       .catch(err => resolve(err));

//   })

}





// // list requests
// const getRequests = async (req, res) => {
//     const resp = await fetch(
//       'https://api.uanataca.com/api/v1/requests/',
//       {method: 'GET'}
//     );
    
//     const data = await resp.text();
//     console.log(data);
// }

// get request

const getPDFs = async (req, res) => {
    const id = req.params.id;
    const resp_pdf = await fetch(
      `https://one-shot.uanataca.com/api/v1/retrieve/${id}`,
      {method: 'GET'}
    );
    
    const resp_evi = await fetch(
      `https://one-shot.uanataca.com/api/v1/retrieve/${id}/evidences`,
      {method: 'GET'}
    );
    
    const url_pdf = await resp_pdf.url;
    const url_evi = await resp_evi.url;
    
    var data = {
      sign: url_pdf,
      evidences: url_evi
    }
  
    // console.log('data', data)
    return res.send(data)
}



const getPDF = async (req, res) => {
    const id = req.params.id;
    const resp = await fetch(
      `https://one-shot.uanataca.com/api/v1/retrieve/${id}`,
      {method: 'GET'}
    );
    
    const data = await resp.url;
    console.log('re', data)
    // console.log('data', data)
    return res.send(data)
}


const getEvidencePDF = async (req, res) => {
    const id = req.params.id;
    const resp = await fetch(
      `https://one-shot.uanataca.com/api/v1/retrieve/${id}/evidences`,
      {method: 'GET'}
    );
    
    const data = await resp.url
    console.log('re evi', data)
    // console.log('re evi', data)
    return res.send(data)
}





// get request
const getStatus = async (req, res) => {
    const id = req.params.id;
    console.log('id', id)
    const resp = await fetch(
      `https://one-shot.uanataca.com/api/v1/status/${id}`,
      {method: 'GET'}
    );
    
    
    const data = await resp.url;
    return res.send(data)
}


// delete request
const deleteRequest = async (req, res) => {
    const id = req.params.id;
    const resp = await fetch(
      `https://one-shot.uanataca.com/api/v1/status/${id}`,
      {method: 'DELETE'}
    );
    
    // console.log(data);
    const data = await resp.json();
    return res.send(data)
}

// // get Auth
// const getAuth = async (req, res) => {
//     const resp = await fetch(
//       'https://api.uanataca.com/api/v1/requests/25139/preauthlink/',
//       {method: 'POST'}
//     );
    
//     const data = await resp.text();
//     console.log(data);
// }









// routerUnataca.get('/all', getRequests);
// routerUnataca.get('/', getRequest);

routerUnataca.get('/pdfs/:id', getPDFs);

routerUnataca.get('/pdf/:id', getPDF);
routerUnataca.get('/evidences/:id', getEvidencePDF);
routerUnataca.get('/status/:id', getStatus);

routerUnataca.post('/delete/:id', deleteRequest);

routerUnataca.post('/create', createRequest);

module.exports = routerUnataca




