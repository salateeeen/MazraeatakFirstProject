const Owner = require("../models/ownerModel");
const User = require("../models/userModel");
const Farm = require("../models/farmModel");
const Booking = require("../models/bookingModel");
const Notification = require("../models/notificationModel");

const getAdminDashboardService = async () => {
  const [
    usersCount,
    farmsCount,
    bookingsCount,
    pendingOwnersCount,
    activeOwnersCount,
    recentBookings,
    unreadNotificationsCount,
  ] = await Promise.all([
    User.countDocuments(),
    Farm.countDocuments(),
    Booking.countDocuments({ status: { $ne: "cancelled" } }),
    Owner.countDocuments({ verificationStatus: "pending" }),
    Owner.countDocuments({ verificationStatus: "approved" }),
    Booking.find()
      .sort("-createdAt")
      .limit(10)
      .populate({ path: "user", select: "firstName lastName email" })
      .populate({ path: "farm", select: "farmName" })
      .lean(),
    Notification.countDocuments({ read: false }),
  ]);

  return {
    usersCount,
    farmsCount,
    bookingsCount,
    pendingOwnersCount,
    activeOwnersCount,
    recentBookings,
    unreadNotificationsCount,
  };
};

module.exports = {
  getAdminDashboardService,
};