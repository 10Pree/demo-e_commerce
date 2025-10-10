const jwt = require('jsonwebtoken');
const modelsUser = require('../models/user');
const modelsOAuth = require('../models/auth');
const { createAccessToken, createRefreshToken } = require('../services/token-service')

function Authorize(permission) {
    return async (req, res, next) => {
        try {

            const access_token = req.cookies.access_token
            const refresh_token = req.cookies.refresh_token
            if (!access_token && !refresh_token) {
                return res.status(401).json({
                    message: "No Token"
                })
            }

            let payload;

            if(refresh_token){
                const token = await 
            }
            if (access_token) {
                try {
                    payload = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET)
                } catch (error) {
                    if (error.name !== 'TokenExpiredError') {
                        return res.status(401).json({ message: 'Invalid token' });
                    }
                }
            }

            if (!payload) {
                if (!refresh_token) {
                    return res.status(401).json({ message: 'Refresh token missing' });
                }
                let refreshPayload
                try {
                    refreshPayload = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET)
                } catch (error) {
                    return res.status(401).json({ message: 'Refresh token invalid or expired' });
                }

                const user = await modelsUser.read(refreshPayload.userId)
                if (user.length === 0) {
                    return res.status(401).json({ message: "User Not Found" })
                }

                const newToken = await createAccessToken(refreshPayload.userId, refreshPayload.email)
                console.log(newToken)
                res.cookie('access_token', newToken, {
                    httpOnly: true,
                    sameSite: 'lax',
                    secure: false,
                    maxAge: 60 * 1000,
                    path: '/',
                })

                payload = { userId: refreshPayload.userId, email: refreshPayload.email }
            }

            // checkEmail ตรวจสอบอีเมล
            const checkEmail = await modelsUser.getEmail(payload.email)
            if (!checkEmail) {
                return res.status(401).json({
                    message: "Invalid Email "
                })
            }

            // ตรวจสอบ สิทธิ์
            const data = await modelsOAuth.getPermission(payload.userId)
            const perms = new Set(data.map(row => row.key));
            if (!perms.has(permission)) {
                return res.status(403).json({
                    message: "No access rights"
                })
            }

            return next()
        } catch (error) {
            console.log(error)
            return res.status(401).json({
                message: "Server Error"
            })
        }
    }
}

module.exports = Authorize