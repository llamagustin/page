const express = require('express')
const routerWebhook = express.Router()

const WebhookServices = require('./services/webhook.services')
const VERIFY_TOKEN = "oo-8jAaj6.2yqF@DD0Vp";

function verifyMessageFromWhatsapp(resquest, res) {
    if (
        resquest.query['hub.mode'] == 'subscribe' &&
        resquest.query['hub.verify_token'] == VERIFY_TOKEN)
    {
        console.log("VERIFY")
        res.send(resquest.query['hub.challenge']);
    } else {
        res.send("No conexion");
    }
}

function receivedMessageFromWhatsapp({ body }, res) {
    
    const [ entry ] = body.entry;
    const changes = entry['changes']
    if (!changes.length) return;
    const allChanges = changes.filter((change) => change.field === 'messages')
    allChanges.forEach(change => {
        const value = change.value
        const metadata = value.metadata
        if (value?.contacts && value?.messages) {
            // RECEIVED MESSAGES
            // console.log(metadata)
            // console.log(value?.contacts)
            // console.log(value?.messages)
            WebhookServices.storeMessage({
                senderPhone: value?.contacts[0]['wa_id'],
                receiverPhone: metadata.display_phone_number,
                message: value.messages[0]['text']['body'],
                messageId: value.messages[0]['id'],
            })
            
        }
    })
    res.sendStatus(200)
}


routerWebhook.get('/', verifyMessageFromWhatsapp);
routerWebhook.post('/', receivedMessageFromWhatsapp);

module.exports = routerWebhook
