const { getDB } = require("../config/db")

class ModelsProductDetails {
    static async createProductAttributes(data) {
        try{
            const conn = await getDB()
            const [results] = await conn.query('INSERT INTO product_attributes SET ?', [data])
            return results
        }catch(error){
            throw error
        }
    }
}

module.exports = ModelsProductDetails