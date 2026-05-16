const handleAsyncError = require(`../error/asyncError`);
const bookingService = require("../services/bookingService");

const getUserBookings = handleAsyncError(async (req, res, next) => {
  const bookings = await bookingService.getUserBookings(req.user._id, req.query);

  res.status(200).json({
    status: "success",
    results: bookings.length,
    data: bookings,
  });
});

const getOwnerBookings = handleAsyncError(async (req, res, next) => {
  const bookings = await bookingService.getOwnerBookings(req.user._id, req.query);

  res.status(200).json({
    status: "success",
    results: bookings.length,
    data: bookings,
  });
});

const getFarmBookings = handleAsyncError(async (req, res, next) => {
  const bookings = await bookingService.getFarmBookings(req.params.id, req.query);

  res.status(200).json({
    status: "success",
    results: bookings.length,
    data: bookings,
  });
});



const createBooking = handleAsyncError(async (req, res, next) => {
  const booking = await bookingService.createBooking(req.user._id, req.params.id, req.body);

  res.status(201).json({
    status: "success",
    data: booking,
  });
});

const cancelBooking = handleAsyncError(async (req, res, next) => {
  await bookingService.cancelBooking(req.params.id, req.user._id);

  res.status(201).json({
    status: "success",
    data: null,
  });
});

const confirmBooking = handleAsyncError(async (req, res, next) => {
  const booking = await bookingService.confirmBooking(req.params.id, req.user._id);

  res.status(200).json({
    status: "success",
    data: booking,
  });
});

module.exports = {
  createBooking,
  cancelBooking,
  confirmBooking,
  getUserBookings,
  getOwnerBookings,
  getFarmBookings,
};
