const express = require('express')
const routerForm = express.Router()

const Sequelize = require('sequelize')
const { Op } = require("sequelize")

const { v4: uuid, validate: valid_uuid } = require('uuid');



var config = require('./config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
})


const { Account } = require('./model/account')
const { Form } = require('./model/form')
// const { FormLeads } = require('./model/form-leads.model')
// const { FormTeams } = require('./model/form-teams.model')
// const { FormTools } = require('./model/form-tools.model')

const paginateArray = (array, perPage, page) => array.slice((page - 1) * perPage, page * perPage)


//
var getForms = async (req, res) => {
      const { 
        q = '', 
        status = null, 
        perPage = 0, 
        currentPage = 1, 
        startDate = '',
        endDate = '',
        addLimit = false,
        isClient = false,
      } = req.query 
      
      const { id } = req.params
      
      if(!valid_uuid(id)) return res.send('404')

      const queryLowered = q.toLowerCase()
      // const id = req.query.user_id || 'c82c5d22-68f8-49ae-a464-e3aadb8383cd'
      
      
      var permision = await new Promise((resolve, reject) => {
        Account.findAll({
          where: { id: id },
        }).then(result => {
          if (result) {
            let hasManageAll = result[0].abilities.action == 'manage' ? resolve('manage') : resolve('user')
          }
        })
      })
      
      
      
      
      var search = {}
      var searchStatus = {}
      
      if(isClient=='true') search['status'] =  { [Op.notIn]: [300, 400] }
      // if(plan) search[`plan.${plan}.tag`] = plan
      // if(byProvince) search[`address.province`] = byProvince
      // if(byCity) search[`address.city`] = byCity
      // if(byCode) search[`address.zip`] = parseInt(byCode)
      // if(source) search[`source`] = source
      
      if(status){
        switch (status) {
          case '2':
            var searchStatus =  [{status: { [Op.gte]: 200}}, {status: { [Op.lt]: 300}}]; break;
          case '3':
            var searchStatus =  [{status: { [Op.gte]: 300}}, {status: { [Op.lt]: 400}}]; break;
          case '4':
            var searchStatus =  [{status: { [Op.gte]: 400}}, {status: { [Op.lt]: 500}}]; break;
          default:
            var searchStatus = { status: status }
            break;
        }
      }
  
      const filters = {
        where: {
          [Op.and]: [{
              [Op.or]: [
                // { email: { [Op.iLike]: `%${queryLowered}%` } },
                // { phone: { [Op.iLike]: `%${queryLowered}%` } },
              ],
          },
          // searchStatus,
          // search,
          ]
        },
        order: [ [ 'createdAt', 'DESC' ] ]
      }
      if (addLimit) {
        filters.limit = perPage;
      }
  
      
      
      // if(permision){
      // }
         var response = await new Promise((resolve, reject) => {
            Form.findAll().then(result => {
              resolve(result)
            })
          })
      

    
    const totalPage = Math.ceil(response.length / perPage) ? Math.ceil(response.length / perPage) : 1
    const totalForms = response.length

    return res.send({ 
        forms: paginateArray(response, perPage, currentPage),
        totalPage, 
        totalForms 
    })
}



var getFormId = async (req, res) => {
    const {id} = req.params 
    
    if(!valid_uuid(id)) return res.send('404')

    var data = await Form.findAll({
        where: {
            id: req.params.id,
        }, 
        limit: 1,
        order: [ [ 'createdAt', 'DESC' ] ]
    })
    
    if(data.length == 0){
      return res.send('404')
    }else{
      return res.status(200).send(data[0])
    }
}


var deleteForm = async (req, res) => {
    const { id } = req.body
    
    if(!valid_uuid(id)) return res.send('404')
    
    var data = await Form.destroy({
      where: {
        id: id
      }
    })
      
    return res.send('200')
}

var updateForm = async (req, res) => {
  const {id} = req.body;
  
  if(!valid_uuid(id)) return res.send('404')


  var data = await Form.upsert( form,{
    where:{id:form.id}
  });
  
  return res.status(200).send(data[0]) 
}


var postForm = async (req, res) => {
  const { form  } = req.body;

  var data = await Form.upsert(form)
  return res.status(200).send(data[0])
}




routerForm.get('/:id/all', getForms);
routerForm.get('/:id', getFormId);

routerForm.post('/', postForm);
routerForm.put('/', updateForm);
routerForm.post('/delete', deleteForm);



module.exports = routerForm











