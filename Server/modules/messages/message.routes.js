const router = require("express").Router();
const protect = require("../../middleware/auth.middleware");
const { createMessage, getMessages, markSeen, editMessage, deleteMessage, addReaction } = require("./message.controller");

router.post("/", protect, createMessage);
router.get("/:conversationId", protect, getMessages);
router.put("/seen/:conversationId", protect, markSeen);
router.put("/:id", protect, editMessage);
router.delete("/:id", protect, deleteMessage);
router.post("/:id/reaction", protect, addReaction);

module.exports = router;
