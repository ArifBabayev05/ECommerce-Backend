const mongoose = require('mongoose');

const categoryScheme = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, default: "Default category description" },
    image: { type: String, default: "/images/tablet-category.png" },
    attrs: [{ key: { type: String }, value: [{ type: String }] }]
})

const Category = mongoose.model("Category", categoryScheme)

module.exports = Category