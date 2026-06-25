const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const conversationService = require("./conversation.service");

// CREATE CONVERSATION
const createConversation = asyncHandler(async (req, res) => {
  const conversation = await conversationService.createConversation(req.body);

  return res.status(201).json(
    new ApiResponse(201, "Conversation created successfully", conversation)
  );
});

// GET SINGLE CONVERSATION
const getConversation = asyncHandler(async (req, res) => {
  const conversation = await conversationService.getConversation(req.params.id);

  return res.status(200).json(
    new ApiResponse(200, "Conversation fetched successfully", conversation)
  );
});

// GET USER CONVERSATIONS
const getUserConversations = asyncHandler(async (req, res) => {
  const conversations = await conversationService.getUserConversations(
    req.user.userId
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Conversations fetched successfully",
      conversations
    )
  );
});

module.exports = {
  createConversation,
  getConversation,
  getUserConversations,
};