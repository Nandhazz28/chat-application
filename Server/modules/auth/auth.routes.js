const router = require("express").Router();
const protect = require("../../middleware/auth.middleware");
const { authLimiter } = require("../../middleware/rateLimit.middleware");
const validate = require("../../validators/common.validation");
const { registerSchema, loginSchema } = require("./auth.validation");
const { register, login, getMe, refresh, logout } = require("./auth.controller");

router.post("/register", authLimiter, validate(registerSchema), register);
router.post("/login", authLimiter, validate(loginSchema), login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", protect, getMe);

module.exports = router;