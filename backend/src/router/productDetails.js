const router = require('express').Router();
const controllerProductDetails = require('../controllers/productDetails');

router.post('/product/attribute/name', controllerProductDetails.createProductAttributes);
router.post('/product/attribute/value', controllerProductDetails.createProductAttributeValues);
router.post('/product/variant', controllerProductDetails.createProductVariants);
router.post('/product/variant/attribute/value', controllerProductDetails.createMap_Variant_Attribute_Values);

module.exports = router;