const router = require("express").Router();
const protect = require("../../middleware/auth.middleware");
const { uploadLimiter } = require("../../middleware/rateLimit.middleware");
const upload = require("./upload.middleware");
const { uploadImage, uploadAudio, uploadFile } = require("./upload.controller");

router.post("/image", protect, uploadLimiter, upload.single("file"), uploadImage);
router.post("/audio", protect, uploadLimiter, upload.single("file"), uploadAudio);
router.post("/file", protect, uploadLimiter, upload.single("file"), uploadFile);

module.exports = router;