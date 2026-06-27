const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const conversationService = require("./conversation.service");

const createConversation = asyncHandler(async (req, res) => {
  const conversation = await conversationService.createConversation({
    userId: req.body.userId,
    currentUserId: req.user.userId,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, "Conversation ready", conversation));
});

const getConversation = asyncHandler(async (req, res) => {
  const conversation = await conversationService.getConversation(req.params.id);
  return res
    .status(200)
    .json(new ApiResponse(200, "Conversation fetched", conversation));
});

const getUserConversations = asyncHandler(async (req, res) => {
  const conversations = await conversationService.getUserConversations(
    req.user.userId,
  );
  return res
    .status(200)
    .json(new ApiResponse(200, "Conversations fetched", conversations));
});

module.exports = { createConversation, getConversation, getUserConversations };
