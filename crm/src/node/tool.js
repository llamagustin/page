const express = require("express");
const routerTool = express.Router();


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



const { Tool } = require("./model/tool");



const saveData = (req, res) => {
  console.log('rr', req.body)
  Tool.bulkCreate(req.body)
  .then((res) => {
    return res.send('200')
  })
  .catch((error) => {
    console.log('err', error)
    return res.send({err: error})
  });
}



///////////////////////

const fetchsTool = async (req, res) => {
  const { 
    q = '',
    plan = null,
    status = null
  } = req.query
  
  //if exist
  var search = {}
  //if(status) search['status'] = status 
  
  var tools = await new Promise((resolve, reject) => {
        sequelize.authenticate()
        .then( async () => {
            var data = await Tool.findAll({
              where: {
                [Op.and]: [{
                    [Op.or]: [
                      { title: { [Op.iLike]: `%${q}%` } }
                    ],
                },
                search,
                /*{
                    address: {
                      province: {
                        [Op.iLike]: `%${byProvince}%`,
                      }
                    }
                }*/]
              },
              order: [ [ 'createdAt', 'DESC' ] ]
            })
            
            resolve(data)
        })
        .catch(err => {
          console.log('err', err)
           return res.send('404')
        })
  })
  
  
  return res.send(tools)

}
const fetchTool = async (req, res) => {
  const query = req.params.id

  let tool = await new Promise((resolve, reject) => {
    Tool.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } }
        ],
      }
    }).then( res => {
      resolve(res)
    }).catch( err => {
      resolve(err)
    })
  })

  return res.send(tool)
}
const updateTool = async (req, res) => {
  const tool = req.body
    sequelize.authenticate()
      .then( async () => {
          var data = await Tool.upsert( tool );
          
          return res.status(200).send(data)
      })
      .catch(err => {
         return res.status(500).send(err)
      })
}
const postTool = async (req, res) => {
    const tool = req.body
    sequelize.authenticate()
      .then( async () => {
          var data = await Tool.create( tool );
          
          return res.status(200).send(data)
      })
      .catch(err => {
         return res.status(500).send(err)
      })
}
const deleteTool = async (req, res) => {
    const { id } = req.body
    
    var res = await new Promise( (response, resolve) => {
        Tool.destroy({ //offset
            where: {
                id: id
            }
        }).then((res) => { //10ms
            //return res.send({err: error})
            resolve(res)
        }).catch((error) => {
            //return res.send({err: error})
            resolve(error)
        });
    })
    
    return res.send(res)
}









routerTool.post("/save", saveData);

//
routerTool.get("/", fetchsTool);
routerTool.get("/:id", fetchTool);

routerTool.post("/:id", updateTool);
routerTool.post("/", postTool);

routerTool.post("/:id/delete", deleteTool);

module.exports = routerTool;
