const Conversation = require(
  "./conversation.model"
);

const create = (data) => {
  return Conversation.create(data);
};

const findById = (id) => {
  return Conversation.findById(id)
    .populate(
      "participants",
      "username avatar"
    )
    .populate(
      "lastMessage"
    );
};

const findUserConversations = (
  userId
) => {
  return Conversation.find({
    participants: userId,
  })
    .populate(
      "participants",
      "username avatar"
    )
    .populate(
      "lastMessage"
    )
    .sort({ updatedAt: -1 });
};

module.exports = {
  create,
  findById,
  findUserConversations,
};