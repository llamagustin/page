const express = require('express')
const routerFaq = express.Router()

const Sequelize = require('sequelize')
const { Op } = require("sequelize");



var config = require('./config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
})


const { paginateArray, sortCompare } = require('./utils')




const { Faq } = require('./model/faq')



//



var getFaq = (req, res) => {
    sequelize.authenticate()
    .then( async () => {
        var data = await Faq.findAll({
            where: {
                id: req.params.id,
            }, 
            limit: 1,
            order: [ [ 'createdAt', 'DESC' ] ]
        })
        
        return res.status(200).send(data[0].data)
    })
    .catch(err => {
       return res.status(200).send(err)
    })
}



var postFaq = (req, res) => {
    sequelize.authenticate()
    .then( async () => {
        var data = await Faq.upsert( req.body );
        
        return res.status(200).send(data[0])
    })
    .catch(err => {
       return res.status(200).send(err)
    })
}






routerFaq.get('/:id', getFaq);
routerFaq.post('/', postFaq)


module.exports = routerFaq











