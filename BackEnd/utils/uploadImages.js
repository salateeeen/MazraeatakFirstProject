const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const uploadFarmImages = async (files) => {
  if (!files || !files.coverImage) {
    return { coverImageUrl: null, imagesUrls: [] };
  }

  // ✅ cover
  const coverResult = await cloudinary.uploader.upload(
    files.coverImage[0].path,
    { folder: "farms/covers" }
  );

  // 🧹 احذف الملف من السيرفر
  fs.unlinkSync(files.coverImage[0].path);

  // ✅ images
  const imagesUrls = [];

  if (files.images) {
    for (const file of files.images) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "farms/images",
      });

      imagesUrls.push(result.secure_url);

      // 🧹 حذف بعد الرفع
      fs.unlinkSync(file.path);
    }
  }

  return {
    coverImageUrl: coverResult.secure_url,
    imagesUrls,
  };
};

const uploadSingleImage = async (file, folder = "others") => {
  if (!file) return null;

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    uploadStream.end(file.buffer);
  });
};

module.exports = {
  uploadFarmImages,
  uploadSingleImage,
};
