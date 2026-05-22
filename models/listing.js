const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Review = require("./review.js");


const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,

      images : {
        type  : [
          {
            url: String,     
            filename: String,
          }
        ],
        default : []
      },
       

  price: {
  type: Number,
  required: true,
},

location: {
  type: String,
  required: true,
},

country: {
  type: String,
  required: true,
},


  category: {
    type: String,
    enum: [
        "Hotels",
        "Mountains",
        "Cabins",
        "Beaches",
        "Snow",
        "Lakes"
    ]
},


   reviews : [
    {
      type:Schema.Types.ObjectId, 
      ref : "Review",
    },
   ],

   avgRating : {
    type : Number,
    default : 0,
    min : 0,
    max : 5,
   },

   numReviews : {
    type : Number,
    default : 0,
   },

   owner : {  
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
   },
});

listingSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: { $in: doc.reviews },
    });
  }
});


const Listing  = mongoose.model("Listing", listingSchema);
module.exports = Listing; 





