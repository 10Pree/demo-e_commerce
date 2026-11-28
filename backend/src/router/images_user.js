const express = require('express')
const controllerImages = require('../controllers/images')
const Authorize = require('../middlewares/oAuth')
const router = express.Router()

router.post('/image', Authorize("user.create"), controllerImages.Create)
router.get('/images',  Authorize("user.read"), controllerImages.getImages)
router.get('/image/:id', Authorize("user.read"), controllerImages.getMapByIdUser)
router.put('/image/:id', Authorize("user.update"), controllerImages.Update)
router.delete('/image/:id', Authorize("user.delete"), controllerImages.Delete)
router.post('/image/map', Authorize("user.create"), controllerImages.CreateMap)

module.exports = router