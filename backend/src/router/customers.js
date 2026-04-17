const express = require('express')
const { uploadCustomers } = require('../services/upload')
const controllerCustomers = require('../controllers/customers')
const router = express.Router()

router.post('/customer', uploadCustomers.array('images'), controllerCustomers.Create)

module.exports = router