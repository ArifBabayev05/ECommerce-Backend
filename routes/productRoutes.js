const express = require('express')
const router = express.Router()
const getProduct  = require('../controller/productController')

router.get("/", getProduct)

router.get("/category/:categoryName",getProduct)

module.exports = router
