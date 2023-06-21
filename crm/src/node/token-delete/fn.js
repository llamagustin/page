'use stric'

const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const Sequelize = require('sequelize');
var config = require('../config.json')

const { tokenk } = require('../model/tokenk')


const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
})

//2 acl manage, auth


/*
super admin
gerente
cliente

api=admin?or gerente
var array = {
  "sendEamil": "manage"
}

*/


async function token(body) {

  var data = await new Promise((resolve, reject) => {
    // console.log('d', data)
    // let date_ob = new Date()
    // let Tokenkey = date_ob.getFullYear() + '-' + (date_ob.getMonth() + 1) + '-' + date_ob.getDate()


    const key = uuid.v4();

    const fecha = new Date();
    const fechaFormateada = fecha.toISOString().slice(0, 10);


    tokenk.findOne({ where: { createdAt: fechaFormateada } }).then(getTableTokenk => {


        if (getTableTokenk == null) {

          const newtoken = {
            id: uuid.v4(),
            tkey: key,
            createat: fechaFormateada,
          };
          tokenk.create(newtoken).then(usuarioCreado => {

              var token = jwt.sign({ data: body }, key)
              getTableTokenk = token

              resolve(token)

            })
            .catch(err => {
              console.log(err)
            });
        }

      })
      .catch(err => {
        reject(err)

      })
  })

  return data

}

function validateToken(body) {


  var data = new Promise((resolve, reject) => {

    const fecha = new Date();
    const fechaFormateada = fecha.toISOString().slice(0, 10);


    tokenk.findOne({ where: { createdAt: fechaFormateada } }).then(getTableTokenk => {
      
        // resolve("se esta validando")
        if (getTableTokenk != null) {

          jwt.verify(body.token.toString(), getTableTokenk.tkey, function(err, decoded) {
            if (err) {
              resolve(err)
            }
            else {
              decoded.status="ok"
              resolve(decoded)
            }

          })

          resolve("se esta validando")

        }


      })
      .catch(err => {
        reject(err)

      })
  })

  return data

}


module.exports = {
  token: token,
  validate: validateToken
}
