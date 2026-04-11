const mongoose = require("mongoose");
const initDT = require("./data.js");
const Listing = require("../models/listing.js");
const { init } = require("../models/review.js");


//mogoose connection with database
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

//function to initialize the database with data from data.js

const initDB = async() => {
    await Listing.deleteMany({});
    initDT.data = initDT.data.map((obj) => ({  
  ...obj,
  owner: new mongoose.Types.ObjectId("696c73b0d1be11e8b4a0a395"),
}));

    await Listing.insertMany(initDT.data);
    console.log(initDT.data[0]);
    console.log("data was initialized");
}

initDB();
