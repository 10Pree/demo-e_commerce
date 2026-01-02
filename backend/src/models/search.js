const { getDB } = require("../config/db")

class modelsSearch {
    static async search(sql) {
        try{
            const conn = await getDB()
            const [results] = await conn.query(sql)
            return results
        }catch(error){
            throw error
        }
    }
}

module.exports = modelsSearch