const modelsLog = require("../models/log");
const moduleProduct = require("../models/product");
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
        const log = await modelsLog.createLogAction(data)
        return log
    } catch (error) {
        throw error
    }
}

const CreateLogProducts = async (productCode, token, text) => {
    try {
        // console.log(productCode, token, text)
        if (!productCode || !text || !token) {
            throw new Error("productCode and text and Token is required");
        }
        const data = {}
        const product = await moduleProduct.readCode(productCode)
        if (product.length === 0) {
            throw new Error("Product Not Found")
        }

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
        if(product[0].p_code){
            data.products_id = product[0].id
        }
        data.users_id = payload.userId
        if(product[0].p_name){
            data.name = product[0].p_name
        }
        data.text = text
        const log = await modelsLog.createLogProduct(data)
        return log
    } catch (error) {
        throw error
    }
}


module.exports = { CreateLogAction, CreateLogProducts}
