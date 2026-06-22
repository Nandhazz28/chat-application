const router = require("express").Router();

const protect = require(
  "../../middleware/auth.middleware"
);

const {
  getProfile,
  updateProfile,
} = require("./user.controller");

router.get("/me", protect, getProfile);

router.put(
  "/me",
  protect,
  updateProfile
);

module.exports = router;