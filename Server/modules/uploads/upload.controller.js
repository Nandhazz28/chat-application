const asyncHandler = require(
  "../../utils/asyncHandler"
);

const ApiResponse = require(
  "../../utils/ApiResponse"
);

const uploadService = require(
  "./upload.service"
);

const uploadImage = asyncHandler(
  async (req, res) => {
    const file =
      await uploadService.uploadImage(
        req.file
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Image uploaded successfully",
        file
      )
    );
  }
);

module.exports = {
  uploadImage,
};