const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const notificationController = require("../controllers/notificationsController");

router.use(authController.protect);

router.get("/", notificationController.getNotifications);

router.patch("/:id/read", notificationController.markAsRead);

router.delete("/:id", notificationController.deleteNotification);

module.exports = router;