const repo = require("./conversation.repository");
const ApiError = require("../../utils/ApiError");

const createConversation = async ({ userId, currentUserId }) => {
  if (!userId || !currentUserId) {
    throw ApiError.badRequest("userId and currentUserId are required");
  }
  if (String(userId) === String(currentUserId)) {
    throw ApiError.badRequest("Cannot create conversation with yourself");
  }

  const existing = await repo.findPrivateConversation(currentUserId, userId);
  if (existing) return existing;

  const conv = await repo.create({
    type: "private",
    participants: [currentUserId, userId],
  });
  return repo.findById(conv._id);
};

const getConversation = async (id, userId) => {
  const conv = await repo.findById(id);
  if (!conv) throw ApiError.notFound("Conversation not found");

  const isMember = conv.participants.some(
    (p) => String(p._id) === String(userId)
  );
  if (!isMember) throw ApiError.forbidden("Not a member of this conversation");

  return conv;
};

const getUserConversations = (userId) => repo.findUserConversations(userId);

module.exports = { createConversation, getConversation, getUserConversations };
