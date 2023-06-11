const recordsPerPage = require("../config/pagination");
const Product = require("../models/ProductModel")

const getProduct = async (req,res, next)=>{
    try {
        const products = await Product.find({}).sort({name:1}).limit(recordsPerPage)
        // 1-->Ascending; -1-->Descending
        res.json({products});
    } catch (error) {
        next(error)
    }

}

module.exports = getProduct;