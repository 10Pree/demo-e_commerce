const express = require('express')
const controllerPayments = require('../controllers/payments')
const router = express.Router()

router.post('/payment', controllerPayments.createPayment)

module.exports = router