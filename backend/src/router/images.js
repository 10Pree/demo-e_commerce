const express = require('express')
const controllerImages = require('../controllers/images')
const router = express.Router()

router.post('/image', controllerImages.Create)
router.get('/images', controllerImages.getImages)
router.get('/image/:id', controllerImages.getByID)
router.put('/image/:id', controllerImages.Update)
router.delete('/image/:id', controllerImages.Delete)

module.exports = router