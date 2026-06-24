const router = require("express").Router();

const protect = require(
  "../../middleware/auth.middleware"
);

const {
  getProfile,
  updateProfile,
  searchUsers,
} = require("./user.controller");

router.get(
  "/search",
  protect,
  searchUsers
);

router.get(
  "/me",
  protect,
  getProfile
);

router.put(
  "/me",
  protect,
  updateProfile
);

module.exports = router;