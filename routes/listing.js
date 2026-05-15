const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");

const wrapAsync = require("../utills/wrapAsync.js");

const  ExpressError = require("../utills/ExpressError.js");

///validation from server side
const {listingSchema, reviewSchema} = require("../schema.js");


const {isLoggedIn, isOwner} = require("../middleware.js");

const listingController = require("../controller/listings.js");

//image upload
const multer = require("multer");
const {storage} = require("../cloudConflict.js");
const upload = multer({storage}); 


router.get("/", wrapAsync(listingController.index));
router.get("/new",isLoggedIn, listingController.renderNewForm);
          
//show listing details
            router.get("/:id", wrapAsync(listingController.showListing));

            router.post("/",
                isLoggedIn,
                upload.array("images", 5),
                wrapAsync(listingController.createListing)
            );

            const methodOverride = require("method-override");
            router.use(methodOverride("_method"));

           router.get("/:id/edit",isLoggedIn,
                    isOwner, wrapAsync(listingController.renderEditForm
                 ));


//update listings
                router.put("/:id",
                    isLoggedIn, 
                    isOwner,
                    // upload.array("images", 5),
                    upload.array("listing[images]", 5),
                    wrapAsync(listingController.updatelisting));

// Delete listing
                router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;
