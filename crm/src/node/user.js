'use strict'

const fs = require("fs");

const express = require('express')
const routerUser = express.Router()
const { uuid } = require('uuidv4');


//sequelize 
const Sequelize = require('sequelize');
const { Op } = require("sequelize");

var config = require('./config.json')
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
})

const { User, publicUser, Password } = require('./model/user')
const { Account } = require('./model/account')


//
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








const getUsers = async (req, res) => {
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
    fullname = ''
  } = req.query;
  
  const  queryLower = q.toLowerCase()
  
  var search = {}
  
  if(isClient=='true') search['status'] =  { [Op.notIn]: [300, 400] }
  
  if(plan) search[`plan.${plan}.tag`] = plan
  if(byProvince) search[`address.province`] = byProvince
  if(byCity) search[`address.city`] = byCity
  if(byCode) search[`address.zip`] = parseInt(byCode)
  if(source) search[`source`] = source
  
  let searchName = {};
  
  if(fullname) {
    // searchName: {
    //   name: {
    //     [Op.or]: [
    //       { 'name': { [Op.like]: `%${fullname}%` } },
    //       { 'firstSurname': { [Op.like]: `%${fullname}%` } },
    //       { 'secondSurname': { [Op.like]: `%${fullname}%` } }
    //     ]
    //   }
    // }
  }
  var searchStatus = {}
  
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
  

  const options = {
    where: {
      [Op.and]: [{
          [Op.or]: [
            { email: { [Op.iLike]: `%${queryLower}%` } },
            { phone: { [Op.iLike]: `%${queryLower}%` } },
          ],
      },
      searchStatus,
      search,
      searchName
      ]
    },
    attributes: publicUser,
    order: [ [ 'createdAt', 'DESC' ] ]
  }
  
  console.log(options)
  // if (addLimit) {
  //   filters.limit = perPage;
  // }
  
  // var filteredUsers = await new Promise((resolve, reject) => {
  //       sequelize.authenticate()
  //       .then( async () => {
  //           var data = await User.findAll(filters)
  //           resolve(data)
  //       })
  //       .catch(err => {
  //         console.log('err', err)
  //         return res.send(err)
  //       })
  // })
  
  var response = await new Promise((resolve, reject) => {
        User.findAndCountAll(options)
        .then( result => resolve(result) )
        .catch( err => resolve(err) )
  });
  
  
  const { count: countAll, rows: filteredUsers } = response;
  
  
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
  
  
  
  // const totalPage = Math.ceil(filteredUsers.length / perPage) ? Math.ceil(filteredUsers.length / perPage) : 1
  // const totalUsers = filteredUsers.length

  // if (perPage) {
  //   const firstIndex = (currentPage - 1) * perPage
  //   const lastIndex = perPage * currentPage

  //   filteredUsers = filteredUsers.slice(firstIndex, lastIndex)
  // }


  // const rechazados = filteredUsers.filter(u=> u.status==3).length;
  // const pendientes = filteredUsers.filter(u=> u.status==1).length;
  // const aceptados = filteredUsers.filter(u=> u.status==2).length;

  return res.send({ 
    users: newFilteredUsers, 
    totalPage, 
    totalUsers,
    stats: stats
    // metaUser:{
    //   Total:totalUsers,
    //   Cancelados:rechazados,
    //   Pendientes:pendientes,
    //   Aceptados:aceptados
    // }
  })
}


var getUser = async (req, res) => {
  // Get event id from URL
  const userId  = req.params.id
  
  const user = await new Promise((resolve, reject) => {
    sequelize.authenticate()
      .then(async () => {
          const data = await User.findOne({ where: {  id: userId } })
          resolve(data)
      })
  })
  
  Object.assign(user, {
   taskDone: 1230,
    projectDone: 568,
    taxId: 'Tax-8894',
    languaje: 'español',
  });
  
  if(user)
    return res.status(200).send(user)
  else
    return res.sendStatus(404)
}



var addUser = async (req, res) => {
  const user = req.body

  
  sequelize.authenticate()
    .then( async () => {
      console.log('new user: ', user)
      User.create(user, {
        password: user.password
      }).then( data => {
        
        return res.status(200).send(data)
      }).catch(err => {
        return res.status(200).send('500')
      })
    })
    .catch(err => {
      return res.status(200).send('500')
    })
}


var deleteUser = async (req, res) => {
    sequelize.authenticate()
    .then( async () => {
        var data = await User.destroy({
          where: {
            id: req.body.id
          }
        })

    	return res.send('200')
        
    })
    .catch(err => {
       return res.send(err)
    })
}

//
// const twistUser = async (req, res) => {
//   const { zones } = req.body
//   /*
//   {
//     op: 'insert_reseller', code: '0011', num: 1, 
//   }
//   */
//   throw new error();
//   for(var i = 0; i<zones.length; i++){
//       var zone = zones[i]
//       console.log('z', zone)
      
//       await UserTwist.findOne({
//         where: {
//           code: zone
//         }
//       }).then(row => {
//         if (row) {
//           row.update({
//             resellers: row.reseller + 1
//           });
//         } else {
//           UserTwist.create({
//             code: zone,
//             resellers: 1,
//             users: 0,
//             available: true
//           });
//         }
//       });
//   }
  
//   return res.send('200')
// }

// const syncUser = async (req, res) => {
//   //una tabla donde se va a poner

//   return res.send('200')
// }


const updateUser= async(req,res)=>{
  const data = req.body.user;

  // console.log('update put -------------------',data)
  
  sequelize.authenticate()
    .then( async () => {
       var qr = await User.upsert(data,{where:{id: data.id}})
        console.log('eidjuwehdui', qr)
        return res.send({ok:true});
    }).catch(err => {
       return res.send(err)
    })
}



const getAnalytics= async(req,res)=>{
  const { id } = req.params;
 
  let reseller = await Account.findOne({where:{id:id}})
  let ids= reseller.leadassigned;
  
  if(ids.length>0) {
  let leads= await User.findAll({
    where: { id: { [Sequelize.Op.in]: ids } } 
  })
   
  let plans=leads.map(l=> { 
    let p=l.plan
      p.status=l.status;
    return p;
  })
  
  let status={total:0};
  let plansName=["web","crm","social"]
  
  const resumePlan = Object.assign({}, ...plansName.map(plan => ({ [plan]: { accepted: 0, pending: 0, totalMoney:0, pendingMoney:0 } })));
  
  // let resumePlan= {web:{accepted:0,pending:0},crm:{accepted:0,pending:0},social:{accepted:0,pending:0}}
  
  leads.forEach(l=>{ 
    status[l.status] = (status[l.status] || 0) + 1 
    plansName.forEach(pn=>{
      
      resumePlan[pn].totalMoney += l.plan[pn].costo
        
      if(l.status== 200) resumePlan[pn].accepted += 1
      if(l.status== 300) resumePlan[pn].pending += 1
      
    })
  })

  console.log(resumePlan);
    
  } 
  
  let fakeData={
  web:{
    accepted:11,
    pending:6,
    totalMoney: 250,
    pendingMoney: 60
  },
  social:{
    accepted:12,
    pending:4,
    totalMoney: 350,
    pendingMoney: 150
  },
}

  return res.status(200).send(fakeData)
}




const getUserProvinceGenerator = async (req, res) => { 
  const {
    q = "",
    perPage = 10,
    currentPage = 1,
    addLimit = false,
  } = req.query;
  const queryLower = q.toLowerCase();

  var response = await new Promise((resolve, reject) => {
    sequelize
      .authenticate()
      .then(async () => {
          sequelize.query(`SELECT
            lead.address->>'province' AS province,
            COUNT(DISTINCT lead.id) AS count_leads,
            COUNT(DISTINCT reseller.id) AS count_resellers,
            COUNT(DISTINCT CASE WHEN lead.status = 200 THEN 1 ELSE NULL END) AS leads_accepted,
            COUNT(DISTINCT CASE WHEN lead.status = 300 THEN 1 ELSE NULL END) AS leads_pendent,
            COUNT(DISTINCT CASE WHEN lead.status = 400 THEN 1 ELSE NULL END) AS leads_rejected,
            COUNT(DISTINCT CASE WHEN reseller.status = 200 THEN 1 ELSE NULL END) AS resellers_accepted,
            COUNT(DISTINCT CASE WHEN reseller.status = 300 THEN 1 ELSE NULL END) AS resellers_pendent,
            COUNT(DISTINCT CASE WHEN reseller.status = 400 THEN 1 ELSE NULL END) AS resellers_rejected,
            COUNT(*) AS total 
          FROM
            aythen.users AS lead
            LEFT JOIN aythen.account AS reseller
              ON lead.address->>'province' = reseller.address->>'province'
          GROUP BY
            lead.address->>'province';`)
        .then(response => {
          resolve(response[0])
        });
      })
  })
  
  //leads mes actual y anteiror
  var stats = {
    total: 0,
    accepted: 0,
    pendent: 0,
    rejected: 0,
  };
  
  var rows = response
  var count = response.length

  for (let i = 0; i < rows.length; i++) {
    stats.total += parseInt(rows[i].count_leads)
    stats.accepted += parseInt(rows[i].leads_accepted)
    stats.pendent += parseInt(rows[i].leads_pendent)
    stats.rejected += parseInt(rows[i].leads_rejected)
  }
  const totalPage = Math.ceil(rows.length / perPage)
    ? Math.ceil(rows.length / perPage)
    : 1;
  const totalUsers = rows.length;
  
  let newFilteredUsers = [];
  if (perPage) {
    const firstIndex = (currentPage - 1) * perPage;
    const lastIndex = perPage * currentPage;

    newFilteredUsers = rows.slice(firstIndex, lastIndex);
  }

  return res.send({
    users: newFilteredUsers,
    totalPage,
    totalUsers: count,
    stats: stats,
  });
};

const getUserCityGenerator = async (req, res) => {
  const {
    q = "",
    perPage = 10,
    currentPage = 1,
    addLimit = false,
    province
  } = req.query;
  const queryLower = q.toLowerCase();

  var response = await new Promise((resolve, reject) => {
    sequelize
      .authenticate()
      .then(async () => {
          sequelize.query(`SELECT
            lead.address->>'city' AS city,
            COUNT(DISTINCT lead.id) AS count_leads,
            COUNT(DISTINCT reseller.id) AS count_resellers,
            COUNT(DISTINCT CASE WHEN lead.status = 200 THEN 1 ELSE NULL END) AS leads_accepted,
            COUNT(DISTINCT CASE WHEN lead.status = 300 THEN 1 ELSE NULL END) AS leads_pendent,
            COUNT(DISTINCT CASE WHEN lead.status = 400 THEN 1 ELSE NULL END) AS leads_rejected,
            COUNT(DISTINCT CASE WHEN reseller.status = 200 THEN 1 ELSE NULL END) AS resellers_accepted,
            COUNT(DISTINCT CASE WHEN reseller.status = 300 THEN 1 ELSE NULL END) AS resellers_pendent,
            COUNT(DISTINCT CASE WHEN reseller.status = 400 THEN 1 ELSE NULL END) AS resellers_rejected,
            COUNT(*) AS total 
        FROM
            aythen.users AS lead
            LEFT JOIN aythen.account AS reseller ON lead.address->>'city' = reseller.address->>'city'
        WHERE
            lead.address->>'province' = '${province}'
        GROUP BY
            lead.address->>'city';`)
          // sequelize.query(`SELECT
          //   lead.address->>'city' AS city,
          //   COUNT(DISTINCT lead.id) AS count_leads,
          //   COUNT(DISTINCT reseller.id) AS count_resellers,
          //   COUNT(DISTINCT CASE WHEN lead.status = 200 THEN 1 ELSE NULL END) AS leads_accepted,
          //   COUNT(DISTINCT CASE WHEN lead.status = 300 THEN 1 ELSE NULL END) AS leads_pendent,
          //   COUNT(DISTINCT CASE WHEN lead.status = 400 THEN 1 ELSE NULL END) AS leads_rejected,
          //   COUNT(DISTINCT CASE WHEN reseller.status = 200 THEN 1 ELSE NULL END) AS resellers_accepted,
          //   COUNT(DISTINCT CASE WHEN reseller.status = 300 THEN 1 ELSE NULL END) AS resellers_pendent,
          //   COUNT(DISTINCT CASE WHEN reseller.status = 400 THEN 1 ELSE NULL END) AS resellers_rejected,
          //   COUNT(*) AS total 
          // FROM
          //   aythen.users AS lead
          //   LEFT JOIN aythen.account AS reseller
          //     ON lead.address->>'city' = reseller.address->>'city'
          // GROUP BY
          //   lead.address->>'city';`)
        .then(response => {
          resolve(response[0])
        });
      })
  })
  
  //leads mes actual y anteiror
  var stats = {
    total: 0,
    accepted: 0,
    pendent: 0,
    rejected: 0,
  };
  
  var rows = response
  var count = response.length

  for (let i = 0; i < rows.length; i++) {
    stats.total += parseInt(rows[i].count_leads)
    stats.accepted += parseInt(rows[i].leads_accepted)
    stats.pendent += parseInt(rows[i].leads_pendent)
    stats.rejected += parseInt(rows[i].leads_rejected)
  }
  const totalPage = Math.ceil(rows.length / perPage)
    ? Math.ceil(rows.length / perPage)
    : 1;
  const totalUsers = rows.length;
  
  let newFilteredUsers = [];
  if (perPage) {
    const firstIndex = (currentPage - 1) * perPage;
    const lastIndex = perPage * currentPage;

    newFilteredUsers = rows.slice(firstIndex, lastIndex);
  }

  return res.send({
    users: newFilteredUsers,
    totalPage,
    totalUsers: count,
    stats: stats,
  });
};

const getUserCodeGenerator = async (req, res) => {
  const {
    q = "",
    perPage = 10,
    currentPage = 1,
    addLimit = false,
    byCode = '',
    city
  } = req.query;
  const queryLower = q.toLowerCase();

  var response = await new Promise((resolve, reject) => {
    sequelize
      .authenticate()
      .then(async () => {
        
          sequelize.query(`SELECT
              lead.address->>'zip' AS zip,
              COUNT(DISTINCT lead.id) AS count_leads,
              COUNT(DISTINCT reseller.id) AS count_resellers,
              COUNT(DISTINCT CASE WHEN lead.status = 200 THEN 1 ELSE NULL END) AS leads_accepted,
              COUNT(DISTINCT CASE WHEN lead.status = 300 THEN 1 ELSE NULL END) AS leads_pendent,
              COUNT(DISTINCT CASE WHEN lead.status = 400 THEN 1 ELSE NULL END) AS leads_rejected,
              COUNT(DISTINCT CASE WHEN reseller.status = 200 THEN 1 ELSE NULL END) AS resellers_accepted,
              COUNT(DISTINCT CASE WHEN reseller.status = 300 THEN 1 ELSE NULL END) AS resellers_pendent,
              COUNT(DISTINCT CASE WHEN reseller.status = 400 THEN 1 ELSE NULL END) AS resellers_rejected,
              COUNT(*) AS total 
          FROM
              aythen.users AS lead
              LEFT JOIN aythen.account AS reseller ON lead.address->>'zip' = reseller.address->>'zip'
          WHERE
              lead.address->>'city' = '${city}'
          GROUP BY
              lead.address->>'zip';`)
          // sequelize.query(`SELECT
          //   lead.address->>'zip' AS zip,
          //   COUNT(DISTINCT lead.id) AS count_leads,
          //   COUNT(DISTINCT reseller.id) AS count_resellers,
          //   COUNT(DISTINCT CASE WHEN lead.status = 200 THEN 1 ELSE NULL END) AS leads_accepted,
          //   COUNT(DISTINCT CASE WHEN lead.status = 300 THEN 1 ELSE NULL END) AS leads_pendent,
          //   COUNT(DISTINCT CASE WHEN lead.status = 400 THEN 1 ELSE NULL END) AS leads_rejected,
          //   COUNT(DISTINCT CASE WHEN reseller.status = 200 THEN 1 ELSE NULL END) AS resellers_accepted,
          //   COUNT(DISTINCT CASE WHEN reseller.status = 300 THEN 1 ELSE NULL END) AS resellers_pendent,
          //   COUNT(DISTINCT CASE WHEN reseller.status = 400 THEN 1 ELSE NULL END) AS resellers_rejected,
          //   COUNT(*) AS total 
          // FROM
          //   aythen.users AS lead
          //   LEFT JOIN aythen.account AS reseller
          //     ON lead.address->>'zip' = reseller.address->>'zip'
          // GROUP BY
          //   lead.address->>'zip';`)
        .then(response => {
          resolve(response[0])
        });
      })
  })
  
  //leads mes actual y anteiror
  var stats = {
    total: 0,
    accepted: 0,
    pendent: 0,
    rejected: 0,
  };
  
  var rows = response
  var count = response.length

  for (let i = 0; i < rows.length; i++) {
    stats.total += parseInt(rows[i].count_leads)
    stats.accepted += parseInt(rows[i].leads_accepted)
    stats.pendent += parseInt(rows[i].leads_pendent)
    stats.rejected += parseInt(rows[i].leads_rejected)
  }
  const totalPage = Math.ceil(rows.length / perPage)
    ? Math.ceil(rows.length / perPage)
    : 1;
  const totalUsers = rows.length;
  
  let newFilteredUsers = [];
  if (perPage) {
    const firstIndex = (currentPage - 1) * perPage;
    const lastIndex = perPage * currentPage;

    newFilteredUsers = rows.slice(firstIndex, lastIndex);
  }

  return res.send({
    users: newFilteredUsers,
    totalPage,
    totalUsers: count,
    stats: stats,
  });
};


const getUserByEmail = async (req, res) => {
  const { email } = req.params
  const data = await User.findOne({
    where: { 
      email: email 
    }
  })
  
  if(!data) {
    return res.status(200).send({})
  }
 return res.json(data)
}

// var addUser = async (req, res) => {
//   console.log('insert dato')
//   const user = req.body
//   console.log(user);
  
//   sequelize.authenticate()
//     .then( async () => {
//       var data = await User.upsert(user);
//       return res.status(200).send(data)
//     })
//     .catch(err => {
//       console.log(err)
//       return res.status(500).send(err)
//     })
// }

const addUsersBulk = async (req, res) => {
  // const users = req.body
  // console.log('user', users)

  //   console.log('false')
  // await User.bulkCreate(users, { ignoreDuplicates: true })
    
  // return res.status(200).json({msg: "Insert users"});
   const data = req.body
   sequelize
    .authenticate()
    .then(async () => {
      var data_user = await User.bulkCreate(data, {
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
    })
    .catch((err) => {
      return res.send(err);
    });
}




const sendMethodPayment = async (req, res) => {
  console.log('send method paymnet')
    let { email, subject, data } = req.body
  
    let baseUrl = '/var/www/crm/src/assets/email/lead/no-reply/mail-card-payment'
    let htmlData = fs.readFileSync(`${baseUrl}.html`, 'utf-8');
    
    var htmlReplaced = htmlData
    if(data){
      var keys = Object.keys(data)
  
      for(var i = 0; i < keys.length; i++){
        var regex = new RegExp(keys[i], 'g');
        htmlReplaced = await htmlReplaced.replace(regex, data[keys[i]])
      }
    }

    
    let options = {
      to: email,
      // cc: "eng.carlos.valle@gmail.com",
      replyTo: "no-reply@aythen.com",
      subject: subject || 'Example subject',
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


//
routerUser.get("/generator/province", getUserProvinceGenerator);
routerUser.get("/generator/city", getUserCityGenerator);
routerUser.get("/generator/code", getUserCodeGenerator);



routerUser.put('/',updateUser);
// routerUser.post('/twist', twistUser);
// routerUser.post('/sync', syncUser);


//
routerUser.get('/list', getUsers);
routerUser.get('/get-by-email/:email', getUserByEmail);

routerUser.get('/:id', getUser);

routerUser.post('/add', addUser);
routerUser.post('/bulk', addUsersBulk);
routerUser.post('/delete', deleteUser);

routerUser.post('/send/method-payment', sendMethodPayment);

routerUser.get('/analytics/:id',getAnalytics);


module.exports = routerUser


