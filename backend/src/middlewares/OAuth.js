const jwt = require('jsonwebtoken');

function Authorize(permission) {
    return async (req, res, next) => {
        try {
            const refresh_token = req.cookies.refresh_token
            if(!refresh_token){
                return res.status(401).json({
                    message: "No Token"
                })
            }

            jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET)

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