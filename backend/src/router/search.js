const express = require('express')
const controllersSearch = require('../controllers/search')

const router = express.Router()

router.get('/search', controllersSearch.search)

module.exports = router