const express = require('express')
const Authorize = require('../middlewares/oAuth')
const controllersSearch = require('../controllers/search')

const router = express.Router()

router.get('/search',Authorize("product.read"), controllersSearch.search)
router.get('/search/user',Authorize("product.read"),  controllersSearch.searchUsers)
router.get('/search/customer',Authorize("product.read"), controllersSearch.searchCustomers)
router.get('/search/orders', Authorize("product.read"),  controllersSearch.searchOrders)
router.get('/search/products',Authorize("product.read"), controllersSearch.searchProductsPublic)



module.exports = router