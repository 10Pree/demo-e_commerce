const router = require('express').Router();
const controllerProductDetails = require('../controllers/productDetails');

router.post('/product/attribute/name', controllerProductDetails.createProductAttributes);
router.post('/product/attribute/value', controllerProductDetails.createProductAttributeValues);
router.post('/product/variant', controllerProductDetails.createProductVariants);

module.exports = router;