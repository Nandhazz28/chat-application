const router = require("express").Router();
const protect = require("../../middleware/auth.middleware");
const validate = require("../../validators/common.validation");
const { updateProfileSchema } = require("./user.validation");
const { getProfile, updateProfile, searchUsers, getUserById } = require("./user.controller");

router.get("/search", protect, searchUsers);
router.get("/me", protect, getProfile);
router.put("/me", protect, validate(updateProfileSchema), updateProfile);
router.get("/:id", protect, getUserById);

module.exports = router;