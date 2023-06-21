const express = require('express')
const routerSignaturit = express.Router()
const axios = require('axios')
const { uuid } = require('uuidv4')
const SignaturitClient = require('signaturit-sdk')

const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const fetch = require('node-fetch');

//sequelize 
const Sequelize = require('sequelize')
const { Op } = require("sequelize");

var config = require('./config.json')
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
})



// const ACCESS_TOKEN = "KgNMyFirzeLgCPmtRUvCrzfVNPaTlFrsKCGtQhvSWFdAHFLTJChSVtmgpUVjCmFJbWbwlABHDUKgUwmRuKaYDU";
const ACCESS_TOKEN = "ybkExfCFHbtVsvNvMNjnBxLdxnzNezmOnnEgsCeiLIbJCppSmDOniEQIouWJVTeGKryUVIHTtuMXeXjGIQUIuW";
const API_BASE = "https://api.signaturit.com"
const VERSION = "v3"
const API_URI = `${API_BASE}/${VERSION}`

const clientS = new SignaturitClient(ACCESS_TOKEN, true)

/*
sandbox: https://api.sandbox.signaturit.com/v3.
production: https://api.signaturit.com/v3.

access_token = 

npm install signaturit-sdk@1.0.0

ready: The document is loaded and ready to sign.
signed: The document is correctly signed.
declined: The signer decided not to sign the document.
completed: All documents in a signing process have been signed correctly.
close: The signer has clicked the Close button after signing the document.
*/

/*
https://docs.signaturit.com/api/latest
client = new SignaturitClient('YOUR_ACCESS_TOKEN');
KgNMyFirzeLgCPmtRUvCrzfVNPaTlFrsKCGtQhvSWFdAHFLTJChSVtmgpUVjCmFJbWbwlABHDUKgUwmRuKaYDU

count signature requests
/v3/signatures/count.json
client.countSignatures();

get all signature requests
/v3/signatures.json
client.getSignatures();
client.getSignatures(null, null, { crm_id: 2445 });

Get a given signature request.
/v3/signatures/{id}.json
client.getSignature('6f6c974e-2910-11e4-b3d4-0aa7697eb409');

Create a new signature request.
client.createSignature(['/path/to/the/pdf/document.pdf'], { name: 'John', email: 'john.doe@gmail.com' } );

body sms 120 characters
branding_id
callback_url
data
delivery_type sms | url | email
expire_time +7 days
files
recipients email|name|phone
require_file_attachment
cc emails
signing_mode sequential | parallel
subject


Send a reminder. A reminder email will be sent to the signer.
/v3/signatures/{signId}/reminder.json
client.sendSignatureReminder('6f6c974e-2910-11e4-b3d4-0aa7697eb409');

Cancel a signature request. The signer will not be able to sign the document.
/v3/signatures/{signId}/cancel.json
client.cancelSignature('6f6c974e-2910-11e4-b3d4-0aa7697eb409');

Download the signed PDF file.
/v3/signatures/{id}/documents/{id}/download/signed
client.downloadSignedDocument('6f6c974e-2910-11e4-b3d4-0aa7697eb409', '29109781-f42d-11e4-b3d4-0aa7697eb409');

Download the binary content of the audit trail PDF.
/v3/signatures/{id}/documents/{id}/download/audit_trail

Download a zip with all files separated in folders.
/v3/signatures/{id}/documents/{id}/download/attachments
*/




const downloadSignaturit = async (req,res) => {
  
  return res.send({ok:true});
}
const downloadSignaturitAudit = async (req,res) => {
  return res.send({ok:true});
}
const downloadSignaturitZIP = async (req,res) => {
  return res.send({ok:true});
}
const allSignaturit = async (req,res) => {
  clientS.getSignatures().then(function (result) {
    return res.status(200).json(result);
  }, function (error) {
    return res.sendStatus(404)
  });
}
const getSignaturit = async (req,res) => {
  const { id } = req.params;
  const SIGNATURE_ID = id;
  clientS.getSignature(SIGNATURE_ID)
    .then(function (result) {
      return res.status(200).json(result);
    }, function (error) {
      return res.sendStatus(404);
    })
  return res.sendStatus(200)
}
const countSignaturit = async (req,res) => {
  return res.send({ok:true});
}


const createSignaturit = async (req, res) => {
  
  const {
    id,
    fullName,
    
    otNif,
    otEmail,
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


  var data = {
    modeloUnificadoRazonSocial: fullName,
    modeloUnificadoNIF: otNif,
    
    modeloUnificadoNIFOtorgante1: otNif,
    modeloUnificadoEmailOtorgante1: otEmail,
    modeloUnificadoTelefonoOtorgante1: otPhone,
    modeloUnificadoNombreOtorgante1: otName,
    modeloUnificadoPrimerApellidoOtorgante1: otFirstSurname,
    modeloUnificadoSegundoApellidoOtorgante1: otSecondSurname,
    
    modeloUnificadoRazonSocialAutorizado_1Otorgantes: 'Distribuciones Exclusivas Coll SL',
    modeloUnificadoNIFAutorizado_1Otorgantes: 'B61077863'
  }
  
  var nifRegex = /^[a-zA-Z]\d{8}$/;
  if(nifRegex.test(data.nif)) {
    data.modeloUnificadoNombreNotario_1Otorgantes = ot.notaryName
    data.modeloUnificadoPrimerApellidoNotario_1Otorgantes = ot.notaryFirstSurname
    data.modeloUnificadoSegundoApellidoNotario_1Otorgantes = ot.notarySecondSurname
    data.modeloUnificadoNumeroProtocoloNotario_1Otorgantes = ot.notaryNumber
    data.modeloUnificadoFechaProtocoloNotario_1Otorgantes = ot.notaryDate
  }

  
  const currPdf = await fs.readFileSync('/var/www/crm/pdf/modelo-aythen-backup.pdf')//.then(res => res.arrayBuffer());
  // const currPdf = await axios('/var/www/crm/src/node/pdf/document-buckup1.pdf').then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(currPdf);
  

 
  
  const form = pdfDoc.getForm();



  Object.keys(data).map( (key, value) => {
     const textField = form.getTextField(key);
     const textFieldValue = textField.setText(data[key]);
  })

    var time = id

    const pdfBytesModificado = await pdfDoc.save();
    fs.writeFileSync('/var/www/crm/pdf/modelo-aythen/aythen-'+ time +'.pdf', pdfBytesModificado);

    // resolve(response.url)
    return res.send('200')
    // console.log('dieidiweqjid', otName + ' ' + otFirstSurname + ' ' + otSecondSurname)
  // return res.send('ewidjwiejwi')
    var data = await new Promise( (resolve, reject) => {
        clientS.createSignature(['/var/www/crm/pdf/modelo-aythen/aythen-'+ time +'.pdf'], { 
          name: otName + ' ' + otFirstSurname + ' ' + otSecondSurname,
          email: otEmail
        }, {
          branding_id: 'c62ddb85-909c-4fa1-9b02-0ba2d48d2183',
          // branding_id: '4970a16d-fd99-429b-b654-70b687537b08',
          delivery_type: 'url'
        }).then((response) => {
          if(response.status_code == 400){
            // return res.status(200).send({err: response.message})
            resolve({err:response.message})
          }
          
      
          resolve(response.url)
        })
        .catch(err => {
          resolve('400')
        })
    })
    
    console.log('d', data)
    
    return res.send(data)
  
}

const sendSignaturit = async (req,res) => {
  return res.send({ok:true});
}

const cancelSignaturit = async (req,res) => {
  return res.send({ok:true});
}




routerSignaturit.get('/:id/signed', downloadSignaturit);
routerSignaturit.get('/:id/audit', downloadSignaturitAudit);
routerSignaturit.get('/:id/zip', downloadSignaturitZIP);

routerSignaturit.get('/all', allSignaturit);
routerSignaturit.get('/:id', getSignaturit);


routerSignaturit.post('/count', countSignaturit);
routerSignaturit.post('/create', createSignaturit);
routerSignaturit.post('/send', sendSignaturit);
routerSignaturit.post('/cancel', cancelSignaturit);



module.exports = routerSignaturit


