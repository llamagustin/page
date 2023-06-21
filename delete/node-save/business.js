const express = require('express')
const routerBusiness = express.Router()

const Sequelize = require('sequelize')
const { Op } = require("sequelize");



var config = require('./config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
})


const { paginateArray, sortCompare } = require('./utils')

const { Business } = require('./model/business')



//
var postBusiness = (req, res) => {
    sequelize.authenticate()
    .then( async () => {
        var data = await Business.upsert( req.body );
        
        return res.status(200).send(data[0])
    })
    .catch(err => {
       return res.status(200).send(err)
    })
}

var deleteBusiness = (req, res) => {
    sequelize.authenticate()
    .then( async () => {
        
        var data = await Business.destroy({
          where: {
            id: req.body.id
          }
        })

    	return res.status(200).send(data)
        
    })
    .catch(err => {
       return res.status(200).send(err)
    })
}

var getBusiness = async (req, res) => {

  const {
    q = '',
    perPage = 10,
    page = 1,
    sortBy = 'id',
    sortDesc = false,
    role = null,
    plan = null,
    status = null,
  } = req.params
  /* eslint-enable */
    
  const queryLowered = q.toLowerCase()
  
 
  var data = await new Promise((resolve, reject) => {
        sequelize.authenticate()
        .then( async () => {
            var data = await Business.findAll({
                limit: 20,
                order: [ [ 'createdAt', 'DESC' ] ]
            })
            
            resolve(data)
        })
        .catch(err => {
           return res.send(err)
        })
  })
  
  
  const filteredData = data.filter(
    business =>
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      (business.title.toLowerCase().includes(queryLowered) || business.fullName.toLowerCase().includes(queryLowered)) &&
      business.role === (role || business.role) &&
      business.currentPlan === (plan || business.currentPlan) &&
      business.status === (status || business.status),
  )
  /* eslint-enable  */

  const sortedData = filteredData.sort(sortCompare(sortBy))
  if (sortDesc) sortedData.reverse()

  return res.send({
      business: paginateArray(sortedData, perPage, page),
      total: filteredData.length
  })
  
}

var getBusinessId = (req, res) => {
    sequelize.authenticate()
    .then( async () => {
        var data = await Business.findAll({
            where: {
                user_id: req.params.id,
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









routerBusiness.get('/', getBusiness);
routerBusiness.get('/:id', getBusinessId);
routerBusiness.post('/add', postBusiness);
routerBusiness.post('/delete', deleteBusiness)


module.exports = routerBusiness











