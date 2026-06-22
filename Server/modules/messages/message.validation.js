const z = require("zod");

const createMessageSchema = z.object({
  conversationId: z.string(),

  content: z
    .string()
    .trim()
    .min(1)
    .max(5000),

  attachments: z
    .array(
      z.object({
        url: z.string(),
        type: z.string(),
      })
    )
    .optional(),
});

module.exports = {
  createMessageSchema,
};