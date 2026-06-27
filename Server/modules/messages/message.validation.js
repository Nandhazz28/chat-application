const { z } = require("zod");

const createMessageSchema = z
  .object({
    conversationId: z.string().min(1, "conversationId is required"),
    content: z.string().trim().max(5000).optional(),
    imageUrl: z.string().url().optional(),
    audioUrl: z.string().url().optional(),
    fileUrl: z.string().url().optional(),
    fileName: z.string().optional(),
    fileSize: z.number().optional(),
    fileType: z.string().optional(),
    replyTo: z.string().optional(),
  })
  .refine(
    (data) => data.content || data.imageUrl || data.audioUrl || data.fileUrl,
    { message: "Message must have content, image, audio, or file" }
  );

module.exports = { createMessageSchema };