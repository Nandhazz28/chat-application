const router = require("express").Router();

const protect = require(
  "../../middleware/auth.middleware"
);

const {
  createConversation,
  getConversation,
  getUserConversations,
} = require("./conversation.controller");

router.post(
  "/",
  protect,
  createConversation
);

router.get(
  "/",
  protect,
  getUserConversations
);

router.get(
  "/:id",
  protect,
  getConversation
);

module.exports = router;