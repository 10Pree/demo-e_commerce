const express = require('express')
const controllerPayments = require('../controllers/payments')
const router = express.Router()

router.post('/payment', controllerPayments.CreatePayment)
router.put('/payment',controllerPayments.UpdatePayment)

module.exports = router