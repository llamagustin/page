const express = require('express')
const routerCodex = express.Router()

const Sequelize = require('sequelize')
const { Op } = require("sequelize");



const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: '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'
});

const openai = new OpenAIApi(configuration);


var list = async (req, res) => {
    const response = await openai.listEngines();
    return res.send(response.data.data);
}

var sample = async (req, res) => {
    var response = await openai.createCompletion("code-davinci-001", {
      prompt: req.body.code,
      max_tokens: req.body.tokens
    });
    
    return res.send(response.data.choices[0].text);
}




var completion = async (req, res) => {
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



var edit = async (req, res) => {
    try{
        const response = await openai.createEdit("code-davinci-edit-001", {
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



var insert = async (req, res) => {
    try{
        const response = await openai.createEdit("code-davinci-edit-001", {
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





routerCodex.post('/completion', completion)
routerCodex.post('/edit', edit)
routerCodex.post('/insert', insert)



routerCodex.get('/test', sample)
routerCodex.get('/list', list)

module.exports = routerCodex




