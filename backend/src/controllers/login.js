const modelsAuth = require("../models/auth")
const modelsUser = require("../models/user")
const CreateLogAction = require("../services/logAction")
const { verifyPassword } = require("../services/password-service")
const { createAccessToken, createRefreshToken } = require('../services/token-service')

class controllersLogin {
    static async Login(req, res) {
        try {
            const { email, password } = req.body
            if (typeof email !== "string" || typeof password !== "string") {
                return res.status(400).json({
                    message: "Not Found"
                })
            }
            const user = await modelsUser.getEmail(email)
            if (user.length === 0) {
                return res.status(401).json({
                    message: "Email and password are incorrect"
                })
            }

            const verifyPW = await verifyPassword(password, user[0].password)
            if (!verifyPW) {
                return res.status(401).json({
                    message: "Email and password are incorrect"
                })
            }

            const userId = user[0].id
            // console.log(userId, user)
            
            const refresh_token = await createRefreshToken(userId, email)
            const access_token = await createAccessToken(userId, email)

            res.cookie('refresh_token', refresh_token, {
                mexAge: 3600000, httpOnly: true, sameSite: 'lax', secure: true
            })
            res.cookie('access_token', access_token, {
                maxAge: 60 * 1000, httpOnly: true, sameSite: 'lax', secure: true
            })

            // await CreateLogAction(userId,"login")
            return res.status(200).json({
                message: "Login Successful!!"
            })
        } catch (error) {
            console.log("Server Error", error)
            return res.status(500).json({
                message: "Server Error",
                error
            })
        }
    }
}

module.exports = controllersLogin