const cloudinary = require("../../config/cloudinary");
const ApiError = require("../../utils/ApiError");

const uploadToCloudinary = (file, folder, resourceType = "auto") => {
  return new Promise((resolve, reject) => {
    if (!file || !file.buffer) {
      return reject(ApiError.badRequest("No file buffer provided"));
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) return reject(error);

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    stream.end(file.buffer);
  });
};

exports.uploadImage = (file) =>
  uploadToCloudinary(file, "chat-app/images", "image");

exports.uploadAudio = (file) =>
  uploadToCloudinary(file, "chat-app/audio", "video");

exports.uploadFile = (file) =>
  uploadToCloudinary(file, "chat-app/files", "auto");