const express = require('express')
const controllersAuth = require('../controllers/Auth')
const router = express.Router()

router.use(express.json())

router.post('/login', controllersAuth.Login )

module.exports = router