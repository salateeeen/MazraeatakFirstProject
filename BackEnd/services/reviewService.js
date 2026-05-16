const Review = require("../models/reviewModel");
const Farm = require("../models/farmModel");
const QueryClass = require("../query/query");
const notificationService = require("./notificationService");

const getReviewsForFarm = async (farmId, queryParams = {}) => {
  const query = new QueryClass(Review.find({ farm: farmId }), queryParams);
  const reviews = await query
    .filter()
    .populate({ path: "user", select: "firstName lastName profilePicture" })
    .query;
  return reviews;
};

const createReview = async (userId, farmId, body) => {
  const { message, rating } = body;
  const review = await Review.create({
    farm: farmId,
    user: userId,
    rating,
    message,
  });

  const farm = await Farm.findById(farmId).select("farmOwner farmName");
  if (farm?.farmOwner) {
    await notificationService.createNotification(
      farm.farmOwner,
      "reviewReminders",
      `New review (${rating}/5) for ${farm.farmName}.`,
      { reviewId: review._id, farmId },
    );
  }

  return review;
};

module.exports = {
  getReviewsForFarm,
  createReview,
};
