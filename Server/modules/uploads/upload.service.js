const uploadImage = async (file) => {
  return {
    url: file.path,
    publicId: file.filename,
  };
};

module.exports = {
  uploadImage,
};