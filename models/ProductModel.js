
const mongoose = require("mongoose")
const Review = require("./ReviewModel");

const imageScheme = mongoose.Schema({
    path: { type: String, required: true }
})
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    reviewsNumber: {
        type: Number,
    },
    sales: {
        type: Number,
        default: 0
    },
    attrs: [
        { key: { type: String }, value: { type: String } }
    ],
    images: [
        imageScheme
    ],
    //1-n Relationship
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Review
        }
    ]



}, { timestamps: true })

const Product = mongoose.model("Product", productSchema)

//For be faster searcching operation
productSchema.index({ name: "text", description: "text" }, { name: "TextIndex" });
productSchema.index({ "attrs.key": 1, "attrs.value": 1 });


module.exports = Product