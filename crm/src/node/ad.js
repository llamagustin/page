const express = require("express");
const routerAd = express.Router();
// const fn = require("./token/fn.js");
const https = require('https');
const axios = require("axios");
axios.defaults.httpsAgent = new https.Agent({ keepAlive: true });
axios.defaults.timeout = 0;

// const { uuid } = require("uuidv4");
const { v4: uuid, validate: valid_uuid } = require('uuid');



//email
const { google } = require("googleapis");
const MailComposer = require("nodemailer/lib/mail-composer");

const credentials = require("./keys/google/credentials_google.json");
const tokens = require("./keys/google/tokens.json");

const { client_secret, client_id, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

const getGmailService = () => {
  const { client_secret, client_id, redirect_uris } = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  oAuth2Client.setCredentials(tokens);
  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
  return gmail;
};

const encodeMessage = (message) => {
  return Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

const createMail = async (options) => {
  const mailComposer = new MailComposer(options);
  const message = await mailComposer.compile().build();
  return encodeMessage(message);
};


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


const getAds = async (req, res) => {
  const {
    q = "",
    status = null,
    perPage = 10,
    currentPage = 1,
    addLimit = false
  } = req.query;
  

  const queryLower = q.toLowerCase();

  var search = {};
  if (status) search.status = status;
  

  if(queryLower){
    search = {
      [Op.or]: [
        { company: { [Op.iLike]: `%${q}%` } },
        { path: { [Op.iLike]: `%${q}%` } },
        { web: { [Op.iLike]: `%${q}%` } },
        { cif: { [Op.iLike]: `%${q}%` } },
        { phone: { [Op.iLike]: `%${q}%` } },
        { email: { [Op.iLike]: `%${q}%` } },
        { 
          [Op.or]: [
            { 'name.name': { [Op.iLike]: `%${q}%` } },
            { 'name.firstSurname': { [Op.iLike]: `%${q}%` } },
            { 'name.secondSurname': { [Op.iLike]: `%${q}%` } }
          ]
        },
        { 
          [Op.or]: [
            { 'address.country': { [Op.iLike]: `%${q}%` } },
            { 'address.city': { [Op.iLike]: `%${q}%` } },
            { 'address.province': { [Op.iLike]: `%${q}%` } },
            { 'address.line': { [Op.iLike]: `%${q}%` } }
          ]
        }
      ]
    }
  }


  const options = {
    where: search,
    order: [
      ["createdAt", "DESC"]
    ],
  };
  
  //
  var response = await new Promise((resolve, reject) => {
      Ad.findAndCountAll(options)
      .then( result => resolve(result) )
      .catch( err => resolve(err) )
  });
  
  var stats = [
    [0, 0], //total leads
    [0, 0], //total acceptado
    [0, 0], //total pendientes
    [0, 0], //total cancelados
  ];


  const { count: countAll, rows: filteredAds } = response;

  for (let i = 0; i < filteredAds.length; i++) {
    switch (filteredAds[i].status) {
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
  
  
  const totalPage = Math.ceil(filteredAds.length / perPage) ?
    Math.ceil(filteredAds.length / perPage) :
    1;
    
  const totalAds = filteredAds.length;

  let newFilteredAds = [];
  if (perPage) {
    const firstIndex = (currentPage - 1) * perPage;
    const lastIndex = perPage * currentPage;

    newFilteredAds = filteredAds.slice(firstIndex, lastIndex);
  }
  
  return res.send({
    ads: newFilteredAds,
    totalPage,
    totalAds,
    stats: stats,
  });
};

const getAd = async (req, res) => {
  const { id } = req.params;
  
  if(!valid_uuid(id)) return res.send('404')
  
  const ad = await new Promise((resolve, reject) => {
    Ad.findOne({
      where: { id: id },
    })
    .then(result => resolve(result))
    .catch(err => resolve(err))
  });

  if (ad.length < 0) return res.send("404");

  return res.send(ad);
};

const addAd = async (req, res) => {
  const { ad } = req.body

  var userData = await new Promise( (resolve, reject) => {
      Ad.create({ ...ad }, {
        password: ad.password
      }).then( result => resolve(result.dataValues))
      .catch( err => resolve(err))
  })
  
  //jwt encode email, id*
  const baseToken = {
    id: userData.id,
    email: userData.email,
    role: userData.role,
  };

  const exp = Math.floor(Date.now() / 1000) + (60 * 60);
  const accessToken = await createToken(baseToken, { expiresIn: exp });

  const userOutData = Object.fromEntries(
    Object.entries(userData).filter(
      ([key, _]) => !(key === "password_id" || key === "abilities")
    )
  );

  const response = {
    userAbilities: userData.abilities,
    accessToken,
    userData: userOutData,
  };
 
  return res.send(response);
};

const deleteAd = async (req, res) => {
    const {id} = req.body
    
    if(!valid_uuid(id)) return res.send('404')
    
    var data = await Ad.destroy({
      where: {
        id: id,
      },
    });
    
    return res.send("200");
};

const sendMail = async (opts) => {
  try {
    let baseUrl = '/var/www/crm/src/assets/email'
    let htmlData = fs.readFileSync(`${baseUrl}${opts?.template}.html`, 'utf-8');
    
    var htmlReplaced = htmlData
    
    if(opts?.data){
      var keys = Object.keys(opts.data)
      
      for(var i = 0; i < keys.length; i++){
        var regex = new RegExp(keys[i], 'g');
        htmlReplaced = await htmlReplaced.replace(regex, opts.data[keys[i]])
      }
    }

    
    let options = {
      to: opts?.email,
      // cc: "eng.carlos.valle@gmail.com",
      replyTo: "no-reply@aythen.com",
      subject: opts?.subject || 'Example subject',
      text: "This email is sent from the command line",
      html: htmlReplaced,
      textEncoding: "base64",
      headers: [
        { key: "X-Application-Developer", value: "Amit Agarwal" },
        { key: "X-Application-Version", value: "v1.0.0.2" },
      ],
    };
    let gmail = await getGmailService();
    let rawMessage = await createMail(options);
    let { data: { id } = {} } = await gmail.users.messages.send({
      userId: "me",
      resource: {
        raw: rawMessage,
      },
    });
    
  }catch (error) {
    // console.log(error)
    return res.send("400");
  }

  return res.send("200");
};

const updAd = async (req, res) => {
  const { id, ...body } = req.body;
  
  if (!valid_uuid(id)) return res.send('404')
  
  var result = await new Promise(async (resolve, reject) => {
    var result = await Ad.update(body, {
      where: { id }
    });
    resolve(result);
  });
  
  if (result == 500) return res.status(200).send({ ok: false });

  return res.status(200).send({ ok: true });
};

const deleteLeadsZip = async (req, res) => {
  const {id} = req.params
  const {zip} = req.body
  
  if(!valid_uuid(id)) return res.send('404')
  
  var sql = `UPDATE aythen.users
              SET reseller = (
                SELECT jsonb_agg(x)
                FROM jsonb_array_elements(reseller) x
                WHERE NOT x->>'id' = 'e52f2000-cd22-425c-a2d5-6a4d6fa9db15'
              )
              WHERE address->>'zip' = '[CÓDIGO POSTAL SELECCIONADO]'
              AND ad @> '[{"id": "${id}"}]'`

  var data = await new Promise( (resolve, reject) => {
    sequelize.query(sql).then(result => {
      resolve(result[0][0])
    });
  })
  
  return res.send('200')
}

const getLeadsZips = async (req, res) => {
  const { id } = req.params

  if (!valid_uuid(id)) return res.send('404')

  var sql = `SELECT jsonb_build_array(jsonb_build_object('value', address->>'zip', 'total', count(*)::integer))
            FROM aythen.users
            WHERE ad @> '[{"id": "${id}"}]'
            GROUP BY address->>'zip';`

  var data = await new Promise((resolve, reject) => {
    sequelize.query(sql).then(result => {
      resolve(result[0][0])
    });
  })
  
  console.log("==============================");
  console.log("====== FETCH LEADS ZIPS ======");
  console.log("==============================");
  console.log(data);
  
  return res.send(data)
  // return res.send({zips: data.jsonb_build_array })
}
  
const getLeads = async (req, res) => {
  const { id } = req.params
  
  if(!valid_uuid(id)) return res.send('404')
  
  const { 
    q = '',
    source=null,
    plan = null,
    status = null,
    perPage = 10,
    currentPage = 1,
    addLimit = false,
    byProvince = '',
    byCity = '',
    byCode = '',
    byZone = '',
    isClient = false,
    verify = null
  } = req.query;
  
  const  queryLower = q.toLowerCase()
  
  var search = {}
  var searchVerify = {}
  var searchStatus = {}
  
  if(isClient=='true') search['status'] =  { [Op.notIn]: [300, 400] }
  if(plan) search[`plan.${plan}.tag`] = plan
  if(byProvince) search[`address.province`] = byProvince
  if(byCity) search[`address.city`] = byCity
  if(byCode) search[`address.zip`] = parseInt(byCode)
  if(source) search[`source`] = source
  
  
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
  
  
  if(verify){
    searchVerify['name.name'] = { [Op.not]: null } 
    searchVerify['company'] = { [Op.not]: null } 
  }
  
  const filters = {
    where: {
      [Op.and]: [{
          [Op.or]: [
            sequelize.literal(`name->> 'name' LIKE '%${queryLower}%' OR name->>'firstSurname' LIKE '%${queryLower}%' OR name->>'secondSurname' LIKE '${queryLower}%'`),
            { email: { [Op.iLike]: `%${queryLower}%` } },
            { phone: { [Op.iLike]: `%${queryLower}%` } },
          ],
      },
      searchVerify,
      searchStatus,
      search,
      ]
    },
    attributes: publicUser,
    order: [ [ 'createdAt', 'DESC' ] ]
  }


  var permision = await new Promise((resolve, reject) => {
    Ad.findAll({ where: { id: id } }).then(result => {
      if(result){
        result[0].abilities.action == 'manage' ? resolve('manage') : resolve('user')
      }
    })
  })

  if (permision == 'manage') {
    var response = await new Promise((resolve, reject) => {
      User.findAll(filters).then(result => {
        resolve(result)
      })
    })
  } else {
    var response = await new Promise((resolve, reject) => {
      sequelize.query(`SELECT DISTINCROW * FROM aythen.users WHERE reseller @> \'[ "${id}" ]\';`)
        .then(result => {
          resolve(result[0])
        });
    })
  }
  
  
  const filteredUsers = response
  const count = filteredUsers.length

  var stats = [
    [0, 0], //total leads
    [0, 0], //total acceptado
    [0, 0], //total pendientes
    [0, 0], //total cancelados
  ];
    
  for (let i = 0; i < filteredUsers.length; i++) {
    switch (filteredUsers[i].status) {
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


  const totalPage = Math.ceil(filteredUsers.length / perPage) ?
    Math.ceil(filteredUsers.length / perPage) :
    1;

  const totalUsers = filteredUsers.length;
  
  let newFilteredUsers = [];
  if (perPage) {
    const firstIndex = (currentPage - 1) * perPage;
    const lastIndex = perPage * currentPage;

    newFilteredUsers = filteredUsers.slice(firstIndex, lastIndex);
  }

  return res.send({ 
    users: newFilteredUsers, 
    totalPage, 
    totalUsers,
    stats: stats
  })

  return res.send(response);
}

const assignLeads = async (req, res) => {
  const { data } = req.body
  
  
  for(var i = 0;i<data.length; i++){
      await User.upsert(data[i])
  }

  return res.send('200')
}

const getAdByEmail = async ({ params }, res) => {
  const { email } = params;
  
  try {
    const ad = await AdServices.getAdByEmail(email);
    if (ad == 404) {
      return res.status(200).send('404');
    }
    else {
      return res.status(200).send(ad);
    }
  }
  catch (error) {
    return res.status(200).send(error)
  }
}


routerAd.get("/list", getAds);

routerAd.get("/:id", getAd);
routerAd.get("/get-by-email/:email", getAdByEmail);


routerAd.get("/:id/leads/zips", getLeadsZips);
routerAd.get("/:id/leads", getLeads);
routerAd.post("/assign/leads", assignLeads);
routerAd.post("/:id/leads/zip/delete", deleteLeadsZip);

routerAd.post("/add", addAd);
routerAd.post("/delete", deleteAd);

routerAd.put("/", updAd);


module.exports = routerAd;
