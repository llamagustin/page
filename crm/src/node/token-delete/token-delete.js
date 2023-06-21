'use stric'

var config = require('../config.json')
const express = require('express')
const routerAccount = express.Router()
const jwt   = require('jsonwebtoken')

const fn = require('./fn.js')





async function token (req, res) {
   
   var data = await fn.token(req.body)
   console.log(data)
   //var token = fn.token(data)
   return res.status(200).send({ status: true, token: token, data:data })
}

async function validate (req, res) {
   
   var data = await fn.validate(req.body)
   console.log(data)
   //var token = fn.token(data)
   return res.status(200).send({ status: true, token: token, data:data })
}


routerAccount.post('/token', token);

routerAccount.post('/validate', validate);


//routerAccount.put('/password', updatePasswordAccount);

module.exports = routerAccount


