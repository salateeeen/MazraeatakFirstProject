const Owner = require("../models/ownerModel");
const Farm = require("../models/farmModel");
const User = require("../models/userModel");
const Booking = require("../models/bookingModel");
const Review = require("../models/reviewModel");
const Notification = require("../models/notificationModel");
const AppError = require("../error/AppError");
const notificationService = require("./notificationService");

const getAllOwnersService = async () => {
  return Owner.find()
    .populate("user", "firstName lastName email")
    .lean();
};

const getPendingOwnersService = async () => {
  return Owner.find({ verificationStatus: "pending" })
    .populate("user", "firstName lastName email")
    .lean();
};

const restrictToOwnerService = async (userId) => {
  const owner = await Owner.findOne({ user: userId });

  if (!owner || owner.verificationStatus !== "approved") {
    throw new AppError(
      "Only verified owners can perform this action",
      403
    );
  }
  return owner;
};


const approveOwnerService = async (ownerId) => {
  const owner = await Owner.findById(ownerId).populate("user");

  if (!owner) {
    throw new AppError("Owner request not found.", 404);
  }

  if (owner.verificationStatus !== "pending") {
    throw new AppError("This request was already processed.", 400);
  }

  owner.verificationStatus = "approved";
  await owner.save();

  await User.findByIdAndUpdate(owner.user._id, {
    role: "owner",
  });

  await notificationService.createNotification(
    owner.user._id,
    "promotions",
    "Your owner account has been approved.",
    { ownerId: owner._id }
  );

  return owner;
};

const rejectOwnerService = async (ownerId) => {
  const owner = await Owner.findById(ownerId).populate("user");

  if (!owner) {
    throw new AppError("Owner request not found.", 404);
  }

  if (owner.verificationStatus !== "pending") {
    throw new AppError("This request was already processed.", 400);
  }

  owner.verificationStatus = "rejected";
  await owner.save();

  await notificationService.createNotification(
    owner.user._id,
    "promotions",
    "Your owner account request has been rejected.",
    { ownerId: owner._id }
  );

  return owner;
};


const requestOwnerService = async (userId, data) => {
  const existing = await Owner.exists({ user: userId });

  if (existing) {
    throw new AppError("You already requested owner account", 400);
  }

  const owner = await Owner.create({
    user: userId,
    verificationStatus: "pending",
    ...data,
  });

  await notificationService.notifyAdmins(
    "promotions",
    "New owner verification request submitted.",
    { ownerId: owner._id, userId }
  );

  return owner;
};

const getMyOwnerRequestService = async (userId) => {
  return await Owner.findOne({ user: userId }).lean();
};

const getOwnerDashboardService = async (userId) => {
  const farms = await Farm.find({ farmOwner: userId })
    .select("farmName coverImage ratingsAverage ratingsQuantity city")
    .populate("city", "name")
    .lean();

  const farmIds = farms.map((f) => f._id);

  const [
    bookingsCount,
    recentBookings,
    unreadNotifications,
  ] = await Promise.all([
    Booking.countDocuments({
      farm: { $in: farmIds },
      date: { $gte: new Date() },
      status: { $ne: "cancelled" },
    }),
    Booking.find({ farm: { $in: farmIds } })
      .sort("-createdAt")
      .limit(5)
      .populate({ path: "user", select: "firstName lastName" })
      .populate({ path: "farm", select: "farmName" })
      .lean(),
    Notification.countDocuments({ user: userId, read: false }),
  ]);

  const recentReviews = await Review.find({ farm: { $in: farmIds } })
    .sort("-createdAt")
    .limit(5)
    .populate({ path: "user", select: "firstName lastName" })
    .populate({ path: "farm", select: "farmName" })
    .lean();

  const owner = await Owner.findOne({ user: userId }).lean();

  return {
    farms,
    farmsCount: farms.length,
    upcomingBookingsCount: bookingsCount,
    recentBookings,
    recentReviews,
    totalEarnings: owner?.totalEarnings ?? 0,
    unreadNotifications,
    pendingOwnerRequests:
      owner?.verificationStatus === "pending" ? 1 : 0,
  };
};

module.exports = {
  getAllOwnersService,
  getPendingOwnersService,
  approveOwnerService,
  rejectOwnerService,
  restrictToOwnerService,
  requestOwnerService,
  getOwnerDashboardService,
  getMyOwnerRequestService,
};