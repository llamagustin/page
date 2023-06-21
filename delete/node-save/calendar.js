const express = require('express')
const routerCalendar = express.Router()

const Sequelize = require('sequelize')
const { Op } = require("sequelize");



var config = require('./config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
})



const { Calendar } = require('./model/calendar')

//
var getCalendar = async (req, res) => {
   var data = await new Promise((resolve, reject) => {
        sequelize.authenticate()
        .then( async () => {
            var result = await Calendar.findAll({
                where: {
                    user_id: req.params.id
                },
                limit: 1,
                order: [ [ 'createdAt', 'DESC' ] ]
            })
            
            resolve(result[0].data)
        })
        .catch(err => {
           resolve(err)
        })
  })
  
  return res.send(data)
}


var postCalendar = async(req, res) => {
    // Get requested calendars as Array
    await new Promise((resolve, reject) => {
        sequelize.authenticate()
        .then( async () => {
            var data = await Calendar.upsert( req.body.data );
            resolve(result)
        })
        .catch(err => {
           resolve(err)
        })
    })
    
    return res.send('200')
}











routerCalendar.get('/:id', getCalendar);
routerCalendar.post('/', postCalendar);


module.exports = routerCalendar











