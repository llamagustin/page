const express = require("express");
const routerChat = express.Router();
//con st ChatServices = require("../services/app/chat.services");
//const AccountServices = require("../services/account.services");
//const UserServices = require("../services/user.services");
// const Sequelize = require("sequelize");
const { Op } = require("sequelize");
// const ChatService = require("./chat.services.js");
const WhatsappService = require("./services/whatsapp.services");

const { v4: uuid, validate: valid_uuid } = require('uuid');

const { Account } = require("./model/account");
const { User, publicUser } = require("./model/user");
const { Chat } = require("./model/chat");

//socketio 
// const https = require('https');
// const fs = require('fs');

// const options = {
//   key: fs.readFileSync('server.key'),
//   cert: fs.readFileSync('server.cert')
// };

// const server = https.createServer(options, (req, res) => {
//   res.writeHead(200);
//   res.end('hello world\n');
// });



// const io = require('socket.io')(server);

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

// server.listen(5000, () => {
//   console.log('listening on *:3000');
// });


//sequelize
const Sequelize = require("sequelize");
// const { Op } = require("sequelize");

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




// ------------------------------------------------
// GET: Return Chats Contacts and Contacts
// ------------------------------------------------
const getChats = async (req, res) => {
  const { q = '' } = req.query
  const { id } = req.params
  
  if(!valid_uuid(id)) return res.send('404')

  const qLowered = q.toLowerCase()
  
  console.log('qlowered', qLowered)

  var response = await new Promise(async (resolve, reject) => {
    //   Chat.findAll({
    //     where: {
    //       [Op.and]: [{
    //           [Op.or]: [{
    //               members: {
    //                 name: {
    //                   [Op.iLike]: `%${qLowered}%`,
    //                 }
    //               },
    //               members: {
    //                 phone: {
    //                   [Op.iLike]: `%${qLowered}%`,
    //                 }
    //               }
    //           }]
    //         },{
    //             user_id: id
    //         }
    //       ],
    //     },
    //     order: [["createdAt", "DESC"]],
    //   }).then(data => {
    
    // const chats = await Chat.findAll({
    //   where: {
    //     members: {
    //       [Op.contains]: {
    //         [id]: {},
    //       },
    //     },
    //   },
    // });
    
    
    
    var permision = await new Promise((resolve, reject) => {
      Account.findAll({
        where: { id: id },
      }).then(result => {
        if (result) {
          // let hasManageAll = result[0].abilities.some(obj => obj.action === 'manage');
          let hasManageAll = result[0].abilities.action == 'manage' ? true : false
          
          if (hasManageAll) { resolve('manage')
          } else { resolve('user') }
        }
      })
    })
    
    var chats;
    if (permision == 'manage') {
      chats = await Chat.findAll({
        include: [
          {
            model: User,
            as: 'user',
            attributes: publicUser
          }
        ],
        // where: sequelize.literal(`members ->> 'name' LIKE '%${qLowered}%'`)
        where: qLowered.length > 0 ? sequelize.literal(`members ->> 'name' LIKE '%${qLowered}%'`) : {}
      });
    } else {
      chats = await Chat.findAll({
        include: [
          {
            model: User,
            as: 'user',
            attributes: publicUser
          }
        ],
        where: {
          [Op.and]: [
            // sequelize.literal(`members ->> 'name' LIKE '%${qLowered}%'`),
            qLowered.length > 0 ? sequelize.literal(`members ->> 'name' LIKE '%${qLowered}%'`) : {},
            { user_id: id }
          ]
        }
      });
    }
    
    resolve(chats)


      // sequelize.query(`SELECT * FROM aythen.chat
      //   WHERE members @> '{"${id}": {}}'::jsonb;`)
      // .then(data => {
      //     resolve(data);
      // })
  });
  
  // console.log('chats', response)


  return res.send(response)
}


// ------------------------------------------------
// GET: Return Single Chat
// ------------------------------------------------
const getChat = async (req, res) => {
   const { id } = req.params
   
   if(!valid_uuid(id)) return res.send('404')
   
   var response = await new Promise((resolve, reject) => {
      Chat.findAll({
        where: {
          user_id: id //lead
        }
      }).then( data => {
          if(data.length == 0){
              resolve('404')
          }
        
          resolve(data[0]);
      })
  });
  
  return res.send(response)
}


// const syncChat = async (req, res) => {
//   //hubhook whatsapp
  
//   // phoneSender, phoneReceived, message
//   sequelize.query(`SELECT * FROM aythen.chat
//         WHERE members.phone @> $phoneSender limit 1 '{"${id}": {}}'::jsonb;`)
//       .then(data => {
//           resolve(data);
//       })
      
//   const foundItem = await Chat.findOne({ where: { user_id: user.id } });
// }
// ------------------------------------------------
// POST: Add new chat message
// ------------------------------------------------
const addChat = async (req, res) =>  {
  // Get message from post data
  //account / user ? emit / recived
  //userId ALWAYS lead users
  // console.log('eeeeeeee')
  const {
    emitId, userId, userPhone, message, emit = {}, user = {}
  } = req.body
  
  console.log('1221')
  
  const newMessage = {
    message,
    time: String(new Date()),
    user: emitId || null, //emit ?? 
    feedback: {
      isSent: true,
      isDelivered: false,
      isSeen: false,
    }
  }
  
  // console.log('ee', newMessage)
  //user
    
  //whatsapp => user.id ?? get id phone lead
  const { whatsapp } = req.body
  if(whatsapp){
    const phone = whatsapp.senderPhone;
    var userData = await User.findOne({ where: { 
        phone: {
          [Op.iLike]: `%${phone}%`,
        }
    }});
    if(!userData?.dataValues){
       //create new user if not exist
        var userData = await User.create({
          source: 'whatsapp-lead',
          gogole_id: phone,
          phone: phone,
          status: 303,
          password: '1234'
        }).then( res => res.dataValues)
    }
    
    newMessage.user = userData.dataValues.id;
    userPhone = phone;
    userId = userData.dataValues.id;
  }else{
    // if crm => whatsapp | whatsapp => crm
    // await WhatsappService.sendMessage({
    //   phoneNumber: userPhone,
    //   message: newMessage.message
    // })
  }
  
  //crm => userId => send
  // First try to find the record
  const foundItem = await Chat.findOne({ 
    where: { user_id: userId } 
  });
  
  if (!foundItem) {
    let members = {};
    
    members[emitId] = emit; //emit
    members[userId] = user; //user
    
    /**
     * {
     *   avatar: '',
     *   name: '',
     *   email: '',
     *   createdAt: ''
     * }
    **/
    
    // Item not found, create a new one
    const item = await Chat.create({
      user_id: userId, //lead
      messages: [newMessage],
      phone: userPhone,
      members
    })
    return res.send(item)
  }
  // Found an item, update it
  foundItem.messages.push(newMessage)
  const item = await Chat.update(foundItem.dataValues, { where: { user_id: userId }  });

  return res.send(newMessage);
}


routerChat.get('/account/:id', getChats)
//routerChat.get('/apps/chat/users/profile-user')
routerChat.get('/:id', getChat)
routerChat.post('/', addChat)


module.exports = routerChat;