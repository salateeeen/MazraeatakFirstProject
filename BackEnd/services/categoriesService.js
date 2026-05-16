const Category = require("../models/categoriesModel");
const cloudinary = require("../config/cloudinary");
const { uploadSingleImage } = require("./farmUploadService");

const getCategoriesService = async () => {
  return await Category.find();
};

const addCategoryService = async (body, file) => {
  const imageUrl = await uploadSingleImage(file, "categories");

  body.image = imageUrl;
  return await Category.create(body);
};

const deleteCategoryService = async (id) => {
  return await Category.findByIdAndDelete(id);
};

const updateCategoryService = async (id, body) => {
  return await Category.findByIdAndUpdate(id, body, { new: true });
};

module.exports = { getCategoriesService, addCategoryService, deleteCategoryService, updateCategoryService };
