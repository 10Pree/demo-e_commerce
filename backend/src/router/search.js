const express = require('express')
const Authorize = require('../middlewares/oAuth')
const controllersSearch = require('../controllers/search')

const router = express.Router()

router.get('/search',Authorize("project.read"), controllersSearch.search)
router.get('/search/user',Authorize("project.read"),  controllersSearch.searchUsers)
router.get('/search/customer',Authorize("project.read"), controllersSearch.searchCustomers)

router.get('/search/products', controllersSearch.searchProductsPublic)



module.exports = router