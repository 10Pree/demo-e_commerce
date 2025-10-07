const modelsLog = require("../models/log");
const moduleProduct = require("../models/product");
const modelsUser = require("../models/user")
const jwt = require('jsonwebtoken');


const CreateLogAction = async (id, token, text) => {
    try {
        if (!id) throw new Error("id is required");
        if (!token) throw new Error("token is required");
        if (!text) throw new Error("text is required");
        if (!process.env.ACCESS_TOKEN_SECRET) throw new Error("ACCESS_TOKEN_SECRET is not set");

        const textAction = String(text).slice(0, 1000).trim()
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
        const userId = id
        const userAction = payload.userId
        const user = await modelsUser.read(userId)
        const action = await modelsUser.read(userAction)
        if (user.length === 0 || action.length === 0 ) {
            throw new Error("User Not Found")
        }
        const data = {
            users_id: action[0].id,
            name: user[0].username,
            text: textAction
        }
        try {
            const log = await modelsLog.createLogAction(data)
            return log
        } catch (error) {
            throw error
        }
    } catch (error) {
        throw error
    }
}

const CreateLogProducts = async (productCode, token, text) => {
    try {
        if (!process.env.ACCESS_TOKEN_SECRET) throw new Error("ACCESS_TOKEN_SECRET is not set");
        if (!productCode) throw new Error("productCode is required");
        if(!text) throw new Error("text is required")
        if(!token) throw new Error("token is required")

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

        const textAction = String(text).slice(0, 1000).trim()
        const product = await moduleProduct.readCode(productCode)
        if (product.length === 0) {
            throw new Error("Product Not Found")
        }

        const data = {
            products_id: product[0].id,
            users_id: payload.userId,
            name: product[0].p_name,
            text: textAction
        }
        try {
            const log = await modelsLog.createLogAction(data)
            return log
        } catch (error) {
            throw error
        }
    } catch (error) {
        throw error
    }
}


module.exports = { CreateLogAction, CreateLogProducts }
