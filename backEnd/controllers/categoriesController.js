const handleAsyncError = require("../error/asyncError");
const { getCategoriesService, addCategoryService, deleteCategoryService, updateCategoryService } = require("../services/categoriesService");

const getCategories = handleAsyncError(async (req, res, next) => {
  const categories = await getCategoriesService();

  res.status(200).json({
    status: "success",
    results: categories.length,
    data: categories
  });
});

const addCategory = handleAsyncError(async (req, res, next) => {
  const category = await addCategoryService(req.body, req.file);

  res.status(201).json({
    status: "success",
    data: category
  });
});

const deleteCategory = handleAsyncError(async (req, res, next) => {
  const category = await deleteCategoryService(req.params.id);

  res.status(200).json({
    status: "success",
    data: category
  });
});

const updateCategory = handleAsyncError(async (req, res, next) => {
  const category = await updateCategoryService(req.params.id, req.body);

  res.status(200).json({
    status: "success",
    data: category
  });
});

module.exports = { getCategories, addCategory, deleteCategory, updateCategory };