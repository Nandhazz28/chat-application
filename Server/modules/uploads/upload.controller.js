const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const uploadService = require("./upload.service");

const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "No file provided" });
  const result = await uploadService.uploadImage(req.file);
  return res.status(200).json(new ApiResponse(200, "Image uploaded", result));
});

const uploadAudio = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "No file provided" });
  const result = await uploadService.uploadAudio(req.file);
  return res.status(200).json(new ApiResponse(200, "Audio uploaded", result));
});

const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "No file provided" });
  const result = await uploadService.uploadFile(req.file);
  return res.status(200).json(new ApiResponse(200, "File uploaded", {
    ...result,
    fileName: req.file.originalname,
    fileSize: req.file.size,
    fileType: req.file.mimetype,
  }));
});

module.exports = { uploadImage, uploadAudio, uploadFile };