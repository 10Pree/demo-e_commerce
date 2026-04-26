const express = require('express')
const { uploadCustomers } = require('../services/upload')
const controllerCustomers = require('../controllers/customers')
const router = express.Router()

router.post('/customer', uploadCustomers.single('image',), controllerCustomers.Create)
router.get('/customers', controllerCustomers.GetCustomers)
router.get('/customer/:id', controllerCustomers.GetCustomerById)
router.put('/customer/:id', uploadCustomers.single('image') , controllerCustomers.UpdateCustomer)
router.delete('/customer/:id', controllerCustomers.softdelete)

module.exports = router