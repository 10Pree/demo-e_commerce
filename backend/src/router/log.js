const express = require('express')
const controllersLog = require('../controllers/log')
const router = express.Router()

router.get('/log/users', controllersLog.getLogUsers)
router.get('/log/products', controllersLog.getLogProducts)

module.exports = router