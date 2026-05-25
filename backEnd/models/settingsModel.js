const mongoose = require("mongoose");
const schemaOptions = require("../utils/schemaOptions");

const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;

const settingsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  ui: {
    theme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "system",
    },
  },

  notifications: {
    soundAlerts: { type: Boolean, default: true },
    deliveryMethods: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
    },
    types: {
      bookingUpdates: { type: Boolean, default: true },
      bookingReminders: { type: Boolean, default: true },
      paymentUpdates: { type: Boolean, default: true },
      reviewReminders: { type: Boolean, default: true },
      promotions: { type: Boolean, default: false },
    },
  },

  localization: {
    language: { type: String, enum: ["en", "ar"], default: "en" },
    region: { type: String, enum: ["JO", "SA", "AE", "EG"], default: "JO" },
    timezone: { type: String, default: "Asia/Amman" },
  },

  privacy: {
    appearInSearch: { type: Boolean, default: true },
  },

  security: {
    twoFactorAuth: { type: Boolean, default: true },
  },

  ownerSettings: {
    autoAcceptBookings: { type: Boolean, default: false },
    allowInstantBooking: { type: Boolean, default: true },
    cancellationWindowHours: { type: Number, default: 24, min: 0 },
  },

  payoutMethod: {
    type: String,
    enum: ["bank", "paypal", "stripe"],
    default: "bank",
  },
  accountMasked: { type: String },
  last4: { type: String },
  verified: { type: Boolean, default: false },
  currency: { type: String, enum: ["USD", "JOD", "SAR", "AED", "EGP"], default: "JOD" },
},
  schemaOptions
);

settingsSchema.index({ user: 1 }, { unique: true });

module.exports = mongoose.model("Setting", settingsSchema);
