const express = require("express");
const reviewRouter = express.Router();
const{getAllReviews,getPlanReview,top3reviews,createReview,updateReview,deleteReview} = require("../controller/reviewController");
const{protectRoute} = require("../controller/authController");

reviewRouter
.route('/all')
.get(getAllReviews)

reviewRouter
.route('/top3')
.get(top3reviews)

reviewRouter
.route('/:id')
.get(getPlanReview)


reviewRouter.use(protectRoute);
reviewRouter
.route('/crud/:plan')
.post(createReview)

reviewRouter
.route('/crud/:id')
.patch(updateReview)
.delete(deleteReview)


module.exports = reviewRouter;