const express = require('express')
const { uploadUser } = require('../services/upload')
const controllersUser = require('../controllers/user')
const Authorize = require('../middlewares/oAuth')
const router = express.Router()

router.use(express.json())

router.post('/user', uploadUser.array('images', 1), controllersUser.Create)
router.get('/user/me', Authorize("user.read"), controllersUser.getMe)
router.get('/users', Authorize("user.read"), controllersUser.Reads)
router.get('/user/:id', Authorize("user.read"), controllersUser.ReadById)
router.put('/user/:id', Authorize("user.update"), uploadUser.array('images', 1), controllersUser.Update)
router.put('/user/password/:id', Authorize("project.update"), controllersUser.UpdatePassword)
router.delete('/user/:id', Authorize("project.delete"), controllersUser.Delete)



module.exports = router