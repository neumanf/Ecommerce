const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
        },
        image_url: {
            type: String,
            trim: true,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        categories: {
            type: [String],
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
