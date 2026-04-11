const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//to delete review from listingSchema 

const Review = require("./review.js");


// const listingSchema = new Schema({
//     title:{
//         type:String,
//         required:true,
//     },
//     description:String,
//     image:{
//       type:  String,
//       default:"https://in.images.search.yahoo.com/search/images;_ylt=AwrPrEoeDVRpFgIAuYy7HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3Nj?type=E210IN826G0&p=images&fr=mcafee&th=266&tw=474&imgurl=https%3A%2F%2Fi2.wp.com%2Ffiles.all-free-download.com%2Fdownloadfiles%2Fwallpapers%2F1920_1080%2Fpeaceful_lake_wallpaper_landscape_nature_1208.jpg&rurl=https%3A%2F%2Fbezgranic.magnit.ru%2Fread%2Fjpeg-images-free.html&size=681KB&name=Jpeg+Images+Free+Jpeg+File+Size+Can+Be+Up+To+30+Mb.+-+Printable+...&oid=3&h=1080&w=1920&turl=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.LO9HfY3cOKXbSDm-uEL-iwHaEK%3Fpid%3DApi&tt=Jpeg+Images+Free+Jpeg+File+Size+Can+Be+Up+To+30+Mb.+-+Printable+...&sigr=JT6w9Wo5tX6U&sigit=gq8PPio1Oxvy&sigi=5pguLH1eS3mj&sign=2.KEukWUuoiy&sigt=2.KEukWUuoiy",
//       set : (v) => v==="" ? "https://in.images.search.yahoo.com/search/images;_ylt=AwrPrEoeDVRpFgIAt4y7HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3Nj?type=E210IN826G0&p=images&fr=mcafee&th=306&tw=474&imgurl=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F443446%2Fpexels-photo-443446.jpeg%3Fcs%3Dsrgb%26dl%3Ddaylight-forest-glossy-443446.jpg%26fm%3Djpg&rurl=https%3A%2F%2Fwww.pexels.com%2Fsearch%2FHD%2520wallpaper%2F&size=2933KB&name=HD+Wallpapers+%C2%B7+Pexels&oid=1&h=3403&w=5266&turl=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.3i3ElDRKPuAFLx5haLsvSwHaEy%3Fpid%3DApi&tt=HD+Wallpapers+%C2%B7+Pexels&sigr=cRWEl8Y6zeDo&sigit=WyU3SZa51PdW&sigi=5FMllzMJ.7J7&sign=9ggOfrE5avAZ&sigt=9ggOfrE5avAZ" : v,
//     },
//     price:Number,
//     location:String,
//     country:String,
// });

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,

  // image: {
  //   filename: {
  //     type: String,
  //     default: "listingimage",
  //   },
  //   url: {
  //     type: String,
  //     default:
  //       "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b",
  //     set: (v) =>
  //       v === ""
  //         ? "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b"
  //         : v,
  //   },
  // },

  //clodibary image upload

      // images : [{
      //     url: String,     //show image on website
      //     filename: String,   //cloudinary me jo image ka name hoga
      // }],

      images : {
        type  : [
          {
            url: String,     //show image on website
            filename: String,   //cloudinary me jo image ka name hoga
          }
        ],
        default : []
      },
       

  price: Number,
  location: String,
  country: String,
//reviews
   reviews : [
    {
      type:Schema.Types.ObjectId,    //Each listing stores IDs of reviews, not full reviews.
      ref : "Review",               //refer to review model where full reviews are stored and we can populate it when needed.  => .populate("reviews")
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

   owner : {   //owner field added to listing schema to link listing to user This is how you buikt permission system to edit or delete listing only by its owner
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
   },
});

// when we delete a lisitng not review then in app.js  ke andar findOneAndDelete call for any listing happen then this middleware work in listing and delete the review inside listing schema and in review Schema too by matching its id 
listingSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: { $in: doc.reviews },
    });
  }
});




const Listing  = mongoose.model("Listing", listingSchema);   //mongodb collection will be listings
module.exports = Listing; 