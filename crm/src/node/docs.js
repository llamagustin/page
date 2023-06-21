const express = require('express')
const routerDocs = express.Router()




//sequelize 
const Sequelize = require('sequelize')
const { Op } = require("sequelize");

var config = require('./config.json')
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
})


const { Doc } = require('./model/doc')

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: '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'
});

const openai = new OpenAIApi(configuration);


var codexList = async (req, res) => {
    const response = await openai.listEngines();
    return res.send(response.data.data);
}

var codexCreater = async (req, res) => {
    var response = await openai.createCompletion("text-davinci-003", {
      prompt: req.body.code,
      max_tokens: req.body.tokens
    });
    
    return res.send(response.data.choices[0].text);
}

var codexCompletion = async (req, res) => {
    try{
        const response = await openai.createCompletion("text-davinci-002", {
          prompt: req.body.input,
          //instruction: 'Fill in the [insert]',
          max_tokens: req.body.max_tokens,
          temperature: req.body.temperature,
          /*
          
          top_p: 1,
          n: 1,
          stream: false,
          logprobs: null,
          stop: '\n'
          */
        });
        
        console.log('res', response.data)
        
        return res.send(response.data.choices[0].text);
    }catch (error) {
      if (error.response) {
        return res.send(error.response.data);
      } else {
        return res.send(error.message);
      }
    }
}

var codexModifier = async (req, res) => {
    try{
        const response = await openai.createEdit("text-davinci-003", {
          input: req.body.input,
          instruction: req.body.instruction
        });
        
        return res.send(response.data.choices[0].text);
    }catch (error) {
      if (error.response) {
        return res.send(error.response.data);
      } else {
        return res.send(error.message);
      }
    }
}

var codexEditer = async (req, res) => {
    try{
        const response = await openai.createEdit("text-davinci-edit-001", {
          input: req.body.input,
          instruction: 'Fill in the [insert]',
          temperature: req.body.temperature
        });
        
        return res.send(response.data.choices[0].text);
    }catch (error) {
      if (error.response) {
        return res.send(error.response.data);
      } else {
        return res.send(error.message);
      }
    }
}



///

var getDoc = async (req, res) => {
    // Get event id from URL
  const docId  = req.params.id
  const { version } = req.query
  
  var search = ''
  if(version){
    search['version'] = { [Op.like]: `%${version}%` }
  }
  
  const result = await new Promise((resolve, reject) => {
    sequelize.authenticate()
      .then( async () => {
          var data = await Doc.findAll({
            where: {
                  [Op.and]: [{
                      id: docId
                  },
                  search
                  ]
            }
          })
          
          console.log('d', data)
          
          if(data.length > 0){
            resolve(data[0].dataValues)
          }else{
            resolve('404')
          }
      })
  })
  
  return res.status(200).send(result)
  
}


var listDocs = async (req, res) => {
  const result = await new Promise((resolve, reject) => {
    sequelize.authenticate()
      .then( async () => {
          var data = await Account.findAll({
            limit: 20,
            order: [ [ 'createdAt', 'DESC' ] ]
          })
          
          var data = data.map( item => {
              return {
                  title: 'lorem ipsum'
              }
          })
          
          if(data.length > 0){
            resolve(data)
          }else{
            resolve('404')
          }
      })
  })
  
  return res.status(200).send(result)
  
}


var removeDoc = async (req, res) => {
    // Get event id from URL
  const { id }  = req.params.id
  
  const result = await new Promise((resolve, reject) => {
    sequelize.authenticate()
      .then( async () => {
          var data = await Doc.destroy({
            where: {
              id: id
            }
          })
          
          resolve('200')
      }).catch( err => {
          resolve(err)
      })
  })
  
  return res.status(200).send(result)
  
}


var updateDoc = async (req, res) => {
  var { id, version }  = req.body
  
  
  var data = req.body
  data.status = 'update doc'

  
  if(!id){
      id = "418d53f3-1362-42fc-b817-2fbc49f11737"
      data.status = 'new doc'
  }
  
  var search = {}
  if(version) search['version'] = { version: version }
  
  const result = await new Promise((resolve, reject) => {
    sequelize.authenticate()
      .then( async () => {

          var s = await Doc.upsert(data, {
            where: {
                [Op.and]: [{
                      id: id
                  },
                  search
                  ]
            }
          })

          if(s.length > 0){
            resolve(s[0].dataValues)
          }
          
          
      }).catch(err => {
          resolve(err)
      })
  })
  
  
  return res.status(200).send(result)
}




//codex
routerDocs.post('/codex/creater', codexCreater)
routerDocs.post('/codex/modifier', codexModifier)
routerDocs.post('/codex/editer', codexEditer)

routerDocs.get('/codex/completion', codexCompletion)
routerDocs.get('/codex/list', codexList)



//docs
routerDocs.get('/:id', getDoc)
routerDocs.get('/list', listDocs)
routerDocs.post('/remove', removeDoc)
routerDocs.post('/', updateDoc)


module.exports = routerDocs




