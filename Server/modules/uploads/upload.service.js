const cloudinary = require("../../config/cloudinary");

const uploadToCloudinary = async (file, folder = "chat-app") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto" },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, publicId: result.public_id });
      },
    );
    stream.end(file.buffer);
  });
};

const uploadImage = async (file) => uploadToCloudinary(file, "chat-app/images");
const uploadAudio = async (file) => uploadToCloudinary(file, "chat-app/audio");
const uploadFile = async (file) => uploadToCloudinary(file, "chat-app/files");

module.exports = { uploadImage, uploadAudio, uploadFile };
