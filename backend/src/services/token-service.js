const jwt = require('jsonwebtoken');

async function createAccessToken(userId, email) {
    try {
        const access_token = await jwt.sign({ userId, email }, process.env.ACCESS_TOKEN_SECRET, { algorithm: 'HS256' })
        return access_token
    }catch(error){
        throw error
    }
}

async function createRefreshToken(userId, email) {
    try {
        const refresh_token = await jwt.sign({ userId , email  }, process.env.REFRESH_TOKEN_SECRET, { algorithm: 'HS256' })
        return refresh_token
    }catch(error){
        throw error
    }
}

module.exports = { createAccessToken, createRefreshToken}