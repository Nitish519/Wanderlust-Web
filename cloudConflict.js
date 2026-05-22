
const cloudinary = require("cloudinary");

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


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

