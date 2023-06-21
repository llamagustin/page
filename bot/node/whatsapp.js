const axios = require('axios');
const WHATSAPP_API = "https://graph.facebook.com";
const VERSION = "v16.0";
const PHONE_NUMBER_ID = "118548874462493";
const DESTINATION_WHATSAPP_BUSINESS_ACCOUNT_ID = "111050451852692";
const WABA = "1093121278029705";

// const _WABA =
//   "EAAPiMCF5L4kBABJtlwAbZBDUIXO7NXL45CgC5pREZB7ik5glWbKzTFiD2sMlUBnIT4E7ZAsXGHaMQlq3MHDUAOSPHKWQk4Sjhtgm4KSCIp5ahpQkjD9h4n4ksouggD5nZCZA2CJOy3ueTG78yKn9J6vhVIvSBWtkCYEPZBgQh9tW0ViDuPcEuPUuXQ90ijLyOzyAFps9RZBhAZDZD";
const _WABA =
  "EAAPiMCF5L4kBAKGCd4ZBZASmDSLj1PCy4tOzoLwHb0Vuu3cmUsqJa2XwRKZAss8iZAQfwdxLadDMIwySI0ZBE9OZAesZBjklY7ukAZAZA5HGNX4qJG81KAJ4fOS4RnQmCvPnPlaud3WZCfVZB0W79wBSRFX9z2NAcleLdvRZBZBAQ3kVJJOZAltDL5flUh3NFozKvdVMRcjoqpYYi5qvsjo3C6N6IQ";
  // "EAAPiMCF5L4kBAOWFP6SoCMNraJsqhaTYHHashnVf61qTrjZB7gK6I40RmGSS0ayVJnK7SQfdZAj6WHBjuqbmsX3BdYRlK5qdXxQ2OD0a0Uhx61ry1yax5sRQzTTuBOe8Nzu4JJAZCu8WGXIl2HbN0f529b7UYIbDnICyxzWw5SvwWxQFGGQWf4A2UhTLq3LoTmsmizZC0QZDZD";
  
const config = {
  headers: {
    Authorization: `Bearer ${_WABA}`,
    "Content-Type": "application/json",
  },
};

const composeUri = (SLUG) => {
  return `${WHATSAPP_API}/${VERSION}/${PHONE_NUMBER_ID}/${SLUG}`;
};

class Whatsapp {
  
  static normalizePhoneNumber(phone) {
    const normalize = String(phone).replace(/\+|[\s]/g, "");
    return normalize;
  }

  static async sendMessage({ phoneNumber, message }) {
    try {
      const phone = this.normalizePhoneNumber(phoneNumber);
      const data = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        // "to": "51951557314",
        to: phone,
        type: "text",
        text: {
          preview_url: false,
          body: message,
        },
      };
      // console.log({ data })
      const uri = composeUri("messages");
      const response = await axios.post(uri, data, config)
      return response;
    } catch (error) {
      throw error;
    }
  }
  
  static async markRead({ messageId }) {
    try {
      const uri = composeUri("messages");
      const formData = {
        "messaging_product": "whatsapp",
        "status": "read",
        "message_id": messageId
      }
      const response = await axios.post(uri, formData);
      return response;
    } catch(error) {
      throw error;
    }
  }
  
  
  
}

module.exports = Whatsapp;
