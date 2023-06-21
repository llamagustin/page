const express = require('express')
const routerForm = express.Router()

const Sequelize = require('sequelize')
const { Op } = require("sequelize");



var config = require('./config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
})


const { Form } = require('./model/form')



//
var getForms = async (req, res) => {
  sequelize.authenticate()
    .then( async () => {
        var data = await Form.findAll({
            where: {
                user_id: req.query.user_id,
            }, 
            limit: 20,
            order: [ [ 'createdAt', 'DESC' ] ]
        })
        
        return res.status(200).send({
          forms: data,
          total: data.length
        })
    })
    .catch(err => {
       return res.status(200).send(err)
    })
}


var getFormId = async (req, res) => {
  sequelize.authenticate()
    .then( async () => {
        var data = await Form.findAll({
            where: {
                id: req.params.id,
            }, 
            limit: 1,
            order: [ [ 'createdAt', 'DESC' ] ]
        })
        
        return res.status(200).send(data[0])
    })
    .catch(err => {
       return res.status(200).send(err)
    })
}


var deleteForm = async (req, res) => {
    sequelize.authenticate()
    .then( async () => {
    
        var data = await Form.destroy({
          where: {
            id: req.body.id
          }
        })
        
 
    	return res.send('200')
    })
    .catch(err => {
       return res.send(err)
    })
}


var postForm = async (req, res) => {
    sequelize.authenticate()
    .then( async () => {
        console.log('req', req.body)
        var data = await Form.upsert( req.body );
        
        return res.status(200).send(data[0])
    })
    .catch(err => {
       return res.status(200).send(err)
    })
}












routerForm.get('/', getForms);
routerForm.get('/:id', getFormId);

routerForm.post('/', postForm);
routerForm.post('/delete', deleteForm);



module.exports = routerForm











