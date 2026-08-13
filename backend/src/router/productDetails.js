const router = require('express').Router();
const controllerProductDetails = require('../controllers/productDetails');

router.post('/product/attribute/name', controllerProductDetails.createProductAttributes);
router.post('/product/attribute/value', controllerProductDetails.createProductAttributeValues);
router.post('/product/variant', controllerProductDetails.createProductVariants);
router.post('/product/variant/attribute/value', controllerProductDetails.createMap_Variant_Attribute_Values);

router.put('/product/attribute/name', controllerProductDetails.updateProductAttributes);
// router.put('/product/attribute/value', controllerProductDetails.updateProductAttributeValues);
// router.put('/product/variant', controllerProductDetails.updateProductVariants);
// router.put('/product/variant/attribute/value', controllerProductDetails.updateMap_Variant_Attribute_Values);

module.exports = router;