const Listing = require("../models/listing.js");
const Review = require("../models/review.js");


module.exports.createReview = async (req, res) => {
  let { id } = req.params;

  let listing = await Listing.findById(id);
  let newReview = new Review(req.body.review);

  newReview.author = req.user._id;

  //update listing average rating and number of reviews when new review is added

let rating = Number(newReview.rating);

let oldAvg = listing.avgRating || 0;
let oldCount = listing.numReviews || 0;

listing.avgRating =
  ((oldAvg * oldCount) + rating) / (oldCount + 1);

listing.numReviews = oldCount + 1;

listing.avgRating = Number(listing.avgRating.toFixed(2));


  listing.reviews.push(newReview._id);

  await newReview.save();
  await listing.save();
    req.flash("success", "Review Created!");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteReview = async (req, res) => {

  let { id, reviewId } = req.params;

  let listing = await Listing.findById(id);
  let review = await Review.findById(reviewId);

  let oldCount = listing.numReviews || 0;

  // Update average rating
  if (oldCount <= 1) {
    listing.avgRating = 0;
    listing.numReviews = 0;
  } else {

    listing.avgRating =
      ((listing.avgRating * oldCount) - review.rating) /
      (oldCount - 1);

    listing.numReviews = oldCount - 1;
  }

  listing.avgRating =
    Number(listing.avgRating.toFixed(2));

  // remove review id from listing
  listing.reviews.pull(reviewId);

  // save listing first
  await listing.save();

  // delete review
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "review deleted!");

  res.redirect(`/listings/${id}`);
};

