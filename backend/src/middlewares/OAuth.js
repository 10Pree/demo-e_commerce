const jwt = require('jsonwebtoken');
const modelsUser = require('../models/user');
const modelsOAuth = require('../models/auth');
const { createAccessToken } = require('../services/token-service')

function Authorize(permission) {
    return async (req, res, next) => {
        try {

            const access_token = req.cookies.access_token
            const refresh_token = req.cookies.refresh_token
            if (!access_token || !refresh_token) {
                return res.status(401).json({
                    message: "No Token"
                })
            }

            let payload;
            try {
                payload = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET)
                // console.log(payload)
            } catch (error) {
                if (error.name === "TokenExpiredError") {
                    // await newAccessToken(payload)
                    return res.status(401).json({
                        message: "Token expired"
                    })
                } else {
                    return res.status(401).json({
                        message: "Invalid token"
                    })
                }
            }

            const checkEmail = await modelsUser.getEmail(payload.email)
            if (!checkEmail) {
                return res.status(401).json({
                    message: "Invalid Email "
                })
            }
            // console.log(user.userId)

            const data = await modelsOAuth.getPermission(payload.userId)

            // console.log(data)

            const perms = new Set(data.map(row => row.key));

            // console.log(perms)
            // console.log(permission)
            // console.log(perms.has(permission))

            if (perms.has(permission)) {
                return next()
            } else {
                return res.status(403).json({
                    message: "No access rights"
                })
            }

        } catch (error) {
            console.log(error)
            return res.status(401).json({
                message: "Server Error"
            })
        }
    }
}

function newAccessToken(payload) {
    try{
        const data = payload
        // const newToken = await createAccessToken(data.userId, data.email)
    }catch(error){
        console.log("Server Error", error)
    }
}

module.exports = Authorize