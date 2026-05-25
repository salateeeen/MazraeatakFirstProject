const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: [true, "Please provide city location"],
        validate: {
          validator: (v) => v.length === 2,
          message: "Coordinates must be [lng, lat]",
        },
      },
    },
  },

  { timestamps: false }
);

citySchema.index({ location: "2dsphere" });

module.exports = mongoose.model("city", citySchema);
