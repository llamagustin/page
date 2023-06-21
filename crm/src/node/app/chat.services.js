class ChatService {
  /**
   * It takes an array of objects and returns an array of objects with the same properties but with an
   * additional property called feedback
   * @param chatList - Array of objects
   * @returns An array of objects with the same properties as the original array of objects, but with
   * the addition of a feedback property.
   */
  static modelChatFromMessages(chatList) {
    let normalizeMessages = chatList.map((item) => ({
      ...item,
      feedback: {
        isSent: true,
        isDelivered: true,
        isSeen: true,
      },
    }));
    return normalizeMessages;
  }

  /**
   * It creates a message object with the given message, senderId, and forEntity
   * @returns A function that takes an object as an argument and returns an object.
   */
  static createMessage({ message = "", senderId }, forEntity = "") {
    let model = {
      message,
      time: String(new Date()),
      senderId,
      feedback: {
        isSent: true,
        isDelivered: false,
        isSeen: false,
      },
    };
    if (forEntity == "DB") {
      delete model.feedback;
    }
    return model;
  }
}

module.exports = ChatService;
