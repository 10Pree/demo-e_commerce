const express = require('express')
const controllerUser = require('../controllers/user')
const router = express.Router()

router.use(express.json())

router.post('/user', controllerUser.Create)
router.get('/users', controllerUser.Reads)
router.get('/user/:id', controllerUser.Read)
router.put('/user/:id', controllerUser.Update)


module.exports = router