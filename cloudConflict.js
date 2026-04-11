// const cloudinary = require("cloudinary").v2;
// const multerStorage = require("multer-storage-cloudinary");

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const storage = new multerStorage.CloudinaryStorage({
//     cloudinary,
//     params: {
//         folder: "wanderlust_DEV",
//         allowedFormats: ["jpeg", "png", "jpg"],
//     },
// });

// module.exports = {
//     cloudinary,
//     storage,
// };


// const cloudinary = require("cloudinary").v2;
const cloudinary = require("cloudinary");
// const multerStorageCloudinary = require("multer-storage-cloudinary");

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


console.log(process.env.CLOUDINARY_CLOUD_NAME);
console.log(process.env.CLOUDINARY_API_KEY);
console.log(process.env.CLOUDINARY_API_SECRET);


const multerStorageCloudinary = require("multer-storage-cloudinary");

const storage = multerStorageCloudinary({
    cloudinary,
    params: {
        folder: "wanderlust_DEV",
        allowedFormats: ["jpeg", "png", "jpg"],
    },
});

module.exports = {
    cloudinary,
    storage,
};

