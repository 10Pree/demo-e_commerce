const express = require('express')
const controllersLogin = require('../controllers/login')
const router = express.Router()

router.use(express.json())

router.post('/login', controllersLogin.Login )

module.exports = router