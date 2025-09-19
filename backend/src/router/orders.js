const express = require('express')
const controllerOrders = require('../controllers/orders')
const router = express.Router()

router.post('/order', controllerOrders.createOrder)
router.post('/order/itme', controllerOrders.createOrderItem)

module.exports = router