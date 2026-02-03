const express = require('express')
const Authorize = require('../middlewares/oAuth')
const controllerProduct = require('../controllers/product')
const upload = require('../services/uplode')

const router = express.Router()
// router.use(express.json())

router.post('/product', upload.array('images', 12), Authorize("project.create"), controllerProduct.Create)
router.get('/products', controllerProduct.Reads)
router.get('/product/:id', controllerProduct.Read)
router.get('/product/code/:code', controllerProduct.ReadCode)
router.put('/product/:id',Authorize("project.edit"), controllerProduct.Update)
router.delete('/product/:id',Authorize("project.delete"), controllerProduct.Delete)

module.exports = router