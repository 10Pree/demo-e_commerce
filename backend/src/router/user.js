const express = require('express')
const { uploadUser } = require('../services/upload')
const controllersUser = require('../controllers/user')
const Authorize = require('../middlewares/oAuth')
const router = express.Router()

router.use(express.json())

router.post('/user', Authorize("project.create"), uploadUser.array('images', 1), controllersUser.Create)
router.get('/users', Authorize("project.read"), controllersUser.Reads)
router.get('/user/:id', Authorize("project.edit"), controllersUser.ReadById)
router.put('/user/:id', Authorize("project.edit"), uploadUser.array('images', 1), controllersUser.Update)
router.put('/user/password/:id', Authorize("project.edit"), controllersUser.UpdatePassword)
router.delete('/user/:id', Authorize("project.delete"), controllersUser.Delete)


module.exports = router