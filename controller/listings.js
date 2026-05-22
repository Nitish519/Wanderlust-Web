const Listing = require("../models/listing");
const {cloudinary} = require("../cloudConflict.js");



// Fetch and filter listings based on price range
module.exports.index = async (req, res) => {

  let { priceRange, search, category } = req.query;
  let query = {};

  // SEARCH 
  if (search) {
    const escapedSearch = search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    query.$or = [
      { title: { $regex: escapedSearch, $options: "i" } },
      { location: { $regex: escapedSearch, $options: "i" } },
      { country: { $regex: escapedSearch, $options: "i" } }
    ];
  }

  // PRICE FILTER 
  if (priceRange) {

    if (priceRange === "5000") {
      query.price = { $gte: 5000 };
    } else {

      let [min, max] = priceRange
        .split("-")
        .map(Number);

      query.price = {
        $gte: min,
        $lte: max
      };
    }
  }

  // CATEGORY FILTER
  if (category) {
    query.category = category;
  }

  const allListings = await Listing.find(query);

  res.render("listings/index.ejs", {
    allListings, 
    req
});
};

// render form for new listing creation

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};


// Show detailed listing with reviews and owner

const mongoose = require("mongoose");


module.exports.showListing = async (req, res) => {

    let { id } = req.params;

    // invalid ObjectId check
    if (!mongoose.Types.ObjectId.isValid(id)) {

        req.flash(
            "error",
            "Listing you requested does not exist"
        );

        return res.redirect("/listings");
    }

    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");

    // listing not found in DB
    if (!listing) {

        req.flash(
            "error",
            "Listing you requested does not exist"
        );

        return res.redirect("/listings");
    }

    res.render(
        "listings/show.ejs",
        { listing }
    );
};

// Create a new listing with uploaded images
module.exports.createListing = async (req, res) => {

  
if(req.files && req.files.length > 5){

      req.flash(
        "error",
        "Maximum 5 images allowed"
      );

      return res.redirect("/listings/new");
  }

  const listing =
    new Listing(req.body.listing);

  if(req.files && req.files.length > 0){

      listing.images =
        req.files.map(file => ({
          url: file.secure_url,
          filename: file.public_id,
      }));
  }

  listing.owner = req.user._id;

  await listing.save();

  req.flash(
    "success",
    "New Listing Created!"
  );

  res.redirect("/listings");
};


// Render edit form for a listing
module.exports.renderEditForm = async (req,res) => {
                  
                let {id} = req.params;
                const listing = await Listing.findById(id);

                 if (!listing) {
                    req.flash("error", "Listing not found");
                    return res.redirect("/listings");
                }

                res.render("listings/edit.ejs", {listing});

                }

// Update listing details and handle new image uploads and deletions


module.exports.updatelisting =
async (req, res) => {

    let { id } = req.params;

    let listing =
      await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    // total image validation

    const deleteImages =
          req.body.deleteImages
          ? Array.isArray(req.body.deleteImages)
            ? req.body.deleteImages
            : [req.body.deleteImages]
          : [];

const deletedCount = deleteImages.length;
  //  const deletedCount =  req.body.deleteImages ? req.body.deleteImages.length : 0;

   const uploadedCount = req.files ? req.files.length : 0;



const totalImages = listing.images.length - deletedCount + uploadedCount;

    if(totalImages > 5){

        req.flash(
          "error",
          "Maximum 5 images allowed"
        );

        return res.redirect(
          `/listings/${id}/edit`
        );
    }

    // update fields
    listing =
      await Listing.findByIdAndUpdate(
        id,
        { ...req.body.listing },
        { new: true }
    );

    // upload new images
    if(req.files &&
       req.files.length > 0){

        const newImages =
          req.files.map(file => ({
            url: file.secure_url,
            filename: file.public_id,
        }));

        listing.images.push(
          ...newImages
        );

        await listing.save();
    }

    // delete selected images
   if(req.body.deleteImages){

    const deleteImages =
      Array.isArray(req.body.deleteImages)
      ? req.body.deleteImages
      : [req.body.deleteImages];

    for(let filename of deleteImages){
        await cloudinary
        .uploader
        .destroy(filename);
    }

    await listing.updateOne({
        $pull:{
            images:{
                filename:{
                    $in: deleteImages
                }
            }
        }
    });
}

    req.flash(
      "success",
      "Listing Updated"
    );

    res.redirect(
      `/listings/${id}`
    );
};



// Delete listing and associated images from cloudinary

module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  //delete images from cloudinary

  if(!listing){
   req.flash("error","Listing not found");
   return res.redirect("/listings");
}


  if(listing.images && listing.images.length > 0){
    for(let img of listing.images){
      await cloudinary.uploader.destroy(img.filename);
     }
  }
  //delete reviews associated with that listing
  await Listing.findByIdAndDelete(id);
  
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
}
