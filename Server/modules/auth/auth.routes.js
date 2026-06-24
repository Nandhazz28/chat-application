const router = require("express").Router();

const {
  register,
  login,
  getMe,
} = require("./auth.controller");

router.post("/register", register);
router.post("/login", login);
router.get("/me", getMe);

module.exports = router;