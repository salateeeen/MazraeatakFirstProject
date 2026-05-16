const Notification = require("../models/notificationModel");
const QueryClass = require("../query/query");
const User = require("../models/userModel");
const Setting = require("../models/settingsModel");

const getNotifications = async (userId, queryParams) => {
  const queryObj = { ...queryParams, user: userId };
  const Query = new QueryClass(Notification.find(), queryObj);

  return await Query.filter()
    .sort()
    .populate({ path: "user", select: "firstName lastName profilePicture" })
    .query;
};

const markAsRead = async (notificationId, userId) => {
  return await Notification.findOneAndUpdate(
    { _id: notificationId, user: userId },
    { read: true },
    { new: true }
  );
};

const deleteNotification = async (notificationId, userId) => {
  return await Notification.findOneAndDelete({
    _id: notificationId,
    user: userId,
  });
};

const createNotification = async (userId, type, content, metadata = {}) => {
  const settings = await Setting.findOne({ user: userId });

  if (!settings) return;

  if (!settings.notifications?.types?.[type]) return;

  return await Notification.create({
    user: userId,
    type,
    content,
    metadata,
  });
};

const notifyAdmins = async (type, content, metadata = {}) => {
  const admins = await User.find({ role: "admin" });
  const notifications = admins.map((admin) =>
    createNotification(admin._id, type, content, metadata)
  );
  return await Promise.all(notifications);
};

module.exports = {
  getNotifications,
  markAsRead,
  deleteNotification,
  createNotification,
  notifyAdmins,
};
