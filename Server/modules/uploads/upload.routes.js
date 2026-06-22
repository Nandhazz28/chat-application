const router = require("express").Router();

const protect = require(
  "../../middleware/auth.middleware"
);

const upload = require(
  "../../middleware/upload.middleware"
);

const {
  uploadImage,
} = require("./upload.controller");

router.post(
  "/image",
  protect,
  upload.single("image"),
  uploadImage
);

module.exports = router;