const uploadService = require("./upload.service");

const uploadImage = async (req, res, next) => {
  try {
    const data = await uploadService.uploadImage(req.file);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};

const uploadAudio = async (req, res, next) => {
  try {
    const data = await uploadService.uploadAudio(req.file);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};

const uploadFile = async (req, res, next) => {
  try {
    const data = await uploadService.uploadFile(req.file);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadImage,
  uploadAudio,
  uploadFile,
};