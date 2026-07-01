const { z } = require("zod");

const createConversationSchema = z.object({
  userId: z.string().min(1, "userId is required"),
});

module.exports = { createConversationSchema };