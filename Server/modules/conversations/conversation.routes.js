const router = require("express").Router();
const protect = require("../../middleware/auth.middleware");
const validate = require("../../validators/common.validation");
const { createConversationSchema } = require("./conversation.validation");
const { createConversation, getConversation, getUserConversations } = require("./conversation.controller");

router.post("/", protect, validate(createConversationSchema), createConversation);
router.get("/", protect, getUserConversations);
router.get("/:id", protect, getConversation);

module.exports = router;