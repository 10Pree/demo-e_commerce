const express = require('express')
const Authorize = require('../middlewares/oAuth')
const controllerProduct = require('../controllers/product')
const { uploadProduct } = require('../services/upload')

const router = express.Router()
// router.use(express.json())

router.post('/product', Authorize("project.create"), uploadProduct.array('images', 12),controllerProduct.Create);
router.get('/product/search', controllerProduct.searchProduct)
router.get('/products',Authorize("project.read"), controllerProduct.Reads)
router.get('/product/:id',Authorize("project.read"), controllerProduct.Read)
router.get('/product/code/:code', controllerProduct.ReadCode)
router.put('/product/:id',Authorize("project.edit"), uploadProduct.array('images', 12), controllerProduct.Update)
router.delete('/product/:id',Authorize("project.delete"), controllerProduct.Delete)

module.exports = router