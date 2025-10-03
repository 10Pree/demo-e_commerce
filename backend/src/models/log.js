const { getDB } = require("../config/db")

class modelsLogAction {
    static async create(data){
        try{
            const conn = await getDB()
            const [resulte] = await conn.query('INSERT INTO log_action SET ?', [data])
            return resulte
        }catch(error){
            throw error
        }
    }
}

module.exports = modelsLogAction
