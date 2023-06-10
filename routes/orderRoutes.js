const express = require('express')
const router = express.Router()
const getOrder  = require('../controller/orderController')

router.get("/", getOrder)

module.exports = router
