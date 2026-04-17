const { getDB } = require("../config/db")

class modelsCustomers {
    static async create(data) {
        try {
            const conn = await getDB()
            const [results] = await conn.query('INSERT INTO customers SET ?', [data])
            return results
        } catch (error) {
            console.log("Message Error:", error)
            throw error
        }
    }
}

module.exports = modelsCustomers