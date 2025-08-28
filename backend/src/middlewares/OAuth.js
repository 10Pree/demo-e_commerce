const jwt = require('jsonwebtoken');
const modelsUser = require('../models/user');
const modelsOAuth = require('../models/auth');

function Authorize(permission) {
    return async (req, res, next) => {
        try {
            const token = req.cookies.access_token
            if(!token){
                return res.status(401).json({
                    message: "No Token"
                })
            }

            const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

            const checkEmail = await modelsUser.getEmail(user.email)
            if(!checkEmail){
                return res.status(401).json({
                    message: "Invalid Email "
                })
            }
            console.log(user.userId)

            const Permission = await modelsOAuth.getPermission(user.userId)
            console.log(Permission.length.key.value)

            
            // if(!checkPermission || checkPermission.length.key.value !== permission ){
            //     res.status(401).json({
            //         message: "No access rights"
            //     })
            // }
            
            return next()
        } catch (error) {
            console.log(error)
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({
                    message: "Token expired"
                })
            } else {
                return res.status(401).json({
                    message: "Invalid token"
                })
            }
        }
    }
}

module.exports = Authorize