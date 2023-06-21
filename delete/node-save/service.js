const express = require('express')
const routerService = express.Router()

const Sequelize = require('sequelize')
const { Op } = require("sequelize");



var config = require('./config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
})


const { paginateArray, sortCompare } = require('./utils')




const { Service } = require('./model/service')



//
var postService = (req, res) => {
    sequelize.authenticate()
    .then( async () => {
        var data = await Service.upsert( req.body );
        
        return res.status(200).send(data[0])
    })
    .catch(err => {
       return res.status(200).send(err)
    })
}


var deleteService = (req, res) => {
    sequelize.authenticate()
    .then( async () => {
        
        var data = await Service.destroy({
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

var getServices = async (req, res) => {
 // eslint-disable-next-line object-curly-newline
  const { q = '', sortBy = 'featured', perPage = 9, page = 1 } = req.params
    
  const queryLowered = q.toLowerCase()
  
  var data = await new Promise((resolve, reject) => {
        sequelize.authenticate()
        .then( async () => {
            var data = await Service.findAll({
                limit: 20,
                order: [ [ 'createdAt', 'DESC' ] ]
            })
            
            resolve(data)
        })
        .catch(err => {
           return res.send('404')
        })
  })
  
  

  const filteredData = data.filter(service => service.title.toLowerCase().includes(queryLowered))

  let sortDesc = false
  const sortByKey = (() => {
    if (sortBy === 'price-desc') {
      sortDesc = true
      return 'price'
    }
    if (sortBy === 'price-asc') {
      return 'price'
    }
    sortDesc = true
    return 'id'
  })()

  const sortedData = filteredData.sort(sortCompare(sortByKey))
  
  if (sortDesc) sortedData.reverse()

  /*
  const paginatedData = JSON.parse(JSON.stringify(paginateArray(sortedData, perPage, page)))

  paginatedData.forEach(service => {
    service.isInWishlist = data.userWishlist.findIndex(p => p.serviceId === service.id) > -1
    service.isInCart = data.userCart.findIndex(p => p.serviceId === service.id) > -1
  })
  */

  return res.send({
      services: sortedData,
      total: sortedData.length,
      userWishlist: [], //data.userWishlist,
      userCart: [] //data.userCart,
    })
}

/*
var getServiceImageId = (req, res) => {
    sequelize.authenticate()
    .then( async () => {
        
        var data = await Service.findAll({
            where: {
                id: req.params.id
            }, 
            limit: 1,
            attributes: ['id', 'image']
        })
        
        function bytesBufferToBase64(buffer) {
            let binary = '';
            const bytes = new Uint8Array(buffer);
            const len = bytes.byteLength;
            for (let i = 0; i < len; i += 1) {
              binary += String.fromCharCode(bytes[i]);
            }
        
            return btoa(binary);
          }
        
 
        //console.log('eee', data[0].image)
        var buff = 'data:image/jpg;base64,' + bytesBufferToBase64(data[0].image)
        //console.log('d', data[0].image)
        return res.status(200).send(buff)
    })
    .catch(err => {
       return res.status(200).send(err)
    })
}
*/



var getServiceUserId = async (req, res) => {
 // eslint-disable-next-line object-curly-newline
  const { q = '', sortBy = 'featured', perPage = 9, page = 1 } = req.params
    
  const queryLowered = q.toLowerCase()
  
  var data = await new Promise((resolve, reject) => {
        sequelize.authenticate()
        .then( async () => {
            var data = await Service.findAll({
                where: {
                    user_id: req.params.id,
                },
                limit: 20,
                order: [ [ 'createdAt', 'DESC' ] ]
            })
            
            resolve(data)
        })
        .catch(err => {
           return res.send('404')
        })
  })
  
  

  const filteredData = data.filter(service => service.title.toLowerCase().includes(queryLowered))

  let sortDesc = false
  const sortByKey = (() => {
    if (sortBy === 'price-desc') {
      sortDesc = true
      return 'price'
    }
    if (sortBy === 'price-asc') {
      return 'price'
    }
    sortDesc = true
    return 'id'
  })()

  const sortedData = filteredData.sort(sortCompare(sortByKey))
  
  if (sortDesc) sortedData.reverse()

  return res.send({
      services: sortedData,
      total: sortedData.length,
      userWishlist: [], //data.userWishlist,
      userCart: [] //data.userCart,
    })
}




var getServiceApiId = (req, res) => {
    sequelize.authenticate()
    .then( async () => {
        var data = await API.findAll({
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



var getService = (req, res) => {
    sequelize.authenticate()
    .then( async () => {
        var data = await Service.findAll({
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









routerService.get('/', getServices);
//routerService.get('/image/:id', getServiceImageId);
routerService.get('/user/:id', getServiceUserId);
routerService.get('/api/:id', getServiceApiId);
routerService.get('/:id', getService);
routerService.post('/add', postService);
routerService.post('/delete', deleteService)


module.exports = routerService











