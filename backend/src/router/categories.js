const express = require('express')
const router = express.Router()
const controllerCategories = require('../controllers/categories')
const Authorize = require('../middlewares/oAuth')

router.post('/categorie', Authorize("category.manage"), controllerCategories.Create)
router.get('/categories', Authorize("category.manage"), controllerCategories.GetCategories)
router.get('/categorie/:id', Authorize("category.manage"), controllerCategories.GetById)
router.put('/categorie/:id', Authorize("category.manage"), controllerCategories.Update)
router.post('/categorie/map', Authorize("category.manage"), controllerCategories.CreateMap)

module.exports = router