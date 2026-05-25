const express = require(`express`);
const authController = require(`../controllers/authController`)
const reviewsController = require(`../controllers/reviewsController`)
const router = express.Router()

router.get(`/farm/:id`, reviewsController.getReviews);

router.use(authController.protect)
router.post(`/:id`, reviewsController.createReview);

module.exports = router