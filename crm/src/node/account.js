const express = require("express");
const routerAccount = express.Router();
// const fn = require("./token/fn.js");
const https = require('https');
const axios = require("axios");
axios.defaults.httpsAgent = new https.Agent({ keepAlive: true });
axios.defaults.timeout = 0;

// const { uuid } = require("uuidv4");
const { v4: uuid, validate: valid_uuid } = require('uuid');


const AccountServices = require('./services/account.services')

//tokena auth
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const privateKEY = fs.readFileSync(
  path.resolve(__dirname, "./keys/privateKey.pem"),
  "utf8"
);
const publicKEY = fs.readFileSync(
  path.resolve(__dirname, "./keys/publicKey.pem"),
  "utf8"
);


const secretHashToken = "TokenHash";

const createToken = (payload, customHeaders = {}) => {
  const header = { alg: "HS256", typ: "JWT" };
  return jwt.sign(payload, secretHashToken, { header, ...customHeaders });
};



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

const { Account } = require("./model/account");
const { User, publicUser, Password } = require("./model/user");



var getAccounts = async (req, res) => {
  const {
    q = "",
      role = null,
      plan = null,
      status = null,
      source=null,
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

  if (role) search["role"] = {
    [Op.like]: `%${role}%`
  };
  if (byCity) search["address.city"] = byCity;
   if(source) search[`source`] = source


  const options = {
    where: {
      [Op.and]: [{
          [Op.or]: [{
              fullName: {
                [Op.iLike]: `%${q}%`
              }
            },
            {
              email: {
                [Op.iLike]: `%${q}%`
              }
            },
            {
              phone: {
                [Op.iLike]: `%${q}%`
              }
            },
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
    order: [
      ["createdAt", "DESC"]
    ],
  };
  
  //
  
  if (attributes.length) options.attributes = attributes
  
  
  var response = await new Promise((resolve, reject) => {
        Account.findAndCountAll(options)
        .then( result => resolve(result) )
        .catch( err => resolve(err) )
  });
  
  //leads mes actual y anteiror
  var stats = [
    [0, 0], //total leads
    [0, 0], //total acceptado
    [0, 0], //total pendientes
    [0, 0], //total cancelados
  ];


  const { count: countAll, rows: filteredAccounts } = response;

  for (let i = 0; i < filteredAccounts.length; i++) {

    switch (filteredAccounts[i].status) {
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
  
  
  const totalPage = Math.ceil(filteredAccounts.length / perPage) ?
    Math.ceil(filteredAccounts.length / perPage) :
    1;
    
    // console.log('total page', filteredAccounts.length, parseInt(perPage), 'ee', totalPage)
  const totalAccounts = filteredAccounts.length;

  let newFilteredAccounts = [];
  if (perPage) {
    const firstIndex = (currentPage - 1) * perPage;
    const lastIndex = perPage * currentPage;

    newFilteredAccounts = filteredAccounts.slice(firstIndex, lastIndex);
  }
  

  return res.send({
    accounts: newFilteredAccounts,
    totalPage,
    totalAccounts,
    stats: stats,
  });
};




var getAccount = async (req, res) => {
  // Get event id from URL
  const accountId = req.params.id;
  
  if(!valid_uuid(accountId)) return res.send('404')
  
  const account = await new Promise((resolve, reject) => {
    Account.findOne({
        where: { id: accountId },
      }).then(result => resolve(result))
      .catch(err => resolve(err))
  });

  if (account.length < 0) return res.send("404");

  return res.send(account);
};

var addAccount = async (req, res) => {
  const { account } = req.body
  
  var userData = await new Promise( (resolve, reject) => {
      Account.create({ ...account }, {
        password: account.password
      }).then( result => resolve(result.dataValues))
      .catch( err => resolve(err))
  })
  

  const baseToken = {
    id: userData.id,
    email: userData.email,
    role: userData.role,
  };
  // var tokeen = await getToken(req.body)
  
  const exp = Math.floor(Date.now() / 1000) + (60 * 60);
  const accessToken = await createToken(baseToken, { expiresIn: exp });
  // let newToken = {}; // await fn.token(baseToken)
  // const accessToken = newToken; // userTokens[0]//userTokens[user.id]

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

var deleteAccount = async (req, res) => {
  const { id } = req.body
  
  if(!valid_uuid(id)) return res.send('404')

  var data = await Account.destroy({
    where: {
      id: req.body.id,
    }
  });
  
  return res.send("200");
};

var importAccount = async (req, res) => {
  const { data } = req.body;

  var data_account = await Account.bulkCreate(data, {
    hooks: true,
    ignoreDuplicates: true,
    individualHooks: true,
    password: "1234",
  })
  .then(() => {
    return res.send("200");
  })
  .catch((err) => {
    return res.send(err);
  });
};

const loginAccount = async (req, res) => {
  const { email, password } = req.body;

  var errors = {
    error: ["Something went wrong"],
  };

  const data_account = await new Promise( async (resolve, reject) => {
      var data = await Account.findAll({
        where: {
          email: email,
        },
      });

      if (data.length > 0) {
        resolve(data[0].dataValues);
      }

      errors = {
        error: ["Email is Invalid"],
      };

      resolve([]);
  });

  if (data_account.length == 0) return res.send(errors);

  const data_password = await new Promise( async (resolve, reject) => {
      var data = await Password.findAll({
        where: {
          id: data_account.password_id,
          data: password,
        },
      });

      if (data.length > 0) resolve(data[0].dataValues);

      errors = {
        error: ["Password is Invalid"],
      };

      resolve([]);
  });

  if (data_password.length == 0) return res.send(errors);
  try {
    // We are duplicating user here
    const userData = { ...data_account };

    //jwt encode email, id*
    const baseToken = {
      id: userData.id,
      email: userData.email,
      role: userData.role,
    };
    // var tokeen = await getToken(req.body)
    //let newToken = await fn.token(baseToken);
    let newToken = {}; // await fn.token(baseToken)
    const accessToken = newToken; // userTokens[0]//userTokens[user.id]

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
  }
  catch (e) {
    errors = { email: e };
    return res.send(errors);
  }
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
    
  }
  catch (error) {
    // console.log(error)
    return res.send('400')
  }

  return res.send('200');
};

const sendPasswordAccount = async (req, res) => {
  const email = req.body.email;

  var data_account = await new Promise( async (resolve, reject) => {
        var data = await Account.findAll({
          where: {
            email: email,
          },
        });
        if (data.length > 0) resolve(data[0].dataValues);
        resolve(404);
  });


  const exp = Math.floor(Date.now() / 1000) + (60 * 60); // 1 hour in seconds
  const token = createToken({id: data_account.id, email: data_account.email }, { expiresIn: exp })
  
  const _token = {
    email: data_account.email,
    data: token
  }

  // return res.status(200).send(token);

  if (data_account?.id) {
    let opts = {
      template: '/lead/no-reply/mail-reset-password',
      email: data_account.email,
      subject: 'Aythen | Reset Password 🔐',
      data: {
        aythen_id: data_account.id,
        aythen_email: data_account.email,
        aythen_fullName: data_account.name?.name + ' ' + data_account.name?.firstSurname + ' ' + data_account.name?.secondSurname,
        aythen_token: btoa(JSON.stringify(_token))
      }
    }
    

    const data = await sendMail(opts);

    return res.status(200).send('200');
  }else {
    return res.status(404).send('404');
  }
};

const updAccount = async (req, res) => {
  let data = req.body;
  
  var result = await new Promise( async (resolve, reject) => {
        var result = await Account.update(req.body, { 
          where: { id: data.id } 
        });
        
        resolve(result);
  });
  
  if (result == 500) return res.status(200).send({ ok: false });

  return res.status(200).send({ ok: true });
};

const savePasswordAccount = async (req, res) => {
  const { password, token } = req.body;
  
  let infoToken = await jwt.decode(token, secretHashToken);
  
  var data_account = await new Promise( async (resolve, reject) => {
      var data = await Account.findAll({
        where: {
          email: infoToken.email,
        },
      });

      if (data.length > 0) resolve(data[0].dataValues);

      errors = {
        error: ["Email is Invalid"],
      };

      resolve(404);
  });
  // }
  // else data_account = 404;
  // )
  if (data_account == 404) return res.send('404');

  // console.log("Continuar asignando password");

  var data = await new Promise(async (resolve, reject) => {
    var data = await Password.upsert({
      id: data_account.password_id,
      data: req.body.password,
    });
    
    resolve(data);
  });

  return res.send("200");
};

const updatePasswordAccount = async (req, res) => {
  var { password, token } = req.body;

  await Password.update({ data: password }, { 
    where: { id: token } 
  });

  return res.status(200).send({ ok: true });
};

const showPasswordAccount = async (req, res) => {
  const { email, token } = req.body;

  // if (token !== "1c33c943-1c94-4f29-9dda-1a1d0b6565ca") return res.send('not authentication')
  // let validation = await fn.validate(req.body);
  let validation = {status: "ok"}

  // fn.validate(req.body.token)
  if (validation.status == "ok") {
    const data_account = await new Promise( async (resolve, reject) => {
        var data = await Account.findAll({
          where: {
            email: email,
          },
        });

        if (data.length > 0) {
          resolve(data[0].dataValues);
        }

        errors = {
          email: {
            error: ["Email is Invalid"],
          },
        };

        resolve([]);
    });

    if (data_account.length == 0) return res.send(errors);

    const password = await new Promise( async (resolve, reject) => {
        var data = await Password.findAll({
          where: {
            id: data_account.password_id,
          },
        });

        resolve(data[0].dataValues.password);
    });

    return res.send("Password: " + password);
  }
  else {
    return res.send("not authentication");
  }
};

async function getToken(body) {
  var data = JSON.stringify({
    email: body.email,
    password: body.password,
  });
  
  let resToken = "";
  var config = {
    method: "post",
    url: "https://api.aythen.com/token/token",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  resToken = await axios(config).then(function(response) {
    return JSON.stringify(response.data);
  })
  .catch(function(error) {
    console.log(error);
  });
  
  return resToken;
}



const deleteLeadsZip = async (req, res) => {
  const {zip} = req.body
  
  var sql = `UPDATE aythen.users
SET reseller = (
  SELECT jsonb_agg(x)
  FROM jsonb_array_elements(reseller) x
  WHERE NOT x->>'id' = 'e52f2000-cd22-425c-a2d5-6a4d6fa9db15'
)
WHERE address->>'zip' = '[CÓDIGO POSTAL SELECCIONADO]'
AND reseller @> '[{"id": "e52f2000-cd22-425c-a2d5-6a4d6fa9db15"}]'`

  var data = await new Promise( (resolve, reject) => {
    sequelize.query(sql).then(result => {
      resolve(result[0][0])
    });
  })
  
  return res.send('200')
}


const getLeadsZips = async (req, res) => {
  var sql = `SELECT jsonb_build_array(jsonb_build_object('value', address->>'zip', 'total', count(*)::integer))
FROM aythen.users
WHERE reseller @> '[{"id": "e52f2000-cd22-425c-a2d5-6a4d6fa9db15"}]'
GROUP BY address->>'zip';`  
  
  var data = await new Promise( (resolve, reject) => {
    sequelize.query(sql).then(result => {
      resolve(result[0][0])
    });
  })
  
  return res.send({zips: [] })
  // return res.send({zips: data.jsonb_build_array })
}
 /// 
const getLeads = async (req, res) => {
  const { id } = req.params
  
  if(!valid_uuid(id)) return res.send('400')
  
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
    verify = null,
    leadId = null
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
  if(leadId) search[`id`] = leadId
  
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
      [Op.and]: [
        {
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
    Account.findAll({
      where: { id: id }
    }).then(result => {
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
      // sequelize.query(`SELECT DISTINCROW * FROM aythen.users WHERE reseller @> \'[ "${id}" ]\';`)
      sequelize.query(`SELECT DISTINCT * FROM aythen.users WHERE reseller @> '[ "${id}" ]';`)
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
  // var result = await new Promise( (resolve, reject) => {
  //   sequelize.authenticate().then(async () => {
  //     var data_account = await User.upsert(data[0])
  //       .then(() => {
  //         resolve("200");
  //       }).catch((err) => {
  //         resolve(err)
  //       });
  //   })
  //   .catch((err) => {
  //     resolve(err)
  //   });
  // })
  
  
  // console.log('result', result, data[0].reseller)
  return res.send('200')
}


const getAccountByEmail = async ({ params }, res) => {
  const { email } = params;
  try {
    const account = await AccountServices.getAccountByEmail(email);

    if (account == 404) {
      return res.status(200).send('404');
    }
    else {
      return res.status(200).send(account);
    }
  }
  catch (error) {
    return res.status(200).send(error)
  }
}

const addDeviceAccount = async (req, res) => {
  const {id, device} = req.body
  
  if(!valid_uuid(id)) return res.send('400')

  const account = await Account.findByPk(id);
  if(account){
    var devices = [...account.devices];
    devices.push(device);
    
    await account.update({devices});
  }
  return res.status(200).send({msg: "save device"});
}



const deleteDeviceAccount = async (req, res) => {
  const {id, device} = req.body
  
  if(!valid_uuid(id)) return res.send('400')
  
  console.log(`UPDATE aythen.account
    SET devices = (
      SELECT COALESCE(
        jsonb_agg(d ORDER BY (d->>'id')::uuid),
        '[]'::jsonb
      )
      FROM jsonb_array_elements(devices) d
      WHERE d->>'id' <> '${device}'
    )
    WHERE id = '${id}';`)
  
  var data = await new Promise( (resolve, reject) => {
    sequelize.query(`UPDATE aythen.account
    SET devices = (
      SELECT COALESCE(
        jsonb_agg(d ORDER BY (d->>'id')::uuid),
        '[]'::jsonb
      )
      FROM jsonb_array_elements(devices) d
      WHERE d->>'id' <> '${device}'
    )
    WHERE id = '${id}';`)
    .then(result => {
      resolve(result)
    }).then(err => {
      resolve(err)
    })
  })

  return res.status(200).send('200');
}

const upAbilitiesAccount = async (req, res) => {
  const { id, abilities } = req.body

  if(!valid_uuid(id)) return res.send('400')
  
  // Verificar si la propiedad "action" existe en abilities
  if (!abilities.action) {
    // Si no existe, eliminar la propiedad "action" del campo "abilities" en la base de datos
    var result = await new Promise( (resolve, reject) => {
      sequelize.query(`UPDATE aythen.account SET abilities = abilities - 'action' 
      WHERE id = '${id}' RETURNING abilities;`)
      .then((result) => {
        resolve(200);
      })
      .catch((error) => {
        resolve(error);
      });
    })
  }
  
  
  // Si la propiedad "action" existe, actualizar el campo "abilities" en la base de datos como antes
  var result = await new Promise( (resolve, reject) => {
    sequelize.query(`UPDATE aythen.account SET abilities = CASE
    WHEN abilities IS NULL THEN '${JSON.stringify(abilities)}'::jsonb
    ELSE abilities || '${JSON.stringify(abilities)}'::jsonb
    END WHERE id = '${id}' RETURNING abilities;`)
    .then((result) => {
      resolve(result[0][0].abilities);
    })
    .catch((error) => {
      resolve(error);
    });
    
  })

  return res.status(200).send(result)
}

// //Devices
routerAccount.post("/add/devices", addDeviceAccount);
routerAccount.post("/delete/devices", deleteDeviceAccount);

routerAccount.get("/list", getAccounts);

routerAccount.get("/:id", getAccount);
routerAccount.get("/get-by-email/:email", getAccountByEmail);

routerAccount.get("/:id/leads/zips", getLeadsZips);
routerAccount.get("/:id/leads", getLeads);
routerAccount.post("/assign/leads", assignLeads);
routerAccount.post("/:id/leads/zip/delete", deleteLeadsZip);

routerAccount.post("/login", loginAccount);
routerAccount.post("/add", addAccount);
routerAccount.post("/delete", deleteAccount);

routerAccount.post("/import", importAccount);

routerAccount.put("/", updAccount);
routerAccount.put("/abilities", upAbilitiesAccount);
routerAccount.put('/password/update', updatePasswordAccount);

// routerAccount.post("/send-mail/:email", sendEmail);
//reset password
routerAccount.post("/password/send", sendPasswordAccount);
routerAccount.post("/password/save", savePasswordAccount);
routerAccount.post("/password/show", showPasswordAccount);



module.exports = routerAccount;
