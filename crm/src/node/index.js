'use strict'

const express = require('express')
const app = express()
const routerApi = express.Router()
const account = require('./account.js')
const dashboard = require('./dashboard.js')
// const token = require('./token/token.js')
const ad = require('./ad.js')
const user = require('./user.js')
const form = require('./form.js')
const push = require('./push.js')
const task = require('./task.js')

// const webhook = require('./webhook.js')
const numeration = require('./numeration.js')
// const staticContent = require('./staticContent.js')
const template = require('./template.js')
const business = require('./business.js')
const freelancer = require('./freelancer.js')
const tool = require('./tool.js')
const api = require('./api.js')
const address = require('./address.js')
const gpt_data = require('./gpt-data.js')
const gpt_data_verify = require('./gpt-data-verify.js')
const alertRouter = require('./alert.js')
const teamFreelancersRouter = require('./team-freelancers.js')

app.use(express.json())

routerApi.use('/tool', tool)
routerApi.use('/api', api)

routerApi.use('/ad', ad)
routerApi.use('/account', account)
// routerApi.use('/token', token)
routerApi.use('/user', user)
routerApi.use('/form', form)
routerApi.use('/devices', push)
routerApi.use('/numerations', numeration)
// routerApi.use('/static', staticContent)
routerApi.use('/address', address)
routerApi.use('/dashboard', dashboard)
// routerApi.use('/webhook', webhook)
routerApi.use('/templates', template)


routerApi.use('/business',business)
routerApi.use('/freelancer',freelancer)
routerApi.use('/gpt-data', gpt_data)
routerApi.use('/gpt-data-verify', gpt_data_verify)

routerApi.use('/tasks', task)
routerApi.use('/alerts', alertRouter)
routerApi.use('/team-freelancers', teamFreelancersRouter)

//apps
const email = require('./email.js')
const calendar = require('./calendar-save.js')
const chat = require('./chat.js')
const call = require('./call.js')

routerApi.use('/email', email)
routerApi.use('/chat', chat)
routerApi.use('/calendar', calendar)
routerApi.use('/call', call)


//other
// const red = require('./red.js')
// routerApi.use('/red', red)

const scrap = require('./scrap.js')
routerApi.use('/scrap', scrap)


const bbva = require('./bbva.js')
routerApi.use('/bbva', bbva)

const signaturit = require('./signaturit.js')
routerApi.use('/signaturit', signaturit)

const unataca = require('./unataca.js')
routerApi.use('/unataca', unataca)

const docs = require('./docs.js')
routerApi.use('/docs', docs)

const twilio = require('./twilio.js')
routerApi.use('/twilio', twilio)

const map = require('./mapbox.js')
routerApi.use('/map', map)

const kmeans = require('./kmeans.js')
routerApi.use('/kmeans', kmeans)

module.exports = routerApi


