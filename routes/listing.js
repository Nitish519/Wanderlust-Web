const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
//.. bcz we are going in the parent directory

const wrapAsync = require("../utills/wrapAsync.js");

const  ExpressError = require("../utills/ExpressError.js");

///validation from server side
const {listingSchema, reviewSchema} = require("../schema.js");  // note that you didnt write validatelisting but did write validatereview make sure to write both


const {isLoggedIn, isOwner} = require("../middleware.js");
//convert /listings to / only


//controller => mvc pahse3

const listingController = require("../controller/listings.js");

//image upload

const multer = require("multer");
// const upload = multer({dest : 'uploads/'}); //uploads folder mei save
const {storage} = require("../cloudConflict.js");
const upload = multer({storage}); // uplaod to cloudinary



//router.route//  method of clean and compact writing

// router.route("/")
//    .get(wrapAsync(listingController.index))
//    .post(
//     isLoggedIn,
//     validateListing,
//     wrapAsync(listingController.createListing)
//    );


//    router.route("/:id")
//             .get(wrapAsync(listingController.showListing))
//             .put("/:id",
//                     isLoggedIn, 
//                     isOwner,
//                     wrapAsync(listingController.updatelisting))
//             .delete("/:id",
//                 isLoggedIn,
//                 isOwner,
//                  wrapAsync(listingController.destroyListing))
     


//index Route


            // app.get("/listings", (req, res) => {
            //     Listing.find({}).then((res) => {
            //         console.log(res);
            //     });
            // })

//passing it to ejs so that it will be seen on UI  = index route

            router.get("/", wrapAsync(listingController.index));
                // async (req, res) => {
                // const allListings = await Listing.find({});
                // res.render("listings/index.ejs", {allListings});   // data send to ejs file 
                //no slash before listing
            // })



// New Route  => put it above show rpute else server think new as a id
//Authnetication

             router.get("/new",isLoggedIn, listingController.renderNewForm);
            //      (req, res)=> {  // passed middleware tp check authentication

            //     // if(!req.isAuthenticated()){   // chech user loggecd in or not
            //     //     req.flash("error", "you must be logged in to create a listing!");
            //     //     res.redirect("/login");
            //     // }
            //     // else{
            //              res.render("listings/new.ejs");
            //     // }
                 
            //  });


//show route


             router.get("/:id", wrapAsync(listingController.showListing));
            // async (req, res) => {
            //     let {id} = req.params;
            // const detail = await Listing.findById(id).populate({
            //     path:"reviews",    //nested populate
            // populate : {
            //     path : "author",
            // },
            // })
            // .populate("owner");


            //     console.log(detail);
            //     if(!detail){
            //         req.flash("error", "Listing you requested for does not exist");
            //         res.redirect("/listings");
            //     }else{
            //         res.render("listings/show.ejs", {detail});
            //     }
                
            //  })


//create route && custom error handling

//post will set the link on listings page and redirect will open that page after adding


                // app.post("/listing",async (req, res)=> {

                //     try{
                //          const newListing = new Listing(req.body.listing);
                //         await newListing.save();
                //         res.redirect("/listing"); 

                //     }catch(err) {
                //         next(err);
                //     }
                   
                // })


//2nd way to show error
//create route
                
                // router.post("/",isLoggedIn, wrapAsync(listingController.createListing));


//upload image    //upload.single("listing[image]")  inside name should be same as in input name
           router.post(
  "/",
  isLoggedIn,
  upload.array("images", 5),   // for multiple image upload with max limit of 5
  wrapAsync(listingController.createListing)
);


                    
//                     wrapAsync(async (req, res)=> { 

//                     if((!req.body.listing)){

//                         throw new ExpressError(400, "Send Valid data for listing") ; // client ki gakti ki vjh se error  check it using hoppscotch 
//                     }
                
                        

// //validate schema  or you can also create a valiDateListing middleware too ans just pass it like next, note dont pass it in get

//                     //  if(!newListing.title){
//                     //     throw new ExpressError(400, "title is missing")
//                     // }

//                     // if(!newListing.description){
//                     //     throw new ExpressError(400, "desCription is missing")
//                     // }

//                     //  if(!newListing.price){
//                     //     throw new ExpressError(400, "price is missing")
//                     // }

//                     //  if(!newListing.location){
//                     //     throw new ExpressError(400, "location is missing")
//                     // }
//                     //  if(!newListing.country){
//                     //     throw new ExpressError(400, "country  is missing")
//                     // }


        
//         let result  = listingSchema.validate(req.body);
//         console.log(result);
//                          const newListing = new Listing(req.body.listing);
                        

//         //owner assign to new listing
//                         newListing.owner = req.user._id;
//                         await newListing.save();


//         //flash

//                         req.flash("success", "New Listing Created!");
//                         res.redirect("/listings"); 

//                     })
                   
//                 )

//edit  && update route 

const methodOverride = require("method-override");
router.use(methodOverride("_method"));

                router.get("/:id/edit",isLoggedIn,
                    isOwner, wrapAsync(listingController.renderEditForm));


//        wrapAsync(async (req,res) => {
//                    // console.log("request is coming");

//  //wrong bcz get request dont have body                    // if((!req.body.listing)){
//                     //     throw new ExpressError(400, "Send Valid data for listing") ; // client ki gakti ki vjh se error  check it using hoppscotch 
//                     // }

//                 let {id} = req.params;
//                 const detail = await Listing.findById(id);
// //this is correct
//                   if (!detail) {
//                             throw new ExpressError(404, "Listing not found");
//                         }

//                 res.render("listings/edit.ejs", {detail});

//                 }));



//update route


                router.put("/:id",
                    isLoggedIn, 
                    isOwner,
                    // upload.single("listing[image]"),   // middleware for image upload
                    upload.array("images", 5),   // for multiple image upload with max limit of 5
                    wrapAsync(listingController.updatelisting));

                    // ValidateListing,
    //                 wrapAsync(async (req, res) => {
    //                let {id} = req.params;


    //             let listing = await Listing.findById(id);

    // //create a middleware for it so you dont need to do this again for another routers

    //             // if(!listing.owner._id.equals(res.locals.currUser._id)) {
    //             //     req.flash("error", "you dont have permission to edit");
    //             //    return res.redirect(`/listings/${id}`);
    //             // }

    //              await Listing.findByIdAndUpdate(id, {...req.body.listing});
    //              req.flash("success", "Listing Updated");
    //             res.redirect("/listings");
    //             }));



// Delete listing

                router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));
                    
                //     wrapAsync(async (req, res) => {
                //     const {id } = req.params;
                //    let delid = await Listing.findByIdAndDelete(id); // call will go to the middleware inside listing.js to delete the reviews inside reviews collection or Schema too
                //    console.log(delid);
                //      req.flash("success", "Listing Deleted");
                //    res.redirect("/listings");
                // }));






module.exports = router;
