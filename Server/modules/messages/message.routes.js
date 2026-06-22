const router = require("express").Router();

const protect = require(
  "../../middleware/auth.middleware"
);

const {
  createMessage,
  getMessages,
} = require("./message.controller");

router.post(
  "/",
  protect,
  createMessage
);

router.get(
  "/:conversationId",
  protect,
  getMessages
);

module.exports = router;