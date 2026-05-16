const mongoose = require("mongoose");
const schemaOptions = require("../utils/schemaOptions");
const Setting = require("../models/settingsModel");
const AppError = require("../error/AppError");

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "bookingUpdates",
        "reviewReminders",
        "promotions",
        "bookingReminders",
        "paymentUpdates",
      ],
      required: true,
    },
    content: { type: String, required: true },
    read: { type: Boolean, default: false },
    metadata: { type: mongoose.Schema.Types.Mixed },
  },
  schemaOptions,
);


module.exports = mongoose.model("notification", notificationSchema);
