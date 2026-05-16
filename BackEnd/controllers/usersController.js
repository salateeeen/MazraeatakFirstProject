const handleAsyncError = require("../error/asyncError");
const userService = require("../services/userService");

const getAllUsers = handleAsyncError(async (req, res, next) => {
  const users = await userService.getAllUsers(req.query);

  res.status(200).json({
    status: "success",
    results: users.length,
    data: users,
  });
});

const getMe = handleAsyncError(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: req.user,
  });
});

const updateMe = handleAsyncError(async (req, res, next) => {
  const updatedMe = await userService.updateProfile(req.user.id, req.body);

  res.status(200).json({
    status: "success",
    data: updatedMe,
  });
});

const updateEmail = handleAsyncError(async (req, res, next) => {
  const updatedUser = await userService.updateEmail(req.user.id, req.body.email);

  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});

const getFavoritesIds = handleAsyncError(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    results: req.user.favorites.length,
    data: req.user.favorites,
  });
});

const getFavoritesFarms = handleAsyncError(async (req, res, next) => {
  const farms = await userService.getFavoriteFarms(req.user.favorites, req.query);

  res.status(200).json({
    status: "success",
    results: farms.length,
    data: farms,
  });
});

const addFavorite = handleAsyncError(async (req, res, next) => {
  const updatedUser = await userService.toggleFavorite(req.user, req.params.farmId);

  res.status(200).json({
    status: "success",
    results: updatedUser.favorites.length,
    data: updatedUser.favorites,
  });
});

const updateProfilePicture = handleAsyncError(async (req, res, next) => {
  const updatedUser = await userService.updateProfilePicture(req.user.id, req.file);

  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});


module.exports = {
  getAllUsers,
  getMe,
  updateMe,
  addFavorite,
  updateEmail,
  getFavoritesIds,
  getFavoritesFarms,
  updateProfilePicture,
};