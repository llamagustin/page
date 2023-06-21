const moment = require('moment')

const express = require('express')
const routerGoogle = express.Router()

const path = require('path');
const fs = require('fs');

const { PubSub } = require('@google-cloud/pubsub');
const pubsub = new PubSub();

const { google } = require('googleapis');
const MailComposer = require('nodemailer/lib/mail-composer');

const credentials = require('./keys/google/credentials_google.json');
const tokens = require('./keys/google/tokens.json');

const { client_secret, client_id, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

const Sequelize = require('sequelize')
const { Op } = require("sequelize");
const { User } = require("./model/user");

var config = require('./config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
})


const { Email } = require('./model/email.js')

const { getSocket } = require('./socket.js')
const socketIO = getSocket();

const fnAuth = () => {
  /**/
  //authorization Oauth2
  const GMAIL_SCOPES = [
      'https://www.googleapis.com/auth/gmail.send',
      'https://www.googleapis.com/auth/gmail.readonly',
      // 'https://www.googleapis.com/auth/gmail.metadata'
  ];
  
  
  const url = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: GMAIL_SCOPES,
  });
  console.log({ url })
  
  /**/
  
  /**/
  // Replace with the code you received from Google
  // const code = '4/0ARtbsJrjusUenpclQQCwdFuyL7qGpTr9Hn9RJ_Kk0Bcv314GcvRVrtAmQVKv29yhgnv0NQ';
  const code = '4/0AWtgzh6C09HxrZ7XHWmPtqjeAElWKxTtI7zWO-x6P5LuiDpIyXZh_0IHEOBkQCbxdZ90nA'
  
  oAuth2Client.getToken(code)
    .then(({ tokens }) => {
      console.log(tokens)
      // const tokenPath = path.join(__dirname, './keys/google/token.json');
      const tokenPath = path.join(__dirname, './keys/google/tokens.json');
    
      fs.writeFileSync(tokenPath, JSON.stringify(tokens));
    })
    .catch(err => {
      console.log("")
      console.log(err)
    })
  /**/
}

const getGmailService = () => {
  const { client_secret, client_id, redirect_uris } = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  oAuth2Client.setCredentials(tokens);
  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
  return gmail;
};

const encodeMessage = (message) => {
  return Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const createMail = async (options) => {
  const mailComposer = new MailComposer(options);
  const message = await mailComposer.compile().build();
  return encodeMessage(message);
};




const sendEmail = async (req, res) => {
  const email= req.body;
  
  var message = email.message + '<img src="https://api.aythen.com/email/pixel/' + email.id + '" />'

  const options = {
    to: email.to,
    cc: '',
    subject: email.subject,
    text: email.subject,
    html: message,
    //attachments: fileAttachments,
    textEncoding: 'base64',
    headers: [
      { key: 'X-Application-Developer', value: 'Amit Agarwal' },
      { key: 'X-Application-Version', value: 'v1.0.0.2' },
    ],
  };
  
  // console.log('o', options)
  
  // if(options.to.length < 0){
  //   return res.send({msg:'error'})
  // }

  try {
    const gmail = getGmailService();
    const rawMessage = await createMail(options);
     
    // console.log('111', rawMessage)
    
    
    const response = await gmail.users.messages.send({
      userId: 'me',
      resource: {
        raw: rawMessage,
      },
    }).catch( err => {
      return res.status(500).send({msg:'error'})
    })
    
  
    if(response == 400){
      return res.send({msg:'error'})
    }

    // await Email.update({
    //   google_id: response.data.id,
    //   status: 1
    // },{
    //   where:{id:email.id}
    // });
    
    
    return res.status(200).send({msg:'send'})
  } catch (error) {
    return res.status(500).send({msg:'error'})
  }

  
  //return id;
};


function formatDate(date) {
  date = new Date(date.setHours(date.getHours() - 8));
  const isoDate = date.toISOString();
  
  
  const [year, month, day, ] = isoDate.match(/(\d{4})-(\d{2})-(\d{2})/).slice(1);
  return `${year}/${month}/${day}`;
}


const syncGMail = async (req, res) => {
  console.log('syncGMail')
  try {
    
    let email_data = [];
    const gmail = getGmailService();
      
    var data = await new Promise(async (resolve, reject) => { 
      await gmail.users.messages.list({userId: 'me', q: `label:inbox` },  
        (err, res) => {        
          if (err) { reject(err); }        
          if (!res.data.messages) {resolve([]); }    
          resolve(res.data.messages);      
        }  
      );
    })
    
    
    console.log('d', data)
    
    return false
    
    for(var i = 0; i<data.length;i++){
    
      let email = { id: '316be3db-6f10-4165-93a7-90856761dbde', google_id: data[i].id }
      let count = await Email.count({where:{google_id:data[i].id}});
      
      if(count==0){
        email_data.push( 
          await new Promise(async (resolve, reject) => {
            await gmail.users.messages.get({ userId: 'me', id: email.google_id },(err, res) => {
              if (err) reject(err);
              resolve(res.data);      
            })
          })
        )
      }
    }
    
    for(var i = 0; i<email_data.length;i++){
      let email=email_data[i];
      
      await insertGmail(email);
       
    }
    
      return res.status(200).send(email_data)
  } catch (error) {
      
      return res.send(error)
  }
}


function getNameAndEmail(str) {
  // Separa la cadena en dos partes utilizando `<` y `>` como delimitadores
  const parts = str.split(/[<>]/);

  // El nombre está en la primera parte, el email en la segunda
  const name = parts[0].trim();
  const email = parts[1].trim();

  // Devuelve el nombre y el email como un objeto
  return { name, email };
}

const insertGmail= async (email)=>{
    try {
      let heads=email.payload.headers;
      let hora= new Date(heads.find(obj => obj.name === "Date").value);
  
      let txtTo = (heads.find(obj => obj.name === "To")?.value || '').replace(/"/g, "");
      let txtFrom =(heads.find(obj => obj.name === "From")?.value || '').replace(/"/g, "");
      
  
      let from=getNameAndEmail(txtFrom);
      let para=getNameAndEmail(txtTo);
      
      
      let user=await searchRelativoGmail(from.email);
      
      
  
      let emailDB = { 
        folder:'inbox',
        google_id: email.id,
        labels:email.labelIds.map(l=> l.toLowerCase()),
        message:email.snippet,
        from: from,
        to: para,
        subject:heads.find(obj => obj.name === "Subject")?.value || '',
        time:hora,
        status: 2,
        isRead:false,
        user_id:user
      }
        console.log('sending...');
      await Email.upsert(emailDB);
    } catch (error) { 
      console.log(`error: ${error}`);
    }
}


const getMail = async (req, res) => {
  // console.log('Get email from Gmail')
  try {
      const gmail = getGmailService();
      const data = await new Promise(async (resolve, reject) => { 
        await gmail.users.messages.get({
            userId: 'me',
            id: req.params.id,
          },(err, res) => {        
            if (err) reject(err);  
            
            resolve(res.data);      
          })
      })

      const body_content = JSON.stringify(data.payload.parts[1].body.data);
      const buff = new Buffer.from(body_content, "base64");
      mailBody = buff.toString();
      // display the result
      return res.send(mailBody)
  } catch (error) {
      return res.send(error)
  }
}






// <img src="https://api.aythen.com/email/pixel/ay-pixel" />
const pixelGMail = async (req, res) => {
  

  Email.update({isOpen: 300}, { 
    where: { id: req.params.id, isOpen: 400 } 
  }).then( result => {
    
    if(result[0] == 0){
      Email.update({isOpen: 200}, { 
        where: { id: req.params.id, isOpen: 300 } 
      }).then( result => {
          console.log('open pixel: ', req.params.id)
          return res.send({status: 200})
      })
    }else{
        return res.send({status: 300})
    }
  })

}



var getEmailsByUser = async (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', folder = 'inbox', label } = req.query
  /* eslint-enable */
  
  const queryLowered = q.toLowerCase()

  function isInFolder(email) {
    if (folder === 'trash') return email.folder === 'trash'
    if (folder === 'starred') return email.isStarred && email.folder !== 'trash'
    return email.folder === (folder || email.folder) && email.folder !== 'trash'

    // email.folder === (folder || email.folder)

    // if (filter === 'important') return task.isImportant && !task.isDeleted
    // if (filter === 'completed') return task.isCompleted && !task.isDeleted
    // if (filter === 'deleted') return task.isDeleted
    // return !task.isDeleted
  }
  
  
  var data = await new Promise((resolve, reject) => {
        sequelize.authenticate()
        .then( async () => {
            var data = await Email.findAll({
                where: {
                  user_id: req.params.id
                },
                limit: 20,
                order: [ [ 'createdAt', 'DESC' ] ]
            })
            
            resolve(data)
        })
        .catch(err => {
           resolve(err)
        })
  })
  

  const filteredData = data.filter(
    email =>
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      email.subject.toLowerCase().includes(queryLowered) &&
      isInFolder(email) &&
      (label ? email.labels.includes(label) : true),
  )
  /* eslint-enable  */

  // ------------------------------------------------
  // Email Meta
  // ------------------------------------------------
  const emailsMeta = {
    inbox: data.filter(email => !email.isDeleted && !email.isRead && email.folder === 'inbox').length,
    draft: data.filter(email => email.folder === 'draft').length,
    spam: data.filter(email => !email.isDeleted && !email.isRead && email.folder === 'spam').length,
  }

  return res.send({
      emails: filteredData.reverse(),
      emailsMeta,
  })
}


const starredEmails = async(req,res) => {
  return res.status(200).send({ok:true});
}

let getEmailsMeta = async (id,isAdmin) =>{
  
  
  let filtros={ where: { folder: { [Sequelize.Op.in]: ['inbox', 'sent', 'spam'] },isDeleted: false }};
  
  if(isAdmin==false) filtros.where['user_id'] = id;
  
  var qr = await Email.findAll(filtros);
    const emailsMeta = {
    inbox: qr.filter(email => email.isRead === false && email.folder === 'inbox').length,
    draft: qr.filter(email => email.folder === 'draft').length,
    spam: qr.filter(email =>  email.isRead === false && email.folder === 'spam').length,
  }
  return emailsMeta;
}

// list all emails.
var fetchEmails = async (req, res) => {
  const { q='' , filter='inbox' , label='', id ='' , role='reseller', isDeleted=false } = req.query
  const queryLowered = q.toLowerCase()
  
  var search ={} // {isdeleted:isdeleted} 
  
  if(role !== 'manage' && id !== '' ) search["user_id"]=id
  
  if (filter=="starred"){
   search['isStarred']  = true
  } else if (filter=="verify"){
    search['status'] = 0
    search['folder'] = { [Op.like]: `sent` }
  } else {
    if(q) search['subject'] = { [Op.iLike]: `%${queryLowered}%` }
    if(filter) search['folder'] = { [Op.like]: `%${filter}%` }
    if(label) search['labels'] = { [Op.contains]: [label] }
  }
  
  var data = await new Promise((resolve, reject) => {
    sequelize.authenticate()
    .then( async () => {
      var data = await Email.findAll({
        where: search,
        limit: 20,
        order: [ [ 'createdAt', 'DESC' ] ]
      })
        
        resolve(data)
    }).catch(err => {
       resolve({error:true, error: err})
    })
  })

  let error=false;
  
  if(data.error) { 
    error=true;
    data=[];
  }

  return res.status(200).send({
    emails: data,
    // emails: data.reverse(),
    emailsMeta:await getEmailsMeta(id,role=='admin'),
    error
  })
}

const updateEmails = async (req, res) => {
  // console.log('updateEmails', req.body)
  const { ids, data } = req.body
  var rs = await new Promise((resolve, reject) => {
      sequelize.authenticate()
      .then( async () => {
        var arr = []
        for(var i = 0; i<ids.length;i++){
          var id = ids[i]

          var email = data
          email.id = id

          var result = await Email.update(email,{where:{id:id}});
          arr.push(result[0])
        }
  
        resolve(arr)
      }).catch(err => {
        console.log('error!');
         resolve(err)
      })
  })

  return res.send(rs)
}

const saveEmail = async (req,res) => {
    let email = req.body;
    var data = await new Promise((resolve, reject) => {
      sequelize.authenticate()
        .then( async () => {
          var data = await Email.upsert( email , { returning: true });
          // console.log(`email send.`);
          resolve(data[0])
        })
        .catch(err => {
          // console.log(`error on saveEmail: ${err}`);
          resolve(err)
        })
    })
    return res.status(200).send(data)
}



const updateLabel=async(id,label)=>{
  const email= await Email.findOne({where:{id:id}})
  let labels = email.labels;
  
  labels.push(label);
  
  return [...new Set(labels)]  
  
}

const updateEmailsLabels = async (req, res) => {
  
  const { ids,  label } = req.body
  
  var data = await new Promise((resolve, reject) => {
      sequelize.authenticate()
      .then( async () => {
        var arr = []
        for(var i = 0; i<ids.length;i++){
          var id = ids[i]

          let etiquetas=await updateLabel(id,label);
          
          
          var email = {
            labels: etiquetas
          }
          
          var result = await Email.update(email,{where:{id:id}});
          arr.push(result[0])
        }
  
        resolve(arr)
      }).catch(err => {
         resolve(err)
      })
  })

  return res.send(data)
}


const paginateEmail = async (config,res) => {
  const { dir, emailId } = config.params

  const currentEmailIndex = data.emails.findIndex(e => e.id === emailId)

  const newEmailIndex = dir === 'previous' ? currentEmailIndex - 1 : currentEmailIndex + 1

  const newEmail = data.emails[newEmailIndex]

  if(newEmail){
    return res.send(newEmail)
  }else{
    return res.send('404')
  }
}


async function searchRelativoGmail(email) {
  let qr= await Email.findOne({
    attributes: ["user_id"],
    where: { to: { email: email } },
    order: [["createdAt", "DESC"]]
  });
  
  return qr?.user_id || '';
}

const test=async(req,res)=>{
  let email='lapd01@hotmail.com';
  let qr= await searchRelativoGmail(email)
  return res.status(200).send(qr);
}

const getTemplate = async (req,res) => {
  
  const { id='mail-promo-2.html',folder='freelancer' } = req.params;
  
  var filePath= path.join(process.cwd(),'/src/assets/email/',folder,id)
  
  var fileContent= fs.readFileSync(filePath,'utf-8');
  
  return res.status(200).send(fileContent)
}


function extractNameAndEmail(str) {
  var match = str.match(/^([^<]+)<([^>]+)>$/);
  if (match) {
    return {
      name: match[1].trim(),
      email: match[2].trim()
    };
  } else {
    return {
      name: str,
      email: str
    };
  }
}



const handleWebhook = async (req, res) => {
  
  // console.log('send email', req.body.message)
  const AYTHEN_EMAIL = "info@gmail.com"
  try {
    const gmail = getGmailService();
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 1,
      q: `is:unread`,
    });
    
    const messages = response.data.messages;
    const code = await gmail.users.messages.get({ userId: 'me', id: messages[0].id })
    // console.log('eee', code)
    if(code) {
      const result = code.data
      // console.log('result', result.payload.parts)
      const headers = result.payload.headers
      const email = {
        to: {
          email: null,
          name: null
        },
        from: {
          email: null,
          name: null
        },
        subject: null,
        cc: [],
        bcc: [],
        message: result.snippet,
        attachments: [],
        isStarred: false,
        labels: result.labelIds.map(label => label.toLowerCase()),
        replies: [],
        time: Date.now(),
        folder: 'inbox',
        isRead: false,
        isDeleted: false,
        status: 0,
        user_id: null //lead
      }
      
      // console.log('Labels', result.labelIds.map(label => label.toLowerCase()))
      
      for (let i = 0; i < headers.length; i++) {
        const header = headers[i];
        if (header.name === "From") {
          const sender = extractNameAndEmail(header.value);
          email.from.email = String(sender.email).replace(/<|>/g,'');
          email.from.name = sender.name;
        }
        if (header.name === "Subject") {
          email.subject = header.value;
        }
        if (header.name === "Delivered-To") {
          email.to.name = "Aythen";
          email.to.email = [header.value];
        }
      }
      
      if(email.from.email === AYTHEN_EMAIL) {
        return res.sendStatus(200);
      }
      
      const userData = await User.findOne({ where: { email: email.from.email } });
      
      // console.log('userData', userData)
      if(userData?.dataValues) {
        email.user_id = userData.dataValues.id
        const emailReceived = await Email.upsert(email)
        socketIO.emit("email-received", emailReceived)
        console.log('Registered mail from Gmail')
      }
    }
    
    // message_id string => from (email)/lead => guarda
    // if(req?.body?.message?.messageId) {
    //   const { historyId } = JSON.parse(Buffer.from(req.body.message.data, 'base64').toString())
      
    //   const gmail = getGmailService();
       
    //   console.log('id', historyId)
    //   var result = await gmail.users.history.list({userId: "me", startHistoryId: historyId });
      
    //   console.log('result', result)
    
    //   if(result.data.history){
    //     console.log('331')
    //     const message_id = result.data.history[result.data.history.length - 1].messages[0].id
        
    //     console.log('meee', message_id)
    //     var code = await gmail.users.messages.get({ userId: 'me', id: message_id })
    //     console.log('code', code.data.snippet)
    //   }
    // }
    
    return res.sendStatus(200);
  } catch (error) {
    console.log({ error: error})
    return res.send(error)
  }
  
  // return res.sendStatus(200)
}

routerGoogle.get('/test',test);

routerGoogle.get('/emails', fetchEmails);
routerGoogle.get('/paginate-email', paginateEmail)
routerGoogle.post('/update-emails', updateEmails);
routerGoogle.post('/update-emails-label', updateEmailsLabels);
routerGoogle.get('/starred', starredEmails);
routerGoogle.get('/template/:folder?/:id?', getTemplate)

routerGoogle.get('/reset-token', (req, res) => {
  fnAuth()
})

//gmail
routerGoogle.get('/pixel/:id', pixelGMail);
routerGoogle.get('/sync', syncGMail);
routerGoogle.get('/:id', getMail);
routerGoogle.post('/send', sendEmail);
routerGoogle.post('/save', saveEmail);

routerGoogle.post('/webhook', handleWebhook)

//routerGoogle.post('/sync', getListMail);

module.exports = routerGoogle





/*


*/



async function subscribe() {
  // const auth = new google.auth.GoogleAuth({
  //   scopes: ['https://www.googleapis.com/auth/gmail.metadata'],
  // });
  
  // const authClient = await auth.getClient();
  // const gmail = google.gmail({version: 'v1', auth: authClient});
  
//   const auth = new google.auth.GoogleAuth({
//   keyFile: 'path/to/keyfile.json',
//   scopes: ['https://www.googleapis.com/auth/gmail.metadata'],
// });


//   const authClient = await auth.getClient();
//   const gmail = google.gmail({version: 'v1', auth: authClient});
  
//   const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
  const gmail = getGmailService();
  
  
  const response = await gmail.users.watch({
    userId: 'me',
    resource: {
      labelIds: ['INBOX'],
      topicName: `projects/aythen-b638a/topics/aythen`,
    },
  });
  console.log(response);
}


// subscribe();




// async function processMessage(message) {
//   console.log('qwejdiqekw', message)
//   const email = JSON.parse(Buffer.from(message.data, 'base64').toString());
//   console.log('Received email:', email);
//   // Aquí puedes procesar el correo electrónico recibido.
// }

// async function subscribeHandler() {
//   const subscription = pubsub.subscription('gmail');
//   subscription.on('message', processMessage);
// }




// subscribeHandler();