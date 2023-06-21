const express = require("express");
const routerChat = express.Router();
const ChatServices = require("../services/app/chat.services");
const AccountServices = require("../services/account.services");
const UserServices = require("../services/user.services");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
// const ChatService = require("./chat.services.js");
const WhatsappService = require("../services/whatsapp.services");
const { UserData, UserFriends } = require("../model/user");
const { Chat } = require("../model/chat");


var config = require("../config.json");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

const profileUserData = {
  // id: "062a77fa-5845-4a26-a22f-713d1ba5c3a8",
  id: "c82c5d22-68f8-49ae-a464-e3aadb8383cd",
  fullName: "John Doe",
  role: "admin",
  about:
    "Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie marshmallow.",
  status: "online",
  settings: {
    isTwoStepAuthVerificationEnabled: true,
    isNotificationsOn: false,
  },
};

async function searchCurrentContacts(ids) {
  const historyContacts = await AccountServices.getAccountsById(ids, {
    attributes: ['id', 'fullName', 'role', 'status', 'email', 'phone']
  });
  return historyContacts;
}

var getChatsAndContacts = async (req, res) => {
  const { q = "" } = req.query;
  const user_id = req.params.id;
  var result = await new Promise((resolve, reject) => {
    sequelize.authenticate().then(async () => {
      var data = await Chat.findOne({
        where: { user_id }
      });
      if (data) {
        resolve(data.dataValues);
      } else {
        resolve(404);
      }
    });
  });
  let response = {
    lastMessages: []
  };
  if (result !== 404) {
    const { messages } = result;
    var lastMessages = messages
      .map((message) => ({
        id: message.id,
        userId: message.userId,
        unseenMsgs: message.unseenMsgs,
        lastMessage: message.chat[message.chat.length - 1],
      }))
      .reverse();
      
    response = {
      lastMessages,
    };
  }
  return res.status(200).send(response);
};

var getChatProfile = (req, res) => {
  return res.status(200).json(profileUser);
};

var getChat = async ({ params, query }, res) => {
  const { id: userId } = params;
  // const { authId } = query;
  try {
    new Promise(() => {
      sequelize.authenticate().then(async () => {
        const chatResponse = await Chat.findOne({
          where: {
            // user_id: authId,
            user_id: "c82c5d22-68f8-49ae-a464-e3aadb8383cd",
          },
        });
        if (chatResponse?.dataValues) {
          let { messages } = chatResponse.dataValues;
          let currentChat = messages.find((item) => item.userId === userId);
          if (currentChat) {
            let contact = await searchCurrentContacts(
              messages.map((item) => item.userId)
            );
            contact = contact.find((item) => item.id === userId);
            let { chat, ...chatHistory } = currentChat;
            let normalizeMessages = chat.map((item) => ({
              ...item,
              feedback: {
                isSent: true,
                isDelivered: true,
                isSeen: true,
              },
            }));
            chatHistory.messages = normalizeMessages;
            return res.status(200).send({ chat: chatHistory, contact });
          }
          
          const [contact] = await searchCurrentContacts([userId]);
          const newChatId = messages.length - 1;
          return res.status(200).send({
            chat: {
              id: newChatId,
              userId: contact.id,
              unseenMsgs: 0,
              messages: [],
            },
            contact,
          });
        } else {
          const [contact] = await searchCurrentContacts([userId]);
          return res.status(200).send({
            chat: {
              id: 1,
              userId: contact.id,
              unseenMsgs: 0,
              messages: [],
            },
            contact,
          });
        }
      });
    });
  } catch (error) {
    return res.status(200).send(error);
  }
};

var postChat = async ({ params, body }, res) => {
  const { id: contactId } = params;
  const { message, senderId, senderPhone } = body;
  
  try {
    const user_id = senderId;
    await sequelize.authenticate();
    const chatResponse = await Chat.findOne({ where: { user_id }});
    const [ contact ] = await searchCurrentContacts([contactId]);
    // await WhatsappService.sendMessage({
    //   phoneNumber: contact.phone,
    //   message
    // });
    if (chatResponse?.dataValues) {
      let chat = chatResponse.dataValues;
      const response = await ChatServices.storeChat({
        contactId,
        message,
        senderId,
        chatHistory: chat.messages,
        user_id,
        typeUser: 'reseller',
        members: chat.members
      });
      return res.status(200).send({
        ...response,
        dataContact: contact,
      });
    } else {
      const response = await ChatServices.storeChatList({
        contactId,
        message,
        senderId,
        phone: senderPhone,
        typeUser: 'reseller'
      });
      return res.status(200).send({
        ...response,
        dataContact: contact,
      });
    }
  } catch (error) {
    console.log('================================')
    console.log('ERROR')
    console.log('================================')
    console.log(error?.response?.data);
    return res.status(200).send(error);
  }
};

// const getChatBySenderAndReceiver = async (request, response) => {
//   const { senderId, receiverId } = request.query
//   const query = {
//     where: {
//       user_id: receiverId,
//       send_id: senderId,
//     },
//   }
//   const { dataValues: chatHistory } = await Chat.findOne(query)
//   response.status(200).send(chatHistory)
//   // if (!chatHistory) response.sendStatus(404)
//   // response.status(200).send(chatHistory)
// }



const getMembers = async (req, res) => {
  try {
    const leadsId = [], resellersId = [];
    
    let response = await Chat.findOne();
    if(!response?.dataValues) res.status(200).json([]);
    
    response = response?.dataValues;
    if(response.members) {
      const members = response.members;
      for (const key in members) {
        if (Object.hasOwnProperty.call(members, key)) {
          if (members[key].typeUser === "reseller") {
            resellersId.push(key);
          } else {
            leadsId.push(key);
          }
        }
      }
      
      let resellers = [];
      if(resellersId.length) {
        resellers = await AccountServices.getAccountsById(resellersId, {
          attributes: ['id', 'fullName', 'role', 'status', 'avatar', 'email', 'phone']
        });
      }
      
      let leads = [];
      if(leadsId.length) {
        leads = await UserServices.getUsersById(leadsId, {
          attributes: ['id', 'fullName', 'status', 'avatar', 'email', 'phone'],
          addAttributes: { role: 'lead' }
        })
      }
      const contacts = [...resellers, ...leads ]
      res.status(200).json(contacts)
    }
  } catch(e) {}
}


// routerChat.get('/get-chat-by-sender', getChatBySenderAndReceiver)
routerChat.get("/get-members", getMembers);
routerChat.get("/:id/chats-and-contacts", getChatsAndContacts);
routerChat.get("/profile-user", getChatProfile);
routerChat.get("/:id", getChat);
routerChat.post("/:id", postChat);

module.exports = routerChat;