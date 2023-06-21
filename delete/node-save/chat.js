const express = require('express')
const routerChat = express.Router()

const Sequelize = require('sequelize')
const { Op } = require("sequelize");



var config = require('./config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
})


const { UserData, UserFriends } = require('./model/user')
const { Chat } = require('./model/chat')



//
var getChatsAndContacts = async (req, res) => {
    var dataProfile = await new Promise(function(resolve, reject){
        sequelize.authenticate()
        .then( async () => {
            var data = await UserData.findAll({
                where: {
                    user_id: req.params.id,
                }, 
                limit: 1
            })
            
            resolve(data[0])
        })
        .catch(err => {
           reject(err)
        })
    })
    
    var dataFriends = await new Promise(function(resolve, reject){
        sequelize.authenticate()
        .then( async () => {
            var data = await UserFriends.findAll({
                where: {
                    user_id: req.params.id,
                }, 
                limit: 1
            })
            
            resolve(data[0].data)
        })
        .catch(err => {
           reject(err)
        })
    })
    
    var dataChats = await new Promise(function(resolve, reject){
        sequelize.authenticate()
        .then( async () => {
            var data = await Chat.findAll({
                where: {
                    user_id: req.params.id
                }, 
                limit: 1
            })
            
            resolve(data[0].data)
        })
        .catch(err => {
           reject(err)
        })
    })
    
    
    const chatsContacts = dataChats.map(chat => {
      const contact = dataFriends.find(c => c.id === chat.userId)
      contact.chat = { 
          id: chat.id, 
          unseenMsgs: chat.unseenMsgs, 
          lastMessage: chat.chat[chat.chat.length - 1] 
      }
      return contact
    })
    .reverse()

  const profileUserData = {
    id: dataProfile.id,
    avatar: dataProfile.avatar,
    fullName: dataProfile.fullName,
    status: dataProfile.status,
  }
  
  return res.send({ 
      chatsContacts, 
      contacts: data.contacts, 
      profileUser: profileUserData 
  })
}

var getChatProfile = (req, res) => {
    
}

var getChat = (req, res) => {
    
}

var postChat = (req, res) => {
    
}











routerChat.get('/:id/chats-and-contacts', getChatsAndContacts);
routerChat.get('/profile-user', getChatProfile);
routerChat.get('/:id', getChat);
routerChat.post('/:id', postChat);

module.exports = routerChat











