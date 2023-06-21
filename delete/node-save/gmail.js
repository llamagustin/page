const express = require('express')
const routerGoogle = express.Router()

const path = require('path');
const fs = require('fs');

const { google } = require('googleapis');
const MailComposer = require('nodemailer/lib/mail-composer');

const credentials = require('./keys/google/credentials_google.json');
const tokens = require('./keys/google/tokens.json');

const { client_secret, client_id, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);



const Sequelize = require('sequelize')
const { Op } = require("sequelize");

var config = require('./config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
})


const { Email } = require('./model/email.js')


const fnAuth = () => {
  /**/
  //authorization Oauth2
  
  const GMAIL_SCOPES = [
      'https://www.googleapis.com/auth/gmail.send',
      'https://www.googleapis.com/auth/gmail.readonly'
  ];
  
  
  const url = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: GMAIL_SCOPES,
  });
  
  console.log('Authorize this app by visiting this url:', url);
  /**/
  
  /**/
  // Replace with the code you received from Google
  const code = '4/0ARtbsJrjusUenpclQQCwdFuyL7qGpTr9Hn9RJ_Kk0Bcv314GcvRVrtAmQVKv29yhgnv0NQ';
  
  oAuth2Client.getToken(code).then(({ tokens }) => {
    console.log('aaaa', tokens)
    const tokenPath = path.join(__dirname, './keys/google/token.json');
    console.log('token', tokenPath)
    fs.writeFileSync(tokenPath, JSON.stringify(tokens));
    console.log('Access token and refresh token stored to token.json');
  });
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

const sendMail = async (req, res) => {
  /*
  const fileAttachments = [
    {
      filename: 'attachment1.txt',
      content: 'This is a plain text file sent as an attachment',
    },
    {
      path: path.join(__dirname, './attachment2.txt'),
    },
    {
      filename: 'websites.pdf',
      path: 'https://www.labnol.org/files/cool-websites.pdf',
    },

    {
      filename: 'image.png',
      content: fs.createReadStream(path.join(__dirname, './attach.png')),
    },
  ];
  */
  const { sender, recipient, subject, body_html, category, type } = req.body
  
  
  
  const options = {
    to: recipient,
    cc: 'cc1@example.com, cc2@example.com',
    replyTo: 'info@aythen.com',
    subject: subject,
    text: 'This email is sent from the command line',
    html: body_html,
    //attachments: fileAttachments,
    textEncoding: 'base64',
    headers: [
      { key: 'X-Application-Developer', value: 'Amit Agarwal' },
      { key: 'X-Application-Version', value: 'v1.0.0.2' },
    ],
  };
  
  //console.log('options: ', options)
  
  /*
  const options = {
    to: 'info@aythen.com',
    cc: 'cc1@example.com, cc2@example.com',
    replyTo: 'info@aythen.com',
    subject: 'Hello Amit 🚀',
    text: 'This email is sent from the command line',
    html: `<p>🙋🏻‍♀️  &mdash; This is a <b>test email</b> from <a href="https://digitalinspiration.com">Digital Inspiration</a>.</p>`,
    //attachments: fileAttachments,
    textEncoding: 'base64',
    headers: [
      { key: 'X-Application-Developer', value: 'Amit Agarwal' },
      { key: 'X-Application-Version', value: 'v1.0.0.2' },
    ],
  };
  */
  
  try {
    
      const gmail = getGmailService();
      const rawMessage = await createMail(options);
      const { data: { id } = {} } = await gmail.users.messages.send({
        userId: 'me',
        resource: {
          raw: rawMessage,
        },
      });
      
      /*
      var email = {
        from: {
          email: 'tommys@mail.com',
          name: 'Tommy Sicilia',
          //avatar: require('@/assets/images/avatars/1.png'),
        },
        to: [{
          name: 'me',
          email: 'johndoe@mail.com',
        }],
        labels: ['private'],
        subject: 'Theme Update',
        message: 'Lorem ipsum',
        time: new Date()
      }
      */
      
     

      var email = await saveEmail(req.body.email)
      
      return res.status(200).send(email)
  } catch (error) {
      console.log('err', error)
      return res.status(200).send(error)
  }

  
  //return id;
};



const getListMail = async (req, res) => {
  try {
      const gmail = getGmailService();
      //const query = 'label:inbox subject:reminder'
      const query = 'label:inbox'

      var data = await new Promise(async (resolve, reject) => { 
        await gmail.users.messages.list(
          {
            userId: 'me',
            q: query,
          },  (err, res) => {        
            if (err) {                    
                reject(err);        
            }        
            if (!res.data.messages) {                    
              resolve([]);     
            }    
            
            resolve(res.data.messages);      
          }  
        );
      })
      
      
      
      //Yfor(var i = 0; i<data.length;i++){
      for(var i = 0; i<1;i++){
          var email = {
            id: '316be3db-6f10-4165-93a7-90856761dbde',
            google_id: data[i].id
          }
          
          var email_data = await new Promise(async (resolve, reject) => { 
            await gmail.users.messages.get({
                userId: 'me',
                id: email.google_id
              },(err, res) => {        
                if (err) reject(err);  
                resolve(res.data);      
              })
          })
          
          //Delivered-To from
          //To to
          //X-Failed-Recipients cc
          //In-Reply-To cc
          //var to = email_data.payload.headers[0].value
          //email email_data.payload.body.data
      }
      
      //console.log('d', data[0].id)
 
      return res.send(email_data.payload.body.data)
  } catch (error) {
      console.log('err', error)
      return res.send(error)
  }
}



const getMail = async (req, res) => {
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
      console.log('err', error)
      return res.send(error)
  }
}















/*





*/

var getEmailsByUser = async (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', folder = 'inbox', label } = req.query
  /* eslint-enable */
  
  console.log('req', req.query)

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


var getEmails = async (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', folder = 'inbox', label } = req.query
  
  /* eslint-enable */
  const queryLowered = q.toLowerCase()

  /*
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
  */
  
  
  var search = {}
  
  if(q) search['subject'] = { [Op.like]: `%${queryLowered}%` }
  if(folder) search['folder'] = { [Op.like]: `%${folder}%` }
  if(label) search['labels'] = {  [Op.contains]: [label] }
  
  console.log('s', search)
  var data = await new Promise((resolve, reject) => {
        sequelize.authenticate()
        .then( async () => {
            var data = await Email.findAll({
                where: search,
                limit: 20,
                order: [ [ 'createdAt', 'DESC' ] ]
            })
            
            resolve(data)
        })
        .catch(err => {
           resolve(err)
        })
  })

  /*
  const filteredData = data.filter(
    email =>
      email.subject.toLowerCase().includes(queryLowered) &&
      isInFolder(email) &&
      (label ? email.labels.includes(label) : true),
  )
  */

  // ------------------------------------------------
  // Email Meta
  // ------------------------------------------------
  const emailsMeta = {
    inbox: data.filter(email => !email.isDeleted && !email.isRead && email.folder === 'inbox').length,
    draft: data.filter(email => email.folder === 'draft').length,
    spam: data.filter(email => !email.isDeleted && !email.isRead && email.folder === 'spam').length,
  }

  return res.send({
      //emails: filteredData.reverse(),
      emails: data.reverse(),
      emailsMeta,
  })
}

const updateEmails = async (req, res) => {
  const { emailIds, dataToUpdate } = req.body
  
  var data = await new Promise((resolve, reject) => {
      sequelize.authenticate()
      .then( async () => {
        var arr = []
        for(var i = 0; i<emailIds.length;i++){
          var id = emailIds[i]

          var email = dataToUpdate
          email.id = id

          var result = await Email.upsert(email);
          arr.push(result[0])
        }
  
        resolve(arr)
      }).catch(err => {
         resolve(err)
      })
  })

  return res.send(data)
}



const saveEmail = async (email) => {
    var data = await new Promise((resolve, reject) => {
        sequelize.authenticate()
        .then( async () => {
            var data = await Email.upsert( email );
            
            resolve(data[0])
        })
        .catch(err => {
           resolve(err)
        })
    })
    
    return data
}

const postEmail = async (req, res) => {
  
}


const updateEmailsLabels = async (req, res) => {
  const { emailIds, labels, label } = req.body
  
  console.log('lll', labels)

  
  var data = await new Promise((resolve, reject) => {
      sequelize.authenticate()
      .then( async () => {
        var arr = []
        for(var i = 0; i<emailIds.length;i++){
          var id = emailIds[i]

          //var email = dataToUpdate
          var email = {
            id: id,
            labels: labels[i] 
          }
          
          var result = await Email.upsert(email);
          arr.push(result[0])
        }
  
        resolve(arr)
      }).catch(err => {
         resolve(err)
      })
  })

  /*
  data.emails.forEach(email => {
    if (emailIds.includes(email.id)) updateMailLabels(email)
  })
  */

  return res.send(data)
}


const paginateEmail = async (config) => {
  const { dir, emailId } = config.params

  const currentEmailIndex = data.emails.findIndex(e => e.id === emailId)

  const newEmailIndex = dir === 'previous' ? currentEmailIndex - 1 : currentEmailIndex + 1

  const newEmail = data.emails[newEmailIndex]

  return newEmail ? [200, newEmail] : [404]
}






routerGoogle.get('/emails', getEmails);

routerGoogle.get('/paginate-email', paginateEmail)



routerGoogle.post('/update-emails', updateEmails);

routerGoogle.post('/update-emails-label', updateEmailsLabels);


routerGoogle.get('/sync', getListMail);

routerGoogle.get('/:id', getMail);



routerGoogle.post('/email', postEmail);


routerGoogle.post('/send', sendMail);

//routerGoogle.post('/sync', getListMail);

module.exports = routerGoogle