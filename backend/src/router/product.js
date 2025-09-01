const express = require('express')
const controllerProduct = require('../controllers/product')

const router = express.Router()
// router.use(express.json())

router.post('/product', controllerProduct.Create)
router.get('/products', controllerProduct.Reads)
router.get('/product/:id', controllerProduct.Read)
router.get('/product/code/:code', controllerProduct.ReadCode)
router.put('/product/:id', controllerProduct.Update)
router.delete('/product/:id', controllerProduct.Delete)

module.exports = router