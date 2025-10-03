const modelsLogAction = require("../models/log")
const modelsUser = require("../models/user")
const jwt = require('jsonwebtoken');


const CreateLogAction = async (token, text) => {
    try {
        if (!token || !text) {
            throw new Error("token and text is required");
        }
        // console.log(token)
        let payload;
        try {
            payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                // await newAccessToken(playLoad)
                  throw new Error("Token expired")
            } else {
                     throw new Error("Invalid token")
            }
        }
        const userId = payload.userId
        // console.log(token)
        const data = {}
        const user = await modelsUser.read(userId)
        if (user.length === 0) {
            throw new Error("User Not Found")
        }
        // console.log(user)
        if (userId) {
            data.users_id = user[0].id
            data.name = user[0].username
        }
        if (text) {
            data.text = text
        }
        await modelsLogAction.create(data)
    } catch (error) {
        throw error
    }
}


module.exports = CreateLogAction
