const { getDB } = require("../config/db")

class moduleProduct {
    static async create(data) {
        try{
            const conn = await getDB()
            const [results] = await conn.query('INSERT INTO products SET ?', [data])
            return results
        }catch(error){
            throw error
        }
    }
}

module.exports = moduleProduct