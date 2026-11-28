const express = require('express')
const controllersLog = require('../controllers/log')
const Authorize = require('../middlewares/oAuth')
const router = express.Router()

router.get('/log/users', Authorize("log.read"), controllersLog.getLogUsers)
router.get('/log/products', Authorize("log.read"), controllersLog.getLogProducts)

module.exports = router