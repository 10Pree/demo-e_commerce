const express = require('express')
const controllerCategories = require('../controllers/categories')
const router = express.Router()

router.post('/categorie', controllerCategories.Create)
router.get('/categories', controllerCategories.GetCategories)
router.get('/categorie/:id', controllerCategories.GetById)
router.put('/categorie/:id', controllerCategories.Update)

module.exports = router