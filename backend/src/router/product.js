const express = require('express')
const Authorize = require('../middlewares/oAuth')
const controllerProduct = require('../controllers/product')
const { uploadProduct } = require('../services/upload')

const router = express.Router()
// router.use(express.json())

router.post('/product', Authorize("product.create"), uploadProduct.array('images', 12), controllerProduct.Create2);
router.get('/product/code/:code', controllerProduct.ReadCode)
router.get('/products',Authorize("product.read"), controllerProduct.Reads)
router.get('/product/:id',Authorize("product.read"), controllerProduct.Read)
router.put('/product/:id',Authorize("product.update"), uploadProduct.array('images', 12), controllerProduct.Update)
router.delete('/product/:id',Authorize("product.delete"), controllerProduct.Delete)

module.exports = router