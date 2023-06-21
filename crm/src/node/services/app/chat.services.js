const { Chat } = require("../../model/chat");
const { User } = require("../../model/user");

const WhatsappService = require("../whatsapp.services");
const responseBot = require("../auction.ay.bot");

const { Op } = require("sequelize");







class ChatService {
  static async saveMessage(body) {
    let {
      emitId, userId, userPhone, message, emit = {}, user = {}, whatsapp
    } = body;
    
    const newMessage = {
      message,
      time: String(new Date()),
      user: emitId || null,
      feedback: {
        isSent: true,
        isDelivered: false,
        isSeen: false,
      }
    }
    
    
    if(whatsapp) {
      const phone = whatsapp.senderPhone;
      var userData = await User.findOne({ where: { 
        phone: {
          [Op.iLike]: `%${phone}%`,
        }
      }});
      
      // If not exist
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
      
      var statusBot = userData.dataValues.bot
      
      var messageBot = responseBot({
        verify: true,
        key: message,
        tag: statusBot
      })
  
      //Acces Bot
      await WhatsappService.sendMessage({
        phoneNumber: '+34667283537',
        message: messageBot.message
      })
      
      console.log('sennnndd', userId, messageBot.status)
      
      //Update User
      var response = await User.update({  bot: messageBot.status },{ 
        where: { id: userId }
      })
      .then(result => result)
      .catch(err => err);
      
      console.log('response', response)
      
    }else{
      await WhatsappService.sendMessage({
        phoneNumber: userPhone,
        message: newMessage.message
      })
    }
    
    
    const foundItem = await Chat.findOne({ 
      where: { user_id: userId } 
    });
    
    if (!foundItem) {
      
      // if(!emitId) return false;
      let members = {};
      // members[emitId] = emit;
      if(emitId) members[emitId] = emit;
      members[userId] = user;
      
      await Chat.create({
        user_id: userId,
        messages: [newMessage],
        phone: userPhone,
        members
      })
      return newMessage
    }
    
    foundItem.messages.push(newMessage)
    await Chat.update(foundItem.dataValues, { where: { user_id: userId }  });
    return newMessage;
  }
  
}

module.exports = ChatService;
