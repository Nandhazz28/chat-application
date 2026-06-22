const asyncHandler = require(
  "../../utils/asyncHandler"
);

const ApiResponse = require(
  "../../utils/ApiResponse"
);

const messageService = require(
  "./message.service"
);

const createMessage = asyncHandler(
  async (req, res) => {
    const message =
      await messageService.createMessage({
        ...req.body,
        senderId: req.user.userId,
      });

    return res.status(201).json(
      new ApiResponse(
        201,
        "Message sent successfully",
        message
      )
    );
  }
);

const getMessages = asyncHandler(
  async (req, res) => {
    const messages =
      await messageService.getMessages(
        req.params.conversationId
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Messages fetched successfully",
        messages
      )
    );
  }
);

module.exports = {
  createMessage,
  getMessages,
};