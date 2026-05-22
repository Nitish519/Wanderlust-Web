
if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");


//express-sessions
const session = require("express-session");

const flash = require("connect-flash");


//passport authentication
const passport = require("passport");
const LocalStrategy = require("passport-local");


//for method override in edit and delete forms
const methodOverride = require("method-override");
app.use(methodOverride("_method"));


//user Schema for sign in/up
const User = require("./models/user.js");

//restructuring of listing
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");

//signup router
const userRouter  = require("./routes/user.js");


const dbUrl = process.env.ATLASDB_URL;

main()
.then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});

async function main(){
    await mongoose.connect(dbUrl);
}



//ejs setup

const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));




//error 
const  ExpressError = require("./utills/ExpressError.js");



const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "/public")));


//showRoute
app.use(express.urlencoded({extended : true}));


//session and cookies

const sessionOptions = {
   secret : process.env.SECRET,
    resave : false,                
    saveUninitialized : false,  

    cookie : {  
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000, 
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true,
    }
};


app.use(session(sessionOptions));

app.use(flash()); // to show when we add new listing

// signin/up

app.use(passport.initialize());  
app.use(passport.session());  
passport.use(new LocalStrategy(User.authenticate())); 

passport.serializeUser(User.serializeUser());  
passport.deserializeUser(User.deserializeUser()); 


//middleware to pass query params to ejs for filters

app.use((req,res,next)=>{

   res.locals.search =
      req.query.search || "";

   res.locals.priceRange =
      req.query.priceRange || "";

   res.locals.category =
      req.query.category || "";

   next();
});

//flash msgs
app.use((req,res,next) => {
    res.locals.success = req.flash("success");  
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});





//express router restructring of listings and reviews

app.use("/listings", listingsRouter);  
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/", userRouter);

app.get("/privacy",(req,res)=>{
    res.render("listings/privacy.ejs");
});

app.get("/terms",(req,res)=>{
    res.render("listings/terms.ejs");
});



//error handling

app.use((req, res, next) => {  
    next(new ExpressError(404, "Page Not Found"));
});


app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.render("error.ejs", {message});
});





const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});



