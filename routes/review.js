const express = require("express");
const router = express.Router({ mergeParams: true });  // important
// Enabling mergeParams allows this router to access req.params.id, which is required to associate reviews with a specific listing.
// Without mergeParams: true, req.params.id would be undefined, and database queries like Listing.findById(id) would fail
//bcz we are using id and that we left in app.js

const wrapAsync = require("../utills/wrapAsync.js");

//middeware
       const {validateReview} = require("../middleware.js");

       const {isLoggedIn, isOwner, isReviewAuthor} = require("../middleware.js");
// const ExpressError = require("../utills/ExpressError.js");
// const { reviewSchema } = require("../schema.js");

const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

//controlles reviews.js

const reviewController = require("../controller/reviews.js");



// see it in middleware


// const validateReview = (req, res, next) => {
//   let { error } = reviewSchema.validate(req.body);
//   if (error) {
//     let errMsg = error.details.map(el => el.message).join(",");
//     throw new ExpressError(400, errMsg);
//   }
//   next();
// };

// POST /listings/:id/reviews
router.post("/",isLoggedIn,
   validateReview,
   wrapAsync(reviewController.createReview));


   
//    wrapAsync(async (req, res) => {
//   let { id } = req.params;

//   let listing = await Listing.findById(id);
//   let newReview = new Review(req.body.review);

//   newReview.author = req.user._id;
//   console.log(newReview);
//   listing.reviews.push(newReview);

//   await newReview.save();
//   await listing.save();
//     req.flash("success", "Review Created!");
//   res.redirect(`/listings/${id}`);
// }));



// DELETE /listings/:id/reviews/:reviewId
router.delete("/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.deleteReview));
  
//   wrapAsync(async (req, res) => {
//   let { id, reviewId } = req.params;

//   await Listing.findByIdAndUpdate(id, {
//     $pull: { reviews: reviewId }
//   });

//   await Review.findByIdAndDelete(reviewId);
//     req.flash("success", "Nreview deleted!");
//   res.redirect(`/listings/${id}`);
// }));

module.exports = router;
