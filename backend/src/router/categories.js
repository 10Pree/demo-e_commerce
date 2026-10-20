const express = require('express')
const router = express.Router()
const controllerCategories = require('../controllers/categories')
const Authorize = require('../middlewares/oAuth')

router.post('/categorie', Authorize("project.create"), controllerCategories.Create)
router.get('/categories', Authorize("project.read"), controllerCategories.GetCategories)
router.get('/categorie/:id', Authorize("project.read"), controllerCategories.GetById)
router.put('/categorie/:id', Authorize("project.edit"), controllerCategories.Update)
router.post('/categorie/map', Authorize("project.create"), controllerCategories.CreateMap)

module.exports = router