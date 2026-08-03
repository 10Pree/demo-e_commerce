const router = require('express').Router();
const controllerProductDetails = require('../controllers/productDetails');

router.post('/product/attribute/name', controllerProductDetails.createProductAttributes);

module.exports = router;