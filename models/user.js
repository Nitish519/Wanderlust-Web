// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const passportLocalMongoose = require("passport-local-mongoose");


// //you are free to define you User how you like, 
// // Pasport-Local Mongoose will add a username, hash, salt field to store the username, the hashed passwod and salt value

// const userSchema = new Schema({
//     email : {
//         type : String,
//         required : true,
//     }

// })

// userSchema.plugin(passportLocalMongoose);   //passport-local-mongoose simplifies authentication by automatically adding username/password fields, hashing logic, and authentication methods to the Mongoose user schema.

// module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);

