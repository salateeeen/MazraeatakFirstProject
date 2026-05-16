const mongoose = require("mongoose");
const Farm = require("./farmModel");
const schemaOptions = require("../utils/schemaOptions");
const { isWeekendDay, isPast } = require("../utils/dates");
const cron = require("node-cron");
const AppError = require("../error/AppError");


const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "A booking must belong to a user."]
  },

  farm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "farm",
    required: [true, "A booking must belong to a farm."]
  },

  price: {
    type: Number,
    min: 0,
  },

  date: {
    type: Date,
    required: [true, "Booking date is required."],
    validate: {
      validator: function (val) {
        const date = new Date(val);
        date.setHours(0, 0, 0, 0);
        return date >= new Date().setHours(0, 0, 0, 0);
      },
      message: "You cannot book a past date.",
    }
  },

  timeSlot: {
    type: String,
    required: [true, "Time slot is required."],
    enum: {
      values: ["morning", "evening", "fullDay"],
      message: "Time slot must be either morning, evening, or fullDay."
    }
  },

  status: {
    type: String,
    enum: {
      values: ["pending", "confirmed", "cancelled", "completed"],
      message: "Status must be either pending, confirmed, cancelled, or completed."
    },
    default: "pending"
  },
},

  schemaOptions
);

bookingSchema.pre("save", async function (next) {
  if (this.toUpdate) {
    return next();
  }

  const dayType = isWeekendDay(this.date) ? "weekend" : "weekday"

  try {
    const farm = await Farm.findById(this.farm);

    if (!farm) {
      return next(new AppError("Farm not found.", 404));
    }

    if (farm.farmOwner.toString() === this.user.toString()) {
      return next(new AppError("You cannot book your own farm", 400));
    }

    let query = {
      farm: this.farm,
      date: this.date,
    };

    if (this.timeSlot === "fullDay") {
    } else {
      query.$or = [
        { timeSlot: "fullDay" },
        { timeSlot: this.timeSlot }
      ];
    }
    const conflict = await this.constructor.exists(query);

    if (conflict) {
      return next(new AppError("This date or slot is already booked."));
    }

    const pricingForDay = farm.pricing?.[dayType];

    if (!pricingForDay || !pricingForDay[this.timeSlot]) {
      return next(new AppError("Invalid time slot pricing.", 400));
    }

    this.price = pricingForDay[this.timeSlot];

    if (!this.price) {
      return next(new AppError("Price calculation failed", 500));
    }

    next();
  } catch (err) {
    next(err);
  }
});

bookingSchema.statics.getOccupiedSlots = async function (farmId, date) {
  const dates = date ? new Date(date) : new Date();
  dates.setHours(0, 0, 0, 0);
  
  const stats = await this.aggregate([
    {
      $match: {
        farm: new mongoose.Types.ObjectId(farmId),
        date: date ? dates : { $gte: dates },
        status: { $ne: "cancelled" }
      }
    },
    {
      $group: {
        _id: "$date",
        slots: { $addToSet: "$timeSlot" }
      }
    }
  ]);
  return stats || [];
};


bookingSchema.index(
  { farm: 1, date: 1, timeSlot: 1 },
  { user: 1, date: 1, status: 1 },
  { farm: 1, date: 1, status: 1 },
  { status: 1, date: 1 },
  { unique: true }
);

module.exports = mongoose.model("booking", bookingSchema);
