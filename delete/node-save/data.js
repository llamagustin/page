const express = require('express')
const routerData = express.Router()

const Sequelize = require('sequelize')
const { Op } = require("sequelize");



var config = require('./config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
})



const { User } = require('./model/user')




var getSandboxs = (req, res) => {
    var data =  await new Promise( (resolve, reject) => {
        sequelize.authenticate()
        .then( async () => {
            
            var data_lead = await User.findAll({
                where: {
                    id: req.params.id,
                }, 
                limit: 1,
                order: [ [ 'createdAt', 'DESC' ] ]
            })
            
            var data_client = await User.findAll({
                where: {
                    id: req.params.id,
                }, 
                limit: 1,
                order: [ [ 'createdAt', 'DESC' ] ]
            })
            
            
            /*
            //contact
            var data_lead = await User.findAll({
                where: {
                    id: req.params.id,
                }, 
                limit: 1,
                order: [ [ 'createdAt', 'DESC' ] ]
            })
            */
        
        })
        .catch( (err) => reject(err))
    })
}


var postData = (req, res) => {
    
}



routerData.get('/sandbox', getSandbox);
routerData.gets('/', postData)


module.exports = routerData
