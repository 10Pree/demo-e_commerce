const { getDB } = require('../config/db')
class modelsAttributes {
    static async getProductAttributes() {
        try {
            const conn = await getDB()
            const [results] = await conn.query('SELECT * FROM product_attributes')
            return results
        } catch (error) {
            throw error
        }
    }

}

module.exports = modelsAttributes