const Product = require("../models/ProductModule")

const getProduct = (req,res)=>{
    Product.create({name: "Sonic"}) 
    res.send("Handling product routes, e.g. search for products")
}

module.exports = getProduct;