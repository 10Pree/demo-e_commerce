const argon2 = require('argon2');

// const Salt = process.env.PWD_PEPPER
const hashPassword = async (password) => {
    const hash = await argon2.hash(password)
    return hash
}

const verifyPassword = async(password, hashPassword) =>{
    const verify = await argon2.verify(hashPassword, password)
    return verify
}

module.exports = { hashPassword , verifyPassword}