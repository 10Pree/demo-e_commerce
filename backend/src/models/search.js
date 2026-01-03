const { getDB } = require("../config/db")

class modelsSearch {
    static async search(sql, params) {
        try{
            const conn = await getDB()
            const [results] = await conn.query(sql, params)
            return results
        }catch(error){
            throw error
        }
    }
}

module.exports = modelsSearch