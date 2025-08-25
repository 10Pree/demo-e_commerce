require("dotenv").config();
const modelsAuth = require("../models/auth")
const modelsUser = require("../models/user")
const { verifyPassword } = require("../services/password-service")
const jwt = require('jsonwebtoken');

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
            
            const refresh_token = await jwt.sign({ userId , email  }, process.env.REFRESH_TOKEN_SECRET, { algorithm: 'HS256' })
            const access_token = await jwt.sign({ userId , email  }, process.env.ACCESS_TOKEN_SECRET, { algorithm: 'HS256' })

            res.cookie('refresh_token', refresh_token, {
                mexAge: 3600000
            })
            res.cookie('access_token', access_token, {
                mexAge: 60
            })

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