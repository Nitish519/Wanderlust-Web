require('dotenv').config();

// if(process.env.NODE_ENV != "production"){
//     require("dotenv").config();
// }

console.log(process.env.SECRET);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

const Review = require("./models/review.js");


//express-sessions


const session = require("express-session");

const flash = require("connect-flash");


//hashing and salting

const passport = require("passport");
const LocalStrategy = require("passport-local");
//user Schema for sign in/up
const User = require("./models/user.js");

//restructuring of listing

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");

//signup router

const userRouter  = require("./routes/user.js");

//mogoose connection with db
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
      .then(() => {
        console.log("conncetion to DB");
      })
      .catch((err)=> {
        console.log(err);
      });

async function main(){
    await mongoose.connect(MONGO_URL);
}


//ejs setup

const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


//phase3

//error 

const wrapAsync = require("./utills/wrapAsync.js");

const  ExpressError = require("./utills/ExpressError.js");

///validation from server side
const {listingSchema, reviewSchema} = require("./schema.js");  // note that you didnt write validatelisting but did write validatereview make sure to write both




//phase 2

                const ejsMate = require("ejs-mate");
                app.engine("ejs", ejsMate);

//statics file use 

                app.use(express.static(path.join(__dirname, "/public")));


//showRoute =>req.params to pass the data in req form
app.use(express.urlencoded({extended : true}));


//session and cookies just like a login session and cookies to track the session and flash to show the message when we add new listing or review

const sessionOptions = {
    secret : "mysupersecretcode",     //It’s like a password used to lock the session cookie.
    resave : false,                //Controls whether the session is saved back to the store on every request for same user
    saveUnintialized : true,  //Saves a new session even if it’s empty //tracking first time visitors      Useful for login, flash messages, first-time visitors


    cookie : {   // cookie are used to track sessions and bydefault they have no expires date
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000, // ms in one week  so in one week i dont need to login on website if i use thsi in login part
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httponly : true,  // security-purpose prevent from attacks
    }
};

// cookies are used to track sessions and
//  bydefault they have no expires date 
// so we set it to one week so that in one week i dont need to login on website i f i use thsi in login part
app.use(session(sessionOptions));

app.use(flash()); // to show when we add new listing

// signin/up

app.use(passport.initialize());  // a middleware that initializes passport
app.use(passport.session());  // so that website get to know is the same user sending request to another page from one page 
passport.use(new LocalStrategy(User.authenticate()));  // login / sign up

passport.serializeUser(User.serializeUser());  // “After login, remember who the user is, not all their data. store user id in session”
passport.deserializeUser(User.deserializeUser()); //“Take the stored ID and rebuild the logged-in user.   get user”



//flash
app.use((req,res,next) => {
    res.locals.success = req.flash("success");  // now use this in contollers
    res.locals.error = req.flash("error")
    res.locals.currUser = req.user;
    console.log(res.locals.success);
    next();
});


//user signUp

// /demouser login

// app.get("/demouser", async(req, res) => {
//     let fakeUser = new User({
//         email : "student@gmail.com",
//         username : "delta-student",
//     });

//     let registeredUser = await User.register(fakeUser, "helloworld");  // register(user, password, callback if any) => it register the user or also checks is it unique or not.  but  the finding in databases if else  you hould also know
//     res.send(registeredUser);
// });


//express router
app.use("/listings", listingsRouter);  // restructuring of listing


app.use("/listings/:id/reviews",reviewsRouter);

app.use("/", userRouter);



//custom error handiling part1 a

// app.use((err, req, res, next) => {
//     res.send("something went wrong!");   /// when you pass string in prce not number
// })

app.use((req, res, next) => {  // this wroks when incoming dont match to any route
    next(new ExpressError(404, "Page Not Found"));
});

// app.use((err, req, res, next) => {
    
//     let {statusCode, message} = err;
//     res.render(error.ejs, {message});  // or {err};
//     // res.status(statusCode).send(message);
// });

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.render("error.ejs", {message});
    //res.status(statusCode).send(message);
});



let port = 8080;
app.listen(8080, () => {
    console.log(`server is listening on ${port}`)
})










//this is the part of coding and many iportant other concepts you wrote before learning destructuring
// want to test thos then paste it before  custome handling part1 a


//model Listing



// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title:"My New Villa",
//         description:"By the Beach",
//         price: 200000,
//         location:"Ponda Goa",
//         country:"India",
//     });

//    await sampleListing.save();
//    console.log("sample was saved");
//    res.send("radhe radhe");
// })



// //index ROute


//             // app.get("/listings", (req, res) => {
//             //     Listing.find({}).then((res) => {
//             //         console.log(res);
//             //     });
//             // })

// //passing it to ejs so that it will be seen on UI  = index route

//             app.get("/listings",async (req, res) => {
//                 const allListings = await Listing.find({});
//                 res.render("listings/index.ejs", {allListings});   // data send to ejs file 
//                 //no slash before listing
//             })



// // New Route  => put it above show rpute else server think new as a id


//              app.get("/listings/new", (req, res)=> {
//                   res.render("listings/new.ejs")
//              })


// //show route


//              app.get("/listings/:id", async (req, res) => {
//                 let {id} = req.params;
//                 const detail = await Listing.findById(id).populate("reviews");
//                 res.render("listings/show.ejs", {detail});
//              })


// //create route && custom error handling

// //post will set the link on listings page and redirect will open that page after adding


//                 // app.post("/listing",async (req, res)=> {

//                 //     try{
//                 //          const newListing = new Listing(req.body.listing);
//                 //         await newListing.save();
//                 //         res.redirect("/listing"); 

//                 //     }catch(err) {
//                 //         next(err);
//                 //     }
                   
//                 // })


// //2nd way to show error

                
//                 app.post("/listings",wrapAsync(async (req, res)=> {

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
//                         await newListing.save();
//                         res.redirect("/listings"); 

//                     })
                   
//                 )

// //edit  && update route 
// const methodOverride = require("method-override");
// app.use(methodOverride("_method"));

//                 app.get("/listings/:id/edit", wrapAsync(async (req,res) => {
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


//                 app.put("/listings/:id", wrapAsync(async (req, res) => {
//                     const {id} = req.params;

//                 await Listing.findByIdAndUpdate(id, {...req.body.listing});
//                 res.redirect("/listings");
//                 }));



// // Delete listing

//                 app.delete("/listings/:id", wrapAsync(async (req, res) => {
//                     const {id } = req.params;
//                    let delid = await Listing.findByIdAndDelete(id); // call will go to the middleware inside listing.js to delete the reviews inside reviews collection or Schema
//                    console.log(delid);
//                    res.redirect("/listings");
//                 }));




// //Reviews   // require reviews model first
// //post route


// const validateReview = (req,res,next) => {
//     let {error} = reviewSchema.validate(req.body);

//     if(error) {
//         let errMsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400, errMsg);
//     } else {
//         next();
//     }
// }

// app.post("/listings/:id/reviews", validateReview, wrapAsync( async(req, res) => {  // passed validateReview as a middeleware
//     let listing = await Listing.findById(req.params.id);
//     let newReview = new Review(req.body.review); // form submisson par backend me review collection or model

//     listing.reviews.push(newReview); // reviews array me naya review push

//     await newReview.save();
//     await listing.save();    // review saved in listing too

//     console.log("new review saved");
//     // res.send("new review saved");
//     res.redirect(`/listings/${listing._id}`);
// }));


// //Delete review route

//     app.delete(
//         "/listings/:id/reviews/:reviewId",
//         wrapAsync (async(req, res) => {
//            let {id, reviewId} = req.params;
//             await Listing.findByIdAndUpdate(id, {$pull: {reviews : reviewId}});
//             await Review.findByIdAndDelete(reviewId);

//             res.redirect(`/listings/${id}`);

//         })
// );




//first req

// app.get("/", (req, res) => {
//     res.send("hello");
// });