const { getDB } = require("../config/db")

class modelsSearch {
    static async search(sql, params) {
        try {
            const conn = await getDB()
            const [results] = await conn.query(sql, params)
            return results
        } catch (error) {
            throw error
        }
    }
    static async searchUser(name) {
        try {
            const conn = await getDB()
            const [results] = await conn.query(`SELECT id, username, email, phone, address FROM users WHERE username LIKE ? AND deleted_at IS NULL`, [`%${name}%`])
            return results
        } catch (error) {
            throw error
        }
    }
    static async searchCustomers(name) {
        try {
            const conn = await getDB()
            const [results] = await conn.query(`SELECT id, username, email, phone, address FROM customers WHERE username LIKE ? AND deleted_at IS NULL`, [`%${name}%`])
            return results
        } catch (err) {
            throw err
        }
    }

    static async searchProductsPublic(sql, params) {
        try{
            const conn = await getDB()
            const [results] = await conn.query(sql, params)
            return results
        }catch (err) {
            throw err
        }
    }
}

module.exports = modelsSearch