const express = require("express");
const routerApi = express.Router();
// const fn = require("./token/fn.js");
const https = require('https');
const axios = require("axios");
axios.defaults.httpsAgent = new https.Agent({ keepAlive: true });
axios.defaults.timeout = 0;

const { uuid } = require("uuidv4");


const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: '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'
});

const openai = new OpenAIApi(configuration);



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

const { Api } = require("./model/api");

const generateApi = async (title) => {
  var prompt = `Generate documentatin following this promp return json about "api documentation ${title}", with same variable and contain in spanish:
  1. title => min 10 words
  2. brand => min 10 words
  3. url => url documentation oficial
  4. updatedAt (timestamp) => fecha de ultima actualizacion
  5. pegi
  6. subtitle => min 10 words
  7. description => min 200 words
  8. about => min 100 words
  9. price (float4)
  10. rating (float4)
  11. downloads (int8)
  12. reviews (int8)
  13. category (['']::jsonb) => min 5 category`

  
    try{
        const response = await openai.createCompletion({
          "model": "text-davinci-003",
          "prompt": prompt,
          "max_tokens": 700,
          "temperature": 0.7,
          "top_p": 1,
          "n": 1,
          "stream": false,
          "logprobs": null,
          // "stop": "\n"
        });
                      
        console.log('r', response.data)
        console.log('res', JSON.parse(response.data.choices[0].text))
        var data = JSON.parse(response.data.choices[0].text)
        //data.category = JSON.parse(data.category)
        
        return data
    }catch (error) {
      console.log('e', error)
      if (error.response) {
        return error.response.data;
      } else {
        return error.message;
      }
    }
}


var getApiTitles = async (req, res) => {
    try{
        const prompt = `Devuelveme 10 nombre de APIs random en un array de objetos en formato json como el siguiente:
        1.title
        2.slug`
          
        const response = await openai.createCompletion({
          "model": "text-davinci-003",
          "prompt": prompt,
          "max_tokens": 1000,
          "temperature": 0.7,
          "top_p": 1,
          "n": 1,
          "stream": false,
          "logprobs": null,
          // "stop": "\n"
        });
                      
        console.log('res', response.data.choices[0].text)
        var data = JSON.parse(response.data.choices[0].text.replace(/[\t\n\s]+/g, ""))
        // var data = response.data.choices[0].text
        //data.category = JSON.parse(data.category)
        
        return res.send(data)
    }catch (error) {
      console.log('err', error)
      if (error.response) {
        return res.send(error.response.data);
      } else {
        return res.send(error.message);
      }
    }
}



var getApis = async (req, res) => {
  const {
    q = "",
    role = null,
    plan = null,
    status = null,
    perPage = 10,
    currentPage = 1,
    addLimit = false,
    byProvince = '',
    byCity = null,
    attributes = []
  } = req.query;
  
  
  const queryLower = q.toLowerCase();

  var search = {};
  if (status) search.status = status;
    
  if (role)  search["role"] = {[Op.like]: `%${role}%`};
  if (byCity)  search["address.city"] = byCity;
  

  const options = {
    where: {
      [Op.and]: [
        {
          [Op.or]: [
            { fullName: { [Op.iLike]: `%${q}%` } },
            { email: { [Op.iLike]: `%${q}%` } },
            { phone: { [Op.iLike]: `%${q}%` } },
          ],
        },
        search,
        {
          address: {
            province: {
              [Op.iLike]: `%${byProvince}%`,
            }
          }
        },
      ],
    },
    order: [["createdAt", "DESC"]],
  };
  if (addLimit) {
    options.limit = perPage;
  }
  if(attributes.length) options.attributes = attributes
  var response = await new Promise((resolve, reject) => {
    sequelize
      .authenticate()
      .then(async () => {
        const data = await Api.findAndCountAll(options)
        resolve(data);
      })
      .catch((err) => {
        return res.send("404");
      });
  });
  
  //return res.send(filteredUsers)
  //let filteredUsers = users.filter(user => ((user.fullName.toLowerCase().includes(queryLower) || user.email.toLowerCase().includes(queryLower)) && user.role === (role || user.role) && user.currentPlan === (plan || user.currentPlan) && user.status === (status || user.status))).reverse()

  //leads mes actual y anteiror
  var stats = [
    [0, 0], //total leads
    [0, 0], //total acceptado
    [0, 0], //total pendientes
    [0, 0], //total cancelados
  ];
  // console.log(response)
  // return res.status(200).send('Cool!')
  const { count: countAll,  rows: filteredApis } = response;
  let fechaActual = new Date();
  let mesActual = fechaActual.getMonth();
  let mesAnterior = mesActual - 1;
  for (let i = 0; i < filteredApis.length; i++) {
    let fechaCuenta = new Date(filteredApis[i].createdAt);
    let mesCuenta = fechaCuenta.getMonth();
    switch (filteredApis[i].status) {
      case 200: //aceptado
        ++stats[1][0];
        break;
      case 300: //pendiente
        ++stats[2][0];
        break;
      case 400: //cancelado
        ++stats[3][0];
        break;
    }
    ++stats[0][0];
  }
  const totalPage = Math.ceil(filteredApis.length / perPage)
    ? Math.ceil(filteredApis.length / perPage)
    : 1;
  const totalApis = filteredApis.length;
  
  let newFilteredApis = [];
  if (perPage) {
    const firstIndex = (currentPage - 1) * perPage;
    const lastIndex = perPage * currentPage;

    newFilteredApis = filteredApis.slice(firstIndex, lastIndex);
  }

  return res.send({
    apis: newFilteredApis,
    totalPage,
    totalApis: countAll,
    stats: stats,
  });
};




var getApi = async (req, res) => {
  const slug = req.params.slug;
  
  var api = await new Promise( async (resolve, reject) => {
        Api.findOne({
          where: { slug: slug },
        }).then( result => resolve(result))
        .catch( err => resolve(err))
  });
  
 
  if(!api){
      var api = await new Promise( async (resolve, reject) => {
        var prompt = await generateApi(slug)
        //console.log('prompt: ', prompt)
        
        prompt.slug = slug
        
        Api.upsert(prompt).then( result => resolve(result[0]))
        .catch( err => resolve(err) )
      })
  }

  return res.send(api);

};

var postApi = async (req, res) => {
  const { api } = req.body
  // api.id = uuid

  sequelize
    .authenticate()
    .then(async () => {
      var data = await Api.create({...api}, {
        password: api.password
      })
      return res.status(200).send(data);
    })
    .catch((err) => {
      console.log('eer', err)
      return res.status(200).send(err);
    });
  //  return res.status(200).send(req.body);
};

var deleteApi = async (req, res) => {
  sequelize
    .authenticate()
    .then(async () => {
      var data = await Api.destroy({
        where: {
          id: req.body.id,
        },
      });

      return res.send("200");
    })
    .catch((err) => {
      return res.send(err);
    });
};




routerApi.get("/", getApis);
routerApi.get("/random", getApiTitles);
routerApi.get("/:slug", getApi);


routerApi.post("/", postApi);
routerApi.post("/delete", deleteApi);


module.exports = routerApi;
