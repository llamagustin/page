const express = require('express')
const routerTemplate = express.Router(); 
const axios = require('axios')
const { Template } = require("./model/template");
const { Account } = require("./model/account");

let addTemplate = async (req, res) => {
  const template = req.body
  // account.id = uuid
  
  try{
      console.log('aa', template)
      let data = await Template.create(template)
      return res.status(200).send(template);
      //console.log(data)
    }
  catch(err) {
      console.log('eer', err)
      return res.status(404).send(err);
    }
  //  return res.status(200).send(req.body);

};




const getAllTemplates = async (req, res)=>{
    
    const alltemplates = await new Promise((resolve, reject) => {
        Template.findAll({}).then(result => resolve(result)).catch(err=> resolve(err)) 
    })
    
    
    if(alltemplates.length < 0) return res.send("404")
    
    return res.send(alltemplates)
    
    //return res.status(503).send({ok:true})
}

//routerTemplate.get("/template/:id", getTemplate)
routerTemplate.get("/",getAllTemplates)
routerTemplate.post("/add", addTemplate)
module.exports = routerTemplate
