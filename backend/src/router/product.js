const express = require('express')
const controllerProduct = require('../controllers/product')

const router = express.Router()
// router.use(express.json())

router.post('/product', controllerProduct.create)

module.exports = router