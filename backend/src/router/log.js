const express = require('express')
const controllersLog = require('../controllers/log')
const Authorize = require('../middlewares/oAuth')
const router = express.Router()

router.get('/log/users', Authorize("project.read"), controllersLog.getLogUsers)
router.get('/log/products', Authorize("project.read"), controllersLog.getLogProducts)

module.exports = router