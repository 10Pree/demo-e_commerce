const express = require('express')
const controllerLogout = require('../controllers/logout')
const router = express.Router()

router.use(express.json())
router.post('/logout', controllerLogout.logout)

module.exports = router