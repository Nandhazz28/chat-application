const router = require("express").Router();
const protect = require("../../middleware/auth.middleware");
const upload = require("./upload.middleware");
const { uploadImage, uploadAudio, uploadFile } = require("./upload.controller");

router.post("/image", protect, upload.single("file"), uploadImage);
router.post("/audio", protect, upload.single("file"), uploadAudio);
router.post("/file",  protect, upload.single("file"), uploadFile);

module.exports = router;