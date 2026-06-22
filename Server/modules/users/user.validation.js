const z = require("zod");

const updateProfileSchema = z.object({
  username: z.string().min(3).max(30),

  bio: z.string().max(250).optional(),

  avatar: z.string().optional(),
});

module.exports = {
  updateProfileSchema,
};