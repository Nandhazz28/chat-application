const Message = require("./message.model");

const create = (data) => {
  return Message.create(data);
};

const findByConversation = (
  conversationId
) => {
  return Message.find({
    conversationId,
  })
    .populate(
      "senderId",
      "username avatar"
    )
    .sort({ createdAt: 1 });
};

const findById = (id) => {
  return Message.findById(id);
};

module.exports = {
  create,
  findByConversation,
  findById,
};