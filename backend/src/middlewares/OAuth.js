const jwt = require('jsonwebtoken');
const modelsUser = require('../models/user');
const modelsOAuth = require('../models/auth');
const { createAccessToken, createRefreshToken } = require('../services/token-service');
const modlesRefreshToken = require('../models/refresh_token');

function Authorize(permission) {
    return async (req, res, next) => {
        try {

            const access_token = req.cookies?.access_token
            const refresh_token = req.cookies?.refresh_token

            if (!access_token && !refresh_token) {
                return res.status(401).json({
                    message: "No Token"
                })
            }

            let payload;
            if (access_token) {
                try {
                    payload = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET)
                } catch (error) {
                    if (error.name !== 'TokenExpiredError') {
                        return res.status(401).json({ message: 'Invalid access Token' });
                    }
                }
            }

            let refreshPayload
            if (refresh_token) {
                try {
                    refreshPayload = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET)
                } catch (error) {
                    clearCookies(res)
                    return res.status(401).json({ message: 'Refresh token invalid' });
                }
            }


            if (!payload) {
                if (!refresh_token) {
                    clearCookies(res)
                    return res.status(401).json({ message: 'Refresh token missing' });
                }


                // Check refresh_token to db
                const CheckRefreshToken = await modlesRefreshToken.getToken(refresh_token)
                // console.log(CheckRefreshToken[0].status)
                if (!CheckRefreshToken || CheckRefreshToken.length === 0) {
                    clearCookies(res)
                    return res.status(401).json({
                        message: "Refresh Token Not Found"
                    })
                }

                const row = CheckRefreshToken[0]
                // เช็ค ว่า Token เหมือนกันหรือป่าว
                if (refresh_token !== row.token) {
                    clearCookies(res)
                    return res.status(401).json({
                        message: "Token mismatch"
                    })
                }
                // ตรวจสอบว่า token ยัง active อยู่มั้ย
                if (row.status === 1) {
                    clearCookies(res)
                    return res.status(401).json({
                        message: "Please log in again."
                    })
                }


                const user = await modelsUser.read(refreshPayload.userId)
                if (user.length === 0) {
                    return res.status(401).json({ message: "User Not Found" })
                }

                const newToken = await createAccessToken(refreshPayload.userId, refreshPayload.email)
                // console.log(newToken)
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
            if (!checkEmail && checkEmail.length === 0) {
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

            req.user = payload
            return next()
        } catch (error) {
            console.log(error)
            return res.status(401).json({
                message: "Server Error"
            })
        }
    }
}

function clearCookies(res) {
    res.clearCookie('refresh_token', { httpOnly: true, sameSite: 'lax', secure: false, path: '/' });
    res.clearCookie('access_token', { httpOnly: true, sameSite: 'lax', secure: false, path: '/' });
}

module.exports = Authorize