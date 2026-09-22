const { getDB } = require('../config/db')
class modelsAttributes {
    static async getProductAttributesAndValues() {
        try {
            const conn = await getDB()
            const [results] = await conn.query(`
                SELECT 
                pa.id AS attribute_id, 
                pa.name AS attribute_name, 
                pav.id AS value_id, 
                pav.product_attributes_id AS fk_attribute_id, 
                pav.value
                FROM product_attributes pa
                LEFT JOIN product_attribute_values pav ON pav.product_attributes_id = pa.id
                ORDER BY pa.id, pav.id
                `)
            return results
        } catch (error) {
            throw error
        }
    }

}

module.exports = modelsAttributes