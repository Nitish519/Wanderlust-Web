// Great question — your project uses Joi for schema validation on the server side.
// This is an industry-standard validation library in Express apps 👍


// “I used Joi for server-side schema validation to ensure clean, safe input before saving to MongoDB.”

const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        country: Joi.string().required(),
        //  image: Joi.any(), // 👈 ADD THIS  // this will handle by multer only
        // image: Joi.string().allow("", null),   // Why this is wrong for multer
        images : [
                    {
                        url: String,
                        filename: String,
                    }
            ]
    }).required(),
});

// module.exports = listingSchema;

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().required().min(1).max(5),
        comment : Joi.string().required(),
    }).required(),
});
