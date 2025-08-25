const express = require('express')
const controllersOAuth = require('../controllers/oAuth')

const router = express.Router()

router.post('/role', controllersOAuth.AddRole )
router.post('/permission', controllersOAuth.AddPermission )
router.post('/role_permission', controllersOAuth.AddRole_Permission )

module.exports = router