'use strict'

const express = require('express')
const routerPush = express.Router()

const { v4: uuid, validate: valid_uuid } = require('uuid');


const Sequelize = require('sequelize')
const { Op } = require("sequelize");

const sequelize = new Sequelize('aythendb', 'aythen', 'Metadrive2022', {
  host: '3.73.230.220',
  dialect: 'postgres'
})

const { Alert } = require('./model/alert')
const { User } = require('./model/user')
const { Account } = require("./model/account")
// const { Log } = require('../model/support')

const webpush = require('web-push');

var vapidKeys = webpush.generateVAPIDKeys();
webpush.setGCMAPIKey('AAAASE-Za20:APA91bGN9yjfDQ8a9VB-DoiwQea6y3uYJgOUWoscDKF1nhopaIxT__8jvHy4AS2L0rYCxg8d859nBJRHyli7h3Xl4TrjopbF8jILZNIzGoOy3VY1mc1YVWOq7S3FVHVtN-rjcH_DyrTv');

webpush.setVapidDetails(
    'mailto:info@aythen.com',
    'BI2GGdf8jYG2Oom-CHoVo8CQdhW1ZF96aU4w-k_WsTJ6RD26TbuSO8a9EyFw7QEd_Hw-nEvO8IB0uItLPq_u2f0',
    'Yt4FPxwzgZueYBTc3jWYEdk-dYNsWNc2J7X8cwI1t4M'
)

const createNotification = (payload) => {
  var data = {
    type: '100',
    href: '',
    title: '',
    text: ''
  }
  
  switch(data.type){
    case '100':
      data.href = ''
      data.title = 'Correo entrante'
      data.description = 'Has recibido un mensaje en tu correo del usuario [user] el día 12 de febrero del 2023 a las 13:23.'
      // data.color = "#7367f02b";
      break;
    case '200':
      data.href = ''
      data.title = 'Mensaje entrante'
      data.description = 'Has recibido un mensaje del usuario [user] el día 12 de febrero del 2023 a las 13:23.'
      // data.color = "#7367f02b";
      break;
    case '300':
      data.href = ''
      data.title = 'Aviso seguimiento'
      data.description = 'No te olvides de hacer un seguimiento de [lead] llevas 5 días sin recibir respuestas.'
      // data.color = "#7367f02b";
      break;
    case '400':
      data.href = ''
      data.title = 'Has recibido NUM leads'
      data.description = 'Se te han añadido en tu cartera [num] leads para impactar de nuevo'
      // data.color = "#7367f02b";
      break;
    case '500':
      data.href = ''
      data.title = 'Firma realizada'
      data.description = '[user] ha rellenado los datos para solicitar la firma cuando sea el proceso recibirás una notificación.'
      // data.color = "#7367f02b";
      break;
    case '600':
      data.href = ''
      data.title = 'Tu informe '
      data.description = 'Has relizado esta semana [num] llamadas. Con un impacto de [€], has conseguido [num] clientes con un [lead] de leads. Tienes en seguimiento [num] leads.'
      // data.color = "#7367f02b";
      break;
  }
  
  return data
}

const handlePush = async (req, res) => {
  let { id, type = 'account' } = req.body;
  if (!valid_uuid(id)) return res.send('404');
  
  if (type == 'account') {
    var { dataValues: user } = await Account.findOne({
      where: { id },
      attributes: ['id', 'devices']
    })
  } else {
    var { dataValues: user } = await User.findOne({
      where: { id },
      attributes: ['id', 'devices']
    })
  }
  
  if(!user) res.send("User not found");
  
  var notification = createNotification()
  
  notification.user_id = id
 
  var devices = user.devices;
  
  for(var i = 0; i < devices.length; i++){
    var pushSubscription = devices[i].suscription;
    
    var payload = JSON.stringify({
      title: notification.title,
      data: notification.description,
      // image: 'https://crm.aythen.com/src/assets/images/icons/project-icons/react.png/',
      // icon: 'https://crm.aythen.com/src/assets/images/icons/project-icons/react.png'
    });
    
    const push = await new Promise((resolve, reject) => {
        webpush.sendNotification(pushSubscription, payload)
        .then(function (data) {
          resolve(data)
        })
        .catch(function (err) {
          resolve(err) 
        });
    });
  }
  
  const data = await new Promise((resolve, reject) => {
    Alert.create(notification).then(result => {
      resolve(result);
    }).catch(err => {
      resolve(err);
    })
  });
  
  return res.status(200).send('200')
}

const subscribe = async (req, res) =>  {
  console.log("Subscribred", req.body)
  // console.log(body)
  return res.status(200).send('Good Job!')
}

const getAlerts = async (req, res) => {
  const {id} = req.params
  
  if(!valid_uuid(id)) return res.send('404')
  
  const { 
    q = '',
    plan = null,
    status = null,
    perPage = 10,
    currentPage = 1,
    addLimit = false,
  } = req.query;
  
  const  queryLower = q.toLowerCase()
  
  
  var search = {}
  var searchStatus = {}
  
  if(status){
    switch (status) {
      case '2':
        var searchStatus =  [{status: { [Op.gte]: 200}}, {status: { [Op.lt]: 300}}]; break;
      case '3':
        var searchStatus =  [{status: { [Op.gte]: 300}}, {status: { [Op.lt]: 400}}]; break;
      case '4':
        var searchStatus =  [{status: { [Op.gte]: 400}}, {status: { [Op.lt]: 500}}]; break;
      default:
        var searchStatus = { status: status }
        break;
    }
  }
  
  
  const options = {
    where: {
      [Op.and]: [{
          [Op.or]: [
            { title: { [Op.iLike]: `%${queryLower}%` } },
            { description: { [Op.iLike]: `%${queryLower}%` } },
          ],
      },
      searchStatus,
      search,
      ]
    },
    order: [ [ 'createdAt', 'DESC' ] ]
  }
  

   var response = await new Promise((resolve, reject) => {
        Alert.findAndCountAll(options)
        .then( result => resolve(result) )
        .catch( err => resolve(err) )
  });
  

  const { count: countAll, rows: filteredANotification } = response;
  
  
  var stats = [
    [0, 0], //total leads
    [0, 0], //total acceptado
    [0, 0], //total pendientes
    [0, 0], //total cancelados
  ];
  
  for (let i = 0; i < filteredANotification.length; i++) {
    switch (filteredANotification[i].status) {
      case 200: //aceptado
        ++stats[1][0];
        break;
      case 300: //pendiente
        ++stats[2][0];
        break;
      case 400: //cancelado
        ++stats[3][0];
        break;
    }
    ++stats[0][0];
  }
  
  
  const totalPage = Math.ceil(filteredANotification.length / perPage) ?
    Math.ceil(filteredANotification.length / perPage) :
    1;
  
  const totalNotification = filteredANotification.length;    
  
  let newFilteredNotification = [];
  if (perPage) {
    const firstIndex = (currentPage - 1) * perPage;
    const lastIndex = perPage * currentPage;

    newFilteredNotification = newFilteredNotification.slice(firstIndex, lastIndex);
  }

  return res.send({ 
    notifications: newFilteredNotification, 
    totalPage, 
    totalNotification,
    stats: stats
  })
}

/*
var getLog = (req, res) => {
   sequelize.authenticate()
   .then( async () => {
       var data = await Log.findAll({
           where: {
               domain_id: req.params.id,
           }, 
           limit: 20,
           order: [ [ 'createdAt', 'DESC' ] ]
       })
        return res.status(200).send(data)
    })
    .catch(err => {
      return res.status(200).send(err)
    })
}


var postLog = (req, res) => {
    sequelize.authenticate()
    .then( async () => {
        if(!req.body.domain_id) return res.status(200).send('300')
        
        var data = await Log.upsert( req.body );

        fnSocket(req.body, 'notification')
        
        return res.status(200).send(data[0])
    })
    .catch(err => {
      return res.status(200).send(err)
    })
}
*/



routerPush.get('/:id', getAlerts)

routerPush.post('/send', handlePush)
routerPush.post('/subscribe', subscribe)
// routerPush.get('/log/:id', getLog);
// routerPush.post('/log', postLog);

module.exports = routerPush