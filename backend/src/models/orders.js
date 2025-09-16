const { getDB } = require("../config/db");

class moduleOrders {
    static async create(data) {
        try {
            const conn = await getDB()
            const resulte = await conn.query('INSERT INTO orders SET ?', [data])
            return resulte
        } catch (error) {
            throw error
        }
    }
}

module.exports = moduleOrders