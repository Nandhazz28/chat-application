const { z } = require("zod");

const updateProfileSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be at most 30 characters")
      .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
      .optional(),

    bio: z.string().max(250, "Bio must be at most 250 characters").optional(),

    avatar: z.string().url("Invalid avatar URL").optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

module.exports = { updateProfileSchema };