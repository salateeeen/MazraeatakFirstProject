const mongoose = require("mongoose");
const schemaOptions = require("../utils/schemaOptions");
const AppError = require("../error/AppError");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Review must belong to a user"],
    },
    farm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "farm",
      required: [true, "Review must belong to a farm"],
    },

    rating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must be at most 5"],
      required: [true, "Please provide a rating"],
    },
    message: {
      type: String,
      trim: true,
    },
  },
  schemaOptions
);

reviewSchema.pre("save", async function (next) {
  const review = await this.constructor.findOne({ user: this.user, farm: this.farm });
  if (review) {
    return next(new AppError("You have already reviewed this farm", 400));
  }
  const farm = await mongoose.model("farm").findById(this.farm);

  if (!farm) {
    return next(new AppError("Farm not found", 404));
  }

  if (farm.farmOwner.equals(this.user)) {
    return next(new AppError("You cannot review your own farm", 400));
  }

  next();
});

reviewSchema.statics.calcAverageRatings = async function (farmId) {
  const stats = await this.aggregate([
    {
      $match: { farm: new mongoose.Types.ObjectId(farmId) }
    },
    {
      $group: {
        _id: "$farm",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" }
      }
    }
  ]);

  if (stats.length > 0) {
    await mongoose.model("farm").findByIdAndUpdate(farmId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating
    });
  } else {
    await mongoose.model("farm").findByIdAndUpdate(farmId, {
      ratingsQuantity: 0,
      ratingsAverage: 0
    });
  }
};

reviewSchema.post("save", async function () {
  await this.constructor.calcAverageRatings(this.farm);
});

reviewSchema.index({ user: 1, farm: 1 }, { unique: true });
reviewSchema.index({ farm: 1 });

module.exports = mongoose.model("review", reviewSchema);
