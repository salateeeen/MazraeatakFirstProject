const handleAsyncError = require("../error/asyncError");
const AppError = require("../error/AppError");
const notificationService = require("../services/notificationService");

const getNotifications = handleAsyncError(async (req, res, next) => {
  const notifications = await notificationService.getNotifications(req.user._id, req.query);

  res.status(200).json({
    status: "success",
    results: notifications.length,
    data: notifications,
  });
});

const markAsRead = handleAsyncError(async (req, res, next) => {
  const notification = await notificationService.markAsRead(req.params.id, req.user._id);

  if (!notification) return next(new AppError("Notification not found.", 404));

  res.status(200).json({
    status: "success",
    data: notification,
  });
});

const deleteNotification = handleAsyncError(async (req, res, next) => {
  const notification = await notificationService.deleteNotification(req.params.id, req.user._id);

  if (!notification) return next(new AppError("Notification not found.", 404));

  res.status(200).json({
    status: "success",
    data: null,
  });
});

const createNotification = async (userId, type, content, metadata = {}) => {
  return await notificationService.createNotification(userId, type, content, metadata);
};

module.exports = {
  getNotifications,
  markAsRead,
  deleteNotification,
  createNotification,
};
