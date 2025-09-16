const express = require('express')
const controllerOrders = require('../controllers/orders')
const router = express.Router()

router.post('/order', controllerOrders.create)

module.exports = router