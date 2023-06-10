const express = require('express')
const router = express.Router()
const {getCategories,newCategory,deleteCategory,saveAttributes}  = require('../controller/categoryController')

router.get("/", getCategories)
router.post("/", newCategory)
router.delete("/:category", deleteCategory)
router.post("/attr", saveAttributes)

module.exports = router
