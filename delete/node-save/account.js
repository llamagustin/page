const express = require('express')
const routerAccount = express.Router()

const { uuid } = require('uuidv4');


const fs   = require('fs')
const path = require("path")
const jwt   = require('jsonwebtoken')
const privateKEY  = fs.readFileSync(path.resolve(__dirname, './keys/privateKey.pem'), 'utf8')
const publicKEY  = fs.readFileSync(path.resolve(__dirname, './keys/publicKey.pem'), 'utf8')



const Sequelize = require('sequelize')
const { Op } = require("sequelize");



var config = require('./config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
})


const { paginateArray, sortCompare } = require('./utils')



var { Password } = require('./model/user.js')
const { Account } = require('./model/account')




const jwtConfig = {
  secret: 'dd5f3089-40c3-403d-af14-d0c228b05cb4',
  refreshTokenSecret: '7c4c1c50-3230-45bf-9eae-c9b2e401c767',
  expireTime: '10m',
  refreshTokenExpireTime: '10m',
}



var loginAccount = async(req, res) => {
  const { email, password } = req.body.data

  let error = {
    error: ['Something went wrong'],
  }
  
  var data = await new Promise((resolve, reject) => {
        sequelize.authenticate()
        .then( async () => {
                var result = await Account.findAll({
                    where: {
                        [Op.or]: [{
                                    email: { [Op.eq]: `${email}`}
                                  },{
                                    username: { [Op.eq]: `${email}`}
                                  }]
                    },
                    limit: 1
                })
                
                //console.log('result', result)
               if(result.length > 0){
                   var account = result[0].dataValues
                   
                   var result = await Password.findAll({
                        where: {
                            id: account.password_id,
                            password: password
                        },
                        limit: 1
                    })
                    
                    
                    if(result.length == 0){
                      var error = {
                        error: ['Password is Invalid'],
                      }
                      
                      resolve(error)
                    }
                    
                    try {
                      const accessToken = jwt.sign({ id: account.id }, jwtConfig.secret, { expiresIn: jwtConfig.expireTime })
                      const refreshToken = jwt.sign({ id: account.id }, jwtConfig.refreshTokenSecret, {
                        expiresIn: jwtConfig.refreshTokenExpireTime,
                      })
                
                      const accountData = { ...account }
                
                      delete accountData.password
                
                      const response = {
                        accountData,
                        accessToken,
                        refreshToken,
                      }
                
                      resolve(response)
                    } catch (e) {
                      error = e
                    }
            }else{
              var error = {
                error: ['Email is Invalid'],
              }
            }
            resolve(error)
        })
        .catch(err => {
           resolve(err)
        })
  })
  
  return res.send(data)
  
  /*
  if (data.length > 0) {
    var account = data[0].dataValues
    
    try {
      const accessToken = jwt.sign({ id: account.id }, jwtConfig.secret, { expiresIn: jwtConfig.expireTime })
      const refreshToken = jwt.sign({ id: account.id }, jwtConfig.refreshTokenSecret, {
        expiresIn: jwtConfig.refreshTokenExpireTime,
      })

      const accountData = { ...account }

      delete accountData.password

      const response = {
        accountData,
        accessToken,
        refreshToken,
      }

      return res.send(response)
    } catch (e) {
      error = e
    }
  } else {
    error = {
      error: ['Email or Password is Invalid'],
    }
  }
  */
  
}





//
var registerAccount = async(req, res) => {
  const { username, email, password } = req.body.data

  // If not any of data is missing return 400
  if (!(username && email && password)) return res.send('400')
  
  
  var isAlreadyInUse = await new Promise((resolve, reject) => {
        sequelize.authenticate()
        .then( async () => {
            var result = await Account.findAll({
                where: {
                    [Op.or]: [{
                            email: {
                                [Op.like]: `%${email}%`
                            }
                        },
                        {
                            username: {
                                [Op.like]: `%${username}%`
                            }
                        }
                    ]
                },
                limit: 1,
                order: [ [ 'createdAt', 'DESC' ] ]
            })
            
            resolve(result)
        })
        .catch(err => {
           resolve(err)
        })
  })
  
  const error = {
    password: !password ? ['Please enter password'] : null,
    email: (() => {
      if (!email) return['Please enter your email.']
      if (isAlreadyInUse.length > 0) return ['This email is already in use.']
      return null
    })(),
    username: (() => {
      if (!username) return ['Please enter your username.']
      if (isAlreadyInUse.length > 0) return ['This username is already in use.']
      return null
    })(),
  }

  if (!error.username && !error.email) {
    const accountData = {
      id: uuid(),
      email,
      password,
      username,
      fullName: '',
      avatar: null,
      role: 'admin'
    }
    
    
    await new Promise((resolve, reject) => {
        sequelize.authenticate()
        .then( async () => {
            var data = await Account.upsert( accountData );
            resolve(result)
        })
        .catch(err => {
           resolve(err)
        })
    })
  
 
    // Add user id
    const accessToken = jwt.sign({ id: accountData.id }, jwtConfig.secret, { expiresIn: jwtConfig.expireTime })

    const account = { ...accountData }
    delete account.password
    const response = {
      accountData: account,
      accessToken,
    }
    
    return res.send(response)
  }
  return res.send(error)
}



//

var refreshTokenAccount = async(req, res) => {
  const { refreshToken } = JSON.parse(req.body.data)
  
  var data = await new Promise((resolve, reject) => {
        sequelize.authenticate()
        .then( async () => {
            var data = await Account.findAll({
                limit: 20,
                order: [ [ 'createdAt', 'DESC' ] ]
            })
            
            resolve(data)
        })
        .catch(err => {
           return res.send('404')
        })
  })
  
  
  try {
    const { id } = jwt.verify(refreshToken, jwtConfig.refreshTokenSecret)

    const accountData = { ...data.find(account => account.id === id) }

    const newAccessToken = jwt.sign({ id: accountData.id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn })
    const newRefreshToken = jwt.sign({ id: accountData.id }, jwtConfig.refreshTokenSecret, {
      expiresIn: jwtConfig.refreshTokenExpireTime,
    })

    delete accountData.password
    const response = {
      accountData,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    }

    res.send(response)
  } catch (e) {
    const error = 'Invalid refresh token'
    return res.send(error)
  }
}



//
var savePasswordAccount = async (req, res) => {
  var data = await new Promise((resolve, reject) => {
        sequelize.authenticate()
        .then( async () => {
          console.log('req', req.body)
            var data = await Password.upsert( req.body );
            resolve(result)
        })
        .catch(err => {
           resolve(err)
        })
  })
    
  return res.send('202')
}


//
var addAccount = (req, res) => {
    sequelize.authenticate()
    .then( async () => {
        var data = await Account.create( req.body.account, {
            password: req.body.account.password
        });
        
        return res.status(200).send(data[0])
    })
    .catch(err => {
       return res.status(200).send(err)
    })
}



var postAccount = (req, res) => {
    sequelize.authenticate()
    .then( async () => {
        var data = await Account.upsert( req.body);
        
        return res.status(200).send(data[0])
    })
    .catch(err => {
       return res.status(200).send(err)
    })
}







var deleteAccount = (req, res) => {
  
   console.log('eeeee',req.body)
    sequelize.authenticate()
    .then( async () => {
        
        var data = await Account.destroy({
          where: {
            id: req.body.id
          }
        })

    	return res.status(200).send('200')
        
    })
    .catch(err => {
       return res.status(200).send(err)
    })
}

var getAccounts = async (req, res) => {
  const {
    q = '',
    perPage = 10,
    page = 1,
    sortBy = 'id',
    sortDesc = false,
    role = null,
    status = null,
  } = req.query
  /* eslint-enable */
  
  const queryLowered = q.toLowerCase()
  
  var search = {}
  
  if(status) search['status'] = { [Op.like]: `%${status}%` }
  if(role) search['role'] = { [Op.like]: `%${role}%` }
  
  
  var data = await new Promise((resolve, reject) => {
        sequelize.authenticate()
        .then( async () => {
            var data = await Account.findAll({
                where: {
                  [Op.and]: [{
                      [Op.or]: [
                        { fullName: { [Op.like]: `%${q}%` } },
                        { username: { [Op.like]: `%${q}%` } },
                        { email: { [Op.like]: `%${q}%` } },
                        { phone: { [Op.like]: `%${q}%` } },
                      ],
                  },
                  search
                  ]
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
  
  
  const filteredData = data.filter(
    Account =>
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      (Account.username.toLowerCase().includes(queryLowered) || Account.fullName.toLowerCase().includes(queryLowered)) &&
      Account.role === (role || Account.role) &&
      Account.status === (status || Account.status),
  )
  /* eslint-enable  */

  const sortedData = filteredData.sort(sortCompare(sortBy))
  if (sortDesc) sortedData.reverse()

  return res.send({
      accounts: paginateArray(sortedData, perPage, page),
      total: filteredData.length
  })
  
}

var getAccountsId = (req, res) => {
    sequelize.authenticate()
    .then( async () => {
        var data = await Account.findAll({
            where: {
                Account_id: req.params.id,
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

var getAccount = (req, res) => {
    sequelize.authenticate()
    .then( async () => {
        var data = await Account.findAll({
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








routerAccount.get('/all', getAccounts);
routerAccount.get('/all/:id', getAccountsId);
routerAccount.get('/:id', getAccount);


routerAccount.post('/change/password', savePasswordAccount);
routerAccount.post('/', postAccount);
routerAccount.post('/add', addAccount);
routerAccount.post('/delete', deleteAccount)

routerAccount.post('/register', registerAccount);
routerAccount.post('/login', loginAccount);
routerAccount.post('/refresh-token', refreshTokenAccount);


module.exports = routerAccount











