const express = require('express')
const { uploadCustomers } = require('../services/upload')
const controllerCustomers = require('../controllers/customers')
const Authorize = require('../middlewares/oAuth')
const router = express.Router()

router.post('/customer', Authorize("customer.create"), uploadCustomers.array('images', 1), controllerCustomers.Create)
router.get('/customers', Authorize("customer.read"), controllerCustomers.GetCustomers)
router.get('/customer/:id', Authorize("customer.read"), controllerCustomers.GetCustomerById)
router.put('/customer/:id', Authorize("customer.update"), uploadCustomers.array('images', 1) , controllerCustomers.UpdateCustomer)
router.put('/customer/updatepassword/:id', Authorize("customer.update"), controllerCustomers.UpdatePassword)
router.delete('/customer/:id', Authorize("customer.delete"), controllerCustomers.softdelete)

module.exports = router