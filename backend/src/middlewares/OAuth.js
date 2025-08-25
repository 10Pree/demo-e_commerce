const jwt = require('jsonwebtoken');
const modelsUser = require('../models/user');
const modelsOAuth = require('../models/auth');

function Authorize(permission) {
    return async (req, res, next) => {
        try {
            const refresh_token = req.cookies.refresh_token
            if(!refresh_token){
                return res.status(401).json({
                    message: "No Token"
                })
            }

            const user = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET)

            const checkEmail = await modelsUser.getEmail(user.email)
            if(!checkEmail){
                return res.status(401).json({
                    message: "Invalid Email "
                })
            }
            // console.log(user)

            const checkPermission = await modelsOAuth.getPermission(user.userId)
            console.log(checkPermission)
            // if(!checkEmail || checkEmail. )
            
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