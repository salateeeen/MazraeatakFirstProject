const User = require("../models/userModel");
const Farm = require("../models/farmModel");
const QueryClass = require("../query/query");
const AppError = require("../error/AppError");
const { uploadSingleImage } = require("../utils/uploadImages");

const getAllUsers = async (queryParams) => {
  const query = new QueryClass(User.find(), queryParams);
  return await query.filter().sort().query;
}

const updateProfile = async (userId, body) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "phone",
    "birthday",
  ];

  const filteredBody = {};

  Object.keys(body || {}).forEach((key) => {
    if (allowedFields.includes(key)) {
      filteredBody[key] = body[key].trim();
    }
  });

  if (!Object.keys(filteredBody).length) {
    throw new AppError("No valid fields provided.", 400);
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: filteredBody },
    { new: true, runValidators: true }
  );

  return updatedUser;
};


const updateEmail = async (userId, email, password) => {
  console.log({email, password});
  if (!email || !password) throw new AppError("Email and password are required", 400);

  const user = await User.findById(userId).select("+password");
  if (!user) throw new AppError("User not found", 404);

  const isPasswordValid = await user.isCorrectPassword(password);
  if (!isPasswordValid) throw new AppError("Invalid password", 401);

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { email },
    { new: true, runValidators: true }
  ).select("-password");

  return updatedUser;
};

const updatePassword = async (userId, currentPassword, newPassword, confirmPassword ) => {
  if (!currentPassword || !newPassword || !confirmPassword) throw new AppError("Password is required", 400);

  const user = await User.findById(userId).select("+password");
  if (!user) throw new AppError("User not found", 404);

  const isPasswordValid = await user.isCorrectPassword(currentPassword);
  if (!isPasswordValid) throw new AppError("Invalid password", 401);

  user.password = newPassword;
  user.confirmPassword = confirmPassword;
  user.passwordChangedAt = Date.now() - 1000;
  await user.save();
  return user.select("-password");
};



const getFavoriteFarms = async (favoritesIds, queryParams = {}) => {
  const query = new QueryClass(
    Farm.find({ _id: { $in: favoritesIds } }),
    queryParams
  );

  return await query
    .filter()
    .sort()
    .populate([
      { path: "facilities" },
      { path: "city" },
      { path: "category" },
    ]).query;
};

const toggleFavorite = async (user, farmId) => {
  const farmExists = await Farm.exists({ _id: farmId });

  if (!farmExists) {
    throw new AppError("No farm found with this id", 404);
  }

  let updatedUser;

  if (user.favorites.includes(farmId)) {
    updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $pull: { favorites: farmId } },
      { new: true }
    );
  } else {
    updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $addToSet: { favorites: farmId } },
      { new: true }
    );
  }

  return updatedUser;
};

const updateProfilePicture = async (userId, file) => {
  if (!file) throw new AppError("Please upload an image.", 400);

  const profilePictureUrl = await uploadSingleImage(file, "users/profile_pictures");
  if (!profilePictureUrl) throw new AppError("Failed to upload image.", 500);

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { profilePicture: profilePictureUrl },
    { new: true, runValidators: true }
  );

  return updatedUser;
};

module.exports = {
  getAllUsers,
  updateProfile,
  updateEmail,
  updatePassword,
  getFavoriteFarms,
  toggleFavorite,
  updateProfilePicture,
};