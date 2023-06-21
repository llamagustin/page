'use strict'

const fs = require("fs");

const express = require('express')
const routerCall = express.Router()
// const { uuid } = require('uuidv4');

const { v4: uuid, validate: valid_uuid } = require('uuid');

//sequelize 
const Sequelize = require('sequelize');
const { Op } = require("sequelize");

var config = require('./config.json')
const sequelize = new Sequelize(config.database, config.callname, config.password, {
  host: config.host,
  dialect: config.dialect
})


const { Account } = require('./model/account')
const { Call } = require('./model/call')

const getCalls = async (req, res) => {
  const { 
    id,
    q = '',
    status = null,
    perPage = 10,
    currentPage = 1
  } = req.query;
  
  if(!valid_uuid(id)) return res.send('404')
  
  const queryLower = q.toLowerCase()
  
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

  const filters = {
    include: [
      {
        model: Account,
        attributes: ['id', 'fullName', 'avatar', 'email']
      }
    ],
    where: {
      [Op.and]: [ searchStatus ]
    },
    order: [ [ 'createdAt', 'DESC' ] ]
  }
  
  var permision = await new Promise((resolve, reject) => {
    Account.findAll({
      where: { id: id }
    }).then(result => {
      if(result){
        result[0].abilities.action == 'manage' ? resolve('manage') : resolve('user')
      }
    })
  })
  
  
  
  if (permision == 'manage') {
    console.log('manage')
    var response = await new Promise((resolve, reject) => {
      Call.findAll(filters).then(result => {
        resolve(result)
      })
    })
  } else {
    var response = await new Promise((resolve, reject) => {
      sequelize.query(`SELECT DISTINCROW * FROM aythen.users WHERE reseller @> \'[ "${id}" ]\';`)
        .then(result => {
          resolve(result[0])
        });
    })
  }

  
  const filteredCalls = response
  const count = filteredCalls.length
  
  var stats = [
    [0, 0], //total leads
    [0, 0], //total acceptado
    [0, 0], //total pendientes
    [0, 0], //total cancelados
  ];
  
  for (let i = 0; i < filteredCalls.length; i++) {
    switch (filteredCalls[i].status) {
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
  
  const totalPage = Math.ceil(filteredCalls.length / perPage) ?
    Math.ceil(filteredCalls.length / perPage) :
    1;
  
  const totalCalls = filteredCalls.length;
  
  let newFilteredCalls = [];
  if (perPage) {
    const firstIndex = (currentPage - 1) * perPage;
    const lastIndex = perPage * currentPage;

    newFilteredCalls = filteredCalls.slice(firstIndex, lastIndex);
  }
  
  return res.send({ 
    calls: newFilteredCalls, 
    totalPage, 
    totalCalls,
    stats: stats
  })
}


var getCall = async (req, res) => {
  const id  = req.params.id
  
  if(!valid_uuid(id)) return res.send('404')
  
  const call = await new Promise(async (resolve, reject) => {
      const data = await Call.findOne({ where: {  id: id } })
      resolve(data)
  })

  if(call){
    return res.status(200).send(call)
  }else{
    return res.sendStatus(404)
  }
}



var addCall = async (req, res) => {
  const call = req.body

    Call.create(call, {
      password: call.password
    }).then( data => {
      return res.status(200).send(data)
    }).catch(err => {
      return res.status(200).send('500')
    })
}


var deleteCall = async (req, res) => {
    const {id} = req.body
    
    if(!valid_uuid(id)) return res.send('404')
    
    var data = await Call.destroy({
      where: {
        id: id
      }
    })
    
    return res.send('200')
}



const updateCall= async (req,res) => {
  const data = req.body.call;
  
  var qr = await Call.upsert(data,{
    where:{
      id: data.id
    }
  })
  
  return res.send({ok:true});
}





//
routerCall.put('/',updateCall);

//
routerCall.get('/list', getCalls);
routerCall.get('/:id', getCall);

routerCall.post('/add', addCall);
routerCall.post('/delete', deleteCall);



module.exports = routerCall


