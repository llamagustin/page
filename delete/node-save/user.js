const express = require('express')
const routerUser = express.Router()

const Sequelize = require('sequelize')
const { Op } = require("sequelize");


const jwt   = require('jsonwebtoken')
const fs   = require('fs')
const path = require("path")
const privateKEY  = fs.readFileSync(path.resolve(__dirname, './keys/privateKey.pem'), 'utf8')
const publicKEY  = fs.readFileSync(path.resolve(__dirname, './keys/publicKey.pem'), 'utf8')



var config = require('./config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
})


const { paginateArray, sortCompare } = require('./utils')




const { User, Password } = require('./model/user')



//
var getData = async (req, res) => {
  const {
    q = '',
    role = null,
    category = null,
    plan = null,
    status = null,
  } = req.query
  
  
  /*
  var search = {
      fullName: { [Op.like]: `%%` }
  }
  */
  
  var search = {}
  
  if(plan) search['plan'] = { [Op.like]: `%${plan}%` }
  if(status) search['status'] = { [Op.like]: `%${status}%` }
  if(role) search['role'] = { [Op.like]: `%${role}%` }
  
  var data = await new Promise((resolve, reject) => {
        sequelize.authenticate()
        .then( async () => {
            /*
            var data = await User.findAll({
                where: {
                  [Op.and]: [{
                      [Op.or]: [
                        { fullName: { [Op.like]: `%${q}%` } },
                        { company: { [Op.like]: `%${q}%` } },
                        { username: { [Op.like]: `%${q}%` } },
                        { email: { [Op.like]: `%${q}%` } },
                      ],
                  },
                  search
                  ]
                },
                order: [ [ 'createdAt', 'DESC' ] ]
            })
            */
            
            var count_clients = await User.findAndCountAll({
              offset: 10,
              limit: 2
            });
            
            var count_leads = await User.findAndCountAll({
              where: {
                status: {
                  [Op.like]: 'success'
                }
              },
              offset: 10,
              limit: 2
            });
            
            var gains = await User.sum('budget', { where: { status: 'success' } }); 
            
            var total = await User.sum('budget'); 
            
        
            var data = {
                leads: count_leads.count,
                clients: count_clients.count,
                gains: gains || 0,
                total: total || 0
            }
            
            
            resolve(data)
        })
        .catch(err => {
           return res.send('404')
        })
  })
  
  return res.send(data)
  
}





var postUser = (req, res) => {
    console.log('user', req.body)
    sequelize.authenticate()
    .then( async () => {
        var data = await User.create( req.body.user, {
            password: '1234'
        } );
        
        return res.send(data)
    })
    .catch(err => {
       return res.send(err)
    })
}


var updateUser = (req, res) => {
    sequelize.authenticate()
    .then( async () => {
        var data = await User.upsert( req.body.user );
        
        return res.status(200).send(data[0])
    })
    .catch(err => {
       return res.status(200).send(err)
    })
}



var deleteUser = (req, res) => {
    sequelize.authenticate()
    .then( async () => {
    
        var data = await User.destroy({
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

var getUsers = async (req, res) => {

  const {
    q = '',
    perPage = 10,
    page = 1,
    sortBy = 'id',
    sortDesc = false,
    role = null,
    category = null,
    plan = null,
    status = null,
  } = req.query
  
  /* eslint-enable */
  const queryLowered = q.toLowerCase()
  
  /*
  var search = {
      fullName: { [Op.like]: `%%` }
  }
  */
  
  var search = {}
  
  if(plan) search['plan'] = { [Op.like]: `%${plan}%` }
  if(status) search['status'] = { [Op.like]: `%${status}%` }
  if(role) search['role'] = { [Op.like]: `%${role}%` }
  
 
 //status: { [Op.like]: `%${status}%` },
  var data = await new Promise((resolve, reject) => {
        sequelize.authenticate()
        .then( async () => {
            var data = await User.findAll({
                where: {
                  [Op.and]: [{
                      [Op.or]: [
                        { fullName: { [Op.like]: `%${q}%` } },
                        { company: { [Op.like]: `%${q}%` } },
                        { username: { [Op.like]: `%${q}%` } },
                        { email: { [Op.like]: `%${q}%` } },
                      ],
                  },
                  search
                  
                    //{ plan: plan },
                    //{ status: status },
                    //{ role: role },
                    //{ budget: { [Op.between]: [18, 24] } }
                  ]
                },
                limit: 200,
                order: [ [ 'createdAt', 'DESC' ] ]
            })
            
            resolve(data)
        })
        .catch(err => {
           return res.send('404')
        })
  })
  
  /*
  const filteredData = data.filter(
    user =>
      (user.username.toLowerCase().includes(queryLowered) || user.fullName.toLowerCase().includes(queryLowered)) &&
      user.role === (role || user.role) &&
      user.plan === (plan || user.plan) &&
      user.status === (status || user.status),
  )
  */
  /* eslint-enable  */

  const sortedData = data.sort(sortCompare(sortBy))
  if (sortDesc) sortedData.reverse()

  return res.send({
      users: paginateArray(sortedData, perPage, page),
      total: data.length
  })
  
}



var getClientsId = (req, res) => {
    sequelize.authenticate()
    .then( async () => {
        var data = await User.findAll({
            where: {
                user_id: req.params.id,
                status: 'success'
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



var getUsersId = (req, res) => {
    sequelize.authenticate()
    .then( async () => {
        var data = await User.findAll({
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

var getUser = (req, res) => {
    sequelize.authenticate()
    .then( async () => {
        var data = await User.findAll({
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


var getAvatarUser = (req, res) => {
    sequelize.authenticate()
    .then( async () => {
        var data = await User.findAll({
            where: {
                id: req.params.id,
            }, 
            attributes: ['id', 'avatar'],
            limit: 1
        })
        
        if(data.length == 0){
            return res.status(200).send('404')
        }
        

        return res.status(200).send(data[0].avatar)
    })
    .catch(err => {
       return res.status(200).send(err)
    })
}





var registerUser = (req, res) => {
    sequelize.authenticate()
    .then( async () => {
        var data = await User.create( req.body, {
            password: req.body.password
        });

        var signOptions = {
			issuer: "Authorizaxtion/Resource/This server",//req.body.issuer,
			subject: "info@aythen.com", //req.body.subject,
			audience: "Client_Identity",
			expiresIn:  "30d",    // 30 days validity
			algorithm:  "RS256"
    	}
    	
    	var firm = jwt.sign({id:  data.id}, privateKEY, signOptions)
    	
    	return res.send({
    	    token: firm,
    	    username: data.username,
    	    avatar: data.avatar,
    	    loginAt: new Date()
    	  })

    })
    .catch(err => {
       return res.send(err)
    })
}



var loginUser = (req, res) => {
    sequelize.authenticate()
    .then( async () => {
        
        
        var user = await User.findAll({
            where: {
                [Op.or]: [
                    { username: req.body.email },
                    { email: req.body.email }
                ]
            },
            limit: 1,
            order: [ [ 'createdAt', 'DESC' ]]
        })
        

        if(user.length == 0){
            return res.send('300')
        }
    
        var password = await Password.findAll({
            where: {
                id: user[0].password_id,
                password: req.body.password
            }, 
            limit: 1,
            order: [ [ 'createdAt', 'DESC' ]]
        })
        
        if(password.length == 0){
            return res.status(200).send('300')
        }

        var signOptions = {
			issuer: "Authorizaxtion/Resource/This server",//req.body.issuer,
			subject: "info@aythen.com", //req.body.subject,
			audience: "Client_Identity",
			expiresIn:  "30d",    // 30 days validity
			algorithm:  "RS256"
    	}
    	var firm = jwt.sign({id:  user[0].id}, privateKEY, signOptions)
    
    	return res.status(200).send({
    	    token: firm,
    	    username: user[0].username,
    	    avatar: user[0].avatar,
    	    loginAt: new Date()
    	  })
        
    })
    .catch(err => {
       return res.send(err)
    })
}



var changePassword = (req, res) => {
    sequelize.authenticate()
    .then( async () => {
        var data = await Password.update({
            password: req.body.password
        },{
            where: {
                id: req.body.id
            }
        });
        
        return res.status(200).send('change success')
    })
    .catch(err => {
       return res.status(200).send(err)
    })
}








routerUser.get('/data', getData);

routerUser.get('/all', getUsers);
routerUser.get('/clients/all/:id', getClientsId);
routerUser.get('/all/:id', getUsersId);
routerUser.get('/:id', getUser);
routerUser.get('/avatar/:id', getAvatarUser);

routerUser.post('/login', loginUser);
routerUser.post('/register', registerUser);

routerUser.post('/', updateUser);
routerUser.post('/add', postUser);
routerUser.post('/delete', deleteUser)


module.exports = routerUser











