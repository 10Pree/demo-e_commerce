const modelsLog = require("../models/log");
const moduleProduct = require("../models/product");
const modelsUser = require("../models/user")
const jwt = require('jsonwebtoken');


const CreateLogAction = async (newUserId, actionUser, text) => {
    try {
        if (!newUserId) throw new Error("id is required");
        if (!actionUser) throw new Error("userid is required");
        if (!text) throw new Error("text is required");
        if (!process.env.ACCESS_TOKEN_SECRET) throw new Error("ACCESS_TOKEN_SECRET is not set");

        const textAction = String(text).slice(0, 1000).trim()
        // console.log(token)


        const user = await modelsUser.read(newUserId)
        const action = await modelsUser.read(actionUser)
        if (user.length === 0 || action.length === 0 ) {
            throw new Error("User Not Found")
        }

        const userID_Action = action[0].id
        const userName_Action = action[0].username
        const username = user[0].username

        const data = {
            users_id: userID_Action,
            name: userName_Action,
            text: textAction+`.${username}`
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

const CreateLogProducts = async (productID, userid, text) => {
    try {
        if (!process.env.ACCESS_TOKEN_SECRET) throw new Error("ACCESS_TOKEN_SECRET is not set");
        if (!productID) throw new Error("productId is required");
        if(!text) throw new Error("text is required")
        if(!userid) throw new Error("userId is required")

        const userId = userid
        const textAction = String(text).slice(0, 1000).trim()

        const user = await modelsUser.read(userId)
        const product = await moduleProduct.read(productID)
        if (product.length === 0 || user.length === 0) {
            throw new Error("Product and User Not Found")
        }

        const userID = user[0].id
        const userName = user[0].username
        const productId = product[0].id
        const productName = product[0].p_name

        const data = {
            products_id: productId,
            users_id: userID,
            name: userName,
            text: textAction+`.${productName}`
        }
        try {
            const log = await modelsLog.createLogProduct(data)
            return log
        } catch (error) {
            throw error
        }
    } catch (error) {
        throw error
    }
}


module.exports = { CreateLogAction, CreateLogProducts }
