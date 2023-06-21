'use strict'

const express = require('express')
const routerPush = express.Router()

const Sequelize = require('sequelize')
const { Op } = require("sequelize");

const sequelize = new Sequelize('aythendb', 'aythen', 'Metadrive2022', {
  host: '3.73.230.220',
  dialect: 'postgres'
})

const { User } = require('../model/user')
const { Account } = require("../model/account")
// const { Log } = require('../model/support')

const webpush = require('web-push');

var vapidKeys = webpush.generateVAPIDKeys();
webpush.setGCMAPIKey('AAAASE-Za20:APA91bGN9yjfDQ8a9VB-DoiwQea6y3uYJgOUWoscDKF1nhopaIxT__8jvHy4AS2L0rYCxg8d859nBJRHyli7h3Xl4TrjopbF8jILZNIzGoOy3VY1mc1YVWOq7S3FVHVtN-rjcH_DyrTv');
webpush.setVapidDetails(
  'mailto:info@aythen.com',
  //vapidKeys.publicKey,
  'BH0kDJUbCNvwyWsw-N64wJa3Zgrrj8xb4DMM6S-0AJsD9yphotANLN1-Pihl-HPZN77b11b12mrEK2JeJHR3HhA',
  'Hh-rpfWt6AHjMLuzvwLGzqlTvoyl7jZkDyCja0hc0kI'
);
  
/*
  // VAPID keys should be generated only once.
  const vapidKeys = webpush.generateVAPIDKeys();
  
  webpush.setGCMAPIKey('AAAASE-Za20:APA91bHTVRpZWO3-wHMCgjY4A4FlmO-X3ZK3ZhzeascpE3Pklln1SMlIUy16MmJWhYT7aC_GU8dBe1RDNotDKcQW7ENuCgEVjG2sl51gvZDhTAWisIOH1zKFQOxUaXp-AyawBaPmnUxQ');
  webpush.setVapidDetails(
    'mailto:info@aythen.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );
*/

var push = async (req, res) => {
  
  const id = 'ba71025f-21a8-408a-98cf-cb0115a6939b';
  const { dataValues: account } = await Account.findOne({ where: { id } })
  if(!account) res.status(404).send("Reseller no found");
  
  const index = account.devices.find(device => device.type == '');
  
  // var pushSubscription = account.suscribe_desktop[index]
  // var pushSubscription = "Windows 11"
  const pushSubscription = {
    endpoint: 'https://api.aythen.com/devices/subscribe',
    keys: {
      p256dh: 'BH0kDJUbCNvwyWsw-N64wJa3Zgrrj8xb4DMM6S-0AJsD9yphotANLN1-Pihl-HPZN77b11b12mrEK2JeJHR3HhA',
      auth: id
    }
  };

  var payload = JSON.stringify({
    title: 'Notification',
    data: 'Start session in this device',
    image: "https://freeiconshop.com/wp-content/uploads/edd/notification-flat.png"
  })
  
  console.log("===================================================")
  console.log("PAYLOAD")
  console.log("===================================================")
  console.log(payload)
  
  webpush
    .sendNotification(pushSubscription, payload)
    .then(function (data) {
      console.log("===================================================")
      console.log("RESPONDE")
      console.log("===================================================")
      console.log(data)
      return res.status(200).send(data)
    })
    .catch(function (err) {
      console.log("===================================================")
      console.log("ERRROR")
      console.log("===================================================")
      console.log(err)
      return res.status(200).send(err)
    })
    
  // var user = await User.findAll({
  //   where: {
  //     id: req.body.id,
  //   }, 
  //   limit: 1,
  // })
  // attributes: ['id', 'suscribe_desktop', 'suscribe_mobile']
  

  
  // var index = user[0].suscribe_desktop.findIndex( x => x.user == req.body.id);
  
  // console.log(index)
    // This is the same output of calling JSON.stringify on a PushSubscription
    /*
    const pushSubscription = {
      endpoint: '.....',
      keys: {
        auth: '.....',
        p256dh: '.....'
      }
    };
    */
    // var pushSubscription = user[0].suscribe_desktop[index]
    //var pushSubscription = data[0].suscribe_mobile
    //console.log(pushSubscription)
    
    // var payload = JSON.stringify({
    //   title: 'Section.io Push Notification',
    //   data: 'Lorem ipsum',
    //   image: 'https://aythen.com/api/v0/user/' + req.body.id + '/avatar',
    //   icon: 'https://aythen.com/api/v0/user/' + req.body.id + '/avatar'
    // });
    // webpush.sendNotification(pushSubscription, payload)
    // .then(function (data) {
    //    return res.status(200).send(data);
    // })
    // .catch(function (err) {
    //     return res.status(200).send(err);
    // });
    
}

function subscribe({ body }, res) {
  console.log("Subscribred")
  // console.log(body)
  res.status(200).send("Good Job!")
}

// var getLog = (req, res) => {
//     sequelize.authenticate()
//     .then( async () => {
//         var data = await Log.findAll({
//             where: {
//                 domain_id: req.params.id,
//             }, 
//             limit: 20,
//             order: [ [ 'createdAt', 'DESC' ] ]
//         })
        
//         return res.status(200).send(data)
//     })
//     .catch(err => {
//       return res.status(200).send(err)
//     })
// }


// var postLog = (req, res) => {
//     sequelize.authenticate()
//     .then( async () => {
//         if(!req.body.domain_id) return res.status(200).send('300')
        
//         var data = await Log.upsert( req.body );

//         fnSocket(req.body, 'notification')
        
//         return res.status(200).send(data[0])
//     })
//     .catch(err => {
//       return res.status(200).send(err)
//     })
// }

routerPush.post('/send', push)
routerPush.post('/subscribe', subscribe)
// routerPush.get('/log/:id', getLog);
// routerPush.post('/log', postLog);

module.exports = routerPush