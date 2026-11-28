const router = require('express').Router();
const controllerProductDetails = require('../controllers/productDetails');
const Authorize = require('../middlewares/oAuth')

router.post('/product/attribute/name', Authorize("product.create"), controllerProductDetails.createProductAttributes);
router.post('/product/attribute/value', Authorize("product.create"), controllerProductDetails.createProductAttributeValues);
router.post('/product/variant', Authorize("product.create"), controllerProductDetails.createProductVariants);
router.post('/product/variant/attribute/value', Authorize("product.create"), controllerProductDetails.createMap_Variant_Attribute_Values);

router.put('/product/attribute/name', Authorize("product.update"), controllerProductDetails.updateProductAttributes);
router.put('/product/attribute/value', Authorize("product.update"), controllerProductDetails.updateProductAttributesValue);
router.put('/product/variant/attribute', Authorize("product.update"), controllerProductDetails.updateProductVariants);
router.put('/product/variant/attribute/value', Authorize("product.update"), controllerProductDetails.updateMap_Variant_Attribute_Values);

module.exports = router;