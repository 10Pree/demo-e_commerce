const express = require('express')
const router = express.Router()
const controllerAttributes = require('../controllers/attributes')

router.get('/product/attributes/name', controllerAttributes.getProductAttributesAndValues)
router.get('/product/attributes/name/id', controllerAttributes.getProductAttributesById)

module.exports = router