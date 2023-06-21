const AccountServices = require('./account.services');
const ChatServices = require('./app/chat.services')
const { Chat } = require('../model/chat')

class WebhookServices {
  static async storeMessage(data) {
    const { senderPhone, receiverPhone, message, typeUser } = data
    const sender = await AccountServices.getAccountByPhone(senderPhone)
    if (!sender) return
    const receiver = await AccountServices.getAccountByPhone(receiverPhone)
    const response = await Chat.findOne({
      where: {
        user_id: receiver.id
        // send_id: sender.id,
      },
    })
    if (response?.dataValues) {
      const chat = response.dataValues;
      ChatServices.storeChat({
        contactId: sender.id,
        senderId: sender.id,
        user_id: receiver.id,
        message: message,
        chatHistory: chat.messages,
        members: chat.members,
        typeUser
        // whatsappMessageId: messageId,
      })
    }
  }
}

module.exports = WebhookServices;