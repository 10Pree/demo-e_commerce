const express = require('express')
const controllersUser = require('../controllers/user')
const Authorize = require('../middlewares/OAuth')
const router = express.Router()

router.use(express.json())

router.post('/user', controllersUser.Create)
router.get('/users',Authorize("ddsd"), controllersUser.Reads)
router.get('/user/:id', controllersUser.Read)
router.put('/user/:id', controllersUser.Update)
router.put('/user/password/:id', controllersUser.UpdatePassword)
router.delete('/user/:id', controllersUser.Delete)


module.exports = router