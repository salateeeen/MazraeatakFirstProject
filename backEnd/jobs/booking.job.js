const cron = require("node-cron");
const Booking = require("../models/bookingModel");


const startBookingJobs = () => {
  cron.schedule("*/5 * * * *", async () => {
    const now = new Date();

    await Booking.bulkWrite([
      {
        updateMany: {
          filter: {
            status: "confirmed",
            date: { $lt: now }
          },
          update: {
            $set: { status: "completed" }
          }
        }
      },
      {
        updateMany: {
          filter: {
            status: "pending",
            date: { $lt: now }
          },
          update: {
            $set: { status: "cancelled" }
          }
        }
      }
    ]);
  });
};

module.exports = {
  startBookingJobs,
}