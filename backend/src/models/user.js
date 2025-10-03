const { getDB } = require("../config/db");

class modelsUser {
    static async create(data) {
        try {
            const conn = await getDB()
            const [results] = await conn.query('INSERT INTO users SET ?', [data])
            return results
        } catch (error) {
            console.log("Message Error:", error)
            throw error
        }
    }

    static async reads() {
        try {
            const conn = await getDB()
            const [results] = await conn.query('SELECT username, email, phone, address FROM users')
            return results
        } catch (error) {
            console.log("Message Error:", error)
            throw error
        }
    }

    static async read(userId) {
        try {
            const conn = await getDB()
            const [results] = await conn.query('SELECT id, username, email, phone, address FROM users WHERE id = ?', userId)
            return results
        } catch (error) {
            console.log("Message Error:", error)
            throw error
        }
    }

    static async getEmail(email){
        try{
            const conn = await getDB()
            const [results] = await conn.query('SELECT id, email, password FROM users WHERE email = ? LIMIT 1', [email])
            return results
        }catch(error){
            console.log(error)
            throw error
        }
    }

    static async update(userId, userData) {
        try{
            const conn = await getDB()
            const [results] = await conn.query('UPDATE users SET ? WHERE id = ?', [userData, userId])
            return results
        }catch(error){
            console.log("Message Error:", error)
            throw error
        }
    }

    static async updatePassword(userId, hashPassword){
        try{
            const conn = await getDB()
            const [results] = await conn.query('UPDATE users SET password = ? WHERE id = ?', [hashPassword, userId])
            return results
        }catch(error){
            console.log("Message Error:", error)
            throw error
        }
    }

    static async getPassword(userId) {
        try{
            const conn = await getDB()
            const [results] = await conn.query('SELECT password FROM users WHERE id = ?', userId)
            return results
        }catch(error){
            console.log("Message Error:", error)
            throw error
        }
    }

    static async delete(userId) {
        try{
            const conn = await getDB()
            const [results] = await conn.query('DELETE FROM users WHERE id = ?', userId)
            return results
        }catch(error){
            console.log("Message Error:", error)
            throw error
        }
    }
}

module.exports = modelsUser