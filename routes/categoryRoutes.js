const express = require('express')
const router = express.Router()
const {getCategories,newCategory}  = require('../controller/categoryController')

router.get("/", getCategories)
router.post("/", newCategory)

module.exports = router
