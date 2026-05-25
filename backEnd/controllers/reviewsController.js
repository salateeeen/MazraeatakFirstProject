const handleAsyncError = require("../error/asyncError");
const reviewService = require("../services/reviewService");

const getReviews = handleAsyncError(async (req, res, next) => {
  const reviews = await reviewService.getReviewsForFarm(req.params.id, req.query);
  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: reviews,
  });
});

const createReview = handleAsyncError(async (req, res, next) => {
  const { message, rating } = req.body;
  const review = await reviewService.createReview(
    req.user._id,
    req.params.id,
    { message, rating },
  );
  
  res.status(201).json({
    status: "success",
    data: review,
  });
});

module.exports = {
  createReview,
  getReviews,
};
