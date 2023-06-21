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
    var ad = []
    
    var num = 523
    var count = 0
    
    for(n = -1;n<num;n++){
        var response = await fetch('https://www.acelerapyme.gob.es/kit-digital/catalogo-digitalizadores?page=' + n);
        var data = await response.text();
        var $ = cheerio.load(data);
        
        var childs = $('.view-content').children()
        
        for(var i = 0;i<childs.length; i++){
            console.log('business (' + count + ') obtenido')
            ad[count] = {}
        // childs.each((i, child) => {
            var child = childs[i]
            var title = $(child).find('.digitalizador--corp__title').text().replace(/[\r\n]/g, '').trim()
            ad[count].business = title
            ad[count].path = cleanCompanyName(title)
            
            
            // ad[count].info = await enterprise(ad[count].path)
            
            // if(business[0] !== ""){
            //     ad[count].address = business[0].trim()
            //     ad[count].partner = business[1]
            //     ad[count].budget = business[3].trim()
            //     ad[count].activity = business[4]
            // }
         
            
            var tools = $(child).find('.field-content').children()
            ad[count].num_tool = tools.length - 2
            
            ad[count].tools = []
            
      
            var _tools = []
            for(var j = 2;j<tools.length; j++){
            // tools.each((j, tool) => {
                var tool = tools[j]
                var title_tool = $(tool).text().replace(/[\r\n]/g, '').trim()
                ad[count].tools[j-2] = title_tool
                
                var web = $(tool).find('a').attr('href')//.replace(/[\r\n]/g, '').trim()
                ad[count].web = web || ''
            }
            
            //
            var business = await enterprise(ad[count].path)
            // if(business !== 400) return res.send({b: ad[count], data: business})
            
            if(business !== 400){
              ad[count].phone = business.phone
              ad[count].text = business.text
              ad[count].cnae = business.cnae
              ad[count].cif = business.cif
              ad[count].social = business.social
              ad[count].budget = business.budget
              ad[count].google = business.google
              ad[count].province = business.province
              ad[count].otorgate = business.otorgate
              ad[count].auditor = business.auditor
              ad[count].propietary = business.propietary
              ad[count].entity = business.entity
              ad[count].date = business.date
              ad[count].agoAt = business.agoAt
            }
            
            
            // ad[count].info = await enterprise(ad[count].path)
            
            count++
        }
    }
    
    var data =  JSON.stringify(ad)
    
    fs.writeFile('/var/www/crm/ad.json', data, function(err) {
      if (err) {
        console.log('Error al escribir el archivo');
      } else {
        console.log('Archivo creado exitosamente');
      }
    });
}


const saveOn = (req, res) => {
  
  // return res.send(json[0])
  const ads = json.map(ad => {
    if(ad.cnae){
      var cnae = parseInt(ad.cnae.match(/^[^-]+/)[0]) || null
    }else {
      var cnae = null
    }
    
    if(ad.budget){
      var budget = parseInt(ad.budget) || null
    }else{
      var budget = null
    }
    
    if(ad.social){
      var social = parseInt(ad.social) || null
    }else{
      var social = null
    }
    
    if(ad.phone){
      var phone = parseInt(ad.phone) || null
    }else{
      var phone = null
    }




    console.log('cnae', cnae)
    
    var date = new Date(ad.date)
    if(isNaN(date)){
      date = null
    }
    
    
    return {
  //   company: ad.business,
  //   href: ad.href,
  //   num_tool: ad.num_tool,
  //   tools: ad.tools,
    
  //   address: ad.address_data || '',
  //   partner: ad.partner || [],
  //   acitvity: ad.activity || '',
  //   budget: ad.budget ? convertToNumber(ad.budget) : 0
  // //   note: '',
  // //   rating: ''
      auditor: ad.auditor || '',
      propietary: ad.propietary || '',
      company: ad.business || '',
      path: ad.path || '',
      tools: ad.tools || [],
      description: ad.text || '',
      cif: ad.cif || '',
      web: ad.web || '',
      phone: phone || '',
      otorgate: ad.otorgate || '',
      cnae: cnae,
      google: ad.google,
      budget: budget || 0,
      social: social || 0,
      address: {
        country: '',
        province: ad.province || '',
        city: '',
        line: '',
        latitude: '',
        longitude: ''
      },
      entity: ad.entity || [],
      constitutionAt: date
    }
  });
  
  
  // Ad.bulkCreate(ads)
  //   .then(() => console.log('Ads guardados exitosamente'))
  //   .catch(err => console.error('Error al guardar ads', err));
}


// id
// business => company
// path
// href
// num_tool
// tools
// address_data
// address
// partner
// budget
// activity year

// note
// rating
// createdAt

function convertToNumber(str) {
  const numberString = str.replace('€', '').replace('M', '');
  const number = parseFloat(numberString) * 1000000;
  
  if(isNaN(number)){
    return 0;
  }else{
    return number;
  }
}


function currencyToInt(currencyStr) {
  const regex = /^([\d.,]+)\s*([KMkm]?)(?:\s*€)?/;
  const matches = currencyStr.trim().match(regex);

  if (!matches) {
    return currencyStr
  }

  const value = matches[1].replace(/[,.]/g, function(match) {
    return match === ',' ? '.' : '';
  });
  const suffix = matches[2].toUpperCase();
  const multiplier = { 'K': 1000, 'M': 1000000 }[suffix] || 1;

  const intValue = Math.round(parseFloat(value) * multiplier);
  return intValue;
}




/*
ad[count].business = title
ad[count].path = cleanCompanyName(title)


// ad[count].info = await enterprise(ad[count].path)
var business = await enterprise(ad[count].path)

if(business[0] !== ""){
    ad[count].address = business[0].trim()
    ad[count].partner = business[1]
    ad[count].budget = business[3].trim()
    ad[count].activity = business[4]
}
*/

const enterprise = async (path) => {
    var url = path
    
    var response = await fetch('https://www.empresia.es/empresa/' + url)
    .then(async result => {
        return await result.text()
    }).catch( err => {
        return 404
    })
    
    
    if(response == 404) return 400
    
    // var data = await response.text();
    var $ = cheerio.load(response);
    
    // await sleep(5000)
    
    var path_business = '#page-content > div.col-fluid.page-main > div.list-group.datos-ident > div.list-group-item.active.bl-nosp > div > div.col-sm-8.bl-z > h4'
    var path_phone = '#page-content > div.col-fluid.page-main > div.list-group.datos-ident > div.list-group-item.active.bl-nosp > div > div.col-sm-8.bl-z > p:nth-child(4)'
    var path_web = '#page-content > div.col-fluid.page-main > div.list-group.datos-ident > div.list-group-item.active.bl-nosp > div > div.col-sm-4.bl-z.i-spaces'
    var path_address = '#page-content > div.col-fluid.page-main > div.list-group.datos-ident > div.list-group-item.active.bl-nosp > div > div.col-sm-8.bl-z > p.mt-10'
    var path_google = '#page-content > div.col-fluid.page-main > div.list-group.datos-ident > div.list-group-item.active.bl-nosp > div > div.col-sm-8.bl-z > p.mt-10 > a'
    var path_text = '#page-content > div.col-fluid.page-main > div.list-group.datos-ident > div:nth-child(2) > p'
    var path_cif = '#page-content > div.col-fluid.page-main > div.list-group.datos-ident > div:nth-child(2) > div > div:nth-child(1) > p'
    var path_date = '#page-content > div.col-fluid.page-main > div.list-group.datos-ident > div:nth-child(2) > div > div:nth-child(2) > p'
    var path_agoAt = '#page-content > div.col-fluid.page-main > div.list-group.datos-ident > div:nth-child(2) > div > div:nth-child(3) > p'
    var path_social = '#page-content > div.col-fluid.page-main > div.list-group.datos-ident > div:nth-child(2) > div > div:nth-child(4) > p'
    var path_budget = '#page-content > div.col-fluid.page-main > div.list-group.datos-ident > div:nth-child(2) > div > div:nth-child(5) > p > span'
    var path_province = '#page-content > div.col-fluid.page-main > div.list-group.datos-ident > div:nth-child(2) > div > div:nth-child(6) > p'
    var path_otorgate = '#page-content > div.col-fluid.page-main > div.list-group.datos-ident > div:nth-child(3) > div > div:nth-child(1) > p'
    var path_auditor = '#page-content > div.col-fluid.page-main > div.list-group.datos-ident > div:nth-child(3) > div > div:nth-child(2) > p > a'
    var path_propietary = '#page-content > div.col-fluid.page-main > div.list-group.datos-ident > div:nth-child(3) > div > div:nth-child(3) > p > a'
    var path_img = '#mapa-vinculaciones'
    var path_entity = '#ListaRelaciones'
    
    //
    var business = $(path_business).text()
    
    if(!business) return 400
    
    
    var phone = $(path_phone).text().replace(/\s{2,}/g, ' ').trim().split(' ')
    if(phone.length !== 0) phone = phone[0]
    if(phone == 'C/') phone = null
    
    var web = $(path_web).text().trim()
    var index = web.indexOf("[")
    var web = web.slice(0, index - 2) 
    if(!web) web = null
    
    var google = $(path_google).attr('href')
    
    var text = $(path_text).text().split('CNAE')[0]
    
    // console.log('business', $(path_text).text())
    
    if($(path_text).text().split('CNAE').length > 1){
      var cnae = $(path_text).text().split('CNAE')[1].trim()
    }else{
      var cnae = null
    }
    
    
    var cif = $(path_cif).text()
    if(cif == 'no disponible') cif = null
    
    var date = $(path_date).text()
    
    var agoAt = $(path_agoAt).text()
    
    var social = currencyToInt($(path_social).text())
    
    var budget = currencyToInt($(path_budget).text())
    
    var province = $(path_province).text()
    
    var otorgate = $(path_otorgate).text()
    
    var auditor = $(path_auditor).text()
    
    var propietary = $(path_propietary).text()
    if(!propietary){
      propietary = auditor
      auditor = null
    }
    
    
    var img = await new Promise( (resolve, reject) => {
      const img = 'https://www.empresia.es' + $(path_img).attr('src') 
      
      fetch(img).then(res => res.buffer())
      .then(buffer => resolve(buffer.toString('base64')))
      .catch(err => resolve(404));
    })
    
    var entity = await new Promise( async (resolve, reject) => {
        var arr = []
        
        var entities = $(path_entity).children()
        for(var i = 0; i<entities.length; i++){
          var name = $(entities[i]).find('a').text().split('/')[0].slice(0, -2)
          var path = 'https://www.empresia.es' + $(entities[i]).find('a').attr('href')
          
          var data = await fnEntity(path)
          console.log('('+i+') Entidad encontrada')
          
          if(data !== 400){
            arr[i] = {
              name,
              path,
              charge: data.charge,
              business: data.business
            }
          }
        }
        // })
        
        resolve(arr)
    })
    
  
    
    //
    const ad = {
      business,
      phone,
      web,
      google,
      text,
      cnae,
      cif,
      date,
      agoAt,
      social,
      budget,
      province,
      otorgate,
      auditor,
      propietary,
      entity,
      img,
    }
    
    return ad
    
}

const fnEntity = async (path) => {
  var response = await fetch(path)
    .then(async result => {
        return await result.text()
    }).catch( err => {
        return 404
    })
  
  
  console.log('loading..')
    
  if(response == 404) return 400
  
  
  
  var $ = cheerio.load(response);
  var data = {}
  
  var path_num_charge_active = '#spanCargosActivos'
  var path_num_charge_inactive = '#spanCargosInActivos'
  var path_num_charge_business = '#spanTotalEmpresas'
  var path_entity = '#ListaRelaciones'
  
  var arr = []
  
  var entities = $(path_entity).children()
  
  for(var i = 0; i<entities.length; i++){
    var name = $(entities[i]).find('a').text().split('/')[0].slice(0, -2)
    var path = 'https://www.empresia.es' + $(entities[i]).find('a').attr('href')
    arr[i] = {
      name,
      path
    }
  }
  
  
  var data = arr.filter(
    (empresa, index) => arr.findIndex((e) => e.name === empresa.name && e.path === empresa.path) === index
  );

  return {
    business: data,
    charge: {
      active: parseInt($(path_num_charge_active).text()),
      inactive: parseInt($(path_num_charge_inactive).text()),
      business: parseInt($(path_num_charge_business).text())
    }
  }
  
}


routerScrap.get('/test', scrapOn);
routerScrap.get('/save', saveOn);

module.exports = routerScrap



