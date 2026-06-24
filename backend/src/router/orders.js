const express = require('express')
const controllerOrders = require('../controllers/orders')
const router = express.Router()

router.get('/order/summary', controllerOrders.getOrdersAndpayments)
router.get('/order/daily', controllerOrders.getDailyOrdersAndPayments)
router.post('/order', controllerOrders.createOrder)
router.post('/order/itme', controllerOrders.createOrderItem)

module.exports = router