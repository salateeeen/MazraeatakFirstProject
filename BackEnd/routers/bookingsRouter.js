const express = require(`express`);
const authController = require(`../controllers/authController`)
const bookingsController = require(`../controllers/bookingsController`)
const router = express.Router()


router.get(`/farm-bookings/:id`, bookingsController.getFarmBookings);

router.use(authController.protect)
router.get(`/user-bookings`, bookingsController.getUserBookings);
router.get(`/owner-bookings`, authController.restrictTo('owner'), bookingsController.getOwnerBookings);
router.post(`/create-booking/:id`, bookingsController.createBooking);
router.patch(`/confirm-booking/:id`, authController.restrictTo('owner'), bookingsController.confirmBooking);
router.patch(`/cancel-booking/:id`, bookingsController.cancelBooking);

module.exports = router