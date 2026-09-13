const { getDB } = require('../config/db')
class modelsAttributes {
    static async getProductAttributesAndValues() {
        try {
            const conn = await getDB()
            const [results] = await conn.query(`
                SELECT pa.id, pa.name, pav.id, pav.product_attributes_id AS attribute_id, pav.value
                FROM product_attributes pa
                LEFT JOIN product_attribute_values pav ON pav.product_attributes_id = pa.id
                `)
            return results
        } catch (error) {
            throw error
        }
    }

}

module.exports = modelsAttributes