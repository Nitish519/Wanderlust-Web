const Listing = require("../models/listing");
const {cloudinary} = require("../cloudConflict.js");



// Fetch and filter listings based on price range
module.exports.index = async (req, res) => {

  let { priceRange } = req.query;
  let query = {};

  if (priceRange) {
    if (priceRange === "5000") {   
      query.price = { $gte: 5000 };
    } else {
      let [min, max] = priceRange.split("-").map(Number);

      query.price = {
        $gte: min,
        $lte: max
      };
    }
  }
  
  const allListings = await Listing.find(query);
  res.render("listings/index.ejs", { allListings });
};

// render form for new listing creation

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};


// Show detailed listing with reviews and owner

module.exports.showListing =   async (req, res) => {
              let {id} = req.params;
              const detail = await Listing.findById(id).populate({
              path:"reviews", 
            populate : {
                path : "author",
            },
            })
            .populate("owner");

                if(!detail){
                    req.flash("error", "Listing you requested for does not exist");
                    res.redirect("/listings");
                }else{
                    res.render("listings/show.ejs", {detail});
                }
                
             }

// Create a new listing with uploaded images

module.exports.createListing = async (req, res,next) => {
  const listing = new Listing(req.body.listing);

   if (req.files && req.files.length > 0) {
        listing.images = req.files.map((file) => ({
            url: file.secure_url,  
            filename: file.public_id,
        }));
    }

  listing.owner = req.user._id;
  await listing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};



// Render edit form for a listing
module.exports.renderEditForm = async (req,res) => {
                  
                let {id} = req.params;
                const detail = await Listing.findById(id);

                 if (!detail) {
                    req.flash("error", "Listing not found");
                    return res.redirect("/listings");
                }

                res.render("listings/edit.ejs", {detail});

                }

// Update listing details and handle new image uploads

module.exports.updatelisting = async (req, res) => {  
              let {id} = req.params;
              let   listing =  await Listing.findByIdAndUpdate(id, {...req.body.listing});
           
             if (req.files && req.files.length > 0) {
                    const newImages = req.files.map((file) => ({
                        url: file.secure_url,
                        filename: file.public_id,
                    }));

                    listing.images.push(...newImages);

                    await listing.save();
                    }
                req.flash("success", "Listing Updated");
                res.redirect(`/listings/${id}`);
                };



// Delete listing and associated images from cloudinary

module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  //delete images from cloudinary
  if(listing.images && listing.images.length > 0){
    for(let img of listing.images){
      await cloudinary.uploader.destroy(img.filename);
     }
  }
  //delete listing and reviews associated with that listing

  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
}
