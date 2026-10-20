const router = require('express').Router();
const controllerProductDetails = require('../controllers/productDetails');
const Authorize = require('../middlewares/oAuth')

router.post('/product/attribute/name', Authorize("project.create"), controllerProductDetails.createProductAttributes);
router.post('/product/attribute/value', Authorize("project.create"), controllerProductDetails.createProductAttributeValues);
router.post('/product/variant', Authorize("project.create"), controllerProductDetails.createProductVariants);
router.post('/product/variant/attribute/value', Authorize("project.create"), controllerProductDetails.createMap_Variant_Attribute_Values);

router.put('/product/attribute/name', Authorize("project.edit"), controllerProductDetails.updateProductAttributes);
router.put('/product/attribute/value', Authorize("project.edit"), controllerProductDetails.updateProductAttributesValue);
router.put('/product/variant/attribute', Authorize("project.edit"), controllerProductDetails.updateProductVariants);
router.put('/product/variant/attribute/value', Authorize("project.edit"), controllerProductDetails.updateMap_Variant_Attribute_Values);

module.exports = router;