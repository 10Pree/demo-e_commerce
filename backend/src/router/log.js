const express = require('express')
const controllersLog = require('../controllers/log')
const router = express.Router()

router.get('/log/user', controllersLog.getLog)

module.exports = router