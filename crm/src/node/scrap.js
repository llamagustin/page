// const axios = require('axios')
const fs = require('fs');
const fetch = require('node-fetch');


const cheerio = require('cheerio');

const express = require('express')
const routerScrap = express.Router()


const json = require('../../ad.json')



//sequelize
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

var config = require("./config.json");
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password, {
    host: config.host,
    dialect: config.dialect,
  }
);

const { Ad } = require("./model/ad");




//
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function cleanCompanyName(companyName) {
  // Convert everything to lowercase
  let cleanName = companyName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  // Remove commas and periods
  cleanName = cleanName.replace(/[.,]/g, '');
  // Remove corporate acronyms
  cleanName = cleanName.replace(/\b(ltd|llc|inc|corp|co|plc|gmbh|sa|sl|scp|sll|slu|sle)\b/g, '').trim();
  // Replace spaces with hyphens
  cleanName = cleanName.replace(/\s/g, '-');
  return cleanName;
}



// const enterprise = async (url) => {
    
//     var response = await fetch('https://www.empresia.es/empresa/' + url)
//     .then(async result => {
//         return await result.text()
//     }).catch( err => {
//         return []
//     })
    
//     // var data = await response.text();
//     var $ = cheerio.load(response);
    
//     await sleep(500)
    
//     // console.log('eeeee', data)   
    
//     var titles = $('.list-group-item-text').children()
    
//     //address
//     var address = $('p.mt-10').text()
    
//     //socios
//     var _partner = []
//     var partner = $('#ListaRelaciones').children()
//     for(var i = 0; i<partner.length;i++){
//         var p = $(partner[i]).children()
        
//         if(p.length>0){
//             _partner.push($(p[0]).text())
//         }
//     }
    
//     var data = [address, _partner]
//     for(var i = 0; i<titles.length; i++){
//         var title = $(titles[i]).text()
//         data.push(title)
//     }
    
//     return data
// }





const scrapOn = async(req, res) => {
    var company = 'Selectra' //Procter+%26+Gamble+what+is+email+phone
    var q = company + ' what is email and phone' //email + phone
    
    var encodeQ = encodeURIComponent(q)
    // return res.send(encodeQ)
    
    var response = await fetch('https://www.google.com/search?q=' + encodeQ);
    var data = await response.text();
    var $ = cheerio.load(data);
    
    var text = $('body').text()
    
    // Expresiones regulares para buscar correos electrónicos, números de teléfono y sitios web
    const regexEmail = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
    const regexPhone = /(?:\d{3}-\d{3}-\d{4}|\d{2} \d{2} \d{2} \d{2} \d{2}|\(\d{3}\) \d{3}-\d{4}|\d{10})/g;
    const regexWeb = /https?:\/\/[^\s]+/g;
    
    // Array con todos los correos electrónicos, números de teléfono y sitios web encontrados
    const emails = text.match(regexEmail) || [];
    const phones = text.match(regexPhone) || [];
    const webs = text.match(regexWeb) || [];
    
    // Objeto con todos los correos electrónicos, números de teléfono y sitios web ordenados
    const result = { search: q, email: emails, phone: phones, web: webs };
  
    // return res.send(text)
    return res.send(result)
}


const saveOn = (req, res) => {
  

}










routerScrap.get('/test', scrapOn);
routerScrap.get('/save', saveOn);

module.exports = routerScrap



