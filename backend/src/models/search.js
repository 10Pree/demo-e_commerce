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
            const [results] = await conn.query(`SELECT * FROM users WHERE username LIKE ? AND deleted_at IS NULL`, [`%${name}%`])
            return results
        } catch (error) {
            throw error
        }
    }
    static async searchCustomers(name) {
        try {
            const conn = await getDB()
            const [results] = await conn.query(`SELECT * FROM customers WHERE username LIKE ? AND deleted_at IS NULL`, [`%${name}%`])
            return results
        } catch (err) {
            throw err
        }
    }
}

module.exports = modelsSearch