const express = require('express')
const { uploadCustomers } = require('../services/upload')
const controllerCustomers = require('../controllers/customers')
const Authorize = require('../middlewares/oAuth')
const router = express.Router()

router.post('/customer', uploadCustomers.array('images', 1), controllerCustomers.Create)
router.get('/customers', controllerCustomers.GetCustomers)
router.get('/customer/:id', controllerCustomers.GetCustomerById)
router.put('/customer/:id', uploadCustomers.array('images', 1) , controllerCustomers.UpdateCustomer)
router.put('/customer/updatepassword/:id', uploadCustomers.single('images'), controllerCustomers.UpdatePassword)
router.delete('/customer/:id', controllerCustomers.softdelete)

module.exports = router