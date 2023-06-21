const express = require("express");
const routerAddress = express.Router();

//sequelize
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

var config = require("./config.json");
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);


//
const { Province, City, Code } = require("./model/address");



const getProvince = async (req, res) => {
  var result = await new Promise( (resolve, reject) => {
      Province.findAll().then( res => {
          resolve(res)
        }).catch( err => {
          resolve(err)
        })
  })
  
  return res.send(result)
}


const getCity = async (req, res) => {
  var result = await new Promise( (resolve, reject) => {
      City.findAll({
          where: {
            [Op.or]: [
              { value: { [Op.iLike]: `${req.params.city}%` } }
            ],
          }
        }).then( res => {
          resolve(res)
        }).catch( err => {
          resolve(err)
        })
  })
  
  return res.send(result)
}


const getCode = async (req, res) => {
  var result = await new Promise( (resolve, reject) => {
      Code.findAll({
          where: {
            [Op.or]: [
              { municipio_id: { [Op.iLike]: `%${req.params.code}%` } }
            ],
          }
        }).then( res => {
          resolve(res)
        }).catch( err => {
          resolve(err)
        })
  })
  
  return res.send(result)
}


const getAddressFromCode = async (req, res) => {
  const { code } = req.params

  //optimza
  const _code = await Code.findOne({
      where: { 
        codigo_postal: {
            [Sequelize.Op.endsWith]: code,
        }
      }
  });
  
  if(!_code){
    return res.send('400')
  }
  

  
  const province = _code.municipio_id.substring(0, 2)
    
  const _province = await Province.findOne({
      where: { value: province }
  });
  
    return res.send({
      code: code,
      city: _code.municipio_nombre,
      province: _province.title
    })
}






const saveData = (req, res) => {
  Code.bulkCreate(req.body)
  .then((res) => {
    return res.send('200')
  })
  .catch((error) => {
    return res.send({err: error})
  });
}


routerAddress.post('/save', saveData);



///

routerAddress.get("/province/:province", getProvince);
routerAddress.get("/city/:city", getCity);
routerAddress.get("/code/:code", getCode);

routerAddress.get("/getter/code/:code", getAddressFromCode);



module.exports = routerAddress;
