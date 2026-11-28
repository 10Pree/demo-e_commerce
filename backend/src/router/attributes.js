const express = require('express')
const router = express.Router()
const controllerAttributes = require('../controllers/attributes')
const Authorize = require('../middlewares/oAuth')

router.get('/product/attributes/name', Authorize("product.read"), controllerAttributes.getProductAttributesAndValues)
router.post('/product/attributes/name/id', Authorize("product.read"), controllerAttributes.getProductAttributesById)

module.exports = router