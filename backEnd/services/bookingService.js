const Booking = require("../models/bookingModel");
const Farm = require("../models/farmModel");
const QueryClass = require("../query/query");
const AppError = require("../error/AppError");
const { getNextSevenDays, formatToShortDate } = require("../utils/dates");
const notificationService = require("./notificationService");

const getUserBookings = async (userId, queryParams = {}) => {
  const query = { sort: "-createdAt", ...queryParams };
  const Query = new QueryClass(Booking.find({ user: userId }), query);
  const bookings = await Query.filter()
    .populate({
      path: "farm",
      select: "farmName farmOwner coverImage timeSlots location",
      populate: { path: "farmOwner", select: "phone" },
    })
    .sort().query;
  return bookings;
};

const getOwnerBookings = async (ownerId, queryParams = {}) => {
  const ownerFarms = await Farm.find({ farmOwner: ownerId }).select("_id");
  const farmIds = ownerFarms.map((f) => f._id);

  const query = { sort: "-createdAt", ...queryParams };
  const Query = new QueryClass(Booking.find({ farm: { $in: farmIds } }), query);
  const bookings = await Query.filter()
    .populate({
      path: "user",
      select: "firstName lastName profilePicture",
    })
    .populate({
      path: "farm",
      select: "farmName coverImage timeSlots",
    })
    .sort().query;
  return bookings;
};

const getFarmBookings = async (farmId, queryParams = {}) => {
  const query = { ...queryParams };
  const Query = new QueryClass(Booking.find({ farm: farmId }), query);
  const bookings = await Query.filter()
    .populate({
      path: "user",
      select: "firstName lastName profilePicture",
    })
    .sort().query;
  return bookings;
};


const createBooking = async (userId, farmId, body) => {
  const { timeSlot, date } = body;
  const booking = await Booking.create({
    user: userId,
    farm: farmId,
    date,
    timeSlot
  });

  const populated = await Booking.findById(booking._id).populate({
    path: "farm",
    select: "farmOwner farmName",
  });

  if (populated?.farm?.farmOwner) {
    await notificationService.createNotification(
      populated.farm.farmOwner,
      "bookingUpdates",
      `New booking for ${populated.farm.farmName} on ${new Date(date).toLocaleDateString()} (${timeSlot})`,
      { bookingId: booking._id, timeSlot },
    );
  }

  return booking;
};


const confirmBooking = async (bookingId) => {
  const booking = await Booking.findByIdAndUpdate(bookingId)
  .populate({
    path: "farm",
    select: "farmName",
  });

  if (!booking) {
    throw new AppError("No booking found with this ID.", 404);
  }

  if (booking.status === "cancelled") {
    throw new AppError("Cannot confirm a cancelled booking.", 400);
  }

  if (booking.status === "confirmed") {
    throw new AppError("This booking is already confirmed.", 400);
  }

  booking.toUpdate = true;
  booking.status = "confirmed";
  await booking.save({ validateModifiedOnly: true, });

  const bookerId = booking.user?._id || booking.user;

  if (bookerId) {
    const dateStr = new Date(booking.date).toLocaleDateString();
    await notificationService.createNotification(
      bookerId,
      "bookingUpdates",
      `Your booking for ${booking.farm.farmName} on ${dateStr} has been confirmed.`,
      { bookingId, type: "confirm" },
    );
  }

  return booking;
};

const cancelBooking = async (bookingId) => {
  const booking = await Booking.findByIdAndUpdate(bookingId)
  .populate({
    path: "farm",
    select: "farmName",
  });

  if (!booking) {
    throw new AppError("No booking found with this ID.", 404);
  }

  if (booking.status === "cancelled") {
    throw new AppError("This booking is already cancelled.", 400);
  }

  if (booking.status === "confirmed") {
    throw new AppError("Cannot cancel a confirmed booking.", 400);
  }

  booking.toUpdate = true;
  booking.status = "cancelled";
  await booking.save({ validateModifiedOnly: true, });

  const bookerId = booking.user?._id || booking.user;

  if (bookerId) {
    const dateStr = new Date(booking.date).toLocaleDateString();
    await notificationService.createNotification(
      bookerId,
      "bookingUpdates",
      `Your booking for ${booking.farm.farmName} on ${dateStr} has been cancelled.`,
      { bookingId, type: "cancel" },
    );
  }

  return booking;
};


const buildAvailabilityService = async (farmId, date = null) => {
  const bookedSlots = await Booking.getOccupiedSlots(farmId, date);

  const bookedMap = new Map(
    bookedSlots.map(b => [
      formatToShortDate(new Date(b._id)),
      b.slots
    ])
  );

  if (date) {
    return bookedMap.get(formatToShortDate(new Date(date))) || [];
  }

  const nextSevenDays = getNextSevenDays();

  return nextSevenDays.map(day => {
    const dateOnly = formatToShortDate(new Date(day));

    let morning = "available";
    let evening = "available";
    let fullDay = "available";

    const slots = bookedMap.get(dateOnly);

    if (slots) {
      if (slots.includes("fullDay")) {
        morning = "notAvailable";
        evening = "notAvailable";
        fullDay = "notAvailable";
      } else {
        if (slots.includes("morning")) {
          morning = "notAvailable";
          fullDay = "notAvailable";
        }
        if (slots.includes("evening")) {
          evening = "notAvailable";
          fullDay = "notAvailable";
        }
      }
    };

    return {
      date: dateOnly,
      morning,
      evening,
      fullDay
    };
  });
}


module.exports = {
  getUserBookings,
  getOwnerBookings,
  getFarmBookings,
  createBooking,
  cancelBooking,
  confirmBooking,
  buildAvailabilityService,
};
