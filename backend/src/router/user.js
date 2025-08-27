const express = require('express')
const controllersUser = require('../controllers/user')
const Authorize = require('../middlewares/OAuth')
const router = express.Router()

router.use(express.json())

router.post('/user', Authorize("project.create"), controllersUser.Create)
router.get('/users', Authorize("project.read"), controllersUser.Reads)
router.get('/user/:id', Authorize("project.read"), controllersUser.Read)
router.put('/user/:id',Authorize("project.edit"), controllersUser.Update)
router.put('/user/password/:id', Authorize("project.edit"), controllersUser.UpdatePassword)
router.delete('/user/:id', Authorize("project.delete"), controllersUser.Delete)


module.exports = router