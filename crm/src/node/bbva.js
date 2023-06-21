const request = require('request')

const express = require('express')
const routerBBVA = express.Router()

const { uuid } = require('uuidv4');

//sequelize 
const Sequelize = require('sequelize')
const { Op } = require("sequelize");

var config = require('./config.json')
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
})


/*
https://sis-t.redsys.es:25443/sis/rest/trataPeticionREST
https://sis.redsys.es/sis/rest/trataPeticionREST

//create
{
  "DS_MERCHANT_AMOUNT": "0",
  "DS_MERCHANT_CURRENCY": "978",
  "DS_MERCHANT_CVV2": "123",
  "DS_MERCHANT_EXPIRYDATE": "3912",
  "DS_MERCHANT_IDENTIFIER": "REQUIRED",
  "DS_MERCHANT_MERCHANTCODE": "999008881",
  "DS_MERCHANT_ORDER": "0281WjRq",
  "DS_MERCHANT_PAN": "4548810******03",
  "DS_MERCHANT_TERMINAL": "1",
  "DS_MERCHANT_TRANSACTIONTYPE": "0"
}

//delete
	
{
  "Ds_MerchantCode": "999008881",
  "Ds_Merchant_Identifier": "a091f0f9f0aaf0506930dda4a6974f1df4a0d9c1",
  "Ds_Merchant_Order": "0281WjRq",
  "Ds_Merchant_Terminal": "1",
  "Ds_Merchant_TransactionType": "44"
}
						



*/

/*
npm install redys 


Para crear un pago por referencia
createPaymentByReference

La referencia del pago.
El importe del pago.
La moneda del pago.
Los datos del cliente (nombre, dirección, etc.)



Para verificar una tarjeta de tu cliente
verifyCard

El número de la tarjeta.
La fecha de caducidad de la tarjeta.
El código de verificación de la tarjeta (CVV).

*/





//

const paymentBBVA = async (req,res) => {
   var url = "https://sis-t.redsys.es:25443/sis/rest/trataPeticionREST"
   
   
   var data = {
    "DS_MERCHANT_PAN": "4548816134581156",
    "DS_MERCHANT_EXPIRYDATE": "1234",
    "DS_MERCHANT_CVV2": "123",
    "DS_MERCHANT_AMOUNT": "0",
    "DS_MERCHANT_CURRENCY": "978",
    "DS_MERCHANT_IDENTIFIER": "REQUIRED",
    "DS_MERCHANT_MERCHANTCODE": "358375301",
    //"DS_MERCHANT_ORDER": "0281WjRq",
    "DS_MERCHANT_TERMINAL": "1",
    "DS_MERCHANT_TRANSACTIONTYPE": "0"
  }
   /*
   request({ url: url, json: true }, function (error, response) {
        if (error) {
            return res.send({err: error})
        } else {
            return res.send(response)
        }
    })
    */
    
    console.log('pres', data)
    
    
  request({ url: url, json: true }, function (error, response) {
    if (error) {
        return res.send({err: error})
    } else {
        return res.send(response)
    }
  }) 

}

const verifyBBVA = async (req,res) => {
  return res.send({ok:true});
}




routerBBVA.post('/payment', paymentBBVA);
routerBBVA.post('/verify', verifyBBVA);


module.exports = routerBBVA


