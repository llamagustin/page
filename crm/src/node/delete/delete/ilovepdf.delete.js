const express = require('express')
const routerForm = express.Router()

const Sequelize = require('sequelize')
const { Op } = require("sequelize")



var config = require('./config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
})



// Authenticate.
const ilovepdf = new ILovePDFApi('project_public_id', 'project_secret_key');
    



var addSignature = async (req, res) => {
//https://{server}/v1/signature
}


var listSignature = async (req, res) => {
//https://api.ilovepdf.com/v1/signature/list?page=0&per-page=100
}


var statusSignature = async (req, res) => {
//https://api.ilovepdf.com/v1/signature/requesterview/<token_requester>
}


var originalSignature = async (req, res) => {
//https://api.ilovepdf.com/v1/signature/<token_requester>/download-signed

}


var downloadSignature = async (req, res) => {
//https://api.ilovepdf.com/v1/signature/<token_requester>/download-signed
}


var increaseExpirationSignature = async (req, res) => {
//https://api.ilovepdf.com/v1/signature/increase-expiration-days/<token_requester>
}







routerPDF.post('/signature/add', addSignature);
routerPDF.post('/signature/list', listSignature);
routerPDF.post('/signature/status', statusSignature);
routerPDF.post('/signature/download', downloadSignature);
routerPDF.post('/signature/download/original', originalSignature);
routerPDF.post('/signature/increase', increaseExpirationSignature);

routerPDF.post('/delete', deletePDF);

module.exports = routerPDF