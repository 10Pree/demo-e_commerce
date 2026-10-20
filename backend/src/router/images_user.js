const express = require('express')
const controllerImages = require('../controllers/images')
const Authorize = require('../middlewares/oAuth')
const router = express.Router()

router.post('/image', Authorize("project.create"), controllerImages.Create)
router.get('/images',  Authorize("project.read"), controllerImages.getImages)
router.get('/image/:id', Authorize("project.read"), controllerImages.getMapByIdUser)
router.put('/image/:id', Authorize("project.edit"), controllerImages.Update)
router.delete('/image/:id', Authorize("project.delete"), controllerImages.Delete)
router.post('/image/map', Authorize("project.create"), controllerImages.CreateMap)

module.exports = router