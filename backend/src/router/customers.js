const express = require('express')
const { uploadCustomers } = require('../services/upload')
const controllerCustomers = require('../controllers/customers')
const router = express.Router()

router.post('/customer', uploadCustomers.single('image'), controllerCustomers.Create)

module.exports = router