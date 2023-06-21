'use strict'

const express = require('express')
const app = express()
const routerApi = express.Router()

const account = require('./account.js')
const user = require('./user.js')

const form = require('./form.js')
const service = require('./service.js')
const business = require('./business.js')
const project = require('./project.js')

const calendar = require('./calendar.js')
const chat = require('./chat.js')

const faq = require('./faq.js')


const gmail = require('./gmail.js')



routerApi.use('/account', account)
routerApi.use('/user', user)

routerApi.use('/form', form)
routerApi.use('/service', service)
routerApi.use('/business', business)
routerApi.use('/project', project)

routerApi.use('/chat', chat)
routerApi.use('/calendar', calendar)

routerApi.use('/faq', faq)

routerApi.use('/gmail', gmail)




module.exports = routerApi


