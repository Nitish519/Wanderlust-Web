const Listing = require("../models/listing");
const {cloudinary} = require("../cloudConflict.js");




module.exports.index = async (req, res) => {

  let { priceRange } = req.query;

  let query = {};

  if (priceRange) {


    if (priceRange === "5000") {   //String.trim(): string method removes whitespace from both ends of a string and returns a new string, without modifying the original string.  so if user enter 5000+ with some space before or after it will be handled by this trim() method and it will work fine.
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

// new listing route

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};


//show route

module.exports.showListing =   async (req, res) => {
                let {id} = req.params;
            const detail = await Listing.findById(id).populate({
                path:"reviews",    //nested populate
            populate : {
                path : "author",
            },
            })
            .populate("owner");


                console.log(detail);
                if(!detail){
                    req.flash("error", "Listing you requested for does not exist");
                    res.redirect("/listings");
                }else{
                    res.render("listings/show.ejs", {detail});
                }
                
             }

//create route  before image upload cloudinary

// module.exports.createListing = async (req, res, next) => {

//      if((!req.body.listing)){
//             throw new ExpressError(400, "Send Valid data for listing") ; // client ki gakti ki vjh se error  check it using hoppscotch 
//         }

//       let result  = listingSchema.validate(req.body);
//         console.log(result);
//                          const newListing = new Listing(req.body.listing);
                        

//         //owner assign to new listing
//                         newListing.owner = req.user._id;
//                         await newListing.save();


//         //flash

//                         req.flash("success", "New Listing Created!");
//                         res.redirect("/listings"); 

//                     }


//create route after image upload cloudinary

// module.exports.createListing = async (req, res, next) => {
//     console.log("REQ.FILE 👉", req.file);
// console.log("REQ.BODY 👉", req.body);

//     let url = req.file.path;
//     let filename = req.file.filename;

//     // console.log(url);
//     // console.log(filename);

//     const newListing = new Listing(req.body.listing);
//     newListing.image = {url, filename};    // addoing new field to listing schema
//     //owner assign to new listing
//     newListing .owner = req.user._id;
//     await newListing .save();

//     req.flash("success", "New Listing Created!");
//     res.redirect("/listings");

//     };



module.exports.createListing = async (req, res,next) => {
  const listing = new Listing(req.body.listing);

  // VERY IMPORTANT  fior cloudinary image upload to save in mongodb
//   listing.image = {
//     url: req.file.secure_url,
//     filename: req.file.public_id,
//   };

   console.log("FILES 👉", req.files);

   if (req.files && req.files.length > 0) {
        listing.images = req.files.map((file) => ({
            url: file.secure_url,  // not file.path because multer will not save the file in our local storage but cloudinary will give us the url of that image and we have to save that url in our database to show it on website
            filename: file.public_id,
        }));
    }

  listing.owner = req.user._id;
  await listing.save();

  console.log("FINAL SAVED 👉", listing);

  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};



//edit route


module.exports.renderEditForm = async (req,res) => {
                  
                let {id} = req.params;
                const detail = await Listing.findById(id);

                  if (!detail) {
                            throw new ExpressError(404, "Listing not found");
                            res.redirect("/listings");
                        }

                res.render("listings/edit.ejs", {detail});

                }

 //update route


module.exports.updatelisting = async (req, res) => {  // what this routw does is it takes the id of listing to update and the new data for that listing from req.body and then it updates the listing in the database with the new data and then redirects to the show page of that listing with updated data. and also handle the image upload if there is any new image uploaded by user while updating the listing. and also handle the flash message for successfull update of listing.
                   let {id} = req.params;

                // let listing = await Listing.findById(id);

              let   listing =  await Listing.findByIdAndUpdate(id, {...req.body.listing});


            //   if(typeof req.file !== "undefined") {
            //      listing.image = {
            //             url: file.path,
            //             filename: file.filename,
            //         };

            //         await listing.save();

            //   } 
            
            
            if (req.files && req.files.length > 0) {
                    const newImages = req.files.map((file) => ({
                        url: file.secure_url,
                        filename: file.public_id,
                    }));

                    listing.images.push(...newImages); // append images

                    await listing.save();
                    }
                 req.flash("success", "Listing Updated");
                res.redirect(`/listings/${id}`);
                };


//delete route =>c delete the listing and also delete the reviews associated with that listing using middleware in listing.js

// module.exports.destroyListing = async (req, res) => {
//                     const {id } = req.params;
//                    let delid = await Listing.findByIdAndDelete(id); // call will go to the middleware inside listing.js to delete the reviews inside reviews collection or Schema too
//                    console.log(delid);
//                      req.flash("success", "Listing Deleted");
//                    res.redirect("/listings");
//                 }


module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  //delete images from cloudinary

  if(listing.images && listing.images.length > 0){
    for(let img of listing.images){
      await cloudinary.uploader.destroy(img.filename);
     }
  }


  //delete listing and reviews associated with that listing using middleware in listing.js

  await Listing.findByIdAndDelete(id); // call will go to the middleware inside listing.js to delete the reviews inside reviews collection or Schema too  

  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
}
