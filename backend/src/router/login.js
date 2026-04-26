const express = require('express')
const controllersLogin = require('../controllers/login')
const router = express.Router()

router.use(express.json())

router.post('/login/admin', controllersLogin.Login )
router.post('/login/customer', controllersLogin.LoginCustomer )

module.exports = router