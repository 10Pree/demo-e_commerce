const express = require('express')
const Authorize = require('../middlewares/oAuth')
const controllersSearch = require('../controllers/search')

const router = express.Router()

router.get('/search',Authorize("project.read"), controllersSearch.search)
router.get('/search/user', controllersSearch.searchUsers)
router.get('/search/customer', controllersSearch.searchCustomers)

module.exports = router