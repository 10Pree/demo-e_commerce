const express = require('express')
const { uploadCustomers } = require('../services/upload')
const controllerCustomers = require('../controllers/customers')
const Authorize = require('../middlewares/oAuth')
const router = express.Router()

router.post('/customer', Authorize("project.create"), uploadCustomers.array('images', 1), controllerCustomers.Create)
router.get('/customers', Authorize("project.read"), controllerCustomers.GetCustomers)
router.get('/customer/:id', Authorize("project.read"), controllerCustomers.GetCustomerById)
router.put('/customer/:id', Authorize("project.edit"), uploadCustomers.array('images', 1) , controllerCustomers.UpdateCustomer)
router.put('/customer/updatepassword/:id', Authorize("project.edit"), controllerCustomers.UpdatePassword)
router.delete('/customer/:id', Authorize("project.delete"), controllerCustomers.softdelete)

module.exports = router