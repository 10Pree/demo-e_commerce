const router = require('express').Router();
const controllerProductDetails = require('../controllers/productDetails');

router.post('/product/attribute/name', controllerProductDetails.createProductAttributes);
router.post('/product/attribute/value', controllerProductDetails.createProductAttributeValues);

module.exports = router;