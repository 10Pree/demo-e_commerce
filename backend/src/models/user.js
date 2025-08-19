const { getDB } = require("../config/db");

class moduleUser {
    static async create(data) {
        try {
            const conn = await getDB()
            const [results] = await conn.query('INSERT INTO users SET ?', [data])
            return results
        } catch (error) {
            console.log("Message Error:", error)
        }
    }

    static async reads() {
        try {
            const conn = await getDB()
            const [results] = await conn.query('SELECT username, email, phone, address FROM users')
            return results
        } catch (error) {
            console.log("Message Error:", error)
        }
    }

    static async read(userId) {
        try {
            const conn = await getDB()
            const [results] = await conn.query('SELECT username, email, phone, address FROM users WHERE id = ?', userId)
            return results
        } catch (error) {
            console.log("Message Error:", error)
        }
    }

    static async update(userId, userData) {
        try{
            const conn = await getDB()
            const [results] = await conn.query('UPDATE users SET ? WHERE id = ?', [userData, userId])
            return results
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = moduleUser