const express = require('express')
const Authorize = require('../middlewares/oAuth')
const controllerOrders = require('../controllers/orders')
const router = express.Router()

router.get('/order/summary',Authorize('product.read'), controllerOrders.getOrdersAndpayments)
router.get('/order/daily',Authorize('product.read'), controllerOrders.getDailyOrdersAndPayments)
router.get('/order/list',Authorize('product.read'),  controllerOrders.getListOrders)
router.get('/order/detail/:id',Authorize('product.read'),  controllerOrders.getOrderDetail)
router.post('/order',Authorize('product.read'),  controllerOrders.createOrder)
router.post('/order/item',Authorize('product.read'),  controllerOrders.createOrderItem)
router.post('/order/checkout',Authorize('product.read'),  controllerOrders.createOrderCheckout)

module.exports = router