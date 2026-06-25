const Message = require("./message.model");
const Conversation = require("../conversations/conversation.model");

const create = async (data) => {
  const message = await Message.create(data);

  await Conversation.findByIdAndUpdate(data.conversationId, {
    lastMessage: message._id,
    updatedAt: new Date(),
  });

  return Message.findById(message._id).populate("senderId", "username avatar");
};

const findByConversation = (conversationId) => {
  return Message.find({ conversationId })
    .populate("senderId", "username avatar")
    .sort({ createdAt: 1 });
};

const findById = (id) => {
  return Message.findById(id).populate("senderId", "username avatar");
};

module.exports = { create, findByConversation, findById };