const mongoose = require("mongoose");
const schemaOptions = require("../utils/schemaOptions");

const ownerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
      index: true,
    },

    businessName: {
      type: String,
      trim: true,
      required: [true, "Business name is required"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },

    experience: {
      type: String,
      required: [true, "Experience detail is required"],
    },

    socialMedia: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    verificationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },

    totalEarnings: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  schemaOptions
);

module.exports = mongoose.model("owner", ownerSchema);