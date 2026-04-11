const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utills/wrapAsync.js");

//middeware
       const {validateReview} = require("../middleware.js");
       const {isLoggedIn, isOwner, isReviewAuthor} = require("../middleware.js");

      const Listing = require("../models/listing.js");
      const Review = require("../models/review.js");

//controlles reviews.js
const reviewController = require("../controller/reviews.js");

router.post("/",isLoggedIn,
   validateReview,
   wrapAsync(reviewController.createReview));


router.delete("/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.deleteReview));

module.exports = router;
