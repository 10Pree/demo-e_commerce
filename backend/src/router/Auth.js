const express = require('express')
const controllersOAuth = require('../controllers/oAuth')
const Authorize = require('../middlewares/oAuth')
const router = express.Router()

router.get('/roles/:id', Authorize("project.read"), controllersOAuth.getRoleName)
// router.post('/role', controllersOAuth.AddRole )
// router.post('/permission', controllersOAuth.AddPermission )
// router.post('/role_permission', controllersOAuth.AddRole_Permission )
// router.post('/mapRole', controllersOAuth.MapRole)


module.exports = router